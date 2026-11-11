import { useState } from "react";
import { Events } from "@/lib/analytics";
import { WHATSAPP_GREETING, whatsappUrl } from "@/lib/site";
import { useT } from "@/lib/i18n";
import { ArrowDot, Ico } from "@/components/site/home/Ico";

const TEXT = {
  pt: { kicker: "perguntas frequentes", title: "O que perguntam na primeira conversa", sub: "Respostas curtas para as dúvidas mais comuns antes de contratar.", help: "Sua dúvida não está aqui?", helpText: "Fale direto com quem vai construir o projeto. Sem atendente de script.", helpCta: "Perguntar no WhatsApp" },
  en: { kicker: "frequently asked questions", title: "What people ask on the first call", sub: "Short answers to the most common questions before hiring.", help: "Don't see your question?", helpText: "Talk directly to the people who will build the project. No scripted support.", helpCta: "Ask on WhatsApp" },
  es: { kicker: "preguntas frecuentes", title: "Lo que preguntan en la primera conversación", sub: "Respuestas cortas a las dudas más comunes antes de contratar.", help: "¿Su duda no está aquí?", helpText: "Hable directo con quien va a construir el proyecto. Sin atención con guion.", helpCta: "Preguntar por WhatsApp" },
};

/**
 * FAQ no layout novo: título e cartão de ajuda à esquerda, perguntas abrindo uma de cada vez.
 * Leva junto o JSON-LD FAQPage (na própria seção, fora do head, como nas páginas de serviço).
 */
export function FaqSection({
  items,
  slug,
  id = "perguntas",
  kicker,
  title,
  sub,
}: {
  items: { q: string; a: string }[];
  slug: string;
  id?: string;
  kicker?: string;
  title?: string;
  sub?: string;
}) {
  const t = useT(TEXT);
  const greeting = useT(WHATSAPP_GREETING);
  const [open, setOpen] = useState(0);
  // "<" vira < no JSON-LD (impede fechar a tag <script> por engano)
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  }).replace(/</g, String.fromCharCode(92) + "u003c");
  return (
    <section id={id} className="vt-sec vt-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <div className="vt-wrap vt-faq">
        <div>
          <div className="vt-head">
            <span className="vt-kicker">{kicker ?? t.kicker}</span>
            <h2 className="vt-h2 vt-dot">{title ?? t.title}</h2>
            {(sub ?? t.sub) && <p>{sub ?? t.sub}</p>}
          </div>
          <div className="vt-help">
            <b>{t.help}</b>
            <p>{t.helpText}</p>
            <a
              className="btn btn-line btn-arrow"
              href={whatsappUrl(greeting)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => Events.whatsappClick(`faq_${slug}`)}
            >
              {t.helpCta}
              <ArrowDot />
            </a>
          </div>
        </div>
        <div className="vt-acc">
          {items.map(({ q, a }, i) => (
            <div key={q} className="vt-acc-i" data-open={open === i}>
              <h3>
                <button
                  type="button"
                  id={`${id}-q-${i}`}
                  aria-expanded={open === i}
                  aria-controls={`${id}-a-${i}`}
                  onClick={() => {
                    setOpen(open === i ? -1 : i);
                    if (open !== i) Events.faqOpen(q, slug);
                  }}
                >
                  {q}
                  <span className="vt-pm">
                    <Ico name="plus" />
                  </span>
                </button>
              </h3>
              <div className="vt-acc-b" id={`${id}-a-${i}`} role="region" aria-labelledby={`${id}-q-${i}`}>
                <div>
                  <p>{a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
