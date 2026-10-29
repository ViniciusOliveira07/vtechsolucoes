import { localizedUrl, SITE_NAME, SITE_URL } from "@/lib/site";
import { pick, type Locale } from "@/lib/i18n";

// Schemas JSON-LD das páginas de serviço. Ficam fora do ServicePageLayout porque o head() de cada
// rota usa Service e Breadcrumb: importar o layout ali puxava o layout (e o conteúdo da página)
// para o JavaScript inicial do site inteiro.

const BREADCRUMB = {
  pt: { home: "Início", services: "Serviços" },
  en: { home: "Home", services: "Services" },
  es: { home: "Inicio", services: "Servicios" },
};

const COUNTRY = { pt: "Brasil", en: "Brazil", es: "Brasil" };

export function buildServiceSchema(opts: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  locale: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.serviceType,
    areaServed: { "@type": "Country", name: COUNTRY[opts.locale] },
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function buildFAQSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function buildBreadcrumbSchema(eyebrow: string, slug: string, locale: Locale) {
  const t = pick(BREADCRUMB, locale);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.home, item: localizedUrl("/", locale) },
      { "@type": "ListItem", position: 2, name: t.services, item: localizedUrl("/servicos", locale) },
      { "@type": "ListItem", position: 3, name: eyebrow, item: localizedUrl(`/servicos/${slug}`, locale) },
    ],
  };
}
