import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_META,
  LOCALES,
  fromAcceptLanguage,
  isLocale,
  readCookie,
  type Locale,
} from "@/lib/i18n";

// Robôs que montam preview de link e indexam o site. Eles rodam em servidores fora do Brasil e
// mandam Accept-Language em inglês, o que faria o link compartilhado sair em inglês no WhatsApp,
// LinkedIn etc. Para eles vale o português, a menos que o link traga ?lang=.
const PREVIEW_BOTS =
  /whatsapp|facebookexternalhit|facebookcatalog|meta-externalfetcher|linkedinbot|twitterbot|slackbot|telegrambot|discordbot|skypeuripreview|teams|pinterest|redditbot|applebot|googlebot|bingbot|duckduckbot|yandex|embedly|iframely|microlink|opengraph|bot\b|crawler|spider|preview/i;

// Decide o idioma de cada requisição (ordem explicada em i18n.tsx).
// No servidor lê cookie e Accept-Language; no navegador, o cookie e o idioma que o servidor já escolheu.
export const resolveLocale = createIsomorphicFn()
  .server((query: unknown): Locale => {
    if (isLocale(query)) return query;
    const cookie = readCookie(getRequestHeader("cookie") ?? "", LOCALE_COOKIE);
    if (isLocale(cookie)) return cookie;
    if (PREVIEW_BOTS.test(getRequestHeader("user-agent") ?? "")) return DEFAULT_LOCALE;
    return fromAcceptLanguage(getRequestHeader("accept-language")) ?? DEFAULT_LOCALE;
  })
  .client((query: unknown): Locale => {
    if (isLocale(query)) return query;
    const cookie = readCookie(document.cookie, LOCALE_COOKIE);
    if (isLocale(cookie)) return cookie;
    const fromHtml = LOCALES.find((l) => LOCALE_META[l].html === document.documentElement.lang);
    return fromHtml ?? fromAcceptLanguage(navigator.languages.join(",")) ?? DEFAULT_LOCALE;
  });
