// Um endereço só para o Google e para o visitante: http://, www. e a cópia técnica da Cloudflare
// (*.workers.dev) levam (301) para https://vtechsolucoes.ia.br, no mesmo caminho. ?lang= é removido (site só em pt).
// O dev local (localhost) não é redirecionado.
import { createMiddleware, createStart } from "@tanstack/react-start";
import { SITE_URL } from "@/lib/site";

const HOST = new URL(SITE_URL).hostname;

const MOVIDAS: Record<string, string> = {
  "/solucoes/criacao-de-site-em-sao-paulo": "/solucoes/criacao-de-site-para-empresas",
};

const enderecoUnico = createMiddleware({ type: "request" }).server(({ request, next }) => {
  const url = new URL(request.url);
  const doSite = url.hostname === HOST || url.hostname === `www.${HOST}`;
  const copiaTecnica = url.hostname.endsWith(".workers.dev");
  // o site é só em português: endereços antigos com ?lang=en|es levam à mesma página sem o parâmetro
  const comIdioma = url.searchParams.has("lang");
  if (comIdioma) url.searchParams.delete("lang");
  if (comIdioma || copiaTecnica || (doSite && (url.hostname !== HOST || url.protocol !== "https:"))) {
    const destino = doSite || copiaTecnica ? SITE_URL : url.origin;
    return new Response(null, {
      status: 301,
      headers: { Location: `${destino}${url.pathname}${url.search}`, "Cache-Control": "public, max-age=86400" },
    });
  }
  // páginas que mudaram de endereço (o antigo já foi enviado ao Google)
  const novo = MOVIDAS[url.pathname.replace(/\/$/, "")];
  if (novo) {
    return new Response(null, { status: 301, headers: { Location: `${SITE_URL}${novo}${url.search}`, "Cache-Control": "public, max-age=86400" } });
  }
  return next();
});

export const startInstance = createStart(() => ({ requestMiddleware: [enderecoUnico] }));
