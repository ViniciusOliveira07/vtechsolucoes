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
import { getService, jsonLd, localizedUrl, seo } from "@/lib/site";
import { pick, useT, type L } from "@/lib/i18n";

const SLUG = "consultoria-tech" as const;
const PATH = `/servicos/${SLUG}`;

// Título/descrição do head e nomes usados no JSON-LD (Service e Breadcrumb)
const HEAD: L<{ title: string; description: string; schemaName: string; crumb: string }> = {
  pt: {
    title: "Consultoria de Tecnologia para Empresas | Vtech",
    description:
      "Consultoria sênior em arquitetura, escolha de stack e roadmap técnico. Decisões certas antes de gastar R$100k em código.",
    schemaName: "Consultoria de Tecnologia",
    crumb: "Consultoria Tech",
  },
  en: {
    title: "Technology Consulting for Businesses | Vtech",
    description:
      "Senior consulting on architecture, stack selection and technical roadmap. The right decisions before you spend BRL 100k on code.",
    schemaName: "Technology Consulting",
    crumb: "Tech Consulting",
  },
  es: {
    title: "Consultoría de Tecnología para Empresas | Vtech",
    description:
      "Consultoría sénior en arquitectura, elección de stack y roadmap técnico. Decisiones correctas antes de gastar R$ 100 mil en código.",
    schemaName: "Consultoría de Tecnología",
    crumb: "Consultoría Tech",
  },
};

