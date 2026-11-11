import type { ServicePageData } from "@/components/site/ServicePageLayout";
import type { VignetteSlug } from "@/components/site/home/ServiceStack";

/**
 * Páginas de "Soluções": uma página comercial por busca principal (agente de IA no WhatsApp,
 * chatbot com IA, agência de automação, RAG, sistema sob medida, site em São Paulo).
 * As páginas de serviço continuam amplas; estas respondem direto a uma intenção de busca.
 * Regra de conteúdo: nada de números, clientes ou promessas que a Vtech não possa comprovar.
 */
export type Solucao = {
  data: ServicePageData & { section: "solucoes"; vignette: VignetteSlug };
  /** <title> até ~60 caracteres, palavra-chave na frente */
  title: string;
  description: string;
  schemaName: string;
  serviceType: string;
  /** texto curto do cartão na página /solucoes */
  card: string;
};

const PROCESSO = [
  { n: "01", title: "Diagnóstico", desc: "Conversa técnica para entender o processo, os sistemas envolvidos e o que precisa mudar." },
  { n: "02", title: "Proposta fechada", desc: "Escopo, prazo e investimento por escrito, em até 24 horas úteis depois do diagnóstico." },
  { n: "03", title: "Construção", desc: "Desenvolvimento dentro do escopo combinado, com versões para você testar no caminho." },
  { n: "04", title: "Entrega", desc: "Publicação, documentação técnica e handoff para a sua equipe. O código fica com você." },
];

