import { useEffect } from "react";
import { Events } from "@/lib/analytics";
import { COMPANY, WHATSAPP_GREETING, whatsappUrl } from "@/lib/site";
import { useT } from "@/lib/i18n";
import { Ico } from "./Ico";

const TEXT = {
  pt: { kicker: "diagnóstico sem custo", title: "Mostre o processo que mais consome a sua equipe", text: "Em uma conversa técnica, mapeamos o fluxo e devolvemos uma proposta com escopo, prazo e investimento em até 24 horas úteis.", ready: "Sua mensagem já está pronta", send: "Enviar no WhatsApp" },
  en: { kicker: "free diagnosis", title: "Show us the process that eats up your team's time", text: "In a technical call, we map the flow and send back a proposal with scope, timeline and investment within 24 business hours.", ready: "Your message is ready", send: "Send on WhatsApp" },
  es: { kicker: "diagnóstico sin costo", title: "Muéstrenos el proceso que más consume a su equipo", text: "En una conversación técnica, mapeamos el flujo y le devolvemos una propuesta con alcance, plazo e inversión en hasta 24 horas hábiles.", ready: "Su mensaje ya está listo", send: "Enviar por WhatsApp" },
};

export function FinalCta() {
  const t = useT(TEXT);
  const greeting = useT(WHATSAPP_GREETING);
  const href = whatsappUrl(greeting);
  // altura real do rodapé, para a chamada final + rodapé ocuparem exatamente uma tela
  useEffect(() => {
    const set = () => {
      const f = document.querySelector("footer");
      if (f) document.documentElement.style.setProperty("--footer-h", `${f.offsetHeight}px`);
    };
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);
  return (
    <section id="diagnostico" className="vt-final-sec">
      <div className="vt-wrap">
        <div className="vt-final vt-grid-bg">
          <div>
            <span className="vt-kicker">{t.kicker}</span>
            <h2 className="vt-h2 vt-dot">{t.title}</h2>
            <p>{t.text}</p>
          </div>
          <div className="vt-compose">
            <div className="vt-compose-h">
              <span className="vt-ava">
                <svg viewBox="0 0 24 24" aria-hidden className="h-[1.1rem] w-[1.1rem]">
                  <path d="M3 4h4l5 12 5-12h4l-7 16h-4z" fill="currentColor" />
                  <circle cx="20" cy="20" r="2" fill="var(--cyan)" />
                </svg>
              </span>
              <div>
                <b>Vtech Soluções</b>
                <small>{COMPANY.phoneDisplay}</small>
              </div>
            </div>
            <div className="vt-bubble">{greeting}</div>
            <div className="vt-row3">
              <span className="vt-fake">{t.ready}</span>
              <a
                className="vt-send"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.send}
                onClick={() => {
                  Events.ctaClick("Enviar no WhatsApp", "home_final");
                  Events.whatsappClick("/#diagnostico");
                }}
              >
                <Ico name="send" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
