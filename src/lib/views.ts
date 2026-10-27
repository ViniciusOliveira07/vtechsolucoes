import { useEffect, useState } from "react";

// Contador de acessos dos artigos no Abacus (abacus.jasoncameron.dev): serviço público e gratuito,
// sem conta. GET /get/<namespace>/<slug> lê e /hit/<namespace>/<slug> soma 1.
// Se o serviço não responder, o site esconde o número em vez de mostrar 0.
const API = "https://abacus.jasoncameron.dev";
const NAMESPACE = "vtech-ia-br-artigos";
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

async function request(path: string): Promise<number | null> {
  try {
    const r = await fetch(`${API}${path}`);
    if (r.status === 404) return 0; // artigo ainda sem nenhum acesso
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
    p = request(`/get/${NAMESPACE}/${slug}`).then((n) => {
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
    fetchCount(slug).then((v) => alive && setN(v));
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
  request(`/hit/${NAMESPACE}/${slug}`).then((n) => {
    if (n !== null) writeCache(slug, n);
  });
}

const compact = new Intl.NumberFormat("pt-BR", { notation: "compact", maximumFractionDigits: 1 });

export function formatViews(n: number) {
  return n < 1000 ? String(n) : compact.format(n);
}