export const SOLUCOES: Solucao[] = [
  {
    title: "Agente de IA para WhatsApp para empresas | Vtech",
    description:
      "Agente de IA no WhatsApp da sua empresa: responde clientes, consulta ERP e CRM, agenda e passa para humano quando precisa. Projeto sob medida, proposta em 24h úteis.",
    schemaName: "Agente de IA para WhatsApp",
    serviceType: "AI chatbot development",
    card: "Atendimento no WhatsApp que consulta seus sistemas e resolve, não só responde.",
    data: {
      section: "solucoes",
      vignette: "whatsapp",
      slug: "agente-de-ia-para-whatsapp",
      eyebrow: "Agente de IA para WhatsApp",
      h1: "Agente de IA para WhatsApp que atende, consulta seus sistemas e resolve.",
      subheadline:
        "Construímos agentes de IA para o WhatsApp da sua empresa: respondem dúvidas, consultam pedidos no ERP, registram no CRM, agendam horários e passam para uma pessoa quando o caso pede.",
      trust: ["API oficial do WhatsApp ou WhatsApp Web", "Integra com ERP e CRM", "Passa para humano com o histórico"],
      oQueE: {
        title: "O que é um agente de IA para WhatsApp",
        paragrafos: [
          "Um agente de IA para WhatsApp é um atendente automático que entende a mensagem do cliente em linguagem natural e decide o que fazer: responder, buscar uma informação num sistema, executar uma ação ou chamar uma pessoa. A diferença para o chatbot de menu é que o cliente não precisa digitar 1, 2 ou 3. Ele escreve do jeito dele, e o agente entende.",
          "O que faz um agente ser útil de verdade é a integração. Sozinho, um modelo de linguagem só conversa. Ligado ao seu ERP, ao CRM e à agenda, ele consegue dizer se o pedido saiu, quanto custa um produto, qual horário está livre e registrar tudo no lugar certo. É esse trabalho que a Vtech constrói: o agente e as conexões com os sistemas que a sua empresa já usa.",
          "O agente trabalha dentro de limites definidos no projeto. Ele responde a partir das informações da empresa (catálogo, políticas, manuais), não inventa preço nem prazo e transfere a conversa para a equipe quando o assunto foge do que ele pode resolver, com o histórico junto para ninguém precisar repetir.",
          "Dá para usar a API oficial do WhatsApp (WhatsApp Business Platform) ou a conexão via WhatsApp Web. A escolha depende do volume de mensagens, do tipo de uso e de quanto a empresa quer investir. Na conversa de diagnóstico mostramos os dois caminhos com prós e contras.",
        ],
      },
      problemas: [
        { dor: "A equipe passa o dia respondendo as mesmas perguntas no WhatsApp.", solucao: "O agente responde dúvidas frequentes na hora e deixa a equipe com o que precisa de gente." },
        { dor: "O cliente pergunta do pedido e alguém precisa abrir o ERP para ver.", solucao: "O agente consulta o pedido no ERP e responde com o status e o rastreio." },
        { dor: "Mensagens fora do horário ficam sem resposta até o dia seguinte.", solucao: "O agente atende 24 horas e registra o que precisa de retorno humano." },
        { dor: "O lead chega pelo WhatsApp e se perde sem cadastro.", solucao: "O agente qualifica o contato e cria o lead no CRM com a origem." },
      ],
      paraQuem: [
        { perfil: "Distribuidoras e indústrias", descricao: "Pedidos, segunda via de boleto, status de entrega e catálogo direto no WhatsApp." },
        { perfil: "Clínicas, salões e prestadores de serviço", descricao: "Agendamento, confirmação, remarcação e lembrete sem ocupar a recepção." },
        { perfil: "Comércio e e-commerce", descricao: "Dúvidas de produto, estoque, troca e acompanhamento de pedido." },
        { perfil: "Escritórios e empresas de serviço B2B", descricao: "Triagem de novos contatos e respostas sobre processos e documentos." },
      ],
      entregaveis: [
        { title: "Agente conversacional no WhatsApp", desc: "Entende linguagem natural, áudio transcrito e responde no tom da sua marca." },
        { title: "Conexão com ERP e CRM", desc: "Consulta e registro em sistemas como Bling, Omie, Tiny e CRMs via API." },
        { title: "Base de conhecimento (RAG)", desc: "Respostas a partir dos seus documentos, catálogo e políticas, com fonte." },
        { title: "Passagem para humano", desc: "Transferência para a equipe com o histórico da conversa, sem o cliente repetir." },
        { title: "Limites e regras", desc: "O que o agente pode e não pode dizer ou fazer, definido no projeto." },
        { title: "Painel de acompanhamento", desc: "Conversas, assuntos mais frequentes, custo por resposta e casos transferidos." },
      ],
      casosDeUso: [
        { title: "Status de pedido e rastreio", desc: "O cliente pergunta pelo número do pedido e recebe situação, nota e rastreio." },
        { title: "Agendamento pelo WhatsApp", desc: "O agente consulta a agenda, oferece horários, confirma e lembra o cliente." },
        { title: "Qualificação de leads", desc: "Perguntas de triagem, registro no CRM e aviso ao vendedor certo." },
        { title: "Segunda via e cobrança", desc: "Envio de boleto ou link de pagamento consultando o financeiro." },
      ],
      stack: [
        { title: "WhatsApp", desc: "API oficial (WhatsApp Business Platform) ou conexão via WhatsApp Web." },
        { title: "Modelos de IA", desc: "OpenAI, Anthropic ou Gemini, escolhidos por custo e qualidade para o caso." },
        { title: "Orquestração", desc: "n8n e serviços próprios para regras, filas e integrações." },
        { title: "Dados", desc: "PostgreSQL com pgvector para a base de conhecimento." },
      ],
      processo: PROCESSO,
      glossario: [
        { termo: "API oficial do WhatsApp", definicao: "Conexão oficial da Meta para empresas (WhatsApp Business Platform), cobrada por conversa." },
        { termo: "RAG", definicao: "Técnica em que a IA busca nos seus documentos antes de responder, para não inventar." },
        { termo: "Handoff", definicao: "Passagem da conversa do agente para uma pessoa da equipe." },
        { termo: "Guardrail", definicao: "Regra que limita o que o agente pode dizer ou fazer." },
      ],
      faq: [
        { q: "Quanto custa um agente de IA para WhatsApp?", a: "Depende do que o agente precisa fazer e de quantos sistemas ele consulta. Depois da conversa de diagnóstico, você recebe uma proposta fechada com escopo, prazo e investimento em até 24 horas úteis. Os custos mensais de uso (mensagens e modelo de IA) também ficam estimados na proposta." },
        { q: "Preciso da API oficial do WhatsApp?", a: "Não necessariamente. A API oficial é a opção mais estável para volume alto. A conexão via WhatsApp Web atende muitos casos com custo menor. Mostramos os dois caminhos no diagnóstico." },
        { q: "O agente pode inventar informação?", a: "O agente responde a partir das informações da empresa e segue limites definidos no projeto. Quando não sabe, diz que não sabe e transfere para a equipe." },
        { q: "Ele consegue consultar meu ERP?", a: "Sim, quando o ERP tem API ou outra forma de acesso aos dados, como Bling, Omie, Tiny e muitos sistemas próprios." },
        { q: "Dá para passar a conversa para uma pessoa?", a: "Sim. A transferência leva o histórico, então o cliente não precisa repetir nada." },
        { q: "Meus dados vão treinar a IA?", a: "Não. Usamos APIs empresariais que não treinam modelos com o seu conteúdo." },
      ],
      relacionados: [
        { slug: "chatbot-com-ia", title: "Chatbot com IA para empresas", href: "/solucoes/chatbot-com-ia", desc: "Atendimento com IA também no site e em outros canais." },
        { slug: "rag-para-empresas", title: "RAG para empresas", href: "/solucoes/rag-para-empresas", desc: "A base de conhecimento que faz o agente responder certo." },
        { slug: "integracoes", title: "Integrações de sistemas", href: "/servicos/integracoes", desc: "ERP, CRM e pagamentos conversando com o agente." },
      ],
      ctaFinalTitle: "Quer um agente de IA no WhatsApp da sua empresa",
    },
  },
  {
    title: "Chatbot com IA para empresas: atendimento real | Vtech",
    description:
      "Chatbot com IA para empresas no site e no WhatsApp: entende linguagem natural, responde com base nos seus dados e se conecta ao CRM. Sem menu de 1, 2, 3.",
    schemaName: "Chatbot com IA para empresas",
    serviceType: "AI chatbot development",
    card: "Chatbot que conversa de verdade, no site e no WhatsApp, com os dados da sua empresa.",
    data: {
      section: "solucoes",
      vignette: "chatbot",
      slug: "chatbot-com-ia",
      eyebrow: "Chatbot com IA",
      h1: "Chatbot com IA para empresas: conversa de verdade, não menu de opções.",
      subheadline:
        "Chatbots com inteligência artificial que entendem o cliente, respondem a partir das informações da sua empresa e registram tudo no CRM, no site, no WhatsApp ou nos dois.",
      trust: ["Entende linguagem natural", "Responde com base nos seus dados", "Conecta ao CRM e ao WhatsApp"],
      oQueE: {
        title: "O que é um chatbot com IA e como ele difere do chatbot comum",
        paragrafos: [
          "O chatbot comum funciona por árvore de decisão: o cliente escolhe opções num menu e o bot segue um roteiro. Funciona para fluxos simples, mas trava quando a pergunta foge do roteiro. O chatbot com IA usa um modelo de linguagem para entender o que o cliente escreveu, mesmo com erros ou de jeitos diferentes, e montar a resposta.",
          "Para responder certo, o chatbot com IA precisa conhecer a empresa. Por isso ele é ligado a uma base de conhecimento (catálogo, políticas, perguntas frequentes, documentos) e, quando faz sentido, aos sistemas da empresa, como CRM e ERP. Assim ele responde com a informação real, e não com um texto genérico.",
          "Um bom projeto também define limites: o que o chatbot pode responder, quando ele deve passar para uma pessoa e o que nunca deve prometer. Isso evita respostas inventadas e mantém a experiência do cliente sob controle.",
        ],
      },
      problemas: [
        { dor: "O chatbot atual só funciona por menu e o cliente desiste.", solucao: "O chatbot com IA entende a pergunta escrita do jeito do cliente." },
        { dor: "As respostas são genéricas e não resolvem.", solucao: "As respostas vêm da base de conhecimento e dos sistemas da empresa." },
        { dor: "O contato do site some sem registro.", solucao: "Cada conversa vira registro no CRM, com o assunto e a origem." },
        { dor: "Ninguém sabe o que os clientes mais perguntam.", solucao: "Um painel mostra os assuntos mais frequentes e os casos transferidos." },
      ],
      paraQuem: [
        { perfil: "Empresas com muito atendimento repetitivo", descricao: "Dúvidas de produto, prazo, política de troca, horários e documentos." },
        { perfil: "Times comerciais B2B", descricao: "Triagem de quem chega pelo site antes de ocupar o vendedor." },
        { perfil: "Suporte de software e serviços", descricao: "Respostas a partir de manuais e base de ajuda." },
        { perfil: "Operações com vários canais", descricao: "Mesmo cérebro no site e no WhatsApp, com histórico unificado." },
      ],
      entregaveis: [
        { title: "Chatbot no site", desc: "Janela de conversa leve, com a identidade da sua marca." },
        { title: "Chatbot no WhatsApp", desc: "O mesmo atendimento no canal onde o cliente já está." },
        { title: "Base de conhecimento", desc: "Seus documentos e perguntas frequentes organizados para a IA." },
        { title: "Integração com CRM", desc: "Lead e histórico registrados automaticamente." },
        { title: "Regras e passagem para humano", desc: "Limites claros e transferência com o histórico." },
        { title: "Relatórios", desc: "Assuntos, resolução, transferências e custo por conversa." },
      ],
      casosDeUso: [
        { title: "Pré-venda no site", desc: "Responde dúvidas de produto e agenda conversa com o comercial." },
        { title: "Suporte de primeiro nível", desc: "Resolve as dúvidas comuns e abre chamado quando precisa." },
        { title: "Atendimento de pós-venda", desc: "Pedido, troca, garantia e segunda via." },
        { title: "Atendimento interno", desc: "Funcionários consultando políticas e procedimentos da empresa." },
      ],
      stack: [
        { title: "Modelos de IA", desc: "OpenAI, Anthropic ou Gemini, conforme custo e qualidade." },
        { title: "Base de conhecimento", desc: "RAG com PostgreSQL e pgvector." },
        { title: "Canais", desc: "Widget no site e WhatsApp (API oficial ou WhatsApp Web)." },
        { title: "Integrações", desc: "CRM, ERP e helpdesk via API e webhooks." },
      ],
      processo: PROCESSO,
      faq: [
        { q: "Qual a diferença entre chatbot com IA e agente de IA?", a: "O chatbot com IA conversa e responde. O agente de IA, além de conversar, executa ações nos sistemas, como consultar um pedido ou criar um agendamento. Muitos projetos começam como chatbot e evoluem para agente." },
        { q: "O chatbot com IA funciona no site e no WhatsApp ao mesmo tempo?", a: "Sim. O mesmo atendimento pode rodar nos dois canais, com histórico registrado no CRM." },
        { q: "Quanto tempo leva para colocar no ar?", a: "Depende do escopo e das integrações. O prazo vem por escrito na proposta, depois do diagnóstico." },
        { q: "E se o chatbot não souber responder?", a: "Ele avisa que não sabe e passa para uma pessoa da equipe, com o histórico da conversa." },
        { q: "Meus dados ficam seguros?", a: "Usamos APIs empresariais que não treinam modelos com o seu conteúdo, e o acesso aos sistemas é restrito ao necessário." },
      ],
      relacionados: [
        { slug: "agente-de-ia-para-whatsapp", title: "Agente de IA para WhatsApp", href: "/solucoes/agente-de-ia-para-whatsapp", desc: "Quando o atendimento precisa agir nos sistemas." },
        { slug: "rag-para-empresas", title: "RAG para empresas", href: "/solucoes/rag-para-empresas", desc: "Respostas a partir dos seus documentos." },
        { slug: "automacoes-com-ia", title: "Automações com IA", href: "/servicos/automacoes-com-ia", desc: "IA aplicada a outros processos da operação." },
      ],
      ctaFinalTitle: "Quer um chatbot com IA que resolve de verdade",
    },
  },
  {
    title: "Agência de automação com IA para empresas | Vtech",
    description:
      "Agência de automação com IA: agentes, integrações e fluxos que tiram o trabalho repetitivo da equipe. Escopo fechado, proposta em 24h úteis e código entregue.",
    schemaName: "Automação de processos com IA",
    serviceType: "Business process automation",
    card: "Agentes, integrações e fluxos que tiram o trabalho repetitivo da sua equipe.",
    data: {
      section: "solucoes",
      vignette: "integracoes",
      slug: "agencia-de-automacao-com-ia",
      eyebrow: "Agência de automação com IA",
      h1: "Agência de automação com IA para tirar o trabalho repetitivo da sua equipe.",
      subheadline:
        "Mapeamos o processo que mais consome a equipe e construímos a automação: agentes de IA, integrações entre sistemas e fluxos que rodam sozinhos, com escopo fechado e código entregue.",
      trust: ["Escopo fechado por escrito", "Proposta em até 24h úteis", "Código e documentação entregues"],
      oQueE: {
        title: "O que uma agência de automação com IA faz",
        paragrafos: [
          "Automação com IA é usar software para executar tarefas que hoje dependem de alguém copiando, conferindo ou digitando informação. A IA entra quando a tarefa envolve entender texto, documento ou conversa, como ler um boleto em PDF, classificar um e-mail ou responder um cliente. O resto da automação é integração: fazer os sistemas trocarem dados sozinhos.",
          "Uma agência de automação com IA começa pelo processo, não pela ferramenta. O primeiro passo é entender onde a equipe perde tempo, quais sistemas estão envolvidos e o que dá para automatizar com segurança. Só depois vem a escolha da tecnologia: um agente de IA, uma integração por API, um fluxo no n8n ou um sistema sob medida.",
          "Na Vtech o projeto tem escopo fechado, definido por escrito antes de começar, e a entrega inclui o código e a documentação. A sustentação mensal é opcional: a automação é da sua empresa.",
        ],
      },
      problemas: [
        { dor: "Pedidos, cadastros e boletos são digitados à mão entre sistemas.", solucao: "Integrações levam o dado de um sistema ao outro sem redigitação." },
        { dor: "Documentos chegam por e-mail e alguém precisa ler e lançar.", solucao: "A IA lê o documento, extrai os dados e lança no sistema certo." },
        { dor: "O atendimento repete as mesmas respostas o dia inteiro.", solucao: "Um agente de IA responde e resolve o que é repetitivo." },
        { dor: "Relatórios são montados em planilha toda semana.", solucao: "Painéis e relatórios gerados automaticamente a partir dos sistemas." },
      ],
      paraQuem: [
        { perfil: "Backoffice e financeiro", descricao: "Lançamentos, conciliação, contas a pagar e conferência de documentos." },
        { perfil: "Comercial e atendimento", descricao: "Leads, follow-up, respostas e registro no CRM." },
        { perfil: "Operação e logística", descricao: "Pedidos, estoque, status de entrega e avisos ao cliente." },
        { perfil: "Diretoria", descricao: "Números da operação sem depender de planilha manual." },
      ],
      entregaveis: [
        { title: "Diagnóstico do processo", desc: "Onde a equipe perde tempo e o que dá para automatizar com segurança." },
        { title: "Agentes de IA", desc: "Atendimento, triagem e leitura de documentos com IA." },
        { title: "Integrações entre sistemas", desc: "ERP, CRM, e-commerce, pagamentos e planilhas conectados." },
        { title: "Fluxos automatizados", desc: "Regras que rodam sozinhas, com tratamento de falha e reprocessamento." },
        { title: "Monitoramento", desc: "Você vê o que rodou, o que falhou e o custo de cada etapa." },
        { title: "Documentação e handoff", desc: "Código e documentação técnica entregues à sua equipe." },
      ],
      casosDeUso: [
        { title: "Pedido do WhatsApp direto no ERP", desc: "O pedido do cliente entra no sistema sem ninguém digitar." },
        { title: "Boleto por e-mail lançado em contas a pagar", desc: "A IA extrai valor e vencimento e lança no financeiro." },
        { title: "Lead do site no CRM com aviso ao vendedor", desc: "Contato qualificado e distribuído na hora." },
        { title: "Relatório semanal automático", desc: "Números consolidados dos sistemas, sem planilha manual." },
      ],
      stack: [
        { title: "Orquestração", desc: "n8n e serviços próprios em Node.js ou Python." },
        { title: "IA", desc: "OpenAI, Anthropic e Gemini; RAG com pgvector." },
        { title: "Integrações", desc: "APIs, webhooks e filas com reprocessamento." },
        { title: "Infraestrutura", desc: "Cloudflare, Vercel ou servidor próprio, conforme o projeto." },
      ],
      processo: PROCESSO,
      faq: [
        { q: "Por onde começar a automatizar?", a: "Pelo processo que mais consome tempo da equipe e tem regras claras. No diagnóstico mapeamos os candidatos e mostramos o que dá retorno primeiro." },
        { q: "Vocês usam n8n, Make ou Zapier?", a: "Usamos n8n quando faz sentido e desenvolvemos serviços próprios quando o volume ou a regra exigem. A escolha vem do processo, não da ferramenta." },
        { q: "Preciso trocar meus sistemas?", a: "Não. A automação conecta os sistemas que a empresa já usa, desde que eles ofereçam alguma forma de acesso aos dados." },
        { q: "Quanto custa um projeto de automação com IA?", a: "Depende do processo e das integrações. A proposta vem fechada, com escopo, prazo e investimento, em até 24 horas úteis após o diagnóstico." },
        { q: "Tenho que pagar mensalidade?", a: "Não. Você paga pelo projeto. Sustentação mensal só se fizer sentido para você." },
      ],
      relacionados: [
        { slug: "agente-de-ia-para-whatsapp", title: "Agente de IA para WhatsApp", href: "/solucoes/agente-de-ia-para-whatsapp", desc: "Automação no atendimento do WhatsApp." },
        { slug: "integracoes", title: "Integrações de sistemas", href: "/servicos/integracoes", desc: "ERP, CRM e pagamentos conversando." },
        { slug: "consultoria-tech", title: "Consultoria tech", href: "/servicos/consultoria-tech", desc: "Diagnóstico e roadmap antes de investir." },
      ],
      ctaFinalTitle: "Qual processo da sua equipe você quer automatizar",
    },
  },
  {
    title: "RAG para empresas: IA que responde com seus dados | Vtech",
    description:
      "RAG para empresas: IA que responde a partir dos seus documentos, contratos e manuais, cita a fonte e não inventa. Projeto sob medida com dados fora do treino.",
    schemaName: "RAG para empresas",
    serviceType: "Retrieval-augmented generation",
    card: "IA que responde a partir dos seus documentos e cita de onde tirou a resposta.",
    data: {
      section: "solucoes",
      vignette: "automacoes-com-ia",
      slug: "rag-para-empresas",
      eyebrow: "RAG para empresas",
      h1: "RAG para empresas: IA que responde com os seus documentos e cita a fonte.",
      subheadline:
        "Construímos assistentes e agentes que buscam a resposta nos seus manuais, contratos, políticas e histórico antes de responder, para a IA não inventar.",
      trust: ["Responde citando a fonte", "Seus dados fora do treino", "Precisão e custo medidos"],
      oQueE: {
        title: "O que é RAG e quando a sua empresa precisa",
        paragrafos: [
          "RAG (retrieval-augmented generation, ou geração aumentada por recuperação) é a técnica em que a IA, antes de responder, busca os trechos relevantes nos documentos da empresa e usa esses trechos para montar a resposta. Na prática, é o que faz um assistente de IA responder sobre o seu contrato, o seu manual ou a sua política, e não sobre a internet em geral.",
          "RAG faz sentido quando a informação muda com frequência, é extensa ou é específica da empresa: base de ajuda, contratos, normas internas, catálogo técnico, histórico de atendimento. Quando a pergunta tem resposta fixa e curta, uma regra simples pode bastar, e isso também é dito no diagnóstico.",
          "Um bom projeto de RAG mede a qualidade: separa um conjunto de perguntas reais, verifica se a resposta está certa e se a fonte citada é a correta, e acompanha o custo por resposta. É assim que a precisão melhora com o tempo, em vez de depender de impressão.",
        ],
      },
      problemas: [
        { dor: "A IA genérica responde com confiança, mas inventa.", solucao: "Com RAG a resposta vem dos seus documentos, com a fonte citada." },
        { dor: "A equipe perde tempo procurando informação em manuais e contratos.", solucao: "Um assistente encontra e resume o trecho certo em segundos." },
        { dor: "Ninguém sabe se as respostas da IA estão certas.", solucao: "Um painel mede precisão e custo com perguntas reais." },
        { dor: "Medo de expor dados da empresa.", solucao: "APIs empresariais que não treinam modelos com o seu conteúdo." },
      ],
      paraQuem: [
        { perfil: "Jurídico e contratos", descricao: "Consulta de cláusulas, prazos e condições em contratos." },
        { perfil: "Atendimento e suporte", descricao: "Respostas a partir da base de ajuda e de manuais técnicos." },
        { perfil: "RH e operações", descricao: "Políticas internas, procedimentos e normas da empresa." },
        { perfil: "Comercial técnico", descricao: "Especificações de produto e documentação para propostas." },
      ],
      entregaveis: [
        { title: "Base de conhecimento indexada", desc: "Documentos organizados e preparados para a busca da IA." },
        { title: "Assistente ou agente com RAG", desc: "No WhatsApp, no site ou em uma ferramenta interna." },
        { title: "Citação de fonte", desc: "Cada resposta indica de qual documento e trecho veio." },
        { title: "Avaliação de qualidade", desc: "Conjunto de perguntas reais para medir se a resposta está certa." },
        { title: "Painel de precisão e custo", desc: "Acompanhamento contínuo da qualidade e do gasto." },
        { title: "Atualização dos documentos", desc: "Processo para incluir e atualizar documentos sem refazer tudo." },
      ],
      casosDeUso: [
        { title: "Agente jurídico", desc: "Responde sobre cláusulas e prazos citando o contrato." },
        { title: "Suporte técnico", desc: "Respostas a partir do manual do produto." },
        { title: "Assistente interno", desc: "Funcionários consultando políticas e procedimentos." },
        { title: "Atendimento com base de ajuda", desc: "Cliente recebe a resposta da documentação oficial." },
      ],
      stack: [
        { title: "Busca vetorial", desc: "PostgreSQL com pgvector, ou Pinecone quando o volume pede." },
        { title: "Modelos de IA", desc: "OpenAI, Anthropic ou Gemini para gerar a resposta." },
        { title: "Orquestração", desc: "LangChain ou LangGraph quando o fluxo tem várias etapas." },
        { title: "Avaliação", desc: "Testes automáticos com perguntas reais e respostas esperadas." },
      ],
      processo: PROCESSO,
      glossario: [
        { termo: "RAG", definicao: "Geração aumentada por recuperação: a IA busca nos seus documentos antes de responder." },
        { termo: "Embedding", definicao: "Representação numérica de um texto, usada para encontrar trechos parecidos." },
        { termo: "Busca vetorial", definicao: "Busca por significado, e não só por palavra exata." },
        { termo: "Alucinação", definicao: "Quando a IA inventa uma resposta. O RAG reduz esse risco." },
      ],
      faq: [
        { q: "RAG elimina totalmente as respostas inventadas?", a: "Reduz muito, porque a resposta é montada a partir dos seus documentos e cita a fonte. Além disso, o projeto define o que fazer quando a informação não está na base: dizer que não sabe e passar para uma pessoa." },
        { q: "Quais documentos posso usar?", a: "PDFs, documentos de texto, planilhas, páginas de ajuda e histórico de atendimento, entre outros. No diagnóstico avaliamos o material e o que precisa ser organizado." },
        { q: "Meus documentos vão treinar a IA?", a: "Não. Usamos APIs empresariais que não treinam modelos com o seu conteúdo." },
        { q: "Quanto custa manter um RAG em produção?", a: "O custo mensal depende do volume de perguntas e do tamanho da base. A estimativa vem na proposta, junto com o painel para acompanhar o gasto real." },
        { q: "Preciso de RAG ou de uma solução mais simples?", a: "Se a resposta é fixa e curta, uma regra simples pode bastar. Indicamos o caminho mais simples que resolve." },
      ],
      relacionados: [
        { slug: "agente-de-ia-para-whatsapp", title: "Agente de IA para WhatsApp", href: "/solucoes/agente-de-ia-para-whatsapp", desc: "O RAG atendendo os seus clientes no WhatsApp." },
        { slug: "chatbot-com-ia", title: "Chatbot com IA", href: "/solucoes/chatbot-com-ia", desc: "Atendimento com IA no site e em outros canais." },
        { slug: "automacoes-com-ia", title: "Automações com IA", href: "/servicos/automacoes-com-ia", desc: "Agentes, RAG e IA aplicada à operação." },
      ],
      ctaFinalTitle: "Quer uma IA que responde com os documentos da sua empresa",
    },
  },
  {
    title: "Sistema web sob medida para empresas | Vtech",
    description:
      "Desenvolvimento de sistema web sob medida: a planilha vira sistema com permissões, painéis, aprovações e integração com ERP e CRM. Código entregue a você.",
    schemaName: "Desenvolvimento de sistema web sob medida",
    serviceType: "Custom software development",
    card: "A planilha vira sistema: permissões, painéis, aprovações e integrações.",
    data: {
      section: "solucoes",
      vignette: "sistemas-web",
      slug: "sistema-web-sob-medida",
      eyebrow: "Sistema web sob medida",
      h1: "Sistema web sob medida: a planilha vira sistema, do jeito do seu processo.",
      subheadline:
        "Desenvolvemos sistemas web personalizados para operações que dependem de planilhas ou de um software pronto que não se adapta: permissões por perfil, painéis, fluxos de aprovação e integração com os sistemas que você já usa.",
      trust: ["Escopo fechado por escrito", "Integra com ERP e CRM", "Código e documentação seus"],
      oQueE: {
        title: "Quando vale a pena um sistema web sob medida",
        paragrafos: [
          "Um sistema web sob medida é um software feito para o processo da sua empresa, acessado pelo navegador, sem instalação. Ele faz sentido quando a operação depende de planilhas que ninguém mais controla, quando o software pronto obriga a equipe a trabalhar do jeito dele, ou quando várias ferramentas precisam ser costuradas à mão.",
          "Nem todo caso pede sistema próprio. Se um ERP ou SaaS pronto atende 90% do processo, muitas vezes o melhor caminho é integrar o que falta. No diagnóstico comparamos as opções, inclusive o caminho híbrido: manter o sistema pronto e construir só a parte que é diferencial da sua operação.",
          "Na Vtech o sistema é entregue com o código-fonte e a documentação técnica. A sua equipe, ou outro fornecedor, consegue continuar o trabalho. Não existe dependência obrigatória de mensalidade.",
        ],
      },
      problemas: [
        { dor: "A operação inteira roda em planilhas que se contradizem.", solucao: "Um sistema único, com histórico, permissões e regras claras." },
        { dor: "O software pronto não se adapta ao processo.", solucao: "Sistema feito para o seu fluxo, integrado ao que já funciona." },
        { dor: "Aprovações acontecem por mensagem e se perdem.", solucao: "Fluxos de aprovação com rastro de quem aprovou e quando." },
        { dor: "Os números do dia exigem montar relatório à mão.", solucao: "Painéis operacionais atualizados a partir dos dados do sistema." },
      ],
      paraQuem: [
        { perfil: "Operações que cresceram na planilha", descricao: "Controles de pedidos, produção, estoque ou serviços." },
        { perfil: "Empresas com processo próprio", descricao: "Quando o diferencial do negócio não cabe num software pronto." },
        { perfil: "Áreas com muita aprovação", descricao: "Compras, descontos, reembolsos e contratos." },
        { perfil: "Startups e novos produtos", descricao: "Plataformas web e MVPs com arquitetura para crescer." },
      ],
      entregaveis: [
        { title: "Sistema web responsivo", desc: "Funciona no computador e no celular, sem instalação." },
        { title: "Permissões por perfil", desc: "Cada pessoa vê e edita só o que é dela." },
        { title: "Painéis e relatórios", desc: "Os números da operação sem montar planilha." },
        { title: "Fluxos de aprovação", desc: "Pedidos, compras e descontos com rastro." },
        { title: "Integrações", desc: "Conexão com ERP, CRM, pagamentos e WhatsApp." },
        { title: "Código e documentação", desc: "Tudo entregue para a sua equipe continuar." },
      ],
      casosDeUso: [
        { title: "Controle de pedidos e produção", desc: "Do pedido à entrega, com status visível para todos." },
        { title: "Portal do cliente", desc: "O cliente acompanha pedidos, documentos e boletos." },
        { title: "Gestão de compras com aprovação", desc: "Solicitação, cotação e aprovação em um só lugar." },
        { title: "Painel da diretoria", desc: "Indicadores da operação atualizados todos os dias." },
      ],
      stack: [
        { title: "Frontend", desc: "React, Next.js, Vue ou Inertia, com Tailwind CSS." },
        { title: "Backend", desc: "Node.js, PHP com Laravel ou Python." },
        { title: "Dados", desc: "PostgreSQL, MySQL ou Supabase." },
        { title: "Testes e infra", desc: "Playwright, Pest e Vitest; Cloudflare, Vercel ou Docker." },
      ],
      processo: PROCESSO,
      faq: [
        { q: "Sistema sob medida ou ERP pronto?", a: "Depende de quanto o software pronto atende do seu processo. Comparamos as opções no diagnóstico, incluindo o caminho híbrido de integrar o ERP e construir só o que falta." },
        { q: "Quanto custa um sistema web sob medida?", a: "Depende do escopo. Você recebe uma proposta fechada, com escopo, prazo e investimento, em até 24 horas úteis após o diagnóstico." },
        { q: "O código fica com a minha empresa?", a: "Sim. A entrega inclui o código-fonte, a documentação técnica e o handoff para a sua equipe." },
        { q: "Dá para integrar com o meu ERP?", a: "Sim, quando o ERP oferece API ou outra forma de acesso aos dados, como Bling, Omie, Tiny e muitos sistemas próprios." },
        { q: "Preciso pagar mensalidade?", a: "Não. Você paga pelo projeto. Sustentação mensal é opcional." },
      ],
      relacionados: [
        { slug: "sistemas-web", title: "Sistemas web", href: "/servicos/sistemas-web", desc: "O serviço completo de plataformas sob medida." },
        { slug: "integracoes", title: "Integrações de sistemas", href: "/servicos/integracoes", desc: "Conecte o sistema novo ao que já funciona." },
        { slug: "agencia-de-automacao-com-ia", title: "Automação com IA", href: "/solucoes/agencia-de-automacao-com-ia", desc: "Tire o trabalho repetitivo do processo." },
      ],
      ctaFinalTitle: "Qual planilha da sua operação deveria virar sistema",
    },
  },
  {
    title: "Criação de site em São Paulo para empresas | Vtech",
    description:
      "Criação de site em São Paulo para empresas B2B: rápido, acessível, com SEO técnico e lead direto no WhatsApp ou CRM. Proposta fechada em até 24h úteis.",
    schemaName: "Criação de site institucional em São Paulo",
    serviceType: "Website development",
    card: "Site rápido, que aparece no Google e leva o contato direto para o seu WhatsApp.",
    data: {
      section: "solucoes",
      vignette: "sites-institucionais",
      slug: "criacao-de-site-em-sao-paulo",
      eyebrow: "Criação de site em São Paulo",
      h1: "Criação de site em São Paulo para empresas que querem ser encontradas.",
      subheadline:
        "Criamos sites institucionais rápidos, acessíveis e preparados para o Google, com o contato indo direto para o seu WhatsApp ou CRM. Empresa de São Paulo, atendimento para todo o Brasil.",
      trust: ["Nota alta no PageSpeed", "SEO técnico desde o início", "Lead direto no WhatsApp ou CRM"],
      oQueE: {
        title: "O que um site de empresa precisa ter para gerar contatos",
        paragrafos: [
          "Um site de empresa precisa ser encontrado, carregar rápido e transformar visita em contato. Isso depende de três coisas: SEO técnico (estrutura que o Google entende), conteúdo que responde ao que o cliente procura e um caminho curto até o contato, como o WhatsApp ou um formulário ligado ao CRM.",
          "Velocidade e acessibilidade não são detalhe. O Google usa a experiência no celular para ordenar os resultados, e um site lento perde o visitante antes de ele ler a primeira linha. Por isso medimos o PageSpeed durante o projeto e entregamos o site com as métricas no verde.",
          "A Vtech é uma empresa de tecnologia de São Paulo. Atendemos empresas da capital, da Grande São Paulo e de todo o Brasil, com reuniões online e proposta fechada por escrito antes de começar.",
        ],
      },
      problemas: [
        { dor: "O site não aparece no Google quando o cliente procura o serviço.", solucao: "SEO técnico, estrutura de páginas e conteúdo pensados para a busca." },
        { dor: "O site é lento no celular e o visitante desiste.", solucao: "Site leve, com nota alta no PageSpeed também no celular." },
        { dor: "O contato chega por e-mail e ninguém responde a tempo.", solucao: "Contato direto no WhatsApp ou registrado no CRM." },
        { dor: "O site não transmite a seriedade da empresa.", solucao: "Design próprio, textos claros e informações que geram confiança." },
      ],
      paraQuem: [
        { perfil: "Empresas B2B e prestadores de serviço", descricao: "Indústrias, distribuidoras, consultorias e escritórios." },
        { perfil: "Clínicas, salões e negócios locais", descricao: "Quem precisa aparecer na busca do bairro e da cidade." },
        { perfil: "Empresas sem site", descricao: "Quem hoje depende só de rede social para ser encontrado." },
        { perfil: "Sites antigos e lentos", descricao: "Refazer com tecnologia atual sem perder o que já aparece no Google." },
      ],
      entregaveis: [
        { title: "Site institucional responsivo", desc: "Feito para o celular primeiro, com design próprio." },
        { title: "SEO técnico", desc: "Títulos, descrições, dados estruturados, sitemap e velocidade." },
        { title: "Blog para busca orgânica", desc: "Estrutura de conteúdo para atrair quem pesquisa." },
        { title: "Lead no WhatsApp ou CRM", desc: "Formulário e botões que levam o contato direto para a equipe." },
        { title: "Google Analytics e Search Console", desc: "Medição de visitas, buscas e contatos desde o primeiro dia." },
        { title: "Publicação e handoff", desc: "Site no ar no seu domínio, com acesso e documentação." },
      ],
      casosDeUso: [
        { title: "Primeiro site da empresa", desc: "Presença profissional no Google, além da rede social." },
        { title: "Refação de site antigo", desc: "Site novo mantendo os endereços que já aparecem no Google." },
        { title: "Site com blog", desc: "Conteúdo para atrair clientes que pesquisam o problema." },
        { title: "Landing page de serviço", desc: "Página focada em uma oferta para campanhas e busca." },
      ],
      stack: [
        { title: "Frameworks", desc: "Next.js, TanStack Start ou Astro, conforme o projeto." },
        { title: "Estilo", desc: "Tailwind CSS e design próprio." },
        { title: "Hospedagem", desc: "Cloudflare ou Vercel, com HTTPS e CDN." },
        { title: "Medição", desc: "Google Analytics 4 e Google Search Console." },
      ],
      processo: PROCESSO,
      faq: [
        { q: "Quanto custa criar um site em São Paulo?", a: "Depende do número de páginas, do conteúdo e das integrações. Você recebe uma proposta fechada com escopo, prazo e investimento em até 24 horas úteis após a conversa de diagnóstico." },
        { q: "Vocês atendem empresas fora de São Paulo?", a: "Sim. A Vtech é de São Paulo e atende empresas de todo o Brasil, com reuniões online." },
        { q: "O site já sai otimizado para o Google?", a: "Sim. O SEO técnico faz parte do projeto: estrutura de páginas, títulos, dados estruturados, sitemap e velocidade." },
        { q: "Posso receber os contatos no WhatsApp?", a: "Sim. O site pode levar o contato direto para o WhatsApp ou registrar no seu CRM." },
        { q: "O site fica no meu nome?", a: "Sim. Domínio, hospedagem e código ficam com a sua empresa." },
      ],
      relacionados: [
        { slug: "sites-institucionais", title: "Sites institucionais", href: "/servicos/sites-institucionais", desc: "O serviço completo de sites para empresas B2B." },
        { slug: "chatbot-com-ia", title: "Chatbot com IA no site", href: "/solucoes/chatbot-com-ia", desc: "Atendimento com IA para quem visita o site." },
        { slug: "sistema-web-sob-medida", title: "Sistema web sob medida", href: "/solucoes/sistema-web-sob-medida", desc: "Quando o site precisa virar plataforma." },
      ],
      ctaFinalTitle: "Quer um site que aparece no Google e gera contato",
    },
  },
];

