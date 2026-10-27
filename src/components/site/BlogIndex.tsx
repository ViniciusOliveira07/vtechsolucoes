import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { CATEGORIES, POSTS, slugify, type Category, type Post } from "@/lib/blog";
import { PostCard } from "@/components/site/PostCard";
import { CtaBand } from "@/components/site/sections/CtaBand";

/** Índice do blog: usado em /blog e em /blog/categoria/:categoria. */
export function BlogIndex({ posts, category }: { posts: Post[]; category?: Category }) {
  const [query, setQuery] = useState("");
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
          <nav aria-label="Trilha de navegação" className="mb-8 font-mono text-xs text-faint">
            <Link to="/" className="hover:text-foreground">
              início
            </Link>{" "}
            /{" "}
            {category ? (
              <>
                <Link to="/blog" className="hover:text-foreground">
                  blog
                </Link>{" "}
                / <span className="text-foreground">{category.slug}</span>
              </>
            ) : (
              <span className="text-foreground">blog</span>
            )}
          </nav>
          <div className="mb-12 grid gap-6 md:grid-cols-2 md:items-end md:gap-8">
            <h1 className="h-section min-w-0">{category ? category.name : "Notas técnicas"}</h1>
            <p className="min-w-0 max-w-[48ch] text-muted-foreground md:justify-self-end">
              {category
                ? category.description
                : "Guias práticos sobre IA aplicada, integrações, sistemas e arquitetura, escritos para quem decide tecnologia na empresa."}
            </p>
          </div>

          <div className="mb-10 flex flex-col gap-4 border-y border-border py-4 md:flex-row md:items-center md:justify-between">
            <nav aria-label="Categorias" className="-mx-1 flex gap-1 overflow-x-auto [scrollbar-width:none]">
              <CategoryLink to="/blog" active={!category} label="Todas" />
              {CATEGORIES.map((c) => (
                <CategoryLink
                  key={c.slug}
                  to={`/blog/categoria/${c.slug}`}
                  active={category?.slug === c.slug}
                  label={c.name}
                />
              ))}
            </nav>
            <label className="relative block md:w-72">
              <span className="sr-only">Buscar artigos</span>
              <input
                id="busca-blog"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="buscar artigos…"
                className="min-h-11 w-full rounded-lg border border-border-strong bg-background px-3.5 font-mono text-[0.8125rem] text-foreground outline-none placeholder:text-faint focus:border-signal"
              />
            </label>
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <PostCard key={p.slug} post={p} headingLevel="h2" />
              ))}
            </div>
          ) : (
            <div className="rounded-[0.875rem] border border-dashed border-border-strong px-7 py-10 font-mono text-[0.8125rem] text-muted-foreground">
              {posts.length === 0
                ? "Nenhum artigo publicado nesta categoria ainda."
                : `Nenhum artigo encontrado para "${query}". Tente outro termo ou veja todas as categorias.`}
            </div>
          )}
          <p className="mt-6 font-mono text-xs text-faint" aria-live="polite">
            {filtered.length} de {POSTS.length} {POSTS.length === 1 ? "artigo" : "artigos"}
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
