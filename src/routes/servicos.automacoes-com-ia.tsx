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
  "Automatize processos com agentes de IA, RAG e integração com seus dados. Reduza custo operacional em semanas, não meses."const data: ServicePageData = {
  slug: SLUG,
  eyebrow: "Automações com IA",
  h1: "Automação com Inteligência Artificial para Empresas: Inovação e Eficiência B2B.",
  subheadline:
    "Implementamos agentes inteligentes e pipelines de IA generativa (RAG) que automatizam processos complexos, reduzem custos operacionais e potencializam a tomada de decisão corporativa.",
  trust: ["Prova de Conceito (POC) em 15 dias", "Privacidade e segurança de dados", "Integração total via API"],
  oQueE: {
    title: "O que é automação com IA generativa empresarial",
    paragrafos: [
      "A automação com Inteligência Artificial (IA) para empresas representa a evolução definitiva da produtividade corporativa. Diferente das automações tradicionais baseadas em regras rígidas, a IA generativa — utilizando modelos de linguagem de larga escala (LLMs) como GPT-4, Claude e Gemini — é capaz de compreender contexto, interpretar linguagem natural e executar tarefas cognitivas complexas. Na Vtech Soluções, transformamos essa tecnologia de ponta em ferramentas práticas para o dia a dia do mercado B2B.",
      "Um dos pilares das nossas soluções é o RAG (Retrieval-Augmented Generation), um pipeline que conecta a inteligência da IA à base de conhecimento específica da sua empresa. Isso significa que criamos sistemas que respondem perguntas, geram relatórios e analisam dados utilizando exclusivamente os manuais, contratos, históricos de atendimento e documentos internos da sua organização. O resultado é uma IA personalizada que não alucina e fornece informações precisas com citação direta de fontes, garantindo compliance e segurança.",
      "Além de responder dúvidas, desenvolvemos Agentes de IA capazes de agir. Através da técnica de 'function calling', nossos agentes podem interagir com seu ERP, CRM ou banco de dados para realizar tarefas como agendar reuniões, emitir segunda via de boletos, qualificar leads em tempo real ou processar pedidos de compra sem intervenção humana. É a transformação digital aplicada para liberar seu capital humano de tarefas repetitivas e burocráticas, permitindo que sua equipe foque em inovação e estratégia.",
      "A implementação de IA empresarial na Vtech Soluções segue rigorosos padrões de segurança de dados. Garantimos que suas informações confidenciais não sejam utilizadas para treinamento de modelos públicos, mantendo o isolamento total do seu ecossistema digital. Com o monitoramento contínuo de performance e custos (LLMOps), sua empresa tem controle total sobre o investimento e o retorno gerado pelas automações inteligentes.",
    ],
    sinonimos: [
      "consultoria em inteligência artificial B2B",
      "implementação de agentes de IA",
      "automação inteligente de processos",
      "soluções RAG customizadas",
      "IA generativa para negócios",
      "chatbots inteligentes com GPT",
      "agentes autônomos para empresas",
      "integração de IA em sistemas legados",
      "transformação digital com IA",
    ],
  },
  paraQuem: [
    {
      perfil: "Setores de Atendimento e Suporte",
      descricao:
        "Empresas com alto volume de interações que precisam de resolução rápida de problemas e triagem inteligente de tickets.",
    },
    {
      perfil: "Departamentos Jurídicos e Compliance",
      descricao:
        "Organizações que lidam com grandes volumes de contratos e documentos que exigem análise semântica e extração de dados.",
    },
    {
      perfil: "Equipes Comerciais e de Marketing",
      descricao:
        "Times que buscam qualificação automática de leads e personalização de comunicação em escala para prospecção B2B.",
    },
    {
      perfil: "Operações Logísticas e Administrativas",
      descricao:
        "Negócios que precisam automatizar o processamento de pedidos, notas fiscais e fluxos de aprovação complexos.",
    },
  ],
  casosDeUso: [
    {
      title: "Agente de Atendimento RAG 24/7",
      desc: "Implementação de chatbot que resolve dúvidas técnicas complexas consultando a documentação oficial da empresa em tempo real.",
    },
    {
      title: "Automação de Extração de Dados (OCR + IA)",
      desc: "Leitura inteligente de documentos não estruturados, transformando imagens e PDFs em dados prontos para o ERP.",
    },
  ],
  glossario: [
    {
      termo: "LLM (Large Language Model)",
      definicao:
        "Modelos de inteligência artificial treinados em vastas quantidades de texto para compreender e gerar linguagem humana.",
    },
    {
      termo: "Embeddings",
      definicao:
        "Representação numérica do significado de palavras ou frases, permitindo que a IA realize buscas por contexto e não apenas por termos exatos.",
    },
  ],
  problemas: [
    {
      dor: "Sobrecarga de tarefas manuais e repetitivas",
      solucao:
        "Implementamos fluxos de trabalho inteligentes que executam o 'trabalho braçal' digital, reduzindo erros e cansaço da equipe.",
    },
    {
      dor: "Lentidão na resposta a clientes e parceiros",
      solucao:
        "Agentes de IA que respondem instantaneamente, garantindo que o lead seja atendido no momento de maior interesse.",
    },
    {
      dor: "Dificuldade em analisar grandes volumes de dados",
      solucao:
        "Sistemas de IA que processam e resumem informações complexas, entregando insights acionáveis para a diretoria em segundos.",
    },
    {
      dor: "Inconsistência na comunicação da marca",
      solucao:
        "Modelos de IA treinados com o tom de voz e diretrizes da sua empresa, garantindo uniformidade em todos os canais.",
    },
  ],
  entregaveis: [
    {
      title: "Chatbots e Agentes Conversacionais",
      desc: "Interfaces inteligentes para Web, WhatsApp e Slack integradas aos seus sistemas internos.",
      icon: MessageSquare,
    },
    {
      title: "Pipelines RAG (Base de Conhecimento)",
      desc: "Arquitetura de busca vetorial para que a IA aprenda e responda sobre os seus dados específicos.",
      icon: FileSearch,
    },
    {
      title: "Integração via Function Calling",
      desc: "Capacidade da IA de executar comandos em APIs externas para realizar ações reais de negócio.",
      icon: Bot,
    },
    {
      title: "Extração e Classificação de Documentos",
      desc: "Uso de IA para ler, entender e organizar arquivos, contratos e notas fiscais automaticamente.",
      icon: Brain,
    },
    {
      title: "Workflows de IA Automatizados",
      desc: "Encadeamento de múltiplas tarefas de IA para resolver processos de ponta a ponta.",
      icon: Zap,
    },
    {
      title: "Infraestrutura de Monitoramento (LLMOps)",
      desc: "Painéis para acompanhar a precisão das respostas, custos de API e performance dos modelos.",
      icon: GitBranch,
    },
  ],
  stack: [
    { title: "OpenAI / Anthropic / Gemini", desc: "Acesso aos modelos mais avançados do mundo via API segura." },
    { title: "LangChain / LangGraph", desc: "Frameworks líderes para orquestração de agentes e fluxos de IA." },
    { title: "Pinecone / pgvector", desc: "Bancos de dados vetoriais para busca semântica de alta performance." },
    { title: "Python / Node.js", desc: "Linguagens robustas para backend de inteligência artificial." },
  ],
  processo: [
    {
      n: "01",
      title: "Mapeamento de Oportunidades",
      desc: "Identificamos os processos onde a IA trará o maior retorno sobre investimento (ROI) imediato.",
    },
    {
      n: "02",
      title: "Desenvolvimento de POC",
      desc: "Criamos uma versão funcional em ambiente controlado para validar a precisão e utilidade da solução.",
    },
    {
      n: "03",
      title: "Engenharia de Prompt e RAG",
      desc: "Refinamos as instruções e a base de conhecimento para garantir respostas perfeitas e seguras.",
    },
    {
      n: "04",
      title: "Integração e Escalonamento",
      desc: "Conectamos a IA aos seus sistemas de produção e monitoramos os resultados em escala real.",
    },
  ],
  faq: [
    {
      q: "A Inteligência Artificial vai substituir meus funcionários?",
      a: "O objetivo da automação com IA é aumentar a capacidade humana, não substituí-la. Ela remove as tarefas burocráticas e repetitivas, permitindo que seus talentos foquem em atividades que exigem criatividade, empatia e julgamento crítico.",
    },
    {
      q: "Meus dados de empresa serão usados para treinar o ChatGPT?",
      a: "Não. Na Vtech Soluções, utilizamos APIs empresariais que garantem por contrato que os dados enviados não sejam utilizados para treinamento de modelos globais. Sua privacidade é nossa prioridade técnica.",
    },
    {
      q: "Como medir o retorno financeiro (ROI) de um projeto de IA?",
      a: "O ROI é medido pela redução de horas gastas em tarefas manuais, aumento na velocidade de resposta ao cliente, redução de erros operacionais e escalabilidade do atendimento sem a necessidade de novas contratações imediatas.",
    },
    {
      q: "A IA pode fornecer informações erradas (alucinações)?",
      a: "Utilizamos a técnica de RAG (Retrieval-Augmented Generation) e guardrails rígidos para minimizar drasticamente as alucinações. A IA é instruída a responder apenas com base nos fatos fornecidos pela sua base de dados.",
    },
    {
      q: "Quanto custa manter um sistema de IA rodando?",
      a: "O custo geralmente é baseado no consumo (tokens). Projetamos o custo operacional durante a fase de diagnóstico para garantir que a solução seja financeiramente viável e sustentável para sua empresa.",
    },
    {
      q: "É difícil integrar IA com sistemas legados (antigos)?",
      a: "Nossa equipe é especialista em criar 'pontes' tecnológicas. Se o seu sistema atual possui uma API ou banco de dados acessível, podemos integrá-lo à inteligência artificial de forma transparente.",
    },
  ],
  relacionados: [
    {
      slug: "sistemas-web",
      title: "Sistemas Web Personalizados",
      href: "/servicos/sistemas-web",
      desc: "Onde sua IA pode ganhar uma interface completa de gestão e controle.",
    },
    {
      slug: "integracoes",
      title: "Integrações de Sistemas",
      href: "/servicos/integracoes",
      desc: "Conecte sua IA ao WhatsApp, CRM, ERP e outras ferramentas de mercado.",
    },
  ],
  ctaFinalTitle: "Pronto para liderar seu mercado com inteligência artificial aplicada",
};tle: "Consultoria tech", href: "/servicos/consultoria-tech", desc: "Estratégia de IA antes de gastar em modelos." },
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
