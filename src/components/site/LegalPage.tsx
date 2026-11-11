import type { ReactNode } from "react";
import { COMPANY, whatsappUrl } from "@/lib/site";
import { useLocale, useT, type L } from "@/lib/i18n";
import { noDot } from "@/components/site/vt/Page";

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
    <section className="vt-hero vt-page-hero">
      <div className="vt-wrap vt-legal">
        <header className="vt-legal-aside min-w-0">
          <span className="vt-kicker">{eyebrow}</span>
          <h1 className="vt-h1 vt-page-title vt-dot">{noDot(title)}</h1>
          {t.notice && (
            <p lang={locale} className="vt-note">
              {t.notice}
            </p>
          )}
          <p className="vt-hero-sub">{intro}</p>
          <p className="vt-meta-row">
            {t.updated} {updatedAt}
          </p>
        </header>

        <div className="vt-article-body">
          {sections.map((section, i) => (
            <article key={section.title} className="vt-legal-sec">
              <h2>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {section.title}
              </h2>
              <div>{section.body}</div>
            </article>
          ))}
          <div className="vt-note">
            {t.questions}{" "}
            <a href={whatsappUrl(t.whatsapp)} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
              {COMPANY.phoneDisplay}
            </a>
            .
          </div>
        </div>
      </div>
    </section>
  );
}
