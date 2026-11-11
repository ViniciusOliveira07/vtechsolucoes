import { cn } from "@/lib/utils";

/** Ícones de traço usados no menu, rodapé e home (desenhados à mão, sem biblioteca). */
const PATHS = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  check: "M5 12.5l4.5 4.5L19 7.5",
  checkc: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8 12.3l2.7 2.7L16 9.7",
  bot: "M7 8h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3zM12 4v4M9 13v1M15 13v1M2 14h2M20 14h2",
  plug: "M9 2v5M15 2v5M6 7h12v4a6 6 0 0 1-12 0zM12 17v5",
  layout: "M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zM3 9h18M9 21V9",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18",
  file: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h4",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-3.5-3.5",
  gauge: "M4 18a8 8 0 1 1 16 0M12 18l4-6",
  refresh: "M20 11a8 8 0 0 0-14.7-4M4 4v4h4M4 13a8 8 0 0 0 14.7 4M20 20v-4h-4",
  shield: "M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z",
  users: "M9 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6",
  chart: "M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6",
  flow: "M5 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM19 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 6h6a3 3 0 0 1 3 3v6M14 13l2 2 2-2",
  msg: "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z",
  mail: "M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM3 7l9 6 9-6",
  plus: "M12 5v14M5 12h14",
  send: "M4 12l16-8-6 16-2.5-6.5z",
  layers: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5",
} as const;

export type IcoName = keyof typeof PATHS;

export function Ico({ name, className }: { name: IcoName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("vt-ico", className)}>
      <path d={PATHS[name]} />
    </svg>
  );
}

/** Círculo com seta do botão principal (.btn-arrow). */
export function ArrowDot() {
  return (
    <span className="btn-arrow-ic" aria-hidden>
      <Ico name="arrow" />
    </span>
  );
}
