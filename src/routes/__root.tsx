import { useEffect } from "react";
import { Outlet, Link, createRootRoute, HeadContent, Scripts, useLocation } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import geistLatin from "../assets/fonts/geist-latin.woff2?url";
import geistMonoLatin from "../assets/fonts/geist-mono-latin.woff2?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { SITE_DESCRIPTION, SITE_NAME, jsonLd, organizationSchema } from "@/lib/site";
import { LOCALE_META, LocaleContext, isLocale, saveLocaleCookie, useLocale, useT } from "@/lib/i18n";
import { initAnalytics, trackPageView } from "@/lib/analytics";
import { resolveLocale } from "@/lib/resolve-locale";

const NOT_FOUND = {
  pt: { tag: "erro", route: "404 · rota não encontrada", title: "Esta página não existe ou mudou de endereço.", home: "Voltar para o início", blog: "Ver o blog" },
  en: { tag: "error", route: "404 · route not found", title: "This page does not exist or has moved.", home: "Back to home", blog: "Read the blog" },
  es: { tag: "error", route: "404 · ruta no encontrada", title: "Esta página no existe o cambió de dirección.", home: "Volver al inicio", blog: "Ver el blog" },
};

const SKIP = { pt: "Pular para o conteúdo", en: "Skip to content", es: "Saltar al contenido" };

function NotFoundComponent() {
  const t = useT(NOT_FOUND);
  return (
    <section className="section">
      <div className="shell grid min-h-[50vh] content-center gap-5">
        <p className="kicker">
          <span className="text-signal">{t.tag}</span> {t.route}
        </p>
        <h1 className="h-section max-w-[18ch]">{t.title}</h1>
        <div className="flex flex-wrap gap-3">
          <Link to="/" className="btn">
            {t.home}
          </Link>
          <Link to="/blog" className="btn btn-line">
            {t.blog}
          </Link>
        </div>
      </div>
    </section>
  );
}

export const Route = createRootRoute({
  // O idioma é decidido antes de renderizar, então a página já chega no idioma certo (sem piscar).
  beforeLoad: ({ location }) => ({
    locale: resolveLocale((location.search as Record<string, unknown>).lang),
  }),
  // CSS e fonte anunciados no cabeçalho HTTP: o navegador começa a baixá-los antes de ler o HTML,
  // e com o "Early Hints" da Cloudflare ligado, antes até de a página ser gerada.
  headers: () => ({
    Link: [
      `<${appCss}>; rel=preload; as=style`,
      `<${geistLatin}>; rel=preload; as=font; type="font/woff2"; crossorigin`,
    ].join(", "),
  }),
  head: ({ match }) => {
    const { locale } = match.context;
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
        { title: SITE_NAME },
        { name: "description", content: SITE_DESCRIPTION[locale] },
        { name: "author", content: SITE_NAME },
        { name: "theme-color", content: "#0a0d11" },
      ],
      links: [
        // fontes do próprio site (ver @font-face em styles.css), pedidas junto com o CSS
        { rel: "preload", href: geistLatin, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
        { rel: "preload", href: geistMonoLatin, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "dns-prefetch", href: "https://wa.me" },
      ],
      scripts: [jsonLd(organizationSchema(locale))],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  // em telas de erro o contexto pode não existir; nesse caso fica o português
  const locale = Route.useRouteContext()?.locale ?? "pt";
  return (
    <html lang={LOCALE_META[locale].html}>
      <head>
        <HeadContent />
      </head>
      <body>
        <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const t = useT(SKIP);

  const locale = useLocale();
  const { href } = useLocation();

  // Quem chega por um link com ?lang= continua nesse idioma ao navegar pelo site.
  useEffect(() => {
    const lang = new URLSearchParams(window.location.search).get("lang");
    if (isLocale(lang)) saveLocaleCookie(lang);
    initAnalytics();
  }, []);

  // GA4: uma visualização por página aberta (o site troca de página sem recarregar)
  useEffect(() => {
    trackPageView(href, LOCALE_META[locale].html);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [href]);

  return (
    <div className="relative bg-background text-foreground">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        {t}
      </a>
      <Header />
      <main id="conteudo">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
