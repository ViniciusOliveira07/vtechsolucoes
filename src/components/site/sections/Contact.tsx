import { COMPANY, whatsappUrl } from "@/lib/site";
import { Events } from "@/lib/analytics";
import { ContactForm } from "@/components/site/ContactForm";

const INFO = [
  { k: "whatsapp", v: COMPANY.phoneDisplay, href: whatsappUrl() },
  { k: "sede", v: `${COMPANY.city}, ${COMPANY.state}` },
  { k: "atendimento", v: "Exclusivamente B2B" },
  { k: "resposta", v: "Até 24 horas úteis" },
];

export function Contact({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  const H = headingAs;
  return (
    <section id="contato" className="section">
      {/* Celular: título → formulário → WhatsApp. Desktop: título e dados à esquerda, formulário à direita. */}
      <div className="shell grid gap-[clamp(1rem,3vh,2rem)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-[clamp(1.25rem,4vh,2.5rem)]">
        <div className="min-w-0">
          <p className="kicker hide-phone">
            <span className="text-ok">●</span> Disponível para novos projetos
          </p>
          <H className="h-section mt-[clamp(0.5rem,1.6vh,1rem)]">Conte o desafio. Devolvemos uma proposta fechada.</H>
          <p className="hide-phone mt-[clamp(0.75rem,2.4vh,1.25rem)] max-w-[46ch] text-muted-foreground">
            Descreva o processo ou o sistema que você quer resolver. Respondemos com um diagnóstico e uma proposta com
            escopo, prazo e investimento.
          </p>
        </div>
        <div className="panel min-w-0 p-[clamp(1rem,3.2vh,2rem)] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <ContactForm />
        </div>
        <div className="min-w-0 lg:col-start-1 lg:row-start-2">
          {/* celular: só o essencial, numa linha */}
          <p className="hide-short font-mono text-[0.8125rem] text-faint lg:hidden">
            ou pelo WhatsApp{" "}
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => Events.whatsappClick("contato")}
              className="inline-flex min-h-11 items-center text-signal hover:underline"
            >
              {COMPANY.phoneDisplay}
            </a>{" "}
            · resposta em até 24h úteis
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
