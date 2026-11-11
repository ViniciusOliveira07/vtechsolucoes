import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { ServicePageLayout } from "@/components/site/ServicePageLayout";
import { buildServiceSchema } from "@/lib/service-schema";
import { Events } from "@/lib/analytics";
import { breadcrumbSchema, jsonLd, localizedUrl, seo } from "@/lib/site";
import { getSolucao } from "@/lib/solucoes";

/** Páginas de "Soluções": uma por busca principal, no mesmo layout das páginas de serviço. */
export const Route = createFileRoute("/solucoes/$slug")({
  loader: ({ params }) => {
    if (!getSolucao(params.slug)) throw notFound();
  },
  head: ({ params, match }) => {
    const s = getSolucao(params.slug);
    if (!s) return {};
    const locale = match.context.locale;
    const path = `/solucoes/${s.data.slug}`;
    return {
      ...seo({ title: s.title, description: s.description, path, locale }),
      scripts: [
        jsonLd(
          buildServiceSchema({
            name: s.schemaName,
            description: s.description,
            url: localizedUrl(path, locale),
            serviceType: s.serviceType,
            locale,
          }),
        ),
        jsonLd(
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Soluções", path: "/solucoes" },
            { name: s.data.eyebrow, path },
          ]),
        ),
      ],
    };
  },
  component: Page,
});

function Page() {
  const { slug } = Route.useParams();
  const s = getSolucao(slug)!;
  useEffect(() => {
    Events.servicePageView(`solucoes/${slug}`);
  }, [slug]);
  return <ServicePageLayout key={slug} data={s.data} />;
}
