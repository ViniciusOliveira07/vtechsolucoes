import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { getCategories, getPosts, slugify, type Category, type Post } from "@/lib/blog";
import { useLocale, useT } from "@/lib/i18n";
import { PostCard } from "@/components/site/PostCard";
import { RailHint } from "@/components/site/RailHint";
import { CtaBand } from "@/components/site/sections/CtaBand";

const TEXT = {
  pt: {
    breadcrumb: "Trilha de navegação",
    home: "início",
    title: "Notas técnicas",
    intro: "Guias práticos sobre IA aplicada, integrações, sistemas e arquitetura, escritos para quem decide tecnologia na empresa.",
    categories: "Categorias",
    all: "Todas",
    searchLabel: "Buscar artigos",
    searchPlaceholder: "buscar artigos…",
    articles: "Artigos",
    emptyCategory: "Nenhum artigo publicado nesta categoria ainda.",
    noMatch: (q: string) => `Nenhum artigo encontrado para "${q}". Tente outro termo ou veja todas as categorias.`,
    count: (shown: number, total: number) => `${shown} de ${total} ${total === 1 ? "artigo" : "artigos"}`,
  },
  en: {
    breadcrumb: "Breadcrumb",
    home: "home",
    title: "Technical notes",
    intro: "Practical guides on applied AI, integrations, systems and architecture, written for the people who make technology decisions at their company.",
    categories: "Categories",
    all: "All",
    searchLabel: "Search articles",
    searchPlaceholder: "search articles…",
    articles: "Articles",
    emptyCategory: "No articles published in this category yet.",
    noMatch: (q: string) => `No articles found for "${q}". Try another term or browse all categories.`,
    count: (shown: number, total: number) => `${shown} of ${total} ${total === 1 ? "article" : "articles"}`,
  },
  es: {
    breadcrumb: "Ruta de navegación",
    home: "inicio",
    title: "Notas técnicas",
    intro: "Guías prácticas sobre IA aplicada, integraciones, sistemas y arquitectura, escritas para quienes deciden sobre tecnología en la empresa.",
    categories: "Categorías",
    all: "Todas",
    searchLabel: "Buscar artículos",
    searchPlaceholder: "buscar artículos…",
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
      <section className="section">
        <div className="shell">
          <nav aria-label={t.breadcrumb} className="hide-short mb-[clamp(0.75rem,3vh,2rem)] font-mono text-xs text-faint">
            <Link to="/" className="hover:text-foreground">
              {t.home}
            </Link>{" "}
            /{" "}
            {category ? (
              <>
                <Link to="/blog" className="hover:text-foreground">
                  blog
                </Link>{" "}
                / {/* nome da categoria em formato de slug, no idioma da página */}
                <span className="text-foreground">{slugify(category.name)}</span>
              </>
            ) : (
              <span className="text-foreground">blog</span>
            )}
          </nav>
          <div className="mb-[clamp(1rem,3vh,3rem)] grid gap-[clamp(0.75rem,2.5vh,1.5rem)] md:grid-cols-2 md:items-end md:gap-8">
            <h1 className="h-section min-w-0">{category ? category.name : t.title}</h1>
            <p className="hide-phone min-w-0 max-w-[48ch] text-muted-foreground md:justify-self-end">
              {category ? category.description : t.intro}
            </p>
          </div>

          <div className="mb-[clamp(0.875rem,2.6vh,2.5rem)] flex flex-col gap-2 border-y border-border py-2 md:flex-row md:items-center md:justify-between md:gap-4 md:py-3">
            <nav aria-label={t.categories} className="-mx-1 flex gap-1 overflow-x-auto [scrollbar-width:none]">
              <CategoryLink to="/blog" active={!category} label={t.all} />
              {getCategories(locale).map((c) => (
                <CategoryLink
                  key={c.slug}
                  to={`/blog/categoria/${c.slug}`}
                  active={category?.slug === c.slug}
                  label={c.name}
                />
              ))}
            </nav>
            <label className="relative block md:w-72">
              <span className="sr-only">{t.searchLabel}</span>
              <input
                id="busca-blog"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="min-h-11 w-full rounded-lg border border-border-strong bg-background px-3.5 font-mono text-[0.8125rem] text-foreground outline-none placeholder:text-faint focus:border-signal"
              />
            </label>
          </div>

          {filtered.length > 0 ? (
            <>
              <div tabIndex={0} aria-label={t.articles} className="rail grid gap-5 md:grid-cols-3">
                {filtered.map((p) => (
                  <PostCard key={p.slug} post={p} headingLevel="h2" />
                ))}
              </div>
              <RailHint />
            </>
          ) : (
            <div className="rounded-[0.875rem] border border-dashed border-border-strong px-7 py-10 font-mono text-[0.8125rem] text-muted-foreground">
              {posts.length === 0 ? t.emptyCategory : t.noMatch(query)}
            </div>
          )}
          <p className="hide-short mt-[clamp(0.5rem,2vh,1.5rem)] font-mono text-xs text-faint" aria-live="polite">
            {t.count(filtered.length, total)}
          </p>
        </div>
      </section>
      <CtaBand location={category ? `blog_categoria_${category.slug}` : "blog_index"} />
    </>
  );
}

function CategoryLink({ to, active, label }: { to: string; active: boolean; label: string }) {
  return (
    <Link
      to={to}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex min-h-11 shrink-0 items-center rounded-md px-3 text-sm transition-colors hover:text-foreground",
        active ? "bg-surface-elevated text-foreground" : "text-muted-foreground",
      )}
    >
      {label}
    </Link>
  );
}
