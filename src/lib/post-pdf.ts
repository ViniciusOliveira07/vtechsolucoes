import { jsPDF } from "jspdf";
import { Lexer, type Token, type Tokens } from "marked";
import { formatDate, postBody, type Post } from "@/lib/blog";
import { absoluteUrl, COMPANY } from "@/lib/site";

// Gera o PDF de um artigo no navegador, a partir do mesmo markdown da página.
// Carregado sob demanda (import dinâmico) só quando alguém pede o download.

const PAGE = { w: 595.28, h: 841.89 }; // A4 em pontos
const M = { x: 56, top: 64, bottom: 64 };
const WIDTH = PAGE.w - M.x * 2;
const INK = "#0a0d11";
const MUTED = "#4a5563";
const FAINT = "#8a94a3";
const ACCENT = "#0b78a8"; // ciano escurecido: o ciano da tela some no papel branco
const RULE = "#dde2e8";

// As fontes padrão do PDF cobrem Latin-1 (acentos ok); estes símbolos não existem nelas.
const clean = (s: string) =>
  s
    .replace(/→/g, "->")
    .replace(/≈/g, "~")
    .replace(/≤/g, "<=")
    .replace(/≥/g, ">=")
    .replace(/[●▸]/g, "-")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

type Seg = { text: string; bold?: boolean; mono?: boolean };

function segments(tokens: Token[] | undefined, bold = false): Seg[] {
  if (!tokens) return [];
  return tokens.flatMap((t): Seg[] => {
    switch (t.type) {
      case "strong":
        return segments((t as Tokens.Strong).tokens, true);
      case "em":
      case "del":
      case "link":
        return segments((t as Tokens.Em).tokens, bold);
      case "codespan":
        return [{ text: clean((t as Tokens.Codespan).text), mono: true, bold }];
      case "br":
        return [{ text: " " }];
      default: {
        const tt = t as Tokens.Text;
        if (tt.tokens) return segments(tt.tokens, bold);
        return [{ text: clean(tt.text ?? tt.raw ?? ""), bold }];
      }
    }
  });
}

