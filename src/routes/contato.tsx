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
    <div className="pt-24">
      <Contact />
    </div>
  );
}
