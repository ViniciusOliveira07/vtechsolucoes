import { useT, type L } from "@/lib/i18n";
import type { Post } from "@/lib/blog";
import { Ico } from "./Ico";

/**
 * Capa de cada artigo: uma mini-ilustração do assunto, desenhada em HTML (sem imagem).
 * Artigo com capa própria fica em BY_SLUG; o que não tiver usa a da categoria, então
 * todo artigo novo já nasce com capa.
 */
type Kind = "sync" | "chat" | "price" | "serp" | "nosite" | "hub" | "cost" | "rag" | "dash";

const BY_SLUG: Record<string, Kind> = {
  "integracao-bling-omie-tiny": "sync",
  "integracao-bling-whatsapp": "sync",
  "agente-de-ia-no-whatsapp": "chat",
  "agendamento-pelo-whatsapp-com-ia": "chat",
  "quanto-custa-site-institucional": "price",
  "orcamento-criacao-de-site": "price",
  "como-criar-site-profissional-que-aparece-no-google": "serp",
  "empresa-sem-site-perde-clientes": "nosite",
  "como-integrar-com-erp": "hub",
  "custo-agente-ia-producao": "cost",
  "rag-na-pratica": "rag",
  "sistema-sob-medida-ou-erp-pronto": "dash",
};

const BY_CATEGORY: Record<string, Kind> = {
  "automacao-com-ia": "chat",
  integracoes: "sync",
  "sites-e-seo": "serp",
  "sistemas-sob-medida": "dash",
  "gestao-de-tecnologia": "hub",
};

const TX = {
  pt: { sync: "sincronização", rows: ["Bling · pedido 4821 → CRM", "Omie · cliente → loja", "Tiny · estoque → WhatsApp"], q: "Vocês abrem sábado?", a: "Abrimos das 8h às 12h. Quer agendar um horário?", price: "o que pesa no preço", bars: ["Páginas", "Conteúdo", "SEO técnico", "Integrações"], query: "empresa de integração erp", url: "suaempresa.com.br › servicos", res: "Integração de ERP sob medida", name: "nome da sua empresa", none: "Nenhum site encontrado", hub: ["API", "Banco", "Planilha"], cost: "custo mensal", leg: ["tokens", "infra", "monitoramento"], rag1: "O prazo de troca é de ", rag2: "7 dias corridos", rag3: " após o recebimento, com nota fiscal.", src: "fonte · politica_trocas.pdf", dash: "pedidos por semana" },
  en: { sync: "sync", rows: ["Bling · order 4821 → CRM", "Omie · customer → store", "Tiny · stock → WhatsApp"], q: "Are you open on Saturday?", a: "We're open 8 am to noon. Want to book a time?", price: "what drives the price", bars: ["Pages", "Content", "Technical SEO", "Integrations"], query: "erp integration company", url: "yourcompany.com › services", res: "Custom ERP integration", name: "your company name", none: "No website found", hub: ["API", "Database", "Sheet"], cost: "monthly cost", leg: ["tokens", "infra", "monitoring"], rag1: "Returns are accepted within ", rag2: "7 calendar days", rag3: " of delivery, with the invoice.", src: "source · returns_policy.pdf", dash: "orders per week" },
  es: { sync: "sincronización", rows: ["Bling · pedido 4821 → CRM", "Omie · cliente → tienda", "Tiny · stock → WhatsApp"], q: "¿Abren el sábado?", a: "Abrimos de 8 a 12 h. ¿Quiere reservar un horario?", price: "lo que pesa en el precio", bars: ["Páginas", "Contenido", "SEO técnico", "Integraciones"], query: "empresa de integración erp", url: "suempresa.com › servicios", res: "Integración de ERP a medida", name: "nombre de su empresa", none: "Ningún sitio encontrado", hub: ["API", "Base", "Planilla"], cost: "costo mensual", leg: ["tokens", "infra", "monitoreo"], rag1: "El plazo de cambio es de ", rag2: "7 días corridos", rag3: " después de la entrega, con factura.", src: "fuente · politica_cambios.pdf", dash: "pedidos por semana" },
} satisfies L<unknown>;

export function BlogCover({ post }: { post: Post }) {
  const t = useT(TX);
  const kind = BY_SLUG[post.slug] ?? BY_CATEGORY[post.category.slug] ?? "chat";
  return (
    <div className="vt-bcov" aria-hidden>
      <div className="vt-ui">
        {kind === "sync" && (
          <>
            <div className="lbl">{t.sync}</div>
            {t.rows.map((r) => (
              <div key={r} className="r">
                <i className="st" />
                {r}
                <em>ok</em>
              </div>
            ))}
          </>
        )}
        {kind === "chat" && (
          <>
            <div className="bin">{t.q}</div>
            <div className="bout">{t.a}</div>
          </>
        )}
        {kind === "price" && (
          <>
            <div className="lbl">{t.price}</div>
            {t.bars.map((b, i) => (
              <div key={b} className="bar">
                {b}
                <i style={{ width: `${[80, 60, 70, 45][i]}%` }} />
              </div>
            ))}
          </>
        )}
        {(kind === "serp" || kind === "nosite") && (
          <>
            <div className="gq">
              <Ico name="search" className="!h-3 !w-3" />
              {kind === "serp" ? t.query : t.name}
            </div>
            {kind === "serp" ? (
              <>
                <div className="gurl">{t.url}</div>
                <div className="gt">{t.res}</div>
              </>
            ) : (
              <div className="none">✕ {t.none}</div>
            )}
            <div className="ln" />
            <div className="ln" style={{ width: "62%" }} />
          </>
        )}
        {kind === "hub" && (
          <div className="hub">
            <div className="opts">
              {t.hub.map((h) => (
                <span key={h}>{h}</span>
              ))}
            </div>
            <Ico name="arrow" className="text-signal" />
            <div className="erp">ERP</div>
          </div>
        )}
        {kind === "cost" && (
          <>
            <div className="lbl">{t.cost}</div>
            <div className="stack3">
              <i />
              <i />
              <i />
            </div>
            <div className="leg">
              {t.leg.map((l, i) => (
                <span key={l}>
                  <b style={{ background: ["var(--signal)", "#5fa8ff", "#a9d4ff"][i] }} />
                  {l}
                </span>
              ))}
            </div>
          </>
        )}
        {kind === "rag" && (
          <>
            <div>
              {t.rag1}
              <mark>{t.rag2}</mark>
              {t.rag3}
            </div>
            <span className="cite">{t.src}</span>
          </>
        )}
        {kind === "dash" && (
          <>
            <div className="lbl">{t.dash}</div>
            <div className="vt-bars" style={{ height: "4.5rem", border: 0 }}>
              {[42, 58, 50, 72, 64, 88].map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
