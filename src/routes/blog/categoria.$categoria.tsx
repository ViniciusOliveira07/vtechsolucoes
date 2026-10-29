import { createFileRoute, notFound } from "@tanstack/react-router";
import { getCategory, postsInCategory } from "@/lib/blog";
import { pick, useLocale } from "@/lib/i18n";
import { breadcrumbSchema, jsonLd, localizedUrl, seo } from "@/lib/site";
import { BlogIndex } from "@/components/site/BlogIndex";

const HOME = { pt: "Início", en: "Home", es: "Inicio" };
const GUIDES = { pt: "artigos e guias", en: "articles and guides", es: "artículos y guías" };

export const Route = createFileRoute("/blog/categoria/$categoria")({
  loader: ({ params, context }) => {
    const category = getCategory(params.categoria, context.locale);
    if (!category) throw notFound();
    return { slug: category.slug };
  },
  head: ({ loaderData, match }) => {
    const locale = match.context.locale;
    const category = loaderData && getCategory(loaderData.slug, locale);
    if (!category) return {};
    const path = `/blog/categoria/${category.slug}`;
    return {
      ...seo({ title: `${category.name}: ${pick(GUIDES, locale)} | Blog Vtech`, description: category.description, path, locale }),
      scripts: [
        jsonLd(
          breadcrumbSchema([
            { name: pick(HOME, locale), path: localizedUrl("/", locale) },
            { name: "Blog", path: localizedUrl("/blog", locale) },
            { name: category.name, path: localizedUrl(path, locale) },
          ]),
        ),
      ],
    };
  },
  component: CategoriaPage,
});

function CategoriaPage() {
  const { slug } = Route.useLoaderData();
  const locale = useLocale();
  // busca pelo idioma atual: ao trocar o idioma a página atualiza sem depender do loader
  const category = getCategory(slug, locale)!;
  return <BlogIndex key={category.slug} category={category} posts={postsInCategory(category.slug, locale)} />;
}
