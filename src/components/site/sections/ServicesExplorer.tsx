import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "@tanstack/react-router";
import { SERVICES } from "@/lib/site";
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
        <SectionHead as={headingAs} title="O que construímos">
          Cinco frentes, contratadas separadamente ou combinadas no mesmo projeto.
        </SectionHead>
        <div className="grid overflow-hidden rounded-[14px] border border-border bg-surface md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
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
                className="flex min-h-11 shrink-0 items-center justify-between gap-3 whitespace-nowrap border-r border-border px-4 py-3.5 text-[15px] text-muted-foreground transition-colors hover:bg-surface-elevated hover:text-foreground aria-selected:bg-surface-elevated aria-selected:text-foreground aria-selected:shadow-[inset_0_-2px_0_var(--signal)] md:border-b md:border-r-0 md:px-6 md:py-[22px] md:text-[17px] md:last:border-b-0 md:aria-selected:shadow-[inset_2px_0_0_var(--signal)]"
              >
                <span>{svc.title}</span>
                <span className="kicker hidden text-[10px] md:inline">{svc.kicker}</span>
              </button>
            ))}
          </div>
          <div role="tabpanel" id="painel-servico" aria-labelledby={`tab-${s.slug}`} className="min-w-0 p-6 md:p-8">
            <h3 className="text-[28px] tracking-[-0.03em]">{s.title}</h3>
            <p className="mt-3 max-w-[52ch] text-muted-foreground">{s.forWho}</p>
            <ul className="mt-7">
              {s.deliverables.map((d) => (
                <li key={d} className="grid grid-cols-[24px_1fr] gap-2 border-t border-dashed border-border-strong py-3 text-[15px]">
                  <span aria-hidden className="font-mono text-signal">
                    →
                  </span>
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {s.stack.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
            <Link
              to={`/servicos/${s.slug}`}
              className="mt-6 inline-flex min-h-11 items-center font-mono text-[13px] font-medium text-signal hover:underline"
            >
              ver página do serviço →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
