import { createFileRoute } from "@tanstack/react-router";
import { POSTS } from "@/lib/blog";

// Ponte para o contador de acessos dos artigos (Abacus). O navegador fala só com o próprio site:
// sem requisição a terceiros na página e sem os 404 que o Abacus devolve para artigo ainda sem
// acesso (apareciam como erro no console e tiravam pontos do PageSpeed).
//   GET  /api/views?slug=<slug>  → { value }   lê
//   POST /api/views?slug=<slug>  → { value }   soma 1
const API = "https://abacus.jasoncameron.dev";
const NAMESPACE = "vtech-ia-br-artigos";
// Só o domínio de produção soma acessos: dev local, previews e testes leem, mas não contam.
const COUNTS_HOST = "vtechsolucoes.ia.br";

const SLUGS = new Set(POSTS.map((p) => p.slug));

function json(data: unknown, status = 200, cache = "no-store") {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": cache },
  });
}

async function abacus(action: "get" | "hit", slug: string) {
  try {
    const r = await fetch(`${API}/${action}/${NAMESPACE}/${slug}`, { signal: AbortSignal.timeout(4000) });
    if (r.status === 404) return 0; // artigo ainda sem nenhum acesso
    if (!r.ok) return null;
    const { value } = (await r.json()) as { value?: number };
    return typeof value === "number" ? value : null;
  } catch {
    return null;
  }
}

function slugFrom(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug") ?? "";
  return SLUGS.has(slug) ? slug : null;
}

export const Route = createFileRoute("/api/views")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const slug = slugFrom(request);
        if (!slug) return json({ value: null }, 404);
        const value = await abacus("get", slug);
        // um minuto de cache na borda: a lista do blog pede vários contadores de uma vez
        return json({ value }, 200, value === null ? "no-store" : "public, max-age=60");
      },
      POST: async ({ request }) => {
        const slug = slugFrom(request);
        if (!slug) return json({ value: null }, 404);
        if (new URL(request.url).hostname !== COUNTS_HOST) return json({ value: await abacus("get", slug) });
        return json({ value: await abacus("hit", slug) });
      },
    },
  },
});
