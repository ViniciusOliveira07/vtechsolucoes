import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useT, type L } from "@/lib/i18n";
import type { ServiceSlug } from "@/lib/site";
import { Ico, type IcoName } from "./Ico";
import { clamp01, useReducedMotion, useScrollFrame, useSeen } from "./hooks";

type Card = { slug: ServiceSlug; icon: IcoName; name: string; kicker: string; title: string; lead: string; items: [IcoName, string, string][]; closing: string };

const TEXT = {
  pt: { kicker: "o que construímos", title: "Quatro frentes. Um só time responsável", sub: "Contratadas separadamente ou combinadas no mesmo projeto.", deliver: "O que entregamos", more: "Ver o serviço" },
  en: { kicker: "what we build", title: "Four fronts. One accountable team", sub: "Hired separately or combined in the same project.", deliver: "What we deliver", more: "See the service" },
  es: { kicker: "lo que construimos", title: "Cuatro frentes. Un solo equipo responsable", sub: "Contratados por separado o combinados en el mismo proyecto.", deliver: "Lo que entregamos", more: "Ver el servicio" },
};

const CARDS: L<Card[]> = {
  pt: [
    { slug: "automacoes-com-ia", icon: "bot", name: "Automações com IA", kicker: "agentes · rag", title: "Agentes que consultam e agem nos seus sistemas.", lead: "Para atendimento, jurídico, comercial e backoffice com alto volume de tarefas repetitivas.", items: [["msg", "Agentes no ERP e no CRM", "respondem e executam, sem copiar e colar entre telas"], ["file", "RAG sobre os seus documentos", "manuais, contratos e histórico de atendimento"], ["gauge", "Painel de precisão e custo", "você vê quanto custa e quanto acerta cada resposta"]], closing: "Seus dados fora do treino dos modelos." },
    { slug: "integracoes", icon: "plug", name: "Integrações", kicker: "api · conectores", title: "ERP, CRM e pagamentos falando a mesma língua.", lead: "Para empresas com sistemas que não conversam entre si e equipes que redigitam pedido, cadastro e boleto.", items: [["flow", "Conectores via API e webhooks", "Bling, Omie, Tiny, gateways e o que mais você usa"], ["refresh", "Falha tratada e reprocessada", "se a rede cai, o dado não se perde"], ["chart", "Monitoramento das integrações", "você sabe o que passou e o que travou"]], closing: "Nenhum pedido redigitado." },
    { slug: "sistemas-web", icon: "layout", name: "Sistemas web", kicker: "plataformas", title: "A planilha vira sistema. Do jeito do seu processo.", lead: "Para operações que dependem de planilhas ou de um SaaS que não se adapta ao processo.", items: [["users", "Permissões por perfil", "cada pessoa vê e edita só o que é dela"], ["chart", "Painéis e relatórios operacionais", "o número do dia sem montar planilha"], ["checkc", "Fluxos de aprovação", "compra, desconto e reembolso com rastro"]], closing: "Código e documentação entregues a você." },
    { slug: "sites-institucionais", icon: "globe", name: "Sites institucionais", kicker: "web · seo", title: "Um site que aparece no Google e traz conversa.", lead: "Para empresas B2B cujo site não gera oportunidades nem transmite credibilidade.", items: [["gauge", "Rápido, acessível e indexável", "nota alta no PageSpeed também no celular"], ["search", "SEO técnico e blog", "arquitetura de conteúdo para busca orgânica"], ["msg", "Lead direto no seu canal", "formulário ligado ao CRM ou ao WhatsApp"]], closing: "Este site segue a mesma receita." },
    { slug: "consultoria-tech", icon: "chart", name: "Consultoria tech", kicker: "cto as a service", title: "Decisão de tecnologia com quem constrói.", lead: "Para diretorias que precisam decidir stack, arquitetura ou fornecedor com segurança.", items: [["search", "Diagnóstico técnico do que já existe", "sistemas, custos e riscos mapeados"], ["flow", "Roadmap priorizado por retorno", "o que fazer primeiro e por quê"], ["users", "Apoio na escolha de fornecedores", "proposta comparada e cobrança de entrega"]], closing: "Revisão de arquitetura e custos de nuvem." },
  ],
  en: [
    { slug: "automacoes-com-ia", icon: "bot", name: "AI automations", kicker: "agents · rag", title: "Agents that look things up and act in your systems.", lead: "For support, legal, sales and back office teams with a high volume of repetitive tasks.", items: [["msg", "Agents in your ERP and CRM", "they answer and execute, no copy and paste between screens"], ["file", "RAG over your documents", "manuals, contracts and support history"], ["gauge", "Accuracy and cost dashboard", "you see what each answer costs and how often it is right"]], closing: "Your data stays out of model training." },
    { slug: "integracoes", icon: "plug", name: "Integrations", kicker: "api · connectors", title: "ERP, CRM and payments speaking the same language.", lead: "For companies whose systems don't talk to each other and whose teams retype orders, records and bills.", items: [["flow", "API and webhook connectors", "Bling, Omie, Tiny, gateways and whatever else you use"], ["refresh", "Failures handled and retried", "if the network drops, the data is not lost"], ["chart", "Integration monitoring", "you know what went through and what got stuck"]], closing: "No order typed twice." },
    { slug: "sistemas-web", icon: "layout", name: "Web systems", kicker: "platforms", title: "The spreadsheet becomes a system. Built around your process.", lead: "For operations that depend on spreadsheets or on a SaaS that doesn't fit the process.", items: [["users", "Role-based permissions", "each person sees and edits only what is theirs"], ["chart", "Operational dashboards and reports", "today's numbers without building a spreadsheet"], ["checkc", "Approval flows", "purchases, discounts and refunds with an audit trail"]], closing: "Code and documentation handed over to you." },
    { slug: "sites-institucionais", icon: "globe", name: "Corporate websites", kicker: "web · seo", title: "A website that shows up on Google and starts conversations.", lead: "For B2B companies whose website brings no opportunities and no credibility.", items: [["gauge", "Fast, accessible and indexable", "high PageSpeed scores on mobile too"], ["search", "Technical SEO and blog", "content architecture for organic search"], ["msg", "Leads straight to your channel", "forms connected to your CRM or WhatsApp"]], closing: "This website follows the same recipe." },
    { slug: "consultoria-tech", icon: "chart", name: "Tech consulting", kicker: "cto as a service", title: "Technology decisions with people who build.", lead: "For leadership teams that need to choose a stack, architecture or vendor with confidence.", items: [["search", "Technical diagnosis of what exists", "systems, costs and risks mapped"], ["flow", "Roadmap prioritized by return", "what to do first and why"], ["users", "Help choosing vendors", "proposals compared and delivery held to account"]], closing: "Architecture and cloud cost review." },
  ],
  es: [
    { slug: "automacoes-com-ia", icon: "bot", name: "Automatizaciones con IA", kicker: "agentes · rag", title: "Agentes que consultan y actúan en sus sistemas.", lead: "Para atención, legal, comercial y backoffice con alto volumen de tareas repetitivas.", items: [["msg", "Agentes en el ERP y el CRM", "responden y ejecutan, sin copiar y pegar entre pantallas"], ["file", "RAG sobre sus documentos", "manuales, contratos e historial de atención"], ["gauge", "Panel de precisión y costo", "usted ve cuánto cuesta y cuánto acierta cada respuesta"]], closing: "Sus datos fuera del entrenamiento de los modelos." },
    { slug: "integracoes", icon: "plug", name: "Integraciones", kicker: "api · conectores", title: "ERP, CRM y pagos hablando el mismo idioma.", lead: "Para empresas con sistemas que no se comunican y equipos que vuelven a digitar pedidos, registros y boletas.", items: [["flow", "Conectores vía API y webhooks", "Bling, Omie, Tiny, pasarelas y lo que usted use"], ["refresh", "Fallas tratadas y reprocesadas", "si la red cae, el dato no se pierde"], ["chart", "Monitoreo de las integraciones", "usted sabe qué pasó y qué se trabó"]], closing: "Ningún pedido digitado dos veces." },
    { slug: "sistemas-web", icon: "layout", name: "Sistemas web", kicker: "plataformas", title: "La planilla se vuelve sistema. A la medida de su proceso.", lead: "Para operaciones que dependen de planillas o de un SaaS que no se adapta al proceso.", items: [["users", "Permisos por perfil", "cada persona ve y edita solo lo suyo"], ["chart", "Paneles e informes operativos", "el número del día sin armar planillas"], ["checkc", "Flujos de aprobación", "compras, descuentos y reembolsos con registro"]], closing: "Código y documentación entregados a usted." },
    { slug: "sites-institucionais", icon: "globe", name: "Sitios institucionales", kicker: "web · seo", title: "Un sitio que aparece en Google y genera conversaciones.", lead: "Para empresas B2B cuyo sitio no genera oportunidades ni transmite credibilidad.", items: [["gauge", "Rápido, accesible e indexable", "nota alta en PageSpeed también en el celular"], ["search", "SEO técnico y blog", "arquitectura de contenido para búsqueda orgánica"], ["msg", "Lead directo a su canal", "formulario conectado al CRM o a WhatsApp"]], closing: "Este sitio sigue la misma receta." },
    { slug: "consultoria-tech", icon: "chart", name: "Consultoría tech", kicker: "cto as a service", title: "Decisiones de tecnología con quien construye.", lead: "Para direcciones que necesitan decidir stack, arquitectura o proveedor con seguridad.", items: [["search", "Diagnóstico técnico de lo que existe", "sistemas, costos y riesgos mapeados"], ["flow", "Hoja de ruta priorizada por retorno", "qué hacer primero y por qué"], ["users", "Apoyo en la elección de proveedores", "propuestas comparadas y entrega exigida"]], closing: "Revisión de arquitectura y costos de nube." },
  ],
};

