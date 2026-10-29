import { createContext, useCallback, useContext } from "react";
import { useRouter } from "@tanstack/react-router";

// Idiomas do site. Português é o nativo; inglês e espanhol são traduções completas.
//
// Como o idioma é escolhido, em ordem:
//   1. ?lang=en na URL (links de hreflang e compartilhamento)
//   2. cookie "lang", gravado quando a pessoa troca no seletor do header
//   3. idioma do navegador (Accept-Language), que reflete a região de quem visita
//   4. português
// Robôs de busca não mandam Accept-Language, então indexam sempre a versão em português;
// as outras versões ficam nos links ?lang= declarados como hreflang.
//
// Textos ficam junto de cada componente, num objeto { pt, en, es } lido com useT().

export const LOCALES = ["pt", "en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "pt";
export const LOCALE_COOKIE = "lang";

/** Um texto (ou estrutura) nos três idiomas. */
export type L<T> = Record<Locale, T>;

export const LOCALE_META: L<{ html: string; og: string; intl: string; label: string; short: string }> = {
  pt: { html: "pt-BR", og: "pt_BR", intl: "pt-BR", label: "Português", short: "PT" },
  en: { html: "en", og: "en_US", intl: "en-US", label: "English", short: "EN" },
  es: { html: "es", og: "es_ES", intl: "es-ES", label: "Español", short: "ES" },
};

export function isLocale(v: unknown): v is Locale {
  return typeof v === "string" && (LOCALES as readonly string[]).includes(v);
}

/** Primeiro idioma suportado na ordem de preferência do navegador (respeita o peso q=). */
export function fromAcceptLanguage(header: string | null | undefined): Locale | undefined {
  if (!header) return undefined;
  const prefs = header
    .split(",")
    .map((part, i) => {
      const [tag, ...params] = part.trim().toLowerCase().split(";");
      const q = Number(params.find((p) => p.trim().startsWith("q="))?.split("=")[1] ?? 1);
      return { base: tag.split("-")[0], q: Number.isFinite(q) ? q : 0, i };
    })
    .filter((p) => p.q > 0)
    .sort((a, b) => b.q - a.q || a.i - b.i);
  for (const p of prefs) if (isLocale(p.base)) return p.base;
  return undefined;
}

export function readCookie(cookieHeader: string, name: string) {
  const m = new RegExp(`(?:^|;\\s*)${name}=([^;]*)`).exec(cookieHeader);
  return m ? decodeURIComponent(m[1]) : undefined;
}

export function saveLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/** Escolhe a versão do idioma atual: `const t = useT(TEXT)`. */
export function useT<T>(dict: L<T>): T {
  return dict[useLocale()];
}

/** Fora de componentes (head(), funções de dados): `pick(TEXT, locale)`. */
export function pick<T>(dict: L<T>, locale: Locale): T {
  return dict[locale] ?? dict[DEFAULT_LOCALE];
}

/** Troca o idioma: grava o cookie e recarrega os dados da rota, sem recarregar a página. */
export function useSetLocale() {
  const router = useRouter();
  return useCallback(
    async (locale: Locale) => {
      saveLocaleCookie(locale);
      document.documentElement.lang = LOCALE_META[locale].html;
      const url = new URL(window.location.href);
      if (url.searchParams.has("lang")) {
        // tira o ?lang= da URL para a escolha do seletor valer daqui em diante
        url.searchParams.delete("lang");
        await router.navigate({ href: url.pathname + url.search + url.hash, replace: true });
      }
      await router.invalidate();
    },
    [router],
  );
}

/** Datas no formato curto de cada idioma, sem depender do fuso do navegador. */
export function formatDate(iso: string, locale: Locale) {
  const [y, m, d] = iso.split("-").map(Number);
  const months: L<string[]> = {
    pt: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"],
  };
  const mon = months[locale][m - 1];
  return locale === "en" ? `${mon} ${d}, ${y}` : `${d} ${mon} ${y}`;
}
