import { COMPANY, WHATSAPP_GREETING, whatsappUrl } from "@/lib/site";
import { Events } from "@/lib/analytics";
import { ContactForm } from "@/components/site/ContactForm";
import { useT } from "@/lib/i18n";

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
    <section id="contato" className="section">
      {/* Celular: título → formulário → WhatsApp. Desktop: título e dados à esquerda, formulário à direita. */}
      <div className="shell grid gap-[clamp(1rem,3vh,2rem)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-[clamp(1.25rem,4vh,2.5rem)]">
        <div className="min-w-0">
          <p className="kicker hide-phone">
            <span className="text-ok">●</span> {t.available}
          </p>
          <H className="h-section mt-[clamp(0.5rem,1.6vh,1rem)]">{t.title}</H>
          <p className="hide-phone mt-[clamp(0.75rem,2.4vh,1.25rem)] max-w-[46ch] text-muted-foreground">
            {t.sub}
          </p>
        </div>
        <div className="panel min-w-0 p-[clamp(1rem,3.2vh,2rem)] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <ContactForm />
        </div>
        <div className="min-w-0 lg:col-start-1 lg:row-start-2">
          {/* celular: só o essencial, numa linha */}
          <p className="hide-short font-mono text-[0.8125rem] text-faint lg:hidden">
            {t.orWhatsapp}{" "}
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => Events.whatsappClick("contato")}
              className="inline-flex min-h-11 items-center text-signal hover:underline"
            >
              {COMPANY.phoneDisplay}
            </a>{" "}
            · {t.replyShort}
          </p>
          <dl className="hidden font-mono text-[0.8125rem] lg:grid">
            {INFO.map((i) => (
              <div key={i.k} className="flex justify-between gap-3 border-t border-border py-[clamp(0.5rem,1.6vh,0.75rem)] last:border-b">
                <dt className="text-faint">{i.k}</dt>
                <dd className="m-0 text-right">
                  {i.href ? (
                    <a
                      href={i.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => Events.whatsappClick("contato")}
                      className="-my-3 inline-flex min-h-11 items-center text-signal hover:underline"
                    >
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
      </div>
    </section>
  );
}
