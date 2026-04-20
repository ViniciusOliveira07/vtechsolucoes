import { Mail, MapPin, Briefcase, Clock, ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";

const infoItems = [
  {
    icon: Mail,
    label: "Email",
    value: "contato@vtechsolucoes.com",
    href: "mailto:contato@vtechsolucoes.com",
  },
  {
    icon: MapPin,
    label: "Localização",
    value: "São Paulo · Brasil",
  },
  {
    icon: Briefcase,
    label: "Atendimento",
    value: "Exclusivamente B2B",
  },
  {
    icon: Clock,
    label: "Resposta",
    value: "Até 24 horas úteis",
  },
];

export function Contact() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-24 md:py-32">
      {/* ambient blue glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] max-w-[120vw] -translate-x-1/2 rounded-full opacity-[0.18] blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.62 0.21 258 / 0.7), transparent)",
        }}
      />
      {/* subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Disponível para novos projetos
          </div>
          <h2 className="text-display-lg font-display tracking-tight">
            Vamos conversar<span className="text-primary">.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            Conte sobre o desafio. Respondemos com um diagnóstico e proposta
            fechada em até 24 horas úteis.
          </p>
        </div>

        {/* Card */}
        <div className="mx-auto mt-16 max-w-6xl">
          <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-px shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
            {/* top edge highlight */}
            <div className="pointer-events-none absolute inset-x-20 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="grid overflow-hidden rounded-3xl bg-background/40 backdrop-blur-xl lg:grid-cols-12">
              {/* Form side */}
              <div className="p-8 sm:p-12 lg:col-span-7 lg:p-14">
                <ContactForm />
              </div>

              {/* Divider */}
              <div className="hidden lg:col-span-5 lg:block">
                <div className="relative h-full">
                  <div className="absolute inset-y-12 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                  <div className="flex h-full flex-col justify-center gap-8 p-12 lg:p-14">
                    {infoItems.map((item) => (
                      <InfoRow key={item.label} {...item} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile info */}
              <div className="border-t border-white/[0.06] p-8 sm:p-12 lg:hidden">
                <div className="grid gap-8 sm:grid-cols-2">
                  {infoItems.map((item) => (
                    <InfoRow key={item.label} {...item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
    <>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-colors group-hover:border-primary/40 group-hover:bg-primary/[0.08]">
        <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 truncate text-base font-medium tracking-tight text-foreground">
          {value}
        </p>
      </div>
      {href && (
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary group-hover:opacity-100" />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className="group flex items-center gap-4">
        {content}
      </a>
    );
  }
  return <div className="group flex items-center gap-4">{content}</div>;
}
