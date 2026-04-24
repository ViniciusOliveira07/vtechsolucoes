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
  h1: "Sites institucionais que vendem confiança antes da primeira reunião.",
  subheadline:
    "Para empresas B2B que precisam de presença digital à altura do ticket que cobram. SEO técnico, performance e copy persuasiva — não só design bonito.",
  trust: ["Entrega em 30 dias", "SEO técnico nativo", "Sem mensalidade refém"],
  oQueE: {
    title: "O que é um site institucional B2B de alto padrão",
    paragrafos: [
      "Um site institucional é o endereço digital oficial da sua empresa — a página corporativa que apresenta marca, posicionamento, soluções, cases e canais de contato para clientes, parceiros, investidores e candidatos. No B2B, ele é frequentemente o primeiro ponto de contato antes de uma reunião comercial e por isso precisa transmitir maturidade, autoridade e clareza de proposta de valor em segundos.",
      "Diferente de um site de e-commerce ou de um SaaS, o site institucional não vende um produto direto: ele vende confiança e qualifica oportunidade. As páginas típicas incluem Home, Sobre, Serviços ou Soluções, Cases, Conteúdo (blog), Carreiras e Contato. A estrutura precisa equilibrar storytelling, prova social, SEO técnico (sitemap, schema, meta tags) e performance (Core Web Vitals em verde) para ranquear bem no Google e converter visitantes em leads qualificados.",
      "Construir um site institucional moderno em 2025 envolve stack atual (React, SSR, edge), design system próprio, identidade visual coesa e medição via GA4. É o tipo de projeto que costuma ser entregue por agências digitais, web designers, desenvolvedores freelancers ou estúdios de produto — com qualidade, prazos e preços muito diferentes entre si.",
    ],
    sinonimos: [
      "site corporativo",
      "site empresarial",
      "página institucional",
      "website B2B",
      "site para empresa",
      "criação de site profissional",
      "desenvolvimento de site corporativo",
      "site para indústria",
      "site para escritório de advocacia",
      "site para consultoria",
    ],
  },
  paraQuem: [
    { perfil: "Indústrias e fabricantes B2B", descricao: "Empresas com ciclo de venda longo que precisam educar o comprador antes da reunião comercial." },
    { perfil: "Escritórios de advocacia e consultorias", descricao: "Negócios baseados em autoridade e reputação, onde o site é prova de credibilidade." },
    { perfil: "SaaS e tech companies", descricao: "Empresas de tecnologia que precisam de presença premium para parcerias enterprise e investidores." },
    { perfil: "Holdings, gestoras e family offices", descricao: "Marcas que comunicam discrição, solidez e governança — design e copy precisam refletir isso." },
    { perfil: "Empresas em rebranding ou fusão", descricao: "Quem está renovando posicionamento e precisa de presença digital nova alinhada à marca atualizada." },
    { perfil: "Startups em rodada de captação", descricao: "Site é vitrine para investidores, parceiros e talentos. Precisa transmitir maturidade desde o domínio.com." },
  ],
  casosDeUso: [
    { title: "Site para indústria com catálogo técnico", desc: "Multi-idioma, área de downloads de fichas técnicas, integração com RD Station/HubSpot e SEO para termos técnicos do segmento." },
    { title: "Site de escritório de advocacia", desc: "Áreas de atuação, equipe, publicações e blog jurídico com schema Article, dentro das normas da OAB." },
    { title: "Landing page para captação de leads", desc: "Página de campanha enxuta, com formulário, prova social, FAQ e tracking de conversão GA4 + Meta Ads." },
    { title: "Site institucional para holding", desc: "Apresentação do grupo, empresas controladas, governança e sustentabilidade — visual sóbrio e premium." },
    { title: "Hotsite para lançamento de produto", desc: "Página de produto com hero cinematográfico, vídeo, especificações, formulário de pré-venda e contagem regressiva." },
    { title: "Migração de WordPress para stack moderna", desc: "Saída de CMS instável para arquitetura headless rápida, mantendo URLs e ranking SEO existente." },
  ],
  glossario: [
    { termo: "Core Web Vitals", definicao: "Métricas de performance do Google (LCP, INP, CLS) que impactam diretamente o ranking de busca e a experiência do usuário." },
    { termo: "SEO on-page", definicao: "Otimizações dentro da página: títulos, descrições, headings, alt text, links internos e palavras-chave bem distribuídas." },
    { termo: "Schema.org / JSON-LD", definicao: "Marcação estruturada que ajuda o Google a entender o conteúdo (organização, FAQ, breadcrumb) e gerar rich snippets." },
    { termo: "SSR (Server-Side Rendering)", definicao: "Renderização da página no servidor antes de enviar ao navegador. Crucial para indexação rápida e performance percebida." },
    { termo: "Sitemap.xml", definicao: "Arquivo que lista todas as URLs do site para os buscadores rastrearem com eficiência." },
    { termo: "Open Graph", definicao: "Meta tags que controlam como o site aparece quando compartilhado no LinkedIn, WhatsApp, Slack e redes sociais." },
    { termo: "Design system", definicao: "Conjunto reutilizável de tokens (cores, tipografia, espaçamentos) e componentes que garantem consistência visual." },
    { termo: "Headless CMS", definicao: "CMS que entrega só conteúdo via API (Sanity, Contentful, Strapi), separado da camada de apresentação." },
  ],
  problemas: [
    {
      dor: "Site bonito que não traz lead nenhum",
      solucao:
        "Construímos cada página com intenção de busca clara, copy de conversão e CTAs medidos por evento no GA4.",
    },
    {
      dor: "Carregamento lento que derruba o ranking no Google",
      solucao:
        "Stack moderna (TanStack Start + edge), Core Web Vitals em verde e imagens otimizadas no build.",
    },
    {
      dor: "Identidade visual genérica, igual à do concorrente",
      solucao:
        "Direção de arte estúdio: tipografia editorial, motion sutil e sistema de design proprietário por projeto.",
    },
    {
      dor: "Refém de WordPress, plugin e mensalidade",
      solucao:
        "Código é seu. Sem CMS instável, sem plugin que quebra. Deploy contínuo na sua conta.",
    },
  ],
  entregaveis: [
    { title: "Design system dedicado", desc: "Cores, tipografia e tokens semânticos pensados para sua marca.", icon: Sparkles },
    { title: "SEO técnico on-page", desc: "Meta tags por rota, sitemap, schema.org, canonical e Open Graph.", icon: Search },
    { title: "Performance Core Web Vitals", desc: "LCP, INP e CLS em verde. SSR + edge para carregar instantâneo.", icon: Gauge },
    { title: "Responsivo de verdade", desc: "Mobile-first com breakpoints fluidos e tipografia escalável.", icon: Smartphone },
    { title: "Acessibilidade AA", desc: "Contraste, aria-labels e navegação por teclado validados.", icon: ShieldCheck },
    { title: "Integrações de captação", desc: "Formulário com validação, WhatsApp, GA4 e CRM se necessário.", icon: Globe },
  ],
  stack: [
    { title: "TanStack Start + React 19", desc: "SSR moderno, type-safe e edge-ready." },
    { title: "Tailwind v4", desc: "Tokens semânticos, dark-mode nativo, zero CSS legado." },
    { title: "Cloudflare / Edge", desc: "Latência global baixa, deploy em segundos." },
    { title: "GA4 + eventos", desc: "Mede o que importa: cliques, scroll, leads gerados." },
  ],
  processo: [
    { n: "01", title: "Diagnóstico", desc: "Entendemos posicionamento, ICP e palavras-chave alvo." },
    { n: "02", title: "Wireframe + copy", desc: "Estrutura validada antes de qualquer pixel ser desenhado." },
    { n: "03", title: "Build com IA", desc: "Desenvolvimento acelerado, mas com revisão sênior em cada commit." },
    { n: "04", title: "Lançamento", desc: "Deploy, GA4, Search Console, sitemap submetido. Handoff completo." },
  ],
  faq: [
    {
      q: "Quanto tempo leva para entregar um site institucional?",
      a: "O prazo padrão é de 30 dias úteis a partir da aprovação do escopo, incluindo design, desenvolvimento, conteúdo e deploy.",
    },
    {
      q: "Vocês cobram mensalidade?",
      a: "Não. O projeto é fechado por escopo. Você só paga hospedagem (geralmente abaixo de R$ 50/mês) e contrata manutenção opcional se quiser.",
    },
    {
      q: "Já tenho identidade visual. Vocês trabalham com ela?",
      a: "Sim. Adaptamos seu manual de marca para um design system web e mantemos consistência com seus materiais offline.",
    },
    {
      q: "O site sai indexado no Google?",
      a: "Sim. Entregamos com sitemap.xml, robots.txt, schema.org, Open Graph e submetemos ao Search Console no lançamento.",
    },
    {
      q: "Posso editar o conteúdo depois sem chamar vocês?",
      a: "Sim. Acoplamos um CMS leve (Sanity ou similar) quando faz sentido, ou mantemos o conteúdo versionado no repositório com edição direta.",
    },
  ],
  relacionados: [
    { slug: "sistemas-web", title: "Sistemas web sob medida", href: "/servicos/sistemas-web", desc: "Quando o site precisa virar plataforma com login, dados e regras." },
    { slug: "automacoes-com-ia", title: "Automações com IA", href: "/servicos/automacoes-com-ia", desc: "Adicione chatbot inteligente ou geração de conteúdo automatizada." },
    { slug: "consultoria-tech", title: "Consultoria tech", href: "/servicos/consultoria-tech", desc: "Decida arquitetura e roadmap antes de investir em código." },
  ],
  ctaFinalTitle: "Pronto para um site que trabalha pela sua empresa",
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
