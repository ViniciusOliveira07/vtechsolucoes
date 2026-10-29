import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Blocks, Webhook, CreditCard, Boxes, RefreshCw, ShieldCheck } from "lucide-react";
import { ServicePageLayout, type ServicePageData } from "@/components/site/ServicePageLayout";
import { buildBreadcrumbSchema, buildServiceSchema } from "@/lib/service-schema";
import { Events } from "@/lib/analytics";
import { getService, jsonLd, localizedUrl, seo } from "@/lib/site";
import { pick, useT, type L } from "@/lib/i18n";

const SLUG = "integracoes" as const;
const PATH = `/servicos/${SLUG}`;

// Título/descrição do head e nomes usados no JSON-LD (Service e Breadcrumb)
const HEAD: L<{ title: string; description: string; schemaName: string; crumb: string }> = {
  pt: {
    title: "Integrações de Sistemas, ERPs e APIs | Vtech Soluções",
    description:
      "Integramos ERP, CRM, gateways de pagamento e APIs internas. Fim do retrabalho manual entre sistemas. Diagnóstico em 7 dias.",
    schemaName: "Integração de Sistemas",
    crumb: "Integrações",
  },
  en: {
    title: "Systems, ERP and API Integration | Vtech Soluções",
    description:
      "We integrate ERP, CRM, payment gateways and internal APIs. No more manual rework between systems. Diagnosis in 7 days.",
    schemaName: "Systems Integration",
    crumb: "Integrations",
  },
  es: {
    title: "Integración de Sistemas, ERPs y APIs | Vtech Soluções",
    description:
      "Integramos ERP, CRM, pasarelas de pago y APIs internas. Fin del retrabajo manual entre sistemas. Diagnóstico en 7 días.",
    schemaName: "Integración de Sistemas",
    crumb: "Integraciones",
  },
};

