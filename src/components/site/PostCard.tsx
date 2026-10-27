import { Link } from "@tanstack/react-router";
import { formatDate, type Post } from "@/lib/blog";

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
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group flex flex-col overflow-hidden rounded-[14px] border border-border bg-surface transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-strong"
    >
      <div aria-hidden className="relative aspect-video max-w-full border-b border-border bg-surface-elevated">
        <svg viewBox="0 0 160 90" className="absolute inset-0 h-full w-full">
          {ART[post.category.slug]}
        </svg>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 px-[22px] pb-6 pt-5">
        <span className="kicker text-signal">{post.category.name}</span>
        <H className="text-[19px] leading-[1.3] tracking-[-0.015em] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
          {post.title}
        </H>
        <p className="line-clamp-2 text-sm text-muted-foreground">{post.description}</p>
        <span className="mt-auto pt-2 font-mono text-[11px] text-faint">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> · {post.readingMinutes} min
        </span>
      </div>
    </Link>
  );
}
