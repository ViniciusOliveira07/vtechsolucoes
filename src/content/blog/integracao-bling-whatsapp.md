---
title: "Integração Bling WhatsApp: avisos de pedido, boleto e atendimento automático"
seoTitle: "Integração Bling WhatsApp: avisos de pedido | Vtech"
description: "Como fazer a integração Bling WhatsApp: aviso de pedido, nota fiscal e rastreio, segunda via de boleto, pedido que cai no Bling e os cuidados com opt-in e LGPD."
category: integracoes
tags: [bling, whatsapp, erp, integracao, api, webhook, e-commerce, notificacoes]
author: "Equipe Vtech"
publishedAt: 2026-12-10
updatedAt: 2026-12-10
offerTitle: "Mapa gratuito da integração do seu Bling com o WhatsApp"
offerText: "Conte como os seus pedidos andam no Bling e o que a equipe ainda avisa à mão pelo WhatsApp. Devolvemos quais avisos automatizar primeiro, de onde sai cada informação e qual forma de conexão com o WhatsApp combina com o seu volume."
offerItems: [Avisos de pedido que podem sair sozinhos do Bling, Eventos e dados do Bling usados em cada aviso, Forma de conexão com o WhatsApp para o seu caso, Proposta com escopo e prazo em até 24 horas úteis]
offerAsk: "Quais mensagens a sua equipe envia hoje à mão para os clientes a partir do Bling?"
offerPlaceholder: "Ex.: Usamos o Bling com loja na Nuvemshop. Hoje mandamos rastreio e nota fiscal um por um pelo WhatsApp do atendimento…"
offerCta: "Quero o mapa gratuito"
---

Em muitas empresas que usam o Bling, o pedido anda sozinho dentro do ERP e para na porta do WhatsApp. A nota é emitida, a etiqueta é gerada, o pacote sai, e alguém do atendimento ainda precisa abrir o Bling, copiar o código de rastreio e mandar para o cliente. Quando o volume cresce, essa tarefa atrasa, esquece cliente e lota o WhatsApp de perguntas que o próprio ERP já sabe responder: "meu pedido foi enviado?", "cadê a nota?", "pode mandar o boleto de novo?".

A integração Bling WhatsApp resolve exatamente esse trecho. Este guia mostra quais mensagens podem sair sozinhas, como o pedido feito no WhatsApp entra no Bling, como a integração funciona por dentro e os cuidados para que os avisos não incomodem o cliente.

Se você quer uma visão geral das integrações do Bling com loja virtual, CRM e BI, comece por [integração Bling, Omie e Tiny com CRM, loja virtual e WhatsApp](/blog/integracao-bling-omie-tiny). Aqui o foco é só o WhatsApp.

## O que a integração do Bling com o WhatsApp resolve

A ideia central é simples: cada mudança importante no pedido, dentro do Bling, vira uma mensagem para o cliente, e cada pergunta do cliente sobre o pedido é respondida com o dado que está no Bling. São quatro frentes: avisos automáticos de pedido, cobrança e pagamento, pedido feito pelo WhatsApp e consulta de status. Nenhuma delas exige trocar de ERP ou de número de WhatsApp. O que muda é que a equipe deixa de ser a ponte entre os dois sistemas.

## Aviso de pedido no WhatsApp: as mensagens que podem sair sozinhas

As mensagens que mais aparecem em operações de e-commerce e de venda direta seguem o caminho natural do pedido:

- **Pedido confirmado.** Assim que o pedido entra no Bling, vindo da loja virtual, do marketplace ou do vendedor, o cliente recebe a confirmação com o número do pedido e um resumo dos itens.
- **Pagamento aprovado.** Quando o pagamento é confirmado, o cliente fica sabendo que o pedido seguiu para separação.
- **Pedido faturado e nota fiscal emitida.** Quando a nota é autorizada, a mensagem leva o número da nota e o link para o documento, para o cliente não precisar pedir.
- **Pedido enviado com rastreio.** Quando o código de rastreio é registrado no pedido, o cliente recebe o código e o link da transportadora.
- **Pedido entregue ou com problema.** Se a sua logística informa a entrega ou uma ocorrência (endereço não encontrado, tentativa frustrada), o aviso sai na hora, antes de o cliente reclamar.

No Bling, o andamento do pedido é controlado pela situação do pedido, e cada empresa pode ter situações próprias além das padrão. Por isso, o primeiro passo do projeto é listar as situações que você usa de verdade e decidir quais delas geram mensagem. Nem toda mudança merece aviso: "em separação" ajuda quem vende sob encomenda e sobra para quem despacha no mesmo dia. Cancelamentos, trocas e devoluções costumam pedir uma mensagem escrita ou revisada por uma pessoa.

## Segunda via de boleto e link de pagamento pelo WhatsApp

Pedir o boleto de novo é uma das mensagens mais comuns no WhatsApp de quem vende a prazo ou para empresas. A integração pode cuidar de duas situações:

- **Lembrete de vencimento.** Perto da data, o cliente recebe o aviso com o valor e o caminho para pagar. Depois do vencimento, um segundo aviso, em tom neutro.
- **Segunda via sob demanda.** O cliente pede o boleto no WhatsApp e recebe o documento ou o link sem esperar alguém do financeiro.

O ponto de atenção é de onde vem o boleto. A API do Bling dá acesso às contas a receber, mas o arquivo do boleto ou o link de pagamento depende de como a sua empresa emite a cobrança: pela conta digital ligada ao Bling, pelo banco ou por um gateway de pagamento. Em alguns cenários o link está disponível direto pela integração, em outros é preciso buscar no sistema que emitiu a cobrança. Isso se resolve no desenho do projeto, conferindo o seu caso na documentação oficial, e não no improviso.

Uma regra que evita dor de cabeça: o boleto só vai para o contato cadastrado. Se a segunda via for pedida de outro número, a conversa vai para uma pessoa.

## Pedido feito pelo WhatsApp caindo direto no Bling

Muitas empresas vendem pelo WhatsApp e depois alguém digita o pedido no Bling. É retrabalho e é onde nascem os erros de item, de quantidade e de endereço. A integração pode fazer o caminho inverso:

1. O cliente monta o pedido na conversa, com ajuda de um atendente ou de um assistente automático que consulta produtos, preços e estoque no Bling.
2. Os dados são conferidos com o cliente: itens, quantidades, endereço, forma de pagamento e frete.
3. O pedido é criado no Bling com os mesmos dados, ligado ao cadastro do cliente.
4. O cliente recebe a confirmação, e a partir daí os avisos automáticos seguem como em qualquer outro pedido.

Dois cuidados: use uma chave única, como CPF ou CNPJ, para não criar o mesmo cliente a cada conversa, e confira o estoque no Bling no momento do pedido, e não numa lista copiada de manhã.

## Atendimento consultando o status do pedido sem abrir o Bling

Mesmo com os avisos ligados, o cliente vai perguntar. Há dois jeitos de responder com o dado do Bling:

- **Atendente com o pedido na tela.** A plataforma de atendimento mostra, ao lado da conversa, o último pedido do cliente, a situação, a nota e o rastreio, buscados no Bling. O atendente responde sem trocar de sistema.
- **Assistente automático.** Um agente de IA identifica o cliente pelo número ou pelo CPF, consulta o pedido no Bling e responde. Se o cliente quer trocar o endereço, cancelar ou reclamar, a conversa passa para uma pessoa com o histórico.

O segundo caminho vai além da integração e entra em [automações com IA](/servicos/automacoes-com-ia). Explicamos como esse tipo de assistente funciona, e o que ele deve e não deve fazer, em [agente de IA no WhatsApp](/blog/agente-de-ia-no-whatsapp).

Nos dois casos, a consulta mostra só os pedidos daquele cliente, identificado de forma confiável. Número de pedido digitado por qualquer pessoa não basta para revelar endereço ou nota.

## Como a integração funciona por dentro: API do Bling v3 e webhooks

A integração tem três peças: o Bling, o WhatsApp e um serviço no meio que traduz eventos do ERP em mensagens e perguntas do cliente em consultas ao ERP.

