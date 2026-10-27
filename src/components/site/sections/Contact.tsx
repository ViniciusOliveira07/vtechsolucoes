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
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="min-w-0">
          <p className="kicker">
            <span className="text-ok">●</span> Disponível para novos projetos
          </p>
          <H className="h-section mt-4">Conte o desafio. Devolvemos uma proposta fechada.</H>
          <p className="mt-5 max-w-[46ch] text-muted-foreground">
            Descreva o processo ou o sistema que você quer resolver. Respondemos com um diagnóstico e uma proposta com
            escopo, prazo e investimento.
          </p>
          <dl className="mt-10 grid font-mono text-[13px]">
            {INFO.map((i) => (
              <div key={i.k} className="flex justify-between gap-3 border-t border-border py-3 last:border-b">
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
        <div className="panel min-w-0 p-5 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
