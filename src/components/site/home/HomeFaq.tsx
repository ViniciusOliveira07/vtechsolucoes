import { useT, type L } from "@/lib/i18n";
import { FaqSection } from "@/components/site/vt/FaqSection";

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
  const faq = useT(HOME_FAQ);
  return <FaqSection items={faq.map(([q, a]) => ({ q, a }))} slug="home" />;
}
