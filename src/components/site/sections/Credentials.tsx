import { COMPANY } from "@/lib/site";
import { SectionHead } from "@/components/site/SectionHead";

export const STACK = ["OpenAI", "Anthropic", "Gemini", "LangChain", "LangGraph", "pgvector", "Pinecone", "Python", "Node.js"];

export function Credentials({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  const rows = [
    ["razao_social", COMPANY.legalName],
    ["cnpj", COMPANY.cnpj],
    ["sede", `${COMPANY.city}, ${COMPANY.state}`],
    ["atendimento", "B2B"],
  ];
  return (
    <section id="credenciais" className="section">
      <div className="shell">
        <SectionHead as={headingAs} title="Credenciais">
          Dados verificáveis da empresa e das tecnologias com que trabalhamos.
        </SectionHead>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="panel min-w-0 p-7">
            <h3 className="mb-4 text-xl">Empresa</h3>
            <dl className="grid font-mono text-[0.8125rem]">
              {rows.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-t border-border py-2.5">
                  <dt className="text-faint">{k}</dt>
                  <dd className="m-0 text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="panel min-w-0 p-7">
            <h3 className="mb-4 text-xl">Stack</h3>
            <ul className="flex flex-wrap gap-1.5">
              {STACK.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
