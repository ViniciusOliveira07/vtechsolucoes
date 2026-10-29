import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/site";
import { pick } from "@/lib/i18n";
import { Hero } from "@/components/site/sections/Hero";
import { Layers } from "@/components/site/sections/Layers";
import { ServicesExplorer } from "@/components/site/sections/ServicesExplorer";
import { SpecSheet } from "@/components/site/sections/SpecSheet";
import { Credentials } from "@/components/site/sections/Credentials";
import { CtaBand } from "@/components/site/sections/CtaBand";
import { BlogPreview } from "@/components/site/sections/BlogPreview";
import { Contact } from "@/components/site/sections/Contact";

const HEAD = {
  pt: {
    title: "Vtech Soluções | Sistemas, integrações e IA para operações B2B",
    description:
      "Construímos sistemas, integrações e agentes de IA que conectam canais, ERP e CRM. Escopo fechado, proposta em até 24 horas úteis e código entregue a você.",
  },
  en: {
    title: "Vtech Soluções | Systems, integrations and AI for B2B operations",
    description:
      "We build systems, integrations and AI agents that connect your channels, ERP and CRM. Fixed scope, a proposal within 24 business hours and the code handed over to you.",
  },
  es: {
    title: "Vtech Soluções | Sistemas, integraciones e IA para operaciones B2B",
    description:
      "Construimos sistemas, integraciones y agentes de IA que conectan canales, ERP y CRM. Alcance cerrado, propuesta en hasta 24 horas hábiles y el código entregado a usted.",
  },
};

export const Route = createFileRoute("/")({
  head: ({ match }) => {
    const locale = match.context.locale;
    const t = pick(HEAD, locale);
    return seo({ title: t.title, description: t.description, path: "/", locale });
  },
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Layers withFlow />
      <ServicesExplorer />
      <SpecSheet />
      <Credentials />
      <CtaBand />
      <BlogPreview />
      <Contact />
    </>
  );
}
