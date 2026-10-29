import { Link } from "@tanstack/react-router";
import { COMPANY, WHATSAPP_GREETING, useServices, whatsappUrl } from "@/lib/site";
import { useLocale, useT, type L } from "@/lib/i18n";
import { Events } from "@/lib/analytics";
import { Logo } from "@/components/site/Logo";

const EMPRESA = [
  { to: "/metodo", label: { pt: "Método", en: "Method", es: "Método" } },
  { to: "/blog", label: { pt: "Blog", en: "Blog", es: "Blog" } },
  { to: "/sobre", label: { pt: "Sobre", en: "About", es: "Nosotros" } },
  { to: "/contato", label: { pt: "Contato", en: "Contact", es: "Contacto" } },
] as const satisfies readonly { to: string; label: L<string> }[];

const LEGAL = [
  { to: "/politica-de-privacidade", label: { pt: "Privacidade", en: "Privacy", es: "Privacidad" } },
  { to: "/politica-de-cookies", label: { pt: "Cookies", en: "Cookies", es: "Cookies" } },
  { to: "/termos-e-condicoes", label: { pt: "Termos", en: "Terms", es: "Términos" } },
  { to: "/politica-de-seguranca", label: { pt: "Segurança", en: "Security", es: "Seguridad" } },
] as const satisfies readonly { to: string; label: L<string> }[];

const TEXT = {
  pt: { tagline: "Sistemas, integrações e IA aplicada para operações B2B.", services: "Serviços", company: "Empresa", legal: "Legal" },
  en: { tagline: "Systems, integrations and applied AI for B2B operations.", services: "Services", company: "Company", legal: "Legal" },
  es: { tagline: "Sistemas, integraciones e IA aplicada para operaciones B2B.", services: "Servicios", company: "Empresa", legal: "Legal" },
};

export function Footer() {
  const locale = useLocale();
  const t = useT(TEXT);
  const services = useServices();
  const greeting = useT(WHATSAPP_GREETING);
  return (
    <footer className="text-sm text-muted-foreground">
      <div className="shell pb-20 pt-[clamp(2rem,6vh,3.5rem)] sm:pb-8">
        {/* três colunas de links lado a lado já no celular, para o rodapé caber numa tela */}
        <div className="grid grid-cols-3 gap-x-4 gap-y-6 lg:grid-cols-[1.6fr_repeat(3,minmax(0,1fr))] lg:gap-8">
          <div className="col-span-3 lg:col-span-1">
            <Logo className="text-foreground" />
            <p className="hide-short mt-3 max-w-[34ch]">{t.tagline}</p>
            <a
              href={whatsappUrl(greeting)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => Events.whatsappClick("footer")}
              className="mt-2 inline-flex min-h-11 items-center font-mono text-xs text-foreground hover:text-signal"
            >
              whatsapp: {COMPANY.phoneDisplay}
            </a>
          </div>
          <FooterCol title={t.services}>
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/servicos/${s.slug}`} className="hover:text-signal">
                  {s.title}
                </Link>
              </li>
            ))}
          </FooterCol>
          <FooterCol title={t.company}>
            {EMPRESA.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-signal">
                  {l.label[locale]}
                </Link>
              </li>
            ))}
          </FooterCol>
          <FooterCol title={t.legal}>
            {LEGAL.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-signal">
                  {l.label[locale]}
                </Link>
              </li>
            ))}
          </FooterCol>
        </div>
        <div className="mt-[clamp(1.5rem,5vh,3rem)] flex flex-wrap justify-between gap-3 border-t border-border pt-5 font-mono text-[max(11px,0.6875rem)] text-faint">
          <span>
            © {new Date().getFullYear()} {COMPANY.legalName} · CNPJ {COMPANY.cnpj}
          </span>
          <span>
            {COMPANY.city}, {COMPANY.state}
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <h2 className="kicker mb-3">{title}</h2>
      <ul className="grid gap-1.5 text-[0.8125rem] sm:text-sm">{children}</ul>
    </div>
  );
}