const PT: ServicePageData = {
  slug: SLUG,
  eyebrow: getService(SLUG, "pt").title,
  h1: "Integração de sistemas: ERP, CRM e pagamentos sem retrabalho.",
  subheadline:
    "Elimine o retrabalho manual e a inconsistência de dados integrando seus ERPs, CRMs e gateways. Soluções robustas de middleware que garantem fluxos de informação contínuos e seguros.",
  trust: ["Diagnóstico técnico em 7 dias", "Idempotência e segurança de dados", "Suporte a grandes volumes de requisição"],
  oQueE: {
    title: "O que é integração de sistemas e APIs corporativas",
    paragrafos: [
      "A integração de sistemas — também conhecida como system integration ou middleware empresarial — é o processo tecnológico de conectar diferentes softwares e plataformas para que trabalhem de forma unificada. No cenário B2B, onde as empresas utilizam diversas ferramentas para gestão (ERP), vendas (CRM), logística e pagamentos, a integração é o 'tecido conectivo' que permite que a informação flua automaticamente, sem a necessidade de intervenção humana ou redigitação de dados.",
      "Através da utilização de APIs (Application Programming Interfaces), webhooks e barramentos de serviços, criamos ecossistemas onde um evento em um sistema (como uma venda no e-commerce) dispara automaticamente ações em outros sistemas (como a emissão de nota fiscal no ERP e a atualização de estoque no WMS). Isso não apenas acelera a operação, mas elimina drasticamente o erro humano, garantindo que a base de dados da sua empresa seja única, íntegra e confiável para tomadas de decisão estratégica.",
      "Na Vtech Soluções, desenvolvemos integrações de alta confiabilidade utilizando técnicas de idempotência (garantindo que uma transação nunca seja processada em duplicidade) e filas de mensagens com retry automático. Isso significa que, mesmo se um sistema de terceiro ficar temporariamente fora do ar, nossa arquitetura de integração retém a informação e a processa assim que a conexão for restabelecida, evitando perda de pedidos ou falhas financeiras críticas.",
      "A integração moderna também envolve a segurança rigorosa dos dados em trânsito. Utilizamos protocolos de autenticação avançados e criptografia de ponta a ponta, garantindo que informações sensíveis de clientes e da própria empresa estejam protegidas contra acessos não autorizados. Integrar sistemas é, em última análise, investir na escalabilidade do negócio, permitindo que a operação cresça em volume sem a necessidade de aumentar proporcionalmente a equipe administrativa.",
    ],

  },
  paraQuem: [
    {
      perfil: "E-commerces e Marketplaces B2B",
      descricao:
        "Lojas virtuais que precisam sincronizar estoque, preços e pedidos em múltiplos canais de venda simultaneamente.",
    },
    {
      perfil: "Empresas em Fase de Expansão",
      descricao:
        "Organizações que estão adotando novas ferramentas e precisam que o ecossistema atual converse com as novas soluções sem atritos.",
    },
    {
      perfil: "Indústrias e Operações Logísticas",
      descricao:
        "Negócios que exigem que o chão de fábrica esteja conectado ao PCP e ao faturamento para visibilidade total da produção.",
    },
    {
      perfil: "Gestoras de Cobrança e Recorrência",
      descricao:
        "Empresas financeiras que precisam integrar gateways de pagamento com sistemas de conciliação bancária e ERPs.",
    },
  ],
  casosDeUso: [
    {
      title: "Integração Bidirecional ERP ↔ CRM",
      desc: "Sincronização em tempo real de clientes e oportunidades, garantindo que o time comercial veja o que o financeiro já faturou.",
    },
    {
      title: "Automação de Checkout e Pagamentos",
      desc: "Conexão de gateways como Stripe, Mercado Pago ou Asaas diretamente ao seu sistema de gestão para baixa automática.",
    },
  ],
  glossario: [
    {
      termo: "Webhook",
      definicao:
        "Notificação automática enviada de um servidor para outro quando um evento específico ocorre (ex: pagamento aprovado).",
    },
    {
      termo: "Idempotência",
      definicao:
        "Garantia técnica de que repetir uma operação várias vezes terá o mesmo resultado que executá-la uma única vez, evitando duplicidade.",
    },
  ],
  problemas: [
    {
      dor: "Digitação dupla e retrabalho manual constante",
      solucao:
        "Automatizamos a transferência de dados entre sistemas, liberando horas de trabalho da sua equipe e eliminando erros de digitação.",
    },
    {
      dor: "Dados divergentes entre diferentes departamentos",
      solucao:
        "Implementamos sincronização em tempo real para que todos os setores trabalhem com a mesma versão da verdade.",
    },
    {
      dor: "Lentidão para processar pedidos e informações",
      solucao:
        "Integrações de alta performance que executam tarefas em milissegundos, acelerando o ciclo de vendas e entrega.",
    },
    {
      dor: "Dificuldade de visibilidade consolidada do negócio",
      solucao:
        "Centralizamos informações de múltiplos sistemas em um único ponto de consulta ou dashboard gerencial.",
    },
  ],
  entregaveis: [
    {
      title: "Conectores de ERP Customizados",
      desc: "Integração com SAP, TOTVS, Bling, Omie e outros sistemas de gestão líderes de mercado.",
      icon: Blocks,
    },
    {
      title: "Webhooks e Listeners de Eventos",
      desc: "Arquitetura reativa que processa informações no instante em que elas acontecem na origem.",
      icon: Webhook,
    },
    {
      title: "Integração de Meios de Pagamento",
      desc: "Checkout transparente e conciliação automática com os principais gateways nacionais e internacionais.",
      icon: CreditCard,
    },
    {
      title: "Middleware de Orquestração",
      desc: "Camada lógica que traduz e padroniza dados entre sistemas com formatos diferentes.",
      icon: Boxes,
    },
    {
      title: "Sincronização de Dados em Lote (ETL)",
      desc: "Processamento de grandes volumes de dados para migrações ou relatórios periódicos complexos.",
      icon: RefreshCw,
    },
    {
      title: "Logging e Monitoramento de Falhas",
      desc: "Sistema de alerta proativo que avisa sua equipe se qualquer integração apresentar instabilidade.",
      icon: ShieldCheck,
    },
  ],
  stack: [
    { title: "Node.js & TypeScript", desc: "Desenvolvimento de integrações type-safe e de alta confiabilidade." },
    { title: "Redis & Message Queues", desc: "Gestão de filas para garantir que nenhuma mensagem seja perdida em caso de instabilidade." },
    { title: "REST & GraphQL", desc: "Protocolos modernos de comunicação para máxima flexibilidade e performance." },
    { title: "Docker & Cloud Functions", desc: "Deploy escalável e isolado para cada componente da integração." },
  ],
  processo: [
    {
      n: "01",
      title: "Mapeamento de Fluxos",
      desc: "Identificamos todos os sistemas envolvidos e como a informação deve trafegar entre eles.",
    },
    {
      n: "02",
      title: "Definição de Contratos de API",
      desc: "Padronizamos o formato dos dados para garantir que a conversa entre os sistemas seja perfeita.",
    },
    {
      n: "03",
      title: "Desenvolvimento e Testes de Stress",
      desc: "Construímos a integração e realizamos testes de carga para garantir estabilidade em cenários reais.",
    },
    {
      n: "04",
      title: "Monitoramento em Produção",
      desc: "Lançamento assistido com ferramentas de observabilidade para acompanhar cada transação integrada.",
    },
  ],
  faq: [
    {
      q: "É possível integrar sistemas antigos que não têm API?",
      a: "Sim. Muitas vezes conseguimos integrar via acesso direto ao banco de dados ou utilizando técnicas de RPA (Robotic Process Automation) para ler e escrever dados onde não há uma interface de programação disponível.",
    },
    {
      q: "O que acontece se a internet ou um dos sistemas cair?",
      a: "Nossas integrações utilizam sistemas de filas. Se o destino estiver fora do ar, a informação fica retida com segurança e a integração tenta novamente de forma automática assim que o sistema retornar, sem perda de dados.",
    },
    {
      q: "Vocês integram com ERPs brasileiros como Bling, Omie e Totvs?",
      a: "Sim, temos vasta experiência com as APIs dos principais ERPs do mercado brasileiro. Conhecemos as particularidades fiscais e de estoque necessárias para uma integração bem-sucedida no Brasil.",
    },
    {
      q: "Como é garantida a segurança das informações integradas?",
      a: "Utilizamos criptografia SSL/TLS em todas as comunicações, além de autenticação via tokens seguros (OAuth2). Também implementamos logs de auditoria para que você saiba exatamente o que foi alterado e por quem.",
    },
    {
      q: "Quanto tempo demora para implementar uma integração?",
      a: "Integrações pontuais podem ser feitas em poucos dias. Projetos mais complexos, que envolvem múltiplos sistemas e regras de negócio profundas, podem levar de 2 a 6 semanas para serem concluídos com segurança total.",
    },
    {
      q: "Qual o benefício real de integrar em vez de fazer manualmente?",
      a: "O benefício é a escala e a precisão. Um humano leva minutos para processar um pedido manualmente; a integração faz isso em segundos, 24 horas por dia, 7 dias por semana, com 0% de erro de digitação.",
    },
  ],
  relacionados: [
    {
      slug: "sistemas-web",
      title: "Sistemas Web Personalizados",
      href: "/servicos/sistemas-web",
      desc: "Crie a plataforma central que irá orquestrar todas as suas integrações de negócio.",
    },
    {
      slug: "automacoes-com-ia",
      title: "Automações com IA",
      href: "/servicos/automacoes-com-ia",
      desc: "Adicione camadas de inteligência artificial para processar e classificar os dados integrados.",
    },
  ],
  ctaFinalTitle: "Pronto para conectar sua empresa e eliminar o trabalho manual",
};

