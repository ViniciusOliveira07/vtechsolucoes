import type { L } from "@/lib/i18n";

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
