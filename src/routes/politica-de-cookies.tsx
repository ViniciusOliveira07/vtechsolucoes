import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/site";
import { LegalPage, type LegalDoc } from "@/components/site/LegalPage";
import { pick, useT } from "@/lib/i18n";

const HEAD = {
  pt: {
    title: "Política de Cookies | Vtech Soluções",
    description:
      "Como a Vtech Soluções utiliza cookies e tecnologias semelhantes no site, para que servem e como gerenciar suas preferências.",
  },
  en: {
    title: "Cookie Policy | Vtech Soluções",
    description:
      "How Vtech Soluções uses cookies and similar technologies on its website, what they are for and how to manage your preferences.",
  },
  es: {
    title: "Política de Cookies | Vtech Soluções",
    description:
      "Cómo Vtech Soluções utiliza cookies y tecnologías similares en su sitio, para qué sirven y cómo gestionar sus preferencias.",
  },
};

export const Route = createFileRoute("/politica-de-cookies")({
  head: ({ match }) => {
    const locale = match.context.locale;
    const t = pick(HEAD, locale);
    return seo({ title: t.title, description: t.description, path: "/politica-de-cookies", locale });
  },
  component: CookiesPage,
});

const DOC: LegalDoc = {
  pt: {
    eyebrow: "Documento legal",
    title: "Política de Cookies",
    intro:
      "Esta política descreve como utilizamos cookies e tecnologias semelhantes para oferecer, proteger e melhorar nosso site.",
    updatedAt: "Janeiro de 2026",
    sections: [
      {
        title: "O que são cookies",
        body: (
          <p>
            Cookies são pequenos arquivos de texto armazenados no seu
            navegador quando você visita um site. Eles permitem reconhecer
            seu dispositivo, lembrar preferências e coletar informações
            estatísticas sobre o uso da página.
          </p>
        ),
      },
      {
        title: "Tipos de cookies que utilizamos",
        body: (
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Essenciais:</strong> necessários
              para o funcionamento básico do site (ex.: roteamento, segurança).
            </li>
            <li>
              <strong className="text-foreground">Desempenho:</strong> coletam
              dados anônimos sobre como o site é utilizado para que possamos
              otimizar a experiência.
            </li>
            <li>
              <strong className="text-foreground">Funcionais:</strong>{" "}
              memorizam preferências como idioma e configurações de exibição.
            </li>
          </ul>
        ),
      },
      {
        title: "Cookies de terceiros",
        body: (
          <p>
            Eventualmente utilizamos serviços de análise (como ferramentas de
            métricas web) que podem definir cookies próprios em seu
            navegador. Esses parceiros possuem políticas de privacidade
            independentes que recomendamos consultar.
          </p>
        ),
      },
      {
        title: "Como gerenciar cookies",
        body: (
          <p>
            Você pode controlar e excluir cookies diretamente nas
            configurações do seu navegador. Bloquear cookies essenciais pode
            impactar funcionalidades do site.
          </p>
        ),
      },
      {
        title: "Atualizações desta política",
        body: (
          <p>
            Podemos atualizar esta política periodicamente. Mudanças
            relevantes serão sinalizadas com a data de revisão no topo do
            documento.
          </p>
        ),
      },
    ],
  },
  en: {
    eyebrow: "Legal document",
    title: "Cookie Policy",
    intro:
      "This policy describes how we use cookies and similar technologies to provide, protect and improve our website.",
    updatedAt: "January 2026",
    sections: [
      {
        title: "What cookies are",
        body: (
          <p>
            Cookies are small text files stored in your browser when you visit
            a website. They make it possible to recognize your device,
            remember preferences and collect statistical information about how
            the page is used.
          </p>
        ),
      },
      {
        title: "Types of cookies we use",
        body: (
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Essential:</strong> required
              for the basic operation of the website (e.g., routing, security).
            </li>
            <li>
              <strong className="text-foreground">Performance:</strong> collect
              anonymous data about how the website is used so that we can
              optimize the experience.
            </li>
            <li>
              <strong className="text-foreground">Functional:</strong>{" "}
              remember preferences such as language and display settings.
            </li>
          </ul>
        ),
      },
      {
        title: "Third-party cookies",
        body: (
          <p>
            We may occasionally use analytics services (such as web metrics
            tools) that can set their own cookies in your browser. These
            partners have independent privacy policies, which we recommend
            that you review.
          </p>
        ),
      },
      {
        title: "How to manage cookies",
        body: (
          <p>
            You can control and delete cookies directly in your browser
            settings. Blocking essential cookies may affect website
            functionality.
          </p>
        ),
      },
      {
        title: "Updates to this policy",
        body: (
          <p>
            We may update this policy periodically. Material changes will be
            indicated by the revision date at the top of the document.
          </p>
        ),
      },
    ],
  },
  es: {
    eyebrow: "Documento legal",
    title: "Política de Cookies",
    intro:
      "Esta política describe cómo utilizamos cookies y tecnologías similares para ofrecer, proteger y mejorar nuestro sitio.",
    updatedAt: "enero de 2026",
    sections: [
      {
        title: "Qué son las cookies",
        body: (
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en su
            navegador cuando visita un sitio web. Permiten reconocer su
            dispositivo, recordar preferencias y recopilar información
            estadística sobre el uso de la página.
          </p>
        ),
      },
      {
        title: "Tipos de cookies que utilizamos",
        body: (
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Esenciales:</strong> necesarias
              para el funcionamiento básico del sitio (p. ej.: enrutamiento,
              seguridad).
            </li>
            <li>
              <strong className="text-foreground">De rendimiento:</strong>{" "}
              recopilan datos anónimos sobre cómo se utiliza el sitio para que
              podamos optimizar la experiencia.
            </li>
            <li>
              <strong className="text-foreground">Funcionales:</strong>{" "}
              recuerdan preferencias como el idioma y la configuración de
              visualización.
            </li>
          </ul>
        ),
      },
      {
        title: "Cookies de terceros",
        body: (
          <p>
            Eventualmente utilizamos servicios de análisis (como herramientas
            de métricas web) que pueden instalar sus propias cookies en su
            navegador. Estos socios cuentan con políticas de privacidad
            independientes, que le recomendamos consultar.
          </p>
        ),
      },
      {
        title: "Cómo gestionar las cookies",
        body: (
          <p>
            Usted puede controlar y eliminar las cookies directamente en la
            configuración de su navegador. Bloquear las cookies esenciales
            puede afectar funcionalidades del sitio.
          </p>
        ),
      },
      {
        title: "Actualizaciones de esta política",
        body: (
          <p>
            Podemos actualizar esta política periódicamente. Los cambios
            relevantes se indicarán con la fecha de revisión en la parte
            superior del documento.
          </p>
        ),
      },
    ],
  },
};

function CookiesPage() {
  return <LegalPage {...useT(DOC)} />;
}
