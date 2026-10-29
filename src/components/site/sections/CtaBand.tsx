import { Link } from "@tanstack/react-router";
import { COMPANY, WHATSAPP_GREETING, whatsappUrl } from "@/lib/site";
import { Events } from "@/lib/analytics";
import { useT } from "@/lib/i18n";

const TEXT = {
  pt: {
    title: "Mostre o processo que mais consome a sua equipe.",
    text: "Em uma conversa técnica, mapeamos o fluxo e devolvemos uma proposta com escopo, prazo e investimento em até 24 horas úteis.",
    cta: "Iniciar diagnóstico →",
  },
  en: {
    title: "Show us the process that takes up most of your team's time.",
    text: "In a technical call, we map the workflow and send back a proposal with scope, timeline and investment within 24 business hours.",
    cta: "Start diagnosis →",
  },
  es: {
    title: "Muéstrenos el proceso que más consume a su equipo.",
    text: "En una conversación técnica, mapeamos el flujo y le devolvemos una propuesta con alcance, plazo e inversión en hasta 24 horas hábiles.",
    cta: "Iniciar diagnóstico →",
  },
};

/** `title`/`text`, quando passados, já devem vir no idioma da página. */
export function CtaBand({
  title,
  text,
  location = "cta_band",
  slug,
}: {
  title?: string;
  text?: string;
  location?: string;
  slug?: string;
}) {
  const t = useT(TEXT);
  const greeting = useT(WHATSAPP_GREETING);
  return (
    <section className="section relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] -top-[40%] h-[180%] w-[60%] bg-[radial-gradient(closest-side,#7fd4ff1a,transparent)]"
      />
      <div className="shell relative grid items-end gap-[clamp(1.25rem,4vh,2.5rem)] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
        <div className="min-w-0">
          <h2 className="text-[clamp(1.875rem,min(4.6vw+0.5rem,7vh),4rem)] font-medium leading-[1.02] tracking-[-0.04em]">
            {title ?? t.title}
          </h2>
          <p className="mt-4 max-w-[50ch] text-muted-foreground">{text ?? t.text}</p>
        </div>
        <div className="grid justify-items-start gap-3">
          <Link to="/contato" onClick={() => Events.ctaClick("Iniciar diagnóstico", location, slug)} className="btn">
            {t.cta}
          </Link>
          <a
            href={whatsappUrl(greeting)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => Events.whatsappClick(location)}
            className="inline-flex min-h-11 items-center font-mono text-[0.8125rem] text-muted-foreground hover:text-signal"
          >
            whatsapp: {COMPANY.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
