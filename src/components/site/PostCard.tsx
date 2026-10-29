import { Link } from "@tanstack/react-router";
import { formatDate, getCategory, type Post } from "@/lib/blog";
import { useLocale } from "@/lib/i18n";
import { formatViews, useViewCount, viewsLabel } from "@/lib/views";

/** Número de acessos do artigo. Não renderiza nada enquanto carrega ou se o serviço não responder. */
export function ViewCount({ slug, className }: { slug: string; className?: string }) {
  const n = useViewCount(slug);
  const locale = useLocale();
  if (n === null) return null;
  return (
    <span
      className={className ?? "inline-flex shrink-0 items-center gap-1.5"}
      aria-label={viewsLabel(n, locale)}
      title={viewsLabel(n, locale)}
    >
      <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8Z" />
        <circle cx="8" cy="8" r="2" />
      </svg>
      {formatViews(n, locale)}
    </span>
  );
}

// Arte de capa gerada por categoria: um diagrama simples, sem foto de banco de imagens.
const ART: Record<string, React.ReactNode> = {
  "automacao-com-ia": (
    <>
      <g fill="none" stroke="var(--border-strong)">
        <circle cx="62" cy="45" r="22" />
        <circle cx="98" cy="45" r="22" />
      </g>
      <circle cx="80" cy="45" r="8" fill="#7fd4ff55" />
    </>
  ),
  integracoes: (
    <>
      <g stroke="var(--border-strong)" fill="none">
        <path d="M20 45h40M100 45h40" />
        <rect x="60" y="30" width="40" height="30" rx="4" />
      </g>
      <path d="M20 45h40" stroke="var(--signal)" />
    </>
  ),
  "sistemas-sob-medida": (
    <g fill="none" stroke="var(--border-strong)">
      <rect x="40" y="22" width="80" height="46" rx="4" />
      <path d="M40 34h80M56 34v34" />
      <rect x="64" y="42" width="44" height="6" fill="#7fd4ff55" stroke="none" />
    </g>
  ),
  "sites-e-seo": (
    <>
      <g fill="none" stroke="var(--border-strong)">
        <path d="M20 70 60 40 100 55 140 20" />
      </g>
      <circle cx="140" cy="20" r="3" fill="var(--signal)" />
    </>
  ),
  "gestao-de-tecnologia": (
    <g fill="none" stroke="var(--border-strong)">
      <path d="M30 65h100M30 65V25" />
      <rect x="44" y="45" width="14" height="20" />
      <rect x="70" y="35" width="14" height="30" />
      <rect x="96" y="28" width="14" height="37" fill="#7fd4ff33" />
    </g>
  ),
};

export function PostCard({ post, headingLevel = "h3" }: { post: Post; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const locale = useLocale();
  // artigo sem tradução chega em português; a categoria segue o idioma da página
  const categoryName = getCategory(post.category.slug, locale)?.name ?? post.category.name;
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group flex flex-col overflow-hidden rounded-[0.875rem] border border-border bg-surface transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-strong"
    >
      {/* altura da arte pela altura da tela, para o card caber junto com o título da seção */}
      <div aria-hidden className="relative h-[clamp(4.5rem,12vh,12rem)] max-w-full border-b border-border bg-surface-elevated">
        <svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full">
          {ART[post.category.slug]}
        </svg>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-[1.375rem] pb-[clamp(1rem,3vh,1.5rem)] pt-[clamp(0.875rem,2.6vh,1.25rem)]">
        <span className="kicker text-signal">{categoryName}</span>
        <H className="text-[1.1875rem] leading-[1.3] tracking-[-0.015em] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
          {post.title}
        </H>
        <p className="hide-short line-clamp-2 text-sm text-muted-foreground">{post.description}</p>
        <span className="mt-auto flex items-center justify-between gap-3 pt-2 font-mono text-[max(11px,0.6875rem)] text-faint">
          <span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time> · {post.readingMinutes} min
          </span>
          <ViewCount slug={post.slug} />
        </span>
      </div>
    </Link>
  );
}
