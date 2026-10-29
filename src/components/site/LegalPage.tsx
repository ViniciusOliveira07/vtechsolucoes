import type { ReactNode } from "react";
import { COMPANY, whatsappUrl } from "@/lib/site";
import { useLocale, useT, type L } from "@/lib/i18n";

export interface LegalSection {
  title: string;
  body: ReactNode;
}

export interface LegalPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  updatedAt: string;
  sections: LegalSection[];
}

/** Conteúdo de um documento legal nos três idiomas (cada rota define o seu). */
export type LegalDoc = L<LegalPageProps>;

const TEXT = {
  pt: {
    updated: "atualizado em",
    // português é a versão original: sem aviso de tradução
    notice: null as string | null,
    questions: "Dúvidas sobre este documento? Fale com a gente pelo WhatsApp",
    whatsapp: "Olá! Tenho uma dúvida sobre os documentos legais do site.",
  },
  en: {
    updated: "last updated",
    notice: "This is a translation provided for convenience. In case of any discrepancy, the Portuguese version prevails.",
    questions: "Questions about this document? Reach us on WhatsApp at",
    whatsapp: "Hi! I have a question about the legal documents on your website.",
  },
  es: {
    updated: "actualizado en",
    notice: "Esta es una traducción ofrecida por conveniencia. En caso de divergencia, prevalece la versión en portugués.",
    questions: "¿Tiene dudas sobre este documento? Contáctenos por WhatsApp al",
    whatsapp: "¡Hola! Tengo una duda sobre los documentos legales del sitio.",
  },
};

export function LegalPage({ eyebrow, title, intro, updatedAt, sections }: LegalPageProps) {
  const t = useT(TEXT);
  const locale = useLocale();
  return (
    <section className="section-flow">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
        <header className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <p className="kicker">{eyebrow}</p>
          <h1 className="h-section mt-4">{title}</h1>
          {t.notice && (
            <p lang={locale} className="mt-5 max-w-[46ch] border-l-2 border-signal pl-3 text-xs leading-relaxed text-muted-foreground">
              {t.notice}
            </p>
          )}
          <p className="mt-5 max-w-[46ch] text-muted-foreground">{intro}</p>
          <p className="mt-6 font-mono text-xs text-faint">
            {t.updated} {updatedAt}
          </p>
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
            {t.questions}{" "}
            <a
              href={whatsappUrl(t.whatsapp)}
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
