---
title: "Site lento: como deixar o site mais rápido com Core Web Vitals"
description: "Seu site está lento? Entenda LCP, INP e CLS, aprenda a medir do jeito certo e veja as causas mais comuns de lentidão com a correção para cada uma."
category: sites-e-seo
tags: [site-lento, core-web-vitals, velocidade-do-site, seo, pagespeed]
author: "Equipe Vtech"
publishedAt: 2026-11-26
updatedAt: 2026-11-26
offerTitle: "Auditoria gratuita de velocidade do seu site"
offerText: "Medimos o seu site com dados reais de usuários e de laboratório, encontramos o que deixa cada página lenta e enviamos a lista de correções em ordem de impacto."
offerItems: [Diagnóstico dos Core Web Vitals das páginas principais, Causas da lentidão em cada página, Lista de correções priorizada por impacto, Proposta com escopo e prazo em até 24 horas úteis]
offerAsk: "Qual é o endereço do seu site e qual página mais importa para o seu negócio?"
offerPlaceholder: "Ex.: www.suaempresa.com.br. A página de orçamento demora muito no celular…"
offerCta: "Quero a auditoria gratuita"
---

Você abre o site da sua empresa no celular e espera. A imagem principal aparece aos pedaços, o botão muda de lugar na hora do toque, o menu demora a responder. Se você nota, o seu cliente também nota, e muitas vezes ele não espera: volta para o Google e clica no concorrente.

Site lento não é só incômodo. Ele afeta a forma como o Google avalia as suas páginas e quantas visitas viram contato.

Este guia explica o que são os Core Web Vitals em linguagem simples, como medir a velocidade do jeito certo, quais são as causas mais comuns de lentidão com a correção para cada uma e quando vale mais a pena refazer o site do que continuar remendando.

## Por que a velocidade do site importa para o Google e para as vendas

O Google usa a experiência na página como um dos sinais de classificação, e os Core Web Vitals fazem parte dessa avaliação. Velocidade sozinha não coloca um site ruim no topo: conteúdo relevante continua sendo o principal. Mas, entre páginas parecidas, a que oferece uma experiência melhor tem vantagem.

O efeito mais direto, porém, está nas vendas. Pense no caminho de um cliente:

- Ele pesquisa no celular, muitas vezes com internet móvel instável.
- Clica no seu resultado e vê uma tela branca por alguns segundos.
- Quando a página aparece, tenta tocar em "Pedir orçamento", mas um banner carrega e empurra o botão para baixo.
- Ele toca no lugar errado, se irrita e volta.

Nenhuma dessas etapas aparece no relatório do Google Ads ou nas métricas do site como "cliente perdido por lentidão". Ele simplesmente não vira contato. Por isso velocidade é um problema comercial, não só técnico.

## O que são LCP, INP e CLS, em palavras simples

Os Core Web Vitals são três métricas definidas pelo Google para medir a experiência real de quem usa a página. Cada uma tem um limite oficial de "bom":

| Métrica | O que mede | Em palavras simples | Bom |
|---|---|---|---|
| LCP (Largest Contentful Paint) | Carregamento | Quanto tempo leva para o maior elemento visível (normalmente a imagem principal ou o título) aparecer | até 2,5 s |
| INP (Interaction to Next Paint) | Resposta | Quanto tempo a página demora para reagir depois de um toque, clique ou tecla | até 200 ms |
| CLS (Cumulative Layout Shift) | Estabilidade | Quanto o conteúdo "pula" de lugar enquanto a página carrega | até 0,1 |

Para a página ser considerada boa, o Google olha o 75º percentil das visitas reais: pelo menos três em cada quatro visitas precisam ficar dentro do limite. Ou seja, não basta carregar rápido no seu computador com fibra. Tem que carregar rápido para a maioria dos seus visitantes, no aparelho e na rede que eles usam.

O INP substituiu o antigo FID (First Input Delay) em 2024. Se você encontrar relatórios antigos falando em FID, saiba que a métrica atual é o INP, que é bem mais exigente.

## Como medir a velocidade do site do jeito certo

O erro mais comum é rodar um teste uma vez, ver uma nota e tirar conclusões. Há dois tipos de dado, e eles respondem perguntas diferentes.

