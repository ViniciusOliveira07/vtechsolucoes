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
  oQueE: {
    title: "O que é integração de sistemas (system integration)",
    paragrafos: [
      "Integração de sistemas — também conhecida como system integration, integração de APIs, middleware empresarial ou EAI (Enterprise Application Integration) — é o trabalho de fazer dois ou mais softwares conversarem automaticamente, trocando dados sem intervenção humana. É o que elimina a digitação dupla entre e-commerce e ERP, sincroniza CRM com plataforma de marketing, conecta gateway de pagamento ao financeiro e faz o WhatsApp Business virar canal oficial dentro do seu sistema interno.",
      "As técnicas mais usadas são integração via API REST/GraphQL, webhooks (notificações reativas), filas e mensageria (SQS, RabbitMQ, PgBoss), ETL/CDC para sincronização de bancos, iPaaS (Zapier, Make, n8n) para casos simples e middleware sob medida quando o cenário exige idempotência, retry exponencial, dead-letter queue e dashboard de eventos. A escolha depende de volume, criticidade e SLA exigidos pelo negócio.",
      "Integrações bem feitas têm três pilares: confiabilidade (nada se perde, nada duplica), observabilidade (você vê tudo que rodou e o que falhou) e manutenibilidade (quando a API do parceiro muda, você descobre antes do cliente reclamar). É um serviço que parece invisível quando funciona — e custa caro quando quebra silenciosamente por dias.",
    ],
    sinonimos: [
      "integração de APIs",
      "integração de ERP",
      "integração de CRM",
      "system integration",
      "middleware empresarial",
      "EAI Enterprise Application Integration",
      "iPaaS sob medida",
      "integração via webhook",
      "automação entre sistemas",
      "conector ERP",
      "integração Bling Omie Tiny",
      "integração TOTVS SAP",
    ],
  },
  paraQuem: [
    { perfil: "E-commerces multicanal", descricao: "Lojas que vendem em Mercado Livre, Shopee, Amazon e site próprio e perdem pedido na sincronização de estoque." },
    { perfil: "Empresas com múltiplos ERPs / sistemas legados", descricao: "Pós-fusão ou crescimento por aquisição: cada filial usa um sistema, e o consolidado vive na planilha." },
    { perfil: "Operações com cobrança e recorrência", descricao: "Quem precisa conciliar gateway, asaas, banco e financeiro sem perder transação ou duplicar lançamento." },
    { perfil: "Indústrias e logística", descricao: "Apontamento de chão de fábrica, WMS, TMS e ERP corporativo precisando de orquestração confiável." },
    { perfil: "SaaS B2B precisando integrar com clientes", descricao: "Sua plataforma precisa receber dados via API, planilha, FTP ou webhook do ERP do cliente final." },
    { perfil: "Empresas com WhatsApp como canal oficial", descricao: "Integração com WhatsApp Business API, roteamento de atendimento e gravação no CRM." },
  ],
  casosDeUso: [
    { title: "Integração e-commerce ↔ Bling/Omie/Tiny", desc: "Sincronização de produto, estoque, pedido e nota fiscal bidirecional, com tratamento de SKU diferente entre sistemas." },
    { title: "Conciliação de pagamento Stripe/Asaas/Mercado Pago", desc: "Webhook validado, baixa automática no ERP, alerta de falha e relatório diário de divergências." },
    { title: "Integração Salesforce/HubSpot ↔ ERP interno", desc: "Conta e oportunidade no CRM viram cliente e pedido no ERP, com status sincronizado em tempo real." },
    { title: "Conector WhatsApp Business API", desc: "Recebimento de mensagem, roteamento por menu, integração com sistema de tickets e gravação de histórico." },
    { title: "Sincronização de catálogo entre marketplaces", desc: "Update de preço e estoque em Mercado Livre, Amazon, Shopee e B2W disparado por mudança no ERP." },
    { title: "Migração de dados entre ERPs", desc: "ETL de cliente, produto, histórico de pedido e financeiro de sistema legado para novo ERP, com validação." },
  ],
  glossario: [
    { termo: "API REST", definicao: "Padrão de comunicação HTTP entre sistemas. A maioria das integrações modernas usa REST com JSON." },
    { termo: "Webhook", definicao: "Notificação HTTP que um sistema envia para outro quando algo acontece (pedido criado, pagamento aprovado)." },
    { termo: "iPaaS", definicao: "Integration Platform as a Service (Zapier, Make, n8n). Bom para casos simples; limita em volume e regra complexa." },
    { termo: "Middleware", definicao: "Camada intermediária que conecta sistemas heterogêneos, aplica regras e padroniza formato de dado." },
    { termo: "Idempotência", definicao: "Propriedade que garante: se a mesma operação rodar duas vezes, o resultado é o mesmo. Evita pedido duplicado." },
    { termo: "Dead-letter queue (DLQ)", definicao: "Fila onde caem eventos que falharam todas as tentativas, para inspeção manual e re-processamento." },
    { termo: "Retry exponencial / backoff", definicao: "Estratégia de re-tentar operação falha com intervalo crescente (1s, 2s, 4s, 8s) para não sobrecarregar o destino." },
    { termo: "ETL / CDC", definicao: "ETL (Extract-Transform-Load) move dado em lote. CDC (Change Data Capture) replica mudanças em tempo real." },
    { termo: "OAuth 2.0", definicao: "Padrão de autenticação para APIs de terceiros (Google, Meta, HubSpot). Usa token em vez de senha." },
  ],
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
