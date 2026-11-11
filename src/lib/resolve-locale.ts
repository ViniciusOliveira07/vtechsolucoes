import { createIsomorphicFn } from "@tanstack/react-start";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

// O site é só em português (nov/2026): ignora ?lang=, cookie e o idioma do navegador.
// Os textos em inglês/espanhol continuam no código, sem uso, caso o site volte a ter idiomas.
export const resolveLocale = createIsomorphicFn()
  .server((_query: unknown): Locale => DEFAULT_LOCALE)
  .client((_query: unknown): Locale => DEFAULT_LOCALE);
