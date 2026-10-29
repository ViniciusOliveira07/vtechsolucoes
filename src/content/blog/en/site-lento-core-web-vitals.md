---
title: "Slow website? How to make your site faster with Core Web Vitals"
description: "Is your website slow? Understand LCP, INP and CLS, learn to measure speed the right way and see the most common causes of a slow site with the fix for each."
category: sites-e-seo
tags: [site-lento, core-web-vitals, velocidade-do-site, seo, pagespeed]
author: "Vtech team"
publishedAt: 2026-11-26
updatedAt: 2026-11-26
offerTitle: "Free speed audit of your website"
offerText: "We measure your website with real-user and lab data, find what makes each page slow and send you the list of fixes ranked by impact."
offerItems: [Core Web Vitals diagnosis of your main pages, Causes of slowness on each page, Fix list prioritized by impact, Proposal with scope and timeline within 24 business hours]
offerAsk: "What is your website address and which page matters most to your business?"
offerPlaceholder: "E.g.: www.yourcompany.com. The quote request page takes forever on mobile…"
offerCta: "Get my free audit"
---

You open your company's website on your phone and wait. The main image shows up in pieces, the button moves right as you tap it, the menu is slow to respond. If you notice, your customer notices too, and often they do not wait: they go back to Google and click on a competitor.

A slow website is not just annoying. It affects how Google evaluates your pages and how many visits turn into leads.

This guide explains what Core Web Vitals are in plain language, how to measure speed the right way, the most common causes of a slow site with the fix for each one, and when it is better to rebuild the site than to keep patching it.

## Why website speed matters for Google and for sales

Google uses page experience as one of its ranking signals, and Core Web Vitals are part of that assessment. Speed alone will not put a bad website at the top: relevant content is still what matters most. But between similar pages, the one with the better experience has an edge.

The most direct effect, though, is on sales. Think about a customer's path:

- They search on their phone, often on a spotty mobile connection.
- They click your result and stare at a blank screen for a few seconds.
- When the page appears, they try to tap "Request a quote", but a banner loads and pushes the button down.
- They tap the wrong thing, get annoyed and leave.

None of these steps shows up in your Google Ads report or your website analytics as "customer lost to slowness". They simply never become a lead. That is why speed is a business problem, not just a technical one.

## What LCP, INP and CLS mean, in plain words

Core Web Vitals are three metrics defined by Google to measure the real experience of people using a page. Each one has an official "good" threshold:

| Metric | What it measures | In plain words | Good |
|---|---|---|---|
| LCP (Largest Contentful Paint) | Loading | How long it takes for the largest visible element (usually the main image or headline) to appear | up to 2.5 s |
| INP (Interaction to Next Paint) | Responsiveness | How long the page takes to react after a tap, click or key press | up to 200 ms |
| CLS (Cumulative Layout Shift) | Visual stability | How much content "jumps" around while the page loads | up to 0.1 |

For a page to count as good, Google looks at the 75th percentile of real visits: at least three out of four visits must fall within the threshold. In other words, loading fast on your desktop with fiber is not enough. It has to load fast for most of your visitors, on the devices and networks they actually use.

INP replaced the old FID (First Input Delay) in 2024. If you find older reports talking about FID, know that the current metric is INP, which is much stricter.

## How to measure website speed the right way

The most common mistake is to run a test once, see a score and draw conclusions. There are two kinds of data, and they answer different questions.

