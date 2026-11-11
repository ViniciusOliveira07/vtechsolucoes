import { useEffect, useRef, useState } from "react";
import { useT, type L } from "@/lib/i18n";
import { Ico, type IcoName } from "./Ico";
import { useReducedMotion } from "./hooks";

type Scen = { icon: IcoName; name: string; to: string; inp: number; out: number[]; before: string; after: string; log: [string, string, boolean?][] };

const TEXT = {
  pt: { kicker: "como a vtech trabalha", title: "Toda empresa sabe onde perde tempo", lede: "O dado entra por um canal, passa pelas regras do seu negócio e chega pronto nos seus sistemas. Escolha um processo e veja o caminho.", group: "Escolha um processo", before: "Antes", after: "Com a Vtech", channels: "canais", rules: "regras", systems: "seus sistemas", svg: "Caminho do processo escolhido entre os canais, a Vtech e os seus sistemas", nodes: ["WhatsApp", "Site", "E-mail", "ERP", "CRM", "Financeiro"] },
  en: { kicker: "how vtech works", title: "Every company knows where it loses time", lede: "Data comes in through a channel, goes through your business rules and lands ready in your systems. Pick a process and follow the path.", group: "Pick a process", before: "Before", after: "With Vtech", channels: "channels", rules: "rules", systems: "your systems", svg: "Path of the chosen process between the channels, Vtech and your systems", nodes: ["WhatsApp", "Website", "E-mail", "ERP", "CRM", "Finance"] },
  es: { kicker: "cómo trabaja vtech", title: "Toda empresa sabe dónde pierde tiempo", lede: "El dato entra por un canal, pasa por las reglas de su negocio y llega listo a sus sistemas. Elija un proceso y vea el camino.", group: "Elija un proceso", before: "Antes", after: "Con Vtech", channels: "canales", rules: "reglas", systems: "sus sistemas", svg: "Camino del proceso elegido entre los canales, Vtech y sus sistemas", nodes: ["WhatsApp", "Sitio", "E-mail", "ERP", "CRM", "Finanzas"] },
};

