import * as Menu from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOCALES, LOCALE_META, useLocale, useSetLocale, useT } from "@/lib/i18n";

const LABEL = { pt: "Idioma", en: "Language", es: "Idioma" };

/** Seletor de idioma do header: mostra a sigla atual e abre a lista com o nome de cada idioma. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const label = useT(LABEL);

  return (
    <Menu.Root modal={false}>
      <Menu.Trigger
        aria-label={`${label}: ${LOCALE_META[locale].label}`}
        className={cn(
          "inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-lg border border-border-strong px-3 font-mono text-xs font-medium text-foreground transition-colors hover:border-faint data-[state=open]:border-signal",
          className,
        )}
      >
        <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.3">
          <circle cx="8" cy="8" r="6.25" />
          <path d="M1.75 8h12.5M8 1.75c1.7 1.8 2.55 3.9 2.55 6.25S9.7 12.45 8 14.25C6.3 12.45 5.45 10.35 5.45 8S6.3 3.55 8 1.75Z" />
        </svg>
        {LOCALE_META[locale].short}
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Content
          align="end"
          sideOffset={8}
          className="z-[70] min-w-[12rem] rounded-xl border border-border-strong bg-surface-elevated p-1.5 shadow-[0_18px_40px_-18px_#000]"
        >
          <Menu.Label className="px-3 pb-1.5 pt-1 font-mono text-[max(11px,0.6875rem)] uppercase tracking-[0.06em] text-faint">
            {label}
          </Menu.Label>
          {LOCALES.map((l) => (
            <Menu.Item
              key={l}
              lang={LOCALE_META[l].html}
              onSelect={() => l !== locale && setLocale(l)}
              className="flex min-h-11 cursor-pointer items-center justify-between gap-6 rounded-lg px-3 text-sm text-foreground outline-none data-[highlighted]:bg-background"
            >
              <span className="flex items-center gap-3">
                <span className="w-6 font-mono text-xs text-muted-foreground">{LOCALE_META[l].short}</span>
                {LOCALE_META[l].label}
              </span>
              {l === locale && <Check aria-hidden className="h-4 w-4 text-signal" />}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
}
