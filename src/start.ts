// Um endereço só para o Google e para o visitante: http://, www. e a cópia técnica da Cloudflare
// (*.workers.dev) levam (301) para https://vtechsolucoes.ia.br, no mesmo caminho.
// O dev local (localhost) não é redirecionado.
import { createMiddleware, createStart } from "@tanstack/react-start";
import { SITE_URL } from "@/lib/site";

const HOST = new URL(SITE_URL).hostname;

const enderecoUnico = createMiddleware({ type: "request" }).server(({ request, next }) => {
  const url = new URL(request.url);
  const doSite = url.hostname === HOST || url.hostname === `www.${HOST}`;
  const copiaTecnica = url.hostname.endsWith(".workers.dev");
  if (copiaTecnica || (doSite && (url.hostname !== HOST || url.protocol !== "https:"))) {
    return new Response(null, {
      status: 301,
      headers: { Location: `${SITE_URL}${url.pathname}${url.search}`, "Cache-Control": "public, max-age=86400" },
    });
  }
  return next();
});

export const startInstance = createStart(() => ({ requestMiddleware: [enderecoUnico] }));
