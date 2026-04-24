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
  oQueE: {
    title: "O que é consultoria de tecnologia para empresas",
    paragrafos: [
      "Consultoria de tecnologia (também chamada de IT consulting, consultoria em TI, consultoria em desenvolvimento de software ou advisory técnico) é o serviço de trazer uma perspectiva sênior independente para decisões que vão custar caro de reverter: escolher stack, contratar fábrica de software, modernizar legado, definir arquitetura, fazer due diligence técnica para investimento ou M&A, montar roadmap tecnológico, hiring de líder técnico ou avaliar fornecedor.",
      "Diferente de uma consultoria de implementação (que executa), a consultoria estratégica entrega diagnóstico, análise comparativa, recomendação justificada e roadmap. Os formatos mais comuns são CTO as a Service (acompanhamento contínuo para fundadores não-técnicos), Fractional CTO (CTO fracionado dividido entre poucas empresas), assessment pontual de arquitetura, due diligence técnica para fundos e M&A, e mentoring sênior para times de engenharia.",
      "O valor está na economia: uma decisão técnica errada custa centenas de milhares em reescrita, atraso de roadmap e turnover de time. Uma boa consultoria custa uma fração disso e devolve clareza de decisão em semanas. É indicado quando você está prestes a investir alto em tecnologia, contratar líder técnico, modernizar sistema legado, fazer aquisição de empresa de tech ou simplesmente precisa de sparring sênior para validar caminho.",
    ],
    sinonimos: [
      "consultoria em TI",
      "IT consulting",
      "CTO as a Service",
      "Fractional CTO",
      "consultoria em desenvolvimento de software",
      "consultoria em arquitetura de software",
      "advisory técnico",
      "due diligence técnica",
      "assessment de tecnologia",
      "consultoria em transformação digital",
      "mentoria técnica para CTOs",
      "auditoria de software",
    ],
  },
  paraQuem: [
    { perfil: "Fundadores não-técnicos com SaaS", descricao: "Quem precisa de sparring sênior para validar decisão técnica do time, sem virar CTO de fato." },
    { perfil: "Empresas contratando fábrica de software", descricao: "Avaliação de proposta, contrato, escopo e stack antes de assinar — evita escolher fornecedor errado." },
    { perfil: "Fundos de investimento e M&A", descricao: "Due diligence técnica em rodadas seed, series A/B/C ou aquisição: código, time, dívida, escalabilidade." },
    { perfil: "Empresas com sistema legado caro", descricao: "Diagnóstico com roadmap incremental de modernização, sem rewrite suicida do tudo-de-uma-vez." },
    { perfil: "CTOs e líderes de engenharia", descricao: "Code review estratégico, escolha de stack para novo produto, organização de time, métricas DORA." },
    { perfil: "Empresas em transformação digital", descricao: "Quem está saindo do mundo offline / planilha e precisa de roadmap tecnológico de 12-24 meses." },
  ],
  casosDeUso: [
    { title: "Due diligence técnica pré-investimento", desc: "Análise de código, arquitetura, dívida técnica, equipe e escalabilidade. Relatório executivo para o investidor." },
    { title: "CTO as a Service para startup early-stage", desc: "4 a 16 horas/mês para apoiar fundador não-técnico em hiring, escolha de stack, priorização e revisão de PRs." },
    { title: "Assessment de arquitetura para escala", desc: "Diagnóstico de gargalos antes de escalar 10x: banco, cache, fila, observabilidade, custo de infra." },
    { title: "Avaliação de fornecedor de software", desc: "Análise de proposta comercial, contrato, escopo, stack proposta e capacidade de entrega da fábrica." },
    { title: "Roadmap de modernização de legado", desc: "Plano incremental para sair de sistema legado (PHP/Cobol/Delphi) sem parar a operação durante a transição." },
    { title: "Consultoria de adoção de IA generativa", desc: "Estratégia para integrar LLMs no produto e operação com ROI claro, sem virar piloto eterno." },
  ],
  glossario: [
    { termo: "CTO as a Service", definicao: "CTO contratado por hora ou retainer mensal, sem vínculo CLT. Ideal para empresas que ainda não justificam um CTO full-time." },
    { termo: "Fractional CTO", definicao: "CTO que divide tempo entre poucas empresas (2 a 4), com profundidade de envolvimento maior que advisor tradicional." },
    { termo: "Due diligence técnica", definicao: "Auditoria completa antes de investimento ou M&A: código, equipe, processos, dívida, segurança, escalabilidade." },
    { termo: "ADR (Architecture Decision Record)", definicao: "Documento curto que registra uma decisão técnica importante, alternativas consideradas e justificativa." },
    { termo: "Métricas DORA", definicao: "Quatro métricas de elite (deploy frequency, lead time, MTTR, change failure rate) que medem maturidade de engenharia." },
    { termo: "Dívida técnica", definicao: "Custo futuro de manter código que foi feito rápido em vez de bem. Pode quebrar produto ou paralisar evolução." },
    { termo: "Stack", definicao: "Conjunto de tecnologias usadas (linguagem, framework, banco, infra). Decisão estratégica que dura anos." },
    { termo: "Roadmap técnico", definicao: "Planejamento trimestral/semestral de iniciativas técnicas com esforço, impacto e dependências mapeados." },
    { termo: "Tech debt audit", definicao: "Auditoria focada em identificar e priorizar dívida técnica para inclusão no roadmap de evolução." },
  ],
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
