import { Link } from "@tanstack/react-router";
import { COMPANY, WHATSAPP_GREETING, useServices, whatsappUrl } from "@/lib/site";
import { getCategories } from "@/lib/blog";
import { useLocale, useT, type L } from "@/lib/i18n";
import { Events } from "@/lib/analytics";
import { Logo } from "@/components/site/Logo";
import { SOLUCOES } from "@/lib/solucoes";

const EMPRESA = [
  { to: "/sobre", label: { pt: "Sobre", en: "About", es: "Nosotros" } },
  { to: "/metodo", label: { pt: "Método", en: "Method", es: "Método" } },
  { to: "/contato", label: { pt: "Contato", en: "Contact", es: "Contacto" } },
] as const satisfies readonly { to: string; label: L<string> }[];

const LEGAL = [
  { to: "/politica-de-privacidade", label: { pt: "Privacidade", en: "Privacy", es: "Privacidad" } },
  { to: "/politica-de-cookies", label: { pt: "Cookies", en: "Cookies", es: "Cookies" } },
  { to: "/politica-de-seguranca", label: { pt: "Segurança", en: "Security", es: "Seguridad" } },
  { to: "/termos-e-condicoes", label: { pt: "Termos e condições", en: "Terms", es: "Términos" } },
] as const satisfies readonly { to: string; label: L<string> }[];

const TEXT = {
  pt: { tagline: "Sistemas, integrações e IA aplicada para operações B2B.", services: "Serviços", blog: "Blog", company: "Empresa", legal: "Legal", all: "Todos os artigos", lang: "Idioma", map: "Mapa do site", legalName: "razão social", hq: "sede" },
  en: { tagline: "Systems, integrations and applied AI for B2B operations.", services: "Services", blog: "Blog", company: "Company", legal: "Legal", all: "All articles", lang: "Language", map: "Site map", legalName: "legal name", hq: "headquarters" },
  es: { tagline: "Sistemas, integraciones e IA aplicada para operaciones B2B.", services: "Servicios", blog: "Blog", company: "Empresa", legal: "Legal", all: "Todos los artículos", lang: "Idioma", map: "Mapa del sitio", legalName: "razón social", hq: "sede" },
};

/** Rodapé escuro com mapa do site: serviços, categorias do blog, empresa, legal e idiomas (links internos para o Google). */
export function Footer() {
  const locale = useLocale();
  const t = useT(TEXT);
  const services = useServices();
  const greeting = useT(WHATSAPP_GREETING);
  const categories = getCategories(locale);
  return (
    <footer className="vt-footer" data-nav-dark="">
      <div className="vt-wrap">
        <div className="vt-footer-top">
          <div>
            <Logo className="vt-brand" />
            <p className="mt-3 max-w-[34ch]">{t.tagline}</p>
            <dl>
              <dt>{t.legalName}</dt>
              <dd>{COMPANY.legalName}</dd>
              <dt>cnpj</dt>
              <dd>{COMPANY.cnpj}</dd>
              <dt>{t.hq}</dt>
              <dd>
                {COMPANY.city}, {COMPANY.state}
              </dd>
              <dt>whatsapp</dt>
              <dd>
                <a
                  href={whatsappUrl(greeting)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => Events.whatsappClick("footer")}
                  className="hover:text-white"
                >
                  {COMPANY.phoneDisplay}
                </a>
              </dd>
            </dl>
          </div>
          <nav aria-label={t.map} className="vt-footer-map">
            <div>
              <h2>{t.services}</h2>
              {services.map((s) => (
                <Link key={s.slug} to={`/servicos/${s.slug}`}>
                  {s.title}
                </Link>
              ))}
            </div>
            <div>
              <h2>Soluções</h2>
              {SOLUCOES.map((s) => (
                <Link key={s.data.slug} to="/solucoes/$slug" params={{ slug: s.data.slug }}>
                  {s.data.eyebrow}
                </Link>
              ))}
            </div>
            <div>
              <h2>{t.blog}</h2>
              <Link to="/blog">{t.all}</Link>
              {categories.map((c) => (
                <Link key={c.slug} to="/blog/categoria/$categoria" params={{ categoria: c.slug }}>
                  {c.name}
                </Link>
              ))}
            </div>
            <div>
              <h2>{t.company}</h2>
              {EMPRESA.map((l) => (
                <Link key={l.to} to={l.to}>
                  {l.label[locale]}
                </Link>
              ))}
            </div>
            <div>
              <h2>{t.legal}</h2>
              {LEGAL.map((l) => (
                <Link key={l.to} to={l.to}>
                  {l.label[locale]}
                </Link>
              ))}
            </div>
          </nav>
        </div>
        <div className="vt-footer-bottom">
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
