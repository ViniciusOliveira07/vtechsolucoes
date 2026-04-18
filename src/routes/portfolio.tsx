import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/site/sections/Portfolio";
import { FinalCTA } from "@/components/site/sections/FinalCTA";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfólio — Vtech Soluções" },
      {
        name: "description",
        content:
          "Cases de SaaS B2B, e-commerce industrial e plataformas de logística. Projetos com IA embarcada, entregues no prazo.",
      },
      { property: "og:title", content: "Portfólio — Vtech Soluções" },
      {
        property: "og:description",
        content:
          "Projetos selecionados de tecnologia B2B com IA embarcada — SaaS, e-commerce e logística.",
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <>
      <section className="relative flex min-h-[60vh] items-end bg-background pt-32 pb-16">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
          <p className="text-eyebrow mb-6">Portfólio</p>
          <h1 className="text-display-xl font-display max-w-4xl">
            Trabalhos que<br />
            <span className="text-shimmer">funcionam.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Uma seleção de cases recentes. Cada projeto com IA embarcada e arquitetura
            pensada para escalar.
          </p>
        </div>
      </section>
      <Portfolio />
      <FinalCTA />
    </>
  );
}
