import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalDoc } from "@/components/site/LegalPage";
import { COMPANY, whatsappUrl, seo } from "@/lib/site";
import { pick, useT } from "@/lib/i18n";

const HEAD = {
  pt: {
    title: "Política de Privacidade | Vtech Soluções",
    description:
      "Como a Vtech Soluções coleta, utiliza e protege dados pessoais conforme a LGPD: finalidades, bases legais e direitos do titular.",
  },
  en: {
    title: "Privacy Policy | Vtech Soluções",
    description:
      "How Vtech Soluções collects, uses and protects personal data under Brazil's General Data Protection Law (LGPD): purposes, legal bases and data subject rights.",
  },
  es: {
    title: "Política de Privacidad | Vtech Soluções",
    description:
      "Cómo Vtech Soluções recopila, utiliza y protege datos personales conforme a la Ley General de Protección de Datos de Brasil (LGPD): finalidades, bases legales y derechos del titular.",
  },
};

export const Route = createFileRoute("/politica-de-privacidade")({
  head: ({ match }) => {
    const locale = match.context.locale;
    const t = pick(HEAD, locale);
    return seo({ title: t.title, description: t.description, path: "/politica-de-privacidade", locale });
  },
  component: PrivacyPage,
});

/** Link do WhatsApp do encarregado, com a mensagem no idioma da página. */
function DpoLink({ text }: { text: string }) {
  return (
    <a href={whatsappUrl(text)} target="_blank" rel="noopener noreferrer">
      {COMPANY.phoneDisplay}
    </a>
  );
}

