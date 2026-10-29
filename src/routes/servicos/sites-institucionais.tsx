import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Globe, Gauge, Search, Sparkles, Smartphone, ShieldCheck } from "lucide-react";
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

const SLUG = "sites-institucionais" as const;
const PATH = `/servicos/${SLUG}`;

// Título/descrição do head e nomes usados no JSON-LD (Service e Breadcrumb)
const HEAD: L<{ title: string; description: string; schemaName: string; crumb: string }> = {
  pt: {
    title: "Sites Institucionais B2B sob medida | Vtech Soluções",
    description:
      "Site institucional premium com SEO técnico, performance Core Web Vitals e identidade estúdio. Entrega em 30 dias. Solicite proposta.",
    schemaName: "Sites Institucionais B2B",
    crumb: "Sites Institucionais",
  },
  en: {
    title: "Custom B2B Corporate Websites | Vtech Soluções",
    description:
      "Premium corporate website with technical SEO, Core Web Vitals performance and studio-grade identity. Delivered in 30 days. Request a proposal.",
    schemaName: "B2B Corporate Websites",
    crumb: "Corporate Websites",
  },
  es: {
    title: "Sitios Institucionales B2B a medida | Vtech Soluções",
    description:
      "Sitio institucional premium con SEO técnico, desempeño en Core Web Vitals e identidad de estudio. Entrega en 30 días. Solicite una propuesta.",
    schemaName: "Sitios Institucionales B2B",
    crumb: "Sitios Institucionales",
  },
};

