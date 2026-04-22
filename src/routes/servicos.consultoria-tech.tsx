import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Compass, Map, GitBranch, Users, ShieldCheck, TrendingUp } from "lucide-react";
import {
  ServicePageLayout,
  buildServiceSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
  type ServicePageData,
} from "@/components/site/ServicePageLayout";
import { Events } from "@/lib/analytics";

const SLUG = "consultoria-tech";
const URL = `https://vtechsolucoes.com.br/servicos/${SLUG}`;
const TITLE = "Consultoria de Tecnologia para Empresas | Vtech";
const DESCRIPTION =
  "Consultoria sênior em arquitetura, escolha de stack e roadmap técnico. Decisões certas antes de gastar R$100k em código.";

const data: ServicePageData = {
  slug: SLUG,
  eyebrow: "Consultoria tech",
  h1: "Consultoria de tecnologia que evita decisões caras de reverter.",
  subheadline:
    "Arquitetura, escolha de stack, roadmap técnico, due diligence e CTO as a service. Perspectiva sênior na hora certa.",
  trust: ["Engajamento por sprint", "Sem amarração longa", "Output em documento"],
  problemas: [
    { dor: "Vamos contratar fábrica X — é boa escolha?", solucao: "Avaliamos escopo, contrato, stack proposta e identificamos riscos antes de você assinar." },
    { dor: "Sistema legado ficou caro de manter", solucao: "Diagnóstico técnico com roadmap de modernização incremental, sem big-bang." },
    { dor: "Fundador técnico precisa de sparring sênior", solucao: "Sessões quinzenais de revisão de arquitetura, hiring técnico e priorização." },
    { dor: "Vamos investir / fazer M&A em uma startup", solucao: "Due diligence técnica: código, equipe, dívida técnica, escalabilidade real." },
  ],
  entregaveis: [
    { title: "Diagnóstico de arquitetura", desc: "Mapa atual, gargalos, riscos e plano de evolução priorizado.", icon: Map },
    { title: "Escolha de stack", desc: "Comparativo objetivo, custo total e adequação ao time atual.", icon: Compass },
    { title: "Roadmap técnico 12 meses", desc: "Iniciativas trimestrais com esforço, impacto e dependências.", icon: TrendingUp },
    { title: "Code review estratégico", desc: "Revisão de qualidade, segurança e arquitetura por sênior externo.", icon: GitBranch },
    { title: "Hiring técnico", desc: "Definição de perfil, JD, prova técnica e participação em entrevistas.", icon: Users },
    { title: "Due diligence técnica", desc: "Relatório executivo para investidores e M&A.", icon: ShieldCheck },
  ],
  stack: [
    { title: "Discovery estruturado", desc: "Entrevistas, leitura de código, análise de métricas." },
    { title: "Frameworks de decisão", desc: "ADRs, RFC, comparativos com critérios ponderados." },
    { title: "Métricas DORA", desc: "Lead time, frequência de deploy, MTTR como linha base." },
    { title: "Output documentado", desc: "Tudo em Notion/PDF — não se perde quando a sessão acaba." },
  ],
  processo: [
    { n: "01", title: "Briefing", desc: "Conversa de 1h para entender o problema e o contexto de decisão." },
    { n: "02", title: "Imersão", desc: "1 a 2 semanas analisando código, contratos, time e dados." },
    { n: "03", title: "Recomendação", desc: "Documento com diagnóstico, opções e recomendação justificada." },
    { n: "04", title: "Acompanhamento", desc: "Sessões quinzenais opcionais durante a execução." },
  ],
  faq: [
    { q: "Qual o engajamento mínimo?", a: "Diagnóstico pontual a partir de 2 semanas. Acompanhamento contínuo a partir de 4h/mês." },
    { q: "Vocês implementam o que recomendam?", a: "Sim, mas não é obrigatório. Você pode contratar outro fornecedor para executar — entregamos o roadmap independente." },
    { q: "Atendem M&A e fundos de investimento?", a: "Sim. Fazemos due diligence técnica para investimento seed até late-stage e operações de M&A." },
    { q: "Vocês assinam NDA?", a: "Sempre. Templates próprios ou os seus. Confidencialidade é pré-requisito." },
    { q: "Conflito de interesse: vocês recomendam vocês mesmos?", a: "Não. A recomendação é independente. Quando faz sentido, sugerimos parceiros ou execução interna do cliente." },
  ],
  relacionados: [
    { slug: "sistemas-web", title: "Sistemas web sob medida", href: "/servicos/sistemas-web", desc: "Quando a recomendação é construir, executamos com squad sênior." },
    { slug: "integracoes", title: "Integrações", href: "/servicos/integracoes", desc: "Modernização do legado começa pela camada de integração." },
    { slug: "automacoes-com-ia", title: "Automações com IA", href: "/servicos/automacoes-com-ia", desc: "Estratégia de IA empresarial com ROI mensurável." },
  ],
  ctaFinalTitle: "Pronto para tomar a próxima decisão técnica com clareza",
};

export const Route = createFileRoute("/servicos/consultoria-tech")({
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
      { type: "application/ld+json", children: JSON.stringify(buildServiceSchema({ name: "Consultoria de Tecnologia", description: DESCRIPTION, url: URL, serviceType: "Technology Consulting" })) },
      { type: "application/ld+json", children: JSON.stringify(buildFAQSchema(data.faq)) },
      { type: "application/ld+json", children: JSON.stringify(buildBreadcrumbSchema("Consultoria Tech", SLUG)) },
    ],
  }),
  component: Page,
});

function Page() {
  useEffect(() => { Events.servicePageView(SLUG); }, []);
  return <ServicePageLayout data={data} />;
}
