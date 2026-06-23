import { Globe, Laptop, Bot, Blocks, Compass, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const SERVICES = [
  {
    n: "01",
    title: "Sites institucionais",
    desc: "Presença digital premium de alta performance. Desenvolvimento focado em autoridade de marca, conversão e SEO técnico para empresas B2B.",
    icon: Globe,
    href: "/servicos/sites-institucionais",
    colSpan: "md:col-span-8",
  },
  {
    n: "02",
    title: "Sistemas web",
    desc: "Plataformas web sob medida e escaláveis. Transformamos processos complexos em softwares eficientes que eliminam gargalos e aumentam o ROI.",
    icon: Laptop,
    href: "/servicos/sistemas-web",
    colSpan: "md:col-span-4",
  },
  {
    n: "03",
    title: "Automações com IA",
    desc: "Inteligência Artificial aplicada ao negócio. Implementamos agentes autônomos e RAG para automação de processos e análise inteligente de dados.",
    icon: Bot,
    href: "/servicos/automacoes-com-ia",
    colSpan: "md:col-span-4",
  },
  {
    n: "04",
    title: "Integrações",
    desc: "Conectividade total entre seu ecossistema. Integramos ERPs, CRMs e gateways de pagamento com arquitetura robusta e segura.",
    icon: Blocks,
    href: "/servicos/integracoes",
    colSpan: "md:col-span-4",
  },
  {
    n: "05",
    title: "Consultoria tech",
    desc: "Estratégia tecnológica e CTO as a Service. Perspectiva sênior em arquitetura, escolha de stack e roadmap para decisões seguras.",
    icon: Compass,
    href: "/servicos/consultoria-tech",
    colSpan: "md:col-span-4",
  },
];

export function Services() {
  return (
    <section className="relative z-10 w-full overflow-visible bg-background py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:max-w-[1600px]">
        <div className="mx-auto mb-14 flex flex-col items-center text-center">
          <p className="text-eyebrow mb-6 tracking-[0.3em] text-primary uppercase">02 — Serviços</p>
          <h2 className="font-display text-display-md">
            Acelerando sua operação<span className="text-primary">.</span>
          </h2>
        </div>

        <div className="grid w-full grid-cols-1 gap-2.5 md:grid-cols-12">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.n}
                to={s.href}
                aria-label={`Saber mais sobre ${s.title}`}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 transition-colors duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] sm:p-10 ${s.colSpan}`}
              >
                {/* Top: number + icon */}
                <div className="mb-14 flex items-start justify-between">
                  <span className="font-mono text-[11px] tracking-[0.25em] text-white/20">
                    {s.n}
                  </span>
                  <Icon className="h-[18px] w-[18px] text-white/20 transition-colors duration-300 group-hover:text-primary/60" />
                </div>

                {/* Bottom: content */}
                <div>
                  <h3 className="mb-3 text-[20px] font-semibold leading-snug tracking-tight text-foreground sm:text-[22px]">
                    {s.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-white/40 sm:text-[15px]">
                    {s.desc}
                  </p>

                  <div className="mt-7 flex items-center gap-1.5">
                    <span className="text-[12px] font-medium tracking-wide text-white/20 transition-colors duration-300 group-hover:text-primary/70">
                      Saiba mais
                    </span>
                    <ArrowUpRight className="h-3 w-3 text-white/20 transition-colors duration-300 group-hover:text-primary/70" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
