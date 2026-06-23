import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Blocks, Webhook, CreditCard, Boxes, RefreshCw, ShieldCheck } from "lucide-react";
import {
  ServicePageLayout,
  buildServiceSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
  type ServicePageData,
} from "@/components/site/ServicePageLayout";
import { Events } from "@/lib/analytics";

const SLUG = "integracoes";
const URL = `https://vtechsolucoes.com.br/servicos/${SLUG}`;
const TITLE = "Integrações de Sistemas, ERPs e APIs | Vtech Soluções";
const DESCRIPTION =
  "Integramos ERP, CRM, gateways de pagamento e APIs internas. Fim do retrabalho manual entre sistemas. Diagnóstico em 7 dias.";

const data: ServicePageData = {
  slug: SLUG,
  eyebrow: "Integrações",
  h1: "Integração de Sistemas e APIs: Conectividade e Eficiência Operacional para sua Empresa.",
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
    sinonimos: [
      "consultoria em integração de sistemas",
      "desenvolvimento de middleware personalizado",
      "conectividade de APIs B2B",
      "integração de ERP e CRM",
      "automação de fluxos de dados",
      "sincronização de bancos de dados",
      "integração com gateways de pagamento",
      "middleware para transformação digital",
      "orquestração de serviços web",
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

export const Route = createFileRoute("/servicos/integracoes")({
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
      { type: "application/ld+json", children: JSON.stringify(buildServiceSchema({ name: "Integração de Sistemas", description: DESCRIPTION, url: URL, serviceType: "Systems Integration" })) },
      { type: "application/ld+json", children: JSON.stringify(buildFAQSchema(data.faq)) },
      { type: "application/ld+json", children: JSON.stringify(buildBreadcrumbSchema("Integrações", SLUG)) },
    ],
  }),
  component: Page,
});

function Page() {
  useEffect(() => { Events.servicePageView(SLUG); }, []);
  return <ServicePageLayout data={data} />;
}
