import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalDoc } from "@/components/site/LegalPage";
import { COMPANY, whatsappUrl, seo } from "@/lib/site";
import { pick, useT } from "@/lib/i18n";

const HEAD = {
  pt: {
    title: "Política de Segurança | Vtech Soluções",
    description:
      "Práticas de segurança da informação da Vtech Soluções: controles técnicos, organizacionais e resposta a incidentes.",
  },
  en: {
    title: "Security Policy | Vtech Soluções",
    description:
      "Vtech Soluções information security practices: technical and organizational controls and incident response.",
  },
  es: {
    title: "Política de Seguridad | Vtech Soluções",
    description:
      "Prácticas de seguridad de la información de Vtech Soluções: controles técnicos y organizativos y respuesta a incidentes.",
  },
};

export const Route = createFileRoute("/politica-de-seguranca")({
  head: ({ match }) => {
    const locale = match.context.locale;
    const t = pick(HEAD, locale);
    return seo({ title: t.title, description: t.description, path: "/politica-de-seguranca", locale });
  },
  component: SecurityPage,
});

/** Link do WhatsApp para reporte de vulnerabilidade, com a mensagem no idioma da página. */
function ReportLink({ text }: { text: string }) {
  return (
    <a href={whatsappUrl(text)} target="_blank" rel="noopener noreferrer">
      {COMPANY.phoneDisplay}
    </a>
  );
}

