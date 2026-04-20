import type { ReactNode } from "react";

interface LegalSection {
  title: string;
  body: ReactNode;
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  updatedAt: string;
  sections: LegalSection[];
}

export function LegalPage({
  eyebrow,
  title,
  intro,
  updatedAt,
  sections,
}: LegalPageProps) {
  return (
    <section className="relative overflow-hidden bg-background pb-20 pt-28 sm:pb-28 sm:pt-32 md:pb-32 md:pt-36">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] max-w-[120vw] -translate-x-1/2 rounded-full opacity-[0.14] blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.62 0.21 258 / 0.7), transparent)",
        }}
      />

      <div className="relative mx-auto w-full max-w-3xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center">
          <p className="text-eyebrow text-primary tracking-[0.3em]">{eyebrow}</p>
          <h1 className="mt-5 text-display-lg font-display tracking-tight text-balance">
            {title}
            <span className="text-primary">.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground sm:mt-6 sm:text-base md:text-lg">
            {intro}
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-medium text-muted-foreground backdrop-blur sm:text-xs">
            Última atualização · {updatedAt}
          </p>
        </header>

        {/* Sections */}
        <div className="mt-14 space-y-10 sm:mt-16 sm:space-y-12">
          {sections.map((section, i) => (
            <article key={section.title} className="group">
              <div className="flex items-baseline gap-4">
                <span className="text-xs font-mono text-primary/70 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl font-display font-semibold tracking-tight text-foreground sm:text-2xl">
                  {section.title}
                </h2>
              </div>
              <div className="mt-4 space-y-4 pl-9 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {section.body}
              </div>
            </article>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 text-center sm:p-8">
          <p className="text-sm text-muted-foreground">
            Dúvidas sobre este documento? Entre em contato:{" "}
            <a
              href="mailto:contato@vtechsolucoes.com"
              className="text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              contato@vtechsolucoes.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
