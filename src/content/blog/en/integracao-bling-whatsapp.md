---
title: "Bling WhatsApp integration: order alerts, payment slips and automatic support"
seoTitle: "Bling WhatsApp integration: order alerts | Vtech"
description: "How to connect Bling to WhatsApp: order, invoice and tracking alerts, payment slip copies, WhatsApp orders that land in Bling, plus opt-in and privacy care."
category: integracoes
tags: [bling, whatsapp, erp, integracao, api, webhook, e-commerce, notificacoes]
author: "Vtech team"
publishedAt: 2026-12-10
updatedAt: 2026-12-10
offerTitle: "Free map of your Bling to WhatsApp integration"
offerText: "Tell us how your orders move through Bling and what your team still sends by hand on WhatsApp. We send back which alerts to automate first, where each piece of data comes from and which WhatsApp connection fits your volume."
offerItems: [Order alerts that can go out on their own from Bling, Bling events and data behind each alert, WhatsApp connection option for your case, Proposal with scope and timeline within 24 business hours]
offerAsk: "Which messages does your team send to customers by hand today based on Bling?"
offerPlaceholder: "E.g.: We use Bling with a Nuvemshop store. Today we send tracking codes and invoices one by one from the support WhatsApp…"
offerCta: "Get my free map"
---

In many companies that run on Bling, the Brazilian ERP, the order moves along on its own inside the system and then stops at WhatsApp's door. The invoice is issued, the shipping label is printed, the package leaves, and someone on the support team still has to open Bling, copy the tracking code and send it to the customer. As volume grows, that task falls behind, customers get missed and WhatsApp fills up with questions the ERP already knows how to answer: "has my order shipped?", "where's my invoice?", "can you send the payment slip again?".

A Bling WhatsApp integration takes care of exactly that gap. This guide covers which messages can go out on their own, how an order placed on WhatsApp lands in Bling, how the integration works under the hood and the precautions that keep alerts from annoying your customers.

If you want an overview of Bling integrations with online stores, CRM and BI, start with [Bling, Omie and Tiny integration with your CRM and online store](/blog/integracao-bling-omie-tiny). Here the focus is WhatsApp only.

## What a Bling and WhatsApp integration solves

The core idea is simple: every meaningful change to an order inside Bling becomes a message to the customer, and every question the customer asks about an order is answered with the data that lives in Bling. There are four fronts: automatic order alerts, billing and payment, orders placed on WhatsApp and status lookups. None of them requires switching ERPs or WhatsApp numbers. What changes is that your team stops being the bridge between the two systems.

## Order alerts on WhatsApp: the messages that can send themselves

The messages that come up most in e-commerce and direct sales follow the natural path of an order:

- **Order confirmed.** As soon as the order lands in Bling, whether from the online store, a marketplace or a sales rep, the customer gets a confirmation with the order number and a summary of the items.
- **Payment approved.** Once payment clears, the customer learns the order has moved on to picking.
- **Order invoiced and invoice issued.** When the invoice (the Brazilian *nota fiscal*) is authorized, the message carries the invoice number and a link to the document, so the customer doesn't have to ask.
- **Order shipped with tracking.** When the tracking code is recorded on the order, the customer gets the code and the carrier's link.
- **Order delivered or with an issue.** If your logistics provider reports a delivery or an incident (address not found, failed attempt), the alert goes out right away, before the customer complains.

In Bling, an order's progress is controlled by its status, and each company can add its own statuses on top of the default ones. So the first step in the project is to list the statuses you actually use and decide which ones trigger a message. Not every change deserves an alert: "picking" helps if you make to order and is noise if you ship the same day. Cancellations, exchanges and returns usually call for a message written or reviewed by a person.

## Payment slip copies and payment links on WhatsApp

Asking for the payment slip again (the *boleto*, a bank payment slip widely used in Brazil) is one of the most common WhatsApp messages for companies that sell on credit or to other businesses. The integration can handle two situations:

- **Due date reminder.** Close to the date, the customer gets a notice with the amount and how to pay. After the due date, a second notice in a neutral tone.
- **Copy on demand.** The customer asks for the slip on WhatsApp and receives the document or the link without waiting for someone in finance.

The key question is where the slip comes from. Bling's API gives access to accounts receivable, but the slip file or the payment link depends on how your company issues the charge: through the digital account linked to Bling, through your bank or through a payment gateway. In some setups the link is available straight through the integration, in others it has to be fetched from the system that issued the charge. That gets settled while designing the project, by checking your case against the official documentation, not by improvising.

One rule that saves headaches: the slip only goes to the contact on file. If a copy is requested from a different number, the conversation goes to a person.

## Orders placed on WhatsApp landing straight in Bling

Many companies sell over WhatsApp and then someone retypes the order in Bling. That's rework, and it's where item, quantity and address errors are born. The integration can run the flow the other way:

1. The customer builds the order in the conversation, helped by an agent or by an automated assistant that looks up products, prices and stock in Bling.
2. The details are confirmed with the customer: items, quantities, address, payment method and shipping.
3. The order is created in Bling with the same details, linked to the customer record.
4. The customer gets the confirmation, and from then on the automatic alerts run like any other order.

Two precautions: use a unique key, such as the customer's tax ID, so you don't create a new customer with every conversation, and check stock in Bling at the moment of the order, not against a list copied that morning.

## Support checking order status without opening Bling

Even with alerts switched on, customers will ask. There are two ways to answer with Bling's data:

- **An agent with the order on screen.** The support platform shows, next to the conversation, the customer's latest order, its status, invoice and tracking, pulled from Bling. The agent answers without switching systems.
- **An automated assistant.** An AI agent identifies the customer by phone number or tax ID, looks up the order in Bling and replies. If the customer wants to change the address, cancel or complain, the conversation moves to a person along with the history.

The second path goes beyond integration and falls under [AI automations](/servicos/automacoes-com-ia). We explain how this kind of assistant works, and what it should and shouldn't do, in [AI agent on WhatsApp](/blog/agente-de-ia-no-whatsapp).

In both cases, the lookup only shows that customer's orders, identified in a reliable way. An order number typed by anyone is not enough to reveal an address or an invoice.

## How the integration works under the hood: Bling API v3 and webhooks

The integration has three parts: Bling, WhatsApp and a service in the middle that turns ERP events into messages and customer questions into ERP lookups.

**Bling API v3.** The current version of Bling's API uses OAuth 2.0: the integration is registered as an app, the company authorizes access with the required scopes and the integration receives a token to read and write data. Through the API, the integration fetches orders, invoices, contacts and receivables, and creates orders when the sale starts on WhatsApp. The official documentation lives on the [Bling developer portal](https://developer.bling.com.br/).