export const getSolucao = (slug: string) => SOLUCOES.find((s) => s.data.slug === slug);

/** Solução indicada no fim de cada artigo do blog (link interno do conteúdo para a página comercial). */
const POST_SOLUCAO: Record<string, string> = {
  "agente-de-ia-no-whatsapp": "agente-de-ia-para-whatsapp",
  "agendamento-pelo-whatsapp-com-ia": "agente-de-ia-para-whatsapp",
  "integracao-bling-whatsapp": "agente-de-ia-para-whatsapp",
  "rag-na-pratica": "rag-para-empresas",
  "custo-agente-ia-producao": "chatbot-com-ia",
  "automacao-de-processos-com-ia": "agencia-de-automacao-com-ia",
  "como-integrar-com-erp": "agencia-de-automacao-com-ia",
  "integracao-bling-omie-tiny": "agencia-de-automacao-com-ia",
  "sistema-sob-medida-ou-erp-pronto": "sistema-web-sob-medida",
  "como-contratar-empresa-de-software": "sistema-web-sob-medida",
  "consultoria-de-ti-para-startups": "sistema-web-sob-medida",
};
const CATEGORY_SOLUCAO: Record<string, string> = {
  "automacao-com-ia": "agencia-de-automacao-com-ia",
  integracoes: "agencia-de-automacao-com-ia",
  "sistemas-sob-medida": "sistema-web-sob-medida",
  "gestao-de-tecnologia": "sistema-web-sob-medida",
  "sites-e-seo": "criacao-de-site-em-sao-paulo",
};
export const solucaoForPost = (postSlug: string, categorySlug: string) =>
  getSolucao(POST_SOLUCAO[postSlug] ?? CATEGORY_SOLUCAO[categorySlug] ?? "");
