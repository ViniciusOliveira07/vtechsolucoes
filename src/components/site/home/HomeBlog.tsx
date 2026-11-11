import { Link } from "@tanstack/react-router";
import { formatDate, getPosts, nextScheduledPost, type Post } from "@/lib/blog";
import { useLocale, useT } from "@/lib/i18n";
import { ArrowDot, Ico } from "./Ico";
import { BlogCover } from "./BlogCover";
import { SwipeDots } from "@/components/site/vt/SwipeDots";

const TEXT = {
  pt: { kicker: "blog da vtech", title: "Aprenda antes de contratar", sub: "Guias diretos sobre IA, integrações, sistemas e sites. Escritos por quem constrói, para quem decide.", all: "Ver todos os artigos", read: "Ler artigo", min: "min", next: "próximo", go: "Ir para o blog" },
  en: { kicker: "vtech blog", title: "Learn before you hire", sub: "Straight guides on AI, integrations, systems and websites. Written by the people who build, for the people who decide.", all: "See all articles", read: "Read article", min: "min", next: "next", go: "Go to the blog" },
  es: { kicker: "blog de vtech", title: "Aprenda antes de contratar", sub: "Guías directas sobre IA, integraciones, sistemas y sitios. Escritas por quien construye, para quien decide.", all: "Ver todos los artículos", read: "Leer artículo", min: "min", next: "próximo", go: "Ir al blog" },
};

/** Sempre 4 artigos (o mais recente em destaque + 3 ao lado): a seção não cresce com o blog. */
export function HomeBlog() {
  const t = useT(TEXT);
  const locale = useLocale();
  const posts = getPosts(locale).slice(0, 4);
  const next = nextScheduledPost(locale);
  if (!posts.length) return null;
  const [feat, ...side] = posts;
  return (
    <section id="blog" className="vt-sec vt-screen vt-blog">
      <div className="vt-wrap">
        <div className="vt-blog-top">
          <div className="vt-head">
            <span className="vt-kicker">{t.kicker}</span>
            <h2 className="vt-h2 vt-dot">{t.title}</h2>
            <p>{t.sub}</p>
          </div>
          <Link to="/blog" className="btn btn-line btn-arrow">
            {t.all}
            <ArrowDot />
          </Link>
        </div>
        <div className="vt-bgrid">
          <PostTile post={feat} kind="feat" />
          <div className="vt-bside">
            {side.map((p) => (
              <PostTile key={p.slug} post={p} kind="hz" />
            ))}
          </div>
        </div>
        <SwipeDots count={posts.length} />
        {next && (
          <div className="vt-bnext">
            <span>
              <small>
                {t.next} · {formatDate(next.publishedAt, locale)}
              </small>
              {next.title}
            </span>
            <Link to="/blog" className="vt-link">
              {t.go} <Ico name="arrow" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function PostTile({ post, kind }: { post: Post; kind: "feat" | "hz" }) {
  const t = useT(TEXT);
  const locale = useLocale();
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="vt-bpost"
      {...(kind === "feat" ? { "data-feat": "" } : { "data-hz": "" })}
    >
      <BlogCover post={post} />
      <div className="vt-bb">
        <span className="vt-btag">
          <b>{post.category.name}</b>
          <span>{formatDate(post.publishedAt, locale)}</span>
          <span>·</span>
          <span>
            {post.readingMinutes} {t.min}
          </span>
        </span>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <span className="vt-rd">
          {t.read} <Ico name="arrow" />
        </span>
      </div>
    </Link>
  );
}
