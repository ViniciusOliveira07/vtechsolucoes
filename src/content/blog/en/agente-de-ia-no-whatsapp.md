---
title: "AI agent on WhatsApp: automated customer service for businesses"
description: "How an AI agent on your company's WhatsApp works: what it handles, official API or not, what drives the cost and how to roll it out without risk."
category: automacao-com-ia
tags: [whatsapp, agentes, atendimento, automacao, llm]
author: "Vtech team"
publishedAt: 2026-11-05
updatedAt: 2026-11-05
offerTitle: "Free assessment: what an AI agent could handle on your WhatsApp"
offerText: "Tell us how your company uses WhatsApp today. We show you which conversations an AI agent could resolve on its own, which ones need a person and how much it would cost per month."
offerItems: [Conversations the agent could resolve on its own, Integrations needed with your systems, Estimated monthly cost for your volume, Proposal with scope and timeline within 24 business hours]
offerAsk: "What does your company use WhatsApp for today and how many conversations per month?"
offerPlaceholder: "E.g. sales and order status, about 2,000 conversations a month with 3 agents…"
offerCta: "Get my free assessment"
---

WhatsApp has become the main customer service channel for many companies, and with it came a familiar problem: messages that arrive at night and only get answered the next day, agents repeating the same replies all day long and customers giving up while they wait.

An AI agent on WhatsApp solves much of this, as long as it's built well. This guide shows the difference between an agent and a menu chatbot, what it can really do, why the way you connect to WhatsApp matters, what drives the cost and how to roll it out without putting your number and your customers at risk.

## Menu chatbot or AI agent: what's the difference

A traditional chatbot works as a tree of options: "press 1 for billing, 2 for support." It's predictable, but it only understands what was planned. When a customer writes "I bought last week and it still hasn't arrived, can I change the address?", the menu doesn't know what to do.

An AI agent uses a language model to understand the message as it was written and decide the next step: answer based on the company's information, check a system, ask for missing details or hand the conversation to a person.

| | Menu chatbot | AI agent |
|---|---|---|
| How it understands the customer | Numbered options and keywords | Free text, transcribed audio and typos |
| Off-script questions | Goes back to the menu or gets stuck | Answers if the information exists, or routes it |
| Checking systems | Only in fixed flows | Decides when to check the ERP, CRM or calendar |
| Maintenance | Redesign the tree with every change | Update instructions and knowledge base |
| Predictability | Total | High, with limits and tests |
| Best use | A few options that never change | Varied conversations that need context |

The two can coexist. A fixed flow for resending an invoice, for example, can stay a fixed flow. The agent steps in where conversations vary.

## What an AI agent on WhatsApp can do

The most common tasks in B2B and service companies are these:

- **Answer questions based on your content.** List prices, lead times, return policies, technical specs, required documents. The agent answers from a knowledge base your team maintains, not from what the model "thinks." If the base is large, this usually means RAG, which we explain in [RAG in practice](/blog/rag-na-pratica).
- **Qualify leads.** Ask what the customer needs, company size, region and timeline, log it in the CRM and hand the sales rep a conversation that's already summarized.
- **Schedule.** Check open slots, book a visit, meeting or appointment and send the confirmation.
- **Check orders in the ERP.** Order status, tracking, invoice, stock levels. This requires integrating with the company's system, through an API or another route, as we show in [how to integrate with your ERP](/blog/como-integrar-com-erp).
- **Hand off to a person.** Complaints, negotiations, cases outside the policy or simply when the customer asks. The agent gets the history and a summary, and the customer doesn't have to repeat anything.

What the agent **should not** do without a clear rule: grant discounts, promise deadlines that depend on another team, change sensitive account data or make decisions that require someone's approval today.

## Official WhatsApp API or a WhatsApp Web connection: how to choose

There are two ways to connect an agent to WhatsApp, and companies use both every day. The right choice depends on volume, budget and how the company uses the number.

