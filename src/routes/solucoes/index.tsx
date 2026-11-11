import { createFileRoute, Link } from "@tanstack/react-router";
import { breadcrumbSchema, jsonLd, seo } from "@/lib/site";
import { SOLUCOES } from "@/lib/solucoes";
import { PageHero, SecHead } from "@/components/site/vt/Page";
import { ServiceVignette } from "@/components/site/home/ServiceStack";
import { Ico } from "@/components/site/home/Ico";
import { SwipeDots } from "@/components/site/vt/SwipeDots";
import { CtaBand } from "@/components/site/sections/CtaBand";

const TITLE = "Soluções com IA, automação e sites para empresas | Vtech";
const DESCRIPTION =
  "Agente de IA para WhatsApp, chatbot com IA, automação, RAG, sistema web sob medida e criação de site para empresas de todo o Brasil. Escolha o que a sua empresa precisa resolver.";

export const Route = createFileRoute("/solucoes/")({
  head: ({ match }) => ({
    ...seo({ title: TITLE, description: DESCRIPTION, path: "/solucoes", locale: match.context.locale }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Início", path: "/" },
          { name: "Soluções", path: "/solucoes" },
        ]),
      ),
      jsonLd({
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: SOLUCOES.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s.schemaName,
          url: `https://vtechsolucoes.ia.br/solucoes/${s.data.slug}`,
        })),
      }),
    ],
  }),
  component: SolucoesPage,
});

function SolucoesPage() {
  return (
    <>
      <PageHero
        crumbsLabel="Trilha de navegação"
        crumbs={[{ label: "início", to: "/" }, { label: "soluções" }]}
        kicker="soluções"
        title="Comece pelo problema que você quer resolver."
        sub="Cada solução abaixo responde a uma necessidade comum das empresas que nos procuram: atender melhor no WhatsApp, tirar trabalho repetitivo da equipe, organizar a operação num sistema ou ser encontrado no Google."
        aside={<ServiceVignette slug="whatsapp" />}
        full
      />
      <section className="vt-sec vt-screen">
        <div className="vt-wrap">
          <SecHead kicker="o que resolvemos" title="Seis soluções, um só time responsável" />
          <div className="vt-tiles vt-tiles-3">
            {SOLUCOES.map((s) => (
              <Link key={s.data.slug} to="/solucoes/$slug" params={{ slug: s.data.slug }} className="vt-tile vt-tile-link">
                <i>
                  <Ico name="layers" />
                </i>
                <h3>{s.data.eyebrow}</h3>
                <p>{s.card}</p>
                <span className="vt-rd">
                  Ver a solução <Ico name="arrow" />
                </span>
              </Link>
            ))}
          </div>
          <SwipeDots count={SOLUCOES.length} />
        </div>
      </section>
      <CtaBand location="solucoes_index" />
    </>
  );
}
