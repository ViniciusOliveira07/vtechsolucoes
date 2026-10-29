import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Laptop, Database, Lock, Workflow, BarChart3, Users } from "lucide-react";
import { ServicePageLayout, type ServicePageData } from "@/components/site/ServicePageLayout";
import { buildBreadcrumbSchema, buildServiceSchema } from "@/lib/service-schema";
import { Events } from "@/lib/analytics";
import { getService, jsonLd, localizedUrl, seo } from "@/lib/site";
import { pick, useT, type L } from "@/lib/i18n";

const SLUG = "sistemas-web" as const;
const PATH = `/servicos/${SLUG}`;

// Título/descrição do head e nomes usados no JSON-LD (Service e Breadcrumb)
const HEAD: L<{ title: string; description: string; schemaName: string; crumb: string }> = {
  pt: {
    title: "Desenvolvimento de Sistemas Web sob Medida | Vtech",
    description:
      "Sistemas web sob medida para operações B2B: ERPs internos, painéis, portais. Stack moderna, deploy contínuo, sem mensalidade refém.",
    schemaName: "Desenvolvimento de Sistemas Web",
    crumb: "Sistemas Web",
  },
  en: {
    title: "Custom Web Systems Development | Vtech",
    description:
      "Custom web systems for B2B operations: internal ERPs, dashboards, portals. Modern stack, continuous deployment, no subscription lock-in.",
    schemaName: "Web Systems Development",
    crumb: "Web Systems",
  },
  es: {
    title: "Desarrollo de Sistemas Web a Medida | Vtech",
    description:
      "Sistemas web a medida para operaciones B2B: ERPs internos, paneles, portales. Stack moderno, despliegue continuo, sin quedar rehén de mensualidades.",
    schemaName: "Desarrollo de Sistemas Web",
    crumb: "Sistemas Web",
  },
};