const VIN = {
  pt: { road: "Roadmap priorizado", roadItems: [["Integrar ERP ↔ CRM", "retorno alto"], ["Agente no atendimento", "retorno alto"], ["Trocar planilhas por sistema", "retorno médio"]], legal: "Agente jurídico", q: "Qual o prazo de aviso prévio no contrato da Construtora Alfa?", a: "30 dias corridos, por escrito. Rescisão antes disso gera multa de 10% sobre o saldo.", src: "contrato_alfa_2026.pdf · cláusula 12.3", ex: "exemplo", cited: "fonte citada ✓", sync: "Sincronização", live: "ao vivo", week: "Pedidos por semana", buy: "Compra #212", waiting: "aguardando diretoria", no: "Recusar", yes: "Aprovar", ps: "PageSpeed · celular", r: ["Desempenho", "Acessibilidade", "Práticas", "SEO"], feed: [["Pedido 4821 · Bling → CRM", "0,8s"], ["Cliente atualizado no Omie", "1,1s"], ["Gateway fora · reprocessado", "retry", 1], ["Boleto 0193 baixado", "0,6s"], ["Pedido 4822 · Bling → CRM", "0,7s"], ["Estoque conferido no Tiny", "0,9s"], ["Webhook recebido · NF-e 1180", "0,4s"], ["Cliente novo no CRM", "1,0s"]] },
  en: { road: "Prioritized roadmap", roadItems: [["Connect ERP ↔ CRM", "high return"], ["Agent in support", "high return"], ["Replace spreadsheets", "medium return"]], legal: "Legal agent", q: "What is the notice period in the Alfa Construction contract?", a: "30 calendar days, in writing. Terminating earlier triggers a 10% fee on the balance.", src: "contract_alfa_2026.pdf · clause 12.3", ex: "example", cited: "source cited ✓", sync: "Sync", live: "live", week: "Orders per week", buy: "Purchase #212", waiting: "awaiting the board", no: "Decline", yes: "Approve", ps: "PageSpeed · mobile", r: ["Performance", "Accessibility", "Practices", "SEO"], feed: [["Order 4821 · Bling → CRM", "0.8s"], ["Customer updated in Omie", "1.1s"], ["Gateway down · retried", "retry", 1], ["Bill 0193 settled", "0.6s"], ["Order 4822 · Bling → CRM", "0.7s"], ["Stock checked in Tiny", "0.9s"], ["Webhook received · invoice 1180", "0.4s"], ["New customer in CRM", "1.0s"]] },
  es: { road: "Hoja de ruta priorizada", roadItems: [["Integrar ERP ↔ CRM", "retorno alto"], ["Agente en la atención", "retorno alto"], ["Cambiar planillas por sistema", "retorno medio"]], legal: "Agente legal", q: "¿Cuál es el plazo de preaviso en el contrato de Constructora Alfa?", a: "30 días corridos, por escrito. Rescindir antes genera una multa del 10% sobre el saldo.", src: "contrato_alfa_2026.pdf · cláusula 12.3", ex: "ejemplo", cited: "fuente citada ✓", sync: "Sincronización", live: "en vivo", week: "Pedidos por semana", buy: "Compra #212", waiting: "esperando a la dirección", no: "Rechazar", yes: "Aprobar", ps: "PageSpeed · celular", r: ["Rendimiento", "Accesibilidad", "Prácticas", "SEO"], feed: [["Pedido 4821 · Bling → CRM", "0,8s"], ["Cliente actualizado en Omie", "1,1s"], ["Pasarela caída · reprocesado", "retry", 1], ["Boleta 0193 liquidada", "0,6s"], ["Pedido 4822 · Bling → CRM", "0,7s"], ["Stock verificado en Tiny", "0,9s"], ["Webhook recibido · factura 1180", "0,4s"], ["Cliente nuevo en el CRM", "1,0s"]] },
};

