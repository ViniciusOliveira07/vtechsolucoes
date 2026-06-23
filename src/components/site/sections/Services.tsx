import { Globe, Laptop, Bot, Blocks, Compass, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const SERVICES = [
  {
    n: "01",
    tag: "Web & SEO",
    title: "Sites institucionais",
    desc: "Presença digital premium de alta performance focada em autoridade de marca, conversão e SEO técnico para empresas B2B.",
    icon: Globe,
    href: "/servicos/sites-institucionais",
    span: "md:col-span-3",
    iconBg: "bg-[oklch(0.62_0.21_258_/_0.12)]",
    iconColor: "text-[oklch(0.75_0.18_258)]",
    glow: "oklch(0.62_0.21_258_/_0.08)",
  },
  {
    n: "02",
    tag: "SaaS & Plataformas",
    title: "Sistemas web",
    desc: "Plataformas sob medida e escaláveis. Transformamos processos complexos em softwares que eliminam gargalos e aumentam o ROI.",
    icon: Laptop,
    href: "/servicos/sistemas-web",
    span: "md:col-span-3",
    iconBg: "bg-[oklch(0.55_0.18_280_/_0.12)]",
    iconColor: "text-[oklch(0.72_0.16_280)]",
    glow: "oklch(0.55_0.18_280_/_0.07)",
  },
  {
    n: "03",
    tag: "AI & Agentes",
    title: "Automações com IA",
    desc: "Agentes autônomos e RAG para automação de processos e análise inteligente de dados.",
    icon: Bot,
    href: "/servicos/automacoes-com-ia",
    span: "md:col-span-2",
    iconBg: "bg-[oklch(0.65_0.18_200_/_0.12)]",
    iconColor: "text-[oklch(0.78_0.15_200)]",
    glow: "oklch(0.65_0.18_200_/_0.07)",
  },
  {
    n: "04",
    tag: "API & Conectores",
    title: "Integrações",
    desc: "ERPs, CRMs e gateways de pagamento integrados com arquitetura robusta e segura.",
    icon: Blocks,
    href: "/servicos/integracoes",
    span: "md:col-span-2",
    iconBg: "bg-[oklch(0.62_0.21_258_/_0.12)]",
    iconColor: "text-[oklch(0.75_0.18_258)]",
    glow: "oklch(0.62_0.21_258_/_0.08)",
  },
  {
    n: "05",
    tag: "CTO as a Service",
    title: "Consultoria tech",
    desc: "Perspectiva sênior em arquitetura, escolha de stack e roadmap para decisões seguras.",
    icon: Compass,
    href: "/servicos/consultoria-tech",
    span: "md:col-span-2",
    iconBg: "bg-[oklch(0.58_0.14_160_/_0.12)]",
    iconColor: "text-[oklch(0.74_0.14_160)]",
    glow: "oklch(0.58_0.14_160_/_0.07)",
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

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-6">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.n}
                to={s.href}
                aria-label={`Saber mais sobre ${s.title}`}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-surface p-7 transition-all duration-300 hover:border-white/[0.16] sm:p-8 ${s.span}`}
                style={{ "--glow": s.glow } as React.CSSProperties}
              >
                {/* Glow radial de fundo */}
                <div
                  className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle, ${s.glow.replace("0.07", "0.4")}, transparent 70%)` }}
                />

                {/* Número */}
                <span className="mb-6 block font-mono text-[11px] tracking-[0.2em] text-white/20">
                  {s.n}
                </span>

                {/* Ícone */}
                <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl ${s.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`h-6 w-6 ${s.iconColor}`} />
                </div>

                {/* Tag */}
                <span className="mb-2 text-[11px] font-medium uppercase tracking-[0.15em] text-white/30">
                  {s.tag}
                </span>

                {/* Título */}
                <h3 className="mb-3 text-[19px] font-semibold leading-snug tracking-tight text-foreground">
                  {s.title}
                </h3>

                {/* Descrição */}
                <p className="flex-1 text-[13px] leading-relaxed text-white/45">
                  {s.desc}
                </p>

                {/* CTA */}
                <div className="mt-7 flex items-center gap-1.5 text-[12px] font-medium text-white/25 transition-colors duration-200 group-hover:text-primary">
                  <span>Ver serviço</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
