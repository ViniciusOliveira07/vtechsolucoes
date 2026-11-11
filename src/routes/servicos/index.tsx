import { createFileRoute } from "@tanstack/react-router";
import { breadcrumbSchema, jsonLd, localizedUrl, seo } from "@/lib/site";
import { pick } from "@/lib/i18n";
import { useT } from "@/lib/i18n";
import { PageHero } from "@/components/site/vt/Page";
import { ServiceStack } from "@/components/site/home/ServiceStack";
import { LayerStack } from "@/components/site/home/LayerStack";
import { CtaBand } from "@/components/site/sections/CtaBand";

const TEXT = {
  pt: { kicker: "o que construímos", title: "Cinco frentes. Um só time responsável.", sub: "Automações com IA, sistemas web, integrações, sites e consultoria. Contratadas separadamente ou combinadas no mesmo projeto, com escopo fechado e código entregue a você.", crumbs: "Trilha de navegação", home: "início", here: "serviços" },
  en: { kicker: "what we build", title: "Five fronts. One accountable team.", sub: "AI automations, web systems, integrations, websites and consulting. Hired separately or combined in the same project, with fixed scope and the code handed over to you.", crumbs: "Breadcrumb", home: "home", here: "services" },
  es: { kicker: "lo que construimos", title: "Cinco frentes. Un solo equipo responsable.", sub: "Automatizaciones con IA, sistemas web, integraciones, sitios y consultoría. Contratados por separado o combinados en el mismo proyecto, con alcance cerrado y el código entregado a usted.", crumbs: "Ruta de navegación", home: "inicio", here: "servicios" },
};

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
  const t = useT(TEXT);
  return (
    <>
      <PageHero
        crumbsLabel={t.crumbs}
        crumbs={[{ label: t.home, to: "/" }, { label: t.here }]}
        kicker={t.kicker}
        title={t.title}
        sub={t.sub}
      />
      <ServiceStack all hideHead />
      <LayerStack />
      <CtaBand location="servicos_index" />
    </>
  );
}
