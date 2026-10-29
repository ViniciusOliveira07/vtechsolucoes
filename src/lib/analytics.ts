// GA4 (Google Analytics). O script do Google só é baixado depois que a página terminou de
// carregar e o navegador ficou ocioso, para não pesar no desempenho (PageSpeed). Eventos disparados
// antes disso ficam na fila do dataLayer e são enviados quando o script chega.
// Só o domínio de produção envia dados: dev local, previews e testes não contam.
export const GA_MEASUREMENT_ID = "G-CGQYE5Q14F";
const PROD_HOST = "vtechsolucoes.ia.br";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

const enabled = () => typeof window !== "undefined" && !!GA_MEASUREMENT_ID && window.location.hostname === PROD_HOST;

/** Cria a fila do gtag já na abertura (para nenhum evento se perder) e baixa o script quando ocioso. */
export function initAnalytics() {
  if (!enabled() || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // o gtag.js espera o objeto `arguments`, não um array
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  // page_view é enviado manualmente a cada troca de página (o site navega sem recarregar)
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

  const load = () => {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(s);
  };
  const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 2000));
  const afterLoad = () => idle(load, { timeout: 5000 });
  if (document.readyState === "complete") afterLoad();
  else window.addEventListener("load", afterLoad, { once: true });
}

let lastPath = "";

/**
 * Visualização de página, com o idioma em que a pessoa está navegando. `path` vem do roteador
 * (na abertura ele "muda" mais de uma vez para o mesmo endereço; repetições são ignoradas).
 */
export function trackPageView(path: string, language: string) {
  if (!enabled() || typeof window.gtag !== "function" || path === lastPath) return;
  lastPath = path;
  window.gtag("event", "page_view", {
    page_location: window.location.origin + path,
    page_path: path,
    page_title: document.title,
    language,
  });
}

/**
 * Dispara um evento GA4. No-op fora do domínio de produção ou rodando no servidor.
 */
export function track(eventName: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  // Em dev, log no console para inspeção rápida.
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", eventName, params);
  }
  if (!enabled() || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

export const Events = {
  servicePageView: (slug: string) => track("service_page_view", { service_slug: slug }),
  ctaClick: (label: string, location: string, slug?: string) =>
    track("cta_click", { cta_label: label, cta_location: location, service_slug: slug }),
  whatsappClick: (path: string) => track("whatsapp_click", { page_path: path }),
  faqOpen: (question: string, slug: string) =>
    track("faq_open", { question, service_slug: slug }),
  relatedServiceClick: (from: string, to: string) =>
    track("related_service_click", { from_service: from, to_service: to }),
  formStart: (formId: string) => track("form_start", { form_id: formId }),
  generateLead: (serviceInterest?: string) =>
    track("generate_lead", { service_interest: serviceInterest }),
  outboundClick: (url: string) => track("outbound_click", { outbound_url: url }),
};