Open [PageSpeed Insights](https://pagespeed.web.dev/) and enter the page address. The report has two parts:

- **Field data.** Comes from real visits by Chrome users over the last 28 days. This is what Google uses in its assessment. If you see "passed" or "failed" in the Core Web Vitals assessment, it comes from here.
- **Lab data.** A simulation run on the spot, on a standardized phone and network. It produces the 0 to 100 score and the list of opportunities. It helps you find the cause, not tell you how users are doing.

Low-traffic websites may not have enough field data. In that case, use lab data as a reference and run the test more than once, because results vary from one run to the next.

A tip: always test the mobile version first. It is the one Google uses for indexing, and it is where the problems show up.

PageSpeed Insights analyzes one page at a time. To see the whole website, use the **Core Web Vitals** report in Google Search Console. It groups similar pages and shows which are good, which need improvement and which are poor, separately for mobile and desktop.

After fixing a problem, use the "Validate fix" button. Since field data covers 28 days, the improvement takes a few weeks to show up completely.

## Most common causes of a slow website and how to fix them

On most business websites, slowness comes from the same sources. The table shows each cause, how it shows up and what to do:

| Cause | Symptom | Fix |
|---|---|---|
| Heavy images | High LCP; the main photo appears last | Resize to the displayed size, use WebP or AVIF, load the main image with priority and the rest on demand (lazy loading) |
| Too many plugins and third-party scripts | Poor INP; the page freezes when scrolling or tapping | Remove what nobody uses, centralize tags in a tag manager and load non-essential scripts after the page |
| Chat widgets, pop-ups and banners | Poor INP and CLS; buttons move around | Load the widget only after interaction or a few seconds later; reserve banner space in the layout |
| Web fonts | Invisible text or text switching style; CLS | Use fewer variations, host fonts on your own site, use `font-display: swap` and preload the main font |
| Weak hosting | The server takes a long time to respond before anything appears | Move to hosting with resources that match your traffic and a server close to your audience |
| No CDN and no cache | Slow for people far from the server; every visit redoes the same work | Turn on page and static file caching and serve the site through a CDN |
| Client-side-only rendering | Blank screen while JavaScript downloads and runs; high LCP on mobile | Render on the server or generate static pages, sending ready-made HTML |
| Elements without set dimensions | Content jumps when images, videos and ads load | Set width and height (or aspect ratio) for images, videos and iframes |

Start with what PageSpeed Insights flags as the biggest opportunity on your most important page, usually the home page or the service page with the most visits. Fixing a 3 MB image at the top of the page usually does more than dozens of small tweaks.

**A common example.** A service page has a poor LCP on mobile. The diagnosis shows that the largest element is the top photo, uploaded straight from the camera at print resolution and loaded with lazy loading. Three tweaks fix it: shrink the image to the width it is displayed at, convert it to WebP and remove lazy loading from that image only, so the browser fetches it right away. It is an afternoon's fix.

If, on the other hand, INP is the problem and the page loads five tracking tools, a chat, a map and an embedded video, the work is about decisions: what really needs to be there.

## When to rebuild the website instead of patching it

Patching works when the problem is specific: images, cache, one particular plugin. Rebuilding starts to make sense when:

- **The theme or page builder generates too much code.** Some builders load scripts and styles for every feature on every page, even the ones you do not use. You can improve it, but only up to a point.
- **Every fix breaks something else.** Plugins that depend on each other, updates you are afraid to run.
- **The whole site is assembled in the browser** and the main content only appears after JavaScript runs.
- **You have already optimized what you could** and the field data still fails.
- **The site needs to change for other reasons too:** a page structure that is weak for SEO, outdated copy, no integration with your CRM.

In these cases, a [custom-built business website](/servicos/sites-institucionais), with server-side rendering and only the code it needs, usually solves speed and the other problems at once. At Vtech, a business website is delivered in up to 30 days, with the code handed over to the client.

## Frequently asked questions

### What is a good PageSpeed Insights score?

The 0 to 100 score comes from lab data and works as a guide. What counts for Google is field data: LCP up to 2.5 s, INP up to 200 ms and CLS up to 0.1 for most visits. A site can score 70 and pass Core Web Vitals, or score 90 and fail with real users.

### Why is my website fast on desktop and slow on mobile?

Phones have weaker processors and often a worse network. Scripts that run fine on a computer stall on a phone, and large images take longer to download. That is why testing should always start with the mobile version.

### Will more expensive hosting fix a slow website?

Only when the server is the bottleneck, which shows up as a delay before anything starts loading. If the problem is heavy images or too many scripts, better hosting changes little. Measure before you switch.

### How long does it take Google to notice the improvement?

The lab test changes immediately. Field data uses the last 28 days of visits, so the improvement shows up gradually over that period. Track it in the Core Web Vitals report in Search Console.

### Does speed alone improve my Google ranking?

It helps, but it does not replace relevant content and a good page structure. For the full picture, see [how to build a professional website that ranks on Google](/blog/como-criar-site-profissional-que-aparece-no-google).

## Next step

If your website is slow and you do not know where to start, [request the free speed audit below](#oferta). We measure the pages that matter most, identify the causes and send the fixes ranked by impact, so you can apply them with your own team or whoever you prefer.
