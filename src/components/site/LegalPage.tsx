import type { ReactNode } from "react";
import { COMPANY, whatsappUrl } from "@/lib/site";

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

export function LegalPage({ eyebrow, title, intro, updatedAt, sections }: LegalPageProps) {
  return (
    <section className="section">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
        <header className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <p className="kicker">{eyebrow}</p>
          <h1 className="h-section mt-4">{title}</h1>
          <p className="mt-5 max-w-[46ch] text-muted-foreground">{intro}</p>
          <p className="mt-6 font-mono text-xs text-faint">atualizado em {updatedAt}</p>
        </header>

        <div className="min-w-0 max-w-[70ch]">
          {sections.map((section, i) => (
            <article key={section.title} className="border-t border-border py-8 first:border-t-0 first:pt-0">
              <h2 className="flex items-baseline gap-4 text-[1.375rem] tracking-[-0.02em]">
                <span className="font-mono text-xs text-signal tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-muted-foreground sm:pl-9 [&_a]:text-signal [&_a]:underline [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                {section.body}
              </div>
            </article>
          ))}

          <div className="panel mt-6 p-6 text-sm text-muted-foreground">
            Dúvidas sobre este documento? Fale com a gente pelo WhatsApp{" "}
            <a
              href={whatsappUrl("Olá! Tenho uma dúvida sobre os documentos legais do site.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-signal underline underline-offset-4"
            >
              {COMPANY.phoneDisplay}
            </a>
            .
          </div>
        </div>
      </div>
    </section>
  );
}
