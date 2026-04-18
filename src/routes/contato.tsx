import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/site/sections/Contact";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Vtech Soluções" },
      {
        name: "description",
        content:
          "Iniciar projeto com a Vtech Soluções. Atendimento exclusivamente B2B, resposta em até 24 horas úteis.",
      },
      { property: "og:title", content: "Contato — Vtech Soluções" },
      {
        property: "og:description",
        content: "Vamos conversar sobre seu próximo projeto. B2B only.",
      },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  return (
    <>
      <section className="relative flex min-h-[50vh] items-end bg-background pt-32 pb-8">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
          <p className="text-eyebrow mb-6">Contato</p>
          <h1 className="text-display-xl font-display max-w-4xl">
            Vamos<br />
            <span className="text-shimmer">conversar.</span>
          </h1>
        </div>
      </section>
      <Contact />
    </>
  );
}
