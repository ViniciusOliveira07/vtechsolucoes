import { createFileRoute } from "@tanstack/react-router";
import { CATEGORIES, getPosts } from "@/lib/blog";
import { localizedUrl, SERVICES } from "@/lib/site";
import { DEFAULT_LOCALE, LOCALE_META, LOCALES } from "@/lib/i18n";

// Data da última revisão das páginas institucionais. Atualize ao mudar o conteúdo delas.
const PAGES_UPDATED = "2026-10-27";

type Entry = { path: string; lastmod: string; changefreq: string; priority: string };

function entries(): Entry[] {
  // só os já publicados: artigo agendado entra no sitemap no dia em que é liberado
  const POSTS = getPosts(DEFAULT_LOCALE);
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

// Cada URL declara as versões nos três idiomas (mesmo endereço com ?lang=) e o x-default em português.
function alternates(path: string) {
  return [
    ...LOCALES.map(
      (l) => `<xhtml:link rel="alternate" hreflang="${LOCALE_META[l].html}" href="${xmlEscape(localizedUrl(path, l))}"/>`,
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(localizedUrl(path, DEFAULT_LOCALE))}"/>`,
  ].join("");
}

const xmlEscape = (s: string) => s.replace(/&/g, "&amp;");

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const body =
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
          // uma <url> por idioma, todas com a mesma lista de alternates (como o Google recomenda)
          entries()
            .flatMap((e) =>
              LOCALES.map(
                (l) =>
                  `  <url><loc>${xmlEscape(localizedUrl(e.path, l))}</loc>${alternates(e.path)}<lastmod>${e.lastmod}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
              ),
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
