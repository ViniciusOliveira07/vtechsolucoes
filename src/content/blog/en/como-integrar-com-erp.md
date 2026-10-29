---
title: "API, database, or spreadsheet: how to integrate with your ERP"
description: "The ways to connect systems to your ERP, when each one makes sense, and the practices that prevent duplicate orders and lost data."
category: integracoes
tags: [erp, api, integracao]
author: "Vtech team"
publishedAt: 2026-10-27
updatedAt: 2026-10-27
---

Almost every company reaches the same point: the ERP holds the most important data, but the CRM, the online store, customer service, and the team's spreadsheets all live apart from it. Someone copies information from one side to the other, and that is where errors are born. Integration solves this, but there are different paths, and choosing the wrong one creates a new problem.

## Five ways to integrate

### 1. The ERP's official API

This is the preferred path whenever it exists. The vendor documents the operations, guarantees compatibility across versions, and provides support when something breaks. The usual limitations are coverage (not every operation is available) and rate limits on requests per minute.

### 2. Webhooks

Instead of asking the ERP every so often whether something changed, the ERP notifies your system when an event happens: order created, invoice issued, payment confirmed. It is faster and uses fewer resources. It requires a public, secure endpoint that is prepared to receive the same notification more than once.

### 3. Direct database access

Reading from or writing directly to the ERP's tables looks fast, but it is the riskiest path. A vendor update can change the table structure without notice, direct writes can skip business rules the ERP would normally enforce, and many support contracts stop applying. When there is no alternative, the recommendation is read-only access, preferably on a replica or on views created for that purpose.

### 4. Files: spreadsheet, CSV, XML, or SFTP

Many ERPs export and import files in defined layouts. For moderate volumes with no real-time requirement (daily closing, catalog loads, reconciliation), this is a stable, inexpensive solution. The care lies in validating each file before importing it and keeping a history of what was processed.

### 5. Screen automation (RPA)

A bot that clicks through the interface the way a person would. It is the last resort, because it breaks with every visual change and is hard to monitor. It makes sense as a temporary bridge while an API doesn't exist.

## How to choose

| Criterion | The deciding question |
| --- | --- |
| Direction | Do you only need to read data from the ERP, or write to it as well? |
| Latency | Does the information need to arrive in seconds, or can it wait until the end of the day? |
| Volume | Is it dozens of records per day or thousands per hour? |
| Support | Does the vendor document and maintain the chosen access method? |
| Security | Who has access to what, and how is that audited? Is there personal data subject to the LGPD (Brazil's General Data Protection Law)? |

In general, the order of preference is API and webhooks, then files, then database reads, and RPA last. The most common combination in practice is webhooks for events and the API to fetch the details of each one.

## Practices that save you headaches

- **Idempotency.** Each operation carries a unique identifier. If the same order arrives twice, it is written only once.
- **Queue and retries.** When the ERP is down, messages wait in the queue and are reprocessed later instead of being lost.
- **Matching key.** Each record stores the identifier from both systems, so you can trace where it came from and where it went.
- **Log everything.** Every request, response, and error is logged with a timestamp and its content. That is what lets you answer "why didn't this order go through?"
- **Active monitoring.** An alert fires when the integration stops or the error rate climbs, before the team hears about it from a customer.

## Where to start

Start with the flow that eats up the most manual time for your team, not the most complex one. Map where the data comes from, where it goes, how often, and what happens when it is wrong. With that map, the right integration method usually becomes obvious, and the project can be delivered in stages, each with its own return.
