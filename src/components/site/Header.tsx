import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { WHATSAPP_GREETING, whatsappUrl } from "@/lib/site";
import { Events } from "@/lib/analytics";
import { useLocale, useT, type L } from "@/lib/i18n";
import { Logo } from "@/components/site/Logo";
import { ArrowDot } from "@/components/site/home/Ico";

/** Itens do menu (iguais ao artifact aprovado): seções da home e o blog. */
const MENU: { href: string; label: L<string> }[] = [
  { href: "/#servicos", label: { pt: "Serviços", en: "Services", es: "Servicios" } },
  { href: "/#como-funciona", label: { pt: "Como funciona", en: "How it works", es: "Cómo funciona" } },
  { href: "/#processo", label: { pt: "Processo", en: "Process", es: "Proceso" } },
  { href: "/blog", label: { pt: "Blog", en: "Blog", es: "Blog" } },
  { href: "/#perguntas", label: { pt: "FAQ", en: "FAQ", es: "FAQ" } },
];

const TEXT = {
  pt: { nav: "Principal", open: "Abrir menu", close: "Fechar menu", cta: "Iniciar diagnóstico" },
  en: { nav: "Main", open: "Open menu", close: "Close menu", cta: "Start diagnosis" },
  es: { nav: "Principal", open: "Abrir menú", close: "Cerrar menú", cta: "Iniciar diagnóstico" },
};

/**
 * Menu em pílula flutuante: transparente no topo, ganha fundo ao rolar e escurece sobre as
 * faixas escuras (qualquer elemento com data-nav-dark). Sem seletor de idioma: o português é o
 * padrão e as versões em inglês e espanhol ficam no rodapé.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const { pathname } = useLocation();
  const t = useT(TEXT);
  const locale = useLocale();
  const menu = MENU.map((m) => ({ href: m.href, label: m.label[locale] }));
  const greeting = useT(WHATSAPP_GREETING);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 16);
      const y = 40;
      let d = false;
      document.querySelectorAll<HTMLElement>("[data-nav-dark]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < y && r.bottom > y) d = true;
      });
      setDark(d);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  const isActive = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));
  const cta = (where: string) => ({
    href: whatsappUrl(greeting),
    target: "_blank",
    rel: "noopener noreferrer",
    onClick: () => {
      Events.ctaClick("Iniciar diagnóstico", where);
      Events.whatsappClick(pathname);
    },
  });

  return (
    <header className="vt-nav" data-scrolled={scrolled} data-dark={dark && !open} data-open={open}>
      <div className="vt-wrap">
        <div className="vt-pill">
          <Logo />
          <nav aria-label={t.nav} className="vt-nav-links">
            {menu.map((item) => (
              <a key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="vt-nav-cta">
            <a className="btn btn-line btn-arrow" {...cta("header")}>
              {t.cta}
              <ArrowDot />
            </a>
          </div>
          <button
            type="button"
            className="vt-burger"
            aria-expanded={open}
            aria-controls="menu-movel"
            aria-label={open ? t.close : t.open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
        {open && (
          <nav id="menu-movel" aria-label={t.nav} className="vt-sheet">
            {menu.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
                <span aria-hidden>→</span>
              </a>
            ))}
            <a className="btn btn-arrow" {...cta("menu_mobile")}>
              {t.cta}
              <ArrowDot />
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
