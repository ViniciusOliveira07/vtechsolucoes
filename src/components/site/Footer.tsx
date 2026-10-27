import { Link } from "@tanstack/react-router";
import { COMPANY, SERVICES, whatsappUrl } from "@/lib/site";
import { Events } from "@/lib/analytics";
import { Logo } from "@/components/site/Logo";

const EMPRESA = [
  { to: "/metodo", label: "Método" },
  { to: "/blog", label: "Blog" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
] as const;

const LEGAL = [
  { to: "/politica-de-privacidade", label: "Privacidade" },
  { to: "/politica-de-cookies", label: "Cookies" },
  { to: "/termos-e-condicoes", label: "Termos" },
  { to: "/politica-de-seguranca", label: "Segurança" },
] as const;

export function Footer() {
  return (
    <footer className="text-sm text-muted-foreground">
      <div className="shell pb-28 pt-14 sm:pb-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_repeat(3,minmax(0,1fr))]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo className="text-foreground" />
            <p className="mt-3 max-w-[34ch]">Sistemas, integrações e IA aplicada para operações B2B.</p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => Events.whatsappClick("footer")}
              className="mt-2 inline-flex min-h-11 items-center font-mono text-xs text-foreground hover:text-signal"
            >
              whatsapp: {COMPANY.phoneDisplay}
            </a>
          </div>
          <FooterCol title="Serviços">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={`/servicos/${s.slug}`} className="hover:text-signal">
                  {s.title}
                </Link>
              </li>
            ))}
          </FooterCol>
          <FooterCol title="Empresa">
            {EMPRESA.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-signal">
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterCol>
          <FooterCol title="Legal">
            {LEGAL.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-signal">
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterCol>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-border pt-5 font-mono text-[11px] text-faint">
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
    <div>
      <h2 className="kicker mb-3.5">{title}</h2>
      <ul className="grid gap-2">{children}</ul>
    </div>
  );
}
