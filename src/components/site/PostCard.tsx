import { Link } from "@tanstack/react-router";
import { formatDate, getCategory, type Post } from "@/lib/blog";
import { useLocale, useT } from "@/lib/i18n";
import { formatViews, useViewCount, viewsLabel } from "@/lib/views";
import { BlogCover } from "@/components/site/home/BlogCover";
import { Ico } from "@/components/site/home/Ico";

/**
 * Número de acessos do artigo. Não renderiza nada enquanto carrega, se o serviço não responder
 * ou se o artigo ainda não tem acesso (o olho só aparece a partir de 1).
 */
export function ViewCount({ slug, className }: { slug: string; className?: string }) {
  const n = useViewCount(slug);
  const locale = useLocale();
  if (n === null || n < 1) return null;
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

const READ = { pt: "Ler artigo", en: "Read article", es: "Leer artículo" };

/** Cartão de artigo (mesmo da home): capa ilustrada, categoria, data, leitura e acessos. */
export function PostCard({ post, headingLevel = "h3" }: { post: Post; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const locale = useLocale();
  const read = useT(READ);
  // artigo sem tradução chega em português; a categoria segue o idioma da página
  const categoryName = getCategory(post.category.slug, locale)?.name ?? post.category.name;
  return (
    <Link to="/blog/$slug" params={{ slug: post.slug }} className="vt-bpost">
      <BlogCover post={post} />
      <div className="vt-bb">
        <span className="vt-btag">
          <b>{categoryName}</b>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
          <span>·</span>
          <span>{post.readingMinutes} min</span>
          <ViewCount slug={post.slug} className="ml-auto inline-flex items-center gap-1" />
        </span>
        <H>{post.title}</H>
        <p className="line-clamp-3">{post.description}</p>
        <span className="vt-rd">
          {read} <Ico name="arrow" />
        </span>
      </div>
    </Link>
  );
}
