import { useT } from "@/lib/i18n";

const TEXT = { pt: "deslize para ver mais", en: "swipe to see more", es: "deslice para ver más" };

/** Dica de "deslize" que só aparece no celular, abaixo de uma faixa .rail. */
export function RailHint({ label }: { label?: string }) {
  const fallback = useT(TEXT);
  return (
    <p aria-hidden className="rail-hint mt-3 font-mono text-[max(11px,0.6875rem)] text-faint">
      ← {label ?? fallback} →
    </p>
  );
}
