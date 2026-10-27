import { createFileRoute } from "@tanstack/react-router";
import { breadcrumbSchema, jsonLd, seo } from "@/lib/site";
import { ServicesExplorer } from "@/components/site/sections/ServicesExplorer";
import { Layers } from "@/components/site/sections/Layers";
import { CtaBand } from "@/components/site/sections/CtaBand";

export const Route = createFileRoute("/servicos/")({
  head: () => ({
    ...seo({
      title: "Serviços de tecnologia B2B | Vtech Soluções",
      description:
        "Automações com IA, sistemas web sob medida, integrações de ERP e CRM, sites institucionais e consultoria técnica. Projeto com escopo fechado.",
      path: "/servicos",
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" },
        ]),
      ),
    ],
  }),
  component: ServicosPage,
});

function ServicosPage() {
  return (
    <>
      <ServicesExplorer headingAs="h1" />
      <Layers />
      <CtaBand location="servicos_index" />
    </>
  );
}