const EN: ServicePageData = {
  slug: SLUG,
  eyebrow: getService(SLUG, "en").title,
  h1: "Systems integration: ERP, CRM and payments without rework.",
  subheadline:
    "Eliminate manual rework and inconsistent data by integrating your ERPs, CRMs and payment gateways. Robust middleware that keeps information flowing continuously and securely.",
  trust: ["Technical diagnosis in 7 days", "Idempotency and data security", "Built for high request volumes"],
  oQueE: {
    title: "What systems and corporate API integration is",
    paragrafos: [
      "Systems integration, also known as enterprise middleware, is the process of connecting different software and platforms so they work as one. In B2B, where companies use separate tools for management (ERP), sales (CRM), logistics and payments, integration is the connective tissue that lets information flow automatically, with no human intervention or retyping of data.",
      "Using APIs (Application Programming Interfaces), webhooks and service buses, we build environments where an event in one system (such as an e-commerce sale) automatically triggers actions in others (such as issuing the invoice in the ERP and updating stock in the WMS). This speeds up the operation and drastically reduces human error, so your company's data is single, consistent and reliable for strategic decisions.",
      "At Vtech Soluções, we build high-reliability integrations using idempotency (ensuring a transaction is never processed twice) and message queues with automatic retry. Even if a third-party system goes down temporarily, our integration architecture holds the information and processes it as soon as the connection is back, avoiding lost orders or critical financial failures.",
      "Modern integration also means strict security for data in transit. We use advanced authentication protocols and end-to-end encryption, so sensitive customer and company information is protected against unauthorized access. Ultimately, integrating systems is an investment in scalability: the operation can grow in volume without growing the administrative team at the same rate.",
    ],
  },
  paraQuem: [
    {
      perfil: "B2B E-commerce and Marketplaces",
      descricao:
        "Online stores that need to sync stock, prices and orders across multiple sales channels at the same time.",
    },
    {
      perfil: "Companies in Expansion",
      descricao:
        "Organizations adopting new tools that need their current stack to work with the new solutions without friction.",
    },
    {
      perfil: "Manufacturing and Logistics Operations",
      descricao:
        "Businesses that need the shop floor connected to production planning and billing for full visibility of production.",
    },
    {
      perfil: "Collections and Recurring Billing Companies",
      descricao:
        "Financial companies that need to integrate payment gateways with bank reconciliation systems and ERPs.",
    },
  ],
  casosDeUso: [
    {
      title: "Two-Way ERP ↔ CRM Integration",
      desc: "Real-time sync of customers and opportunities, so the sales team sees what finance has already billed.",
    },
    {
      title: "Checkout and Payment Automation",
      desc: "Connecting gateways such as Stripe, Mercado Pago or Asaas directly to your management system for automatic settlement.",
    },
  ],
  glossario: [
    {
      termo: "Webhook",
      definicao:
        "An automatic notification sent from one server to another when a specific event occurs (e.g., payment approved).",
    },
    {
      termo: "Idempotency",
      definicao:
        "A technical guarantee that repeating an operation several times has the same result as running it once, preventing duplicates.",
    },
  ],
  problemas: [
    {
      dor: "Double data entry and constant manual rework",
      solucao:
        "We automate data transfer between systems, freeing up hours of your team's time and eliminating typing errors.",
    },
    {
      dor: "Conflicting data across departments",
      solucao:
        "We implement real-time sync so every department works from the same version of the truth.",
    },
    {
      dor: "Slow processing of orders and information",
      solucao:
        "High-performance integrations that run tasks in milliseconds, speeding up the sales and delivery cycle.",
    },
    {
      dor: "No consolidated view of the business",
      solucao:
        "We bring information from multiple systems into a single point of reference or management dashboard.",
    },
  ],
  entregaveis: [
    {
      title: "Custom ERP Connectors",
      desc: "Integration with SAP, TOTVS, Bling, Omie and other leading management systems.",
      icon: Blocks,
    },
    {
      title: "Webhooks and Event Listeners",
      desc: "Reactive architecture that processes information the moment it happens at the source.",
      icon: Webhook,
    },
    {
      title: "Payment Method Integration",
      desc: "Embedded checkout and automatic reconciliation with the main Brazilian and international gateways.",
      icon: CreditCard,
    },
    {
      title: "Orchestration Middleware",
      desc: "A logic layer that translates and standardizes data between systems with different formats.",
      icon: Boxes,
    },
    {
      title: "Batch Data Sync (ETL)",
      desc: "Processing large volumes of data for migrations or complex periodic reports.",
      icon: RefreshCw,
    },
    {
      title: "Failure Logging and Monitoring",
      desc: "Proactive alerting that notifies your team if any integration becomes unstable.",
      icon: ShieldCheck,
    },
  ],
  stack: [
    { title: "Node.js & TypeScript", desc: "Type-safe, high-reliability integration development." },
    { title: "Redis & Message Queues", desc: "Queue management so no message is lost when something becomes unstable." },
    { title: "REST & GraphQL", desc: "Modern communication protocols for maximum flexibility and performance." },
    { title: "Docker & Cloud Functions", desc: "Scalable, isolated deployment for each integration component." },
  ],
  processo: [
    {
      n: "01",
      title: "Flow Mapping",
      desc: "We identify every system involved and how information should travel between them.",
    },
    {
      n: "02",
      title: "API Contract Definition",
      desc: "We standardize the data format so the systems communicate without gaps.",
    },
    {
      n: "03",
      title: "Development and Stress Testing",
      desc: "We build the integration and run load tests to ensure stability in real scenarios.",
    },
    {
      n: "04",
      title: "Production Monitoring",
      desc: "Assisted launch with observability tools to track every integrated transaction.",
    },
  ],
  faq: [
    {
      q: "Can you integrate legacy systems that have no API?",
      a: "Yes. We can often integrate through direct database access or RPA (Robotic Process Automation) techniques to read and write data where no programming interface is available.",
    },
    {
      q: "What happens if the internet or one of the systems goes down?",
      a: "Our integrations use queues. If the destination is down, the information is held safely and the integration retries automatically as soon as the system is back, with no data loss.",
    },
    {
      q: "Do you integrate with Brazilian ERPs such as Bling, Omie and Totvs?",
      a: "Yes, we have extensive experience with the APIs of the main ERPs in the Brazilian market. We know the tax and inventory specifics required for a successful integration in Brazil.",
    },
    {
      q: "How is the security of integrated information ensured?",
      a: "We use SSL/TLS encryption on all communications and authentication through secure tokens (OAuth2). We also implement audit logs so you know exactly what was changed and by whom.",
    },
    {
      q: "How long does it take to implement an integration?",
      a: "Point integrations can be done in a few days. More complex projects, involving multiple systems and deep business rules, can take 2 to 6 weeks to complete safely.",
    },
    {
      q: "What is the real benefit of integrating instead of doing it manually?",
      a: "Scale and accuracy. A person takes minutes to process an order by hand; the integration does it in seconds, 24 hours a day, 7 days a week, with zero typing errors.",
    },
  ],
  relacionados: [
    {
      slug: "sistemas-web",
      title: "Custom Web Systems",
      href: "/servicos/sistemas-web",
      desc: "Build the central platform that will orchestrate all your business integrations.",
    },
    {
      slug: "automacoes-com-ia",
      title: "AI Automations",
      href: "/servicos/automacoes-com-ia",
      desc: "Add artificial intelligence layers to process and classify the integrated data.",
    },
  ],
  ctaFinalTitle: "Ready to connect your company and eliminate manual work",
};

