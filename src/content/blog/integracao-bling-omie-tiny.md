---
title: "Integração Bling, Omie e Tiny com CRM, loja virtual e WhatsApp"
description: "Como integrar Bling, Omie ou Tiny com loja virtual, CRM, WhatsApp e BI: conector pronto ou API, cuidados contra erro de estoque e o passo a passo do escopo."
category: integracoes
tags: [bling, omie, tiny, erp, integracao, api, e-commerce, crm]
author: "Equipe Vtech"
publishedAt: 2026-11-09
updatedAt: 2026-11-09
offerTitle: "Mapa de integração gratuito para o seu ERP"
offerText: "Olhamos o ERP que você usa, os sistemas ao redor dele e as tarefas que hoje dependem de copiar e colar. Devolvemos quais fluxos integrar primeiro e qual caminho usar em cada um: conector pronto ou API."
offerItems: [Fluxos de dados entre o ERP e os seus outros sistemas, Conector pronto ou API para cada fluxo, Riscos de estoque e de duplicidade no seu cenário, Proposta com escopo e prazo em até 24 horas úteis]
offerAsk: "Qual ERP você usa e com quais sistemas ele precisa conversar?"
offerPlaceholder: "Ex.: Usamos o Bling. Vendemos na Nuvemshop e no Mercado Livre e o comercial usa o RD Station CRM…"
offerCta: "Quero o mapa gratuito"
---

Bling, Omie e Tiny são o centro da operação de muitas pequenas e médias empresas no Brasil. É lá que ficam produtos, estoque, pedidos, notas fiscais e contas a receber. O problema começa quando a loja virtual, o CRM do time comercial e o WhatsApp do atendimento ficam do lado de fora: alguém digita o pedido duas vezes, o estoque da loja não bate com o do ERP e o cliente pergunta do rastreio e ninguém sabe responder.

Este guia mostra as integrações mais comuns com esses três ERPs, quando um conector pronto resolve e quando vale construir uma integração própria pela API, os cuidados que separam uma integração estável de uma fonte de retrabalho e um passo a passo para definir o escopo antes de contratar.

Se você ainda está decidindo a forma técnica de integrar (API, banco de dados, arquivos), comece pelo nosso guia [API, banco de dados ou planilha: como integrar com o seu ERP](/blog/como-integrar-com-erp). Aqui o foco é o caso prático de Bling, Omie e Tiny.

## O que dá para integrar com Bling, Omie e Tiny

Os três oferecem API pública, documentada para desenvolvedores, e algum mecanismo de aviso automático (webhook) para parte dos eventos. Na prática, isso significa que quase qualquer sistema com API própria pode trocar dados com eles. As integrações que mais aparecem no dia a dia são quatro, detalhadas a seguir.

## Integração do ERP com loja virtual e marketplaces

É a integração mais comum, principalmente no Bling e no Tiny, que nasceram muito ligados ao e-commerce. Os fluxos típicos:

- **Pedidos** da loja entram no ERP sem digitação, com cliente, itens, frete e forma de pagamento.
- **Estoque** do ERP atualiza a loja e os marketplaces, para não vender o que não existe.
- **Preços e cadastro de produtos** saem do ERP para os canais de venda.
- **Nota fiscal e rastreio** voltam do ERP para a loja, que avisa o cliente.

## Integração do ERP com o CRM

O time comercial vive no CRM, e o financeiro vive no ERP. Integrar os dois evita que o vendedor feche um negócio e precise pedir para alguém "lançar no sistema". Os fluxos típicos:

- **Negócio ganho no CRM** vira pedido ou orçamento no ERP.
- **Cadastro do cliente** é criado uma vez e sincronizado nos dois lados.
- **Situação financeira** (títulos em aberto, inadimplência) aparece para o vendedor antes de uma nova venda.
- **Histórico de compras** do ERP alimenta o CRM para recompra e venda cruzada.

## Integração do ERP com WhatsApp e notificações

Muitas mensagens que a equipe envia à mão podem sair sozinhas a partir de eventos do ERP:

- Confirmação de pedido recebido e de pagamento aprovado.
- Nota fiscal emitida, com o link ou o arquivo.
- Código de rastreio quando o pedido é despachado.
- Lembrete de boleto perto do vencimento e aviso de título vencido.