const SCENS: L<Scen[]> = {
  pt: [
    { icon: "msg", name: "Pedido pelo WhatsApp", to: "→ ERP", inp: 0, out: [0, 1], before: "Alguém copia o pedido do WhatsApp e digita no ERP.", after: "O pedido entra no ERP e o cliente recebe a confirmação.", log: [["whatsapp", "mensagem: “2 cx do item 118”"], ["vtech", "cliente e item identificados"], ["erp", "pedido 4821 criado"], ["crm", "histórico do cliente atualizado"], ["whatsapp", "confirmação enviada ✓", true]] },
    { icon: "globe", name: "Lead do site", to: "→ CRM", inp: 1, out: [1], before: "O formulário cai num e-mail que ninguém lê a tempo.", after: "O lead chega no CRM com origem, e o vendedor é avisado.", log: [["site", "formulário enviado"], ["vtech", "empresa e segmento conferidos"], ["crm", "lead criado com origem: site"], ["vendas", "vendedor avisado ✓", true]] },
    { icon: "mail", name: "Boleto por e-mail", to: "→ Financeiro", inp: 2, out: [2, 0], before: "Alguém abre o PDF e lança valor e vencimento à mão.", after: "O boleto é lido e lançado em contas a pagar.", log: [["e-mail", "boleto em PDF recebido"], ["vtech", "valor e vencimento extraídos"], ["financeiro", "conta a pagar lançada"], ["erp", "fornecedor vinculado ✓", true]] },
  ],
  en: [
    { icon: "msg", name: "Order via WhatsApp", to: "→ ERP", inp: 0, out: [0, 1], before: "Someone copies the order from WhatsApp and types it into the ERP.", after: "The order lands in the ERP and the customer gets a confirmation.", log: [["whatsapp", "message: “2 boxes of item 118”"], ["vtech", "customer and item identified"], ["erp", "order 4821 created"], ["crm", "customer history updated"], ["whatsapp", "confirmation sent ✓", true]] },
    { icon: "globe", name: "Website lead", to: "→ CRM", inp: 1, out: [1], before: "The form lands in an inbox nobody reads in time.", after: "The lead reaches the CRM with its source and the rep is alerted.", log: [["website", "form submitted"], ["vtech", "company and industry checked"], ["crm", "lead created, source: website"], ["sales", "rep alerted ✓", true]] },
    { icon: "mail", name: "Bill by e-mail", to: "→ Finance", inp: 2, out: [2, 0], before: "Someone opens the PDF and types amount and due date by hand.", after: "The bill is read and posted to accounts payable.", log: [["e-mail", "PDF bill received"], ["vtech", "amount and due date extracted"], ["finance", "payable posted"], ["erp", "supplier linked ✓", true]] },
  ],
  es: [
    { icon: "msg", name: "Pedido por WhatsApp", to: "→ ERP", inp: 0, out: [0, 1], before: "Alguien copia el pedido de WhatsApp y lo digita en el ERP.", after: "El pedido entra al ERP y el cliente recibe la confirmación.", log: [["whatsapp", "mensaje: “2 cajas del ítem 118”"], ["vtech", "cliente e ítem identificados"], ["erp", "pedido 4821 creado"], ["crm", "historial del cliente actualizado"], ["whatsapp", "confirmación enviada ✓", true]] },
    { icon: "globe", name: "Lead del sitio", to: "→ CRM", inp: 1, out: [1], before: "El formulario cae en un e-mail que nadie lee a tiempo.", after: "El lead llega al CRM con su origen y se avisa al vendedor.", log: [["sitio", "formulario enviado"], ["vtech", "empresa y rubro verificados"], ["crm", "lead creado, origen: sitio"], ["ventas", "vendedor avisado ✓", true]] },
    { icon: "mail", name: "Boleta por e-mail", to: "→ Finanzas", inp: 2, out: [2, 0], before: "Alguien abre el PDF y carga monto y vencimiento a mano.", after: "La boleta se lee y se registra en cuentas por pagar.", log: [["e-mail", "boleta en PDF recibida"], ["vtech", "monto y vencimiento extraídos"], ["finanzas", "cuenta por pagar registrada"], ["erp", "proveedor vinculado ✓", true]] },
  ],
};

const IN_D = ["M110 50 C170 50 170 150 220 150", "M110 150 H220", "M110 250 C170 250 170 150 220 150"];
const OUT_D = ["M220 150 C270 150 270 50 330 50", "M220 150 H330", "M220 150 C270 150 270 250 330 250"];
const Y = [30, 130, 230];

