import { COMPANY, WHATSAPP_GREETING, whatsappUrl } from "@/lib/site";
import { Events } from "@/lib/analytics";
import { ContactForm } from "@/components/site/ContactForm";
import { useT } from "@/lib/i18n";
import { noDot } from "@/components/site/vt/Page";

const TEXT = {
  pt: {
    available: "Disponível para novos projetos",
    title: "Conte o desafio. Devolvemos uma proposta fechada.",
    sub: "Descreva o processo ou o sistema que você quer resolver. Respondemos com um diagnóstico e uma proposta com escopo, prazo e investimento.",
    orWhatsapp: "ou pelo WhatsApp",
    replyShort: "resposta em até 24h úteis",
    keys: { hq: "sede", clients: "atendimento", reply: "resposta" },
    clients: "Exclusivamente B2B",
    reply: "Até 24 horas úteis",
  },
  en: {
    available: "Available for new projects",
    title: "Tell us the challenge. We send back a fixed-scope proposal.",
    sub: "Describe the process or system you want to fix. We reply with a diagnosis and a proposal covering scope, timeline and investment.",
    orWhatsapp: "or on WhatsApp",
    replyShort: "reply within 24 business hours",
    keys: { hq: "headquarters", clients: "clients", reply: "response" },
    clients: "B2B only",
    reply: "Within 24 business hours",
  },
  es: {
    available: "Disponible para nuevos proyectos",
    title: "Cuéntenos el desafío. Le devolvemos una propuesta cerrada.",
    sub: "Describa el proceso o el sistema que desea resolver. Respondemos con un diagnóstico y una propuesta con alcance, plazo e inversión.",
    orWhatsapp: "o por WhatsApp",
    replyShort: "respuesta en hasta 24 h hábiles",
    keys: { hq: "sede", clients: "atencion", reply: "respuesta" },
    clients: "Exclusivamente B2B",
    reply: "Hasta 24 horas hábiles",
  },
};

export function Contact({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  const H = headingAs;
  const t = useT(TEXT);
  const wa = whatsappUrl(useT(WHATSAPP_GREETING));
  const INFO = [
    { k: "whatsapp", v: COMPANY.phoneDisplay, href: wa },
    { k: t.keys.hq, v: `${COMPANY.city}, ${COMPANY.state}` },
    { k: t.keys.clients, v: t.clients },
    { k: t.keys.reply, v: t.reply },
  ];
  return (
    <section id="contato" className="vt-hero vt-page-hero">
      <div className="vt-wrap vt-contact">
        <div className="min-w-0">
          <span className="vt-kicker">{t.available}</span>
          <H className="vt-h1 vt-page-title vt-dot">{noDot(t.title)}</H>
          <p className="vt-hero-sub">{t.sub}</p>
          <dl className="vt-info">
            {INFO.map((i) => (
              <div key={i.k}>
                <dt>{i.k}</dt>
                <dd>
                  {i.href ? (
                    <a href={i.href} target="_blank" rel="noopener noreferrer" onClick={() => Events.whatsappClick("contato")}>
                      {i.v}
                    </a>
                  ) : (
                    i.v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="vt-form-card">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