Aqui a integração lê o evento no ERP e dispara a mensagem por uma plataforma de WhatsApp oficial ou por e-mail. Se a ideia é ir além dos avisos e ter um assistente que consulta pedidos e responde clientes, isso entra em [automações com IA](/servicos/automacoes-com-ia).

## Integração do ERP com BI e planilhas

Os relatórios nativos dos ERPs atendem o básico. Quando a diretoria quer cruzar vendas por canal, margem por produto e inadimplência por vendedor, o caminho é extrair os dados periodicamente para uma base própria e montar painéis em ferramentas de BI ou em planilhas que se atualizam sozinhas. É a integração de menor risco, porque só lê dados do ERP, nunca grava.

## Conector pronto ou integração própria via API

Antes de pensar em desenvolvimento, olhe o que já existe. Os três ERPs têm integrações nativas com várias lojas virtuais e marketplaces, além de aplicativos de parceiros que ligam o ERP a CRMs, plataformas de atendimento e ferramentas de BI. Para muitos cenários, um conector pronto resolve em poucos dias e com custo previsível.

O conector começa a apertar quando o seu processo não é o processo "padrão" que ele imagina. A tabela ajuda a decidir:

| Situação | Conector pronto | Integração própria via API |
| --- | --- | --- |
| Loja virtual ou marketplace conhecido, processo padrão | Costuma resolver bem | Raramente se justifica |
| Regra de negócio específica (kits, tabela de preço por cliente, estoque por depósito) | Depende das opções de configuração | Implementa a regra exata |
| Sistema próprio ou pouco conhecido do outro lado | Geralmente não existe | Única saída |
| Vários sistemas no mesmo fluxo (loja, ERP, CRM e WhatsApp) | Vários conectores que não se conversam | Um fluxo único, com uma regra só |
| Controle de erros e histórico | O que o conector oferecer | Logs, alertas e reprocessamento sob medida |
| Custo | Mensalidade, às vezes por volume de pedidos | Desenvolvimento e manutenção, sem mensalidade do conector |
| Dependência | Do fornecedor do conector | De quem mantém o código, que pode ser seu |

Uma regra prática: use o conector pronto onde o seu processo é igual ao de todo mundo e construa pela API apenas o trecho em que ele é diferente. Misturar os dois é comum e costuma ser a opção mais barata no longo prazo.

## Cuidados na integração: limites, webhooks, duplicidade e estoque

A maioria das integrações problemáticas não falha por falta de tecnologia, e sim por falta destes cuidados.

**Limite de requisições da API.** Toda API de ERP limita quantas chamadas você pode fazer em um intervalo de tempo. Os números variam entre Bling, Omie e Tiny, mudam com o plano e são revistos pelos fornecedores, então confira sempre a documentação oficial do seu ERP. Na prática, uma integração bem feita agrupa operações, guarda em cache o que muda pouco (cadastro de produtos, por exemplo) e espera e tenta de novo quando recebe a resposta de limite excedido, em vez de falhar.

**Webhook ou consulta periódica (polling).** Com webhook, o ERP avisa a sua integração quando algo acontece. Com polling, a sua integração pergunta ao ERP, de tempos em tempos, o que mudou. Webhook é mais rápido e gasta menos chamadas, mas nem todo evento está coberto e avisos podem se perder. O desenho mais seguro combina os dois: webhook para reagir na hora e uma consulta periódica de conferência para pegar o que escapou.

**Pedidos e cadastros duplicados.** O mesmo aviso pode chegar duas vezes, e uma falha de rede pode fazer a integração reenviar um pedido que já entrou. Sem proteção, isso vira pedido duplicado no ERP e nota emitida em dobro. A defesa é guardar o identificador de origem de cada registro e conferir antes de gravar. Para clientes, defina uma chave única (CPF ou CNPJ, por exemplo) para evitar o mesmo cliente cadastrado três vezes com nomes diferentes.

**Conflito de estoque entre canais.** Quando você vende na loja própria e em dois marketplaces, o mesmo item pode ser vendido em dois canais quase ao mesmo tempo. Decida antes:

- **Qual sistema é a fonte da verdade** do estoque. Normalmente é o ERP.
- **Com que frequência** o estoque é enviado aos canais e o que dispara uma atualização imediata.
- **Se haverá estoque de segurança** por canal, para absorver o atraso entre a venda e a atualização.
- **O que acontece** quando uma venda chega sem saldo: bloqueia, avisa alguém ou entra como pendente.

**Alertas de erro.** Uma integração parada em silêncio é pior do que nenhuma integração, porque todo mundo acha que os dados estão chegando. Configure avisos para a equipe quando um pedido for rejeitado, quando a integração ficar sem processar nada por um tempo fora do normal ou quando os erros aumentarem.

**Logs que respondem perguntas.** Cada envio, resposta e erro precisa ficar registrado com data e conteúdo. É o que permite responder em minutos a pergunta que sempre aparece: "por que esse pedido não entrou no ERP?". Sem log, a resposta vira uma investigação.

## Passo a passo para definir o escopo da integração

Antes de pedir orçamento a qualquer fornecedor, faça este exercício. Ele reduz o tempo de projeto e deixa as propostas comparáveis.

1. **Liste as tarefas manuais.** Tudo o que alguém copia de um sistema para outro, com a frequência e o tempo gasto por semana.
2. **Desenhe cada fluxo.** De onde o dado sai, para onde vai, o que dispara o envio e quem precisa saber quando der errado.
3. **Defina a fonte da verdade** de cada informação: produto, preço, estoque, cliente, pedido e financeiro.
4. **Confira o que já existe.** Veja na central de integrações do seu ERP se há conector pronto para cada fluxo e o que ele cobre de fato.
5. **Separe o padrão do específico.** O que o conector resolve fica com ele. O que exige regra própria vai para a integração via API.
6. **Escolha o primeiro fluxo** pelo tempo manual que ele economiza, e não pela complexidade. Um fluxo bem feito em produção ensina mais do que cinco pela metade.
7. **Combine como medir o sucesso.** Por exemplo: zero pedidos digitados à mão, estoque igual em todos os canais na conferência diária, nenhum pedido duplicado no mês.

Com esse material, um fornecedor sério consegue devolver escopo, prazo e investimento sem semanas de reunião. Na Vtech, é assim que montamos as propostas de [integrações de sistemas](/servicos/integracoes): fluxo por fluxo, com escopo fechado.

## Perguntas frequentes

### O Bling tem API?

Sim. O Bling tem API pública com documentação para desenvolvedores, além de webhooks para parte dos eventos e uma central de integrações com conectores prontos. Omie e Tiny também oferecem API pública. Antes de desenvolver, confira na documentação oficial de cada um quais operações e eventos estão disponíveis no seu plano.

### Dá para integrar o Omie com o CRM que a minha empresa já usa?

Na maioria dos casos, sim. Se o CRM tiver integração nativa ou aplicativo de parceiro com o Omie, comece por ele. Se não tiver, ou se a sua regra for diferente da padrão, a integração pode ser feita pela API dos dois sistemas, desde que o CRM também tenha API.

### Como evitar que o estoque da loja virtual fique diferente do Tiny?

Defina o ERP como fonte da verdade, envie o estoque aos canais a cada venda e também em uma conferência periódica, e use estoque de segurança nos itens com pouco saldo. Monitore a integração com alertas, porque a diferença de estoque quase sempre começa com uma falha silenciosa.

### Integração própria fica cara para manter?

Depende de como foi construída. Uma integração com logs, alertas e código documentado e entregue a você costuma exigir pouca manutenção, concentrada em mudanças de versão da API do ERP. O que encarece é a integração feita às pressas, sem registro de erros, que ninguém consegue diagnosticar quando para.

### Preciso trocar de ERP para integrar tudo?

Raramente. Bling, Omie e Tiny têm API suficiente para os fluxos mais comuns. Trocar de ERP só faz sentido quando o problema é o próprio ERP, e não a falta de integração.

## Próximo passo

Se a sua equipe ainda digita pedidos, confere estoque na mão ou avisa clientes um por um, [peça o mapa de integração gratuito logo abaixo](#oferta). Mostramos quais fluxos integrar primeiro e se cada um pede conector pronto ou integração via API.
