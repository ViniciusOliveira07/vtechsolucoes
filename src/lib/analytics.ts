// GA4 analytics helper. Insira o ID de medição abaixo (formato G-XXXXXXXXXX)
// para ativar o rastreamento. O helper é seguro de chamar mesmo sem ID.
export const GA_MEASUREMENT_ID = ""; // TODO: substituir por "G-XXXXXXXXXX"

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Dispara um evento GA4. No-op se não houver ID configurado ou se rodando no servidor.
 */
export function track(eventName: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  // Em dev, log no console para inspeção rápida.
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", eventName, params);
  }
  if (!GA_MEASUREMENT_ID) return;
  if (typeof window.gtag !== "function") return;
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
