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
