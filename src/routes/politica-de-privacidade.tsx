import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Vtech Soluções" },
      {
        name: "description",
        content:
          "Como a Vtech Soluções coleta, utiliza e protege dados pessoais conforme a LGPD.",
      },
      {
        property: "og:title",
        content: "Política de Privacidade — Vtech Soluções",
      },
      {
        property: "og:description",
        content:
          "Tratamento de dados pessoais com base na LGPD: coleta, finalidade, direitos do titular.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Documento legal"
      title="Política de Privacidade"
      intro="A Vtech Soluções valoriza sua privacidade. Esta política explica como tratamos dados pessoais em conformidade com a LGPD (Lei nº 13.709/2018)."
      updatedAt="Janeiro de 2026"
      sections={[
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
              dados, entre em contato pelo email{" "}
              <a
                href="mailto:contato@vtechsolucoes.com"
                className="text-foreground hover:text-primary"
              >
                contato@vtechsolucoes.com
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
