import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/site";
import { Contact } from "@/components/site/sections/Contact";
import { SpecSheet } from "@/components/site/sections/SpecSheet";

export const Route = createFileRoute("/contato")({
  head: () =>
    seo({
      title: "Contato | Vtech Soluções",
      description:
        "Conte o desafio da sua operação. Devolvemos um diagnóstico e uma proposta com escopo, prazo e investimento em até 24 horas úteis. Atendimento B2B.",
      path: "/contato",
    }),
  component: ContatoPage,
});

function ContatoPage() {
  return (
    <>
      <Contact headingAs="h1" />
      <SpecSheet />
    </>
  );
}
