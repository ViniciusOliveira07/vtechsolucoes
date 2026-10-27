import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Diagrama ilustrativo: canais de entrada → agente → sistemas de destino.
// O HTML do servidor já sai completo (nós, fios e log); a animação dos pacotes só roda no cliente.

const WIRES = {
  w1: "M118 60 C190 60 190 150 220 150",
  w2: "M118 150 L220 150",
  w3: "M118 240 C190 240 190 150 220 150",
  w4: "M300 150 C330 150 330 60 402 60",
  w5: "M300 150 L402 150",
  w6: "M300 150 C330 150 330 240 402 240",
} as const;

type WireId = keyof typeof WIRES;

const ROUTES: { from: WireId; to: WireId; event: string; result: string }[] = [
  { from: "w1", to: "w4", event: "lead.recebido", result: "crm.oportunidade_criada" },
  { from: "w2", to: "w6", event: "formulario.enviado", result: "equipe.resumo_enviado" },
  { from: "w3", to: "w5", event: "nota_fiscal.recebida", result: "erp.pedido_lancado" },
  { from: "w1", to: "w6", event: "duvida.cliente", result: "agente.respondeu_com_fonte" },
];

const SOURCES = [
  { y: 40, title: "WhatsApp", sub: "canal" },
  { y: 130, title: "Site", sub: "formulário" },
  { y: 220, title: "E-mail", sub: "documentos" },
];
const TARGETS = [
  { y: 40, title: "CRM", sub: "oportunidade" },
  { y: 130, title: "ERP", sub: "pedido" },
  { y: 220, title: "Equipe", sub: "resumo" },
];

type Line = { t: string; event: string; result: string };

const START = 9 * 3600 + 14 * 60 + 2; // 09:14:02
const fmt = (s: number) =>
  [Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60].map((n) => String(n).padStart(2, "0")).join(":");

const INITIAL: Line[] = ROUTES.map((r, i) => ({ t: fmt(START + i * 7), event: r.event, result: r.result }));

/** `compact`: só o diagrama (sem o log de eventos), para caber em telas de celular. */
export function FlowConsole({ compact = false }: { compact?: boolean }) {
  const [lines, setLines] = useState<Line[]>(INITIAL);
  const [pulse, setPulse] = useState(false);
  const pktLayer = useRef<SVGGElement>(null);
  const paths = useRef<Partial<Record<WireId, SVGPathElement | null>>>({});

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let alive = true;
    let clock = START + ROUTES.length * 7;
    let i = 0;
    const timers: number[] = [];

    const travel = (id: WireId, dur: number, done: () => void) => {
      const p = paths.current[id];
      const layer = pktLayer.current;
      if (!p || !layer) return;
      const len = p.getTotalLength();
      const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      const p0 = p.getPointAtLength(0);
      c.setAttribute("r", "3.2");
      c.setAttribute("fill", "var(--signal)");
      c.setAttribute("cx", String(p0.x));
      c.setAttribute("cy", String(p0.y));
      layer.appendChild(c);
      let start: number | null = null;
      const frame = (ts: number) => {
        if (!alive) return c.remove();
        start ??= ts;
        const k = Math.min(1, (ts - start) / dur);
        const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        const pt = p.getPointAtLength(e * len);
        c.setAttribute("cx", String(pt.x));
        c.setAttribute("cy", String(pt.y));
        if (k < 1) requestAnimationFrame(frame);
        else {
          c.remove();
          done();
        }
      };
      requestAnimationFrame(frame);
    };

    const loop = () => {
      if (!alive || document.hidden) {
        timers.push(window.setTimeout(loop, 1500));
        return;
      }
      const r = ROUTES[i++ % ROUTES.length];
      travel(r.from, 900, () => {
        setPulse(true);
        timers.push(window.setTimeout(() => setPulse(false), 260));
        travel(r.to, 900, () => {
          clock += 3 + Math.floor(Math.random() * 9);
          setLines((ls) => [...ls, { t: fmt(clock), event: r.event, result: r.result }].slice(-5));
        });
      });
      timers.push(window.setTimeout(loop, 1500));
    };
    loop();
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <figure className="flow m-0 min-w-0">
      <div className="overflow-hidden rounded-[0.875rem] border border-border-strong bg-gradient-to-b from-surface to-background shadow-[0_2.5rem_5rem_-2.5rem_#000]">
        <div className="flex items-center justify-between border-b border-border px-3.5 py-2.5 font-mono text-[max(11px,0.6875rem)] text-faint">
          <span aria-hidden className="flex gap-1.5">
            <i className="h-2 w-2 rounded-full bg-border-strong" />
            <i className="h-2 w-2 rounded-full bg-border-strong" />
            <i className="h-2 w-2 rounded-full bg-border-strong" />
          </span>
          <span>fluxo: atendimento → crm</span>
          <span>ao vivo</span>
        </div>
        <svg
          viewBox="0 0 520 300"
          className="flow-svg block h-auto w-full"
          role="img"
          aria-label="Canais de entrada (WhatsApp, site e e-mail) ligados a um agente, que atualiza CRM e ERP e envia um resumo para a equipe"
        >
          {(Object.keys(WIRES) as WireId[]).map((id) => (
            <path
              key={id}
              ref={(el) => {
                paths.current[id] = el;
              }}
              d={WIRES[id]}
              fill="none"
              stroke="var(--border-strong)"
              strokeWidth={1.2}
            />
          ))}
          {SOURCES.map((n) => (
            <Node key={n.title} x={18} {...n} />
          ))}
          {TARGETS.map((n) => (
            <Node key={n.title} x={402} {...n} />
          ))}
          <g>
            <rect
              x={220}
              y={118}
              width={80}
              height={64}
              rx={10}
              fill={pulse ? "#123447" : "#0f2230"}
              stroke="var(--signal)"
              style={{ transition: "fill .2s" }}
            />
            <text x={234} y={146} fill="var(--foreground)" fontFamily="var(--font-mono)" fontSize={11} fontWeight={500}>
              Agente
            </text>
            <text x={234} y={160} fill="var(--faint)" fontFamily="var(--font-mono)" fontSize={9}>
              qualifica
            </text>
            <text x={234} y={171} fill="var(--faint)" fontFamily="var(--font-mono)" fontSize={9}>
              e decide
            </text>
          </g>
          <g ref={pktLayer} />
        </svg>
        <div
          aria-hidden
          className={cn(
            "flow-log overflow-hidden border-t border-border px-3.5 py-2.5 font-mono text-[max(11px,0.6875rem)] leading-[1.75] text-muted-foreground",
            compact && "hidden",
          )}
        >
          {lines.map((l, i) => (
            <div key={`${l.t}-${i}`} className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-faint">{l.t}</span> <span className="text-signal">{l.event}</span> → agente →{" "}
              <span className="text-ok">{l.result}</span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 font-mono text-[max(11px,0.6875rem)] text-faint">
        Simulação ilustrativa de um fluxo típico. Não representa um cliente.
      </figcaption>
    </figure>
  );
}

function Node({ x, y, title, sub }: { x: number; y: number; title: string; sub: string }) {
  return (
    <g>
      <rect x={x} y={y} width={100} height={40} rx={8} fill="var(--surface-elevated)" stroke="var(--border-strong)" />
      <text x={x + 12} y={y + 18} fill="var(--foreground)" fontFamily="var(--font-mono)" fontSize={11} fontWeight={500}>
        {title}
      </text>
      <text x={x + 12} y={y + 31} fill="var(--faint)" fontFamily="var(--font-mono)" fontSize={9}>
        {sub}
      </text>
    </g>
  );
}
