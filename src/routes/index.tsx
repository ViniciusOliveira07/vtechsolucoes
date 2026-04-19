import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/sections/Hero";
import { Positioning } from "@/components/site/sections/Positioning";
import { Services } from "@/components/site/sections/Services";
import { Process } from "@/components/site/sections/Process";
import { Numbers } from "@/components/site/sections/Numbers";
import { FinalCTA } from "@/components/site/sections/FinalCTA";
import { Contact } from "@/components/site/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vtech Soluções — Sites e sistemas inteligentes com IA" },
      {
        name: "description",
        content:
          "Empresa de tecnologia B2B. Entregamos sites e sistemas com IA embarcada — 3× mais rápido que agências tradicionais. Projeto fechado, sem mensalidade.",
      },
      {
        property: "og:title",
        content: "Vtech Soluções — Sites e sistemas inteligentes com IA",
      },
      {
        property: "og:description",
        content:
          "Boutique de tecnologia B2B com IA no processo e no produto. Mais rápido, mais moderno, mais acessível.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Positioning />
      <Services />
      <Process />
      <Numbers />
      <FinalCTA />
      <Contact />
    </>
  );
}
