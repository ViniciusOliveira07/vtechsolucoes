import { useState } from "react";
import { Events } from "@/lib/analytics";
import { WHATSAPP_GREETING, whatsappUrl } from "@/lib/site";
import { useT, type L } from "@/lib/i18n";
import { ArrowDot, Ico } from "./Ico";

const TEXT = {
  pt: { kicker: "perguntas frequentes", title: "O que perguntam na primeira conversa", sub: "Respostas curtas para as dúvidas mais comuns antes de contratar.", help: "Sua dúvida não está aqui?", helpText: "Fale direto com quem vai construir o projeto. Sem atendente de script.", helpCta: "Perguntar no WhatsApp" },
  en: { kicker: "frequently asked questions", title: "What people ask on the first call", sub: "Short answers to the most common questions before hiring.", help: "Don't see your question?", helpText: "Talk directly to the people who will build the project. No scripted support.", helpCta: "Ask on WhatsApp" },
  es: { kicker: "preguntas frecuentes", title: "Lo que preguntan en la primera conversación", sub: "Respuestas cortas a las dudas más comunes antes de contratar.", help: "¿Su duda no está aquí?", helpText: "Hable directo con quien va a construir el proyecto. Sin atención con guion.", helpCta: "Preguntar por WhatsApp" },
};

export const HOME_FAQ: L<[string, string][]> = {
  pt: [
    ["Como começa um projeto?", "Com uma conversa de diagnóstico pelo WhatsApp, sem custo. Depois dela, você recebe uma proposta fechada com escopo, prazo e investimento em até 24 horas úteis."],
    ["Vocês atendem pessoa física?", "Não. O atendimento é exclusivo para empresas, do diagnóstico à entrega."],
    ["O escopo pode mudar no meio do caminho?", "O escopo é definido por escrito antes do início. Se algo mudar, entra como aditivo, com prazo e valor combinados antes."],
    ["O código fica com a minha empresa?", "Sim. A entrega inclui deploy, documentação técnica e handoff para a sua equipe."],
    ["Preciso pagar mensalidade?", "Não. Você paga pelo projeto. Sustentação mensal só se fizer sentido para você."],
    ["Meus dados vão treinar a IA?", "Não. Usamos APIs empresariais que não treinam modelos com o seu conteúdo."],
    ["E se a IA inventar uma resposta?", "O agente responde a partir dos seus documentos (RAG), cita a fonte e segue limites definidos no projeto. Precisão e custo por resposta ficam em um painel."],
    ["Funciona no WhatsApp da minha empresa?", "Sim. Dá para usar a API oficial do WhatsApp ou a conexão via WhatsApp Web, conforme o volume e o tipo de uso."],
  ],
  en: [
    ["How does a project start?", "With a diagnosis call on WhatsApp, at no cost. After it, you get a fixed proposal with scope, timeline and investment within 24 business hours."],
    ["Do you work with individuals?", "No. We only work with companies, from diagnosis to delivery."],
    ["Can the scope change along the way?", "The scope is defined in writing before work starts. If something changes, it comes in as an amendment, with timeline and price agreed first."],
    ["Does my company keep the code?", "Yes. Delivery includes deploy, technical documentation and handoff to your team."],
    ["Do I have to pay a monthly fee?", "No. You pay for the project. Monthly support only if it makes sense for you."],
    ["Will my data be used to train AI?", "No. We use enterprise APIs that do not train models on your content."],
    ["What if the AI makes up an answer?", "The agent answers from your documents (RAG), cites the source and follows limits defined in the project. Accuracy and cost per answer are tracked on a dashboard."],
    ["Does it work on my company's WhatsApp?", "Yes. You can use the official WhatsApp API or the WhatsApp Web connection, depending on volume and type of use."],
  ],
  es: [
    ["¿Cómo empieza un proyecto?", "Con una conversación de diagnóstico por WhatsApp, sin costo. Después, usted recibe una propuesta cerrada con alcance, plazo e inversión en hasta 24 horas hábiles."],
    ["¿Atienden a personas físicas?", "No. La atención es exclusiva para empresas, del diagnóstico a la entrega."],
    ["¿El alcance puede cambiar en el camino?", "El alcance se define por escrito antes del inicio. Si algo cambia, entra como adenda, con plazo y valor acordados antes."],
    ["¿El código queda con mi empresa?", "Sí. La entrega incluye deploy, documentación técnica y traspaso a su equipo."],
    ["¿Tengo que pagar mensualidad?", "No. Usted paga por el proyecto. Soporte mensual solo si le conviene."],
    ["¿Mis datos van a entrenar la IA?", "No. Usamos APIs empresariales que no entrenan modelos con su contenido."],
    ["¿Y si la IA inventa una respuesta?", "El agente responde a partir de sus documentos (RAG), cita la fuente y sigue límites definidos en el proyecto. Precisión y costo por respuesta quedan en un panel."],
    ["¿Funciona en el WhatsApp de mi empresa?", "Sí. Se puede usar la API oficial de WhatsApp o la conexión vía WhatsApp Web, según el volumen y el tipo de uso."],
  ],
};

export function HomeFaq() {
  const t = useT(TEXT);
  const faq = useT(HOME_FAQ);
  const greeting = useT(WHATSAPP_GREETING);
  const [open, setOpen] = useState(0);
  // FAQ no Google: o JSON-LD vai dentro da própria seção (mesmo padrão das páginas de serviço)
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  }).replace(/</g, String.fromCharCode(92) + "u003c");
  return (
    <section id="perguntas" className="vt-sec vt-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <div className="vt-wrap vt-faq">
        <div>
          <div className="vt-head">
            <span className="vt-kicker">{t.kicker}</span>
            <h2 className="vt-h2 vt-dot">{t.title}</h2>
            <p>{t.sub}</p>
          </div>
          <div className="vt-help">
            <b>{t.help}</b>
            <p>{t.helpText}</p>
            <a
              className="btn btn-line btn-arrow"
              href={whatsappUrl(greeting)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => Events.whatsappClick("/#perguntas")}
            >
              {t.helpCta}
              <ArrowDot />
            </a>
          </div>
        </div>
        <div className="vt-acc">
          {faq.map(([q, a], i) => (
            <div key={q} className="vt-acc-i" data-open={open === i}>
              <h3>
                <button
                  type="button"
                  id={`faq-q-${i}`}
                  aria-expanded={open === i}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => {
                    setOpen(open === i ? -1 : i);
                    if (open !== i) Events.faqOpen(q, "home");
                  }}
                >
                  {q}
                  <span className="vt-pm">
                    <Ico name="plus" />
                  </span>
                </button>
              </h3>
              <div className="vt-acc-b" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
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
