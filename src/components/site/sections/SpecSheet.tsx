import { SectionHead } from "@/components/site/SectionHead";

export const SPECS = [
  { k: "Escopo", v: "Fechado", d: "Definido por escrito antes do início. Mudanças entram como aditivo." },
  { k: "Proposta", v: "≤ 24h úteis", d: "Depois da conversa de diagnóstico, sem custo." },
  { k: "Prova de conceito", v: "15 dias", d: "Para projetos de IA, validamos precisão antes de escalar." },
  { k: "Seus dados", v: "Fora do treino", d: "Usamos APIs empresariais que não treinam modelos com o seu conteúdo." },
  { k: "Entrega", v: "Código + docs", d: "Deploy, documentação técnica e handoff para sua equipe." },
  { k: "Mensalidade", v: "Opcional", d: "Você paga pelo projeto. Sustentação só se fizer sentido para você." },
];

export function SpecSheet({ id = "ficha" }: { id?: string }) {
  return (
    <section id={id} className="section">
      <div className="shell">
        <SectionHead title="Ficha técnica da contratação">O que você pode exigir de nós em qualquer projeto.</SectionHead>
        <dl className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {SPECS.map((s) => (
            <div key={s.k} className="border-b border-r border-border px-6 py-7">
              <dt className="kicker">{s.k}</dt>
              <dd className="m-0">
                <p className="mt-2.5 text-[clamp(1.375rem,2.2vw,1.875rem)] tracking-[-0.03em]">{s.v}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
