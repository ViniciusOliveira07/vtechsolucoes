/** Dica de "deslize" que só aparece no celular, abaixo de uma faixa .rail. */
export function RailHint({ label = "deslize para ver mais" }: { label?: string }) {
  return (
    <p aria-hidden className="rail-hint mt-3 font-mono text-[max(11px,0.6875rem)] text-faint">
      ← {label} →
    </p>
  );
}
