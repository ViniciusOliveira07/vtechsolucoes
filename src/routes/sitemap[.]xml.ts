import { createFileRoute } from "@tanstack/react-router";
import { CATEGORIES, POSTS } from "@/lib/blog";
import { absoluteUrl, SERVICES } from "@/lib/site";

// Data da última revisão das páginas institucionais. Atualize ao mudar o conteúdo delas.
const PAGES_UPDATED = "2026-10-27";

type Entry = { path: string; lastmod: string; changefreq: string; priority: string };

function entries(): Entry[] {
  const latestPost = POSTS[0]?.updatedAt ?? PAGES_UPDATED;
  return [
    { path: "/", lastmod: PAGES_UPDATED, changefreq: "weekly", priority: "1.0" },
    { path: "/servicos", lastmod: PAGES_UPDATED, changefreq: "monthly", priority: "0.9" },
    ...SERVICES.map((s) => ({
      path: `/servicos/${s.slug}`,
      lastmod: PAGES_UPDATED,
      changefreq: "monthly",
      priority: "0.9",
    })),
    { path: "/metodo", lastmod: PAGES_UPDATED, changefreq: "monthly", priority: "0.7" },
    { path: "/sobre", lastmod: PAGES_UPDATED, changefreq: "monthly", priority: "0.6" },
    { path: "/contato", lastmod: PAGES_UPDATED, changefreq: "monthly", priority: "0.8" },
    { path: "/blog", lastmod: latestPost, changefreq: "weekly", priority: "0.8" },
    ...CATEGORIES.filter((c) => POSTS.some((p) => p.category.slug === c.slug)).map((c) => ({
      path: `/blog/categoria/${c.slug}`,
      lastmod: POSTS.find((p) => p.category.slug === c.slug)!.updatedAt,
      changefreq: "weekly",
      priority: "0.5",
    })),
    ...POSTS.map((p) => ({ path: `/blog/${p.slug}`, lastmod: p.updatedAt, changefreq: "monthly", priority: "0.7" })),
    ...["/politica-de-privacidade", "/politica-de-cookies", "/termos-e-condicoes", "/politica-de-seguranca"].map(
      (path) => ({ path, lastmod: PAGES_UPDATED, changefreq: "yearly", priority: "0.3" }),
    ),
  ];
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const body =
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          entries()
            .map(
              (e) =>
                `  <url><loc>${absoluteUrl(e.path)}</loc><lastmod>${e.lastmod}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
            )
            .join("\n") +
          `\n</urlset>\n`;
        return new Response(body, {
          headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