**API do Bling v3.** A versão atual da API do Bling usa autenticação OAuth 2.0: a integração é cadastrada como aplicativo, a empresa autoriza o acesso com os escopos necessários e a integração recebe um token para consultar e gravar dados. É pela API que a integração busca pedidos, notas, contatos e contas a receber, e cria pedidos quando a venda nasce no WhatsApp. A documentação oficial fica no [portal de desenvolvedores do Bling](https://developer.bling.com.br/).

**Webhooks.** Em vez de perguntar ao Bling o tempo todo se algo mudou, a integração pode ser avisada. Segundo a [documentação de webhooks do Bling](https://developer.bling.com.br/webhooks), há avisos para recursos como pedido de venda, nota fiscal, nota fiscal de consumidor, produto e estoque, nas ações de criação, alteração e exclusão. Cada aviso vem assinado, o que permite à integração conferir que a mensagem veio mesmo do Bling. A própria documentação recomenda tratar avisos repetidos sem duplicar efeito e não contar com a ordem de chegada.

Na prática, isso define três regras de construção:

- **Não mandar a mesma mensagem duas vezes.** Se o aviso de nota emitida chegar repetido, o cliente não pode receber o link duas vezes. A integração guarda o que já foi enviado para cada pedido e cada etapa.
- **Respeitar a ordem do pedido, e não a ordem dos avisos.** Se o aviso de "enviado" chegar antes do de "faturado", a integração consulta a situação atual do pedido antes de decidir o que mandar.
- **Conferir de tempos em tempos.** Um aviso pode falhar. Uma consulta periódica de conferência pega os pedidos que mudaram e não geraram mensagem.

**Limites de requisição.** A API do Bling limita a quantidade de chamadas por intervalo de tempo e bloqueia temporariamente quem excede. Os valores estão na página de [limites da API](https://developer.bling.com.br/limites) e podem mudar, então confira antes de dimensionar. Uma integração bem feita usa webhooks para reagir, guarda em cache o que muda pouco e espera e tenta de novo quando atinge o limite.

Se você quer entender as formas de integrar com ERPs em geral, e não só com o Bling, veja [API, banco de dados ou planilha: como integrar com o seu ERP](/blog/como-integrar-com-erp).

## Opções de conexão com o WhatsApp

Do lado do WhatsApp existem dois caminhos, e os dois são usados por empresas no dia a dia.

**API oficial (WhatsApp Business Platform).** É a forma oferecida pela Meta para empresas integrarem sistemas ao WhatsApp, pela Cloud API ou por um provedor parceiro. As mensagens que a empresa inicia, como os avisos de pedido, usam modelos (templates) aprovados, e existe cobrança por mensagem conforme a tabela da Meta, por categoria. Avisos de pedido, nota e rastreio costumam se encaixar como mensagens de utilidade. Quando o cliente escreve, abre-se uma janela de atendimento de 24 horas em que a empresa responde livremente. A documentação fica no [site de desenvolvedores da Meta](https://developers.facebook.com/docs/whatsapp).

**Conexão via WhatsApp Web.** Ferramentas que conectam a integração a um número comum do WhatsApp, como o WhatsApp Web. São rápidas de colocar no ar, não exigem aprovação de modelos e não têm custo por mensagem da Meta. Como não são homologadas pela Meta, pedem cuidado com volume e com quem recebe: o número pode sofrer restrições se for usado para disparos em massa ou para contatos que não esperam mensagem, e a conexão pode precisar de ajustes quando o aplicativo é atualizado.

Para avisos de pedido, com volume moderado e clientes que acabaram de comprar, a conexão via WhatsApp Web funciona bem. Com volume alto ou necessidade de garantias formais, a API oficial é o caminho mais estável. A integração com o Bling pode ser construída para trocar de conexão depois sem refazer as regras.

## Cuidados: opt-in, frequência, LGPD e templates

Um aviso útil vira spam quando sai sem combinar. Os cuidados que fazem diferença:

- **Opt-in claro.** O cliente precisa saber que vai receber atualizações do pedido pelo WhatsApp e ter concordado com isso, por exemplo com uma caixa marcada no checkout ou uma confirmação na primeira conversa. A Meta exige esse consentimento na API oficial, e ele também protege o seu número na conexão via WhatsApp Web.
- **Frequência sob controle.** Escolha as etapas que importam e junte avisos próximos. Pedido faturado e enviado no mesmo dia podem virar uma única mensagem.
- **Saída fácil.** Diga como parar de receber os avisos e respeite o pedido na hora, marcando o cliente para não receber mais.
- **Aviso não é marketing.** Mensagem de pedido não carrega oferta de outro produto, o que mudaria até a categoria na Meta.
- **LGPD.** A [LGPD (Lei nº 13.709/2018)](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) exige base legal para tratar os dados, coleta limitada ao necessário e transparência. Mande só o que o cliente precisa (número do pedido, nota, rastreio), evite expor endereço completo e valores em mensagens que podem ser lidas por outra pessoa, defina por quanto tempo os registros de envio ficam guardados e confira como os fornecedores no caminho tratam os dados. A [ANPD](https://www.gov.br/anpd/pt-br) publica orientações sobre o tema.
- **Templates bem escritos.** Na API oficial, cada aviso é um modelo aprovado com campos variáveis. Escreva modelos curtos, com o número do pedido logo no início e um único link. Modelo confuso gera a pergunta que a automação deveria evitar.

## Perguntas frequentes

### O Bling envia mensagens no WhatsApp sozinho?

O Bling tem integrações e aplicativos de parceiros na sua central de integrações, e alguns cobrem avisos por WhatsApp. Quando eles atendem o seu processo, são um bom começo. Quando você precisa de regras próprias, como avisar só em certas situações, juntar etapas ou ligar os avisos ao atendimento, a integração é construída pela API do Bling.

### Preciso da API oficial do WhatsApp para mandar avisos de pedido?

Não necessariamente. A conexão via WhatsApp Web funciona para avisos a clientes que acabaram de comprar, com volume moderado e boas práticas. A API oficial é a escolha mais estável para volumes altos e para quem precisa de modelos aprovados, número verificado e garantias formais.

### O cliente pode fazer o pedido pelo WhatsApp e ele aparecer no Bling?

Pode. A integração cria o pedido no Bling pela API, com os itens, o cliente e a forma de pagamento combinados na conversa. Os cuidados são conferir o estoque no momento do pedido e evitar cadastros duplicados de cliente.

### E se o webhook do Bling falhar?

Por isso a integração combina webhooks com uma conferência periódica dos pedidos que mudaram. Um aviso perdido é recuperado na rodada seguinte.

## Próximo passo

Se a sua equipe ainda copia rastreio do Bling, manda nota fiscal um por um ou procura boleto para reenviar, [peça o mapa gratuito da integração logo abaixo](#oferta). Mostramos quais avisos automatizar primeiro e qual forma de conexão com o WhatsApp combina com o seu volume.

Conheça também o nosso serviço de [integrações de sistemas](/servicos/integracoes).