/** Ilustração de cada serviço (a mesma da home), usada também na primeira dobra da página do serviço. */
const VIG: Record<ServiceSlug, number> = { "automacoes-com-ia": 0, integracoes: 1, "sistemas-web": 2, "sites-institucionais": 3, "consultoria-tech": 4 };

export function ServiceVignette({ slug }: { slug: ServiceSlug }) {
  const reduce = useReducedMotion();
  return (
    <div className="vt-card-vis vt-hero-vis">
      <Vignette kind={VIG[slug]} reduce={reduce} />
    </div>
  );
}

/** Serviços em cartões que se empilham. `all` inclui a consultoria (página /servicos); `hideHead` quando a página já tem o título. */
export function ServiceStack({ all = false, hideHead = false }: { all?: boolean; hideHead?: boolean } = {}) {
  const t = useT(TEXT);
  const cards = useT(CARDS).filter((c) => all || c.slug !== "consultoria-tech");
  const reduce = useReducedMotion();
  const refs = useRef<(HTMLElement | null)[]>([]);

  // o cartão de baixo empurra o de cima para trás (só quando eles grudam no topo)
  useScrollFrame(() => {
    const els = refs.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const sticky = getComputedStyle(els[0]).position === "sticky" && !reduce;
    els.forEach((c, i) => {
      const dim = c.querySelector<HTMLElement>(".vt-dim");
      const next = els[i + 1];
      if (!next || !sticky) {
        c.style.transform = "";
        if (dim) dim.style.opacity = "0";
        return;
      }
      const cr = c.getBoundingClientRect();
      const p = clamp01(1 - (next.getBoundingClientRect().top - cr.top) / cr.height);
      c.style.transform = `scale(${1 - p * 0.05})`;
      if (dim) dim.style.opacity = String(p * 0.45);
    });
  }, [reduce]);

  return (
    <section id="servicos" className="vt-sec">
      <div className="vt-wrap">
        {!hideHead && (
          <div className="vt-head">
            <span className="vt-kicker">{t.kicker}</span>
            <h2 className="vt-h2 vt-dot">{t.title}</h2>
            <p>{t.sub}</p>
          </div>
        )}
        <div className="vt-stack">
          {cards.map((c, i) => (
            <article
              key={c.slug}
              ref={(el) => void (refs.current[i] = el)}
              className="vt-card"
              style={{ ["--i" as string]: i }}
              {...(i % 2 ? { "data-flip": "" } : {})}
            >
              <div className="vt-card-txt">
                <div className="vt-svc">
                  <i>
                    <Ico name={c.icon} />
                  </i>
                  <div>
                    <b>{c.name}</b>
                    <small>{c.kicker}</small>
                  </div>
                </div>
                <h3 className="vt-h3">{c.title}</h3>
                <p className="vt-card-lead">{c.lead}</p>
                <span className="vt-eyebrow">{t.deliver}</span>
                <ul className="vt-items">
                  {c.items.map(([ic, b, s]) => (
                    <li key={b}>
                      <Ico name={ic} />
                      <div>
                        <b>{b}</b>
                        <span>{s}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="vt-card-foot">
                  <p className="vt-closing">
                    <Ico name="checkc" />
                    {c.closing}
                  </p>
                  {all && (
                    <Link className="vt-link" to={`/servicos/${c.slug}`}>
                      {t.more} <Ico name="arrow" />
                    </Link>
                  )}
                </div>
              </div>
              <div className="vt-card-vis">
                <Vignette kind={VIG[c.slug]} reduce={reduce} />
              </div>
              <div className="vt-dim" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Vignette({ kind, reduce }: { kind: number; reduce: boolean }) {
  const v = useT(VIN);
  const [ref, seen] = useSeen<HTMLDivElement>(0.4);
  const [feedAt, setFeedAt] = useState(0);
  useEffect(() => {
    if (kind !== 1 || reduce) return;
    const id = window.setInterval(() => setFeedAt((x) => x + 1), 2200);
    return () => window.clearInterval(id);
  }, [kind, reduce]);

  if (kind === 4)
    return (
      <div className="vt-vin">
        <div className="vt-vin-h">
          <b>{v.road}</b>
          <span className="vt-badge">{v.ex}</span>
        </div>
        <ol className="vt-log">
          {v.roadItems.map(([what, ret], i) => (
            <li key={what}>
              <b className="vt-st" style={{ background: "var(--signal)", width: "1.3rem", height: "1.3rem", display: "grid", placeItems: "center", color: "#fff", fontSize: ".66rem" }}>
                {i + 1}
              </b>
              {what}
              <em>{ret}</em>
            </li>
          ))}
        </ol>
      </div>
    );
  if (kind === 0)
    return (
      <div className="vt-vin">
        <div className="vt-vin-h">
          <b>{v.legal}</b>
          <span className="vt-badge">RAG</span>
        </div>
        <div className="vt-q">{v.q}</div>
        <div className="vt-a">{v.a}</div>
        <div className="vt-src">
          <Ico name="file" />
          {v.src}
        </div>
        <div className="vt-meter">
          <span>{v.ex}</span>
          <span>{v.cited}</span>
        </div>
      </div>
    );
  if (kind === 1) {
    const n = v.feed.length;
    const rows = [0, 1, 2, 3].map((j) => v.feed[(((feedAt - j) % n) + n) % n]);
    return (
      <div className="vt-vin">
        <div className="vt-vin-h">
          <b>{v.sync}</b>
          <span className="vt-badge" data-ok="">
            {v.live}
          </span>
        </div>
        <ul className="vt-log">
          {rows.map((r) => (
            <li key={`${feedAt}-${r[0]}`}>
              <i className="vt-st" {...(r[2] ? { "data-warn": "" } : {})} />
              {r[0]}
              <em>{r[1]}</em>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (kind === 2)
    return (
      <div className="vt-vin" ref={ref} data-off={!seen && !reduce}>
        <div className="vt-vin-h">
          <b>{v.week}</b>
          <span className="vt-badge">{v.ex}</span>
        </div>
        <div className="vt-bars">
          {[42, 58, 50, 72, 64, 88, 80].map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="vt-appr">
          <div>
            <b>{v.buy}</b>
            <small>{v.waiting}</small>
          </div>
          <div className="vt-mini">
            <span>{v.no}</span>
            <span data-go="">{v.yes}</span>
          </div>
        </div>
      </div>
    );
  return (
    <div className="vt-vin" ref={ref} data-off={!seen && !reduce}>
      <div className="vt-vin-h">
        <b>{v.ps}</b>
        <span className="vt-badge" data-ok="">
          vtechsolucoes.ia.br
        </span>
      </div>
      <div className="vt-rings">
        {[93, 100, 100, 100].map((val, i) => (
          <div key={i}>
            <div className="vt-ring" style={{ ["--v" as string]: val }}>
              <svg viewBox="0 0 100 100" aria-hidden>
                <circle className="vt-rbg" cx="50" cy="50" r="40" />
                <circle className="vt-rfg" cx="50" cy="50" r="40" />
              </svg>
              <b>{i === 0 ? "93+" : val}</b>
            </div>
            <small>{v.r[i]}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
