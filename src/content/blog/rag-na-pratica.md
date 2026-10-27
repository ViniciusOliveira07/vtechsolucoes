---
title: "RAG na prática: quando a sua empresa precisa, e quando não precisa"
description: "O que é RAG, em que situações ele resolve, quando uma solução mais simples basta e como avaliar se as respostas estão certas."
category: automacao-com-ia
tags: [rag, llm, base-de-conhecimento]
author: "Equipe Vtech"
publishedAt: 2026-10-27
updatedAt: 2026-10-27
---

RAG virou sinônimo de "IA que conhece os documentos da empresa". A ideia é boa e funciona, mas não é a resposta para todo problema. Antes de investir em uma arquitetura de RAG, vale entender o que ela faz e em que casos uma alternativa mais simples entrega o mesmo resultado.

## O que é RAG

RAG (Retrieval-Augmented Generation, ou geração aumentada por recuperação) é um processo em duas etapas. Quando alguém faz uma pergunta, o sistema primeiro **busca** os trechos mais relevantes nos documentos da empresa. Depois, entrega esses trechos ao modelo de linguagem junto com a pergunta e pede uma resposta **baseada apenas neles**, de preferência citando a fonte.

O modelo não "aprende" os documentos. Ele lê, a cada pergunta, só a parte que interessa. Isso permite atualizar a base sem treinar nada e saber exatamente de onde veio cada resposta.

## Quando RAG é a escolha certa

- **A base é grande demais para caber nas instruções.** Centenas de manuais, contratos ou procedimentos.
- **O conteúdo muda com frequência.** Novas políticas, tabelas e versões de produto entram na base e passam a valer na hora.
- **A resposta precisa citar a fonte.** Jurídico, compliance, suporte técnico e qualquer área em que "de onde veio isso?" é uma pergunta obrigatória.
- **As perguntas são abertas.** Pessoas perguntam de jeitos diferentes, e a busca por significado encontra o trecho certo mesmo sem as palavras exatas.

## Quando você provavelmente não precisa de RAG

- **As regras cabem em duas páginas.** Se o conhecimento necessário é pequeno e estável, ele pode ir direto nas instruções do agente. É mais simples, mais barato e mais previsível.
- **A pergunta é sobre dados estruturados.** "Quantos pedidos atrasaram este mês?" não se responde buscando trechos de texto. Responde-se consultando o banco de dados, com uma ferramenta que o agente aciona.
- **A tarefa não depende de conhecimento.** Classificar um e-mail, extrair campos de uma nota fiscal ou resumir um texto que o usuário já enviou não exigem busca nenhuma.

Muitos projetos bons combinam as três coisas: instruções fixas para as regras, ferramentas para consultar sistemas e RAG apenas para a parte documental.

## As peças de um RAG bem feito

1. **Ingestão.** Os documentos são lidos, limpos e convertidos em texto. PDFs escaneados precisam de OCR, e tabelas exigem cuidado para não perder a estrutura.
2. **Divisão em trechos.** Cada documento é dividido em partes com contexto suficiente para fazer sentido sozinhas. Trechos pequenos demais perdem o significado, e grandes demais diluem a busca.
3. **Embeddings e índice.** Cada trecho vira um vetor que representa seu significado e é guardado em um banco vetorial, como o pgvector.
4. **Busca.** A combinação de busca por significado com busca por palavras-chave (busca híbrida) costuma acertar mais do que qualquer uma das duas sozinha. Uma etapa de reordenação ajuda a colocar os melhores trechos no topo.
5. **Geração com citação.** O modelo responde usando só os trechos recebidos, aponta de qual documento veio cada afirmação e diz "não encontrei" quando a base não cobre a pergunta.

## Onde RAG costuma falhar

- **Documentos ruins.** Versões antigas misturadas com novas, informação contraditória ou texto mal extraído. Nenhuma arquitetura corrige uma base desorganizada.
- **Perguntas de agregação.** "Quais contratos vencem em dezembro?" exige olhar todos os documentos, e não os cinco trechos mais parecidos. Esse tipo de pergunta pede uma extração estruturada antes.
- **Permissões ignoradas.** Se nem todo funcionário pode ver todos os documentos, a busca precisa respeitar o perfil de quem pergunta.

## Como saber se está funcionando

Monte um conjunto de perguntas reais, feitas por quem vai usar o sistema, com a resposta esperada e o documento de origem de cada uma. Meça duas coisas separadamente: se a busca trouxe o trecho certo e se a resposta final está correta e fiel a ele. Rode esse conjunto a cada mudança de documento, de divisão de trechos ou de modelo. É a forma mais confiável de evitar que uma melhoria em um ponto piore outro sem ninguém notar.

RAG é uma ferramenta excelente quando o problema é documental. Diagnosticar primeiro se o problema é mesmo esse evita construir uma arquitetura complexa onde uma instrução bem escrita ou uma consulta ao banco resolveria.
