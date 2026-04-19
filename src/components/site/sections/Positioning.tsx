export function Positioning() {
  return (
    <section className="relative w-full bg-background py-12 md:py-16 overflow-hidden px-6 lg:px-10">
      <div className="mx-auto max-w-5xl w-full flex flex-col items-center text-center">
        
        {/* Padronizado com as outras seções */}
        <p className="text-eyebrow mb-10 md:mb-12 text-primary tracking-[0.3em] uppercase">
          01 — Posicionamento
        </p>

        {/* Super Premium Card Break */}
        <div className="relative w-full glass rounded-[2.5rem] md:rounded-[3.5rem] border border-border-strong p-10 md:p-16 lg:p-24 overflow-hidden shadow-2xl shadow-primary/5 group transition-all duration-700 hover:border-primary/30 hover:shadow-primary/10 hover:-translate-y-1">
          
          {/* Animated gradient sweep background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50 group-hover:opacity-100 transition-opacity duration-1000 rounded-full blur-[100px]" />
          <div className="absolute top-0 inset-x-20 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative z-10 mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-medium text-foreground leading-[1.3] tracking-tight">
              Não somos uma <span className="text-muted-foreground line-through decoration-primary/60 decoration-[3px] hover:text-foreground transition-all duration-300">agência</span>.<br className="hidden md:block" />
              Somos uma empresa de <span className="text-primary italic pr-1">tecnologia</span> que resolve problemas reais com IA<span className="text-primary">.</span>
            </h2>
          </div>
        </div>
          
      </div>
    </section>
  );
}
