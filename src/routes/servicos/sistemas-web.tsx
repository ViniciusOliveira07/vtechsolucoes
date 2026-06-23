import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Laptop, Database, Lock, Workflow, BarChart3, Users } from "lucide-react";
import {
  ServicePageLayout,
  buildServiceSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
  type ServicePageData,
} from "@/components/site/ServicePageLayout";
import { Events } from "@/lib/analytics";

const SLUG = "sistemas-web";
const URL = `https://vtechsolucoes.com.br/servicos/${SLUG}`;
const TITLE = "Desenvolvimento de Sistemas Web sob Medida | Vtech";
const DESCRIPTION =
  "Sistemas web sob medida para operações B2B: ERPs internos, painéis, portais. Stack moderna, deploy contínuo, sem mensalidade refém.";

const data: ServicePageData = {
  slug: SLUG,
  eyebrow: "Sistemas web",
  h1: "Desenvolvimento de Sistemas Web sob Medida: Eficiência, Escalabilidade e ROI para sua Operação.",
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
    sinonimos: [
      "software sob medida B2B",
      "desenvolvimento de aplicações web personalizadas",
      "sistema de gestão customizado",
      "plataforma web corporativa",
      "ERP personalizado para empresas",
      "soluções de software enterprise",
      "desenvolvimento ágil de sistemas",
      "arquitetura de sistemas web",
      "aplicativos web de alta performance",
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
      perfil: "Sectores com Alta Regulação de Dados",
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

export const Route = createFileRoute("/servicos/sistemas-web")({
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
      { type: "application/ld+json", children: JSON.stringify(buildServiceSchema({ name: "Desenvolvimento de Sistemas Web", description: DESCRIPTION, url: URL, serviceType: "Custom Software Development" })) },
      { type: "application/ld+json", children: JSON.stringify(buildFAQSchema(data.faq)) },
      { type: "application/ld+json", children: JSON.stringify(buildBreadcrumbSchema("Sistemas Web", SLUG)) },
    ],
  }),
  component: Page,
});

function Page() {
  useEffect(() => { Events.servicePageView(SLUG); }, []);
  return <ServicePageLayout data={data} />;
}
