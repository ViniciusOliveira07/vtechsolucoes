import { useEffect, useState } from "react";
import { Events } from "@/lib/analytics";
import { WHATSAPP_GREETING, whatsappUrl } from "@/lib/site";
import { useT, type L } from "@/lib/i18n";
import { ArrowDot, Ico } from "./Ico";
import { useReducedMotion } from "./hooks";

type Scene = { head: string; msgs: ["in" | "out", string][]; logs: [number, string][] };

const TEXT = {
  pt: {
    l1: "Sua equipe para de copiar e colar.",
    l2: "A operação roda sozinha",
    sub: "Agentes de IA, integrações e sistemas que conectam WhatsApp, ERP e CRM e fazem o trabalho repetitivo por você.",
    cta: "Iniciar diagnóstico",
    secondary: "Ver o que construímos",
    online: "agente de IA online",
    cap: "Exemplo · feito pela Vtech",
    behind: "Por trás da conversa",
    sceneLabel: "Exemplo de agente de IA atendendo e consultando os sistemas da empresa",
  },
  en: {
    l1: "Your team stops copying and pasting.",
    l2: "The operation runs on its own",
    sub: "AI agents, integrations and systems that connect WhatsApp, ERP and CRM and do the repetitive work for you.",
    cta: "Start diagnosis",
    secondary: "See what we build",
    online: "AI agent online",
    cap: "Example · built by Vtech",
    behind: "Behind the conversation",
    sceneLabel: "Example of an AI agent answering and checking the company systems",
  },
  es: {
    l1: "Su equipo deja de copiar y pegar.",
    l2: "La operación funciona sola",
    sub: "Agentes de IA, integraciones y sistemas que conectan WhatsApp, ERP y CRM y hacen el trabajo repetitivo por usted.",
    cta: "Iniciar diagnóstico",
    secondary: "Ver lo que construimos",
    online: "agente de IA en línea",
    cap: "Ejemplo · hecho por Vtech",
    behind: "Detrás de la conversación",
    sceneLabel: "Ejemplo de agente de IA atendiendo y consultando los sistemas de la empresa",
  },
};

const SCENES: L<Scene[]> = {
  pt: [
    { head: "Atendimento · Distribuidora", msgs: [["in", "Oi! O pedido 4821 já saiu para entrega?"], ["out", "Saiu hoje às 14h12 com a transportadora. A previsão é amanhã até 18h."], ["out", "Quer que eu te avise por aqui quando for entregue?"], ["in", "Quero sim, obrigado!"]], logs: [[2, "Consultou o pedido no ERP"], [3, "Leu o rastreio da entrega"], [5, "Registrou o aviso no CRM"]] },
    { head: "Pedidos · Distribuidora", msgs: [["in", "Manda 2 caixas do item 118, igual ao último pedido."], ["out", "Pedido 4822 criado: 2 cx do item 118, R$ 486,00. Faturo para o mesmo CNPJ?"], ["in", "Pode faturar."], ["out", "Feito. A nota sai em instantes e eu te mando o boleto aqui."]], logs: [[2, "Identificou o cliente pelo número"], [3, "Conferiu o estoque no ERP"], [5, "Criou e faturou o pedido"]] },
    { head: "Comercial · Assistente", msgs: [["in", "Quero um orçamento para 40 usuários."], ["out", "Anotado! Qual o segmento da empresa e o melhor horário para o consultor ligar?"], ["in", "Distribuidora. Depois das 14h."], ["out", "Perfeito. O Rafael te liga hoje depois das 14h."]], logs: [[2, "Criou o lead no CRM"], [4, "Registrou segmento e porte"], [5, "Avisou o vendedor no WhatsApp"]] },
    { head: "Gestão · Assistente interno", msgs: [["in", "Quanto vendemos ontem, por vendedor?"], ["out", "Ontem: R$ 38,2 mil. Ana R$ 14,1 mil, Bruno R$ 12,6 mil, Carla R$ 11,5 mil."], ["out", "Quer o comparativo da semana em PDF?"], ["in", "Quero, manda aqui."]], logs: [[2, "Consultou as vendas no ERP"], [3, "Montou o resumo por vendedor"], [5, "Nenhuma planilha aberta"]] },
  ],
  en: [
    { head: "Support · Distributor", msgs: [["in", "Hi! Has order 4821 shipped yet?"], ["out", "It left today at 2:12 pm with the carrier. Expected tomorrow by 6 pm."], ["out", "Want me to let you know here when it's delivered?"], ["in", "Yes please, thanks!"]], logs: [[2, "Checked the order in the ERP"], [3, "Read the delivery tracking"], [5, "Logged the alert in the CRM"]] },
    { head: "Orders · Distributor", msgs: [["in", "Send 2 boxes of item 118, same as last order."], ["out", "Order 4822 created: 2 boxes of item 118, $486.00. Bill the same company?"], ["in", "Go ahead."], ["out", "Done. The invoice is on its way and I'll send the payment slip here."]], logs: [[2, "Identified the customer by number"], [3, "Checked stock in the ERP"], [5, "Created and billed the order"]] },
    { head: "Sales · Assistant", msgs: [["in", "I'd like a quote for 40 users."], ["out", "Got it! What's your industry and the best time for a consultant to call?"], ["in", "Distribution. After 2 pm."], ["out", "Perfect. Rafael will call you today after 2 pm."]], logs: [[2, "Created the lead in the CRM"], [4, "Logged industry and size"], [5, "Alerted the rep on WhatsApp"]] },
    { head: "Management · Internal assistant", msgs: [["in", "How much did we sell yesterday, by rep?"], ["out", "Yesterday: $38.2k. Ana $14.1k, Bruno $12.6k, Carla $11.5k."], ["out", "Want the weekly comparison as a PDF?"], ["in", "Yes, send it here."]], logs: [[2, "Pulled sales from the ERP"], [3, "Built the summary by rep"], [5, "No spreadsheet opened"]] },
  ],
  es: [
    { head: "Atención · Distribuidora", msgs: [["in", "¡Hola! ¿El pedido 4821 ya salió a entrega?"], ["out", "Salió hoy a las 14:12 con la transportadora. Llega mañana antes de las 18 h."], ["out", "¿Quiere que le avise por aquí cuando se entregue?"], ["in", "¡Sí, gracias!"]], logs: [[2, "Consultó el pedido en el ERP"], [3, "Leyó el rastreo de la entrega"], [5, "Registró el aviso en el CRM"]] },
    { head: "Pedidos · Distribuidora", msgs: [["in", "Mande 2 cajas del ítem 118, igual que el último pedido."], ["out", "Pedido 4822 creado: 2 cajas del ítem 118, R$ 486,00. ¿Facturo a la misma empresa?"], ["in", "Puede facturar."], ["out", "Listo. La factura sale en instantes y le envío la boleta por aquí."]], logs: [[2, "Identificó al cliente por el número"], [3, "Verificó el stock en el ERP"], [5, "Creó y facturó el pedido"]] },
    { head: "Comercial · Asistente", msgs: [["in", "Quiero un presupuesto para 40 usuarios."], ["out", "¡Anotado! ¿Cuál es el rubro de la empresa y el mejor horario para que llame el consultor?"], ["in", "Distribuidora. Después de las 14 h."], ["out", "Perfecto. Rafael lo llama hoy después de las 14 h."]], logs: [[2, "Creó el lead en el CRM"], [4, "Registró rubro y tamaño"], [5, "Avisó al vendedor por WhatsApp"]] },
    { head: "Gestión · Asistente interno", msgs: [["in", "¿Cuánto vendimos ayer, por vendedor?"], ["out", "Ayer: R$ 38,2 mil. Ana R$ 14,1 mil, Bruno R$ 12,6 mil, Carla R$ 11,5 mil."], ["out", "¿Quiere el comparativo de la semana en PDF?"], ["in", "Sí, envíelo por aquí."]], logs: [[2, "Consultó las ventas en el ERP"], [3, "Armó el resumen por vendedor"], [5, "Ninguna planilla abierta"]] },
  ],
};