Abra o [PageSpeed Insights](https://pagespeed.web.dev/) e digite o endereço da página. O relatório tem duas partes:

- **Dados de campo.** Vêm de visitas reais de usuários do Chrome nos últimos 28 dias. É isso que o Google usa na avaliação. Se aparecer "aprovado" ou "reprovado" na avaliação dos Core Web Vitals, é daqui que vem.
- **Dados de laboratório.** Uma simulação feita na hora, em um celular e uma rede padronizados. Gera a nota de 0 a 100 e a lista de oportunidades. Serve para encontrar a causa, não para dizer como os usuários estão.

Sites com pouco tráfego podem não ter dados de campo suficientes. Nesse caso, use o laboratório como referência e rode o teste mais de uma vez, porque o resultado varia de uma execução para outra.

Uma dica: teste sempre a versão para celular primeiro. É ela que o Google usa para indexar, e é nela que os problemas aparecem.

O PageSpeed Insights analisa uma página por vez. Para ver o site inteiro, use o relatório **Core Web Vitals** do Google Search Console. Ele agrupa as páginas parecidas e mostra quais estão boas, quais precisam de melhorias e quais estão ruins, separando celular e computador.

Depois de corrigir um problema, use o botão "Validar correção". Como os dados de campo cobrem 28 dias, a melhoria leva algumas semanas para aparecer por completo.

## Causas mais comuns de site lento e como corrigir

Na maioria dos sites de empresa, a lentidão vem das mesmas fontes. A tabela mostra cada causa, como ela aparece e o que fazer:

| Causa | Sintoma | Correção |
|---|---|---|
| Imagens pesadas | LCP alto; a foto principal aparece por último | Redimensionar para o tamanho exibido, usar WebP ou AVIF, carregar a imagem principal com prioridade e as demais sob demanda (lazy loading) |
| Excesso de plugins e scripts de terceiros | INP ruim; página trava ao rolar ou tocar | Remover o que ninguém usa, centralizar tags em um gerenciador e carregar scripts não essenciais depois da página |
| Widgets de chat, pop-ups e banners | INP e CLS ruins; botões mudam de lugar | Carregar o widget só após a interação ou alguns segundos depois; reservar o espaço de banners no layout |
| Fontes da web | Texto invisível ou trocando de estilo; CLS | Usar menos variações, hospedar as fontes no próprio site, usar `font-display: swap` e pré-carregar a fonte principal |
| Hospedagem fraca | Servidor demora a responder antes de qualquer coisa aparecer | Migrar para hospedagem com recursos adequados ao tráfego e servidor perto do público |
| Sem CDN e sem cache | Lento para quem está longe do servidor; toda visita refaz o mesmo trabalho | Ativar cache de página e de arquivos estáticos e servir o site por uma CDN |
| Renderização só no navegador | Tela branca enquanto o JavaScript baixa e executa; LCP alto no celular | Renderizar no servidor ou gerar páginas estáticas, enviando o HTML pronto |
| Elementos sem tamanho definido | Conteúdo pula quando imagens, vídeos e anúncios carregam | Definir largura e altura (ou proporção) para imagens, vídeos e iframes |

Comece pelo que o PageSpeed Insights aponta como maior oportunidade na sua página mais importante, normalmente a inicial ou a de serviço que mais recebe visitas. Corrigir uma imagem de 3 MB no topo da página costuma ter mais efeito do que dezenas de ajustes pequenos.

**Um exemplo comum.** Uma página de serviço tem LCP ruim no celular. O diagnóstico mostra que o maior elemento é a foto do topo, enviada direto da câmera, com resolução de impressão, e carregada com lazy loading. Três ajustes resolvem: reduzir a imagem para a largura em que ela aparece, converter para WebP e remover o lazy loading só dela, para que o navegador a busque logo. É uma correção de uma tarde.

Já se o INP é que está ruim e a página carrega cinco ferramentas de rastreamento, um chat, um mapa e um vídeo incorporado, o trabalho é de decisão: o que realmente precisa estar ali.

## Quando vale refazer o site em vez de remendar

Remendar funciona quando o problema é pontual: imagens, cache, um plugin específico. Refazer passa a fazer sentido quando:

- **O tema ou o construtor visual gera código demais.** Alguns construtores carregam scripts e estilos de todos os recursos em todas as páginas, mesmo os que você não usa. Dá para melhorar, mas há um limite.
- **Cada correção quebra outra coisa.** Plugins dependentes uns dos outros, atualizações que você tem medo de fazer.
- **O site é montado inteiro no navegador** e o conteúdo principal só aparece depois que o JavaScript roda.
- **Você já otimizou o que dava** e os dados de campo continuam reprovados.
- **O site também precisa mudar por outros motivos:** estrutura de páginas fraca para SEO, textos desatualizados, falta de integração com o CRM.

Nesses casos, um [site institucional feito sob medida](/servicos/sites-institucionais), com renderização no servidor e só o código necessário, costuma resolver a velocidade e os outros problemas de uma vez. Na Vtech, um site institucional é entregue em até 30 dias, com o código entregue ao cliente.

## Perguntas frequentes

### Qual é uma boa nota no PageSpeed Insights?

A nota de 0 a 100 vem dos dados de laboratório e serve como guia. O que pesa para o Google são os dados de campo: LCP até 2,5 s, INP até 200 ms e CLS até 0,1 para a maioria das visitas. Um site pode ter nota 70 e passar nos Core Web Vitals, ou nota 90 e reprovar com usuários reais.

### Por que o meu site é rápido no computador e lento no celular?

Celulares têm processador mais fraco e muitas vezes uma rede pior. Scripts que rodam sem problema no computador travam no celular, e imagens grandes demoram mais para baixar. Por isso o teste deve começar sempre pela versão móvel.

### Hospedagem mais cara resolve site lento?

Só quando o servidor é o gargalo, o que aparece como demora para começar a carregar. Se o problema são imagens pesadas ou excesso de scripts, uma hospedagem melhor muda pouco. Meça antes de trocar.

### Quanto tempo leva para o Google perceber a melhoria?

O teste de laboratório muda na hora. Os dados de campo usam os últimos 28 dias de visitas, então a melhoria aparece aos poucos nesse período. Acompanhe pelo relatório de Core Web Vitals do Search Console.

### Velocidade sozinha melhora a posição no Google?

Ajuda, mas não substitui conteúdo relevante e uma boa estrutura de páginas. Para o quadro completo, veja [como criar um site profissional que aparece no Google](/blog/como-criar-site-profissional-que-aparece-no-google).

## Próximo passo

Se o seu site está lento e você não sabe por onde começar, [peça a auditoria gratuita de velocidade logo abaixo](#oferta). Medimos as páginas que mais importam, identificamos as causas e enviamos as correções em ordem de impacto, para você aplicar com a sua equipe ou com quem preferir.
