import { COMPANY } from "@/lib/site";
import { SectionHead } from "@/components/site/SectionHead";
import { RailHint } from "@/components/site/RailHint";
import { useT, type L } from "@/lib/i18n";

/** Tecnologias por frente, levantadas dos projetos entregues */
const STACK_ITEMS: string[][] = [
  ["OpenAI", "Anthropic", "Gemini", "ElevenLabs", "LangChain", "LangGraph", "pgvector", "Pinecone"],
  ["n8n", "WhatsApp (Evolution API)", "RCS", "SMS", "Webhooks", "Resend", "Inngest"],
  ["Python", "Node.js", "PHP", "Laravel"],
  ["TypeScript", "React", "Next.js", "Vue", "Inertia", "TanStack", "Tailwind CSS"],
  ["PostgreSQL", "MySQL", "Supabase", "Redis"],
  ["Cloudflare", "Vercel", "Docker", "Playwright", "Pest", "Vitest"],
];

/** Nome de cada frente, na mesma ordem de STACK_ITEMS */
const STACK_GROUPS: L<string[]> = {
  pt: ["ia", "integração", "backend", "frontend", "dados", "infra e testes"],
  en: ["ai", "integration", "backend", "frontend", "data", "infra & testing"],
  es: ["ia", "integración", "backend", "frontend", "datos", "infra y pruebas"],
};

export const STACK: L<[string, string[]][]> = {
  pt: STACK_GROUPS.pt.map((g, i) => [g, STACK_ITEMS[i]]),
  en: STACK_GROUPS.en.map((g, i) => [g, STACK_ITEMS[i]]),
  es: STACK_GROUPS.es.map((g, i) => [g, STACK_ITEMS[i]]),
};

const TEXT = {
  pt: {
    title: "Credenciais",
    detail: "Dados verificáveis da empresa e das tecnologias com que trabalhamos.",
    company: "Empresa",
    keys: { legal: "razao_social", cnpj: "cnpj", hq: "sede", clients: "atendimento" },
  },
  en: {
    title: "Credentials",
    detail: "Verifiable company details and the technologies we work with.",
    company: "Company",
    keys: { legal: "legal_name", cnpj: "cnpj", hq: "headquarters", clients: "clients" },
  },
  es: {
    title: "Credenciales",
    detail: "Datos verificables de la empresa y de las tecnologías con las que trabajamos.",
    company: "Empresa",
    keys: { legal: "razon_social", cnpj: "cnpj", hq: "sede", clients: "atencion" },
  },
};

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
  const t = useT(TEXT);
  const stack = useT(STACK);
  const rows = [
    [t.keys.legal, COMPANY.legalName],
    [t.keys.cnpj, COMPANY.cnpj],
    [t.keys.hq, `${COMPANY.city}, ${COMPANY.state}`],
    [t.keys.clients, "B2B"],
  ];
  return (
    <section id="credenciais" className="section">
      <div className="shell">
        <SectionHead as={headingAs} title={t.title} detailClassName="hide-short">
          {t.detail}
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
              {stack.map(([grupo, itens]) => (
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
        <div tabIndex={0} aria-label={t.title} className="rail grid gap-4 md:hidden">
          <div className={`panel min-w-0 ${PAD}`}>
            <h3 className="mb-3 text-xl">{t.company}</h3>
            <dl className="m-0 grid font-mono text-[0.8125rem]">
              {rows.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-t border-border py-2.5">
                  <dt className="text-faint">{k}</dt>
                  <dd className="m-0 text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          {stack.map(([grupo, itens]) => (
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
