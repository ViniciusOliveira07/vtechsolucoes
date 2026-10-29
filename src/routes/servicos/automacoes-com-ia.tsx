import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Bot, Brain, MessageSquare, FileSearch, Zap, GitBranch } from "lucide-react";
import { ServicePageLayout, type ServicePageData } from "@/components/site/ServicePageLayout";
import { buildBreadcrumbSchema, buildServiceSchema } from "@/lib/service-schema";
import { Events } from "@/lib/analytics";
import { getService, jsonLd, localizedUrl, seo } from "@/lib/site";
import { pick, useT, type L } from "@/lib/i18n";

const SLUG = "automacoes-com-ia" as const;
const PATH = `/servicos/${SLUG}`;

// Título/descrição do head e nomes usados no JSON-LD (Service e Breadcrumb)
const HEAD: L<{ title: string; description: string; schemaName: string; crumb: string }> = {
  pt: {
    title: "Automação com IA para Empresas | Agentes e RAG | Vtech",
    description:
      "Automatize processos com agentes de IA, RAG e integração com seus dados. Reduza custo operacional em semanas, não meses.",
    schemaName: "Automações com IA",
    crumb: "Automações com IA",
  },
  en: {
    title: "AI Automation for Businesses | Agents and RAG | Vtech",
    description:
      "Automate processes with AI agents, RAG and integration with your data. Cut operating costs in weeks, not months.",
    schemaName: "AI automations",
    crumb: "AI automations",
  },
  es: {
    title: "Automatización con IA para Empresas | Agentes y RAG | Vtech",
    description:
      "Automatice procesos con agentes de IA, RAG e integración con sus datos. Reduzca el costo operativo en semanas, no en meses.",
    schemaName: "Automatizaciones con IA",
    crumb: "Automatizaciones con IA",
  },
};

