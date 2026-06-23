import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/politica-de-seguranca")({
  head: () => ({
    meta: [
      { title: "Vtech Soluções" },
      {
        name: "description",
        content:
          "Práticas de segurança da informação adotadas pela Vtech Soluções para proteger dados de clientes.",
      },
      { property: "og:title", content: "Política de Segurança — Vtech Soluções" },
      {
        property: "og:description",
        content: "Controles técnicos, organizacionais e resposta a incidentes.",
      },
    ],
  }),
  component: SecurityPage,
});

function SecurityPage() {
  return (
    <LegalPage
      eyebrow="Documento legal"
      title="Política de Segurança"
      intro="A segurança da informação é prioridade na Vtech Soluções. Esta política descreve as práticas que adotamos para proteger dados de clientes e da empresa."
      updatedAt="Janeiro de 2026"
      sections={[
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
              forma responsável pelo email{" "}
              <a
                href="mailto:contato@vtechsolucoes.com"
                className="text-foreground hover:text-primary"
              >
                contato@vtechsolucoes.com
              </a>
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
      ]}
    />
  );
}
