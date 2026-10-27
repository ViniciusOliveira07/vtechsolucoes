import { Link } from "@tanstack/react-router";
import { COMPANY, whatsappUrl } from "@/lib/site";
import { Events } from "@/lib/analytics";

export function CtaBand({
  title = "Mostre o processo que mais consome a sua equipe.",
  text = "Em uma conversa técnica, mapeamos o fluxo e devolvemos uma proposta com escopo, prazo e investimento em até 24 horas úteis.",
  location = "cta_band",
  slug,
}: {
  title?: string;
  text?: string;
  location?: string;
  slug?: string;
}) {
  return (
    <section className="section relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] -top-[40%] h-[180%] w-[60%] bg-[radial-gradient(closest-side,#7fd4ff1a,transparent)]"
      />
      <div className="shell relative grid items-end gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
        <div className="min-w-0">
          <h2 className="text-[clamp(34px,4.6vw,64px)] font-medium leading-[1.02] tracking-[-0.04em]">{title}</h2>
          <p className="mt-4 max-w-[50ch] text-muted-foreground">{text}</p>
        </div>
        <div className="grid justify-items-start gap-3">
          <Link to="/contato" onClick={() => Events.ctaClick("Iniciar diagnóstico", location, slug)} className="btn">
            Iniciar diagnóstico →
          </Link>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => Events.whatsappClick(location)}
            className="inline-flex min-h-11 items-center font-mono text-[13px] text-muted-foreground hover:text-signal"
          >
            whatsapp: {COMPANY.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