const PT: ServicePageData = {
  slug: SLUG,
  eyebrow: getService(SLUG, "pt").title,
  h1: "Sistemas web sob medida para a operação que hoje vive em planilhas.",
  subheadline:
    "Soluções de software personalizadas que eliminam gargalos operacionais e automatizam processos complexos. Sistemas web robustos com foco em produtividade corporativa e integração total.",
  trust: ["MVP entregue em tempo recorde", "Código 100% proprietário", "Segurança de dados nível enterprise"],
  oQueE: {
    title: "O que é um sistema web sob medida para empresas",
    paragrafos: [
      "Um sistema web sob medida — também conhecido como software personalizado ou aplicação web customizada — é uma plataforma digital desenvolvida especificamente para atender às regras de negócio e fluxos operacionais únicos da sua empresa. Diferente de softwares de prateleira (off-the-shelf), que exigem que sua equipe se adapte à ferramenta, o sistema sob medida é moldado ao seu processo, garantindo que cada funcionalidade entregue valor real e elimine redundâncias manuais.",
      "No mercado corporativo atual, a agilidade operacional é um diferencial competitivo crítico. Desenvolvemos sistemas web utilizando stacks modernas que permitem acessibilidade total via navegador, sem necessidade de instalações locais complexas. Isso facilita o trabalho híbrido e a gestão centralizada de dados, permitindo que gestores tenham visibilidade em tempo real sobre KPIs, finanças, logística ou qualquer outro pilar crítico do negócio através de dashboards intuitivos e seguros.",
      "A construção de um sistema web personalizado pela Vtech Soluções envolve uma análise profunda de arquitetura de software e experiência do usuário (UX). Utilizamos tecnologias como React e bancos de dados escaláveis para garantir que o sistema cresça junto com sua empresa (escalabilidade horizontal). Além disso, priorizamos a segurança da informação através de protocolos de autenticação robustos, criptografia de ponta a ponta e controle de acesso granular (RBAC), protegendo o ativo mais valioso da sua corporação: os dados.",
      "Investir em um sistema próprio significa livrar-se de mensalidades abusivas por usuário e limitações técnicas de plataformas genéricas. O código-fonte é um ativo da sua empresa, garantindo independência tecnológica e liberdade para evoluir a solução conforme as demandas do mercado mudam. É o passo definitivo para a transformação digital completa de organizações que buscam liderança em seus setores através da inovação tecnológica.",
    ],

  },
  paraQuem: [
    {
      perfil: "Empresas com Processos Únicos",
      descricao:
        "Negócios que possuem fluxos que não se encaixam em softwares prontos e precisam de flexibilidade total.",
    },
    {
      perfil: "Operações em Crescimento Acelerado",
      descricao:
        "Empresas que precisam de escalabilidade para suportar o aumento no volume de dados e usuários sem perda de performance.",
    },
    {
      perfil: "Setores com Alta Regulação de Dados",
      descricao:
        "Organizações financeiras, de saúde ou logística que exigem controle total sobre a segurança e privacidade das informações.",
    },
    {
      perfil: "Startups e Scaleups",
      descricao:
        "Negócios que estão validando novos modelos e precisam de MVPs robustos que possam evoluir rapidamente para produtos finais.",
    },
  ],
  casosDeUso: [
    {
      title: "ERP e Gestão Operacional Interna",
      desc: "Centralização de finanças, estoque, RH e vendas em uma única plataforma integrada e sem redundâncias.",
    },
    {
      title: "Portais do Cliente e Partner Portals",
      desc: "Ambientes seguros para que seus clientes e parceiros acessem documentos, pedidos e suporte de forma autônoma.",
    },
  ],
  glossario: [
    {
      termo: "Escalabilidade",
      definicao:
        "Capacidade de um sistema de lidar com uma carga crescente de trabalho adicionando recursos à infraestrutura.",
    },
    {
      termo: "API (Application Programming Interface)",
      definicao:
        "Conjunto de normas que permite a comunicação entre diferentes plataformas e serviços de software.",
    },
  ],
  problemas: [
    {
      dor: "Gargalos em planilhas e processos manuais",
      solucao:
        "Digitalizamos e automatizamos fluxos inteiros, reduzindo o erro humano e liberando seu time para tarefas estratégicas.",
    },
    {
      dor: "Dados descentralizados e falta de visibilidade",
      solucao:
        "Centralizamos toda a informação em um único banco de dados com dashboards de BI para tomadas de decisão baseadas em fatos.",
    },
    {
      dor: "Custo elevado com licenças 'por usuário'",
      solucao:
        "Desenvolvemos seu sistema proprietário onde você tem controle total sobre o número de acessos sem custos adicionais de licença.",
    },
    {
      dor: "Dificuldade de integração entre ferramentas",
      solucao:
        "Construímos sistemas com arquitetura aberta que se conectam via API com qualquer ferramenta que sua empresa já utilize.",
    },
  ],
  entregaveis: [
    {
      title: "Arquitetura de Software Sólida",
      desc: "Estrutura planejada para suportar alta carga e facilitar manutenções futuras sem dívida técnica.",
      icon: Database,
    },
    {
      title: "Interface Intuitiva (UI/UX)",
      desc: "Design focado na produtividade do usuário final, reduzindo o tempo de treinamento e erros de operação.",
      icon: Laptop,
    },
    {
      title: "Segurança Nível Bancário",
      desc: "Implementação de logs de auditoria, MFA (autenticação de dois fatores) e proteção contra ataques OWASP.",
      icon: Lock,
    },
    {
      title: "Automação de Workflows",
      desc: "Motores de regras que executam tarefas repetitivas automaticamente com base em gatilhos específicos.",
      icon: Workflow,
    },
    {
      title: "BI e Dashboards em Tempo Real",
      desc: "Visualização clara de indicadores de desempenho para monitoramento contínuo da saúde do negócio.",
      icon: BarChart3,
    },
    {
      title: "Suporte e Manutenção Proativa",
      desc: "Monitoramento 24/7 para garantir que o sistema esteja sempre disponível e performando no máximo.",
      icon: Users,
    },
  ],
  stack: [
    { title: "Frontend React/Next.js", desc: "Interfaces rápidas, ricas em interatividade e otimizadas para o usuário." },
    { title: "Backend em Node.js/Go", desc: "Processamento de alta performance e escalabilidade de servidores." },
    { title: "PostgreSQL Corporativo", desc: "Banco de dados relacional robusto para integridade absoluta da informação." },
    { title: "Docker & Kubernetes", desc: "Infraestrutura moderna para deploys seguros e escalonamento automático." },
  ],
  processo: [
    {
      n: "01",
      title: "Levantamento de Requisitos",
      desc: "Reuniões detalhadas para entender cada nuance do seu negócio e definir o escopo funcional do sistema.",
    },
    {
      n: "02",
      title: "Prototipagem e Validação",
      desc: "Criação de protótipos navegáveis para que você valide a experiência antes da codificação final.",
    },
    {
      n: "03",
      title: "Desenvolvimento e Integração",
      desc: "Codificação em sprints ágeis com demonstrações frequentes para garantir alinhamento total.",
    },
    {
      n: "04",
      title: "Implantação e Treinamento",
      desc: "Migração de dados, treinamento das equipes e suporte assistido durante a fase de lançamento.",
    },
  ],
  faq: [
    {
      q: "Qual a diferença entre um sistema web e um aplicativo desktop?",
      a: "Sistemas web são acessados via navegador e não requerem instalação em cada máquina, facilitando atualizações centrais e acesso de qualquer lugar com internet. Isso reduz custos de TI e aumenta a agilidade corporativa.",
    },
    {
      q: "Quanto tempo demora o desenvolvimento de um software personalizado?",
      a: "O tempo varia conforme a complexidade. Projetos típicos de MVP (Produto Mínimo Viável) levam entre 8 a 16 semanas. Trabalhamos com entregas incrementais para que você já possa usar partes do sistema durante o desenvolvimento.",
    },
    {
      q: "O sistema web pode ser integrado ao meu ERP atual (ex: SAP, Totvs)?",
      a: "Sim. Especializamos em criar camadas de integração que conectam seu novo sistema web aos seus legados via APIs ou webhooks, garantindo que os dados fluam sem interrupções entre as plataformas.",
    },
    {
      q: "Como é garantida a segurança dos dados no sistema web?",
      a: "Implementamos múltiplas camadas de proteção, incluindo firewalls de aplicação, criptografia SSL/TLS, e controles rígidos de acesso. Realizamos testes de vulnerabilidade constantes para garantir a integridade total do software.",
    },
    {
      q: "O software pertencerá à minha empresa após o pagamento?",
      a: "Sim. Ao final do projeto, o código-fonte e todos os ativos de propriedade intelectual são transferidos para sua empresa. Você não fica refém da Vtech Soluções e tem total liberdade tecnológica.",
    },
    {
      q: "Como o sistema web ajuda no ROI (Retorno sobre Investimento)?",
      a: "Através da redução de erros manuais, economia de tempo da equipe e centralização de dados que permitem melhores decisões. Na maioria dos casos, o sistema se paga em poucos meses através da eficiência operacional gerada.",
    },
  ],
  relacionados: [
    {
      slug: "integracoes",
      title: "Integrações de Sistemas",
      href: "/servicos/integracoes",
      desc: "Conecte seu novo sistema a todas as outras ferramentas que sua empresa já utiliza.",
    },
    {
      slug: "automacoes-com-ia",
      title: "Automações com IA",
      href: "/servicos/automacoes-com-ia",
      desc: "Potencialize seu software com inteligência artificial para análise de dados e automação inteligente.",
    },
  ],
  ctaFinalTitle: "Pronto para modernizar sua operação com software de alto nível",
};

