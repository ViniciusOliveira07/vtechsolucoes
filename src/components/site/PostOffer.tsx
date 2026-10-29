import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import type { Post } from "@/lib/blog";
import { COMPANY, whatsappUrl, type Service } from "@/lib/site";
import { Events } from "@/lib/analytics";
import { useT } from "@/lib/i18n";
import { ContactForm } from "@/components/site/ContactForm";

// só a inicial: siglas como IA/AI continuam em maiúsculas
const lowerFirst = (s: string) => (/^.[a-zà-ÿ]/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s);

const TEXT = {
  pt: {
    kicker: "Oferta gratuita · sem compromisso",
    service: (name: string) => `conhecer o serviço de ${lowerFirst(name)} →`,
    or: "Prefere conversar direto?",
    context: (offer: string, title: string) => `*Oferta:* ${offer}\n*Artigo:* ${title}`,
    whatsapp: (offer: string) => `Olá! Li um artigo no blog da Vtech e quero: ${offer}.`,
  },
  en: {
    kicker: "Free offer · no commitment",
    service: (name: string) => `explore our ${lowerFirst(name)} service →`,
    or: "Rather talk right away?",
    context: (offer: string, title: string) => `*Offer:* ${offer}\n*Article:* ${title}`,
    whatsapp: (offer: string) => `Hi! I read an article on the Vtech blog and I'd like: ${offer}.`,
  },
  es: {
    kicker: "Oferta gratuita · sin compromiso",
    service: (name: string) => `conocer el servicio de ${lowerFirst(name)} →`,
    or: "¿Prefiere conversar directamente?",
    context: (offer: string, title: string) => `*Oferta:* ${offer}\n*Artículo:* ${title}`,
    whatsapp: (offer: string) => `¡Hola! Leí un artículo en el blog de Vtech y quiero: ${offer}.`,
  },
};

/**
 * A "isca" do fim de todo artigo: uma oferta concreta ligada ao assunto lido e um formulário curto.
 * O lead chega no grupo com a oferta e o artigo de origem (ver ContactForm `context`).
 */
export function PostOffer({ post, service }: { post: Post; service: Service }) {
  const t = useT(TEXT);
  const { offer } = post;
  return (
    <section id="oferta" aria-labelledby="oferta-titulo" className="panel relative mt-16 scroll-mt-24 overflow-hidden p-[clamp(1.5rem,4vw,3rem)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[15%] -top-[30%] h-[160%] w-[55%] bg-[radial-gradient(closest-side,#7fd4ff14,transparent)]"
      />
      <div className="relative grid gap-[clamp(1.75rem,4vw,3.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <p className="kicker text-signal">{t.kicker}</p>
          <h2
            id="oferta-titulo"
            className="mt-4 text-[clamp(1.625rem,3vw,2.375rem)] font-medium leading-[1.08] tracking-[-0.03em]"
          >
            {offer.title}
          </h2>
          <p className="mt-4 max-w-[52ch] text-muted-foreground">{offer.text}</p>
          <ul className="mt-6 grid gap-3">
            {offer.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[0.9375rem]">
                <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-7 grid gap-1 font-mono text-[0.8125rem]">
            <Link
              to={`/servicos/${service.slug}`}
              onClick={() => Events.relatedServiceClick(post.slug, service.slug)}
              className="inline-flex min-h-11 items-center text-signal hover:underline"
            >
              {t.service(service.title)}
            </Link>
            <a
              href={whatsappUrl(t.whatsapp(offer.title))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => Events.whatsappClick(`blog_offer:${post.slug}`)}
              className="inline-flex min-h-11 items-center text-muted-foreground hover:text-signal"
            >
              {t.or} whatsapp: {COMPANY.phoneDisplay}
            </a>
          </div>
        </div>
        <div className="min-w-0">
          <ContactForm
            source="blog"
            context={t.context(offer.title, post.title)}
            messageLabel={offer.ask}
            messagePlaceholder={offer.placeholder}
            submitLabel={offer.cta}
            consentId="oferta-privacidade"
          />
        </div>
      </div>
    </section>
  );
}
