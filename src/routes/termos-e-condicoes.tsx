import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/site";
import { LegalPage, type LegalDoc } from "@/components/site/LegalPage";
import { pick, useT } from "@/lib/i18n";

const HEAD = {
  pt: {
    title: "Termos e Condições | Vtech Soluções",
    description:
      "Termos de uso do site e condições gerais de prestação de serviços B2B da Vtech Soluções.",
  },
  en: {
    title: "Terms and Conditions | Vtech Soluções",
    description:
      "Website terms of use and general terms and conditions for the provision of B2B services by Vtech Soluções.",
  },
  es: {
    title: "Términos y Condiciones | Vtech Soluções",
    description:
      "Términos de uso del sitio y condiciones generales de prestación de servicios B2B de Vtech Soluções.",
  },
};

export const Route = createFileRoute("/termos-e-condicoes")({
  head: ({ match }) => {
    const locale = match.context.locale;
    const t = pick(HEAD, locale);
    return seo({ title: t.title, description: t.description, path: "/termos-e-condicoes", locale });
  },
  component: TermsPage,
});

const DOC: LegalDoc = {
  pt: {
    eyebrow: "Documento legal",
    title: "Termos e Condições",
    intro:
      "Estes termos regulam o uso do site da Vtech Soluções e estabelecem as condições gerais para nossos serviços B2B.",
    updatedAt: "Janeiro de 2026",
    sections: [
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
    ],
  },
  en: {
    eyebrow: "Legal document",
    title: "Terms and Conditions",
    intro:
      "These terms govern the use of the Vtech Soluções website and set out the general conditions for our B2B services.",
    updatedAt: "January 2026",
    sections: [
      {
        title: "Acceptance of the terms",
        body: (
          <p>
            By accessing and using this website, you fully agree to these
            Terms and Conditions. If you do not agree with any clause, we
            recommend that you do not use the website.
          </p>
        ),
      },
      {
        title: "About Vtech Soluções",
        body: (
          <p>
            Vtech Soluções is a B2B technology company specializing in the
            development of corporate websites, web systems, AI automations
            and technical consulting for businesses.
          </p>
        ),
      },
      {
        title: "Use of the website",
        body: (
          <ul className="list-disc space-y-2 pl-5">
            <li>The content is provided for informational and commercial purposes.</li>
            <li>
              Reproducing, modifying or distributing the content without
              express authorization is prohibited.
            </li>
            <li>
              Using the website for unlawful purposes or in ways that infringe
              the rights of third parties is forbidden.
            </li>
          </ul>
        ),
      },
      {
        title: "Intellectual property",
        body: (
          <p>
            All website content — including text, logos, design, code and
            brand — is the property of Vtech Soluções and is protected by
            copyright and industrial property laws.
          </p>
        ),
      },
      {
        title: "Provision of services",
        body: (
          <p>
            Services are provided under a specific contract, with scope,
            timeline and investment defined in writing. We work exclusively
            in the B2B segment (legal entities).
          </p>
        ),
      },
      {
        title: "Limitation of liability",
        body: (
          <p>
            Vtech Soluções is not liable for indirect damages, lost profits
            or losses arising from the use of, or inability to use, this
            website, except in the cases provided for by law.
          </p>
        ),
      },
      {
        title: "Changes to the terms",
        body: (
          <p>
            We reserve the right to modify these terms at any time. Changes
            take effect upon publication on the website, with the revision
            date updated.
          </p>
        ),
      },
      {
        title: "Governing law and jurisdiction",
        body: (
          <p>
            These terms are governed by the laws of Brazil. The courts of the
            judicial district (Comarca) of São Paulo, State of São Paulo,
            Brazil, are elected to settle any disputes.
          </p>
        ),
      },
    ],
  },
  es: {
    eyebrow: "Documento legal",
    title: "Términos y Condiciones",
    intro:
      "Estos términos regulan el uso del sitio de Vtech Soluções y establecen las condiciones generales de nuestros servicios B2B.",
    updatedAt: "enero de 2026",
    sections: [
      {
        title: "Aceptación de los términos",
        body: (
          <p>
            Al acceder a este sitio y utilizarlo, usted acepta íntegramente
            estos Términos y Condiciones. Si no está de acuerdo con alguna
            cláusula, le recomendamos no utilizar el sitio.
          </p>
        ),
      },
      {
        title: "Sobre Vtech Soluções",
        body: (
          <p>
            Vtech Soluções es una empresa de tecnología B2B especializada en
            el desarrollo de sitios institucionales, sistemas web,
            automatizaciones con IA y consultoría técnica para empresas.
          </p>
        ),
      },
      {
        title: "Uso del sitio",
        body: (
          <ul className="list-disc space-y-2 pl-5">
            <li>El contenido se proporciona con fines informativos y comerciales.</li>
            <li>
              Está prohibido reproducir, modificar o distribuir el contenido
              sin autorización expresa.
            </li>
            <li>
              Se prohíbe utilizar el sitio con fines ilícitos o que vulneren
              derechos de terceros.
            </li>
          </ul>
        ),
      },
      {
        title: "Propiedad intelectual",
        body: (
          <p>
            Todo el contenido del sitio —incluidos textos, logotipos, diseño,
            código y marca— es propiedad de Vtech Soluções y está protegido
            por la legislación de derechos de autor y de propiedad
            industrial.
          </p>
        ),
      },
      {
        title: "Prestación de servicios",
        body: (
          <p>
            Los servicios se prestan mediante un contrato específico, con
            alcance, plazo e inversión definidos por escrito. Actuamos
            exclusivamente en el segmento B2B (personas jurídicas).
          </p>
        ),
      },
      {
        title: "Limitación de responsabilidad",
        body: (
          <p>
            Vtech Soluções no se responsabiliza por daños indirectos, lucro
            cesante ni pérdidas derivadas del uso o de la imposibilidad de
            uso de este sitio, salvo en los casos previstos por la ley.
          </p>
        ),
      },
      {
        title: "Modificaciones de los términos",
        body: (
          <p>
            Nos reservamos el derecho de modificar estos términos en
            cualquier momento. Las modificaciones entran en vigor a partir de
            su publicación en el sitio, con la fecha de revisión actualizada.
          </p>
        ),
      },
      {
        title: "Ley aplicable y jurisdicción",
        body: (
          <p>
            Estos términos se rigen por la legislación brasileña. Se elige el
            foro de la Comarca de São Paulo, estado de São Paulo (Brasil),
            para dirimir cualquier controversia.
          </p>
        ),
      },
    ],
  },
};

function TermsPage() {
  return <LegalPage {...useT(DOC)} />;
}
