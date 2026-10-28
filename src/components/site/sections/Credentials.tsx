import { COMPANY } from "@/lib/site";
import { SectionHead } from "@/components/site/SectionHead";
import { RailHint } from "@/components/site/RailHint";

/** Tecnologias por frente, levantadas dos projetos entregues */
export const STACK: [string, string[]][] = [
  ["ia", ["OpenAI", "Anthropic", "Gemini", "ElevenLabs", "LangChain", "LangGraph", "pgvector", "Pinecone"]],
  ["integração", ["n8n", "WhatsApp (Evolution API)", "RCS", "SMS", "Webhooks", "Resend", "Inngest"]],
  ["backend", ["Python", "Node.js", "PHP", "Laravel"]],
  ["frontend", ["TypeScript", "React", "Next.js", "Vue", "Inertia", "TanStack", "Tailwind CSS"]],
  ["dados", ["PostgreSQL", "MySQL", "Supabase", "Redis"]],
  ["infra e testes", ["Cloudflare", "Vercel", "Docker", "Playwright", "Pest", "Vitest"]],
];

const PAD = "p-[clamp(1rem,3.2vh,1.75rem)]";

function Chips({ itens }: { itens: string[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {itens.map((t) => (
        <span key={t} className="chip">
          {t}
        </span>
      ))}
    </div>
  );
}

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
        <SectionHead as={headingAs} title="Credenciais" detailClassName="hide-short">
          Dados verificáveis da empresa e das tecnologias com que trabalhamos.
        </SectionHead>

        {/* Tablet e computador: empresa numa faixa de 4 colunas, stack em linhas na largura toda */}
        <div className="hidden gap-[clamp(0.75rem,2.4vh,1.5rem)] md:grid">
          <dl className="panel m-0 grid grid-cols-4 font-mono text-[0.8125rem]">
            {rows.map(([k, v]) => (
              <div key={k} className="min-w-0 border-r border-border px-5 py-[clamp(0.625rem,1.8vh,1.125rem)] last:border-r-0">
                <dt className="text-faint">{k}</dt>
                <dd className="m-0 mt-1 truncate">{v}</dd>
              </div>
            ))}
          </dl>
          <div className={`panel min-w-0 ${PAD}`}>
            <h3 className="kicker mb-[clamp(0.5rem,1.4vh,0.875rem)]">stack</h3>
            <dl className="m-0 grid">
              {STACK.map(([grupo, itens]) => (
                <div
                  key={grupo}
                  className="grid grid-cols-[8.5rem_1fr] items-start gap-3 border-t border-border py-[clamp(0.35rem,1.1vh,0.625rem)]"
                >
                  <dt className="pt-1 font-mono text-[0.8125rem] text-faint">{grupo}</dt>
                  <dd className="m-0">
                    <Chips itens={itens} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Celular: empresa e cada frente da stack como cartões da faixa deslizante */}
        <div tabIndex={0} aria-label="Credenciais" className="rail grid gap-4 md:hidden">
          <div className={`panel min-w-0 ${PAD}`}>
            <h3 className="mb-3 text-xl">Empresa</h3>
            <dl className="m-0 grid font-mono text-[0.8125rem]">
              {rows.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-t border-border py-2.5">
                  <dt className="text-faint">{k}</dt>
                  <dd className="m-0 text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          {STACK.map(([grupo, itens]) => (
            <div key={grupo} className={`panel min-w-0 ${PAD}`}>
              <p className="kicker">stack</p>
              <h3 className="mb-3 mt-1 text-xl">{grupo}</h3>
              <Chips itens={itens} />
            </div>
          ))}
        </div>
        <RailHint />
      </div>
    </section>
  );
}
