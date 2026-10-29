import { Link } from "@tanstack/react-router";
import { Events } from "@/lib/analytics";
import { FlowConsole } from "@/components/site/FlowConsole";
import { useT } from "@/lib/i18n";

const TEXT = {
  pt: {
    before: "Sua operação, ",
    em: "conectada",
    after: " e trabalhando sozinha.",
    sub: "Construímos sistemas, integrações e agentes de IA que ligam os seus canais, ERP e CRM, e executam o trabalho repetitivo enquanto sua equipe decide.",
    cta: "Iniciar diagnóstico →",
    secondary: "Ver o que construímos",
    facts: ["Proposta fechada em até 24h úteis", "Exclusivo B2B"],
  },
  en: {
    before: "Your operation, ",
    em: "connected",
    after: " and running on its own.",
    sub: "We build systems, integrations and AI agents that connect your channels, ERP and CRM, and handle the repetitive work while your team makes the decisions.",
    cta: "Start diagnosis →",
    secondary: "See what we build",
    facts: ["Fixed-scope proposal within 24 business hours", "B2B only"],
  },
  es: {
    before: "Su operación, ",
    em: "conectada",
    after: " y trabajando sola.",
    sub: "Construimos sistemas, integraciones y agentes de IA que conectan sus canales, ERP y CRM, y ejecutan el trabajo repetitivo mientras su equipo decide.",
    cta: "Iniciar diagnóstico →",
    secondary: "Ver lo que construimos",
    facts: ["Propuesta cerrada en hasta 24 horas hábiles", "Exclusivo B2B"],
  },
};

export function Hero() {
  const t = useT(TEXT);
  return (
    <section className="hero relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-35 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,#000_20%,transparent_75%)]"
      />
      <div className="shell relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
        <div className="min-w-0">
          <h1 className="hero-title font-medium leading-none tracking-[-0.04em]">
            {t.before}
            <em className="not-italic text-signal">{t.em}</em>
            {t.after}
          </h1>
          <p className="hero-sub max-w-[52ch] text-[clamp(1rem,1.4vw,1.125rem)] text-muted-foreground">
            {t.sub}
          </p>
          <div className="hero-ctas flex flex-wrap gap-3">
            <Link
              to="/contato"
              onClick={() => Events.ctaClick("Iniciar diagnóstico", "hero")}
              className="btn max-sm:flex-1 max-sm:basis-full"
            >
              {t.cta}
            </Link>
            <Link to="/servicos" className="btn btn-line max-sm:flex-1 max-sm:basis-full">
              {t.secondary}
            </Link>
          </div>
          <ul className="hero-facts hide-short flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-faint">
            {t.facts.map((f) => (
              <li key={f}>
                <span aria-hidden className="text-signal">
                  ▸{" "}
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
        <FlowConsole />
      </div>
    </section>
  );
}
