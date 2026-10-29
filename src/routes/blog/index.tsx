import { createFileRoute } from "@tanstack/react-router";
import { getPosts } from "@/lib/blog";
import { LOCALE_META, pick, useLocale } from "@/lib/i18n";
import { breadcrumbSchema, jsonLd, localizedUrl, seo, SITE_NAME } from "@/lib/site";
import { BlogIndex } from "@/components/site/BlogIndex";

const HEAD = {
  pt: {
    description:
      "Guias práticos sobre automação com IA, integrações de ERP e CRM, sistemas sob medida e SEO técnico para empresas B2B.",
    home: "Início",
  },
  en: {
    description:
      "Practical guides on AI automation, ERP and CRM integrations, custom software and technical SEO for B2B companies.",
    home: "Home",
  },
  es: {
    description:
      "Guías prácticas sobre automatización con IA, integraciones de ERP y CRM, sistemas a medida y SEO técnico para empresas B2B.",
    home: "Inicio",
  },
};

export const Route = createFileRoute("/blog/")({
  head: ({ match }) => {
    const locale = match.context.locale;
    const t = pick(HEAD, locale);
    return {
      ...seo({ title: `Blog | ${SITE_NAME}`, description: t.description, path: "/blog", locale }),
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `Blog ${SITE_NAME}`,
          url: localizedUrl("/blog", locale),
          inLanguage: LOCALE_META[locale].html,
          blogPost: getPosts(locale).map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: localizedUrl(`/blog/${p.slug}`, locale),
            datePublished: p.publishedAt,
            // artigo ainda sem tradução fica em português
            inLanguage: LOCALE_META[p.locale].html,
          })),
        }),
        jsonLd(
          breadcrumbSchema([
            { name: t.home, path: localizedUrl("/", locale) },
            { name: "Blog", path: localizedUrl("/blog", locale) },
          ]),
        ),
      ],
    };
  },
  component: BlogPage,
});

function BlogPage() {
  return <BlogIndex posts={getPosts(useLocale())} />;
}
