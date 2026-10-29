import { useEffect, useState } from "react";
import { LOCALE_META, type L, type Locale } from "@/lib/i18n";

// Contador de acessos dos artigos. O navegador fala só com /api/views (src/routes/api/views.ts),
// que repassa ao Abacus, serviço público e gratuito: GET lê e POST soma 1.
// Se o serviço não responder, o site esconde o número em vez de mostrar 0.
// Só o domínio de produção soma acessos: dev local, previews e testes leem, mas não contam.
const COUNTS_HOST = "vtechsolucoes.ia.br";

const CACHE_MS = 5 * 60 * 1000;
const cacheKey = (slug: string) => `vt-views:${slug}`;
const inflight = new Map<string, Promise<number | null>>();

function readCache(slug: string): number | null {
  try {
    const raw = sessionStorage.getItem(cacheKey(slug));
    if (!raw) return null;
    const { at, n } = JSON.parse(raw) as { at: number; n: number };
    return Date.now() - at < CACHE_MS ? n : null;
  } catch {
    return null;
  }
}

function writeCache(slug: string, n: number) {
  try {
    sessionStorage.setItem(cacheKey(slug), JSON.stringify({ at: Date.now(), n }));
  } catch {
    // sem armazenamento: busca de novo na próxima página
  }
  window.dispatchEvent(new CustomEvent("vt-views", { detail: slug }));
}

async function request(slug: string, method: "GET" | "POST" = "GET"): Promise<number | null> {
  try {
    const r = await fetch(`/api/views?slug=${encodeURIComponent(slug)}`, { method });
    if (!r.ok) return null;
    const { value } = (await r.json()) as { value?: number };
    return typeof value === "number" ? value : null;
  } catch {
    return null;
  }
}

function fetchCount(slug: string): Promise<number | null> {
  const cached = readCache(slug);
  if (cached !== null) return Promise.resolve(cached);
  let p = inflight.get(slug);
  if (!p) {
    p = request(slug).then((n) => {
      if (n !== null) writeCache(slug, n);
      inflight.delete(slug);
      return n;
    });
    inflight.set(slug, p);
  }
  return p;
}

/** Acessos do artigo; null enquanto carrega ou se o serviço não responder. */
export function useViewCount(slug: string) {
  const [n, setN] = useState<number | null>(null);
  useEffect(() => {
    let alive = true;
    // o contador não é essencial: busca só depois que a página terminou de carregar
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
    idle(() => alive && fetchCount(slug).then((v) => alive && setN(v)), { timeout: 4000 });
    const onUpdate = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== slug) return;
      const v = readCache(slug);
      if (v !== null && alive) setN(v);
    };
    window.addEventListener("vt-views", onUpdate);
    return () => {
      alive = false;
      window.removeEventListener("vt-views", onUpdate);
    };
  }, [slug]);
  return n;
}

/** Registra um acesso ao artigo, no máximo uma vez por sessão do navegador. */
export function trackView(slug: string) {
  if (typeof window === "undefined" || window.location.hostname !== COUNTS_HOST) return;
  const key = `vt-viewed:${slug}`;
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {
    // sem sessionStorage: conta mesmo assim
  }
  request(slug, "POST").then((n) => {
    if (n !== null) writeCache(slug, n);
  });
}

// Um formatador por idioma: "1,2 mil" em português, "1.2K" em inglês, "1,2 mil" em espanhol.
const compact = new Map<Locale, Intl.NumberFormat>();

export function formatViews(n: number, locale: Locale) {
  if (n < 1000) return String(n);
  let f = compact.get(locale);
  if (!f) {
    f = new Intl.NumberFormat(LOCALE_META[locale].intl, { notation: "compact", maximumFractionDigits: 1 });
    compact.set(locale, f);
  }
  return f.format(n);
}

const VIEW_WORD: L<[string, string]> = {
  pt: ["acesso", "acessos"],
  en: ["view", "views"],
  es: ["visita", "visitas"],
};

/** "1.234 acessos" / "1,234 views" / "1.234 visitas", com o número completo. */
export function viewsLabel(n: number, locale: Locale) {
  const [one, many] = VIEW_WORD[locale];
  return `${n.toLocaleString(LOCALE_META[locale].intl)} ${n === 1 ? one : many}`;
}