const PT: ServicePageData = {
  slug: SLUG,
  eyebrow: getService(SLUG, "pt").title,
  h1: "Sites institucionais B2B que geram oportunidades.",
  subheadline:
    "Desenvolvemos sites institucionais premium focados em conversão, performance Core Web Vitals e autoridade de marca. A solução ideal para empresas B2B que buscam expansão digital e credibilidade no mercado corporativo.",
  trust: ["Entrega em até 30 dias", "Otimização SEO de alta performance", "Código proprietário e seguro"],
  oQueE: {
    title: "O que é um site institucional B2B de alta performance",
    paragrafos: [
      "Um site institucional B2B é muito mais do que um cartão de visitas digital; é a base da sua estratégia de marketing e vendas no ambiente corporativo. Em 2024 e 2025, a presença digital de uma empresa tornou-se o principal critério de desempate em negociações de alto ticket. Um site bem estruturado comunica maturidade, solidez e clareza de proposta de valor, sendo o ponto central de contato entre sua marca e parceiros estratégicos, investidores e clientes em potencial.",
      "O desenvolvimento de um site institucional moderno exige a integração de design de ponta com tecnologia de última geração. Na Vtech Soluções, utilizamos stacks como React 19 e SSR (Server-Side Rendering) para garantir que sua empresa não apenas tenha um visual impressionante, mas também carregue instantaneamente em qualquer dispositivo. A arquitetura de informação é pensada para guiar o usuário em uma jornada de confiança, desde o primeiro impacto no Hero até a conversão final em nossos formulários otimizados.",
      "Além da estética, focamos intensamente no SEO técnico (Search Engine Optimization). Isso significa que cada página é construída para ser facilmente indexada pelo Google, utilizando marcações de dados estruturados (Schema.org), sitemaps dinâmicos e otimização de metadados. Um site institucional de alto padrão deve ser uma ferramenta ativa de geração de demanda, servindo como o pilar de autoridade que sustenta sua reputação no mercado brasileiro e global.",
      "Através da transformação digital, ajudamos empresas a saírem de sistemas obsoletos e limitados, como WordPress mal configurado, para ecossistemas digitais ágeis, seguros e escaláveis. Nosso foco é garantir que sua infraestrutura web suporte o crescimento do seu negócio, oferecendo flexibilidade para atualizações constantes sem comprometer a estabilidade ou a velocidade do sistema.",
    ],

  },
  paraQuem: [
    {
      perfil: "Indústrias e Manufaturas",
      descricao:
        "Para fábricas que precisam apresentar catálogos técnicos complexos e gerar leads qualificados em feiras e buscas orgânicas.",
    },
    {
      perfil: "Escritórios de Advocacia e Consultorias",
      descricao:
        "Profissionais que vendem conhecimento e autoridade, onde o design do site é a prova social imediata de competência.",
    },
    {
      perfil: "Empresas de Tecnologia e SaaS",
      descricao:
        "Negócios que precisam demonstrar inovação constante através de uma interface moderna, rápida e integrada.",
    },
    {
      perfil: "Holdings e Grupos Empresariais",
      descricao:
        "Corporações que buscam uma comunicação unificada e robusta para investidores e stakeholders de diversos setores.",
    },
  ],
  casosDeUso: [
    {
      title: "Migração e Rebranding Digital",
      desc: "Atualização completa de sites antigos para novas identidades visuais, mantendo o ranking de SEO acumulado por anos.",
    },
    {
      title: "Portais de Conteúdo e Liderança de Pensamento",
      desc: "Criação de áreas de blog e notícias com alta performance para atrair tráfego qualificado via marketing de conteúdo.",
    },
  ],
  glossario: [
    {
      termo: "Core Web Vitals",
      definicao:
        "Conjunto de métricas do Google que medem a velocidade de carregamento, interatividade e estabilidade visual do site.",
    },
    {
      termo: "Schema Markup",
      definicao:
        "Código adicionado ao site para ajudar os motores de busca a entender o conteúdo e exibir resultados mais ricos (Rich Snippets).",
    },
  ],
  problemas: [
    {
      dor: "Site ultrapassado que afasta clientes premium",
      solucao:
        "Implementamos um design contemporâneo e editorial que reflete a real qualidade e o valor dos seus serviços B2B.",
    },
    {
      dor: "Baixa visibilidade no Google (SEO deficiente)",
      solucao:
        "Realizamos uma auditoria completa de palavras-chave e implementamos SEO on-page técnico para ranqueamento superior.",
    },
    {
      dor: "Dificuldade de navegação em dispositivos móveis",
      solucao:
        "Desenvolvimento Mobile-First, garantindo que a experiência do seu cliente seja perfeita tanto no smartphone quanto no desktop.",
    },
    {
      dor: "Lentidão extrema e erros de carregamento",
      solucao:
        "Utilizamos infraestrutura em Edge Computing para entregar seu site em milissegundos, reduzindo a taxa de rejeição.",
    },
  ],
  entregaveis: [
    {
      title: "Design Exclusivo e Autoral",
      desc: "Nada de templates prontos. Criamos uma interface única alinhada ao seu manual de marca e posicionamento.",
      icon: Sparkles,
    },
    {
      title: "Performance e Velocidade Máxima",
      desc: "Otimização rigorosa de imagens e scripts para atingir notas máximas no Google PageSpeed Insights.",
      icon: Gauge,
    },
    {
      title: "Segurança de Nível Corporativo",
      desc: "Proteção contra ataques, SSL nativo e código limpo, eliminando vulnerabilidades comuns de plataformas populares.",
      icon: ShieldCheck,
    },
    {
      title: "SEO Técnico e Estruturado",
      desc: "Implementação de sitemaps, robots.txt, canonical tags e microdados para domínio total das buscas orgânicas.",
      icon: Search,
    },
    {
      title: "Gestão de Conteúdo Simplificada",
      desc: "Painel intuitivo para sua equipe atualizar textos, imagens e posts sem depender de desenvolvedores.",
      icon: Smartphone,
    },
    {
      title: "Integração com Ecossistema de Vendas",
      desc: "Conectamos seu site ao CRM (Salesforce, HubSpot, RD Station) para rastrear cada lead gerado.",
      icon: Globe,
    },
  ],
  stack: [
    { title: "React 19 + TanStack Start", desc: "A tecnologia mais moderna para sites ultra-rápidos e dinâmicos." },
    { title: "Tailwind CSS v4", desc: "Design consistente e carregamento de estilos otimizado." },
    { title: "Cloudflare Edge", desc: "Seu site hospedado na rede mais rápida e segura do mundo." },
    { title: "TypeScript", desc: "Código robusto, livre de erros e fácil de manter a longo prazo." },
  ],
  processo: [
    {
      n: "01",
      title: "Imersão e Diagnóstico",
      desc: "Analisamos seu mercado, concorrentes e objetivos de negócio para traçar a melhor estratégia digital.",
    },
    {
      n: "02",
      title: "Arquitetura e UX Design",
      desc: "Desenhamos a jornada do usuário e a estrutura de conteúdo focada em usabilidade e conversão de leads.",
    },
    {
      n: "03",
      title: "Desenvolvimento Ágil",
      desc: "Codificamos o site utilizando as melhores práticas de engenharia de software e otimização SEO.",
    },
    {
      n: "04",
      title: "QA e Lançamento",
      desc: "Testes rigorosos em múltiplos dispositivos seguidos pelo deploy monitorado e indexação nos motores de busca.",
    },
  ],
  faq: [
    {
      q: "Qual a importância de um site institucional para o SEO da minha empresa?",
      a: "Um site institucional bem otimizado é a âncora da sua presença digital. Ele permite que sua empresa seja encontrada por termos específicos do seu setor (long tail keywords), estabelecendo autoridade e reduzindo custos com anúncios pagos a longo prazo através do tráfego orgânico qualificado.",
    },
    {
      q: "Como a Vtech Soluções garante a velocidade de carregamento do site?",
      a: "Utilizamos Server-Side Rendering (SSR) e otimização automática de ativos. Isso garante que o conteúdo principal seja entregue instantaneamente, o que é um fator crítico para o ranking no Google e para evitar que potenciais clientes abandonem a página devido à lentidão.",
    },
    {
      q: "O site institucional é compatível com dispositivos móveis (responsivo)?",
      a: "Sim, todos os nossos projetos são desenvolvidos sob a filosofia Mobile-First. Isso garante que a experiência do usuário seja fluida e profissional em qualquer tamanho de tela, o que é essencial visto que a maioria das buscas B2B hoje começa no celular.",
    },
    {
      q: "É possível integrar o site com ferramentas de automação de marketing?",
      a: "Com certeza. Integramos nativamente com plataformas como RD Station, HubSpot, Mailchimp e CRMs diversos. Isso permite que os leads gerados no site entrem automaticamente no seu fluxo de vendas, aumentando a eficiência comercial.",
    },
    {
      q: "Vocês oferecem suporte após o lançamento do site?",
      a: "Sim, oferecemos planos de manutenção evolutiva e suporte técnico para garantir que o site continue seguro, atualizado e performando no máximo das suas capacidades tecnológicas ao longo do tempo.",
    },
    {
      q: "Quanto custa o desenvolvimento de um site institucional B2B?",
      a: "Os valores variam conforme a complexidade do projeto, número de páginas e integrações necessárias. Trabalhamos com orçamentos fechados e transparentes, focados no retorno sobre o investimento (ROI) que a nova plataforma trará para sua corporação.",
    },
  ],
  relacionados: [
    {
      slug: "sistemas-web",
      title: "Sistemas Web Personalizados",
      href: "/servicos/sistemas-web",
      desc: "Expanda as funcionalidades do seu site para uma plataforma de gestão ou operação interna.",
    },
    {
      slug: "consultoria-tech",
      title: "Consultoria de Tecnologia",
      href: "/servicos/consultoria-tech",
      desc: "Alinhamento estratégico para suas decisões de infraestrutura e desenvolvimento de software.",
    },
  ],
  ctaFinalTitle: "Pronto para elevar o patamar digital da sua empresa",
};

