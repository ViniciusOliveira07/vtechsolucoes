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
    <section className="relative z-10 w-full bg-background py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:max-w-[1600px]">

        <div className="mx-auto mb-16 flex flex-col items-center text-center">
          <p className="text-eyebrow mb-6 tracking-[0.3em] text-primary uppercase">02 — Serviços</p>
          <h2 className="font-display text-display-md">
            Acelerando sua operação<span className="text-primary">.</span>
          </h2>
        </div>

        <div className="w-full border-t border-white/[0.07]">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.n}
                to={s.href}
                aria-label={`Saber mais sobre ${s.title}`}
                className="group flex items-start gap-5 border-b border-white/[0.07] py-7 transition-colors duration-200 hover:bg-white/[0.025] sm:gap-7 sm:py-9"
              >
                {/* Número */}
                <span className="w-8 shrink-0 pt-0.5 font-mono text-[11px] tracking-[0.2em] text-white/20">
                  {s.n}
                </span>

                {/* Ícone */}
                <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-surface transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/[0.07] sm:flex">
                  <Icon className="h-[17px] w-[17px] text-white/30 transition-colors duration-300 group-hover:text-primary/80" />
                </div>

                {/* Título + Descrição */}
                <div className="flex min-w-0 flex-1 flex-col gap-2 md:flex-row md:items-center md:gap-10 lg:gap-16">
                  <h3 className="shrink-0 text-[19px] font-semibold tracking-tight text-foreground md:w-[220px] lg:w-[260px] lg:text-[21px]">
                    {s.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-white/45 md:text-[15px]">
                    {s.desc}
                  </p>
                </div>

                {/* Seta */}
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 translate-y-0.5 text-white/20 opacity-0 transition-all duration-200 group-hover:text-primary group-hover:opacity-100" />
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