const EN: ServicePageData = {
  slug: SLUG,
  eyebrow: getService(SLUG, "en").title,
  h1: "Custom web systems for the operation that lives in spreadsheets today.",
  subheadline:
    "Custom software that removes operational bottlenecks and automates complex processes. Robust web systems focused on corporate productivity and full integration.",
  trust: ["MVP delivered in record time", "100% proprietary code", "Enterprise-grade data security"],
  oQueE: {
    title: "What a custom web system for businesses is",
    paragrafos: [
      "A custom web system, also known as custom software or a custom web application, is a digital platform built specifically for your company's business rules and operational workflows. Unlike off-the-shelf software, which forces your team to adapt to the tool, a custom system is shaped around your process, so every feature delivers real value and removes manual redundancy.",
      "In today's corporate market, operational agility is a critical competitive edge. We build web systems on modern stacks that are fully accessible from the browser, with no complex local installs. This supports hybrid work and centralized data management, giving managers real-time visibility into KPIs, finance, logistics or any other critical area of the business through clear, secure dashboards.",
      "Building a custom web system with Vtech Soluções involves an in-depth analysis of software architecture and user experience (UX). We use technologies such as React and scalable databases so the system grows with your company (horizontal scalability). We also prioritize information security with robust authentication, end-to-end encryption and granular access control (RBAC), protecting your company's most valuable asset: its data.",
      "Owning your system means getting rid of steep per-user subscriptions and the technical limits of generic platforms. The source code is a company asset, giving you technological independence and the freedom to evolve the solution as market demands change. It is the decisive step toward full digital transformation for organizations that want to lead their sectors through technology.",
    ],
  },
  paraQuem: [
    {
      perfil: "Companies with Unique Processes",
      descricao:
        "Businesses whose workflows do not fit ready-made software and need full flexibility.",
    },
    {
      perfil: "Fast-Growing Operations",
      descricao:
        "Companies that need scalability to handle growing data and user volumes without losing performance.",
    },
    {
      perfil: "Highly Regulated Data Sectors",
      descricao:
        "Financial, healthcare or logistics organizations that require full control over information security and privacy.",
    },
    {
      perfil: "Startups and Scaleups",
      descricao:
        "Businesses validating new models that need robust MVPs able to evolve quickly into final products.",
    },
  ],
  casosDeUso: [
    {
      title: "Internal ERP and Operations Management",
      desc: "Finance, inventory, HR and sales centralized in a single integrated platform, with no redundancy.",
    },
    {
      title: "Customer Portals and Partner Portals",
      desc: "Secure environments where your customers and partners access documents, orders and support on their own.",
    },
  ],
  glossario: [
    {
      termo: "Scalability",
      definicao:
        "A system's ability to handle a growing workload by adding resources to the infrastructure.",
    },
    {
      termo: "API (Application Programming Interface)",
      definicao:
        "A set of rules that allows different software platforms and services to communicate.",
    },
  ],
  problemas: [
    {
      dor: "Bottlenecks in spreadsheets and manual processes",
      solucao:
        "We digitize and automate entire workflows, reducing human error and freeing your team for strategic work.",
    },
    {
      dor: "Scattered data and no visibility",
      solucao:
        "We bring all information into a single database with BI dashboards for fact-based decisions.",
    },
    {
      dor: "High per-user licensing costs",
      solucao:
        "We build your proprietary system so you fully control the number of users with no extra license fees.",
    },
    {
      dor: "Tools that do not integrate with each other",
      solucao:
        "We build systems with an open architecture that connect via API to any tool your company already uses.",
    },
  ],
  entregaveis: [
    {
      title: "Solid Software Architecture",
      desc: "A structure designed to handle high load and make future maintenance easy, without technical debt.",
      icon: Database,
    },
    {
      title: "Intuitive Interface (UI/UX)",
      desc: "Design focused on end-user productivity, cutting training time and operating errors.",
      icon: Laptop,
    },
    {
      title: "Bank-Grade Security",
      desc: "Audit logs, MFA (multi-factor authentication) and protection against OWASP attacks.",
      icon: Lock,
    },
    {
      title: "Workflow Automation",
      desc: "Rule engines that run repetitive tasks automatically based on specific triggers.",
      icon: Workflow,
    },
    {
      title: "Real-Time BI and Dashboards",
      desc: "Clear performance indicators for continuous monitoring of business health.",
      icon: BarChart3,
    },
    {
      title: "Proactive Support and Maintenance",
      desc: "24/7 monitoring so the system is always available and performing at its best.",
      icon: Users,
    },
  ],
  stack: [
    { title: "React/Next.js Frontend", desc: "Fast, highly interactive interfaces optimized for the user." },
    { title: "Node.js/Go Backend", desc: "High-performance processing and server scalability." },
    { title: "Enterprise PostgreSQL", desc: "A robust relational database for complete data integrity." },
    { title: "Docker & Kubernetes", desc: "Modern infrastructure for safe deployments and automatic scaling." },
  ],
  processo: [
    {
      n: "01",
      title: "Requirements Gathering",
      desc: "Detailed meetings to understand every nuance of your business and define the system's functional scope.",
    },
    {
      n: "02",
      title: "Prototyping and Validation",
      desc: "Clickable prototypes so you can validate the experience before the final code is written.",
    },
    {
      n: "03",
      title: "Development and Integration",
      desc: "Coding in agile sprints with frequent demos to keep everyone fully aligned.",
    },
    {
      n: "04",
      title: "Rollout and Training",
      desc: "Data migration, team training and assisted support during the launch phase.",
    },
  ],
  faq: [
    {
      q: "What is the difference between a web system and a desktop application?",
      a: "Web systems are accessed through the browser and do not need to be installed on each machine, which makes central updates easy and allows access from anywhere with internet. This lowers IT costs and increases corporate agility.",
    },
    {
      q: "How long does it take to develop custom software?",
      a: "It depends on complexity. Typical MVP (Minimum Viable Product) projects take 8 to 16 weeks. We deliver incrementally, so you can start using parts of the system during development.",
    },
    {
      q: "Can the web system be integrated with my current ERP (e.g., SAP, Totvs)?",
      a: "Yes. We specialize in integration layers that connect your new web system to your legacy systems via APIs or webhooks, so data flows between platforms without interruption.",
    },
    {
      q: "How is data security ensured in the web system?",
      a: "We implement multiple layers of protection, including application firewalls, SSL/TLS encryption and strict access controls. We run regular vulnerability tests to keep the software fully secure.",
    },
    {
      q: "Will the software belong to my company after payment?",
      a: "Yes. At the end of the project, the source code and all intellectual property are transferred to your company. You are not locked in to Vtech Soluções and have full technological freedom.",
    },
    {
      q: "How does a web system help with ROI (return on investment)?",
      a: "By reducing manual errors, saving team time and centralizing data for better decisions. In most cases, the system pays for itself within a few months through the operational efficiency it creates.",
    },
  ],
  relacionados: [
    {
      slug: "integracoes",
      title: "Systems Integration",
      href: "/servicos/integracoes",
      desc: "Connect your new system to all the other tools your company already uses.",
    },
    {
      slug: "automacoes-com-ia",
      title: "AI Automations",
      href: "/servicos/automacoes-com-ia",
      desc: "Boost your software with artificial intelligence for data analysis and smart automation.",
    },
  ],
  ctaFinalTitle: "Ready to modernize your operation with high-end software",
};

