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

// Decide o idioma de cada requisição (ordem explicada em i18n.tsx).
// No servidor lê cookie e Accept-Language; no navegador, o cookie e o idioma que o servidor já escolheu.
export const resolveLocale = createIsomorphicFn()
  .server((query: unknown): Locale => {
    if (isLocale(query)) return query;
    const cookie = readCookie(getRequestHeader("cookie") ?? "", LOCALE_COOKIE);
    if (isLocale(cookie)) return cookie;
    return fromAcceptLanguage(getRequestHeader("accept-language")) ?? DEFAULT_LOCALE;
  })
  .client((query: unknown): Locale => {
    if (isLocale(query)) return query;
    const cookie = readCookie(document.cookie, LOCALE_COOKIE);
    if (isLocale(cookie)) return cookie;
    const fromHtml = LOCALES.find((l) => LOCALE_META[l].html === document.documentElement.lang);
    return fromHtml ?? fromAcceptLanguage(navigator.languages.join(",")) ?? DEFAULT_LOCALE;
  });
