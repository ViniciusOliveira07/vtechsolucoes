import { motion } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Diagnóstico",
    desc: "Conversa técnica para entender objetivo, restrições e contexto. Sem pitch, sem proposta genérica.",
  },
  {
    n: "02",
    title: "Proposta fechada",
    desc: "Escopo, prazo e investimento definidos por escrito. Sem mensalidade, sem fidelização — você paga e recebe.",
  },
  {
    n: "03",
    title: "Build com IA",
    desc: "Desenvolvimento acelerado com nossa stack proprietária. Atualizações semanais com preview funcional.",
  },
  {
    n: "04",
    title: "Entrega",
    desc: "Deploy em produção, documentação técnica e handoff. Suporte garantido nos primeiros 30 dias.",
  },
];

export function Process() {
  return (
    <section className="relative bg-background py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-20 max-w-3xl">
          <p className="text-eyebrow mb-6">03 — Processo</p>
          <h2 className="text-display-md font-display">
            Quatro etapas. Sem ruído<span className="text-primary">.</span>
          </h2>
        </div>

        <div className="relative">
          {/* timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-16 md:space-y-24">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid grid-cols-[32px_1fr] gap-8 md:grid-cols-2 md:gap-16"
              >
                {/* dot */}
                <div className="absolute left-0 top-2 flex h-4 w-4 items-center justify-center md:left-1/2 md:-translate-x-1/2">
                  <div className="h-4 w-4 rounded-full border-2 border-primary bg-background" />
                </div>

                {i % 2 === 0 ? (
                  <>
                    <div className="md:text-right md:pr-16 col-start-2 md:col-start-1">
                      <p className="text-sm tabular-nums text-primary">{step.n}</p>
                      <h3 className="mt-2 text-2xl font-display font-semibold sm:text-3xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-md text-muted-foreground md:ml-auto">
                        {step.desc}
                      </p>
                    </div>
                    <div className="hidden md:block" />
                  </>
                ) : (
                  <>
                    <div className="hidden md:block" />
                    <div className="md:pl-16 col-start-2">
                      <p className="text-sm tabular-nums text-primary">{step.n}</p>
                      <h3 className="mt-2 text-2xl font-display font-semibold sm:text-3xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-md text-muted-foreground">{step.desc}</p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
