import { AnimatedCounter } from "@/components/site/AnimatedCounter";

export function Numbers() {
  return (
    <section className="relative bg-background py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-20 max-w-3xl">
          <p className="text-eyebrow mb-6">04 — Diferenciais</p>
          <h2 className="text-display-md font-display">
            Por que somos diferentes<span className="text-primary">.</span>
          </h2>
        </div>

        <div className="grid gap-16 md:grid-cols-3">
          <Stat value={3} suffix="×" label="Mais rápido que agências tradicionais. IA no processo de desenvolvimento." />
          <Stat value={100} suffix="%" label="IA embarcada no produto final. Não só processo — tecnologia entregue." />
          <Stat value={0} suffix="" label="Mensalidades. Projeto fechado: você paga e recebe. Simples." />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div>
      <div className="text-[clamp(4rem,10vw,8rem)] font-display font-semibold leading-none tracking-[-0.05em] text-foreground">
        <AnimatedCounter to={value} suffix={suffix} />
      </div>
      <p className="mt-6 max-w-xs text-base text-muted-foreground">{label}</p>
    </div>
  );
}
