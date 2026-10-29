import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { LOCALES, LOCALE_META, useLocale, useSetLocale, useT, type Locale } from "@/lib/i18n";

const LABEL = { pt: "Idioma", en: "Language", es: "Idioma" };

/**
 * Seletor de idioma do header: mostra a sigla atual e abre a lista com o nome de cada idioma.
 * Feito à mão (sem Radix) porque é o único menu do site e a biblioteca pesava ~40 KB no
 * JavaScript inicial de todas as páginas, o que derrubava a nota de desempenho no celular.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const label = useT(LABEL);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const menuId = useId();

  // fecha com clique fora ou Esc (devolvendo o foco ao botão)
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    // ao abrir, o foco vai para o idioma atual
    itemsRef.current[LOCALES.indexOf(locale)]?.focus();
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, locale]);

  const choose = (l: Locale) => {
    setOpen(false);
    buttonRef.current?.focus();
    if (l !== locale) void setLocale(l);
  };

  // setas sobem/descem entre as opções, como num menu nativo
  const onMenuKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const items = itemsRef.current.filter(Boolean) as HTMLButtonElement[];
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    const next =
      e.key === "Home" ? 0 : e.key === "End" ? items.length - 1 : (i + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
    items[next]?.focus();
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${label}: ${LOCALE_META[locale].label}`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className={cn(
          "inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-lg border border-border-strong px-3 font-mono text-xs font-medium text-foreground transition-colors hover:border-faint",
          open && "border-signal",
          className,
        )}
      >
        <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.3">
          <circle cx="8" cy="8" r="6.25" />
          <path d="M1.75 8h12.5M8 1.75c1.7 1.8 2.55 3.9 2.55 6.25S9.7 12.45 8 14.25C6.3 12.45 5.45 10.35 5.45 8S6.3 3.55 8 1.75Z" />
        </svg>
        {LOCALE_META[locale].short}
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          onKeyDown={onMenuKey}
          className="absolute right-0 top-[calc(100%+0.5rem)] z-[70] min-w-[12rem] rounded-xl border border-border-strong bg-surface-elevated p-1.5 shadow-[0_18px_40px_-18px_#000]"
        >
          <p aria-hidden className="px-3 pb-1.5 pt-1 font-mono text-[max(11px,0.6875rem)] uppercase tracking-[0.06em] text-faint">
            {label}
          </p>
          {LOCALES.map((l, i) => (
            <button
              key={l}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              type="button"
              role="menuitemradio"
              aria-checked={l === locale}
              lang={LOCALE_META[l].html}
              onClick={() => choose(l)}
              className="flex min-h-11 w-full items-center justify-between gap-6 rounded-lg px-3 text-left text-sm text-foreground outline-none hover:bg-background focus-visible:bg-background"
            >
              <span className="flex items-center gap-3">
                <span className="w-6 font-mono text-xs text-muted-foreground">{LOCALE_META[l].short}</span>
                {LOCALE_META[l].label}
              </span>
              {l === locale && (
                <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4 text-signal" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
