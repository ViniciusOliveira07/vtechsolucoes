import { createFileRoute, notFound } from "@tanstack/react-router";
import { getCategory, postsInCategory } from "@/lib/blog";
import { breadcrumbSchema, jsonLd, seo } from "@/lib/site";
import { BlogIndex } from "@/components/site/BlogIndex";

export const Route = createFileRoute("/blog/categoria/$categoria")({
  loader: ({ params }) => {
    const category = getCategory(params.categoria);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { category } = loaderData;
    const path = `/blog/categoria/${category.slug}`;
    return {
      ...seo({ title: `${category.name} | Blog Vtech Soluções`, description: category.description, path }),
      scripts: [
        jsonLd(
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: category.name, path },
          ]),
        ),
      ],
    };
  },
  component: CategoriaPage,
});

function CategoriaPage() {
  const { category } = Route.useLoaderData();
  return <BlogIndex key={category.slug} category={category} posts={postsInCategory(category.slug)} />;
}
