import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/site";
import { pick } from "@/lib/i18n";
import { Contact } from "@/components/site/sections/Contact";
import { SpecSheet } from "@/components/site/sections/SpecSheet";

const HEAD = {
  pt: {
    title: "Contato | Vtech Soluções",
    description:
      "Conte o desafio da sua operação. Devolvemos um diagnóstico e uma proposta com escopo, prazo e investimento em até 24 horas úteis. Atendimento B2B.",
  },
  en: {
    title: "Contact | Vtech Soluções",
    description:
      "Tell us about the challenge in your operation. We send back a diagnosis and a proposal with scope, timeline and budget within 24 business hours. B2B only.",
  },
  es: {
    title: "Contacto | Vtech Soluções",
    description:
      "Cuéntenos el desafío de su operación. Le devolvemos un diagnóstico y una propuesta con alcance, plazo e inversión en hasta 24 horas hábiles. Atención B2B.",
  },
};

export const Route = createFileRoute("/contato")({
  head: ({ match }) => {
    const locale = match.context.locale;
    const t = pick(HEAD, locale);
    return seo({ title: t.title, description: t.description, path: "/contato", locale });
  },
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
