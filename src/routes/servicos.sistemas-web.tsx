import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Laptop, Database, Lock, Workflow, BarChart3, Users } from "lucide-react";
import {
  ServicePageLayout,
  buildServiceSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
  type ServicePageData,
} from "@/components/site/ServicePageLayout";
import { Events } from "@/lib/analytics";

const SLUG = "sistemas-web";
const URL = `https://vtechsolucoes.com.br/servicos/${SLUG}`;
const TITLE = "Desenvolvimento de Sistemas Web sob Medida | Vtech";
const DESCRIPTION =
  "Sistemas web sob medida para operações B2B: ERPs internos, painéis, portais. Stack moderna, deploy contínuo, sem mensalidade refém.";

const data: ServicePageData = {
  slug: SLUG,
  eyebrow: "Sistemas web",
  h1: "Sistemas web sob medida para operações que não cabem em planilha.",
  subheadline:
    "Painéis internos, ERPs leves, portais de cliente e SaaS B2B. Construímos com stack moderna, autenticação robusta e deploy contínuo desde o dia um.",
  trust: ["MVP em 6 a 12 semanas", "Código é seu", "Auth e RLS prontos"],
  problemas: [
    { dor: "Operação travada em planilhas e processos manuais", solucao: "Modelamos os fluxos críticos e entregamos um sistema com regras de negócio explícitas, auditáveis e rápidas." },
    { dor: "Ferramenta no-code virou um Frankenstein caro", solucao: "Migramos para um sistema próprio com a mesma agilidade do no-code e nenhum dos seus tetos." },
    { dor: "Time de TI sobrecarregado, sem capacity para sob medida", solucao: "Atuamos como squad externo sênior, entregando releases semanais com PR review compartilhado." },
    { dor: "Medo de perder dados ou virar refém de fornecedor", solucao: "Banco de dados na sua conta, código no seu repositório, deploy na sua infra. Sempre." },
  ],
  entregaveis: [
    { title: "Painel administrativo completo", desc: "CRUDs, filtros, busca, paginação e exportação CSV.", icon: Laptop },
    { title: "Autenticação e permissões", desc: "Login, MFA, papéis (RBAC) e Row Level Security no banco.", icon: Lock },
    { title: "Banco de dados modelado", desc: "PostgreSQL com migrações versionadas e backup automático.", icon: Database },
    { title: "Workflows e automações", desc: "Cron jobs, webhooks e filas para tarefas assíncronas.", icon: Workflow },
    { title: "Dashboards e relatórios", desc: "Métricas-chave da operação em tempo real, exportáveis.", icon: BarChart3 },
    { title: "Portal multi-usuário", desc: "Times, convites, billing por organização quando necessário.", icon: Users },
  ],
  stack: [
    { title: "React 19 + TanStack", desc: "SSR, type-safety end-to-end, roteamento file-based." },
    { title: "PostgreSQL + RLS", desc: "Segurança no banco, não só na aplicação." },
    { title: "Edge functions", desc: "Lógica server-side próxima do usuário, baixa latência." },
    { title: "CI/CD contínuo", desc: "Deploy a cada PR. Preview environments para validação." },
  ],
  processo: [
    { n: "01", title: "Discovery técnico", desc: "Mapeamos fluxos, papéis, integrações e prioridades." },
    { n: "02", title: "MVP em sprints", desc: "Entregas semanais navegáveis. Feedback contínuo." },
    { n: "03", title: "Hardening", desc: "Testes, monitoring, observabilidade e documentação." },
    { n: "04", title: "Handoff & evolução", desc: "Treinamento da equipe ou contrato de evolução mensal." },
  ],
  faq: [
    { q: "Vocês fazem ERPs completos ou só sistemas pequenos?", a: "Fazemos ambos. Para escopo grande dividimos em módulos com releases frequentes em vez de big bang." },
    { q: "Posso ter login com Google e SSO corporativo?", a: "Sim. Suportamos OAuth (Google, Microsoft, Apple) e SAML para SSO corporativo quando necessário." },
    { q: "E se eu precisar de app mobile depois?", a: "A API que construímos serve mobile. Encaminhamos parceiros de mobile ou expandimos para PWA, conforme o caso." },
    { q: "Como funciona a manutenção depois do lançamento?", a: "Oferecemos contrato mensal opcional ou sustentação por bolsa de horas. Você escolhe o nível de envolvimento." },
    { q: "Os dados ficam onde?", a: "Em infra que você controla — Lovable Cloud, Supabase ou AWS na sua conta. Migramos a qualquer momento sem custo de saída." },
  ],
  relacionados: [
    { slug: "integracoes", title: "Integrações", href: "/servicos/integracoes", desc: "Conecte o sistema novo aos ERPs, CRMs e gateways que você já usa." },
    { slug: "automacoes-com-ia", title: "Automações com IA", href: "/servicos/automacoes-com-ia", desc: "Adicione agentes que automatizam tarefas dentro do sistema." },
    { slug: "consultoria-tech", title: "Consultoria tech", href: "/servicos/consultoria-tech", desc: "Valide arquitetura e stack antes de começar a construir." },
  ],
  ctaFinalTitle: "Pronto para tirar a operação da planilha",
};

export const Route = createFileRoute("/servicos/sistemas-web")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(buildServiceSchema({ name: "Desenvolvimento de Sistemas Web", description: DESCRIPTION, url: URL, serviceType: "Custom Software Development" })) },
      { type: "application/ld+json", children: JSON.stringify(buildFAQSchema(data.faq)) },
      { type: "application/ld+json", children: JSON.stringify(buildBreadcrumbSchema("Sistemas Web", SLUG)) },
    ],
  }),
  component: Page,
});

function Page() {
  useEffect(() => { Events.servicePageView(SLUG); }, []);
  return <ServicePageLayout data={data} />;
}
