---
title: "Quanto custa manter um agente de IA em produção"
description: "Tokens, infraestrutura, monitoramento e manutenção: como estimar o custo mensal de um agente de IA antes de aprovar o projeto."
category: automacao-com-ia
tags: [custos, llm, agentes]
author: "Equipe Vtech"
publishedAt: 2026-10-27
updatedAt: 2026-10-27
offerTitle: "Estimativa gratuita do custo do seu agente de IA"
offerText: "Conte o que o agente vai fazer e o volume esperado. Devolvemos quanto ele custaria por mês em produção, com o modelo e a arquitetura que fazem sentido para o seu caso."
offerItems: [Custo estimado por conversa e por mês, Modelo e arquitetura indicados para o seu volume, Proposta com escopo e prazo em até 24 horas úteis]
offerAsk: "O que o agente faria e quantos atendimentos por mês?"
offerPlaceholder: "Ex.: tirar dúvidas de clientes no WhatsApp, cerca de 3 mil conversas por mês…"
offerCta: "Quero a estimativa gratuita"
---

A pergunta mais comum depois de uma demonstração de agente de IA é "quanto isso vai custar por mês?". A resposta honesta é que depende, mas depende de poucas variáveis, e todas podem ser estimadas antes do projeto começar. Este texto mostra como fazer essa conta.

## Os quatro blocos de custo

O custo de um agente em produção se divide em quatro partes. A primeira costuma ser a única lembrada, e nem sempre é a maior.

1. **Consumo do modelo.** Cada chamada ao modelo de linguagem é cobrada por tokens de entrada (o que você envia) e tokens de saída (o que ele responde). O preço por milhão de tokens varia muito entre modelos e muda com frequência, por isso use sempre a tabela atual do fornecedor.
2. **Infraestrutura.** Servidor ou função que executa o agente, banco de dados, armazenamento de documentos e, se houver RAG, o banco vetorial.
3. **Observabilidade.** Registro das conversas, painel de custo por resposta e alertas. Sem isso, o custo cresce sem que ninguém perceba.
4. **Manutenção.** Ajuste de instruções, atualização da base de conhecimento, correção de respostas erradas e revisão periódica de qualidade. É trabalho humano, e precisa estar no orçamento.

## Como estimar o consumo do modelo

A conta de tokens cabe em uma linha:

```
custo mensal ≈ interações/mês × turnos por interação × (tokens de entrada × preço de entrada + tokens de saída × preço de saída)
```

O ponto que mais surpreende é o tamanho da entrada. Em cada turno, o agente envia ao modelo as instruções do sistema, o histórico da conversa, os trechos de documentos recuperados e a descrição das ferramentas que ele pode usar. Não é raro a entrada ser dez vezes maior que a resposta.

### Um exemplo com números redondos

Imagine um agente de atendimento com estes parâmetros, todos hipotéticos:

| Variável | Valor de exemplo |
| --- | --- |
| Conversas por mês | 3.000 |
| Turnos por conversa | 6 |
| Tokens de entrada por turno | 4.000 |
| Tokens de saída por turno | 300 |

Isso dá 72 milhões de tokens de entrada e 5,4 milhões de saída por mês. Multiplique cada número pelo preço por milhão do modelo escolhido e você tem a ordem de grandeza. A mesma planilha permite comparar modelos lado a lado e ver o efeito de reduzir o contexto.

## Onde o custo foge do controle

- **Histórico sem limite.** Conversas longas reenviam todo o histórico em cada turno. Resumir ou truncar o histórico depois de alguns turnos corta a entrada.
- **Contexto de RAG generoso demais.** Recuperar vinte trechos quando quatro resolvem multiplica a entrada sem melhorar a resposta.
- **Modelo grande para tudo.** Triagem, classificação e extração simples costumam funcionar com modelos menores e mais baratos. O modelo maior fica para o que exige raciocínio.
- **Laços de ferramentas.** Um agente que chama ferramentas em sequência pode fazer várias chamadas ao modelo por turno. Limite o número de passos.
- **Repetição sem cache.** Instruções de sistema e documentos fixos se repetem em todas as chamadas. Vários fornecedores oferecem cache de prompt, que reduz o preço dessa parte repetida.

## O custo que ninguém mede: qualidade

Um agente barato que erra custa caro em retrabalho e em clientes insatisfeitos. Por isso, o orçamento precisa incluir um conjunto de perguntas reais com respostas esperadas, rodado a cada mudança de instrução ou de modelo. Essa bateria de testes também tem custo de tokens, mas é o que impede que uma economia de modelo vire uma queda de qualidade silenciosa.

## Checklist antes de aprovar o projeto

- Quantas interações por mês você espera hoje e em doze meses?
- Qual é o tamanho médio da entrada por turno, já com instruções, histórico e documentos?
- Quais tarefas podem usar um modelo menor?
- Existe painel de custo por conversa e alerta de consumo?
- Quem atualiza a base de conhecimento e com que frequência?
- Como a qualidade será medida antes e depois de cada mudança?

Com essas respostas, o custo deixa de ser uma surpresa e vira uma linha previsível no orçamento. Em todo projeto de automação com IA, fazemos essa projeção ainda na fase de diagnóstico, antes de qualquer linha de código.

Quer saber quanto o seu agente custaria em produção antes de investir? [Peça a estimativa gratuita logo abaixo](#oferta).
