import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { NAV } from "@/lib/site";
import { Events } from "@/lib/analytics";
import { useLocale, useT } from "@/lib/i18n";
import { Logo } from "@/components/site/Logo";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";

const TEXT = {
  pt: { nav: "Principal", menuNav: "Menu", open: "Recebendo novos projetos", cta: "Iniciar diagnóstico", menu: "MENU", close: "FECHAR" },
  en: { nav: "Main", menuNav: "Menu", open: "Taking on new projects", cta: "Start diagnosis", menu: "MENU", close: "CLOSE" },
  es: { nav: "Principal", menuNav: "Menú", open: "Recibiendo nuevos proyectos", cta: "Iniciar diagnóstico", menu: "MENÚ", close: "CERRAR" },
};

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const locale = useLocale();
  const t = useT(TEXT);

  // Fecha o menu ao trocar de rota
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center gap-7">
        <Logo />

        <nav aria-label={t.nav} className="ml-3 hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              aria-current={isActive(item.to) ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors hover:bg-surface-elevated hover:text-foreground",
                isActive(item.to) ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {item.label[locale]}
            </Link>
          ))}
        </nav>

        <span className="ml-auto hidden items-center gap-2 whitespace-nowrap font-mono text-xs text-muted-foreground xl:inline-flex">
          <i aria-hidden className="h-1.5 w-1.5 rounded-full bg-ok shadow-[0_0_0_0.1875rem_#8fe3b022]" />
          {t.open}
        </span>
        {/* idioma: no celular fica ao lado do botão do menu, no desktop antes do CTA */}
        <div className="ml-auto flex items-center gap-3 lg:ml-auto xl:ml-0">
          <LanguageSwitcher />
          <Link
            to="/contato"
            onClick={() => Events.ctaClick("Iniciar diagnóstico", "header")}
            className="btn hidden lg:inline-flex"
          >
            {t.cta}
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border-strong px-3.5 font-mono text-xs font-medium lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movel"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? t.close : t.menu}
          </button>
        </div>
      </div>

      <div id="menu-movel" hidden={!open} className="border-t border-border bg-background lg:hidden">
        <nav aria-label={t.menuNav} className="shell grid pb-5 pt-2">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              aria-current={isActive(item.to) ? "page" : undefined}
              className="flex min-h-[3.25rem] items-center justify-between border-b border-border text-lg"
            >
              {item.label[locale]}
              <span aria-hidden className="font-mono text-faint">
                →
              </span>
            </Link>
          ))}
          <Link
            to="/contato"
            onClick={() => Events.ctaClick("Iniciar diagnóstico", "menu_mobile")}
            className="btn mt-5"
          >
            {t.cta}
          </Link>
        </nav>
      </div>
    </header>
  );
}