/** Momento de cada mensagem: a 1ª entra em 0, "digitando" em 1, as demais em 2, 3, 4. */
const at = (i: number) => (i === 0 ? 0 : i + 1);
const LAST = 6;

export function HomeHero() {
  const t = useT(TEXT);
  const scenes = useT(SCENES);
  const greeting = useT(WHATSAPP_GREETING);
  const reduce = useReducedMotion();
  // no servidor (e sem JavaScript) a conversa aparece inteira; a animação começa no navegador
  const [k, setK] = useState(0);
  const [step, setStep] = useState(LAST);

  useEffect(() => {
    if (reduce) {
      setStep(LAST);
      return;
    }
    setStep(0);
    const id = window.setInterval(() => {
      setStep((s) => {
        if (s >= 8) {
          setK((x) => (x + 1) % scenes.length);
          return 0;
        }
        return s + 1;
      });
    }, 1300);
    return () => window.clearInterval(id);
  }, [reduce, scenes.length]);

  const scene = scenes[k];
  return (
    <section className="vt-hero vt-screen">
      <div className="vt-wrap vt-hero-grid">
        <div>
          <h1 className="vt-h1">
            {t.l1} <em className="vt-dot">{t.l2}</em>
          </h1>
          <p className="vt-hero-sub">{t.sub}</p>
          <div className="vt-ctas">
            <a
              className="btn btn-arrow"
              href={whatsappUrl(greeting)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                Events.ctaClick("Iniciar diagnóstico", "hero");
                Events.whatsappClick("/");
              }}
            >
              {t.cta}
              <ArrowDot />
            </a>
            <a className="btn btn-line" href="#servicos">
              {t.secondary}
            </a>
          </div>
        </div>

        <div className="vt-scene" role="img" aria-label={t.sceneLabel}>
          <div className="vt-phone">
            <div className="vt-phone-top">
              <span className="vt-ava">
                <Ico name="bot" />
              </span>
              <div>
                <b>{scene.head}</b>
                <small>● {t.online}</small>
              </div>
            </div>
            <div className="vt-chat">
              {scene.msgs.map(([dir, txt], i) => (
                <FragmentMsg key={`${k}-${i}`} i={i} dir={dir} txt={txt} step={step} />
              ))}
            </div>
            <div className="vt-phone-cap">{t.cap}</div>
          </div>
          <div className="vt-float vt-flog">
            <span className="vt-eyebrow">{t.behind}</span>
            <ul>
              {scene.logs.map(([when, txt]) => (
                <li key={`${k}-${txt}`} data-on={step >= when}>
                  <i>
                    <Ico name="check" />
                  </i>
                  {txt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FragmentMsg({ i, dir, txt, step }: { i: number; dir: "in" | "out"; txt: string; step: number }) {
  return (
    <>
      {i === 1 && step === 1 && (
        <div className="vt-typing" aria-hidden>
          <span />
          <span />
          <span />
        </div>
      )}
      <div className="vt-msg" {...{ [`data-${dir}`]: "" }} data-wait={at(i) > step}>
        {txt}
      </div>
    </>
  );
}