const PT: ServicePageData = {
  slug: SLUG,
  eyebrow: getService(SLUG, "pt").title,
  h1: "Consultoria de tecnologia para decidir stack, arquitetura e fornecedores.",
  subheadline:
    "Apoio técnico especializado para decisões críticas de tecnologia. Oferecemos consultoria sênior em arquitetura de software, escolha de stack, roadmap tecnológico e CTO as a Service para empresas em crescimento.",
  trust: ["Consultores com vivência sênior", "Metodologia orientada a resultados", "Entregas baseadas em evidências"],
  oQueE: {
    title: "O que é consultoria de tecnologia e estratégia digital",
    paragrafos: [
      "A consultoria de tecnologia — frequentemente referida como consultoria de TI, assessoria técnica ou advisory de software — é um serviço especializado que provê visão estratégica e técnica para empresas que enfrentam desafios complexos de desenvolvimento e infraestrutura. No ambiente B2B, a consultoria atua como um parceiro de confiança que ajuda a diretoria a tomar decisões tecnológicas que impactam diretamente a lucratividade, a segurança e a capacidade de escala da organização a longo prazo.",
      "Muitas vezes, as empresas encontram-se em um dilema: investir em uma nova tecnologia, modernizar um sistema legado ou contratar uma equipe interna de engenharia. Nossa consultoria remove a incerteza desse processo. Atuamos em frentes que vão desde o 'CTO as a Service' (provendo liderança técnica fracionada para empresas que ainda não possuem um CTO full-time) até a realização de Due Diligence Técnica para fundos de investimento e processos de fusão e aquisição (M&A).",
      "Um pilar fundamental da nossa consultoria é o Assessment de Arquitetura. Analisamos profundamente o código, os bancos de dados e a infraestrutura de nuvem existentes para identificar gargalos de performance, dívidas técnicas acumuladas e riscos de segurança. Com base nesse diagnóstico, construímos um Roadmap Tecnológico claro e prioritário, que serve como o guia para os próximos 12 a 24 meses de desenvolvimento da empresa, garantindo que o investimento em tech seja aplicado onde gera mais valor real.",
      "Além da parte técnica, focamos na Transformação Digital holística. Isso inclui a otimização de processos de engenharia, implementação de métricas de produtividade (como as métricas DORA) e mentoria para líderes técnicos. Nosso objetivo é garantir que a tecnologia não seja apenas um centro de custo, mas um motor de inovação que permita à empresa adaptar-se rapidamente às mudanças do mercado e superar a concorrência através da excelência digital.",
    ],
  },
  paraQuem: [
    {
      perfil: "Fundadores e CEOs Não-Técnicos",
      descricao:
        "Lideranças que precisam de um braço direito técnico para validar decisões, contratar fornecedores e gerir o roadmap de produto.",
    },
    {
      perfil: "Empresas com Sistemas Legados",
      descricao:
        "Organizações que sofrem com sistemas lentos e caros de manter, e precisam de um plano de modernização seguro e incremental.",
    },
    {
      perfil: "Investidores e Fundos de VC/PE",
      descricao:
        "Fundos que precisam de uma auditoria técnica profunda antes de realizar aportes em startups ou adquirir empresas de tecnologia.",
    },
    {
      perfil: "Times de Engenharia em Escala",
      descricao:
        "Departamentos de TI que precisam de uma visão externa sênior para resolver problemas complexos de arquitetura ou cultura ágil.",
    },
  ],
  casosDeUso: [
    {
      title: "Due Diligence Técnica para Investimento",
      desc: "Auditoria completa de código, equipe e processos técnicos para mitigar riscos antes de uma transação de capital.",
    },
    {
      title: "Modernização de Legado (Legacy Modernization)",
      desc: "Estratégia para substituir sistemas antigos por arquiteturas modernas em nuvem sem interromper a operação comercial.",
    },
  ],
  glossario: [
    {
      termo: "CTO as a Service",
      definicao:
        "Acesso a um Chief Technology Officer sênior de forma fracionada, permitindo liderança técnica de alto nível com custo reduzido.",
    },
    {
      termo: "Dívida Técnica",
      definicao:
        "Custo futuro acumulado por decisões técnicas rápidas ou subótimas feitas no passado que agora dificultam a evolução do software.",
    },
  ],
  problemas: [
    {
      dor: "Dúvida sobre qual tecnologia (stack) escolher",
      solucao:
        "Analisamos seus objetivos de negócio e recomendamos a stack com melhor custo-benefício, facilidade de contratação e longevidade técnica.",
    },
    {
      dor: "Dificuldade em gerir fornecedores de software",
      solucao:
        "Atuamos na fiscalização técnica, garantindo que o que está sendo entregue pela fábrica de software tenha qualidade e segurança.",
    },
    {
      dor: "Sistemas que não aguentam o crescimento (escala)",
      solucao:
        "Redesenhamos a arquitetura para suportar alta carga, utilizando padrões de microsserviços, cache e infraestrutura resiliente.",
    },
    {
      dor: "Falta de um roadmap claro para a tecnologia",
      solucao:
        "Transformamos a visão de negócio em um plano de execução técnica estruturado em trimestres, com metas e KPIs claros.",
    },
  ],
  entregaveis: [
    {
      title: "Diagnóstico e Assessment Técnico",
      desc: "Relatório detalhado sobre o estado atual da tecnologia, riscos e oportunidades de melhoria.",
      icon: Map,
    },
    {
      title: "Desenho de Arquitetura de Solução",
      desc: "Documentação técnica de como o sistema deve ser construído para garantir performance e segurança.",
      icon: Compass,
    },
    {
      title: "Roadmap Tecnológico 24 meses",
      desc: "Planejamento estratégico de longo prazo alinhado aos objetivos de crescimento da empresa.",
      icon: TrendingUp,
    },
    {
      title: "Processo de Hiring Técnico",
      desc: "Auxílio na definição de perfis, entrevistas técnicas e montagem de times de engenharia de alta performance.",
      icon: Users,
    },
    {
      title: "Relatório de Due Diligence",
      desc: "Auditoria para investidores com análise de código, dívida técnica e escalabilidade da solução analisada.",
      icon: ShieldCheck,
    },
    {
      title: "Acompanhamento CTO as a Service",
      desc: "Participação em reuniões estratégicas, mentorias e decisões de arquitetura de forma contínua.",
      icon: GitBranch,
    },
  ],
  stack: [
    { title: "Metodologias Ágeis", desc: "Adoção de Scrum, Kanban e práticas de entrega contínua para maior previsibilidade." },
    { title: "Métricas DORA", desc: "Uso de indicadores de elite para medir a eficiência e saúde do time de engenharia." },
    { title: "Arquiteturas Cloud-Native", desc: "Foco em soluções que aproveitam ao máximo o potencial de AWS, Azure e Google Cloud." },
    { title: "Padrões de Projeto (Design Patterns)", desc: "Aplicação das melhores práticas de mercado para código limpo e manutenível." },
  ],
  processo: [
    {
      n: "01",
      title: "Imersão e Entrevistas",
      desc: "Conversamos com stakeholders e time técnico para entender o contexto, as dores e os objetivos do negócio.",
    },
    {
      n: "02",
      title: "Auditoria e Análise",
      desc: "Mergulhamos no código, infraestrutura e processos atuais para identificar a realidade técnica da empresa.",
    },
    {
      n: "03",
      title: "Elaboração de Estratégia",
      desc: "Consolidamos os achados em recomendações práticas, roadmaps e desenhos de arquitetura.",
    },
    {
      n: "04",
      title: "Execução e Acompanhamento",
      desc: "Apoiamos o time na implementação das mudanças, garantindo que a estratégia saia do papel e gere resultados.",
    },
  ],
  faq: [
    {
      q: "O que faz exatamente um CTO as a Service?",
      a: "Um CTO as a Service fornece toda a liderança técnica de um Diretor de Tecnologia sênior, mas em regime fracionado. Ele ajuda em decisões de arquitetura, contratação de time, escolha de fornecedores e alinhamento da tecnologia com os objetivos de negócio, sem o custo de um executivo full-time.",
    },
    {
      q: "A consultoria apenas dá conselhos ou também coloca a mão no código?",
      a: "Nosso foco principal na consultoria é estratégico e arquitetural. No entanto, fazemos revisões de código (code reviews) profundas. Caso a empresa precise de execução completa, podemos transitar para o nosso modelo de desenvolvimento de sistemas.",
    },
    {
      q: "Como a consultoria pode ajudar na redução de custos de TI?",
      a: "Identificamos desperdícios em infraestrutura de nuvem, eliminamos redundâncias de software, sugerimos stacks com menor custo de manutenção e evitamos que a empresa gaste em soluções que não trazem ROI, focando o investimento no que é essencial.",
    },
    {
      q: "Qual a duração média de um projeto de consultoria técnica?",
      a: "Projetos de diagnóstico e due diligence costumam durar de 2 a 4 semanas. Já o modelo de acompanhamento estratégico (CTO as a Service) costuma ter contratos de médio a longo prazo, variando de 6 a 12 meses conforme a necessidade de evolução da empresa.",
    },
    {
      q: "Vocês atendem empresas que já possuem uma equipe de TI interna?",
      a: "Sim, com frequência. Atuamos como um braço de apoio sênior para o líder de TI ou CTO da casa, trazendo uma visão externa e experiência de múltiplos outros projetos para resolver desafios específicos que o time interno ainda não enfrentou.",
    },
    {
      q: "Como é garantida a imparcialidade nas recomendações tecnológicas?",
      a: "Nossas recomendações são baseadas em dados, custos de mercado e adequação técnica. Não temos parcerias exclusivas com fornecedores que enviesem nossas escolhas; nosso único compromisso é com o sucesso e a longevidade tecnológica da sua empresa.",
    },
  ],
  relacionados: [
    {
      slug: "sistemas-web",
      title: "Sistemas Web Personalizados",
      href: "/servicos/sistemas-web",
      desc: "Transforme as recomendações da consultoria em um software de alta performance e escalabilidade.",
    },
    {
      slug: "automacoes-com-ia",
      title: "Automações com IA",
      href: "/servicos/automacoes-com-ia",
      desc: "Estratégia e implementação de inteligência artificial para otimizar sua operação corporativa.",
    },
    {
      slug: "integracoes",
      title: "Integração de Sistemas",
      href: "/servicos/integracoes",
      desc: "Conecte ERP, CRM e pagamentos que a consultoria apontou como gargalo.",
    },
  ],
  ctaFinalTitle: "Pronto para tomar a próxima decisão técnica com clareza",
};

