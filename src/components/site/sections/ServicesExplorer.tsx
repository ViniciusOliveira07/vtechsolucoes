import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "@tanstack/react-router";
import { SERVICES } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SectionHead } from "@/components/site/SectionHead";

export function ServicesExplorer({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = SERVICES[active];

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const dir = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!dir) return;
    e.preventDefault();
    const n = (active + dir + SERVICES.length) % SERVICES.length;
    setActive(n);
    tabs.current[n]?.focus();
  };

  return (
    <section id="servicos" className="section">
      <div className="shell">
        <SectionHead as={headingAs} title="O que construímos" detailClassName="hide-phone">
          Cinco frentes, contratadas separadamente ou combinadas no mesmo projeto.
        </SectionHead>
        <div className="grid overflow-hidden rounded-[0.875rem] border border-border bg-surface md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div
            role="tablist"
            aria-label="Serviços"
            aria-orientation="vertical"
            onKeyDown={onKey}
            className="flex overflow-x-auto border-b border-border [scrollbar-width:none] md:grid md:overflow-visible md:border-b-0 md:border-r"
          >
            {SERVICES.map((svc, i) => (
              <button
                key={svc.slug}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`tab-${svc.slug}`}
                aria-selected={active === i}
                aria-controls="painel-servico"
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                className="flex min-h-11 shrink-0 items-center justify-between gap-3 whitespace-nowrap border-r border-border px-4 py-3.5 text-[0.9375rem] text-muted-foreground transition-colors hover:bg-surface-elevated hover:text-foreground aria-selected:bg-surface-elevated aria-selected:text-foreground aria-selected:shadow-[inset_0_-0.125rem_0_var(--signal)] md:border-b md:border-r-0 md:px-6 md:py-[clamp(0.75rem,2.6vh,1.375rem)] md:text-[1.0625rem] md:last:border-b-0 md:aria-selected:shadow-[inset_0.125rem_0_0_var(--signal)]"
              >
                <span>{svc.title}</span>
                <span className="kicker hidden lg:inline">{svc.kicker}</span>
              </button>
            ))}
          </div>
          <div
            role="tabpanel"
            id="painel-servico"
            aria-labelledby={`tab-${s.slug}`}
            className="min-w-0 p-[clamp(1.25rem,4vh,2rem)]"
          >
            <h3 className="text-[clamp(1.375rem,3.4vh,1.75rem)] tracking-[-0.03em]">{s.title}</h3>
            <p className="hide-short mt-2 max-w-[52ch] text-muted-foreground">{s.forWho}</p>
            <ul className="mt-[clamp(0.75rem,2.5vh,1.75rem)]">
              {s.deliverables.map((d, i) => (
                <li
                  key={d}
                  className={cn(
                    "grid grid-cols-[1.5rem_1fr] gap-2 border-t border-dashed border-border-strong py-[clamp(0.4rem,1.3vh,0.75rem)] text-sm md:text-[0.9375rem]",
                    i >= 3 && "hide-short",
                  )}
                >
                  <span aria-hidden className="font-mono text-signal">
                    →
                  </span>
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-[clamp(0.75rem,2.5vh,1.5rem)] flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <div className="hide-phone hide-short flex flex-wrap gap-1.5">
                {s.stack.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
              <Link
                to={`/servicos/${s.slug}`}
                className="inline-flex min-h-11 items-center font-mono text-[0.8125rem] font-medium text-signal hover:underline"
              >
                ver página do serviço →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
