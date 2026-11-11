import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { getCategories, getPosts, slugify, type Category, type Post } from "@/lib/blog";
import { useLocale, useT } from "@/lib/i18n";
import { PostCard } from "@/components/site/PostCard";
import { CtaBand } from "@/components/site/sections/CtaBand";
import { PageHero } from "@/components/site/vt/Page";
import { Ico } from "@/components/site/home/Ico";

const TEXT = {
  pt: {
    breadcrumb: "Trilha de navegação",
    home: "início",
    kicker: "blog da vtech",
    title: "Aprenda antes de contratar",
    intro: "Guias práticos sobre IA aplicada, integrações, sistemas e sites, escritos por quem constrói, para quem decide tecnologia na empresa.",
    categories: "Categorias",
    all: "Todos",
    searchLabel: "Buscar artigos",
    searchPlaceholder: "Buscar artigos…",
    articles: "Artigos",
    emptyCategory: "Nenhum artigo publicado nesta categoria ainda.",
    noMatch: (q: string) => `Nenhum artigo encontrado para "${q}". Tente outro termo ou veja todas as categorias.`,
    count: (shown: number, total: number) => `${shown} de ${total} ${total === 1 ? "artigo" : "artigos"}`,
  },
  en: {
    breadcrumb: "Breadcrumb",
    home: "home",
    kicker: "vtech blog",
    title: "Learn before you hire",
    intro: "Practical guides on applied AI, integrations, systems and websites, written by the people who build, for the people who decide.",
    categories: "Categories",
    all: "All",
    searchLabel: "Search articles",
    searchPlaceholder: "Search articles…",
    articles: "Articles",
    emptyCategory: "No articles published in this category yet.",
    noMatch: (q: string) => `No articles found for "${q}". Try another term or browse all categories.`,
    count: (shown: number, total: number) => `${shown} of ${total} ${total === 1 ? "article" : "articles"}`,
  },
  es: {
    breadcrumb: "Ruta de navegación",
    home: "inicio",
    kicker: "blog de vtech",
    title: "Aprenda antes de contratar",
    intro: "Guías prácticas sobre IA aplicada, integraciones, sistemas y sitios, escritas por quien construye, para quien decide.",
    categories: "Categorías",
    all: "Todos",
    searchLabel: "Buscar artículos",
    searchPlaceholder: "Buscar artículos…",
    articles: "Artículos",
    emptyCategory: "Todavía no hay artículos publicados en esta categoría.",
    noMatch: (q: string) => `No se encontraron artículos para "${q}". Pruebe otro término o vea todas las categorías.`,
    count: (shown: number, total: number) => `${shown} de ${total} ${total === 1 ? "artículo" : "artículos"}`,
  },
};

/** Índice do blog: usado em /blog e em /blog/categoria/:categoria. */
export function BlogIndex({ posts, category }: { posts: Post[]; category?: Category }) {
  const [query, setQuery] = useState("");
  const locale = useLocale();
  const t = useT(TEXT);
  const total = getPosts(locale).length;
  const filtered = useMemo(() => {
    const q = slugify(query).replace(/-/g, " ").trim();
    if (!q) return posts;
    return posts.filter((p) =>
      slugify(`${p.title} ${p.description} ${p.tags.join(" ")}`)
        .replace(/-/g, " ")
        .includes(q),
    );
  }, [posts, query]);

  return (
    <>
      <PageHero
        crumbsLabel={t.breadcrumb}
        crumbs={
          category
            ? [{ label: t.home, to: "/" }, { label: "blog", to: "/blog" }, { label: slugify(category.name) }]
            : [{ label: t.home, to: "/" }, { label: "blog" }]
        }
        kicker={category ? t.kicker : undefined}
        title={category ? category.name : t.title}
        sub={category ? category.description : t.intro}
      />
      <section className="vt-sec" style={{ paddingTop: 0 }}>
        <div className="vt-wrap">
          <div className="vt-toolbar">
            <nav aria-label={t.categories} className="vt-pills">
              <Link to="/blog" aria-current={!category ? "page" : undefined}>
                {t.all}
              </Link>
              {getCategories(locale).map((c) => (
                <Link
                  key={c.slug}
                  to="/blog/categoria/$categoria"
                  params={{ categoria: c.slug }}
                  aria-current={category?.slug === c.slug ? "page" : undefined}
                >
                  {c.name}
                </Link>
              ))}
            </nav>
            <label className="vt-search">
              <Ico name="search" />
              <span className="sr-only">{t.searchLabel}</span>
              <input
                id="busca-blog"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
              />
            </label>
          </div>

          {filtered.length > 0 ? (
            <div aria-label={t.articles} className="vt-posts">
              {filtered.map((p) => (
                <PostCard key={p.slug} post={p} headingLevel="h2" />
              ))}
            </div>
          ) : (
            <div className="vt-empty">{posts.length === 0 ? t.emptyCategory : t.noMatch(query)}</div>
          )}
          <p className="vt-count" aria-live="polite">
            {t.count(filtered.length, total)}
          </p>
        </div>
      </section>
      <CtaBand location={category ? `blog_categoria_${category.slug}` : "blog_index"} />
    </>
  );
}
