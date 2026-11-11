import { useEffect, useRef, useState } from "react";
import { useT, type L } from "@/lib/i18n";
import { STACK } from "@/lib/stack";
import { Ico, type IcoName } from "./Ico";
import { clamp01, useReducedMotion, useScrollFrame } from "./hooks";

type Layer = { icon: IcoName; name: string; sub: string; points: string[]; stack: number };

const TEXT = {
  pt: { kicker: "arquitetura", title: "Três camadas. Um responsável pela arquitetura inteira", sub: "A maioria das empresas contrata cada parte de um fornecedor diferente e herda as falhas entre elas. Nós desenhamos as três juntas.", group: "Camadas", cap: "Toque em uma camada" },
  en: { kicker: "architecture", title: "Three layers. One owner for the whole architecture", sub: "Most companies hire each part from a different vendor and inherit the gaps between them. We design all three together.", group: "Layers", cap: "Tap a layer" },
  es: { kicker: "arquitectura", title: "Tres capas. Un responsable por toda la arquitectura", sub: "La mayoría de las empresas contrata cada parte a un proveedor distinto y hereda las fallas entre ellas. Nosotros diseñamos las tres juntas.", group: "Capas", cap: "Toque una capa" },
};

// stack: índice da frente em STACK (0 ia, 1 integração, 3 frontend)
const LAYERS: L<Layer[]> = {
  pt: [
    { icon: "layout", name: "Interface", sub: "Onde clientes e equipe trabalham.", points: ["Sites e sistemas web rápidos e acessíveis", "Painéis com o número do dia", "Desempenho medido, não prometido"], stack: 3 },
    { icon: "plug", name: "Integração", sub: "Sistemas trocando dados sozinhos.", points: ["Conectores via API e webhooks", "Sincronização de cadastros e pedidos", "Falha tratada e reprocessada"], stack: 1 },
    { icon: "shield", name: "Inteligência", sub: "IA sobre os seus dados, com limites.", points: ["Agentes e RAG que citam a fonte", "Guardrails: não inventa preço nem prazo", "Custo por resposta monitorado"], stack: 0 },
  ],
  en: [
    { icon: "layout", name: "Interface", sub: "Where customers and your team work.", points: ["Fast, accessible websites and web systems", "Dashboards with today's numbers", "Performance measured, not promised"], stack: 3 },
    { icon: "plug", name: "Integration", sub: "Systems exchanging data on their own.", points: ["API and webhook connectors", "Records and orders kept in sync", "Failures handled and retried"], stack: 1 },
    { icon: "shield", name: "Intelligence", sub: "AI over your data, with limits.", points: ["Agents and RAG that cite the source", "Guardrails: no made-up prices or deadlines", "Cost per answer monitored"], stack: 0 },
  ],
  es: [
    { icon: "layout", name: "Interfaz", sub: "Donde trabajan clientes y equipo.", points: ["Sitios y sistemas web rápidos y accesibles", "Paneles con el número del día", "Rendimiento medido, no prometido"], stack: 3 },
    { icon: "plug", name: "Integración", sub: "Sistemas intercambiando datos solos.", points: ["Conectores vía API y webhooks", "Registros y pedidos sincronizados", "Fallas tratadas y reprocesadas"], stack: 1 },
    { icon: "shield", name: "Inteligencia", sub: "IA sobre sus datos, con límites.", points: ["Agentes y RAG que citan la fuente", "Guardrails: no inventa precios ni plazos", "Costo por respuesta monitoreado"], stack: 0 },
  ],
};

export function LayerStack() {
  const t = useT(TEXT);
  const layers = useT(LAYERS);
  const stack = useT(STACK);
  const reduce = useReducedMotion();
  const [cur, setCur] = useState(0);
  const [auto, setAuto] = useState(true);
  const secRef = useRef<HTMLElement>(null);
  const isoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!auto || reduce) return;
    const id = window.setTimeout(() => setCur((c) => (c + 1) % 3), 5000);
    return () => window.clearTimeout(id);
  }, [cur, auto, reduce]);

  // as camadas se afastam conforme a seção entra na tela
  useScrollFrame(() => {
    const sec = secRef.current;
    const iso = isoRef.current;
    if (!sec || !iso) return;
    const top = sec.getBoundingClientRect().top;
    const p = reduce ? 1 : clamp01((window.innerHeight - top) / (window.innerHeight * 0.9));
    iso.style.setProperty("--gap", `${12 + p * 58}px`);
  }, [reduce]);

  const pick = (i: number) => {
    setAuto(false);
    setCur(i);
  };

  return (
    <section ref={secRef} id="arquitetura" className="vt-sec vt-screen vt-dark vt-on-dark" data-nav-dark="">
      <div className="vt-wrap vt-layers">
        <div>
          <div className="vt-head">
            <span className="vt-kicker">{t.kicker}</span>
            <h2 className="vt-h2 vt-dot">{t.title}</h2>
            <p>{t.sub}</p>
          </div>
          <div className="vt-lay-list" role="group" aria-label={t.group}>
            {layers.map((l, i) => (
              <div key={l.name} className="vt-lay" data-on={i === cur}>
                <button type="button" className="vt-lay-btn" aria-pressed={i === cur} onClick={() => pick(i)}>
                  <span className="vt-ix">
                    <Ico name={l.icon} />
                  </span>
                  <b>{l.name}</b>
                  <small>{l.sub}</small>
                </button>
                <div className="vt-lay-detail">
                  <ul>
                    {l.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <div className="vt-tags">
                    {stack[l.stack][1].slice(0, 5).map((x) => (
                      <span key={x}>{x}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="vt-stage" aria-hidden>
          <div className="vt-iso" ref={isoRef}>
            {/* de baixo para cima: inteligência, integração, interface */}
            <div className="vt-plane" style={{ ["--k" as string]: -1 }} data-on={cur === 2} onClick={() => pick(2)}>
              <div className="vt-ai-doc">
                <i style={{ width: "80%" }} />
                <i data-hl="" style={{ width: "62%" }} />
                <i style={{ width: "90%" }} />
                <i style={{ width: "70%" }} />
                <i data-hl="" style={{ width: "45%" }} />
                <i style={{ width: "84%" }} />
              </div>
              <span className="vt-pl">{layers[2].name.toUpperCase()}</span>
            </div>
            <div className="vt-plane" style={{ ["--k" as string]: 0 }} data-on={cur === 1} onClick={() => pick(1)}>
              <div className="vt-int-net">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M18 18 L50 50 L82 18 M18 82 L50 50 L82 82" />
                </svg>
                <i style={{ left: "8%", top: "8%" }} />
                <i style={{ right: "8%", top: "8%" }} />
                <i style={{ left: "42%", top: "42%" }} />
                <i style={{ left: "8%", bottom: "8%" }} />
                <i style={{ right: "8%", bottom: "8%" }} />
              </div>
              <span className="vt-pl">{layers[1].name.toUpperCase()}</span>
            </div>
            <div className="vt-plane" style={{ ["--k" as string]: 1 }} data-on={cur === 0} onClick={() => pick(0)}>
              <div className="vt-ui-win">
                <div className="vt-wbar">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="vt-wbody">
                  <i />
                  <i />
                </div>
              </div>
              <span className="vt-pl">{layers[0].name.toUpperCase()}</span>
            </div>
          </div>
          <span className="vt-stage-cap">{t.cap}</span>
        </div>
      </div>
    </section>
  );
}
