import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useT, type L } from "@/lib/i18n";
import { Ico } from "./Ico";
import { clamp01, useReducedMotion, useScrollFrame } from "./hooks";

const TEXT = {
  pt: { kicker: "processo", title: "Do primeiro contato ao código na sua mão", sub: "Cada projeto anda como um deploy: uma etapa só começa quando a anterior foi aprovada.", project: "projeto · sua empresa", running: "em andamento", delivered: "entregue", stage: "ETAPA", done: "concluída", run: "em andamento", queued: "na fila", consult: "Precisa decidir stack, arquitetura ou fornecedor?", consultText: "A consultoria tech faz o diagnóstico e o roadmap com você.", consultCta: "Conhecer a consultoria" },
  en: { kicker: "process", title: "From the first call to the code in your hands", sub: "Every project runs like a deploy: a stage only starts once the previous one is approved.", project: "project · your company", running: "in progress", delivered: "delivered", stage: "STAGE", done: "done", run: "in progress", queued: "queued", consult: "Need to decide on a stack, architecture or vendor?", consultText: "Tech consulting runs the diagnosis and the roadmap with you.", consultCta: "See the consulting" },
  es: { kicker: "proceso", title: "Del primer contacto al código en sus manos", sub: "Cada proyecto avanza como un deploy: una etapa solo empieza cuando la anterior fue aprobada.", project: "proyecto · su empresa", running: "en curso", delivered: "entregado", stage: "ETAPA", done: "concluida", run: "en curso", queued: "en cola", consult: "¿Necesita decidir stack, arquitectura o proveedor?", consultText: "La consultoría tech hace el diagnóstico y la hoja de ruta con usted.", consultCta: "Conocer la consultoría" },
};

const STAGES: L<[string, string, string?][]> = {
  pt: [["Diagnóstico", "Uma conversa técnica para mapear o processo que mais consome a sua equipe."], ["Proposta fechada", "Escopo, prazo e investimento por escrito, em até 24 horas úteis."], ["Construção", "Dentro do escopo combinado. O que mudar entra como aditivo, nunca como surpresa."], ["Entrega", "Deploy, documentação técnica e handoff. O código é seu."]],
  en: [["Diagnosis", "A technical call to map the process that eats up most of your team's time."], ["Fixed proposal", "Scope, timeline and investment in writing, within 24 business hours."], ["Build", "Within the agreed scope. Anything that changes comes in as an amendment, never as a surprise."], ["Delivery", "Deploy, technical documentation and handoff. The code is yours."]],
  es: [["Diagnóstico", "Una conversación técnica para mapear el proceso que más consume a su equipo."], ["Propuesta cerrada", "Alcance, plazo e inversión por escrito, en hasta 24 horas hábiles."], ["Construcción", "Dentro del alcance acordado. Lo que cambie entra como adenda, nunca como sorpresa."], ["Entrega", "Deploy, documentación técnica y traspaso. El código es suyo."]],
};

/** Esteira do processo; as páginas internas passam as próprias etapas e textos (já no idioma). */
export function Pipeline({
  id = "processo",
  kicker,
  title,
  sub,
  stages: custom,
  consult = true,
  headingAs: H = "h2",
}: {
  id?: string;
  kicker?: string;
  title?: string;
  sub?: string;
  stages?: [string, string, string?][];
  consult?: boolean;
  headingAs?: "h1" | "h2";
} = {}) {
  const t = useT(TEXT);
  const base = useT(STAGES);
  const stages = custom ?? base;
  const n = stages.length;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // sem JavaScript a esteira aparece concluída; no navegador ela avança com a rolagem
  const [done, setDone] = useState(n);

  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) return setDone(n);
    const r = el.getBoundingClientRect();
    const p = clamp01((window.innerHeight * 0.85 - r.top) / (r.height + window.innerHeight * 0.35));
    setDone(Math.min(n, Math.floor(p * (n + 0.2))));
  }, [reduce]);

  const finished = done >= n;
  return (
    <section id={id} className="vt-sec vt-screen">
      <div className="vt-wrap">
        <div className="vt-head">
          <span className="vt-kicker">{kicker ?? t.kicker}</span>
          <H className="vt-h2 vt-dot">{title ?? t.title}</H>
          <p>{sub ?? t.sub}</p>
        </div>
        <div className="vt-pipe" ref={ref}>
          <div className="vt-pipe-h">
            <span>
              <b>{t.project}</b> &nbsp;/ main
            </span>
            <span className="vt-pstate" data-done={finished}>
              <i />
              {finished ? t.delivered : t.running}
            </span>
          </div>
          <ol className="vt-stages">
            {stages.map(([name, desc, out], i) => {
              const st = i < done ? "done" : i === done ? "run" : "";
              return (
                <li key={name} className="vt-stg" data-st={st}>
                  <div className="vt-stg-top">
                    <span>
                      {t.stage} {i + 1}/{n}
                    </span>
                    <span className="vt-st-ic">
                      <Ico name="check" />
                    </span>
                  </div>
                  <h3 className="vt-h3">{name}</h3>
                  <p>{desc}</p>
                  {out && <p className="vt-out">→ {out}</p>}
                  <span className="vt-lbl">{st === "done" ? t.done : st === "run" ? t.run : t.queued}</span>
                </li>
              );
            })}
          </ol>
        </div>
        {consult && <div className="vt-bar2">
          <p>
            <b>{t.consult}</b> {t.consultText}
          </p>
          <Link className="vt-link" to="/servicos/consultoria-tech">
            {t.consultCta} <Ico name="arrow" />
          </Link>
        </div>}
      </div>
    </section>
  );
}