export function buildPostPdf(post: Post) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  let y = M.top;

  const font = (s: Seg, size: number) => {
    doc.setFont(s.mono ? "courier" : "helvetica", s.bold ? "bold" : "normal");
    doc.setFontSize(s.mono ? size - 1 : size);
  };
  const ensure = (h: number) => {
    if (y + h > PAGE.h - M.bottom) {
      doc.addPage();
      y = M.top;
    }
  };

  /** Texto corrido com trechos em negrito, quebrando por largura. */
  const rich = (segs: Seg[], opts: { size?: number; color?: string; indent?: number; lead?: number } = {}) => {
    const size = opts.size ?? 10.5;
    const lead = opts.lead ?? size * 1.55;
    const x0 = M.x + (opts.indent ?? 0);
    const max = WIDTH - (opts.indent ?? 0);
    const words: Seg[] = [];
    for (const s of segs) for (const w of s.text.split(/(\s+)/)) if (w) words.push({ ...s, text: w });
    let line: Seg[] = [];
    let lineW = 0;
    const flush = () => {
      ensure(lead);
      let x = x0;
      while (line.length && /^\s+$/.test(line[line.length - 1].text)) line.pop();
      for (const w of line) {
        font(w, size);
        doc.setTextColor(opts.color ?? MUTED);
        doc.text(w.text, x, y);
        x += doc.getTextWidth(w.text);
      }
      y += lead;
      line = [];
      lineW = 0;
    };
    for (const w of words) {
      font(w, size);
      const ww = doc.getTextWidth(w.text);
      if (/^\s+$/.test(w.text) && line.length === 0) continue;
      if (lineW + ww > max && line.length) flush();
      if (/^\s+$/.test(w.text) && line.length === 0) continue;
      line.push(w);
      lineW += ww;
    }
    if (line.length) flush();
  };

  // ── Cabeçalho da primeira página ──
  doc.setFillColor(INK);
  doc.rect(0, 0, PAGE.w, 36, "F");
  doc.setFont("courier", "bold");
  doc.setFontSize(11);
  // PDF não tem degradê em texto: "vtech" no branco e "soluções" no azul da marca, sem separador
  doc.setTextColor("#e8eef3");
  doc.text("vtech", M.x, 23);
  doc.setTextColor("#7fd4ff");
  doc.text("soluções", M.x + doc.getTextWidth("vtech"), 23);
  doc.setFont("courier", "normal");
  doc.setTextColor("#7fd4ff");
  doc.text(post.category.name.toUpperCase(), PAGE.w - M.x, 23, { align: "right" });

  y = 92;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(INK);
  for (const l of doc.splitTextToSize(clean(post.title), WIDTH)) {
    doc.text(l, M.x, y);
    y += 30;
  }
  y += 2;
  rich([{ text: clean(post.description) }], { size: 12, color: MUTED });
  y += 4;
  doc.setFont("courier", "normal");
  doc.setFontSize(9);
  doc.setTextColor(FAINT);
  doc.text(`${post.author}  ·  ${formatDate(post.publishedAt)}  ·  ${post.readingMinutes} min de leitura`, M.x, y);
  y += 16;
  doc.setDrawColor(RULE);
  doc.line(M.x, y, PAGE.w - M.x, y);
  y += 26;

  // ── Corpo ──
  const tokens = new Lexer().lex(postBody(post.slug));
  for (const t of tokens) {
    switch (t.type) {
      case "heading": {
        const h = t as Tokens.Heading;
        const size = h.depth <= 2 ? 16 : 13;
        y += h.depth <= 2 ? 14 : 8;
        ensure(size * 2.6);
        rich(segments(h.tokens, true), { size, color: INK, lead: size * 1.3 });
        y += 4;
        break;
      }
      case "paragraph":
        rich(segments((t as Tokens.Paragraph).tokens));
        y += 8;
        break;
      case "list": {
        const list = t as Tokens.List;
        list.items.forEach((item, i) => {
          const marker = list.ordered ? `${Number(list.start || 1) + i}.` : "-";
          ensure(18);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10.5);
          doc.setTextColor(ACCENT);
          doc.text(marker, M.x + 4, y);
          const inner = item.tokens.flatMap((it) =>
            it.type === "text" || it.type === "paragraph" ? segments((it as Tokens.Text).tokens ?? [it]) : [],
          );
          rich(inner, { indent: 22 });
          y += 3;
        });
        y += 6;
        break;
      }
      case "code": {
        const lines = doc.setFont("courier", "normal").setFontSize(9).splitTextToSize(clean((t as Tokens.Code).text), WIDTH - 24) as string[];
        const h = lines.length * 13 + 18;
        ensure(h);
        doc.setFillColor("#f2f4f7");
        doc.roundedRect(M.x, y - 12, WIDTH, h, 4, 4, "F");
        doc.setTextColor(INK);
        lines.forEach((l, i) => doc.text(l, M.x + 12, y + 4 + i * 13));
        y += h + 6;
        break;
      }
      case "table": {
        const tb = t as Tokens.Table;
        const cols = tb.header.length;
        const cw = WIDTH / cols;
        const row = (cells: Tokens.TableCell[], bold: boolean) => {
          doc.setFont("helvetica", bold ? "bold" : "normal");
          doc.setFontSize(bold ? 8.5 : 10);
          const wrapped = cells.map(
            (c) => doc.splitTextToSize(segments(c.tokens).map((s) => s.text).join(""), cw - 10) as string[],
          );
          const h = Math.max(...wrapped.map((w) => w.length)) * 13 + 10;
          ensure(h);
          doc.setTextColor(bold ? FAINT : INK);
          wrapped.forEach((w, i) => w.forEach((l, j) => doc.text(bold ? l.toUpperCase() : l, M.x + i * cw, y + j * 13)));
          y += h - 4;
          doc.setDrawColor(RULE);
          doc.line(M.x, y - 8, PAGE.w - M.x, y - 8);
          y += 4;
        };
        row(tb.header, true);
        tb.rows.forEach((r) => row(r, false));
        y += 8;
        break;
      }
      case "blockquote":
        rich(segments((t as Tokens.Blockquote).tokens.flatMap((x) => (x as Tokens.Paragraph).tokens ?? [])), {
          indent: 14,
          color: INK,
        });
        y += 8;
        break;
      case "hr":
        ensure(20);
        doc.setDrawColor(RULE);
        doc.line(M.x, y, PAGE.w - M.x, y);
        y += 20;
        break;
    }
  }

  // ── Fechamento com contato ──
  ensure(96);
  y += 10;
  doc.setFillColor(INK);
  doc.roundedRect(M.x, y, WIDTH, 78, 6, 6, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor("#e8eef3");
  doc.text("Quer aplicar isso na sua operação?", M.x + 20, y + 30);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor("#a3afbc");
  doc.text(
    `Fale com a Vtech pelo WhatsApp ${COMPANY.phoneDisplay}. Proposta com escopo, prazo e investimento em até 24h úteis.`,
    M.x + 20,
    y + 50,
    { maxWidth: WIDTH - 40 },
  );

  // ── Rodapé em todas as páginas ──
  const url = absoluteUrl(`/blog/${post.slug}`).replace(/^https:\/\//, "");
  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    doc.setFont("courier", "normal");
    doc.setFontSize(8);
    doc.setTextColor(FAINT);
    doc.text(url, M.x, PAGE.h - 32);
    doc.text(`${i} / ${total}`, PAGE.w - M.x, PAGE.h - 32, { align: "right" });
  }

  doc.setProperties({ title: post.title, subject: post.description, author: "Vtech Soluções", creator: "vtechsolucoes.ia.br" });
  return doc;
}

export function downloadPostPdf(post: Post) {
  buildPostPdf(post).save(`vtech-${post.slug}.pdf`);
}
