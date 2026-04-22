import { createFileRoute } from "@tanstack/react-router";

const ORIGIN = "https://vtechsolucoes.com.br";

const ROUTES: { loc: string; priority: string; changefreq: string }[] = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/servicos", priority: "0.9", changefreq: "weekly" },
  { loc: "/servicos/sites-institucionais", priority: "0.9", changefreq: "monthly" },
  { loc: "/servicos/sistemas-web", priority: "0.9", changefreq: "monthly" },
  { loc: "/servicos/automacoes-com-ia", priority: "0.9", changefreq: "monthly" },
  { loc: "/servicos/integracoes", priority: "0.9", changefreq: "monthly" },
  { loc: "/servicos/consultoria-tech", priority: "0.9", changefreq: "monthly" },
  { loc: "/contato", priority: "0.8", changefreq: "monthly" },
  { loc: "/politica-de-privacidade", priority: "0.3", changefreq: "yearly" },
  { loc: "/politica-de-cookies", priority: "0.3", changefreq: "yearly" },
  { loc: "/termos-e-condicoes", priority: "0.3", changefreq: "yearly" },
  { loc: "/politica-de-seguranca", priority: "0.3", changefreq: "yearly" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().split("T")[0];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) =>
    `  <url>\n    <loc>${ORIGIN}${r.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
).join("\n")}
</urlset>`;
        return new Response(body, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
