import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/site";
import { pick, useT, type L } from "@/lib/i18n";
import { MessageCircle, MapPin, Building2, ArrowUpRight, Download, ExternalLink } from "lucide-react";
import { LogoMark, LogoWord } from "@/components/site/Logo";

const HEAD = {
  pt: {
    title: "Cartão de visita | Vtech Soluções",
    description:
      "Cartão de visita virtual da Vtech Soluções. Sistemas, integrações e IA para empresas B2B. Fale pelo WhatsApp.",
  },
  en: {
    title: "Business card | Vtech Soluções",
    description:
      "Vtech Soluções digital business card. Systems, integrations and AI for B2B companies. Reach us on WhatsApp.",
  },
  es: {
    title: "Tarjeta de presentación | Vtech Soluções",
    description:
      "Tarjeta de presentación virtual de Vtech Soluções. Sistemas, integraciones e IA para empresas B2B. Escríbanos por WhatsApp.",
  },
};

const TEXT = {
  pt: {
    tagline: "Empresa de tecnologia B2B",
    location: "Localização",
    country: "São Paulo · Brasil",
    whatsapp: "Conversar no WhatsApp",
    save: "Salvar contato",
    greeting: "Olá! Vim pelo cartão de visita virtual da Vtech Soluções.",
  },
  en: {
    tagline: "B2B technology company",
    location: "Location",
    country: "São Paulo · Brazil",
    whatsapp: "Chat on WhatsApp",
    save: "Save contact",
    greeting: "Hi! I found you through the Vtech Soluções digital business card.",
  },
  es: {
    tagline: "Empresa de tecnología B2B",
    location: "Ubicación",
    country: "São Paulo · Brasil",
    whatsapp: "Conversar por WhatsApp",
    save: "Guardar contacto",
    greeting: "¡Hola! Llegué por la tarjeta de presentación virtual de Vtech Soluções.",
  },
};

// Texto do vCard (país e nota), no idioma de quem baixa
const VCARD: L<{ country: string; note: string }> = {
  pt: {
    country: "Brasil",
    note: "Empresa de tecnologia B2B. Sites, sistemas web, automações com IA, integrações e consultoria tech.",
  },
  en: {
    country: "Brazil",
    note: "B2B technology company. Websites, web systems, AI automations, integrations and tech consulting.",
  },
  es: {
    country: "Brasil",
    note: "Empresa de tecnología B2B. Sitios web, sistemas web, automatizaciones con IA, integraciones y consultoría tech.",
  },
};

export const Route = createFileRoute("/cartao")({
  head: ({ match }) => {
    const locale = match.context.locale;
    const t = pick(HEAD, locale);
    return seo({ title: t.title, description: t.description, path: "/cartao", locale });
  },
  component: CartaoPage,
});

function generateVCard(v: { country: string; note: string }): string {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Vtech Soluções",
    "ORG:Vtech Soluções",
    "TEL;TYPE=CELL:+55 11 5444-1926",
    "URL:https://vtechsolucoes.ia.br",
    `ADR;TYPE=WORK:;;São Paulo;SP;;${v.country}`,
    `NOTE:${v.note}`,
    "END:VCARD",
  ].join("\r\n");
}

function downloadVCard(v: { country: string; note: string }) {
  const blob = new Blob([generateVCard(v)], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "vtech-solucoes.vcf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function CartaoPage() {
  const t = useT(TEXT);
  const vcard = useT(VCARD);
  const whatsappHref = `https://wa.me/551154441926?text=${encodeURIComponent(t.greeting)}`;

  return (
    <div className="flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden px-5 py-14 sm:px-8">
      <div className="relative w-full max-w-md">
        {/* ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-[18.75rem] w-[min(31.25rem,100%)] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, #7fd4ff55, transparent)",
          }}
        />

        {/* card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-px shadow-[0_1.875rem_5rem_-1.25rem_rgba(0,0,0,0.6)]">
          <div className="rounded-3xl bg-background/60 px-8 py-10 backdrop-blur-xl sm:px-10 sm:py-12">
            {/* top edge highlight */}
            <div className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

            {/* logo */}
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-2.5 font-mono text-base font-medium tracking-tight">
                <LogoMark className="h-7 w-7" />
                <LogoWord />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {t.tagline}
              </p>
            </div>

            {/* divider */}
            <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* info rows */}
            <div className="space-y-5">
              <InfoRow
                icon={MessageCircle}
                label="WhatsApp"
                value="+55 11 5444-1926"
                href={whatsappHref}
              />
              <InfoRow icon={MapPin} label={t.location} value={t.country} />
              <InfoRow icon={Building2} label="CNPJ" value="66.428.598/0001-22" />
            </div>

            {/* divider */}
            <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-[0_0.5rem_1.5rem_-0.375rem_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0.75rem_2rem_-0.375rem_rgba(37,211,102,0.65)]"
              >
                <MessageCircle className="h-4 w-4" />
                {t.whatsapp}
              </a>

              <button
                onClick={() => downloadVCard(vcard)}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20"
              >
                <Download className="h-4 w-4" />
                {t.save}
              </button>
            </div>

            {/* site link */}
            <div className="mt-8 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                vtechsolucoes.ia.br
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface InfoRowProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}

function InfoRow({ icon: Icon, label, value, href }: InfoRowProps) {
  const content = (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[max(11px,0.6875rem)] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <p className="mt-0.5 truncate text-base font-medium tracking-tight text-foreground">
          {value}
        </p>
      </div>
      {href && (
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground group-hover:opacity-100" />
      )}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        {content}
      </a>
    );
  }
  return <div className="group block">{content}</div>;
}