const EN: ServicePageData = {
  slug: SLUG,
  eyebrow: getService(SLUG, "en").title,
  h1: "Technology consulting to decide on stack, architecture and vendors.",
  subheadline:
    "Specialized technical support for critical technology decisions. We offer senior consulting on software architecture, stack selection, technology roadmap and CTO as a Service for growing companies.",
  trust: ["Consultants with senior experience", "Results-driven methodology", "Evidence-based deliverables"],
  oQueE: {
    title: "What technology and digital strategy consulting is",
    paragrafos: [
      "Technology consulting, often called IT consulting, technical advisory or software advisory, is a specialized service that provides strategic and technical vision to companies facing complex development and infrastructure challenges. In B2B, the consultancy acts as a trusted partner that helps leadership make technology decisions that directly affect the organization's profitability, security and long-term ability to scale.",
      "Companies often face a dilemma: invest in a new technology, modernize a legacy system or hire an in-house engineering team. Our consulting removes the uncertainty from that process. We work on fronts ranging from CTO as a Service (fractional technical leadership for companies that do not yet have a full-time CTO) to technical due diligence for investment funds and mergers and acquisitions (M&A).",
      "A core pillar of our consulting is the architecture assessment. We analyze the existing code, databases and cloud infrastructure in depth to identify performance bottlenecks, accumulated technical debt and security risks. Based on that diagnosis, we build a clear, prioritized technology roadmap that guides the next 12 to 24 months of development, so your tech investment goes where it creates the most real value.",
      "Beyond the technical side, we focus on holistic digital transformation. That includes optimizing engineering processes, implementing productivity metrics (such as DORA metrics) and mentoring technical leaders. Our goal is to make technology not just a cost center but an engine of innovation that lets the company adapt quickly to market changes and outperform the competition.",
    ],
  },
  paraQuem: [
    {
      perfil: "Non-Technical Founders and CEOs",
      descricao:
        "Leaders who need a technical right hand to validate decisions, hire vendors and manage the product roadmap.",
    },
    {
      perfil: "Companies with Legacy Systems",
      descricao:
        "Organizations struggling with slow, expensive-to-maintain systems that need a safe, incremental modernization plan.",
    },
    {
      perfil: "Investors and VC/PE Funds",
      descricao:
        "Funds that need an in-depth technical audit before investing in startups or acquiring technology companies.",
    },
    {
      perfil: "Engineering Teams at Scale",
      descricao:
        "IT departments that need a senior outside view to solve complex architecture or agile culture problems.",
    },
  ],
  casosDeUso: [
    {
      title: "Technical Due Diligence for Investment",
      desc: "A full audit of code, team and technical processes to mitigate risk before a capital transaction.",
    },
    {
      title: "Legacy Modernization",
      desc: "A strategy to replace old systems with modern cloud architectures without interrupting the business.",
    },
  ],
  glossario: [
    {
      termo: "CTO as a Service",
      definicao:
        "Fractional access to a senior Chief Technology Officer, providing high-level technical leadership at a lower cost.",
    },
    {
      termo: "Technical Debt",
      definicao:
        "The future cost built up by quick or suboptimal technical decisions made in the past that now make the software harder to evolve.",
    },
  ],
  problemas: [
    {
      dor: "Unsure which technology (stack) to choose",
      solucao:
        "We analyze your business goals and recommend the stack with the best cost-benefit, hiring ease and technical longevity.",
    },
    {
      dor: "Difficulty managing software vendors",
      solucao:
        "We provide technical oversight, making sure what the software vendor delivers meets quality and security standards.",
    },
    {
      dor: "Systems that cannot keep up with growth (scale)",
      solucao:
        "We redesign the architecture to handle high load, using microservice patterns, caching and resilient infrastructure.",
    },
    {
      dor: "No clear technology roadmap",
      solucao:
        "We turn the business vision into a technical execution plan organized by quarter, with clear goals and KPIs.",
    },
  ],
  entregaveis: [
    {
      title: "Technical Diagnosis and Assessment",
      desc: "A detailed report on the current state of the technology, its risks and improvement opportunities.",
      icon: Map,
    },
    {
      title: "Solution Architecture Design",
      desc: "Technical documentation on how the system should be built to ensure performance and security.",
      icon: Compass,
    },
    {
      title: "24-Month Technology Roadmap",
      desc: "Long-term strategic planning aligned with the company's growth goals.",
      icon: TrendingUp,
    },
    {
      title: "Technical Hiring Process",
      desc: "Help defining profiles, running technical interviews and building high-performance engineering teams.",
      icon: Users,
    },
    {
      title: "Due Diligence Report",
      desc: "An audit for investors covering code, technical debt and the scalability of the solution under review.",
      icon: ShieldCheck,
    },
    {
      title: "Ongoing CTO as a Service",
      desc: "Continuous participation in strategic meetings, mentoring and architecture decisions.",
      icon: GitBranch,
    },
  ],
  stack: [
    { title: "Agile Methodologies", desc: "Scrum, Kanban and continuous delivery practices for greater predictability." },
    { title: "DORA Metrics", desc: "Elite indicators to measure the efficiency and health of the engineering team." },
    { title: "Cloud-Native Architectures", desc: "Solutions that make the most of AWS, Azure and Google Cloud." },
    { title: "Design Patterns", desc: "Industry best practices for clean, maintainable code." },
  ],
  processo: [
    {
      n: "01",
      title: "Immersion and Interviews",
      desc: "We talk to stakeholders and the technical team to understand the business context, pain points and goals.",
    },
    {
      n: "02",
      title: "Audit and Analysis",
      desc: "We dig into the current code, infrastructure and processes to understand the company's technical reality.",
    },
    {
      n: "03",
      title: "Strategy Development",
      desc: "We consolidate the findings into practical recommendations, roadmaps and architecture designs.",
    },
    {
      n: "04",
      title: "Execution and Follow-Up",
      desc: "We support the team as it implements the changes, so the strategy leaves the page and delivers results.",
    },
  ],
  faq: [
    {
      q: "What exactly does a CTO as a Service do?",
      a: "A CTO as a Service provides all the technical leadership of a senior Chief Technology Officer on a fractional basis. They help with architecture decisions, team hiring, vendor selection and aligning technology with business goals, without the cost of a full-time executive.",
    },
    {
      q: "Does the consulting only give advice, or do you also work on the code?",
      a: "Our main focus in consulting is strategy and architecture. That said, we do in-depth code reviews. If the company needs full execution, we can move to our systems development model.",
    },
    {
      q: "How can consulting help reduce IT costs?",
      a: "We identify waste in cloud infrastructure, eliminate software redundancy, suggest stacks with lower maintenance costs and keep the company from spending on solutions with no ROI, focusing investment on what is essential.",
    },
    {
      q: "How long does a technical consulting project usually take?",
      a: "Diagnosis and due diligence projects usually take 2 to 4 weeks. The ongoing strategic model (CTO as a Service) typically runs on medium- to long-term contracts of 6 to 12 months, depending on how the company needs to evolve.",
    },
    {
      q: "Do you work with companies that already have an in-house IT team?",
      a: "Yes, often. We act as senior support for the in-house IT lead or CTO, bringing an outside view and experience from many other projects to solve specific challenges the internal team has not faced yet.",
    },
    {
      q: "How do you ensure impartial technology recommendations?",
      a: "Our recommendations are based on data, market costs and technical fit. We have no exclusive vendor partnerships that bias our choices; our only commitment is to your company's success and technological longevity.",
    },
  ],
  relacionados: [
    {
      slug: "sistemas-web",
      title: "Custom Web Systems",
      href: "/servicos/sistemas-web",
      desc: "Turn the consulting recommendations into high-performance, scalable software.",
    },
    {
      slug: "automacoes-com-ia",
      title: "AI Automations",
      href: "/servicos/automacoes-com-ia",
      desc: "Artificial intelligence strategy and implementation to optimize your corporate operation.",
    },
    {
      slug: "integracoes",
      title: "Systems Integration",
      href: "/servicos/integracoes",
      desc: "Connect the ERP, CRM and payments the consulting flagged as bottlenecks.",
    },
  ],
  ctaFinalTitle: "Ready to make your next technical decision with clarity",
};

