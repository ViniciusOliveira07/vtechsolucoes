import { Link } from "@tanstack/react-router";
import { Events } from "@/lib/analytics";
import { FlowConsole } from "@/components/site/FlowConsole";

const FACTS = ["Proposta fechada em até 24h úteis", "POC de IA em 15 dias", "Exclusivo B2B"];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border pb-[clamp(40px,6vw,80px)] pt-[clamp(48px,7vw,96px)]">
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-35 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,#000_20%,transparent_75%)]"
      />
      <div className="shell relative grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="min-w-0">
          <p className="kicker">
            <span className="text-signal">●</span> Software sob medida · Integrações · IA aplicada
          </p>
          <h1 className="mt-5 text-[clamp(40px,5.4vw,76px)] font-medium leading-none tracking-[-0.04em]">
            Sua operação, <em className="not-italic text-signal">conectada</em> e trabalhando sozinha.
          </h1>
          <p className="mt-6 max-w-[52ch] text-[clamp(16px,1.4vw,18px)] text-muted-foreground">
            Construímos sistemas, integrações e agentes de IA que ligam os seus canais, ERP e CRM, e executam o trabalho
            repetitivo enquanto sua equipe decide.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-faint">
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
