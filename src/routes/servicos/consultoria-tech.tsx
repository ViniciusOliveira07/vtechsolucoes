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

const SLUG = "consultoria-tech";
const URL = `https://vtechsolucoes.com.br/servicos/${SLUG}`;
const TITLE = "Consultoria de Tecnologia para Empresas | Vtech";
const DESCRIPTION =
  "Consultoria sênior em arquitetura, escolha de stack e roadmap técnico. Decisões certas antes de gastar R$100k em código.";

const data: ServicePageData = {
  slug: SLUG,
  eyebrow: "Consultoria tech",
  h1: "Consultoria de Tecnologia B2B: Estratégia, Arquitetura e Inovação para o seu Negócio.",
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
    sinonimos: [
      "consultoria de TI empresarial",
      "CTO as a Service para startups",
      "consultoria em arquitetura de software",
      "estratégia de transformação digital B2B",
      "due diligence técnica para M&A",
      "mentoria técnica para líderes",
      "advisory de tecnologia e inovação",
      "roadmap tecnológico corporativo",
      "auditoria de sistemas e código",
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
      a: "Nosso foco principal na consultoria é estratégico e arquitetural. No entanto, realizamos provas de conceito (PoCs) e revisões de código (code reviews) profundas. Caso a empresa precise de execução completa, podemos transitar para o nosso modelo de desenvolvimento de sistemas.",
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
      slug: "automacoes-com-ia",
      title: "Automações com IA",
      href: "/servicos/automacoes-com-ia",
      desc: "Estratégia de IA empresarial com ROI mensurável.",
    },
  ],
  ctaFinalTitle: "Pronto para tomar a próxima decisão técnica com clareza",
};

export const Route = createFileRoute("/servicos/consultoria-tech")({
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
      { type: "application/ld+json", children: JSON.stringify(buildServiceSchema({ name: "Consultoria de Tecnologia", description: DESCRIPTION, url: URL, serviceType: "Technology Consulting" })) },
      { type: "application/ld+json", children: JSON.stringify(buildFAQSchema(data.faq)) },
      { type: "application/ld+json", children: JSON.stringify(buildBreadcrumbSchema("Consultoria Tech", SLUG)) },
    ],
  }),
  component: Page,
});

function Page() {
  useEffect(() => { Events.servicePageView(SLUG); }, []);
  return <ServicePageLayout data={data} />;
}