const PT: ServicePageData = {
  slug: SLUG,
  eyebrow: getService(SLUG, "pt").title,
  h1: "Automação com IA: agentes que trabalham dentro da sua operação.",
  subheadline:
    "Implementamos agentes inteligentes e pipelines de IA generativa (RAG) que automatizam processos complexos, reduzem custos operacionais e potencializam a tomada de decisão corporativa.",
  trust: ["Privacidade e segurança de dados", "Integração total via API"],
  oQueE: {
    title: "O que é automação com IA generativa empresarial",
    paragrafos: [
      "A automação com Inteligência Artificial (IA) para empresas representa a evolução definitiva da produtividade corporativa. Diferente das automações tradicionais baseadas em regras rígidas, a IA generativa — utilizando modelos de linguagem de larga escala (LLMs) como GPT-4, Claude e Gemini — é capaz de compreender contexto, interpretar linguagem natural e executar tarefas cognitivas complexas. Na Vtech Soluções, transformamos essa tecnologia de ponta em ferramentas práticas para o dia a dia do mercado B2B.",
      "Um dos pilares das nossas soluções é o RAG (Retrieval-Augmented Generation), um pipeline que conecta a inteligência da IA à base de conhecimento específica da sua empresa. Isso significa que criamos sistemas que respondem perguntas, geram relatórios e analisam dados utilizando exclusivamente os manuais, contratos, históricos de atendimento e documentos internos da sua organização. O resultado é uma IA personalizada que não alucina e fornece informações precisas com citação direta de fontes, garantindo compliance e segurança.",
      "Além de responder dúvidas, desenvolvemos Agentes de IA capazes de agir. Através da técnica de 'function calling', nossos agentes podem interagir com seu ERP, CRM ou banco de dados para realizar tarefas como agendar reuniões, emitir segunda via de boletos, qualificar leads em tempo real ou processar pedidos de compra sem intervenção humana. É a transformação digital aplicada para liberar seu capital humano de tarefas repetitivas e burocráticas, permitindo que sua equipe foque em inovação e estratégia.",
      "A implementação de IA empresarial na Vtech Soluções segue rigorosos padrões de segurança de dados. Garantimos que suas informações confidenciais não sejam utilizadas para treinamento de modelos públicos, mantendo o isolamento total do seu ecossistema digital. Com o monitoramento contínuo de performance e custos (LLMOps), sua empresa tem controle total sobre o investimento e o retorno gerado pelas automações inteligentes.",
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
      title: "Desenvolvimento",
      desc: "Construímos a solução integrada aos seus sistemas e medimos a precisão com casos reais antes de liberar para a operação.",
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
    {
      slug: "consultoria-tech",
      title: "Consultoria Tech",
      href: "/servicos/consultoria-tech",
      desc: "Estratégia de IA antes de gastar em modelos.",
    },
  ],
  ctaFinalTitle: "Pronto para colocar IA pra trabalhar de verdade",
};

const EN: ServicePageData = {
  slug: SLUG,
  eyebrow: getService(SLUG, "en").title,
  h1: "AI automation: agents that work inside your operation.",
  subheadline:
    "We build intelligent agents and generative AI pipelines (RAG) that automate complex processes, lower operating costs and strengthen corporate decision-making.",
  trust: ["Data privacy and security", "Full integration via API"],
  oQueE: {
    title: "What enterprise generative AI automation is",
    paragrafos: [
      "AI automation for businesses is the next real step in corporate productivity. Unlike traditional automation built on rigid rules, generative AI, powered by large language models (LLMs) such as GPT-4, Claude and Gemini, can understand context, interpret natural language and carry out complex cognitive tasks. At Vtech Soluções, we turn this technology into practical tools for the day-to-day of B2B companies.",
      "One of the pillars of our solutions is RAG (Retrieval-Augmented Generation), a pipeline that connects the AI to your company's own knowledge base. In practice, we build systems that answer questions, generate reports and analyze data using only your organization's manuals, contracts, support history and internal documents. The result is a tailored AI that does not make things up and gives accurate answers with direct source citations, which supports compliance and security.",
      "Beyond answering questions, we build AI agents that can act. Using function calling, our agents interact with your ERP, CRM or database to schedule meetings, reissue invoices and payment slips, qualify leads in real time or process purchase orders without human intervention. This is digital transformation applied to free your people from repetitive, bureaucratic work so your team can focus on innovation and strategy.",
      "Enterprise AI at Vtech Soluções follows strict data security standards. We make sure your confidential information is not used to train public models, keeping your digital environment fully isolated. With continuous monitoring of performance and costs (LLMOps), your company keeps full control over the investment and the return generated by the automations.",
    ],
  },
  paraQuem: [
    {
      perfil: "Customer Service and Support",
      descricao:
        "Companies with a high volume of interactions that need fast problem resolution and smart ticket triage.",
    },
    {
      perfil: "Legal and Compliance Departments",
      descricao:
        "Organizations handling large volumes of contracts and documents that require semantic analysis and data extraction.",
    },
    {
      perfil: "Sales and Marketing Teams",
      descricao:
        "Teams looking for automatic lead qualification and personalized communication at scale for B2B prospecting.",
    },
    {
      perfil: "Logistics and Administrative Operations",
      descricao:
        "Businesses that need to automate the processing of orders, invoices and complex approval workflows.",
    },
  ],
  casosDeUso: [
    {
      title: "24/7 RAG Support Agent",
      desc: "A chatbot that resolves complex technical questions by checking the company's official documentation in real time.",
    },
    {
      title: "Automated Data Extraction (OCR + AI)",
      desc: "Smart reading of unstructured documents, turning images and PDFs into data ready for the ERP.",
    },
  ],
  glossario: [
    {
      termo: "LLM (Large Language Model)",
      definicao:
        "Artificial intelligence models trained on vast amounts of text to understand and generate human language.",
    },
    {
      termo: "Embeddings",
      definicao:
        "A numerical representation of the meaning of words or sentences, which lets the AI search by context and not only by exact terms.",
    },
  ],
  problemas: [
    {
      dor: "Overload of manual, repetitive tasks",
      solucao:
        "We build smart workflows that take over the digital grunt work, reducing errors and team fatigue.",
    },
    {
      dor: "Slow responses to customers and partners",
      solucao:
        "AI agents that respond instantly, so each lead is served at the moment of highest interest.",
    },
    {
      dor: "Difficulty analyzing large volumes of data",
      solucao:
        "AI systems that process and summarize complex information, giving leadership actionable insights in seconds.",
    },
    {
      dor: "Inconsistent brand communication",
      solucao:
        "AI models trained on your company's tone of voice and guidelines, keeping every channel consistent.",
    },
  ],
  entregaveis: [
    {
      title: "Chatbots and Conversational Agents",
      desc: "Smart interfaces for the web, WhatsApp and Slack, integrated with your internal systems.",
      icon: MessageSquare,
    },
    {
      title: "RAG Pipelines (Knowledge Base)",
      desc: "Vector search architecture so the AI learns from and answers about your specific data.",
      icon: FileSearch,
    },
    {
      title: "Function Calling Integration",
      desc: "The AI's ability to run commands on external APIs to carry out real business actions.",
      icon: Bot,
    },
    {
      title: "Document Extraction and Classification",
      desc: "AI that reads, understands and organizes files, contracts and invoices automatically.",
      icon: Brain,
    },
    {
      title: "Automated AI Workflows",
      desc: "Chaining multiple AI tasks to handle processes end to end.",
      icon: Zap,
    },
    {
      title: "Monitoring Infrastructure (LLMOps)",
      desc: "Dashboards to track answer accuracy, API costs and model performance.",
      icon: GitBranch,
    },
  ],
  stack: [
    { title: "OpenAI / Anthropic / Gemini", desc: "Access to the world's most advanced models through a secure API." },
    { title: "LangChain / LangGraph", desc: "Leading frameworks for orchestrating agents and AI workflows." },
    { title: "Pinecone / pgvector", desc: "Vector databases for high-performance semantic search." },
    { title: "Python / Node.js", desc: "Robust languages for the AI backend." },
  ],
  processo: [
    {
      n: "01",
      title: "Opportunity Mapping",
      desc: "We identify the processes where AI will deliver the highest immediate return on investment (ROI).",
    },
    {
      n: "02",
      title: "Development",
      desc: "We build the solution integrated with your systems and measure accuracy against real cases before releasing it to the operation.",
    },
    {
      n: "03",
      title: "Prompt and RAG Engineering",
      desc: "We refine the instructions and the knowledge base to deliver accurate, safe answers.",
    },
    {
      n: "04",
      title: "Integration and Scaling",
      desc: "We connect the AI to your production systems and monitor results at real scale.",
    },
  ],
  faq: [
    {
      q: "Will artificial intelligence replace my employees?",
      a: "The goal of AI automation is to extend human capacity, not replace it. It removes bureaucratic, repetitive tasks so your people can focus on work that calls for creativity, empathy and critical judgment.",
    },
    {
      q: "Will my company's data be used to train ChatGPT?",
      a: "No. At Vtech Soluções, we use enterprise APIs that contractually guarantee the data sent is not used to train global models. Your privacy is a technical priority for us.",
    },
    {
      q: "How do you measure the financial return (ROI) of an AI project?",
      a: "ROI is measured by fewer hours spent on manual tasks, faster responses to customers, fewer operational errors and the ability to scale service without immediate new hires.",
    },
    {
      q: "Can the AI give wrong information (hallucinations)?",
      a: "We use RAG (Retrieval-Augmented Generation) and strict guardrails to drastically reduce hallucinations. The AI is instructed to answer only based on the facts in your data.",
    },
    {
      q: "How much does it cost to keep an AI system running?",
      a: "Cost is usually based on usage (tokens). We project the operating cost during the diagnosis phase to make sure the solution is financially viable and sustainable for your company.",
    },
    {
      q: "Is it hard to integrate AI with legacy systems?",
      a: "Our team specializes in building technology bridges. If your current system has an API or an accessible database, we can connect it to the AI seamlessly.",
    },
  ],
  relacionados: [
    {
      slug: "sistemas-web",
      title: "Custom Web Systems",
      href: "/servicos/sistemas-web",
      desc: "Where your AI can get a full management and control interface.",
    },
    {
      slug: "integracoes",
      title: "Systems Integration",
      href: "/servicos/integracoes",
      desc: "Connect your AI to WhatsApp, CRM, ERP and other market tools.",
    },
    {
      slug: "consultoria-tech",
      title: "Tech Consulting",
      href: "/servicos/consultoria-tech",
      desc: "AI strategy before spending on models.",
    },
  ],
  ctaFinalTitle: "Ready to put AI to real work",
};

const ES: ServicePageData = {
  slug: SLUG,
  eyebrow: getService(SLUG, "es").title,
  h1: "Automatización con IA: agentes que trabajan dentro de su operación.",
  subheadline:
    "Implementamos agentes inteligentes y pipelines de IA generativa (RAG) que automatizan procesos complejos, reducen costos operativos y potencian la toma de decisiones corporativas.",
  trust: ["Privacidad y seguridad de datos", "Integración total vía API"],
  oQueE: {
    title: "Qué es la automatización empresarial con IA generativa",
    paragrafos: [
      "La automatización con inteligencia artificial (IA) para empresas representa la evolución definitiva de la productividad corporativa. A diferencia de las automatizaciones tradicionales basadas en reglas rígidas, la IA generativa, que utiliza modelos de lenguaje de gran escala (LLMs) como GPT-4, Claude y Gemini, es capaz de comprender contexto, interpretar lenguaje natural y ejecutar tareas cognitivas complejas. En Vtech Soluções, transformamos esta tecnología de punta en herramientas prácticas para el día a día del mercado B2B.",
      "Uno de los pilares de nuestras soluciones es el RAG (Retrieval-Augmented Generation), un pipeline que conecta la inteligencia de la IA con la base de conocimiento específica de su empresa. Esto significa que creamos sistemas que responden preguntas, generan informes y analizan datos utilizando exclusivamente los manuales, contratos, historiales de atención y documentos internos de su organización. El resultado es una IA personalizada que no alucina y entrega información precisa con cita directa de las fuentes, garantizando compliance y seguridad.",
      "Además de responder dudas, desarrollamos agentes de IA capaces de actuar. Mediante la técnica de 'function calling', nuestros agentes pueden interactuar con su ERP, CRM o base de datos para realizar tareas como agendar reuniones, emitir segundas vías de boletas de pago, calificar leads en tiempo real o procesar órdenes de compra sin intervención humana. Es la transformación digital aplicada para liberar a su equipo de tareas repetitivas y burocráticas, permitiéndole enfocarse en innovación y estrategia.",
      "La implementación de IA empresarial en Vtech Soluções sigue rigurosos estándares de seguridad de datos. Garantizamos que su información confidencial no se utilice para entrenar modelos públicos, manteniendo el aislamiento total de su ecosistema digital. Con el monitoreo continuo de desempeño y costos (LLMOps), su empresa tiene control total sobre la inversión y el retorno que generan las automatizaciones inteligentes.",
    ],
  },
  paraQuem: [
    {
      perfil: "Áreas de Atención al Cliente y Soporte",
      descricao:
        "Empresas con alto volumen de interacciones que necesitan resolver problemas con rapidez y clasificar tickets de forma inteligente.",
    },
    {
      perfil: "Departamentos Legales y de Compliance",
      descricao:
        "Organizaciones que manejan grandes volúmenes de contratos y documentos que exigen análisis semántico y extracción de datos.",
    },
    {
      perfil: "Equipos Comerciales y de Marketing",
      descricao:
        "Equipos que buscan calificación automática de leads y comunicación personalizada a escala para la prospección B2B.",
    },
    {
      perfil: "Operaciones Logísticas y Administrativas",
      descricao:
        "Negocios que necesitan automatizar el procesamiento de pedidos, facturas y flujos de aprobación complejos.",
    },
  ],
  casosDeUso: [
    {
      title: "Agente de Atención RAG 24/7",
      desc: "Chatbot que resuelve dudas técnicas complejas consultando la documentación oficial de la empresa en tiempo real.",
    },
    {
      title: "Automatización de Extracción de Datos (OCR + IA)",
      desc: "Lectura inteligente de documentos no estructurados, que transforma imágenes y PDFs en datos listos para el ERP.",
    },
  ],
  glossario: [
    {
      termo: "LLM (Large Language Model)",
      definicao:
        "Modelos de inteligencia artificial entrenados con grandes cantidades de texto para comprender y generar lenguaje humano.",
    },
    {
      termo: "Embeddings",
      definicao:
        "Representación numérica del significado de palabras o frases, que permite a la IA buscar por contexto y no solo por términos exactos.",
    },
  ],
  problemas: [
    {
      dor: "Sobrecarga de tareas manuales y repetitivas",
      solucao:
        "Implementamos flujos de trabajo inteligentes que ejecutan el 'trabajo pesado' digital, reduciendo errores y el desgaste del equipo.",
    },
    {
      dor: "Lentitud para responder a clientes y socios",
      solucao:
        "Agentes de IA que responden al instante, garantizando que el lead sea atendido en el momento de mayor interés.",
    },
    {
      dor: "Dificultad para analizar grandes volúmenes de datos",
      solucao:
        "Sistemas de IA que procesan y resumen información compleja, entregando a la dirección insights accionables en segundos.",
    },
    {
      dor: "Inconsistencia en la comunicación de la marca",
      solucao:
        "Modelos de IA entrenados con el tono de voz y las directrices de su empresa, garantizando uniformidad en todos los canales.",
    },
  ],
  entregaveis: [
    {
      title: "Chatbots y Agentes Conversacionales",
      desc: "Interfaces inteligentes para web, WhatsApp y Slack integradas a sus sistemas internos.",
      icon: MessageSquare,
    },
    {
      title: "Pipelines RAG (Base de Conocimiento)",
      desc: "Arquitectura de búsqueda vectorial para que la IA aprenda y responda sobre sus datos específicos.",
      icon: FileSearch,
    },
    {
      title: "Integración vía Function Calling",
      desc: "Capacidad de la IA para ejecutar comandos en APIs externas y realizar acciones reales de negocio.",
      icon: Bot,
    },
    {
      title: "Extracción y Clasificación de Documentos",
      desc: "Uso de IA para leer, entender y organizar archivos, contratos y facturas automáticamente.",
      icon: Brain,
    },
    {
      title: "Workflows de IA Automatizados",
      desc: "Encadenamiento de múltiples tareas de IA para resolver procesos de punta a punta.",
      icon: Zap,
    },
    {
      title: "Infraestructura de Monitoreo (LLMOps)",
      desc: "Paneles para seguir la precisión de las respuestas, los costos de API y el desempeño de los modelos.",
      icon: GitBranch,
    },
  ],
  stack: [
    { title: "OpenAI / Anthropic / Gemini", desc: "Acceso a los modelos más avanzados del mundo mediante una API segura." },
    { title: "LangChain / LangGraph", desc: "Frameworks líderes para orquestar agentes y flujos de IA." },
    { title: "Pinecone / pgvector", desc: "Bases de datos vectoriales para búsqueda semántica de alto desempeño." },
    { title: "Python / Node.js", desc: "Lenguajes robustos para el backend de inteligencia artificial." },
  ],
  processo: [
    {
      n: "01",
      title: "Mapeo de Oportunidades",
      desc: "Identificamos los procesos donde la IA traerá el mayor retorno sobre la inversión (ROI) inmediato.",
    },
    {
      n: "02",
      title: "Desarrollo",
      desc: "Construimos la solución integrada a sus sistemas y medimos la precisión con casos reales antes de liberarla a la operación.",
    },
    {
      n: "03",
      title: "Ingeniería de Prompt y RAG",
      desc: "Refinamos las instrucciones y la base de conocimiento para garantizar respuestas precisas y seguras.",
    },
    {
      n: "04",
      title: "Integración y Escalamiento",
      desc: "Conectamos la IA a sus sistemas de producción y monitoreamos los resultados a escala real.",
    },
  ],
  faq: [
    {
      q: "¿La inteligencia artificial va a reemplazar a mis empleados?",
      a: "El objetivo de la automatización con IA es ampliar la capacidad humana, no reemplazarla. Elimina las tareas burocráticas y repetitivas para que su talento se enfoque en actividades que exigen creatividad, empatía y juicio crítico.",
    },
    {
      q: "¿Los datos de mi empresa se usarán para entrenar ChatGPT?",
      a: "No. En Vtech Soluções utilizamos APIs empresariales que garantizan por contrato que los datos enviados no se usen para entrenar modelos globales. Su privacidad es nuestra prioridad técnica.",
    },
    {
      q: "¿Cómo se mide el retorno financiero (ROI) de un proyecto de IA?",
      a: "El ROI se mide por la reducción de horas dedicadas a tareas manuales, el aumento en la velocidad de respuesta al cliente, la reducción de errores operativos y la escalabilidad de la atención sin necesidad de nuevas contrataciones inmediatas.",
    },
    {
      q: "¿La IA puede entregar información errónea (alucinaciones)?",
      a: "Utilizamos la técnica RAG (Retrieval-Augmented Generation) y guardrails estrictos para minimizar drásticamente las alucinaciones. La IA está instruida para responder solo con base en los hechos de su base de datos.",
    },
    {
      q: "¿Cuánto cuesta mantener un sistema de IA en funcionamiento?",
      a: "El costo generalmente se basa en el consumo (tokens). Proyectamos el costo operativo durante la fase de diagnóstico para garantizar que la solución sea financieramente viable y sostenible para su empresa.",
    },
    {
      q: "¿Es difícil integrar IA con sistemas legados (antiguos)?",
      a: "Nuestro equipo se especializa en crear 'puentes' tecnológicos. Si su sistema actual tiene una API o una base de datos accesible, podemos integrarlo a la inteligencia artificial de forma transparente.",
    },
  ],
  relacionados: [
    {
      slug: "sistemas-web",
      title: "Sistemas Web Personalizados",
      href: "/servicos/sistemas-web",
      desc: "Donde su IA puede tener una interfaz completa de gestión y control.",
    },
    {
      slug: "integracoes",
      title: "Integración de Sistemas",
      href: "/servicos/integracoes",
      desc: "Conecte su IA a WhatsApp, CRM, ERP y otras herramientas del mercado.",
    },
    {
      slug: "consultoria-tech",
      title: "Consultoría Tech",
      href: "/servicos/consultoria-tech",
      desc: "Estrategia de IA antes de invertir en modelos.",
    },
  ],
  ctaFinalTitle: "¿Listo para poner la IA a trabajar de verdad",
};

const DATA: L<ServicePageData> = { pt: PT, en: EN, es: ES };

export const Route = createFileRoute("/servicos/automacoes-com-ia")({
  head: ({ match }) => {
    const locale = match.context.locale;
    const h = pick(HEAD, locale);
    return {
      ...seo({ title: h.title, description: h.description, path: PATH, locale }),
      scripts: [
        jsonLd(
          buildServiceSchema({
            name: h.schemaName,
            description: h.description,
            url: localizedUrl(PATH, locale),
            serviceType: "AI Automation Consulting",
            locale,
          }),
        ),
        jsonLd(buildBreadcrumbSchema(h.crumb, SLUG, locale)),
      ],
    };
  },
  component: Page,
});

function Page() {
  const data = useT(DATA);
  useEffect(() => { Events.servicePageView(SLUG); }, []);
  return <ServicePageLayout data={data} />;
}
