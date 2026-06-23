import { motion } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Diagnóstico",
    desc: "Conversa técnica para entender objetivo e contexto.",
  },
  {
    n: "02",
    title: "Proposta",
    desc: "Escopo, prazo e investimento definidos por escrito.",
  },
  {
    n: "03",
    title: "Build com IA",
    desc: "Desenvolvimento rápido com nossa stack proprietária.",
  },
  {
    n: "04",
    title: "Entrega",
    desc: "Deploy, documentação técnica e handoff. Suporte incluso.",
  },
];

export function Process() {
  return (
    <section className="relative bg-background py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1440px] 2xl:max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10 w-full">
        
        <div className="mb-12 text-center flex flex-col items-center">
          <p className="text-eyebrow mb-6 text-primary tracking-[0.3em] uppercase">03 — Processo</p>
          <h2 className="text-display-md font-display">
            Quatro etapas. Sem ruído<span className="text-primary">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Subtle connecting line */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[1px] bg-border-strong -z-10" />
          
          {STEPS.map((step) => (
            <div 
              key={step.n} 
              className="relative w-full glass rounded-3xl p-8 border border-border-strong overflow-hidden flex flex-col group transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"
            >
              <div className="h-16 w-16 rounded-full border-[6px] border-background bg-border-strong flex items-center justify-center text-foreground text-xl font-display font-bold mb-8 mx-auto lg:mx-0 shadow-lg group-hover:bg-primary group-hover:text-background transition-colors duration-500">
                {step.n}
              </div>
              
              <div className="relative z-10 text-center lg:text-left">
                <h3 className="text-2xl font-display font-semibold mb-4 text-foreground group-hover:text-primary transition-colors duration-500">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