**Official API (WhatsApp Business Platform).** It's the way Meta offers for companies to connect systems to WhatsApp, directly through the Cloud API or through a partner provider. The number is verified, messages the company initiates use approved templates, and there's a formal path to scale volume. In exchange, there are approval steps and per-message charges according to Meta's pricing. The documentation is on [Meta's developer site](https://developers.facebook.com/docs/whatsapp).

**WhatsApp Web connection.** Tools that connect the agent to a regular WhatsApp number, the same way WhatsApp Web does. They're quick to launch, need no template approval and carry no Meta per-message charges. Since they aren't certified by Meta, they call for some care: the number can be restricted if it's used for mass messaging or to contact people who didn't ask for it, and the connection may need adjustments when the app is updated.

In practice, a WhatsApp Web connection works well for answering people who contact the company, at moderate volume and with good usage practices. The official API makes more sense for high volumes, outbound campaigns and companies that need a verified badge and formal guarantees. Many companies start with the first path and migrate as volume grows.

Two of Meta's rules that apply to the official API and affect the project:

- **24-hour customer service window.** When the customer sends a message, the company can reply freely for 24 hours. Outside that window, it can only start a conversation with an approved template.
- **The agent's purpose.** Platform policies allow AI agents focused on the company's own customer service and sales. General-purpose AI assistants unrelated to the business are not the intended use. Check the current policies before defining the scope.

## What drives the cost of a WhatsApp agent

There's no single price, but there are only a few variables. Once you understand each one, you can compare proposals with more confidence:

1. **Conversation volume.** How many conversations per month and how many messages, on average, each one has.
2. **Language model.** Every processed message consumes tokens. Larger models cost more per token. Many tasks, like classifying intent or extracting a field, work well with smaller models.
3. **Meta's charges.** Meta charges for template messages sent by the company, with rates by category (marketing, utility, authentication) and by country. Replies within the service window opened by the customer follow their own rules. The rate card has changed more than once, so always use the [official pricing page](https://developers.facebook.com/docs/whatsapp/pricing).
4. **API provider.** If you use a Meta partner instead of the Cloud API directly, it may charge a monthly fee or a per-message fee.
5. **Integrations.** Connecting to the ERP, CRM and calendar is development work at the start and maintenance work afterwards.
6. **Maintenance and monitoring.** Updating the knowledge base, reviewing conversations and adjusting instructions.

The detailed token math, with an example, is in [how much it costs to run an AI agent in production](/blog/custo-agente-ia-producao). The key point: you can estimate all of this before you start.

## How to keep the agent safe

An agent that answers wrongly on behalf of your company is worse than no agent at all. The safeguards that make a difference:

- **Answer only from company sources.** The instructions must state explicitly that the agent doesn't make up deadlines, prices or policies. When it can't find the information, it says it will check and routes the conversation.
- **Clear limits.** A list of what it can and cannot do, with numeric rules where they apply (for example, never offer terms outside the price list).
- **A well-designed handoff to a human.** Defined triggers (customer request, frustration, a sensitive topic, two failed attempts) and known human service hours. After hours, the agent says when someone will get back to the customer.
- **Tools with minimum permissions.** If the agent checks orders, it only checks that customer's orders, identified securely. Reading is not the same as changing.
- **Data privacy laws.** Define the legal basis for processing data, collect only what's needed, tell customers they're talking to an automated assistant, set how long conversations are kept and review the data processing terms of your model providers. In Brazil this is the LGPD; in the US, check the state privacy laws that apply to you. For marketing messages, get the customer's consent, which Meta also requires.
- **Tests before every change.** A set of real questions with expected answers, run whenever the instructions, the knowledge base or the model change.

## Step-by-step rollout

1. **Read your current conversations.** Export a few hundred conversations and group them by topic. This shows what repeats, what's simple and what needs a person.
2. **Pick the initial scope.** Start with two or three high-volume, low-risk topics, like FAQs and order status.
3. **Organize the knowledge base.** Policies, price lists and approved answers, in a place the team can update.
4. **Choose the connection.** A WhatsApp Web connection to start fast with your current number, or the official API, direct or through a provider, with a verified number and approved message templates.
5. **Integrate the systems you need.** ERP, CRM and calendar, with access only to what the agent needs.
6. **Write the rules and handoff triggers.** What the agent does, what it never does and when it calls a person.
7. **Test with real conversations.** Use questions taken from your history, including the hard ones and the badly written ones.
8. **Launch in stages.** First during certain hours or for a group of customers, with the team watching the conversations.
9. **Review weekly at first.** Read conversations, fix answers and expand the scope gradually.

## How to measure whether the agent is working

Define the metrics before launch and measure how things were before, so you have a baseline:

- **Resolution rate without a human:** conversations closed by the agent without a transfer, spot-checked (actually resolved, not abandoned).
- **Time to first response**, especially outside business hours.
- **Transfer rate and reasons:** they show where the agent needs content or integration.
- **Wrong answers found in review:** the metric that protects your brand the most.
- **Business results:** qualified leads delivered to sales, appointments booked and orders checked without tying up an agent.
- **Cost per conversation:** tokens, Meta's charges and provider fees, added together.

## Frequently asked questions

### Does an AI agent replace customer service staff?

In most companies, no. It takes over repetitive conversations and first-line triage, and your staff handle what requires negotiation, judgment or empathy. The usual effect is that the team handles difficult cases better, not that it disappears.

### Can I use the WhatsApp number I already have?

Yes. With a WhatsApp Web connection, the agent uses your current number and the team can still see conversations on the phone. With the official API you can also migrate an existing number to the official API, but it stops working in the regular app while it's on the API, except in the setups where Meta allows combined use. Plan the migration carefully so you don't lose the history your team needs.

### Does the agent understand voice messages?

It can. Incoming audio is transcribed before it reaches the model, and the agent replies in text. Transcription adds a small per-minute cost and needs to be tested with the way your customers speak.

### How long does it take to launch an agent?

It depends more on the integrations and on how organized your content is than on the AI itself. An agent that answers questions from a ready knowledge base goes live well before one that checks the ERP, calendar and CRM. A small initial scope shortens the path.

### What if the agent says something wrong?

That's why there are "don't make things up" rules, conversation reviews and a test set. When an error shows up, it's fixed in the knowledge base or the instructions and becomes a test case, so it doesn't come back.

## Next step

Before buying a tool or a project, it pays to know what your WhatsApp actually receives. In our [AI automation](/servicos/automacoes-com-ia) projects, we always start by reading those conversations.

Want to know which conversations an agent could resolve on its own and how much it would cost? [Request the free assessment below](#oferta).
