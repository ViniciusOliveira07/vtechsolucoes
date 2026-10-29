---
title: "Bling, Omie and Tiny integration with your CRM and online store"
description: "How to integrate Bling, Omie or Tiny with your online store, CRM, WhatsApp and BI: ready-made connector or API, how to avoid stock errors and how to scope it."
category: integracoes
tags: [bling, omie, tiny, erp, integracao, api, e-commerce, crm]
author: "Vtech team"
publishedAt: 2026-11-09
updatedAt: 2026-11-09
offerTitle: "Free integration map for your ERP"
offerText: "We look at the ERP you use, the systems around it and the tasks that still depend on copy and paste. We send back which flows to integrate first and which path fits each one: ready-made connector or API."
offerItems: [Data flows between your ERP and your other systems, Ready-made connector or API for each flow, Stock and duplication risks in your setup, Proposal with scope and timeline within 24 business hours]
offerAsk: "Which ERP do you use and which systems does it need to talk to?"
offerPlaceholder: "E.g.: We use NetSuite. We sell on Shopify and Amazon and the sales team uses HubSpot…"
offerCta: "Get my free map"
---

Bling, Omie and Tiny sit at the center of operations for many small and mid-sized companies in Brazil. That is where products, stock, orders, invoices and receivables live. The trouble starts when the online store, the sales team's CRM and the support team's WhatsApp stay outside: someone types the same order twice, the store's stock doesn't match the ERP and a customer asks about tracking and nobody can answer.

This guide covers the most common integrations with these three ERPs, when a ready-made connector is enough and when it pays to build your own integration through the API, the precautions that separate a stable integration from a source of rework, and a step-by-step way to scope the project before hiring anyone. The examples use Bling, Omie and Tiny, but the same reasoning applies to any ERP with an API.

If you are still choosing the technical approach (API, database, files), start with our guide [API, database or spreadsheet: how to integrate with your ERP](/blog/como-integrar-com-erp). Here the focus is the practical case of Bling, Omie and Tiny.

## What you can integrate with Bling, Omie and Tiny

All three offer a public API documented for developers, plus some kind of automatic notification (webhook) for part of their events. In practice, almost any system with its own API can exchange data with them. Four integrations show up most often, covered below.

## Integrating the ERP with your online store and marketplaces

This is the most common integration, especially with Bling and Tiny, which grew up closely tied to e-commerce. Typical flows:

- **Orders** from the store land in the ERP with no retyping, including customer, items, shipping and payment method.
- **Stock** from the ERP updates the store and the marketplaces, so you don't sell what you don't have.
- **Prices and product data** flow from the ERP to the sales channels.
- **Invoice and tracking** flow back from the ERP to the store, which notifies the customer.

## Integrating the ERP with your CRM

The sales team lives in the CRM and finance lives in the ERP. Connecting them means a rep who closes a deal no longer has to ask someone to "enter it in the system." Typical flows:

- **A deal won in the CRM** becomes an order or quote in the ERP.
- **The customer record** is created once and kept in sync on both sides.
- **Financial status** (open invoices, overdue payments) is visible to the rep before a new sale.
- **Purchase history** from the ERP feeds the CRM for repeat and cross-selling.

## Integrating the ERP with WhatsApp and notifications

Many messages your team sends by hand can go out on their own, triggered by ERP events:

- Order received and payment approved confirmations.
- Invoice issued, with the link or the file.
- Tracking code when the order ships.
- Payment reminder before the due date and a notice when an invoice is overdue.

Here the integration reads the event in the ERP and sends the message through an official WhatsApp platform or by email. If you want to go beyond notifications and have an assistant that looks up orders and answers customers, that falls under [AI automations](/servicos/automacoes-com-ia).

## Integrating the ERP with BI and spreadsheets

Built-in ERP reports cover the basics. When leadership wants to cross sales by channel, margin by product and overdue payments by rep, the path is to extract data on a schedule into a database of your own and build dashboards in BI tools or in spreadsheets that refresh themselves. This is the lowest-risk integration, because it only reads from the ERP and never writes.

## Ready-made connector or custom integration via API

Before thinking about development, look at what already exists. All three ERPs have native integrations with many online stores and marketplaces, plus partner apps that connect the ERP to CRMs, support platforms and BI tools. In many scenarios, a ready-made connector does the job in a few days at a predictable cost.

The connector starts to pinch when your process is not the "standard" process it assumes. The table helps you decide:

| Situation | Ready-made connector | Custom integration via API |
| --- | --- | --- |
| Well-known store or marketplace, standard process | Usually works well | Rarely justified |
| Specific business rule (kits, price list per customer, stock per warehouse) | Depends on the configuration options | Implements the exact rule |
| In-house or little-known system on the other side | Usually doesn't exist | The only way |
| Several systems in one flow (store, ERP, CRM and WhatsApp) | Several connectors that don't talk to each other | One flow, one rule |
| Error handling and history | Whatever the connector offers | Logs, alerts and reprocessing built for you |
| Cost | Monthly fee, sometimes by order volume | Development and maintenance, no connector fee |
| Dependency | On the connector vendor | On whoever maintains the code, which can be yours |

