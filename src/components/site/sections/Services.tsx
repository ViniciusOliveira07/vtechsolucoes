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
        <div className="mx-auto mb-14 flex flex-col items-center text-center">
          <p className="text-eyebrow mb-6 tracking-[0.3em] text-primary uppercase">02 — Serviços</p>
          <h2 className="font-display text-display-md">
            Acelerando sua operação<span className="text-primary">.</span>
          </h2>
        </div>

        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-12">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.n}
                to={s.href}
                aria-label={`Saber mais sobre ${s.title}`}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-surface p-8 transition-all duration-300 hover:border-white/[0.15] sm:p-10 ${s.colSpan}`}
              >
                {/* Accent line top — acende azul no hover */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent transition-all duration-500 group-hover:via-primary/60" />

                {/* Número + ícone */}
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-white/25">{s.n}</span>
                  <Icon className="h-[18px] w-[18px] text-white/30 transition-colors duration-300 group-hover:text-primary/70" />
                </div>

                {/* Título */}
                <h3 className="mb-3 text-[20px] font-semibold leading-snug tracking-tight text-foreground sm:text-[22px]">
                  {s.title}
                </h3>

                {/* Descrição */}
                <p className="text-[14px] leading-relaxed text-white/45 sm:text-[15px]">
                  {s.desc}
                </p>

                {/* Saiba mais — só aparece no hover */}
                <div className="mt-8 flex translate-y-1 items-center gap-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-[12px] font-medium text-primary">Saiba mais</span>
                  <ArrowUpRight className="h-3 w-3 text-primary" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