const ES: ServicePageData = {
  slug: SLUG,
  eyebrow: getService(SLUG, "es").title,
  h1: "Consultoría de tecnología para decidir stack, arquitectura y proveedores.",
  subheadline:
    "Apoyo técnico especializado para decisiones críticas de tecnología. Ofrecemos consultoría sénior en arquitectura de software, elección de stack, roadmap tecnológico y CTO as a Service para empresas en crecimiento.",
  trust: ["Consultores con experiencia sénior", "Metodología orientada a resultados", "Entregas basadas en evidencia"],
  oQueE: {
    title: "Qué es la consultoría de tecnología y estrategia digital",
    paragrafos: [
      "La consultoría de tecnología, a menudo llamada consultoría de TI, asesoría técnica o advisory de software, es un servicio especializado que aporta visión estratégica y técnica a empresas que enfrentan desafíos complejos de desarrollo e infraestructura. En el entorno B2B, la consultoría actúa como un socio de confianza que ayuda a la dirección a tomar decisiones tecnológicas que impactan directamente la rentabilidad, la seguridad y la capacidad de escala de la organización a largo plazo.",
      "Muchas veces, las empresas se encuentran ante un dilema: invertir en una nueva tecnología, modernizar un sistema legado o contratar un equipo interno de ingeniería. Nuestra consultoría elimina la incertidumbre de ese proceso. Actuamos en frentes que van desde el 'CTO as a Service' (liderazgo técnico fraccionado para empresas que aún no tienen un CTO de tiempo completo) hasta la Due Diligence Técnica para fondos de inversión y procesos de fusiones y adquisiciones (M&A).",
      "Un pilar fundamental de nuestra consultoría es el Assessment de Arquitectura. Analizamos a fondo el código, las bases de datos y la infraestructura en la nube existentes para identificar cuellos de botella de desempeño, deuda técnica acumulada y riesgos de seguridad. Con base en ese diagnóstico, construimos un Roadmap Tecnológico claro y priorizado, que sirve de guía para los próximos 12 a 24 meses de desarrollo de la empresa, garantizando que la inversión en tecnología se aplique donde genera más valor real.",
      "Además de la parte técnica, nos enfocamos en la Transformación Digital integral. Esto incluye la optimización de procesos de ingeniería, la implementación de métricas de productividad (como las métricas DORA) y la mentoría de líderes técnicos. Nuestro objetivo es que la tecnología no sea solo un centro de costos, sino un motor de innovación que permita a la empresa adaptarse rápidamente a los cambios del mercado y superar a la competencia a través de la excelencia digital.",
    ],
  },
  paraQuem: [
    {
      perfil: "Fundadores y CEOs No Técnicos",
      descricao:
        "Líderes que necesitan una mano derecha técnica para validar decisiones, contratar proveedores y gestionar el roadmap de producto.",
    },
    {
      perfil: "Empresas con Sistemas Legados",
      descricao:
        "Organizaciones que sufren con sistemas lentos y costosos de mantener, y que necesitan un plan de modernización seguro e incremental.",
    },
    {
      perfil: "Inversionistas y Fondos de VC/PE",
      descricao:
        "Fondos que necesitan una auditoría técnica profunda antes de invertir en startups o adquirir empresas de tecnología.",
    },
    {
      perfil: "Equipos de Ingeniería a Escala",
      descricao:
        "Departamentos de TI que necesitan una visión externa sénior para resolver problemas complejos de arquitectura o de cultura ágil.",
    },
  ],
  casosDeUso: [
    {
      title: "Due Diligence Técnica para Inversión",
      desc: "Auditoría completa de código, equipo y procesos técnicos para mitigar riesgos antes de una transacción de capital.",
    },
    {
      title: "Modernización de Legados (Legacy Modernization)",
      desc: "Estrategia para reemplazar sistemas antiguos por arquitecturas modernas en la nube sin interrumpir la operación comercial.",
    },
  ],
  glossario: [
    {
      termo: "CTO as a Service",
      definicao:
        "Acceso fraccionado a un Chief Technology Officer sénior, que permite contar con liderazgo técnico de alto nivel a un costo reducido.",
    },
    {
      termo: "Deuda Técnica",
      definicao:
        "Costo futuro acumulado por decisiones técnicas rápidas o subóptimas tomadas en el pasado que ahora dificultan la evolución del software.",
    },
  ],
  problemas: [
    {
      dor: "Duda sobre qué tecnología (stack) elegir",
      solucao:
        "Analizamos sus objetivos de negocio y recomendamos el stack con la mejor relación costo-beneficio, facilidad de contratación y longevidad técnica.",
    },
    {
      dor: "Dificultad para gestionar proveedores de software",
      solucao:
        "Actuamos en la supervisión técnica, garantizando que lo que entrega la fábrica de software tenga calidad y seguridad.",
    },
    {
      dor: "Sistemas que no soportan el crecimiento (escala)",
      solucao:
        "Rediseñamos la arquitectura para soportar alta carga, utilizando patrones de microservicios, caché e infraestructura resiliente.",
    },
    {
      dor: "Falta de un roadmap claro para la tecnología",
      solucao:
        "Transformamos la visión de negocio en un plan de ejecución técnica estructurado por trimestres, con metas y KPIs claros.",
    },
  ],
  entregaveis: [
    {
      title: "Diagnóstico y Assessment Técnico",
      desc: "Informe detallado sobre el estado actual de la tecnología, los riesgos y las oportunidades de mejora.",
      icon: Map,
    },
    {
      title: "Diseño de Arquitectura de Solución",
      desc: "Documentación técnica de cómo debe construirse el sistema para garantizar desempeño y seguridad.",
      icon: Compass,
    },
    {
      title: "Roadmap Tecnológico a 24 meses",
      desc: "Planificación estratégica de largo plazo alineada con los objetivos de crecimiento de la empresa.",
      icon: TrendingUp,
    },
    {
      title: "Proceso de Contratación Técnica",
      desc: "Apoyo en la definición de perfiles, entrevistas técnicas y armado de equipos de ingeniería de alto desempeño.",
      icon: Users,
    },
    {
      title: "Informe de Due Diligence",
      desc: "Auditoría para inversionistas con análisis de código, deuda técnica y escalabilidad de la solución analizada.",
      icon: ShieldCheck,
    },
    {
      title: "Acompañamiento CTO as a Service",
      desc: "Participación continua en reuniones estratégicas, mentorías y decisiones de arquitectura.",
      icon: GitBranch,
    },
  ],
  stack: [
    { title: "Metodologías Ágiles", desc: "Adopción de Scrum, Kanban y prácticas de entrega continua para mayor previsibilidad." },
    { title: "Métricas DORA", desc: "Uso de indicadores de élite para medir la eficiencia y la salud del equipo de ingeniería." },
    { title: "Arquitecturas Cloud-Native", desc: "Foco en soluciones que aprovechan al máximo el potencial de AWS, Azure y Google Cloud." },
    { title: "Patrones de Diseño (Design Patterns)", desc: "Aplicación de las mejores prácticas del mercado para un código limpio y mantenible." },
  ],
  processo: [
    {
      n: "01",
      title: "Inmersión y Entrevistas",
      desc: "Conversamos con stakeholders y con el equipo técnico para entender el contexto, los dolores y los objetivos del negocio.",
    },
    {
      n: "02",
      title: "Auditoría y Análisis",
      desc: "Nos sumergimos en el código, la infraestructura y los procesos actuales para identificar la realidad técnica de la empresa.",
    },
    {
      n: "03",
      title: "Elaboración de la Estrategia",
      desc: "Consolidamos los hallazgos en recomendaciones prácticas, roadmaps y diseños de arquitectura.",
    },
    {
      n: "04",
      title: "Ejecución y Acompañamiento",
      desc: "Apoyamos al equipo en la implementación de los cambios, garantizando que la estrategia salga del papel y genere resultados.",
    },
  ],
  faq: [
    {
      q: "¿Qué hace exactamente un CTO as a Service?",
      a: "Un CTO as a Service aporta todo el liderazgo técnico de un Director de Tecnología sénior, pero en régimen fraccionado. Ayuda en decisiones de arquitectura, contratación del equipo, elección de proveedores y alineación de la tecnología con los objetivos de negocio, sin el costo de un ejecutivo de tiempo completo.",
    },
    {
      q: "¿La consultoría solo da consejos o también pone las manos en el código?",
      a: "Nuestro foco principal en la consultoría es estratégico y arquitectónico. Sin embargo, hacemos revisiones de código (code reviews) profundas. Si la empresa necesita una ejecución completa, podemos pasar a nuestro modelo de desarrollo de sistemas.",
    },
    {
      q: "¿Cómo puede la consultoría ayudar a reducir los costos de TI?",
      a: "Identificamos desperdicios en la infraestructura en la nube, eliminamos redundancias de software, sugerimos stacks con menor costo de mantenimiento y evitamos que la empresa gaste en soluciones que no generan ROI, enfocando la inversión en lo esencial.",
    },
    {
      q: "¿Cuál es la duración promedio de un proyecto de consultoría técnica?",
      a: "Los proyectos de diagnóstico y due diligence suelen durar de 2 a 4 semanas. El modelo de acompañamiento estratégico (CTO as a Service) suele tener contratos de mediano a largo plazo, de 6 a 12 meses según la necesidad de evolución de la empresa.",
    },
    {
      q: "¿Atienden a empresas que ya tienen un equipo de TI interno?",
      a: "Sí, con frecuencia. Actuamos como apoyo sénior para el líder de TI o el CTO de la empresa, aportando una visión externa y la experiencia de muchos otros proyectos para resolver desafíos específicos que el equipo interno aún no ha enfrentado.",
    },
    {
      q: "¿Cómo se garantiza la imparcialidad en las recomendaciones tecnológicas?",
      a: "Nuestras recomendaciones se basan en datos, costos de mercado y adecuación técnica. No tenemos alianzas exclusivas con proveedores que sesguen nuestras elecciones; nuestro único compromiso es con el éxito y la longevidad tecnológica de su empresa.",
    },
  ],
  relacionados: [
    {
      slug: "sistemas-web",
      title: "Sistemas Web Personalizados",
      href: "/servicos/sistemas-web",
      desc: "Transforme las recomendaciones de la consultoría en un software de alto desempeño y escalabilidad.",
    },
    {
      slug: "automacoes-com-ia",
      title: "Automatizaciones con IA",
      href: "/servicos/automacoes-com-ia",
      desc: "Estrategia e implementación de inteligencia artificial para optimizar su operación corporativa.",
    },
    {
      slug: "integracoes",
      title: "Integración de Sistemas",
      href: "/servicos/integracoes",
      desc: "Conecte el ERP, el CRM y los pagos que la consultoría identificó como cuellos de botella.",
    },
  ],
  ctaFinalTitle: "¿Listo para tomar la próxima decisión técnica con claridad",
};

const DATA: L<ServicePageData> = { pt: PT, en: EN, es: ES };

export const Route = createFileRoute("/servicos/consultoria-tech")({
  head: ({ match }) => {
    const locale = match.context.locale;
    const h = pick(HEAD, locale);
    const data = pick(DATA, locale);
    return {
      ...seo({ title: h.title, description: h.description, path: PATH, locale }),
      scripts: [
        jsonLd(
          buildServiceSchema({
            name: h.schemaName,
            description: h.description,
            url: localizedUrl(PATH, locale),
            serviceType: "Technology Consulting",
            locale,
          }),
        ),
        jsonLd(buildFAQSchema(data.faq)),
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
