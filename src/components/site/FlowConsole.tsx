import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useT, type L } from "@/lib/i18n";

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

const ROUTES: { from: WireId; to: WireId }[] = [
  { from: "w1", to: "w4" },
  { from: "w2", to: "w6" },
  { from: "w3", to: "w5" },
  { from: "w1", to: "w6" },
];

// Textos do diagrama; `log` segue a ordem de ROUTES (evento → resultado).
const TEXT: L<{
  log: { event: string; result: string }[];
  sources: { title: string; sub: string }[];
  targets: { title: string; sub: string }[];
  agent: [string, string, string];
  bar: string;
  live: string;
  aria: string;
  caption: string;
}> = {
  pt: {
    log: [
      { event: "lead.recebido", result: "crm.oportunidade_criada" },
      { event: "formulario.enviado", result: "equipe.resumo_enviado" },
      { event: "nota_fiscal.recebida", result: "erp.pedido_lancado" },
      { event: "duvida.cliente", result: "agente.respondeu_com_fonte" },
    ],
    sources: [
      { title: "WhatsApp", sub: "canal" },
      { title: "Site", sub: "formulário" },
      { title: "E-mail", sub: "documentos" },
    ],
    targets: [
      { title: "CRM", sub: "oportunidade" },
      { title: "ERP", sub: "pedido" },
      { title: "Equipe", sub: "resumo" },
    ],
    agent: ["Agente", "qualifica", "e decide"],
    bar: "fluxo: atendimento → crm",
    live: "ao vivo",
    aria: "Canais de entrada (WhatsApp, site e e-mail) ligados a um agente, que atualiza CRM e ERP e envia um resumo para a equipe",
    caption: "Simulação ilustrativa de um fluxo típico. Não representa um cliente.",
  },
  en: {
    log: [
      { event: "lead.received", result: "crm.opportunity_created" },
      { event: "form.submitted", result: "team.summary_sent" },
      { event: "invoice.received", result: "erp.order_posted" },
      { event: "customer.question", result: "agent.answered_with_source" },
    ],
    sources: [
      { title: "WhatsApp", sub: "channel" },
      { title: "Website", sub: "form" },
      { title: "Email", sub: "documents" },
    ],
    targets: [
      { title: "CRM", sub: "opportunity" },
      { title: "ERP", sub: "order" },
      { title: "Team", sub: "summary" },
    ],
    agent: ["Agent", "qualifies", "and decides"],
    bar: "flow: support → crm",
    live: "live",
    aria: "Inbound channels (WhatsApp, website and email) connected to an agent that updates the CRM and ERP and sends a summary to the team",
    caption: "Illustrative simulation of a typical flow. Does not represent a client.",
  },
  es: {
    log: [
      { event: "lead.recibido", result: "crm.oportunidad_creada" },
      { event: "formulario.enviado", result: "equipo.resumen_enviado" },
      { event: "factura.recibida", result: "erp.pedido_registrado" },
      { event: "duda.cliente", result: "agente.respondio_con_fuente" },
    ],
    sources: [
      { title: "WhatsApp", sub: "canal" },
      { title: "Sitio", sub: "formulario" },
      { title: "Correo", sub: "documentos" },
    ],
    targets: [
      { title: "CRM", sub: "oportunidad" },
      { title: "ERP", sub: "pedido" },
      { title: "Equipo", sub: "resumen" },
    ],
    agent: ["Agente", "califica", "y decide"],
    bar: "flujo: atención → crm",
    live: "en vivo",
    aria: "Canales de entrada (WhatsApp, sitio y correo) conectados a un agente que actualiza el CRM y el ERP y envía un resumen al equipo",
    caption: "Simulación ilustrativa de un flujo típico. No representa a un cliente.",
  },
};

const NODE_Y = [40, 130, 220];

// Cada linha guarda só a rota; o texto sai do idioma atual na hora de desenhar.
type Line = { t: string; route: number };

const START = 9 * 3600 + 14 * 60 + 2; // 09:14:02
const fmt = (s: number) =>
  [Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60].map((n) => String(n).padStart(2, "0")).join(":");

const INITIAL: Line[] = ROUTES.map((_, i) => ({ t: fmt(START + i * 7), route: i }));

/** `compact`: só o diagrama (sem o log de eventos), para caber em telas de celular. */
export function FlowConsole({ compact = false }: { compact?: boolean }) {
  const tx = useT(TEXT);
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
      const route = i++ % ROUTES.length;
      const r = ROUTES[route];
      travel(r.from, 900, () => {
        setPulse(true);
        timers.push(window.setTimeout(() => setPulse(false), 260));
        travel(r.to, 900, () => {
          clock += 3 + Math.floor(Math.random() * 9);
          setLines((ls) => [...ls, { t: fmt(clock), route }].slice(-5));
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
          <span>{tx.bar}</span>
          <span>{tx.live}</span>
        </div>
        <svg
          viewBox="0 0 520 300"
          className="flow-svg block h-auto w-full"
          role="img"
          aria-label={tx.aria}
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
          {tx.sources.map((n, i) => (
            <Node key={i} x={18} y={NODE_Y[i]} {...n} />
          ))}
          {tx.targets.map((n, i) => (
            <Node key={i} x={402} y={NODE_Y[i]} {...n} />
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
              {tx.agent[0]}
            </text>
            <text x={234} y={160} fill="var(--faint)" fontFamily="var(--font-mono)" fontSize={9}>
              {tx.agent[1]}
            </text>
            <text x={234} y={171} fill="var(--faint)" fontFamily="var(--font-mono)" fontSize={9}>
              {tx.agent[2]}
            </text>
          </g>
          <g ref={pktLayer} />
        </svg>
        <div
          aria-hidden
          className={cn(
            "flow-log flex flex-col border-t border-border px-3.5 py-2.5 font-mono text-[max(11px,0.6875rem)] text-muted-foreground",
            compact && "hidden",
          )}
        >
          {/* só as 4 últimas; a mais antiga delas aparece apenas em telas altas */}
          {lines.slice(-4).map((l, i, arr) => (
            <div
              key={`${l.t}-${l.route}`}
              className={cn("overflow-hidden text-ellipsis whitespace-nowrap", arr.length === 4 && i === 0 && "flow-log-extra")}
            >
              <span className="text-faint">{l.t}</span> <span className="text-signal">{tx.log[l.route].event}</span> →{" "}
              {tx.agent[0].toLowerCase()} → <span className="text-ok">{tx.log[l.route].result}</span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 font-mono text-[max(11px,0.6875rem)] text-faint">
        {tx.caption}
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
