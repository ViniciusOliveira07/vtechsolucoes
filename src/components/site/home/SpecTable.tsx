import { useT, type L } from "@/lib/i18n";
import { Ico } from "./Ico";

type Row = { k: string; v: [string, string][]; d: string };

const TEXT = {
  pt: { kicker: "ficha técnica", title: "O que você pode exigir de nós", sub: "Vale para qualquer projeto, do menor ao maior. Está por escrito na proposta.", stamp: "condições de contratação", param: "parâmetro", value: "valor" },
  en: { kicker: "spec sheet", title: "What you can demand from us", sub: "It applies to every project, small or large. It is in writing in the proposal.", stamp: "terms of engagement", param: "parameter", value: "value" },
  es: { kicker: "ficha técnica", title: "Lo que puede exigirnos", sub: "Vale para cualquier proyecto, del más chico al más grande. Está por escrito en la propuesta.", stamp: "condiciones de contratación", param: "parámetro", value: "valor" },
};

// v: partes do valor; a 1ª coluna de cada par vai em azul quando marcada com "*"
const ROWS: L<Row[]> = {
  pt: [
    { k: "Escopo", v: [["*", "Fechado"]], d: "Definido por escrito antes do início. Mudanças entram como aditivo." },
    { k: "Proposta", v: [["*", "≤ 24h"], ["", " úteis"]], d: "Depois da conversa de diagnóstico, sem custo." },
    { k: "Atendimento", v: [["", "Exclusivo "], ["*", "B2B"]], d: "Atendemos apenas empresas, do diagnóstico à entrega." },
    { k: "Seus dados", v: [["*", "Fora"], ["", " do treino"]], d: "Usamos APIs empresariais que não treinam modelos com o seu conteúdo." },
    { k: "Entrega", v: [["*", "Código"], ["", " + docs"]], d: "Deploy, documentação técnica e handoff para sua equipe." },
    { k: "Mensalidade", v: [["*", "Opcional"]], d: "Você paga pelo projeto. Sustentação só se fizer sentido para você." },
  ],
  en: [
    { k: "Scope", v: [["*", "Fixed"]], d: "Defined in writing before work starts. Changes come in as an amendment." },
    { k: "Proposal", v: [["*", "≤ 24h"], ["", " business"]], d: "After the diagnosis call, at no cost." },
    { k: "Clients", v: [["*", "B2B"], ["", " only"]], d: "We only work with companies, from diagnosis to delivery." },
    { k: "Your data", v: [["*", "Never"], ["", " trained on"]], d: "We use enterprise APIs that do not train models on your content." },
    { k: "Delivery", v: [["*", "Code"], ["", " + docs"]], d: "Deploy, technical documentation and handoff to your team." },
    { k: "Retainer", v: [["*", "Optional"]], d: "You pay for the project. Ongoing support only if it makes sense for you." },
  ],
  es: [
    { k: "Alcance", v: [["*", "Cerrado"]], d: "Definido por escrito antes del inicio. Los cambios entran como adenda." },
    { k: "Propuesta", v: [["*", "≤ 24h"], ["", " hábiles"]], d: "Después de la conversación de diagnóstico, sin costo." },
    { k: "Atención", v: [["", "Exclusivo "], ["*", "B2B"]], d: "Atendemos solo empresas, del diagnóstico a la entrega." },
    { k: "Sus datos", v: [["*", "Fuera"], ["", " del entrenamiento"]], d: "Usamos APIs empresariales que no entrenan modelos con su contenido." },
    { k: "Entrega", v: [["*", "Código"], ["", " + docs"]], d: "Deploy, documentación técnica y traspaso a su equipo." },
    { k: "Mensualidad", v: [["*", "Opcional"]], d: "Usted paga por el proyecto. Soporte continuo solo si le conviene." },
  ],
};

export function SpecTable() {
  const t = useT(TEXT);
  const rows = useT(ROWS);
  return (
    <section id="ficha-tecnica" className="vt-sec vt-screen">
      <div className="vt-wrap vt-spec-grid">
        <div className="vt-head" style={{ marginBottom: 0 }}>
          <span className="vt-kicker">{t.kicker}</span>
          <h2 className="vt-h2 vt-dot">{t.title}</h2>
          <p>{t.sub}</p>
          <span className="vt-stamp">
            <Ico name="file" />
            <span>
              {t.stamp} · <b>vtech soluções</b>
            </span>
          </span>
        </div>
        <div className="vt-sheet2">
          <div className="vt-sheet2-h" aria-hidden>
            <span>{t.param}</span>
            <span>{t.value}</span>
          </div>
          <dl>
            {rows.map((r) => (
              <div key={r.k} className="vt-row">
                <dt>{r.k}</dt>
                <dd>
                  <span className="vt-v">{r.v.map(([hl, txt]) => (hl ? <i key={txt}>{txt}</i> : <span key={txt}>{txt}</span>))}</span>
                  <span className="vt-d">{r.d}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
