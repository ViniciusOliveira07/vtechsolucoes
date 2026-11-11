import { useEffect } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { formatDate, getCategory, getPost, loadPostBody, relatedPosts, serviceFor, slugify, type Post } from "@/lib/blog";
import { renderPost } from "@/lib/blog-render";
import { LOCALE_META, pick, useLocale, useT, type Locale } from "@/lib/i18n";
import { breadcrumbSchema, jsonLd, localizedUrl, seo, SITE_NAME, SITE_URL } from "@/lib/site";
import { trackView } from "@/lib/views";
import { PostCard, ViewCount } from "@/components/site/PostCard";
import { Crumbs, SecHead } from "@/components/site/vt/Page";
import { DownloadPostButton } from "@/components/site/DownloadPostDialog";
import { CtaBand } from "@/components/site/sections/CtaBand";
import { PostOffer } from "@/components/site/PostOffer";
import { Ico } from "@/components/site/home/Ico";
import { solucaoForPost } from "@/lib/solucoes";

const TEXT = {
  pt: {
    breadcrumb: "Trilha de navegação",
    home: "início",
    published: "publicado",
    updated: "atualizado",
    reading: "min de leitura",
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
  // o texto do artigo vem de um arquivo próprio (não fica no JavaScript inicial do site)
  loader: async ({ params, context }) => {
    const post = getPost(params.slug, context.locale);
    if (!post) throw notFound();
    return { slug: post.slug, body: await loadPostBody(post.slug, post.locale) };
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
        title: post.seoTitle ?? `${post.title} | Vtech`,
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
  const { slug, body } = Route.useLoaderData();
  const locale = useLocale();
  const t = useT(TEXT);
  const post = getPost(slug, locale)!;
  const category = categoryIn(post, locale);
  const service = serviceFor(category, locale);
  // relacionados na lista do idioma da página (o artigo pode ter vindo em português por falta de tradução)
  const related = relatedPosts({ ...post, locale });
  const solucao = solucaoForPost(post.slug, post.category.slug);

  useEffect(() => trackView(post.slug), [post.slug]);

  return (
    <>
      <section className="vt-hero vt-page-hero">
        <div className="vt-wrap">
          <Crumbs
            label={t.breadcrumb}
            items={[
              { label: t.home, to: "/" },
              { label: "blog", to: "/blog" },
              { label: slugify(category.name), to: `/blog/categoria/${post.category.slug}` },
            ]}
          />
          <header className="max-w-[54rem]">
            <Link to="/blog/categoria/$categoria" params={{ categoria: post.category.slug }} className="vt-kicker">
              {category.name}
            </Link>
            <h1 className="vt-h1 vt-page-title">{post.title}</h1>
            <p className="vt-hero-sub">{post.description}</p>
            <p className="vt-meta-row">
              <span>{post.author}</span>
              <span>
                {t.published} <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
              </span>
              {post.updatedAt !== post.publishedAt && (
                <span>
                  {t.updated} <time dateTime={post.updatedAt}>{formatDate(post.updatedAt, locale)}</time>
                </span>
              )}
              <span>
                {post.readingMinutes} {t.reading}
              </span>
              <ViewCount slug={post.slug} />
            </p>
            <div className="mt-6">
              <DownloadPostButton post={post} />
            </div>
          </header>
        </div>
      </section>

      <article className="vt-article">
        <div className="vt-wrap">
          <div className="vt-article-grid">
            <div className="vt-article-body">
              <div className="prose-vt" dangerouslySetInnerHTML={{ __html: renderPost(post.slug, post.locale, body) }} />
              {solucao && (
                <Link to="/solucoes/$slug" params={{ slug: solucao.data.slug }} className="vt-tile vt-tile-link vt-sol-link">
                  <span className="vt-kicker">solução relacionada</span>
                  <h2>{solucao.data.eyebrow}</h2>
                  <p>{solucao.card}</p>
                  <span className="vt-rd">
                    Ver a solução <Ico name="arrow" />
                  </span>
                </Link>
              )}
            </div>
            {post.headings.length > 2 && (
              <aside className="hidden lg:block" aria-label={t.toc}>
                <div className="vt-toc">
                  <span className="vt-eyebrow">{t.toc}</span>
                  <ol>
                    {post.headings
                      .filter((h) => h.level === 2)
                      .map((h) => (
                        <li key={h.id}>
                          <a href={`#${h.id}`}>{h.text}</a>
                        </li>
                      ))}
                  </ol>
                </div>
              </aside>
            )}
          </div>
          <PostOffer post={post} service={service} />
        </div>
      </article>

      {related.length > 0 && (
        <section className="vt-sec">
          <div className="vt-wrap">
            <SecHead kicker="blog" title={t.readAlso} />
            <div aria-label={t.relatedArticles} className="vt-posts">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand location="blog_post_footer" slug={post.slug} />
    </>
  );
}
