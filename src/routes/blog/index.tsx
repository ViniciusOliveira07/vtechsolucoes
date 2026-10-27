import { createFileRoute } from "@tanstack/react-router";
import { POSTS } from "@/lib/blog";
import { absoluteUrl, breadcrumbSchema, jsonLd, seo, SITE_NAME } from "@/lib/site";
import { BlogIndex } from "@/components/site/BlogIndex";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    ...seo({
      title: "Blog | Vtech Soluções",
      description:
        "Guias práticos sobre automação com IA, integrações de ERP e CRM, sistemas sob medida e SEO técnico para empresas B2B.",
      path: "/blog",
    }),
    scripts: [
      jsonLd({
        "@context": "https://schema.org",
        "@type": "Blog",
        name: `Blog ${SITE_NAME}`,
        url: absoluteUrl("/blog"),
        blogPost: POSTS.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: absoluteUrl(`/blog/${p.slug}`),
          datePublished: p.publishedAt,
        })),
      }),
      jsonLd(
        breadcrumbSchema([
          { name: "Início", path: "/" },
          { name: "Blog", path: "/blog" },
        ]),
      ),
    ],
  }),
  component: () => <BlogIndex posts={POSTS} />,
});