export function ProcessRouter() {
  const t = useT(TEXT);
  const scens = useT(SCENS);
  const reduce = useReducedMotion();
  const [cur, setCur] = useState(0);
  const [auto, setAuto] = useState(true);
  const [lines, setLines] = useState(scens[0].log.length);
  const inRefs = useRef<(SVGPathElement | null)[]>([]);
  const outRefs = useRef<(SVGPathElement | null)[]>([]);
  const pkRef = useRef<SVGCircleElement>(null);
  const s = scens[cur];

  // console digitando os passos + troca automática de processo
  useEffect(() => {
    if (reduce) {
      setLines(s.log.length);
      return;
    }
    setLines(0);
    const timers = s.log.map((_, i) => window.setTimeout(() => setLines(i + 1), 350 + i * 700));
    if (auto) timers.push(window.setTimeout(() => setCur((c) => (c + 1) % scens.length), 7000));
    return () => timers.forEach(clearTimeout);
  }, [cur, auto, reduce, s.log, scens.length]);

  // pacote de dados andando: canal → vtech → cada sistema
  useEffect(() => {
    const pk = pkRef.current;
    if (reduce || !pk) return;
    const seq = s.out.flatMap((o) => [inRefs.current[s.inp], outRefs.current[o]]).filter(Boolean) as SVGPathElement[];
    let k = 0;
    let t0 = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = seq[k];
      const d = Math.min(1, Math.max(0, (now - t0) / 800));
      const pt = p.getPointAtLength(p.getTotalLength() * d);
      pk.setAttribute("cx", String(pt.x));
      pk.setAttribute("cy", String(pt.y));
      if (d >= 1) {
        k = (k + 1) % seq.length;
        t0 = now + (k % 2 === 0 ? 250 : 0);
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [cur, reduce, s.inp, s.out]);

  const pickScen = (i: number) => {
    setAuto(false);
    setCur(i);
  };

  return (
    <section id="como-funciona" className="vt-sec vt-screen vt-band vt-grid-bg">
      <div className="vt-wrap vt-band-grid">
        <div>
          <span className="vt-kicker">{t.kicker}</span>
          <h2 className="vt-h2 vt-dot">{t.title}</h2>
          <p className="vt-lede">{t.lede}</p>
          <div className="vt-scen" role="group" aria-label={t.group}>
            {scens.map((x, i) => (
              <button key={x.name} type="button" aria-pressed={i === cur} onClick={() => pickScen(i)}>
                <Ico name={x.icon} />
                <b>{x.name}</b>
                <small>{x.to}</small>
                <i className="vt-tm" data-run={i === cur && auto && !reduce} key={`${cur}-${auto}`} />
              </button>
            ))}
          </div>
          <div className="vt-compare">
            <div className="vt-bf">
              <em>{t.before}</em>
              {s.before}
            </div>
            <div className="vt-af">
              <em>{t.after}</em>
              {s.after}
            </div>
          </div>
        </div>
        <div className="vt-router">
          <div className="vt-router-cap" aria-hidden>
            <span>{t.channels}</span>
            <span>{t.rules}</span>
            <span>{t.systems}</span>
          </div>
          <svg viewBox="0 0 440 300" role="img" aria-label={t.svg}>
            {IN_D.map((d, i) => (
              <path key={`i${i}`} ref={(el) => void (inRefs.current[i] = el)} className="vt-wire" d={d} data-on={s.inp === i} />
            ))}
            {OUT_D.map((d, i) => (
              <path key={`o${i}`} ref={(el) => void (outRefs.current[i] = el)} className="vt-wire" d={d} data-on={s.out.includes(i)} />
            ))}
            {[0, 1, 2].map((i) => (
              <g
                key={`ni${i}`}
                className="vt-node"
                data-on={s.inp === i}
                role="button"
                tabIndex={0}
                aria-label={scens[i].name}
                onClick={() => pickScen(i)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), pickScen(i))}
              >
                <rect x="8" y={Y[i]} width="102" height="40" rx="20" />
                <text x="59" y={Y[i] + 25} textAnchor="middle">
                  {t.nodes[i]}
                </text>
              </g>
            ))}
            <g aria-hidden>
              <circle className="vt-core-ring" cx="220" cy="150" r="46" />
              <circle cx="220" cy="150" r="34" fill="#fff" />
              <text x="220" y="155" textAnchor="middle" fill="var(--signal)" style={{ font: "600 13px var(--font-mono)" }}>
                vtech
              </text>
            </g>
            {[0, 1, 2].map((i) => (
              <g key={`no${i}`} className="vt-node" data-on={s.out.includes(i)} aria-hidden>
                <rect x="330" y={Y[i]} width="102" height="40" rx="20" />
                <text x="381" y={Y[i] + 25} textAnchor="middle">
                  {t.nodes[3 + i]}
                </text>
              </g>
            ))}
            <circle ref={pkRef} className="vt-packet" r="5" cx="-20" cy="-20" aria-hidden />
          </svg>
          <div className="vt-console" aria-live="polite">
            {s.log.slice(0, lines).map(([who, what, ok]) => (
              <div key={`${cur}-${who}-${what}`}>
                <span>{who}</span>
                <b className={ok ? "vt-okk" : undefined} style={{ fontWeight: 400 }}>
                  {what}
                </b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
