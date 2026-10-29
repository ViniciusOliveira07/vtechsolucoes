import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

// Gera, na hora do build, o módulo "virtual:blog-index" só com os METADADOS dos artigos
// (frontmatter, nº de palavras e sumário). O texto completo de cada artigo fica num arquivo
// separado, baixado apenas na página do artigo (ver loadPostBody em src/lib/blog.ts).
// Antes os 9 artigos (3 × pt/en/es) iam inteiros no JavaScript inicial de todas as páginas
// só para a home listar os títulos.

const ID = "virtual:blog-index";
const RESOLVED = "\0" + ID;

export type BlogIndexEntry = {
  slug: string;
  locale: "pt" | "en" | "es";
  data: Record<string, string | string[]>;
  words: number;
  headings: { id: string; text: string; level: 2 | 3 }[];
};

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Frontmatter simples: `chave: valor`, strings entre aspas e listas `[a, b]`. */
function parseFrontmatter(raw: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) throw new Error("Artigo sem frontmatter");
  const data: Record<string, string | string[]> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = /^(\w+):\s*(.*)$/.exec(line.trim());
    if (!m) continue;
    const value = m[2].trim();
    data[m[1]] = value.startsWith("[")
      ? value
          .slice(1, -1)
          .split(",")
          .map((v) => v.trim().replace(/^["']|["']$/g, ""))
          .filter(Boolean)
      : value.replace(/^["']|["']$/g, "");
  }
  return { data, body: match[2] };
}

/** Títulos H2/H3 para o sumário. Os ids batem com os gerados em blog-render.ts. */
function extractHeadings(body: string) {
  const used = new Set<string>();
  const out: BlogIndexEntry["headings"] = [];
  let inCode = false;
  for (const line of body.split(/\r?\n/)) {
    if (line.startsWith("```")) inCode = !inCode;
    const m = !inCode && /^(#{1,6})\s+(.+?)\s*#*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[*_`]/g, "");
    let id = slugify(text);
    while (used.has(id)) id += "-2";
    used.add(id);
    const depth = m[1].length;
    if (depth === 2 || depth === 3) out.push({ id, text, level: depth });
  }
  return out;
}

export function blogIndex(contentDir = "src/content/blog"): Plugin {
  const root = path.resolve(contentDir);
  const files = () =>
    fs.readdirSync(root, { recursive: true, withFileTypes: true })
      .filter((d) => d.isFile() && d.name.endsWith(".md"))
      .map((d) => path.join(d.parentPath, d.name));

  return {
    name: "vtech-blog-index",
    resolveId: (id) => (id === ID ? RESOLVED : undefined),
    load(id) {
      if (id !== RESOLVED) return;
      const entries: BlogIndexEntry[] = files().map((file) => {
        this.addWatchFile(file);
        const folder = path.basename(path.dirname(file));
        const locale = folder === "en" || folder === "es" ? folder : "pt";
        const { data, body } = parseFrontmatter(fs.readFileSync(file, "utf8"));
        return {
          slug: path.basename(file, ".md"),
          locale,
          data,
          words: body.split(/\s+/).filter(Boolean).length,
          headings: extractHeadings(body),
        };
      });
      return `export default ${JSON.stringify(entries)};`;
    },
    // artigo novo ou editado: recarrega o índice no servidor de desenvolvimento
    handleHotUpdate({ file, server }) {
      if (file.startsWith(root.replace(/\\/g, "/")) || file.startsWith(root)) {
        const mod = server.moduleGraph.getModuleById(RESOLVED);
        if (mod) server.moduleGraph.invalidateModule(mod);
      }
    },
  };
}
