import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

const TEXT = {
  pt: { more: "Ler explicação completa", less: "Recolher ↑" },
  en: { more: "Read the full explanation", less: "Collapse ↑" },
  es: { more: "Leer la explicación completa", less: "Contraer ↑" },
};

/**
 * Texto longo recolhido para a seção caber numa tela. O conteúdo inteiro fica no HTML
 * (indexável); recolhido, mostra o começo com um esmaecimento e o botão para expandir.
 */
export function ReadMore({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  const t = useT(TEXT);
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={cn("min-w-0", className)}>
      <div
        id={id}
        className={cn(
          "overflow-hidden",
          !open &&
            "max-h-[calc(var(--screen-h)*0.42)] [mask-image:linear-gradient(to_bottom,#000_65%,transparent)]",
        )}
      >
        {children}
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="mt-3 inline-flex min-h-11 items-center font-mono text-[0.8125rem] text-signal hover:underline"
      >
        {open ? t.less : `${label ?? t.more} ↓`}
      </button>
    </div>
  );
}