const DOC: LegalDoc = {
  pt: {
    eyebrow: "Documento legal",
    title: "Política de Segurança",
    intro:
      "A segurança da informação é prioridade na Vtech Soluções. Esta política descreve as práticas que adotamos para proteger dados de clientes e da empresa.",
    updatedAt: "Janeiro de 2026",
    sections: [
      {
        title: "Compromisso com a segurança",
        body: (
          <p>
            Adotamos uma abordagem de segurança em camadas (defense in depth),
            alinhada às melhores práticas de mercado e aos princípios da
            LGPD, garantindo confidencialidade, integridade e disponibilidade
            das informações tratadas.
          </p>
        ),
      },
      {
        title: "Controles técnicos",
        body: (
          <ul className="list-disc space-y-2 pl-5">
            <li>Criptografia em trânsito (TLS 1.3) e em repouso.</li>
            <li>
              Autenticação multifator (MFA) em todos os sistemas críticos.
            </li>
            <li>
              Princípio do menor privilégio aplicado a acessos e permissões.
            </li>
            <li>
              Backups automatizados com testes periódicos de restauração.
            </li>
            <li>Monitoramento contínuo e logs de auditoria.</li>
          </ul>
        ),
      },
      {
        title: "Desenvolvimento seguro",
        body: (
          <ul className="list-disc space-y-2 pl-5">
            <li>Code review obrigatório antes de cada deploy.</li>
            <li>
              Análise estática de código e varredura de dependências
              vulneráveis.
            </li>
            <li>
              Validação de entrada, prevenção contra SQL injection, XSS e
              CSRF como padrões.
            </li>
            <li>Gestão de segredos via cofres dedicados — nunca no código.</li>
          </ul>
        ),
      },
      {
        title: "Controles organizacionais",
        body: (
          <p>
            A equipe é treinada em segurança da informação e privacidade. Há
            acordos de confidencialidade (NDA) com colaboradores e
            fornecedores. O acesso a dados de clientes é restrito ao
            estritamente necessário para a execução do projeto.
          </p>
        ),
      },
      {
        title: "Resposta a incidentes",
        body: (
          <p>
            Possuímos plano de resposta a incidentes que prevê detecção,
            contenção, erradicação, recuperação e notificação. Em caso de
            incidente envolvendo dados pessoais, a ANPD e os titulares
            afetados serão notificados conforme prazos da LGPD.
          </p>
        ),
      },
      {
        title: "Reporte de vulnerabilidades",
        body: (
          <p>
            Identificou uma vulnerabilidade em nossos sistemas? Comunique de
            forma responsável pelo WhatsApp{" "}
            <ReportLink text="Olá! Quero reportar uma possível vulnerabilidade de segurança." />
            . Nos comprometemos a responder em até 48 horas úteis.
          </p>
        ),
      },
      {
        title: "Revisão da política",
        body: (
          <p>
            Esta política é revisada ao menos anualmente ou sempre que
            ocorrerem mudanças significativas em nossos processos ou
            tecnologias.
          </p>
        ),
      },
    ],
  },
  en: {
    eyebrow: "Legal document",
    title: "Security Policy",
    intro:
      "Information security is a priority at Vtech Soluções. This policy describes the practices we adopt to protect client and company data.",
    updatedAt: "January 2026",
    sections: [
      {
        title: "Commitment to security",
        body: (
          <p>
            We take a layered security approach (defense in depth), aligned
            with industry best practices and with the principles of Brazil's
            General Data Protection Law (LGPD, Law No. 13,709/2018), ensuring
            the confidentiality, integrity and availability of the
            information we process.
          </p>
        ),
      },
      {
        title: "Technical controls",
        body: (
          <ul className="list-disc space-y-2 pl-5">
            <li>Encryption in transit (TLS 1.3) and at rest.</li>
            <li>Multi-factor authentication (MFA) on all critical systems.</li>
            <li>Principle of least privilege applied to access and permissions.</li>
            <li>Automated backups with periodic restore tests.</li>
            <li>Continuous monitoring and audit logs.</li>
          </ul>
        ),
      },
      {
        title: "Secure development",
        body: (
          <ul className="list-disc space-y-2 pl-5">
            <li>Mandatory code review before every deploy.</li>
            <li>Static code analysis and scanning for vulnerable dependencies.</li>
            <li>
              Input validation and protection against SQL injection, XSS and
              CSRF as standard practice.
            </li>
            <li>Secrets managed in dedicated vaults — never in the code.</li>
          </ul>
        ),
      },
      {
        title: "Organizational controls",
        body: (
          <p>
            The team is trained in information security and privacy.
            Non-disclosure agreements (NDAs) are in place with staff and
            suppliers. Access to client data is restricted to what is
            strictly necessary to carry out the project.
          </p>
        ),
      },
      {
        title: "Incident response",
        body: (
          <p>
            We maintain an incident response plan covering detection,
            containment, eradication, recovery and notification. In the event
            of an incident involving personal data, Brazil's National Data
            Protection Authority (ANPD) and the affected data subjects will be
            notified within the time limits set by the LGPD.
          </p>
        ),
      },
      {
        title: "Vulnerability reporting",
        body: (
          <p>
            Have you identified a vulnerability in our systems? Please report
            it responsibly on WhatsApp at{" "}
            <ReportLink text="Hi! I want to report a possible security vulnerability." />
            . We commit to responding within 48 business hours.
          </p>
        ),
      },
      {
        title: "Policy review",
        body: (
          <p>
            This policy is reviewed at least annually, or whenever significant
            changes occur in our processes or technologies.
          </p>
        ),
      },
    ],
  },
  es: {
    eyebrow: "Documento legal",
    title: "Política de Seguridad",
    intro:
      "La seguridad de la información es una prioridad en Vtech Soluções. Esta política describe las prácticas que adoptamos para proteger los datos de los clientes y de la empresa.",
    updatedAt: "enero de 2026",
    sections: [
      {
        title: "Compromiso con la seguridad",
        body: (
          <p>
            Adoptamos un enfoque de seguridad en capas (defensa en
            profundidad), alineado con las mejores prácticas del mercado y con
            los principios de la Ley General de Protección de Datos de Brasil
            (LGPD, Ley n.º 13.709/2018), que garantiza la confidencialidad,
            integridad y disponibilidad de la información tratada.
          </p>
        ),
      },
      {
        title: "Controles técnicos",
        body: (
          <ul className="list-disc space-y-2 pl-5">
            <li>Cifrado en tránsito (TLS 1.3) y en reposo.</li>
            <li>Autenticación multifactor (MFA) en todos los sistemas críticos.</li>
            <li>Principio de mínimo privilegio aplicado a accesos y permisos.</li>
            <li>Copias de seguridad automatizadas con pruebas periódicas de restauración.</li>
            <li>Monitoreo continuo y registros de auditoría.</li>
          </ul>
        ),
      },
      {
        title: "Desarrollo seguro",
        body: (
          <ul className="list-disc space-y-2 pl-5">
            <li>Revisión de código (code review) obligatoria antes de cada despliegue.</li>
            <li>
              Análisis estático de código y escaneo de dependencias
              vulnerables.
            </li>
            <li>
              Validación de entradas y prevención de SQL injection, XSS y CSRF
              como estándar.
            </li>
            <li>Gestión de secretos mediante bóvedas dedicadas — nunca en el código.</li>
          </ul>
        ),
      },
      {
        title: "Controles organizativos",
        body: (
          <p>
            El equipo recibe capacitación en seguridad de la información y
            privacidad. Existen acuerdos de confidencialidad (NDA) con
            colaboradores y proveedores. El acceso a los datos de los clientes
            se restringe a lo estrictamente necesario para la ejecución del
            proyecto.
          </p>
        ),
      },
      {
        title: "Respuesta a incidentes",
        body: (
          <p>
            Contamos con un plan de respuesta a incidentes que contempla
            detección, contención, erradicación, recuperación y notificación.
            En caso de un incidente que involucre datos personales, la
            Autoridad Nacional de Protección de Datos de Brasil (ANPD) y los
            titulares afectados serán notificados dentro de los plazos
            establecidos por la LGPD.
          </p>
        ),
      },
      {
        title: "Reporte de vulnerabilidades",
        body: (
          <p>
            ¿Identificó una vulnerabilidad en nuestros sistemas? Comuníquela
            de forma responsable por WhatsApp al{" "}
            <ReportLink text="¡Hola! Quiero reportar una posible vulnerabilidad de seguridad." />
            . Nos comprometemos a responder en un plazo de hasta 48 horas
            hábiles.
          </p>
        ),
      },
      {
        title: "Revisión de la política",
        body: (
          <p>
            Esta política se revisa al menos una vez al año o siempre que se
            produzcan cambios significativos en nuestros procesos o
            tecnologías.
          </p>
        ),
      },
    ],
  },
};

function SecurityPage() {
  return <LegalPage {...useT(DOC)} />;
}