const ES: ServicePageData = {
  slug: SLUG,
  eyebrow: getService(SLUG, "es").title,
  h1: "Integración de sistemas: ERP, CRM y pagos sin retrabajo.",
  subheadline:
    "Elimine el retrabajo manual y la inconsistencia de datos integrando sus ERPs, CRMs y pasarelas de pago. Soluciones robustas de middleware que garantizan flujos de información continuos y seguros.",
  trust: ["Diagnóstico técnico en 7 días", "Idempotencia y seguridad de datos", "Soporte para grandes volúmenes de solicitudes"],
  oQueE: {
    title: "Qué es la integración de sistemas y APIs corporativas",
    paragrafos: [
      "La integración de sistemas, también conocida como system integration o middleware empresarial, es el proceso tecnológico de conectar diferentes softwares y plataformas para que trabajen de forma unificada. En el escenario B2B, donde las empresas utilizan diversas herramientas para gestión (ERP), ventas (CRM), logística y pagos, la integración es el 'tejido conectivo' que permite que la información fluya automáticamente, sin intervención humana ni redigitación de datos.",
      "Mediante APIs (Application Programming Interfaces), webhooks y buses de servicios, creamos ecosistemas donde un evento en un sistema (como una venta en el e-commerce) dispara automáticamente acciones en otros sistemas (como la emisión de la factura en el ERP y la actualización del inventario en el WMS). Esto no solo acelera la operación, sino que elimina drásticamente el error humano, garantizando que la base de datos de su empresa sea única, íntegra y confiable para la toma de decisiones estratégicas.",
      "En Vtech Soluções desarrollamos integraciones de alta confiabilidad utilizando técnicas de idempotencia (que garantizan que una transacción nunca se procese en duplicado) y colas de mensajes con reintento automático. Esto significa que, aunque un sistema de terceros quede temporalmente fuera de servicio, nuestra arquitectura de integración retiene la información y la procesa en cuanto se restablece la conexión, evitando la pérdida de pedidos o fallas financieras críticas.",
      "La integración moderna también implica una seguridad rigurosa de los datos en tránsito. Utilizamos protocolos de autenticación avanzados y cifrado de punta a punta, garantizando que la información sensible de los clientes y de la propia empresa esté protegida contra accesos no autorizados. Integrar sistemas es, en última instancia, invertir en la escalabilidad del negocio, permitiendo que la operación crezca en volumen sin necesidad de aumentar proporcionalmente el equipo administrativo.",
    ],
  },
  paraQuem: [
    {
      perfil: "E-commerces y Marketplaces B2B",
      descricao:
        "Tiendas virtuales que necesitan sincronizar inventario, precios y pedidos en múltiples canales de venta al mismo tiempo.",
    },
    {
      perfil: "Empresas en Fase de Expansión",
      descricao:
        "Organizaciones que están adoptando nuevas herramientas y necesitan que su ecosistema actual se comunique con las nuevas soluciones sin fricciones.",
    },
    {
      perfil: "Industrias y Operaciones Logísticas",
      descricao:
        "Negocios que exigen que la planta de producción esté conectada a la planificación de la producción y a la facturación para tener visibilidad total.",
    },
    {
      perfil: "Gestoras de Cobranza y Recurrencia",
      descricao:
        "Empresas financieras que necesitan integrar pasarelas de pago con sistemas de conciliación bancaria y ERPs.",
    },
  ],
  casosDeUso: [
    {
      title: "Integración Bidireccional ERP ↔ CRM",
      desc: "Sincronización en tiempo real de clientes y oportunidades, para que el equipo comercial vea lo que finanzas ya facturó.",
    },
    {
      title: "Automatización de Checkout y Pagos",
      desc: "Conexión de pasarelas como Stripe, Mercado Pago o Asaas directamente a su sistema de gestión para la conciliación automática.",
    },
  ],
  glossario: [
    {
      termo: "Webhook",
      definicao:
        "Notificación automática enviada de un servidor a otro cuando ocurre un evento específico (ej.: pago aprobado).",
    },
    {
      termo: "Idempotencia",
      definicao:
        "Garantía técnica de que repetir una operación varias veces tendrá el mismo resultado que ejecutarla una sola vez, evitando duplicados.",
    },
  ],
  problemas: [
    {
      dor: "Doble digitación y retrabajo manual constante",
      solucao:
        "Automatizamos la transferencia de datos entre sistemas, liberando horas de trabajo de su equipo y eliminando errores de digitación.",
    },
    {
      dor: "Datos divergentes entre departamentos",
      solucao:
        "Implementamos sincronización en tiempo real para que todas las áreas trabajen con la misma versión de la verdad.",
    },
    {
      dor: "Lentitud para procesar pedidos e información",
      solucao:
        "Integraciones de alto desempeño que ejecutan tareas en milisegundos, acelerando el ciclo de ventas y entrega.",
    },
    {
      dor: "Dificultad para tener una visión consolidada del negocio",
      solucao:
        "Centralizamos la información de múltiples sistemas en un único punto de consulta o dashboard gerencial.",
    },
  ],
  entregaveis: [
    {
      title: "Conectores de ERP Personalizados",
      desc: "Integración con SAP, TOTVS, Bling, Omie y otros sistemas de gestión líderes del mercado.",
      icon: Blocks,
    },
    {
      title: "Webhooks y Listeners de Eventos",
      desc: "Arquitectura reactiva que procesa la información en el instante en que ocurre en el origen.",
      icon: Webhook,
    },
    {
      title: "Integración de Medios de Pago",
      desc: "Checkout transparente y conciliación automática con las principales pasarelas nacionales e internacionales.",
      icon: CreditCard,
    },
    {
      title: "Middleware de Orquestación",
      desc: "Capa lógica que traduce y estandariza datos entre sistemas con formatos diferentes.",
      icon: Boxes,
    },
    {
      title: "Sincronización de Datos por Lotes (ETL)",
      desc: "Procesamiento de grandes volúmenes de datos para migraciones o informes periódicos complejos.",
      icon: RefreshCw,
    },
    {
      title: "Logging y Monitoreo de Fallas",
      desc: "Sistema de alertas proactivo que avisa a su equipo si alguna integración presenta inestabilidad.",
      icon: ShieldCheck,
    },
  ],
  stack: [
    { title: "Node.js & TypeScript", desc: "Desarrollo de integraciones type-safe y de alta confiabilidad." },
    { title: "Redis & Message Queues", desc: "Gestión de colas para garantizar que ningún mensaje se pierda en caso de inestabilidad." },
    { title: "REST & GraphQL", desc: "Protocolos modernos de comunicación para máxima flexibilidad y desempeño." },
    { title: "Docker & Cloud Functions", desc: "Despliegue escalable y aislado para cada componente de la integración." },
  ],
  processo: [
    {
      n: "01",
      title: "Mapeo de Flujos",
      desc: "Identificamos todos los sistemas involucrados y cómo debe circular la información entre ellos.",
    },
    {
      n: "02",
      title: "Definición de Contratos de API",
      desc: "Estandarizamos el formato de los datos para garantizar que la comunicación entre los sistemas sea perfecta.",
    },
    {
      n: "03",
      title: "Desarrollo y Pruebas de Estrés",
      desc: "Construimos la integración y realizamos pruebas de carga para garantizar estabilidad en escenarios reales.",
    },
    {
      n: "04",
      title: "Monitoreo en Producción",
      desc: "Lanzamiento asistido con herramientas de observabilidad para seguir cada transacción integrada.",
    },
  ],
  faq: [
    {
      q: "¿Es posible integrar sistemas antiguos que no tienen API?",
      a: "Sí. Muchas veces logramos integrar mediante acceso directo a la base de datos o con técnicas de RPA (Robotic Process Automation) para leer y escribir datos donde no hay una interfaz de programación disponible.",
    },
    {
      q: "¿Qué pasa si se cae internet o uno de los sistemas?",
      a: "Nuestras integraciones utilizan sistemas de colas. Si el destino está fuera de servicio, la información queda retenida de forma segura y la integración vuelve a intentar automáticamente en cuanto el sistema regresa, sin pérdida de datos.",
    },
    {
      q: "¿Integran con ERPs brasileños como Bling, Omie y Totvs?",
      a: "Sí, tenemos amplia experiencia con las APIs de los principales ERPs del mercado brasileño. Conocemos las particularidades fiscales y de inventario necesarias para una integración exitosa en Brasil.",
    },
    {
      q: "¿Cómo se garantiza la seguridad de la información integrada?",
      a: "Utilizamos cifrado SSL/TLS en todas las comunicaciones, además de autenticación mediante tokens seguros (OAuth2). También implementamos logs de auditoría para que usted sepa exactamente qué se modificó y quién lo hizo.",
    },
    {
      q: "¿Cuánto tiempo toma implementar una integración?",
      a: "Las integraciones puntuales pueden hacerse en pocos días. Los proyectos más complejos, que involucran múltiples sistemas y reglas de negocio profundas, pueden tomar de 2 a 6 semanas para completarse con total seguridad.",
    },
    {
      q: "¿Cuál es el beneficio real de integrar en lugar de hacerlo manualmente?",
      a: "El beneficio es la escala y la precisión. Una persona tarda minutos en procesar un pedido manualmente; la integración lo hace en segundos, 24 horas al día, 7 días a la semana, con 0% de error de digitación.",
    },
  ],
  relacionados: [
    {
      slug: "sistemas-web",
      title: "Sistemas Web Personalizados",
      href: "/servicos/sistemas-web",
      desc: "Cree la plataforma central que orquestará todas sus integraciones de negocio.",
    },
    {
      slug: "automacoes-com-ia",
      title: "Automatizaciones con IA",
      href: "/servicos/automacoes-com-ia",
      desc: "Agregue capas de inteligencia artificial para procesar y clasificar los datos integrados.",
    },
  ],
  ctaFinalTitle: "¿Listo para conectar su empresa y eliminar el trabajo manual",
};

const DATA: L<ServicePageData> = { pt: PT, en: EN, es: ES };

export const Route = createFileRoute("/servicos/integracoes")({
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
            serviceType: "Systems Integration",
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
