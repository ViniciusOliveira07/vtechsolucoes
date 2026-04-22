import { createFileRoute } from "@tanstack/react-router";
import { Services } from "@/components/site/sections/Services";
import { Process } from "@/components/site/sections/Process";
import { FinalCTA } from "@/components/site/sections/FinalCTA";

const URL = "https://vtechsolucoes.com.br/servicos";
const TITLE = "Serviços de Tecnologia B2B | Vtech Soluções";
const DESCRIPTION =
  "Sites institucionais, sistemas web sob medida, automações com IA, integrações de sistemas e consultoria técnica. Projeto fechado, entrega rápida.";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: ServicosPage,
});

function ServicosPage() {
  return (
    <>
      <section className="relative flex min-h-[60vh] items-end bg-background pt-32 pb-16">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
          <p className="text-eyebrow mb-6">Serviços</p>
          <h1 className="text-display-xl font-display max-w-4xl">
            Tecnologia B2B<br />
            <span className="text-shimmer">sob medida.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Cinco frentes de trabalho — todas tocadas por uma equipe sênior, com IA no
            processo e no produto.
          </p>
        </div>
      </section>
      <Services />
      <Process />
      <FinalCTA />
    </>
  );
}