const ES: ServicePageData = {
  slug: SLUG,
  eyebrow: getService(SLUG, "es").title,
  h1: "Sistemas web a medida para la operación que hoy vive en hojas de cálculo.",
  subheadline:
    "Soluciones de software personalizadas que eliminan cuellos de botella operativos y automatizan procesos complejos. Sistemas web robustos enfocados en la productividad corporativa y la integración total.",
  trust: ["MVP entregado en tiempo récord", "Código 100% propio", "Seguridad de datos de nivel enterprise"],
  oQueE: {
    title: "Qué es un sistema web a medida para empresas",
    paragrafos: [
      "Un sistema web a medida, también conocido como software personalizado o aplicación web personalizada, es una plataforma digital desarrollada específicamente para atender las reglas de negocio y los flujos operativos únicos de su empresa. A diferencia del software estándar (off-the-shelf), que exige que su equipo se adapte a la herramienta, el sistema a medida se moldea a su proceso, garantizando que cada funcionalidad entregue valor real y elimine redundancias manuales.",
      "En el mercado corporativo actual, la agilidad operativa es un diferencial competitivo crítico. Desarrollamos sistemas web con stacks modernos que permiten acceso total desde el navegador, sin instalaciones locales complejas. Esto facilita el trabajo híbrido y la gestión centralizada de datos, permitiendo que los gerentes tengan visibilidad en tiempo real sobre KPIs, finanzas, logística o cualquier otro pilar crítico del negocio mediante dashboards intuitivos y seguros.",
      "La construcción de un sistema web personalizado por Vtech Soluções implica un análisis profundo de arquitectura de software y experiencia de usuario (UX). Utilizamos tecnologías como React y bases de datos escalables para garantizar que el sistema crezca junto con su empresa (escalabilidad horizontal). Además, priorizamos la seguridad de la información mediante protocolos de autenticación robustos, cifrado de punta a punta y control de acceso granular (RBAC), protegiendo el activo más valioso de su corporación: los datos.",
      "Invertir en un sistema propio significa librarse de mensualidades abusivas por usuario y de las limitaciones técnicas de plataformas genéricas. El código fuente es un activo de su empresa, lo que garantiza independencia tecnológica y libertad para evolucionar la solución a medida que cambian las demandas del mercado. Es el paso definitivo hacia la transformación digital completa de organizaciones que buscan liderar sus sectores a través de la innovación tecnológica.",
    ],
  },
  paraQuem: [
    {
      perfil: "Empresas con Procesos Únicos",
      descricao:
        "Negocios con flujos que no encajan en softwares listos para usar y que necesitan flexibilidad total.",
    },
    {
      perfil: "Operaciones en Crecimiento Acelerado",
      descricao:
        "Empresas que necesitan escalabilidad para soportar el aumento en el volumen de datos y usuarios sin perder desempeño.",
    },
    {
      perfil: "Sectores con Alta Regulación de Datos",
      descricao:
        "Organizaciones financieras, de salud o logística que exigen control total sobre la seguridad y la privacidad de la información.",
    },
    {
      perfil: "Startups y Scaleups",
      descricao:
        "Negocios que están validando nuevos modelos y necesitan MVPs robustos que puedan evolucionar rápidamente hacia productos finales.",
    },
  ],
  casosDeUso: [
    {
      title: "ERP y Gestión Operativa Interna",
      desc: "Centralización de finanzas, inventario, RR. HH. y ventas en una única plataforma integrada y sin redundancias.",
    },
    {
      title: "Portales de Clientes y Partner Portals",
      desc: "Entornos seguros para que sus clientes y socios accedan a documentos, pedidos y soporte de forma autónoma.",
    },
  ],
  glossario: [
    {
      termo: "Escalabilidad",
      definicao:
        "Capacidad de un sistema para manejar una carga de trabajo creciente agregando recursos a la infraestructura.",
    },
    {
      termo: "API (Application Programming Interface)",
      definicao:
        "Conjunto de normas que permite la comunicación entre diferentes plataformas y servicios de software.",
    },
  ],
  problemas: [
    {
      dor: "Cuellos de botella en hojas de cálculo y procesos manuales",
      solucao:
        "Digitalizamos y automatizamos flujos completos, reduciendo el error humano y liberando a su equipo para tareas estratégicas.",
    },
    {
      dor: "Datos descentralizados y falta de visibilidad",
      solucao:
        "Centralizamos toda la información en una única base de datos con dashboards de BI para decisiones basadas en hechos.",
    },
    {
      dor: "Costo elevado de licencias 'por usuario'",
      solucao:
        "Desarrollamos su sistema propio, donde usted tiene control total sobre el número de accesos sin costos adicionales de licencia.",
    },
    {
      dor: "Dificultad de integración entre herramientas",
      solucao:
        "Construimos sistemas con arquitectura abierta que se conectan vía API con cualquier herramienta que su empresa ya utilice.",
    },
  ],
  entregaveis: [
    {
      title: "Arquitectura de Software Sólida",
      desc: "Estructura planificada para soportar alta carga y facilitar el mantenimiento futuro sin deuda técnica.",
      icon: Database,
    },
    {
      title: "Interfaz Intuitiva (UI/UX)",
      desc: "Diseño enfocado en la productividad del usuario final, que reduce el tiempo de capacitación y los errores de operación.",
      icon: Laptop,
    },
    {
      title: "Seguridad de Nivel Bancario",
      desc: "Logs de auditoría, MFA (autenticación de dos factores) y protección contra ataques OWASP.",
      icon: Lock,
    },
    {
      title: "Automatización de Workflows",
      desc: "Motores de reglas que ejecutan tareas repetitivas automáticamente a partir de disparadores específicos.",
      icon: Workflow,
    },
    {
      title: "BI y Dashboards en Tiempo Real",
      desc: "Visualización clara de indicadores de desempeño para el monitoreo continuo de la salud del negocio.",
      icon: BarChart3,
    },
    {
      title: "Soporte y Mantenimiento Proactivo",
      desc: "Monitoreo 24/7 para garantizar que el sistema esté siempre disponible y rindiendo al máximo.",
      icon: Users,
    },
  ],
  stack: [
    { title: "Frontend React/Next.js", desc: "Interfaces rápidas, ricas en interactividad y optimizadas para el usuario." },
    { title: "Backend en Node.js/Go", desc: "Procesamiento de alto desempeño y escalabilidad de servidores." },
    { title: "PostgreSQL Corporativo", desc: "Base de datos relacional robusta para la integridad absoluta de la información." },
    { title: "Docker & Kubernetes", desc: "Infraestructura moderna para despliegues seguros y escalamiento automático." },
  ],
  processo: [
    {
      n: "01",
      title: "Levantamiento de Requisitos",
      desc: "Reuniones detalladas para entender cada matiz de su negocio y definir el alcance funcional del sistema.",
    },
    {
      n: "02",
      title: "Prototipado y Validación",
      desc: "Creación de prototipos navegables para que usted valide la experiencia antes de la codificación final.",
    },
    {
      n: "03",
      title: "Desarrollo e Integración",
      desc: "Codificación en sprints ágiles con demostraciones frecuentes para garantizar una alineación total.",
    },
    {
      n: "04",
      title: "Implantación y Capacitación",
      desc: "Migración de datos, capacitación de los equipos y soporte asistido durante la fase de lanzamiento.",
    },
  ],
  faq: [
    {
      q: "¿Cuál es la diferencia entre un sistema web y una aplicación de escritorio?",
      a: "Los sistemas web se acceden desde el navegador y no requieren instalación en cada equipo, lo que facilita las actualizaciones centralizadas y el acceso desde cualquier lugar con internet. Esto reduce costos de TI y aumenta la agilidad corporativa.",
    },
    {
      q: "¿Cuánto tiempo toma el desarrollo de un software personalizado?",
      a: "El tiempo varía según la complejidad. Los proyectos típicos de MVP (Producto Mínimo Viable) toman entre 8 y 16 semanas. Trabajamos con entregas incrementales para que usted pueda usar partes del sistema durante el desarrollo.",
    },
    {
      q: "¿El sistema web puede integrarse a mi ERP actual (ej.: SAP, Totvs)?",
      a: "Sí. Nos especializamos en crear capas de integración que conectan su nuevo sistema web con sus sistemas legados vía APIs o webhooks, garantizando que los datos fluyan sin interrupciones entre las plataformas.",
    },
    {
      q: "¿Cómo se garantiza la seguridad de los datos en el sistema web?",
      a: "Implementamos múltiples capas de protección, incluidos firewalls de aplicación, cifrado SSL/TLS y controles de acceso estrictos. Realizamos pruebas de vulnerabilidad constantes para garantizar la integridad total del software.",
    },
    {
      q: "¿El software será propiedad de mi empresa después del pago?",
      a: "Sí. Al final del proyecto, el código fuente y todos los activos de propiedad intelectual se transfieren a su empresa. Usted no queda rehén de Vtech Soluções y tiene total libertad tecnológica.",
    },
    {
      q: "¿Cómo ayuda el sistema web al ROI (retorno sobre la inversión)?",
      a: "Mediante la reducción de errores manuales, el ahorro de tiempo del equipo y la centralización de datos que permiten mejores decisiones. En la mayoría de los casos, el sistema se paga en pocos meses gracias a la eficiencia operativa que genera.",
    },
  ],
  relacionados: [
    {
      slug: "integracoes",
      title: "Integración de Sistemas",
      href: "/servicos/integracoes",
      desc: "Conecte su nuevo sistema a todas las demás herramientas que su empresa ya utiliza.",
    },
    {
      slug: "automacoes-com-ia",
      title: "Automatizaciones con IA",
      href: "/servicos/automacoes-com-ia",
      desc: "Potencie su software con inteligencia artificial para análisis de datos y automatización inteligente.",
    },
  ],
  ctaFinalTitle: "¿Listo para modernizar su operación con software de alto nivel",
};

const DATA: L<ServicePageData> = { pt: PT, en: EN, es: ES };

export const Route = createFileRoute("/servicos/sistemas-web")({
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
            serviceType: "Custom Software Development",
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
