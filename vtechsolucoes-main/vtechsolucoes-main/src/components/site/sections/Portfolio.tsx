import { ArrowUpRight } from "lucide-react";
import saas from "@/assets/portfolio-saas.jpg";
import ecommerce from "@/assets/portfolio-ecommerce.jpg";
import logistics from "@/assets/portfolio-logistics.jpg";

const PROJECTS = [
  {
    img: saas,
    sector: "SaaS B2B",
    title: "Plataforma de analytics",
    desc: "Dashboard em tempo real para times de produto. Build em 6 semanas, integração com 4 fontes de dados.",
    tags: ["TanStack", "Realtime", "AI Insights"],
  },
  {
    img: ecommerce,
    sector: "E-commerce industrial",
    title: "Catálogo B2B técnico",
    desc: "Catálogo de peças com busca semântica por IA. Integração ERP, área restrita por cliente.",
    tags: ["Next.js", "RAG", "ERP"],
  },
  {
    img: logistics,
    sector: "Logística",
    title: "Plataforma de rastreamento",
    desc: "Operação em tempo real para 12 países. Mapa interativo, otimização de rotas com IA.",
    tags: ["Maps", "Optimization", "Edge"],
  },
];

export function Portfolio() {
  return (
    <section className="relative bg-background py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-20 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-eyebrow mb-6">05 — Trabalhos</p>
            <h2 className="text-display-md font-display">
              Projetos selecionados<span className="text-primary">.</span>
            </h2>
          </div>
        </div>

        <div className="space-y-24 md:space-y-32">
          {PROJECTS.map((p, i) => (
            <article key={p.title} className="group">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface">
                <img
                  src={p.img}
                  alt={`${p.title} — case Vtech Soluções`}
                  loading="lazy"
                  width={1600}
                  height={1000}
                  className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-primary/0 mix-blend-overlay transition-colors duration-500 group-hover:bg-primary/15" />
                <div className="absolute bottom-6 right-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-12 md:gap-16">
                <div className="md:col-span-2">
                  <p className="text-xs tabular-nums text-muted-foreground">
                    0{i + 1} — {p.sector}
                  </p>
                </div>
                <div className="md:col-span-6">
                  <h3 className="text-2xl font-display font-semibold sm:text-3xl">{p.title}</h3>
                  <p className="mt-3 max-w-lg text-muted-foreground">{p.desc}</p>
                </div>
                <div className="md:col-span-4">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-full border border-border-strong px-3 py-1 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
