import { useEffect } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { formatDate, getCategory, getPost, relatedPosts, serviceFor, slugify, type Post } from "@/lib/blog";
import { renderPost } from "@/lib/blog-render";
import { LOCALE_META, pick, useLocale, useT, type Locale } from "@/lib/i18n";
import { breadcrumbSchema, jsonLd, localizedUrl, seo, SITE_NAME, SITE_URL } from "@/lib/site";
import { Events } from "@/lib/analytics";
import { trackView } from "@/lib/views";
import { PostCard, ViewCount } from "@/components/site/PostCard";
import { RailHint } from "@/components/site/RailHint";
import { DownloadPostButton } from "@/components/site/DownloadPostDialog";
import { CtaBand } from "@/components/site/sections/CtaBand";

// só a inicial: siglas como IA/AI continuam em maiúsculas
const lowerFirst = (s: string) => (/^.[a-zà-ÿ]/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s);

const TEXT = {
  pt: {
    breadcrumb: "Trilha de navegação",
    home: "início",
    published: "publicado",
    updated: "atualizado",
    reading: "min de leitura",
    relatedService: "Serviço relacionado",
    cta: "Iniciar diagnóstico →",
    serviceLink: (name: string) => `conhecer o serviço de ${lowerFirst(name)} →`,
    toc: "Neste artigo",
    readAlso: "Leia também",
    relatedArticles: "Artigos relacionados",
  },
  en: {
    breadcrumb: "Breadcrumb",
    home: "home",
    published: "published",
    updated: "updated",
    reading: "min read",
    relatedService: "Related service",
    cta: "Start diagnosis →",
    serviceLink: (name: string) => `explore our ${lowerFirst(name)} service →`,
    toc: "In this article",
    readAlso: "Keep reading",
    relatedArticles: "Related articles",
  },
  es: {
    breadcrumb: "Ruta de navegación",
    home: "inicio",
    published: "publicado",
    updated: "actualizado",
    reading: "min de lectura",
    relatedService: "Servicio relacionado",
    cta: "Iniciar diagnóstico →",
    serviceLink: (name: string) => `conocer el servicio de ${lowerFirst(name)} →`,
    toc: "En este artículo",
    readAlso: "Lea también",
    relatedArticles: "Artículos relacionados",
  },
};

const HOME = { pt: "Início", en: "Home", es: "Inicio" };

/** Categoria no idioma da página, mesmo quando o artigo ainda não tem tradução e veio em português. */
function categoryIn(post: Post, locale: Locale) {
  return getCategory(post.category.slug, locale) ?? post.category;
}

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params, context }) => {
    const post = getPost(params.slug, context.locale);
    if (!post) throw notFound();
    return { slug: post.slug };
  },
  head: ({ loaderData, match }) => {
    const locale = match.context.locale;
    const post = loaderData && getPost(loaderData.slug, locale);
    if (!post) return {};
    const path = `/blog/${post.slug}`;
    const category = categoryIn(post, locale);
    const url = (p: string) => localizedUrl(p, locale);
    return {
      ...seo({
        title: `${post.title} | ${SITE_NAME}`,
        description: post.description,
        path,
        locale,
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
          // idioma do texto do artigo: sem tradução, continua português
          inLanguage: LOCALE_META[post.locale].html,
          mainEntityOfPage: url(path),
          articleSection: category.name,
          keywords: post.tags.join(", "),
          author: { "@type": "Organization", name: post.author, url: SITE_URL },
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL, logo: `${SITE_URL}/favicon.svg` },
        }),
        jsonLd(
          breadcrumbSchema([
            { name: pick(HOME, locale), path: url("/") },
            { name: "Blog", path: url("/blog") },
            { name: category.name, path: url(`/blog/categoria/${category.slug}`) },
            { name: post.title, path: url(path) },
          ]),
        ),
      ],
    };
  },
  component: PostPage,
});

function PostPage() {
  const { slug } = Route.useLoaderData();
  const locale = useLocale();
  const t = useT(TEXT);
  const post = getPost(slug, locale)!;
  const category = categoryIn(post, locale);
  const service = serviceFor(category, locale);
  // relacionados na lista do idioma da página (o artigo pode ter vindo em português por falta de tradução)
  const related = relatedPosts({ ...post, locale });

  useEffect(() => trackView(post.slug), [post.slug]);

  return (
    <>
      <article className="section-flow">
        <div className="shell">
          <nav aria-label={t.breadcrumb} className="mb-8 font-mono text-xs text-faint">
            <Link to="/" className="hover:text-foreground">
              {t.home}
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
              {slugify(category.name)}
            </Link>
          </nav>

          <header className="max-w-[53.75rem]">
            <Link
              to="/blog/categoria/$categoria"
              params={{ categoria: post.category.slug }}
              className="kicker -my-3 inline-flex min-h-11 items-center text-signal hover:underline"
            >
              {category.name}
            </Link>
            <h1 className="mt-4 text-[clamp(2.125rem,4.4vw,3.625rem)] font-medium leading-[1.05] tracking-[-0.035em]">
              {post.title}
            </h1>
            <p className="mt-5 max-w-[62ch] text-lg text-muted-foreground">{post.description}</p>
            <p className="mt-6 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-faint">
              <span>{post.author}</span>
              <span>
                {t.published} <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
              </span>
              {post.updatedAt !== post.publishedAt && (
                <span>
                  {t.updated} <time dateTime={post.updatedAt}>{formatDate(post.updatedAt, locale)}</time>
                </span>
              )}
              <span>{post.readingMinutes} {t.reading}</span>
              <ViewCount slug={post.slug} />
            </p>
            <div className="mt-7">
              <DownloadPostButton post={post} />
            </div>
          </header>

          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_17.5rem]">
            <div className="min-w-0 max-w-[70ch]">
              <div className="prose-vt" dangerouslySetInnerHTML={{ __html: renderPost(post.slug, locale) }} />
              <aside className="panel mt-14 p-7" aria-label={t.relatedService}>
                <p className="kicker">{t.relatedService}</p>
                <p className="mt-3 text-[1.375rem] tracking-[-0.02em]">{service.title}</p>
                <p className="mt-2 text-[0.9375rem] text-muted-foreground">{service.forWho}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to="/contato"
                    onClick={() => Events.ctaClick("Iniciar diagnóstico", "blog_post", post.slug)}
                    className="btn"
                  >
                    {t.cta}
                  </Link>
                  <DownloadPostButton post={post} />
                </div>
                <Link
                  to={`/servicos/${service.slug}`}
                  className="mt-3 inline-flex min-h-11 items-center font-mono text-[0.8125rem] text-signal hover:underline"
                >
                  {t.serviceLink(service.title)}
                </Link>
              </aside>
            </div>

            {post.headings.length > 2 && (
              <aside className="hidden lg:block" aria-label={t.toc}>
                <div className="sticky top-24">
                  <p className="kicker mb-3">{t.toc}</p>
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
            <h2 className="h-section mb-[clamp(1.25rem,5vh,2.5rem)]">{t.readAlso}</h2>
            <div tabIndex={0} aria-label={t.relatedArticles} className="rail grid gap-5 md:grid-cols-3">
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
