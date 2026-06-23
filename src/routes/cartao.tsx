import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, MapPin, Building2, ArrowUpRight, Download, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/cartao")({
  head: () => ({
    meta: [
      { title: "Cartão de Visita — Vtech Soluções" },
      {
        name: "description",
        content:
          "Cartão de visita virtual da Vtech Soluções. Tecnologia B2B: sites, sistemas, automações com IA e consultoria.",
      },
      { property: "og:title", content: "Vtech Soluções — Cartão de Visita" },
      {
        property: "og:description",
        content: "Empresa de tecnologia B2B. Entre em contato via WhatsApp.",
      },
    ],
  }),
  component: CartaoPage,
});

function generateVCard(): string {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Vtech Soluções",
    "ORG:Vtech Soluções",
    "TEL;TYPE=CELL:+55 11 5444-1926",
    "URL:https://vtechsolucoes.com.br",
    "ADR;TYPE=WORK:;;São Paulo;SP;;Brasil",
    "NOTE:Empresa de tecnologia B2B. Sites, sistemas web, automações com IA, integrações e consultoria tech.",
    "END:VCARD",
  ].join("\r\n");
}

function downloadVCard() {
  const blob = new Blob([generateVCard()], { type: "text/vcard" });
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
  const whatsappHref =
    "https://wa.me/551154441926?text=Ol%C3%A1%21%20Vim%20pelo%20cart%C3%A3o%20de%20visita%20virtual%20da%20Vtech%20Solu%C3%A7%C3%B5es.";

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-14 sm:px-8">
      <div className="relative w-full max-w-md">
        {/* ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.62 0.21 258 / 0.7), transparent)",
          }}
        />

        {/* card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-px shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
          <div className="rounded-3xl bg-background/60 px-8 py-10 backdrop-blur-xl sm:px-10 sm:py-12">
            {/* top edge highlight */}
            <div className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

            {/* logo */}
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-2.5">
                <div className="relative h-8 w-8">
                  <div className="absolute inset-0 rounded-md bg-primary" />
                  <div className="absolute inset-[6px] rounded-sm bg-background" />
                  <div className="absolute inset-[10px] rounded-[2px] bg-primary" />
                </div>
                <span className="text-base font-semibold tracking-tight">
                  Vtech Soluções
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Empresa de tecnologia B2B
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
              <InfoRow icon={MapPin} label="Localização" value="São Paulo · Brasil" />
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
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_32px_-6px_rgba(37,211,102,0.65)]"
              >
                <MessageCircle className="h-4 w-4" />
                Conversar no WhatsApp
              </a>

              <button
                onClick={downloadVCard}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20"
              >
                <Download className="h-4 w-4" />
                Salvar contato
              </button>
            </div>

            {/* site link */}
            <div className="mt-8 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                vtechsolucoes.com.br
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
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
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
