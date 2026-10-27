import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/site";
import { Hero } from "@/components/site/sections/Hero";
import { Layers } from "@/components/site/sections/Layers";
import { ServicesExplorer } from "@/components/site/sections/ServicesExplorer";
import { SpecSheet } from "@/components/site/sections/SpecSheet";
import { Credentials } from "@/components/site/sections/Credentials";
import { CtaBand } from "@/components/site/sections/CtaBand";
import { BlogPreview } from "@/components/site/sections/BlogPreview";
import { Contact } from "@/components/site/sections/Contact";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Vtech Soluções | Sistemas, integrações e IA para operações B2B",
      description:
        "Construímos sistemas, integrações e agentes de IA que conectam canais, ERP e CRM. Escopo fechado, proposta em até 24 horas úteis e código entregue a você.",
      path: "/",
    }),
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
