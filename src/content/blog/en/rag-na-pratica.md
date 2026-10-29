---
title: "RAG in practice: when your company needs it, and when it doesn't"
description: "What RAG is, which problems it solves, when a simpler approach is enough, and how to check whether the answers are right."
category: automacao-com-ia
tags: [rag, llm, base-de-conhecimento]
author: "Vtech team"
publishedAt: 2026-10-27
updatedAt: 2026-10-27
offerTitle: "Free assessment: does your case need RAG?"
offerText: "Tell us which documents and questions the agent has to cover. We tell you whether RAG is the way to go or a simpler approach is enough, with estimated architecture and cost."
offerItems: [RAG or a simpler alternative for your case, Estimated architecture and monthly cost, Proposal with scope and timeline within 24 business hours]
offerAsk: "Which documents does the agent need to look up?"
offerPlaceholder: "E.g. 400 contracts and manuals in PDF, used by support and legal…"
offerCta: "Get my free assessment"
---

RAG has become shorthand for "AI that knows the company's documents." The idea is sound and it works, but it is not the answer to every problem. Before investing in a RAG architecture, it pays to understand what it does and when a simpler alternative delivers the same result.

## What RAG is

RAG (Retrieval-Augmented Generation) is a two-step process. When someone asks a question, the system first **retrieves** the most relevant passages from the company's documents. It then hands those passages to the language model along with the question and asks for an answer **based only on them**, ideally citing the source.

The model does not "learn" the documents. On each question, it reads only the part that matters. That means you can update the knowledge base without training anything, and you know exactly where each answer came from.

## When RAG is the right choice

- **The knowledge base is too large to fit in the instructions.** Hundreds of manuals, contracts, or procedures.
- **The content changes often.** New policies, price tables, and product versions go into the base and take effect immediately.
- **The answer has to cite its source.** Legal, compliance, technical support, and any area where "where did this come from?" is a mandatory question.
- **The questions are open-ended.** People ask in different ways, and semantic search finds the right passage even without the exact words.

## When you probably don't need RAG

- **The rules fit on two pages.** If the required knowledge is small and stable, it can go straight into the agent's instructions. That is simpler, cheaper, and more predictable.
- **The question is about structured data.** "How many orders were late this month?" is not answered by searching text passages. It is answered by querying the database, through a tool the agent calls.
- **The task doesn't depend on knowledge.** Classifying an email, extracting fields from an invoice, or summarizing a text the user already sent requires no retrieval at all.

Many good projects combine all three: fixed instructions for the rules, tools to query systems, and RAG only for the document-heavy part.

## The pieces of a well-built RAG

1. **Ingestion.** Documents are read, cleaned, and converted to text. Scanned PDFs need OCR, and tables require care so their structure isn't lost.
2. **Chunking.** Each document is split into pieces with enough context to make sense on their own. Chunks that are too small lose meaning, and chunks that are too large dilute the search.
3. **Embeddings and index.** Each chunk becomes a vector that represents its meaning and is stored in a vector database, such as pgvector.
4. **Retrieval.** Combining semantic search with keyword search (hybrid search) usually gets better results than either one alone. A reranking step helps put the best passages at the top.
5. **Generation with citations.** The model answers using only the passages it received, points to which document each statement came from, and says "I couldn't find it" when the base doesn't cover the question.

## Where RAG usually fails

- **Bad documents.** Old versions mixed with new ones, contradictory information, or poorly extracted text. No architecture fixes a disorganized knowledge base.
- **Aggregation questions.** "Which contracts expire in December?" requires looking at every document, not the five most similar passages. This kind of question calls for structured extraction first.
- **Ignored permissions.** If not every employee can see every document, retrieval has to respect the profile of whoever is asking.

## How to know it's working

Build a set of real questions, asked by the people who will use the system, with the expected answer and the source document for each one. Measure two things separately: whether retrieval brought back the right passage, and whether the final answer is correct and faithful to it. Run this set every time you change documents, chunking, or the model. It is the most reliable way to keep an improvement in one place from making something else worse without anyone noticing.

RAG is an excellent tool when the problem is about documents. Diagnosing first whether that really is the problem avoids building a complex architecture where a well-written instruction or a database query would do the job.

Not sure whether your case calls for RAG? [Request the free assessment below](#oferta) and we will reply with estimated architecture and cost.