A practical rule: use the ready-made connector where your process is the same as everyone else's, and build through the API only the part where it is different. Mixing both is common and is usually the cheapest option in the long run.

## Integration precautions: limits, webhooks, duplicates and stock

Most problematic integrations don't fail for lack of technology. They fail for lack of these precautions.

**API rate limits.** Every ERP API limits how many calls you can make in a given time window. The numbers differ between Bling, Omie and Tiny, change with the plan and get revised by the vendors, so always check your ERP's official documentation. In practice, a well-built integration batches operations, caches what rarely changes (the product catalog, for example) and waits and retries when it receives a limit-exceeded response, instead of failing.

**Webhook or periodic polling.** With a webhook, the ERP tells your integration when something happens. With polling, your integration asks the ERP, every so often, what changed. Webhooks are faster and use fewer calls, but not every event is covered and notifications can get lost. The safest design combines both: webhooks to react right away and a periodic reconciliation check to catch whatever slipped through.

**Duplicate orders and records.** The same notification can arrive twice, and a network failure can make the integration resend an order that already went in. Without protection, that becomes a duplicate order in the ERP and an invoice issued twice. The defense is to store each record's source identifier and check it before writing. For customers, define a unique key (a tax ID or company registration number, for example) so the same customer isn't registered three times under different names.

**Stock conflicts between channels.** When you sell on your own store and on two marketplaces, the same item can sell on two channels almost at the same moment. Decide in advance:

- **Which system is the source of truth** for stock. Usually it's the ERP.
- **How often** stock is pushed to the channels and what triggers an immediate update.
- **Whether there will be safety stock** per channel, to absorb the delay between a sale and the update.
- **What happens** when a sale arrives with no stock: block it, alert someone or hold it as pending.

**Error alerts.** An integration that stops silently is worse than no integration, because everyone assumes the data is flowing. Set up alerts to the team when an order is rejected, when the integration processes nothing for an unusually long time or when errors pile up.

**Logs that answer questions.** Every request, response and error needs to be recorded with date and content. That is what lets you answer, in minutes, the question that always comes up: "why didn't this order make it into the ERP?" Without logs, the answer becomes an investigation.

## Step by step to scope your integration

Before asking any vendor for a quote, do this exercise. It shortens the project and makes proposals comparable.

1. **List the manual tasks.** Everything someone copies from one system to another, with how often it happens and the time spent per week.
2. **Draw each flow.** Where the data comes from, where it goes, what triggers the transfer and who needs to know when it goes wrong.
3. **Define the source of truth** for each piece of information: product, price, stock, customer, order and finance.
4. **Check what already exists.** Look in your ERP's integration marketplace for a ready-made connector for each flow and what it actually covers.
5. **Separate standard from specific.** What the connector handles stays with it. What needs its own rule goes into the API integration.
6. **Pick the first flow** by the manual time it saves, not by its complexity. One flow running well in production teaches more than five half-done ones.
7. **Agree on how to measure success.** For example: zero orders typed by hand, the same stock on every channel at the daily check, no duplicate orders in the month.

With this material, a serious vendor can send back scope, timeline and investment without weeks of meetings. At Vtech, that is how we put together proposals for [systems integration](/servicos/integracoes): flow by flow, with a fixed scope.

## Frequently asked questions

### Does Bling have an API?

Yes. Bling has a public API with developer documentation, webhooks for part of its events and an integration hub with ready-made connectors. Omie and Tiny also offer public APIs. Before building anything, check each one's official documentation for the operations and events available on your plan.

### Can I integrate Omie with the CRM my company already uses?

In most cases, yes. If the CRM has a native integration or a partner app for Omie, start there. If it doesn't, or if your rule differs from the standard one, the integration can be built through both systems' APIs, as long as the CRM also has an API.

### How do I keep my online store's stock in line with Tiny?

Make the ERP the source of truth, push stock to the channels on every sale and also in a periodic reconciliation, and use safety stock on low-stock items. Monitor the integration with alerts, because stock mismatches almost always start with a silent failure.

### Is a custom integration expensive to maintain?

It depends on how it was built. An integration with logs, alerts and documented code handed over to you usually needs little maintenance, mostly around version changes in the ERP's API. What drives the cost up is an integration built in a rush, with no error records, that nobody can diagnose when it stops.

### Do I need to switch ERPs to integrate everything?

Rarely. Bling, Omie and Tiny have enough API coverage for the most common flows. Switching ERPs only makes sense when the problem is the ERP itself, not the lack of integration.

## Next step

If your team still types orders, checks stock by hand or notifies customers one by one, [request the free integration map below](#oferta). We show which flows to integrate first and whether each one calls for a ready-made connector or an API integration.
