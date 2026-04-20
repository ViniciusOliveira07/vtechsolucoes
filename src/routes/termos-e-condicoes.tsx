import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/termos-e-condicoes")({
  head: () => ({
    meta: [
      { title: "Termos e Condições — Vtech Soluções" },
      {
        name: "description",
        content:
          "Termos de uso do site e condições gerais de prestação de serviços da Vtech Soluções.",
      },
      { property: "og:title", content: "Termos e Condições — Vtech Soluções" },
      {
        property: "og:description",
        content: "Regras de uso do site institucional e condições contratuais B2B.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage
      eyebrow="Documento legal"
      title="Termos e Condições"
      intro="Estes termos regulam o uso do site da Vtech Soluções e estabelecem as condições gerais para nossos serviços B2B."
      updatedAt="Janeiro de 2026"
      sections={[
        {
          title: "Aceitação dos termos",
          body: (
            <p>
              Ao acessar e utilizar este site, você concorda integralmente com
              estes Termos e Condições. Caso não concorde com qualquer cláusula,
              recomendamos não utilizar o site.
            </p>
          ),
        },
        {
          title: "Sobre a Vtech Soluções",
          body: (
            <p>
              A Vtech Soluções é uma empresa de tecnologia B2B especializada em
              desenvolvimento de sites institucionais, sistemas web,
              automações com IA e consultoria técnica para empresas.
            </p>
          ),
        },
        {
          title: "Uso do site",
          body: (
            <ul className="list-disc space-y-2 pl-5">
              <li>O conteúdo é fornecido para fins informativos e comerciais.</li>
              <li>
                É proibido reproduzir, modificar ou distribuir o conteúdo sem
                autorização expressa.
              </li>
              <li>
                É vedado utilizar o site para fins ilegais ou que violem
                direitos de terceiros.
              </li>
            </ul>
          ),
        },
        {
          title: "Propriedade intelectual",
          body: (
            <p>
              Todo o conteúdo do site — incluindo textos, logos, design, código
              e marca — é de propriedade da Vtech Soluções e protegido pela
              legislação de direitos autorais e propriedade industrial.
            </p>
          ),
        },
        {
          title: "Prestação de serviços",
          body: (
            <p>
              Os serviços são prestados mediante contrato específico, com
              escopo, prazo e investimento definidos por escrito. Atuamos
              exclusivamente no segmento B2B (pessoa jurídica).
            </p>
          ),
        },
        {
          title: "Limitação de responsabilidade",
          body: (
            <p>
              A Vtech Soluções não se responsabiliza por danos indiretos,
              lucros cessantes ou perdas decorrentes do uso ou impossibilidade
              de uso deste site, salvo nos casos previstos em lei.
            </p>
          ),
        },
        {
          title: "Alterações nos termos",
          body: (
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer
              momento. As alterações entram em vigor a partir da publicação no
              site, com a data de revisão atualizada.
            </p>
          ),
        },
        {
          title: "Lei aplicável e foro",
          body: (
            <p>
              Estes termos são regidos pela legislação brasileira. Fica eleito
              o foro da Comarca de São Paulo/SP para dirimir quaisquer
              controvérsias.
            </p>
          ),
        },
      ]}
    />
  );
}
