import { createFileRoute, Link } from "@tanstack/react-router";
import { breadcrumbSchema, jsonLd, seo } from "@/lib/site";
import { SectionHead } from "@/components/site/SectionHead";
import { Credentials } from "@/components/site/sections/Credentials";
import { Layers } from "@/components/site/sections/Layers";
import { CtaBand } from "@/components/site/sections/CtaBand";

const PRINCIPLES = [
  {
    title: "Escopo antes de código",
    desc: "Nenhum projeto começa sem escopo, prazo e investimento aprovados por escrito.",
  },
  {
    title: "IA onde ela se paga",
    desc: "Usamos IA quando ela reduz trabalho ou custo de forma mensurável. Quando uma regra simples resolve, usamos a regra.",
  },
  {
    title: "O sistema é seu",
    desc: "Código, documentação e acessos ficam com você. Sua equipe ou outro fornecedor consegue continuar o trabalho.",
  },
];

export const Route = createFileRoute("/sobre")({
  head: () => ({
    ...seo({
      title: "Sobre a Vtech Soluções | Engenharia de software e IA aplicada",
      description:
        "Empresa de tecnologia B2B em São Paulo. Construímos sistemas, integrações e automações com IA com escopo fechado e código entregue ao cliente.",
      path: "/sobre",
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Início", path: "/" },
          { name: "Sobre", path: "/sobre" },
        ]),
      ),
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <>
      <section className="section">
        <div className="shell">
          <SectionHead as="h1" title="Engenharia de software e IA aplicada para operações B2B.">
            A Vtech Soluções é uma empresa de tecnologia de São Paulo. Uma única equipe responde pela interface, pela
            integração e pela inteligência de cada projeto.
          </SectionHead>
          <div className="grid gap-px overflow-hidden rounded-[14px] border border-border bg-border md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <article key={p.title} className="bg-background p-7">
                <h2 className="text-[22px] tracking-[-0.02em]">{p.title}</h2>
                <p className="mt-2.5 text-[15px] text-muted-foreground">{p.desc}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-muted-foreground">
            Veja como funciona cada etapa em{" "}
            <Link to="/metodo" className="text-signal underline underline-offset-4">
              nosso método
            </Link>
            .
          </p>
        </div>
      </section>
      <Credentials />
      <Layers />
      <CtaBand location="sobre" />
    </>
  );
}