**Webhooks.** Instead of asking Bling over and over whether something changed, the integration can be notified. According to [Bling's webhook documentation](https://developer.bling.com.br/webhooks), there are notifications for resources such as sales orders, invoices, consumer invoices, products and stock, on create, update and delete actions. Each notification is signed, which lets the integration confirm the message really came from Bling. The documentation itself recommends handling repeated notifications without duplicating their effect and not relying on the order in which they arrive.

In practice, that sets three build rules:

- **Never send the same message twice.** If the "invoice issued" notification arrives twice, the customer must not get the link twice. The integration records what was already sent for each order and each step.
- **Follow the order's state, not the notification order.** If "shipped" arrives before "invoiced," the integration checks the order's current status before deciding what to send.
- **Reconcile periodically.** A notification can fail. A periodic check picks up orders that changed and didn't trigger a message.

**Request limits.** Bling's API caps how many calls you can make per time window and temporarily blocks clients that exceed it. The values are on the [API limits page](https://developer.bling.com.br/limites) and can change, so check them before sizing the project. A well-built integration uses webhooks to react, caches what rarely changes and waits and retries when it hits the limit.

If you want to understand the ways to integrate with ERPs in general, not just Bling, see [API, database or spreadsheet: how to integrate with your ERP](/blog/como-integrar-com-erp).

## WhatsApp connection options

On the WhatsApp side there are two paths, and companies use both every day.

**Official API (WhatsApp Business Platform).** This is how Meta lets companies connect their systems to WhatsApp, through the Cloud API or a partner provider. Messages the company starts, like order alerts, use approved templates, and there is a per-message charge based on Meta's rate card, by category. Order, invoice and tracking alerts usually fit as utility messages. When the customer writes in, a 24-hour customer service window opens in which the company can reply freely. The documentation is on [Meta's developer site](https://developers.facebook.com/docs/whatsapp).

**WhatsApp Web connection.** Tools that link the integration to a regular WhatsApp number, the same way WhatsApp Web does. They are quick to set up, need no template approval and carry no Meta per-message fee. Because they aren't approved by Meta, they call for care with volume and recipients: the number can be restricted if it's used for mass messaging or for contacts who aren't expecting a message, and the connection may need adjustments when the app updates.

For order alerts, with moderate volume and customers who just bought something, the WhatsApp Web connection works well. With high volume or a need for formal guarantees, the official API is the more stable path. The Bling integration can be built so you can switch connections later without redoing the rules.

## Precautions: opt-in, frequency, privacy and templates

A useful alert becomes spam when it arrives unannounced. The precautions that matter:

- **Clear opt-in.** Customers need to know they'll get order updates on WhatsApp and to have agreed to it, for example with a checkbox at checkout or a confirmation in the first conversation. Meta requires this consent on the official API, and it also protects your number on a WhatsApp Web connection.
- **Frequency under control.** Pick the steps that matter and merge alerts that land close together. "Invoiced" and "shipped" on the same day can become a single message.
- **Easy way out.** Explain how to stop the alerts and honor the request right away, flagging the customer so they get no more.
- **An alert is not marketing.** Order messages don't carry offers for other products, which would even change the category at Meta.
- **Privacy and LGPD.** Brazil's data protection law, the [LGPD (Law No. 13,709/2018)](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm), requires a legal basis for processing data, collection limited to what's necessary and transparency. Send only what the customer needs (order number, invoice, tracking), avoid exposing full addresses and amounts in messages someone else might read, decide how long send logs are kept and check how every vendor along the way handles the data. Brazil's data protection authority, the [ANPD](https://www.gov.br/anpd/pt-br), publishes guidance on the topic.
- **Well-written templates.** On the official API, each alert is an approved template with variable fields. Keep templates short, with the order number up front and a single link. A confusing template triggers questions, and questions trigger the conversations the automation was supposed to prevent.

## Frequently asked questions

### Does Bling send WhatsApp messages on its own?

Bling has integrations and partner apps in its integration hub, and some of them cover WhatsApp alerts. When they fit your process, they're a good start. When you need your own rules, such as alerting only on certain statuses, merging steps or tying alerts to your support team, the integration is built on Bling's API.

### Do I need the official WhatsApp API to send order alerts?

Not necessarily. The WhatsApp Web connection works for alerts to customers who just bought, with moderate volume and good practices. The official API is the more stable choice for high volumes and for companies that need approved templates, a verified number and formal guarantees.

### Can customers order on WhatsApp and have it show up in Bling?

Yes. The integration creates the order in Bling through the API, with the items, customer and payment method agreed in the conversation. The precautions are checking stock at the moment of the order and avoiding duplicate customer records.

### What if a Bling webhook fails?

That's why the integration combines webhooks with a periodic check of orders that changed. A lost notification is picked up in the next round.

## Next step

If your team still copies tracking codes from Bling, sends invoices one by one or hunts for payment slips to resend, [request the free integration map below](#oferta). We show which alerts to automate first and which WhatsApp connection fits your volume.

Learn more about our [systems integration](/servicos/integracoes) service.