const DOC: LegalDoc = {
  pt: {
    eyebrow: "Documento legal",
    title: "Política de Privacidade",
    intro:
      "A Vtech Soluções valoriza sua privacidade. Esta política explica como tratamos dados pessoais em conformidade com a LGPD (Lei nº 13.709/2018).",
    updatedAt: "Janeiro de 2026",
    sections: [
      {
        title: "Dados que coletamos",
        body: (
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Dados de contato:</strong>{" "}
              nome, email, telefone e mensagem fornecidos voluntariamente
              no formulário do site.
            </li>
            <li>
              <strong className="text-foreground">Dados de navegação:</strong>{" "}
              endereço IP, tipo de navegador, páginas visitadas e tempo de
              permanência.
            </li>
            <li>
              <strong className="text-foreground">Dados contratuais:</strong>{" "}
              informações necessárias para execução de contratos B2B com
              clientes.
            </li>
          </ul>
        ),
      },
      {
        title: "Finalidade do tratamento",
        body: (
          <p>
            Utilizamos seus dados para responder solicitações de orçamento,
            executar projetos contratados, cumprir obrigações legais e
            fiscais e melhorar continuamente nossos serviços.
          </p>
        ),
      },
      {
        title: "Base legal",
        body: (
          <p>
            O tratamento de dados é realizado com base no consentimento do
            titular, na execução de contrato, no cumprimento de obrigação
            legal e no legítimo interesse, conforme art. 7º da LGPD.
          </p>
        ),
      },
      {
        title: "Compartilhamento de dados",
        body: (
          <p>
            Não vendemos nem comercializamos dados pessoais. Compartilhamos
            informações apenas com prestadores de serviço essenciais
            (hospedagem, processamento de pagamentos) sob acordos de
            confidencialidade, ou quando exigido por autoridade competente.
          </p>
        ),
      },
      {
        title: "Direitos do titular",
        body: (
          <ul className="list-disc space-y-2 pl-5">
            <li>Confirmação da existência de tratamento</li>
            <li>Acesso, correção e atualização dos dados</li>
            <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
            <li>Portabilidade e revogação do consentimento</li>
          </ul>
        ),
      },
      {
        title: "Retenção e eliminação",
        body: (
          <p>
            Mantemos os dados pelo tempo necessário para cumprir as
            finalidades descritas e obrigações legais. Após esse período, os
            dados são eliminados ou anonimizados de forma segura.
          </p>
        ),
      },
      {
        title: "Encarregado de dados (DPO)",
        body: (
          <p>
            Para exercer seus direitos ou tirar dúvidas sobre o tratamento de
            dados, entre em contato pelo WhatsApp{" "}
            <DpoLink text="Olá! Gostaria de falar sobre o tratamento dos meus dados pessoais." />
            .
          </p>
        ),
      },
    ],
  },
  en: {
    eyebrow: "Legal document",
    title: "Privacy Policy",
    intro:
      "Vtech Soluções values your privacy. This policy explains how we process personal data in compliance with Brazil's General Data Protection Law (LGPD, Law No. 13,709/2018).",
    updatedAt: "January 2026",
    sections: [
      {
        title: "Data we collect",
        body: (
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Contact data:</strong>{" "}
              name, email, phone number and message voluntarily provided
              through the website form.
            </li>
            <li>
              <strong className="text-foreground">Browsing data:</strong>{" "}
              IP address, browser type, pages visited and time spent on the
              website.
            </li>
            <li>
              <strong className="text-foreground">Contractual data:</strong>{" "}
              information required to perform B2B contracts with clients.
            </li>
          </ul>
        ),
      },
      {
        title: "Purpose of processing",
        body: (
          <p>
            We use your data to respond to quote requests, carry out
            contracted projects, comply with legal and tax obligations, and
            continuously improve our services.
          </p>
        ),
      },
      {
        title: "Legal basis",
        body: (
          <p>
            Data is processed on the basis of the data subject's consent, the
            performance of a contract, compliance with a legal obligation and
            legitimate interest, pursuant to Article 7 of the LGPD.
          </p>
        ),
      },
      {
        title: "Data sharing",
        body: (
          <p>
            We do not sell or trade personal data. We share information only
            with essential service providers (hosting, payment processing)
            under confidentiality agreements, or when required by a competent
            authority.
          </p>
        ),
      },
      {
        title: "Data subject rights",
        body: (
          <ul className="list-disc space-y-2 pl-5">
            <li>Confirmation that processing is taking place</li>
            <li>Access to, correction and updating of data</li>
            <li>Anonymization, blocking or deletion of unnecessary data</li>
            <li>Portability and withdrawal of consent</li>
          </ul>
        ),
      },
      {
        title: "Retention and deletion",
        body: (
          <p>
            We keep data for as long as necessary to fulfill the purposes
            described and to meet legal obligations. After that period, the
            data is securely deleted or anonymized.
          </p>
        ),
      },
      {
        title: "Data Protection Officer (DPO)",
        body: (
          <p>
            To exercise your rights or ask questions about the processing of
            your data, contact us on WhatsApp at{" "}
            <DpoLink text="Hi! I would like to talk about the processing of my personal data." />
            .
          </p>
        ),
      },
    ],
  },
  es: {
    eyebrow: "Documento legal",
    title: "Política de Privacidad",
    intro:
      "Vtech Soluções valora su privacidad. Esta política explica cómo tratamos los datos personales de conformidad con la Ley General de Protección de Datos de Brasil (LGPD, Ley n.º 13.709/2018).",
    updatedAt: "enero de 2026",
    sections: [
      {
        title: "Datos que recopilamos",
        body: (
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Datos de contacto:</strong>{" "}
              nombre, correo electrónico, teléfono y mensaje proporcionados
              voluntariamente en el formulario del sitio.
            </li>
            <li>
              <strong className="text-foreground">Datos de navegación:</strong>{" "}
              dirección IP, tipo de navegador, páginas visitadas y tiempo de
              permanencia.
            </li>
            <li>
              <strong className="text-foreground">Datos contractuales:</strong>{" "}
              información necesaria para la ejecución de contratos B2B con
              clientes.
            </li>
          </ul>
        ),
      },
      {
        title: "Finalidad del tratamiento",
        body: (
          <p>
            Utilizamos sus datos para responder solicitudes de presupuesto,
            ejecutar los proyectos contratados, cumplir obligaciones legales y
            fiscales y mejorar continuamente nuestros servicios.
          </p>
        ),
      },
      {
        title: "Base legal",
        body: (
          <p>
            El tratamiento de datos se realiza con base en el consentimiento
            del titular, la ejecución de un contrato, el cumplimiento de una
            obligación legal y el interés legítimo, conforme al art. 7 de la
            LGPD.
          </p>
        ),
      },
      {
        title: "Compartición de datos",
        body: (
          <p>
            No vendemos ni comercializamos datos personales. Compartimos
            información únicamente con proveedores de servicios esenciales
            (alojamiento, procesamiento de pagos) bajo acuerdos de
            confidencialidad, o cuando lo exija una autoridad competente.
          </p>
        ),
      },
      {
        title: "Derechos del titular",
        body: (
          <ul className="list-disc space-y-2 pl-5">
            <li>Confirmación de la existencia de tratamiento</li>
            <li>Acceso, corrección y actualización de los datos</li>
            <li>Anonimización, bloqueo o eliminación de datos innecesarios</li>
            <li>Portabilidad y revocación del consentimiento</li>
          </ul>
        ),
      },
      {
        title: "Conservación y eliminación",
        body: (
          <p>
            Conservamos los datos durante el tiempo necesario para cumplir las
            finalidades descritas y las obligaciones legales. Transcurrido ese
            plazo, los datos se eliminan o anonimizan de forma segura.
          </p>
        ),
      },
      {
        title: "Encargado de datos (DPO)",
        body: (
          <p>
            Para ejercer sus derechos o resolver dudas sobre el tratamiento de
            datos, comuníquese con nosotros por WhatsApp al{" "}
            <DpoLink text="¡Hola! Me gustaría hablar sobre el tratamiento de mis datos personales." />
            .
          </p>
        ),
      },
    ],
  },
};

function PrivacyPage() {
  return <LegalPage {...useT(DOC)} />;
}
