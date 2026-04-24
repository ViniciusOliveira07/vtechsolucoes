import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Bot, Brain, MessageSquare, FileSearch, Zap, GitBranch } from "lucide-react";
import {
  ServicePageLayout,
  buildServiceSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
  type ServicePageData,
} from "@/components/site/ServicePageLayout";
import { Events } from "@/lib/analytics";

const SLUG = "automacoes-com-ia";
const URL = `https://vtechsolucoes.com.br/servicos/${SLUG}`;
const TITLE = "Automação com IA para Empresas | Agentes e RAG | Vtech";
const DESCRIPTION =
  "Automatize processos com agentes de IA, RAG e integração com seus dados. Reduza custo operacional em semanas, não meses.";

const data: ServicePageData = {
  slug: SLUG,
  eyebrow: "Automações com IA",
  h1: "Automações com IA que substituem horas de trabalho repetitivo.",
  subheadline:
    "Agentes inteligentes, RAG sobre sua base de conhecimento e fluxos automatizados. Aplicações reais — não demo de LinkedIn.",
  trust: ["POC em 2 semanas", "ROI medido", "Privacidade preservada"],
  oQueE: {
    title: "O que é automação com IA generativa para empresas",
    paragrafos: [
      "Automação com IA é o uso de modelos de inteligência artificial generativa (LLMs como GPT-4o, Claude, Gemini, Llama) para executar tarefas que antes exigiam tempo humano: responder perguntas, classificar documentos, extrair dados, gerar conteúdo, atender clientes, triar leads, resumir reuniões. Diferente da automação tradicional baseada em regras (RPA, Zapier, Make), a IA generativa entende linguagem natural, contexto e nuance — o que permite automatizar tarefas antes consideradas exclusivamente humanas.",
      "Os formatos mais comuns em B2B são chatbots inteligentes, agentes de IA com function calling (capazes de executar ações em APIs internas), pipelines RAG (Retrieval-Augmented Generation) que respondem usando a base de conhecimento da empresa com citação de fontes, copilotos integrados a sistemas internos e workflows automatizados que combinam IA com lógica de negócio. Tudo com guardrails, logging, controle de custo e privacidade dos dados.",
      "Implementar IA bem feita exige mais que prompt engineering: envolve embeddings, vetorização (pgvector, Pinecone), orquestração (LangGraph), observabilidade (Langfuse), avaliação contínua e fallback para humano. O ROI vem de horas-time economizadas, ticket de suporte resolvido sem agente humano, lead qualificado automaticamente e processos batch que rodam em segundos em vez de horas.",
    ],
    sinonimos: [
      "automação com inteligência artificial",
      "agente de IA",
      "chatbot com IA",
      "IA generativa para empresas",
      "consultoria em IA empresarial",
      "RAG sob medida",
      "implementação de LLM",
      "automação inteligente B2B",
      "copiloto empresarial",
      "atendimento automatizado com IA",
      "GPT empresarial",
    ],
  },
  paraQuem: [
    { perfil: "Operações com alto volume de atendimento", descricao: "SAC, suporte técnico, pré-venda — onde o ticket repete e o time queima energia em pergunta básica." },
    { perfil: "Empresas com base de conhecimento densa", descricao: "Manuais, contratos, normas, procedimentos: ideal para RAG responder com citação de fonte." },
    { perfil: "Times comerciais B2B", descricao: "Qualificação de lead, enriquecimento de conta, pesquisa de prospect e geração de proposta." },
    { perfil: "Backoffice e operações repetitivas", descricao: "Triagem de currículo, conferência de nota, leitura de boleto, preenchimento de formulário." },
    { perfil: "Marketing e conteúdo", descricao: "Geração de copy, tradução, resumo de reunião, brief automatizado e personalização em escala." },
    { perfil: "Empresas regulamentadas (jurídico, saúde, financeiro)", descricao: "Casos onde precisão, citação de fonte e compliance importam — IA com guardrail estrito." },
  ],
  casosDeUso: [
    { title: "Chatbot RAG no site institucional", desc: "Responde dúvidas usando manuais, FAQ e documentação interna. Encaminha para humano quando não tem certeza." },
    { title: "Atendimento WhatsApp com IA", desc: "Bot que entende intenção, consulta pedido no ERP, envia segunda via, agenda visita técnica." },
    { title: "Triagem automática de currículos", desc: "Lê PDF, estrutura experiência, pontua aderência à vaga e justifica nota com trecho do CV." },
    { title: "Análise de contrato com IA", desc: "Extrai cláusulas-chave, sinaliza riscos, compara com template padrão e gera resumo executivo." },
    { title: "Resumo de reuniões com action items", desc: "Transcreve áudio, gera ata, identifica responsáveis, prazos e cria tarefas no Notion/Asana." },
    { title: "Agente comercial de qualificação", desc: "Conversa com lead inbound 24/7, faz BANT, agenda reunião com SDR e enriquece dados no CRM." },
  ],
  glossario: [
    { termo: "LLM (Large Language Model)", definicao: "Modelo de linguagem treinado em escala massiva, capaz de entender e gerar texto natural (GPT, Claude, Gemini, Llama)." },
    { termo: "RAG (Retrieval-Augmented Generation)", definicao: "Técnica que busca trechos relevantes da sua base de dados antes de gerar a resposta, reduzindo alucinação." },
    { termo: "Embeddings", definicao: "Representação numérica (vetor) de um texto, usada para busca semântica — encontra significado, não só palavra exata." },
    { termo: "Vector database / pgvector", definicao: "Banco que armazena e busca embeddings com performance. pgvector é a extensão para PostgreSQL." },
    { termo: "Function calling / tool use", definicao: "Capacidade do LLM de invocar funções externas (APIs, banco, cálculos) para executar ações, não só responder." },
    { termo: "Prompt engineering", definicao: "Arte e ciência de escrever instruções que guiam o modelo a produzir o resultado desejado com consistência." },
    { termo: "Guardrails", definicao: "Camadas de validação (input e output) que impedem o modelo de responder fora do escopo, vazar dado ou cometer erro grave." },
    { termo: "Fine-tuning", definicao: "Treinamento adicional do modelo com dados próprios para especializá-lo em um domínio. Geralmente RAG resolve antes." },
    { termo: "Token", definicao: "Unidade de processamento do LLM (≈ 0.75 palavra em inglês, menos em PT-BR). Custo e limite são medidos em tokens." },
  ],
  problemas: [
    { dor: "Time gasta horas respondendo as mesmas perguntas", solucao: "Construímos um agente RAG treinado na sua base que responde com precisão e cita a fonte." },
    { dor: "Atendimento ao cliente trava em horário de pico", solucao: "Chatbot com IA generativa que resolve 60–80% dos tickets antes do humano." },
    { dor: "Triagem manual de documentos, propostas, currículos", solucao: "Pipelines de extração estruturada com validação humana opcional no loop." },
    { dor: "Medo do custo da OpenAI explodir", solucao: "Arquitetura com cache, rate limit por usuário, fallback para modelos open-source e relatório de gasto." },
  ],
  entregaveis: [
    { title: "Agente RAG sobre seus dados", desc: "Indexação vetorial, retrieval contextual e citação de fontes.", icon: FileSearch },
    { title: "Chatbot multicanal", desc: "Web, WhatsApp Business API e widget no site, mesma base de conhecimento.", icon: MessageSquare },
    { title: "Agentes que executam ações", desc: "Function calling: criar tickets, agendar, consultar APIs internas.", icon: Bot },
    { title: "Pipelines de extração", desc: "Documentos viram dados estruturados auditáveis.", icon: Brain },
    { title: "Workflows automatizados", desc: "Eventos disparam encadeamentos de IA + lógica de negócio.", icon: Zap },
    { title: "Versionamento de prompts", desc: "Mudou o prompt? Roda regression tests antes de subir.", icon: GitBranch },
  ],
  stack: [
    { title: "OpenAI / Anthropic / Gemini", desc: "Modelo certo para cada tarefa, com fallback automático." },
    { title: "Embeddings + pgvector", desc: "RAG performático e barato no PostgreSQL." },
    { title: "LangGraph / orquestração", desc: "Agentes com memória, roteamento e tool use." },
    { title: "Observability LLM", desc: "Latência, custo por requisição e qualidade rastreados." },
  ],
  processo: [
    { n: "01", title: "Descoberta de uso", desc: "Identificamos onde IA gera ROI real, não cosmético." },
    { n: "02", title: "POC validado", desc: "Em 2 semanas você testa com dados reais e mede impacto." },
    { n: "03", title: "Produção", desc: "Hardening, guardrails, logs e integração com seus sistemas." },
    { n: "04", title: "Iteração", desc: "Acompanhamento de qualidade e custo, ajustes contínuos." },
  ],
  faq: [
    { q: "Meus dados ficam expostos para a OpenAI?", a: "Não. Usamos APIs com retenção zero ou modelos hospedados na sua infra quando o caso exige." },
    { q: "Quanto custa rodar o agente por mês?", a: "Variável por uso, mas projetamos custo unitário antes de subir. Tipicamente entre R$ 0,01 e R$ 0,10 por interação." },
    { q: "E se a IA responder errado?", a: "Construímos guardrails, validação por regras e fallback para humano. Tudo logado e auditável." },
    { q: "Vocês fazem fine-tuning de modelos?", a: "Sim quando faz sentido. Na maioria dos casos RAG + bom prompt resolve por uma fração do custo." },
    { q: "Funciona em português?", a: "Sim. Modelos atuais (GPT-4o, Claude, Gemini) entregam qualidade nativa em PT-BR." },
  ],
  relacionados: [
    { slug: "sistemas-web", title: "Sistemas web sob medida", href: "/servicos/sistemas-web", desc: "Onde o agente vive: dentro do seu painel ou portal." },
    { slug: "integracoes", title: "Integrações", href: "/servicos/integracoes", desc: "Conecte o agente ao ERP, CRM e WhatsApp Business." },
    { slug: "consultoria-tech", title: "Consultoria tech", href: "/servicos/consultoria-tech", desc: "Estratégia de IA antes de gastar em modelos." },
  ],
  ctaFinalTitle: "Pronto para colocar IA pra trabalhar de verdade",
};

export const Route = createFileRoute("/servicos/automacoes-com-ia")({
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
      { type: "application/ld+json", children: JSON.stringify(buildServiceSchema({ name: "Automações com IA", description: DESCRIPTION, url: URL, serviceType: "AI Automation Consulting" })) },
      { type: "application/ld+json", children: JSON.stringify(buildFAQSchema(data.faq)) },
      { type: "application/ld+json", children: JSON.stringify(buildBreadcrumbSchema("Automações com IA", SLUG)) },
    ],
  }),
  component: Page,
});

function Page() {
  useEffect(() => { Events.servicePageView(SLUG); }, []);
  return <ServicePageLayout data={data} />;
}
