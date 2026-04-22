import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Blocks, Webhook, CreditCard, Boxes, RefreshCw, ShieldCheck } from "lucide-react";
import {
  ServicePageLayout,
  buildServiceSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
  type ServicePageData,
} from "@/components/site/ServicePageLayout";
import { Events } from "@/lib/analytics";

const SLUG = "integracoes";
const URL = `https://vtechsolucoes.com.br/servicos/${SLUG}`;
const TITLE = "Integrações de Sistemas, ERPs e APIs | Vtech Soluções";
const DESCRIPTION =
  "Integramos ERP, CRM, gateways de pagamento e APIs internas. Fim do retrabalho manual entre sistemas. Diagnóstico em 7 dias.";

const data: ServicePageData = {
  slug: SLUG,
  eyebrow: "Integrações",
  h1: "Integrações entre sistemas que finalmente conversam entre si.",
  subheadline:
    "ERPs, CRMs, gateways, APIs internas e webhooks. Acabe com a digitação dupla, planilhas intermediárias e dados desencontrados.",
  trust: ["Diagnóstico em 7 dias", "Idempotência garantida", "Logs auditáveis"],
  problemas: [
    { dor: "Pedido entra no e-commerce, alguém digita no ERP", solucao: "Integração bidirecional com retry, idempotência e dashboard de eventos." },
    { dor: "Cobrança quebra entre gateway e financeiro", solucao: "Webhook validado, conciliação automática e alerta proativo de falha." },
    { dor: "CRM e marketing têm bases divergentes", solucao: "Sincronização contínua com source of truth definido por campo." },
    { dor: "API antiga sem documentação", solucao: "Engenharia reversa, contrato OpenAPI gerado e camada de adapter estável por cima." },
  ],
  entregaveis: [
    { title: "Integração ERP ↔ aplicação", desc: "Bling, Omie, Tiny, TOTVS, SAP. Bidirecional, com mapping configurável.", icon: Blocks },
    { title: "Webhooks robustos", desc: "Assinatura validada, retry com backoff, dead-letter queue.", icon: Webhook },
    { title: "Gateways de pagamento", desc: "Stripe, Mercado Pago, Pagar.me, Asaas com conciliação automática.", icon: CreditCard },
    { title: "Middleware de orquestração", desc: "Camada que unifica APIs heterogêneas em contrato único.", icon: Boxes },
    { title: "Sincronização de dados", desc: "ETL/CDC entre bancos com latência baixa e consistência clara.", icon: RefreshCw },
    { title: "Monitoramento e alertas", desc: "Dashboard de saúde, falhas notificadas no Slack/e-mail em tempo real.", icon: ShieldCheck },
  ],
  stack: [
    { title: "Node.js / Edge runtime", desc: "Workers serverless para baixa latência e escala automática." },
    { title: "Filas (PgBoss / SQS)", desc: "Processamento assíncrono confiável com retry." },
    { title: "OpenAPI + Zod", desc: "Contratos tipados, validação rigorosa em runtime." },
    { title: "Observability completa", desc: "Logs estruturados, traces, métricas e alertas." },
  ],
  processo: [
    { n: "01", title: "Mapa de integração", desc: "Listamos sistemas, fluxos, eventos e pontos de falha atuais." },
    { n: "02", title: "Contrato de dados", desc: "Definimos source of truth, mapping de campos e regras de conflito." },
    { n: "03", title: "Build incremental", desc: "Uma integração por sprint, com migração faseada do legado." },
    { n: "04", title: "Operação", desc: "Monitoramento ativo, runbook e SLA de resposta a falhas." },
  ],
  faq: [
    { q: "Vocês integram com qualquer sistema?", a: "Sim, desde que ele exponha API, webhook, banco acessível ou arquivo. Sistemas totalmente fechados raramente — mas até esses contornamos com RPA quando preciso." },
    { q: "E se a API do parceiro cair?", a: "Construímos com retry exponencial, dead-letter queue e alerta. Nada se perde, nada duplica." },
    { q: "Posso ver o que rodou e o que falhou?", a: "Sim. Entregamos um dashboard de eventos com filtro por status, retry manual e re-processamento." },
    { q: "Quanto tempo leva integrar dois sistemas?", a: "Integrações simples: 1 a 2 semanas. Bidirecionais com regras complexas: 4 a 8 semanas." },
    { q: "Preciso trocar meu ERP?", a: "Quase nunca. A integração se adapta ao que você tem. Trocar ERP é decisão de negócio, não de integração." },
  ],
  relacionados: [
    { slug: "sistemas-web", title: "Sistemas web sob medida", href: "/servicos/sistemas-web", desc: "O sistema novo que precisa conversar com o ERP existente." },
    { slug: "automacoes-com-ia", title: "Automações com IA", href: "/servicos/automacoes-com-ia", desc: "IA dentro do fluxo de integração: classificação, extração, decisão." },
    { slug: "consultoria-tech", title: "Consultoria tech", href: "/servicos/consultoria-tech", desc: "Avalie se vale integrar, refatorar ou trocar." },
  ],
  ctaFinalTitle: "Pronto para acabar com o retrabalho entre sistemas",
};

export const Route = createFileRoute("/servicos/integracoes")({
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
      { type: "application/ld+json", children: JSON.stringify(buildServiceSchema({ name: "Integração de Sistemas", description: DESCRIPTION, url: URL, serviceType: "Systems Integration" })) },
      { type: "application/ld+json", children: JSON.stringify(buildFAQSchema(data.faq)) },
      { type: "application/ld+json", children: JSON.stringify(buildBreadcrumbSchema("Integrações", SLUG)) },
    ],
  }),
  component: Page,
});

function Page() {
  useEffect(() => { Events.servicePageView(SLUG); }, []);
  return <ServicePageLayout data={data} />;
}
