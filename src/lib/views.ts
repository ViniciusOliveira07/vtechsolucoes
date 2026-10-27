import { useEffect, useState } from "react";

// Contador de acessos dos artigos, gravado numa planilha Google via Apps Script
// (código em scripts/apps-script/visualizacoes-blog.gs).
// Enquanto VIEWS_URL estiver vazio, o site simplesmente não mostra os números.
export const VIEWS_URL = "";

type Counts = Record<string, number>;

const CACHE_KEY = "vt-views";
const CACHE_MS = 5 * 60 * 1000;
let inflight: Promise<Counts | null> | null = null;

function readCache(): Counts | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, counts } = JSON.parse(raw) as { at: number; counts: Counts };
    return Date.now() - at < CACHE_MS ? counts : null;
  } catch {
    return null;
  }
}

function writeCache(counts: Counts) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), counts }));
  } catch {
    // sem armazenamento: busca de novo na próxima página
  }
}

/** null quando a planilha não responde: nesse caso o site esconde o número em vez de mostrar 0. */
function fetchCounts(): Promise<Counts | null> {
  const cached = readCache();
  if (cached) return Promise.resolve(cached);
  inflight ??= fetch(VIEWS_URL)
    .then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.json() as Promise<Counts>;
    })
    .then((counts) => {
      writeCache(counts);
      return counts;
    })
    .catch(() => null)
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

/** Contagens de todos os artigos; null enquanto carrega ou se o contador não estiver ativo. */
export function useViewCounts() {
  const [counts, setCounts] = useState<Counts | null>(null);
  useEffect(() => {
    if (!VIEWS_URL) return;
    let alive = true;
    fetchCounts().then((c) => alive && setCounts(c));
    const onLocal = () => {
      const c = readCache();
      if (c && alive) setCounts(c);
    };
    window.addEventListener("vt-views", onLocal);
    return () => {
      alive = false;
      window.removeEventListener("vt-views", onLocal);
    };
  }, []);
  return counts;
}

/** Registra um acesso ao artigo, no máximo uma vez por sessão do navegador. */
export function trackView(slug: string) {
  if (!VIEWS_URL || typeof window === "undefined") return;
  const key = `vt-viewed:${slug}`;
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {
    // sem sessionStorage: conta mesmo assim
  }
  fetch(VIEWS_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ slug }),
  }).catch(() => {});
  // Atualiza o número na tela sem esperar a planilha.
  fetchCounts().then((c) => {
    if (!c) return;
    writeCache({ ...c, [slug]: (c[slug] ?? 0) + 1 });
    window.dispatchEvent(new Event("vt-views"));
  });
}

const compact = new Intl.NumberFormat("pt-BR", { notation: "compact", maximumFractionDigits: 1 });

export function formatViews(n: number) {
  return n < 1000 ? String(n) : compact.format(n);
}
