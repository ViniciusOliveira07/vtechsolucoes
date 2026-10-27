import { Link } from "@tanstack/react-router";
import { Events } from "@/lib/analytics";
import { FlowConsole } from "@/components/site/FlowConsole";

const FACTS = ["Proposta fechada em até 24h úteis", "POC de IA em 15 dias", "Exclusivo B2B"];

export function Hero() {
  return (
    <section className="hero relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-35 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,#000_20%,transparent_75%)]"
      />
      <div className="shell relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
        <div className="min-w-0">
          <p className="kicker">
            <span className="text-signal">●</span> Software sob medida · Integrações · IA aplicada
          </p>
          <h1 className="hero-title mt-5 font-medium leading-none tracking-[-0.04em]">
            Sua operação, <em className="not-italic text-signal">conectada</em> e trabalhando sozinha.
          </h1>
          <p className="hero-sub max-w-[52ch] text-[clamp(1rem,1.4vw,1.125rem)] text-muted-foreground">
            Construímos sistemas, integrações e agentes de IA que ligam os seus canais, ERP e CRM, e executam o trabalho
            repetitivo enquanto sua equipe decide.
          </p>
          <div className="hero-ctas flex flex-wrap gap-3">
            <Link
              to="/contato"
              onClick={() => Events.ctaClick("Iniciar diagnóstico", "hero")}
              className="btn max-sm:flex-1 max-sm:basis-full"
            >
              Iniciar diagnóstico →
            </Link>
            <Link to="/servicos" className="btn btn-line max-sm:flex-1 max-sm:basis-full">
              Ver o que construímos
            </Link>
          </div>
          <ul className="hero-facts flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-faint">
            {FACTS.map((f) => (
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