const EN: ServicePageData = {
  slug: SLUG,
  eyebrow: getService(SLUG, "en").title,
  h1: "B2B corporate websites that generate opportunities.",
  subheadline:
    "We build premium corporate websites focused on conversion, Core Web Vitals performance and brand authority. The right fit for B2B companies seeking digital growth and credibility in the corporate market.",
  trust: ["Delivered within 30 days", "High-performance SEO optimization", "Proprietary, secure code"],
  oQueE: {
    title: "What a high-performance B2B corporate website is",
    paragrafos: [
      "A B2B corporate website is much more than a digital business card; it is the foundation of your marketing and sales strategy in the corporate world. In 2024 and 2025, a company's digital presence became the main tiebreaker in high-ticket negotiations. A well-structured website communicates maturity, solidity and a clear value proposition, and it is the central point of contact between your brand and strategic partners, investors and potential customers.",
      "Building a modern corporate website requires combining top-tier design with current technology. At Vtech Soluções, we use stacks such as React 19 and SSR (Server-Side Rendering) so your company not only looks impressive but also loads instantly on any device. The information architecture is designed to guide the visitor through a journey of trust, from the first impression in the hero to the final conversion in our optimized forms.",
      "Beyond aesthetics, we focus heavily on technical SEO (Search Engine Optimization). Every page is built to be easily indexed by Google, with structured data markup (Schema.org), dynamic sitemaps and optimized metadata. A high-end corporate website should be an active demand-generation tool, serving as the pillar of authority that supports your reputation in Brazil and worldwide.",
      "Through digital transformation, we help companies move away from outdated, limited setups, such as poorly configured WordPress, to agile, secure and scalable digital environments. Our focus is making sure your web infrastructure supports business growth, with the flexibility for frequent updates without compromising stability or speed.",
    ],
  },
  paraQuem: [
    {
      perfil: "Industry and Manufacturing",
      descricao:
        "Factories that need to present complex technical catalogs and generate qualified leads from trade shows and organic search.",
    },
    {
      perfil: "Law Firms and Consultancies",
      descricao:
        "Professionals who sell knowledge and authority, where the website design is immediate social proof of competence.",
    },
    {
      perfil: "Technology and SaaS Companies",
      descricao:
        "Businesses that need to show constant innovation through a modern, fast and integrated interface.",
    },
    {
      perfil: "Holdings and Business Groups",
      descricao:
        "Corporations seeking unified, robust communication for investors and stakeholders across sectors.",
    },
  ],
  casosDeUso: [
    {
      title: "Migration and Digital Rebranding",
      desc: "A full update of legacy websites to a new visual identity, keeping the SEO rankings built up over years.",
    },
    {
      title: "Content and Thought Leadership Portals",
      desc: "High-performance blog and news sections that attract qualified traffic through content marketing.",
    },
  ],
  glossario: [
    {
      termo: "Core Web Vitals",
      definicao:
        "A set of Google metrics that measure a website's loading speed, interactivity and visual stability.",
    },
    {
      termo: "Schema Markup",
      definicao:
        "Code added to a website to help search engines understand the content and show richer results (rich snippets).",
    },
  ],
  problemas: [
    {
      dor: "An outdated website that drives premium clients away",
      solucao:
        "We deliver a contemporary, editorial design that reflects the real quality and value of your B2B services.",
    },
    {
      dor: "Low visibility on Google (weak SEO)",
      solucao:
        "We run a full keyword audit and implement technical on-page SEO for higher rankings.",
    },
    {
      dor: "Hard to navigate on mobile devices",
      solucao:
        "Mobile-first development, so your customer's experience is flawless on both smartphone and desktop.",
    },
    {
      dor: "Extremely slow pages and loading errors",
      solucao:
        "We use edge computing infrastructure to deliver your website in milliseconds, lowering the bounce rate.",
    },
  ],
  entregaveis: [
    {
      title: "Exclusive, Original Design",
      desc: "No ready-made templates. We create a unique interface aligned with your brand guidelines and positioning.",
      icon: Sparkles,
    },
    {
      title: "Maximum Performance and Speed",
      desc: "Rigorous optimization of images and scripts to reach top scores on Google PageSpeed Insights.",
      icon: Gauge,
    },
    {
      title: "Enterprise-Grade Security",
      desc: "Protection against attacks, native SSL and clean code, eliminating common vulnerabilities of popular platforms.",
      icon: ShieldCheck,
    },
    {
      title: "Structured Technical SEO",
      desc: "Sitemaps, robots.txt, canonical tags and microdata for full command of organic search.",
      icon: Search,
    },
    {
      title: "Simple Content Management",
      desc: "An intuitive panel for your team to update text, images and posts without relying on developers.",
      icon: Smartphone,
    },
    {
      title: "Integration with Your Sales Stack",
      desc: "We connect your website to the CRM (Salesforce, HubSpot, RD Station) to track every lead generated.",
      icon: Globe,
    },
  ],
  stack: [
    { title: "React 19 + TanStack Start", desc: "The most modern technology for ultra-fast, dynamic websites." },
    { title: "Tailwind CSS v4", desc: "Consistent design and optimized style loading." },
    { title: "Cloudflare Edge", desc: "Your website hosted on one of the fastest, most secure networks in the world." },
    { title: "TypeScript", desc: "Robust, error-resistant code that is easy to maintain in the long run." },
  ],
  processo: [
    {
      n: "01",
      title: "Immersion and Diagnosis",
      desc: "We analyze your market, competitors and business goals to define the best digital strategy.",
    },
    {
      n: "02",
      title: "Architecture and UX Design",
      desc: "We design the user journey and content structure with a focus on usability and lead conversion.",
    },
    {
      n: "03",
      title: "Agile Development",
      desc: "We code the website following software engineering and SEO best practices.",
    },
    {
      n: "04",
      title: "QA and Launch",
      desc: "Rigorous testing on multiple devices, followed by a monitored deployment and search engine indexing.",
    },
  ],
  faq: [
    {
      q: "How important is a corporate website for my company's SEO?",
      a: "A well-optimized corporate website anchors your digital presence. It lets your company be found for terms specific to your sector (long-tail keywords), building authority and lowering paid ad costs over time through qualified organic traffic.",
    },
    {
      q: "How does Vtech Soluções ensure the website loads fast?",
      a: "We use Server-Side Rendering (SSR) and automatic asset optimization. The main content is delivered instantly, which is critical for Google rankings and for keeping potential customers from leaving a slow page.",
    },
    {
      q: "Is the corporate website mobile-friendly (responsive)?",
      a: "Yes, all our projects follow a mobile-first approach. The experience is smooth and professional on any screen size, which is essential since most B2B searches today start on a phone.",
    },
    {
      q: "Can the website be integrated with marketing automation tools?",
      a: "Absolutely. We integrate natively with platforms such as RD Station, HubSpot, Mailchimp and a range of CRMs. Leads generated on the website flow automatically into your sales pipeline, making the sales team more efficient.",
    },
    {
      q: "Do you offer support after the website launches?",
      a: "Yes, we offer ongoing maintenance and technical support plans to keep the website secure, up to date and performing at its full potential over time.",
    },
    {
      q: "How much does a B2B corporate website cost?",
      a: "Pricing depends on project complexity, number of pages and required integrations. We work with fixed, transparent quotes, focused on the return on investment (ROI) the new platform will bring to your company.",
    },
  ],
  relacionados: [
    {
      slug: "sistemas-web",
      title: "Custom Web Systems",
      href: "/servicos/sistemas-web",
      desc: "Extend your website into a management or internal operations platform.",
    },
    {
      slug: "consultoria-tech",
      title: "Technology Consulting",
      href: "/servicos/consultoria-tech",
      desc: "Strategic alignment for your infrastructure and software development decisions.",
    },
  ],
  ctaFinalTitle: "Ready to take your company's digital presence to the next level",
};

