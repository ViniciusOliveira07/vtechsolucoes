import { createFileRoute } from "@tanstack/react-router";
import { breadcrumbSchema, jsonLd, localizedUrl, seo } from "@/lib/site";
import { pick } from "@/lib/i18n";
import { ServicesExplorer } from "@/components/site/sections/ServicesExplorer";
import { Layers } from "@/components/site/sections/Layers";
import { CtaBand } from "@/components/site/sections/CtaBand";

const HEAD = {
  pt: {
    title: "Serviços de tecnologia B2B | Vtech Soluções",
    description:
      "Automações com IA, sistemas web sob medida, integrações de ERP e CRM, sites institucionais e consultoria técnica. Projeto com escopo fechado.",
    home: "Início",
    services: "Serviços",
  },
  en: {
    title: "B2B technology services | Vtech Soluções",
    description:
      "AI automations, custom web systems, ERP and CRM integrations, corporate websites and technical consulting. Fixed-scope projects.",
    home: "Home",
    services: "Services",
  },
  es: {
    title: "Servicios de tecnología B2B | Vtech Soluções",
    description:
      "Automatizaciones con IA, sistemas web a medida, integraciones de ERP y CRM, sitios institucionales y consultoría técnica. Proyectos con alcance cerrado.",
    home: "Inicio",
    services: "Servicios",
  },
};

export const Route = createFileRoute("/servicos/")({
  head: ({ match }) => {
    const locale = match.context.locale;
    const t = pick(HEAD, locale);
    return {
      ...seo({ title: t.title, description: t.description, path: "/servicos", locale }),
      scripts: [
        jsonLd(
          breadcrumbSchema([
            { name: t.home, path: localizedUrl("/", locale) },
            { name: t.services, path: localizedUrl("/servicos", locale) },
          ]),
        ),
      ],
    };
  },
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
