import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/site";
import { pick } from "@/lib/i18n";
import { HomeHero } from "@/components/site/home/HomeHero";
import { ProcessRouter } from "@/components/site/home/ProcessRouter";
import { ServiceStack } from "@/components/site/home/ServiceStack";
import { LayerStack } from "@/components/site/home/LayerStack";
import { SpecTable } from "@/components/site/home/SpecTable";
import { Pipeline } from "@/components/site/home/Pipeline";
import { HomeBlog } from "@/components/site/home/HomeBlog";
import { HomeFaq } from "@/components/site/home/HomeFaq";
import { FinalCta } from "@/components/site/home/FinalCta";

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

/** Blocos que surgem ao entrar na tela; o que já está visível no carregamento não anima. */
const RISE = ".vt-head, .vt-lay-list, .vt-stage, .vt-sheet2, .vt-stg, .vt-bar2, .vt-bpost, .vt-bnext, .vt-help, .vt-acc, .vt-final";

function useRise() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          (e.target as HTMLElement).dataset.pre = "false";
          io.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll<HTMLElement>(RISE).forEach((el) => {
      if (el.getBoundingClientRect().top <= window.innerHeight) return;
      el.classList.add("vt-rise");
      el.dataset.pre = "true";
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}

function HomePage() {
  useRise();
  return (
    <>
      <HomeHero />
      <ProcessRouter />
      <ServiceStack />
      <LayerStack />
      <SpecTable />
      <Pipeline />
      <HomeBlog />
      <HomeFaq />
      <FinalCta />
    </>
  );
}
