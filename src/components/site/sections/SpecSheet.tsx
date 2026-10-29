import { SectionHead } from "@/components/site/SectionHead";
import { RailHint } from "@/components/site/RailHint";
import { useT, type L } from "@/lib/i18n";

type Spec = { k: string; v: string; d: string };

export const SPECS: L<Spec[]> = {
  pt: [
    { k: "Escopo", v: "Fechado", d: "Definido por escrito antes do início. Mudanças entram como aditivo." },
    { k: "Proposta", v: "≤ 24h úteis", d: "Depois da conversa de diagnóstico, sem custo." },
    { k: "Atendimento", v: "Exclusivo B2B", d: "Atendemos apenas empresas, do diagnóstico à entrega." },
    { k: "Seus dados", v: "Fora do treino", d: "Usamos APIs empresariais que não treinam modelos com o seu conteúdo." },
    { k: "Entrega", v: "Código + docs", d: "Deploy, documentação técnica e handoff para sua equipe." },
    { k: "Mensalidade", v: "Opcional", d: "Você paga pelo projeto. Sustentação só se fizer sentido para você." },
  ],
  en: [
    { k: "Scope", v: "Fixed", d: "Defined in writing before work starts. Changes come in as an amendment." },
    { k: "Proposal", v: "≤ 24 business hrs", d: "After the diagnosis call, at no cost." },
    { k: "Clients", v: "B2B only", d: "We only work with companies, from diagnosis to delivery." },
    { k: "Your data", v: "Never trained on", d: "We use enterprise APIs that do not train models on your content." },
    { k: "Delivery", v: "Code + docs", d: "Deployment, technical documentation and handoff to your team." },
    { k: "Retainer", v: "Optional", d: "You pay for the project. Ongoing support only if it makes sense for you." },
  ],
  es: [
    { k: "Alcance", v: "Cerrado", d: "Definido por escrito antes del inicio. Los cambios entran como adenda." },
    { k: "Propuesta", v: "≤ 24 h hábiles", d: "Después de la conversación de diagnóstico, sin costo." },
    { k: "Atención", v: "Exclusivo B2B", d: "Atendemos solo a empresas, del diagnóstico a la entrega." },
    { k: "Sus datos", v: "Fuera del entrenamiento", d: "Usamos APIs empresariales que no entrenan modelos con su contenido." },
    { k: "Entrega", v: "Código + docs", d: "Despliegue, documentación técnica y traspaso a su equipo." },
    { k: "Mensualidad", v: "Opcional", d: "Usted paga por el proyecto. Soporte continuo solo si tiene sentido para usted." },
  ],
};

const TEXT = {
  pt: {
    title: "Ficha técnica da contratação",
    detail: "O que você pode exigir de nós em qualquer projeto.",
    label: "Condições de contratação",
  },
  en: {
    title: "Engagement spec sheet",
    detail: "What you can hold us to on any project.",
    label: "Engagement terms",
  },
  es: {
    title: "Ficha técnica de la contratación",
    detail: "Lo que usted puede exigirnos en cualquier proyecto.",
    label: "Condiciones de contratación",
  },
};

export function SpecSheet({ id = "ficha" }: { id?: string }) {
  const t = useT(TEXT);
  const specs = useT(SPECS);
  return (
    <section id={id} className="section">
      <div className="shell">
        <SectionHead title={t.title} detailClassName="hide-phone">
          {t.detail}
        </SectionHead>
        <dl
          tabIndex={0}
          aria-label={t.label}
          className="rail rail-boxed grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3"
        >
          {specs.map((s, i) => (
            <div key={i} className="border-b border-r border-border px-6 py-[clamp(1rem,3.4vh,1.75rem)]">
              <dt className="kicker">{s.k}</dt>
              <dd className="m-0">
                <p className="mt-2 text-[clamp(1.375rem,min(2.2vw,4vh),1.875rem)] tracking-[-0.03em]">{s.v}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
              </dd>
            </div>
          ))}
        </dl>
        <RailHint />
      </div>
    </section>
  );
}
