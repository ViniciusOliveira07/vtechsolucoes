import { useEffect } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { formatDate, getPost, relatedPosts, serviceFor } from "@/lib/blog";
import { renderPost } from "@/lib/blog-render";
import { absoluteUrl, breadcrumbSchema, jsonLd, seo, SITE_NAME, SITE_URL } from "@/lib/site";
import { Events } from "@/lib/analytics";
import { trackView } from "@/lib/views";
import { PostCard, ViewCount } from "@/components/site/PostCard";
import { RailHint } from "@/components/site/RailHint";
import { DownloadPostButton } from "@/components/site/DownloadPostDialog";
import { CtaBand } from "@/components/site/sections/CtaBand";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { slug: post.slug };
  },
  head: ({ loaderData }) => {
    const post = loaderData && getPost(loaderData.slug);
    if (!post) return {};
    const path = `/blog/${post.slug}`;
    return {
      ...seo({
        title: `${post.title} | ${SITE_NAME}`,
        description: post.description,
        path,
        type: "article",
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
      }),
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          inLanguage: "pt-BR",
          mainEntityOfPage: absoluteUrl(path),
          articleSection: post.category.name,
          keywords: post.tags.join(", "),
          author: { "@type": "Organization", name: post.author, url: SITE_URL },
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL, logo: `${SITE_URL}/favicon.svg` },
        }),
        jsonLd(
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.category.name, path: `/blog/categoria/${post.category.slug}` },
            { name: post.title, path },
          ]),
        ),
      ],
    };
  },
  component: PostPage,
});

function PostPage() {
  const { slug } = Route.useLoaderData();
  const post = getPost(slug)!;
  const service = serviceFor(post.category);
  const related = relatedPosts(post);

  useEffect(() => trackView(post.slug), [post.slug]);

  return (
    <>
      <article className="section-flow">
        <div className="shell">
          <nav aria-label="Trilha de navegação" className="mb-8 font-mono text-xs text-faint">
            <Link to="/" className="hover:text-foreground">
              início
            </Link>{" "}
            /{" "}
            <Link to="/blog" className="hover:text-foreground">
              blog
            </Link>{" "}
            /{" "}
            <Link
              to="/blog/categoria/$categoria"
              params={{ categoria: post.category.slug }}
              className="hover:text-foreground"
            >
              {post.category.slug}
            </Link>
          </nav>

          <header className="max-w-[53.75rem]">
            <Link
              to="/blog/categoria/$categoria"
              params={{ categoria: post.category.slug }}
              className="kicker -my-3 inline-flex min-h-11 items-center text-signal hover:underline"
            >
              {post.category.name}
            </Link>
            <h1 className="mt-4 text-[clamp(2.125rem,4.4vw,3.625rem)] font-medium leading-[1.05] tracking-[-0.035em]">
              {post.title}
            </h1>
            <p className="mt-5 max-w-[62ch] text-lg text-muted-foreground">{post.description}</p>
            <p className="mt-6 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-faint">
              <span>{post.author}</span>
              <span>
                publicado <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </span>
              {post.updatedAt !== post.publishedAt && (
                <span>
                  atualizado <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                </span>
              )}
              <span>{post.readingMinutes} min de leitura</span>
              <ViewCount slug={post.slug} />
            </p>
            <div className="mt-7">
              <DownloadPostButton post={post} />
            </div>
          </header>

          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_17.5rem]">
            <div className="min-w-0 max-w-[70ch]">
              <div className="prose-vt" dangerouslySetInnerHTML={{ __html: renderPost(post.slug) }} />
              <aside className="panel mt-14 p-7" aria-label="Serviço relacionado">
                <p className="kicker">Serviço relacionado</p>
                <p className="mt-3 text-[1.375rem] tracking-[-0.02em]">{service.title}</p>
                <p className="mt-2 text-[0.9375rem] text-muted-foreground">{service.forWho}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to="/contato"
                    onClick={() => Events.ctaClick("Iniciar diagnóstico", "blog_post", post.slug)}
                    className="btn"
                  >
                    Iniciar diagnóstico →
                  </Link>
                  <DownloadPostButton post={post} />
                </div>
                <Link
                  to={`/servicos/${service.slug}`}
                  className="mt-3 inline-flex min-h-11 items-center font-mono text-[0.8125rem] text-signal hover:underline"
                >
                  conhecer o serviço de {service.title.toLowerCase()} →
                </Link>
              </aside>
            </div>

            {post.headings.length > 2 && (
              <aside className="hidden lg:block" aria-label="Neste artigo">
                <div className="sticky top-24">
                  <p className="kicker mb-3">Neste artigo</p>
                  <ol className="grid gap-1 border-l border-border text-sm">
                    {post.headings
                      .filter((h) => h.level === 2)
                      .map((h) => (
                        <li key={h.id}>
                          <a
                            href={`#${h.id}`}
                            className="-ml-px block border-l border-transparent py-1 pl-4 text-muted-foreground hover:border-signal hover:text-foreground"
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                  </ol>
                </div>
              </aside>
            )}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section">
          <div className="shell">
            <h2 className="h-section mb-[clamp(1.25rem,5vh,2.5rem)]">Leia também</h2>
            <div tabIndex={0} aria-label="Artigos relacionados" className="rail grid gap-5 md:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
            <RailHint />
          </div>
        </section>
      )}
      <CtaBand location="blog_post_footer" slug={post.slug} />
    </>
  );
}