const ES: ServicePageData = {
  slug: SLUG,
  eyebrow: getService(SLUG, "es").title,
  h1: "Sitios institucionales B2B que generan oportunidades.",
  subheadline:
    "Desarrollamos sitios institucionales premium enfocados en conversión, desempeño en Core Web Vitals y autoridad de marca. La solución ideal para empresas B2B que buscan expansión digital y credibilidad en el mercado corporativo.",
  trust: ["Entrega en hasta 30 días", "Optimización SEO de alto desempeño", "Código propio y seguro"],
  oQueE: {
    title: "Qué es un sitio institucional B2B de alto desempeño",
    paragrafos: [
      "Un sitio institucional B2B es mucho más que una tarjeta de presentación digital; es la base de su estrategia de marketing y ventas en el entorno corporativo. En 2024 y 2025, la presencia digital de una empresa se convirtió en el principal criterio de desempate en negociaciones de alto valor. Un sitio bien estructurado comunica madurez, solidez y claridad en la propuesta de valor, y es el punto central de contacto entre su marca y socios estratégicos, inversionistas y clientes potenciales.",
      "El desarrollo de un sitio institucional moderno exige integrar diseño de primer nivel con tecnología de última generación. En Vtech Soluções utilizamos stacks como React 19 y SSR (Server-Side Rendering) para garantizar que su empresa no solo tenga un aspecto impresionante, sino que también cargue al instante en cualquier dispositivo. La arquitectura de información está pensada para guiar al usuario en un recorrido de confianza, desde el primer impacto en el hero hasta la conversión final en nuestros formularios optimizados.",
      "Más allá de la estética, nos enfocamos intensamente en el SEO técnico (Search Engine Optimization). Esto significa que cada página se construye para ser fácilmente indexada por Google, con marcado de datos estructurados (Schema.org), sitemaps dinámicos y metadatos optimizados. Un sitio institucional de alto nivel debe ser una herramienta activa de generación de demanda, que sirva como pilar de autoridad para sostener su reputación en el mercado brasileño y global.",
      "A través de la transformación digital, ayudamos a las empresas a dejar sistemas obsoletos y limitados, como un WordPress mal configurado, para pasar a ecosistemas digitales ágiles, seguros y escalables. Nuestro foco es garantizar que su infraestructura web acompañe el crecimiento de su negocio, ofreciendo flexibilidad para actualizaciones constantes sin comprometer la estabilidad ni la velocidad.",
    ],
  },
  paraQuem: [
    {
      perfil: "Industrias y Manufactura",
      descricao:
        "Para fábricas que necesitan presentar catálogos técnicos complejos y generar leads calificados en ferias y búsquedas orgánicas.",
    },
    {
      perfil: "Estudios Jurídicos y Consultoras",
      descricao:
        "Profesionales que venden conocimiento y autoridad, donde el diseño del sitio es la prueba social inmediata de su competencia.",
    },
    {
      perfil: "Empresas de Tecnología y SaaS",
      descricao:
        "Negocios que necesitan demostrar innovación constante mediante una interfaz moderna, rápida e integrada.",
    },
    {
      perfil: "Holdings y Grupos Empresariales",
      descricao:
        "Corporaciones que buscan una comunicación unificada y robusta para inversionistas y stakeholders de diversos sectores.",
    },
  ],
  casosDeUso: [
    {
      title: "Migración y Rebranding Digital",
      desc: "Actualización completa de sitios antiguos a nuevas identidades visuales, manteniendo el posicionamiento SEO acumulado durante años.",
    },
    {
      title: "Portales de Contenido y Liderazgo de Opinión",
      desc: "Creación de secciones de blog y noticias de alto desempeño para atraer tráfico calificado mediante marketing de contenidos.",
    },
  ],
  glossario: [
    {
      termo: "Core Web Vitals",
      definicao:
        "Conjunto de métricas de Google que miden la velocidad de carga, la interactividad y la estabilidad visual del sitio.",
    },
    {
      termo: "Schema Markup",
      definicao:
        "Código agregado al sitio para ayudar a los motores de búsqueda a entender el contenido y mostrar resultados enriquecidos (rich snippets).",
    },
  ],
  problemas: [
    {
      dor: "Sitio desactualizado que aleja a clientes premium",
      solucao:
        "Implementamos un diseño contemporáneo y editorial que refleja la calidad y el valor reales de sus servicios B2B.",
    },
    {
      dor: "Baja visibilidad en Google (SEO deficiente)",
      solucao:
        "Realizamos una auditoría completa de palabras clave e implementamos SEO on-page técnico para un mejor posicionamiento.",
    },
    {
      dor: "Navegación difícil en dispositivos móviles",
      solucao:
        "Desarrollo mobile-first, garantizando que la experiencia de su cliente sea perfecta tanto en el smartphone como en el escritorio.",
    },
    {
      dor: "Lentitud extrema y errores de carga",
      solucao:
        "Utilizamos infraestructura de edge computing para entregar su sitio en milisegundos, reduciendo la tasa de rebote.",
    },
  ],
  entregaveis: [
    {
      title: "Diseño Exclusivo y de Autor",
      desc: "Nada de plantillas prediseñadas. Creamos una interfaz única alineada con su manual de marca y posicionamiento.",
      icon: Sparkles,
    },
    {
      title: "Máximo Desempeño y Velocidad",
      desc: "Optimización rigurosa de imágenes y scripts para alcanzar las mejores notas en Google PageSpeed Insights.",
      icon: Gauge,
    },
    {
      title: "Seguridad de Nivel Corporativo",
      desc: "Protección contra ataques, SSL nativo y código limpio, eliminando vulnerabilidades comunes de plataformas populares.",
      icon: ShieldCheck,
    },
    {
      title: "SEO Técnico y Estructurado",
      desc: "Implementación de sitemaps, robots.txt, etiquetas canonical y microdatos para dominar las búsquedas orgánicas.",
      icon: Search,
    },
    {
      title: "Gestión de Contenido Simplificada",
      desc: "Panel intuitivo para que su equipo actualice textos, imágenes y publicaciones sin depender de desarrolladores.",
      icon: Smartphone,
    },
    {
      title: "Integración con su Ecosistema de Ventas",
      desc: "Conectamos su sitio al CRM (Salesforce, HubSpot, RD Station) para rastrear cada lead generado.",
      icon: Globe,
    },
  ],
  stack: [
    { title: "React 19 + TanStack Start", desc: "La tecnología más moderna para sitios ultrarrápidos y dinámicos." },
    { title: "Tailwind CSS v4", desc: "Diseño consistente y carga de estilos optimizada." },
    { title: "Cloudflare Edge", desc: "Su sitio alojado en una de las redes más rápidas y seguras del mundo." },
    { title: "TypeScript", desc: "Código robusto, libre de errores y fácil de mantener a largo plazo." },
  ],
  processo: [
    {
      n: "01",
      title: "Inmersión y Diagnóstico",
      desc: "Analizamos su mercado, competidores y objetivos de negocio para trazar la mejor estrategia digital.",
    },
    {
      n: "02",
      title: "Arquitectura y Diseño UX",
      desc: "Diseñamos el recorrido del usuario y la estructura de contenido enfocada en usabilidad y conversión de leads.",
    },
    {
      n: "03",
      title: "Desarrollo Ágil",
      desc: "Codificamos el sitio con las mejores prácticas de ingeniería de software y optimización SEO.",
    },
    {
      n: "04",
      title: "QA y Lanzamiento",
      desc: "Pruebas rigurosas en múltiples dispositivos, seguidas de un despliegue monitoreado y la indexación en los motores de búsqueda.",
    },
  ],
  faq: [
    {
      q: "¿Qué importancia tiene un sitio institucional para el SEO de mi empresa?",
      a: "Un sitio institucional bien optimizado es el ancla de su presencia digital. Permite que su empresa sea encontrada por términos específicos de su sector (long tail keywords), estableciendo autoridad y reduciendo a largo plazo los costos en anuncios pagados gracias al tráfico orgánico calificado.",
    },
    {
      q: "¿Cómo garantiza Vtech Soluções la velocidad de carga del sitio?",
      a: "Utilizamos Server-Side Rendering (SSR) y optimización automática de recursos. Esto garantiza que el contenido principal se entregue al instante, un factor crítico para el posicionamiento en Google y para evitar que clientes potenciales abandonen la página por lentitud.",
    },
    {
      q: "¿El sitio institucional es compatible con dispositivos móviles (responsive)?",
      a: "Sí, todos nuestros proyectos se desarrollan bajo la filosofía mobile-first. Esto garantiza una experiencia fluida y profesional en cualquier tamaño de pantalla, algo esencial ya que la mayoría de las búsquedas B2B hoy comienzan en el celular.",
    },
    {
      q: "¿Es posible integrar el sitio con herramientas de automatización de marketing?",
      a: "Por supuesto. Integramos de forma nativa con plataformas como RD Station, HubSpot, Mailchimp y diversos CRMs. Así, los leads generados en el sitio entran automáticamente en su flujo de ventas, aumentando la eficiencia comercial.",
    },
    {
      q: "¿Ofrecen soporte después del lanzamiento del sitio?",
      a: "Sí, ofrecemos planes de mantenimiento evolutivo y soporte técnico para garantizar que el sitio siga seguro, actualizado y rindiendo al máximo de sus capacidades tecnológicas a lo largo del tiempo.",
    },
    {
      q: "¿Cuánto cuesta el desarrollo de un sitio institucional B2B?",
      a: "Los valores varían según la complejidad del proyecto, el número de páginas y las integraciones necesarias. Trabajamos con presupuestos cerrados y transparentes, enfocados en el retorno sobre la inversión (ROI) que la nueva plataforma traerá a su empresa.",
    },
  ],
  relacionados: [
    {
      slug: "sistemas-web",
      title: "Sistemas Web Personalizados",
      href: "/servicos/sistemas-web",
      desc: "Amplíe las funcionalidades de su sitio hacia una plataforma de gestión u operación interna.",
    },
    {
      slug: "consultoria-tech",
      title: "Consultoría de Tecnología",
      href: "/servicos/consultoria-tech",
      desc: "Alineación estratégica para sus decisiones de infraestructura y desarrollo de software.",
    },
  ],
  ctaFinalTitle: "¿Listo para llevar la presencia digital de su empresa a otro nivel",
};

const DATA: L<ServicePageData> = { pt: PT, en: EN, es: ES };

export const Route = createFileRoute("/servicos/sites-institucionais")({
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
            serviceType: "Web Design & Development",
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
