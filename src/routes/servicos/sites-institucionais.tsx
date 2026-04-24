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

const SLUG = "sites-institucionais";
const URL = `https://vtechsolucoes.com.br/servicos/${SLUG}`;
const TITLE = "Sites Institucionais B2B sob medida | Vtech Soluções";
const DESCRIPTION =
  "Site institucional premium com SEO técnico, performance Core Web Vitals e identidade estúdio. Entrega em 30 dias. Solicite proposta.";

const data: ServicePageData = {
  slug: SLUG,
  eyebrow: "Sites institucionais",
  h1: "Sites Institucionais B2B: Transformação Digital e Autoridade para sua Empresa.",
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
    sinonimos: [
      "site corporativo de alto padrão",
      "desenvolvimento de site empresarial",
      "criação de website B2B",
      "página institucional para empresas",
      "soluções web corporativas",
      "estúdio de criação de sites premium",
      "consultoria em presença digital B2B",
      "plataforma institucional escalável",
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

export const Route = createFileRoute("/servicos/sites-institucionais")({
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
      {
        type: "application/ld+json",
        children: JSON.stringify(buildServiceSchema({ name: "Sites Institucionais B2B", description: DESCRIPTION, url: URL, serviceType: "Web Design & Development" })),
      },
      { type: "application/ld+json", children: JSON.stringify(buildFAQSchema(data.faq)) },
      { type: "application/ld+json", children: JSON.stringify(buildBreadcrumbSchema("Sites Institucionais", SLUG)) },
    ],
  }),
  component: Page,
});

function Page() {
  useEffect(() => { Events.servicePageView(SLUG); }, []);
  return <ServicePageLayout data={data} />;
}
