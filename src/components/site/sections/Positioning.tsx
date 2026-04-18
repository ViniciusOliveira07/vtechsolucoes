import { RevealText } from "@/components/site/RevealText";

export function Positioning() {
  return (
    <section className="relative flex min-h-[90vh] items-center bg-background py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <p className="text-eyebrow mb-10">01 — Posicionamento</p>
        <RevealText
          as="h2"
          className="text-display-lg font-display text-foreground"
          stagger={0.05}
        >
          Não somos uma agência. Somos uma empresa de tecnologia que resolve problemas reais
          com IA.
        </RevealText>
      </div>
    </section>
  );
}
