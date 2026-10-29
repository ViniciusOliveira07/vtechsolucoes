---
title: "What it costs to run an AI agent in production"
description: "Tokens, infrastructure, monitoring, and maintenance: how to estimate the monthly cost of an AI agent before approving the project."
category: automacao-com-ia
tags: [custos, llm, agentes]
author: "Vtech team"
publishedAt: 2026-10-27
updatedAt: 2026-10-27
offerTitle: "Free cost estimate for your AI agent"
offerText: "Tell us what the agent will do and the expected volume. We send back what it would cost per month in production, with the model and architecture that fit your case."
offerItems: [Estimated cost per conversation and per month, Model and architecture suited to your volume, Proposal with scope and timeline within 24 business hours]
offerAsk: "What would the agent do, and how many conversations per month?"
offerPlaceholder: "E.g. answer customer questions on WhatsApp, about 3,000 conversations a month…"
offerCta: "Get my free estimate"
---

The most common question after an AI agent demo is "how much will this cost per month?" The honest answer is that it depends, but it depends on only a few variables, and all of them can be estimated before the project starts. This article shows how to run the numbers.

## The four cost blocks

The cost of an agent in production breaks down into four parts. The first is usually the only one people remember, and it isn't always the largest.

1. **Model usage.** Each call to the language model is billed by input tokens (what you send) and output tokens (what it replies). The price per million tokens varies widely between models and changes often, so always use the vendor's current price list.
2. **Infrastructure.** The server or function that runs the agent, the database, document storage, and, if there is RAG, the vector database.
3. **Observability.** Conversation logs, a cost-per-response dashboard, and alerts. Without them, costs grow without anyone noticing.
4. **Maintenance.** Tuning instructions, updating the knowledge base, fixing wrong answers, and periodic quality reviews. This is human work, and it needs to be in the budget.

## How to estimate model usage

The token math fits on one line:

```
monthly cost ≈ interactions/month × turns per interaction × (input tokens × input price + output tokens × output price)
```

What surprises people most is the size of the input. On every turn, the agent sends the model the system instructions, the conversation history, the retrieved document passages, and the descriptions of the tools it can use. It is not unusual for the input to be ten times larger than the response.

### An example with round numbers

Picture a customer service agent with these parameters, all hypothetical:

| Variable | Example value |
| --- | --- |
| Conversations per month | 3,000 |
| Turns per conversation | 6 |
| Input tokens per turn | 4,000 |
| Output tokens per turn | 300 |

That comes to 72 million input tokens and 5.4 million output tokens per month. Multiply each number by the per-million price of the chosen model and you have the order of magnitude. The same spreadsheet lets you compare models side by side and see the effect of trimming the context.

## Where costs get out of hand

- **Unlimited history.** Long conversations resend the full history on every turn. Summarizing or truncating the history after a few turns cuts the input.
- **Overly generous RAG context.** Retrieving twenty passages when four will do multiplies the input without improving the answer.
- **A large model for everything.** Triage, classification, and simple extraction usually work with smaller, cheaper models. Save the larger model for tasks that require reasoning.
- **Tool loops.** An agent that calls tools in sequence can make several model calls per turn. Cap the number of steps.
- **Repetition without caching.** System instructions and fixed documents repeat in every call. Several vendors offer prompt caching, which lowers the price of that repeated part.

## The cost nobody measures: quality

A cheap agent that gets things wrong is expensive in rework and unhappy customers. That is why the budget needs to include a set of real questions with expected answers, run every time the instructions or the model change. This test suite also costs tokens, but it is what keeps a cheaper model from turning into a silent drop in quality.

## Checklist before approving the project

- How many interactions per month do you expect today, and in twelve months?
- What is the average input size per turn, including instructions, history, and documents?
- Which tasks can use a smaller model?
- Is there a cost-per-conversation dashboard and a usage alert?
- Who updates the knowledge base, and how often?
- How will quality be measured before and after each change?

With these answers, cost stops being a surprise and becomes a predictable line in the budget. In every AI automation project, we build this projection during the diagnosis phase, before a single line of code is written.

Want to know what your agent would cost in production before investing? [Request the free estimate below](#oferta).
