import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/site";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/politica-de-cookies")({
  head: () =>
    seo({
      title: "Política de Cookies | Vtech Soluções",
      description:
        "Como a Vtech Soluções utiliza cookies e tecnologias semelhantes no site, para que servem e como gerenciar suas preferências.",
      path: "/politica-de-cookies",
    }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Documento legal"
      title="Política de Cookies"
      intro="Esta política descreve como utilizamos cookies e tecnologias semelhantes para oferecer, proteger e melhorar nosso site."
      updatedAt="Janeiro de 2026"
      sections={[
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
      ]}
    />
  );
}
