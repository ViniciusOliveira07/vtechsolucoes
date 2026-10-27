import { Marked, type Tokens } from "marked";
import { postBody, slugify } from "@/lib/blog";

// Renderização do markdown fica num módulo separado: só a rota do artigo o importa,
// então o parser não entra no JavaScript da home nem do índice do blog.

const cache = new Map<string, string>();

export function renderPost(slug: string) {
  const hit = cache.get(slug);
  if (hit) return hit;
  const used = new Set<string>();
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth }: Tokens.Heading) {
        const html = this.parser.parseInline(tokens);
        let id = slugify(html.replace(/<[^>]+>/g, ""));
        while (used.has(id)) id += "-2";
        used.add(id);
        // O título do artigo é o único H1 da página; "#" no markdown vira H2.
        const level = Math.max(2, depth);
        return `<h${level} id="${id}">${html}</h${level}>`;
      },
      link({ href, title, tokens }: Tokens.Link) {
        const text = this.parser.parseInline(tokens);
        const t = title ? ` title="${title}"` : "";
        return /^https?:\/\//.test(href)
          ? `<a href="${href}"${t} target="_blank" rel="noopener noreferrer">${text}</a>`
          : `<a href="${href}"${t}>${text}</a>`;
      },
    },
  });
  const html = marked.parse(postBody(slug), { async: false }) as string;
  cache.set(slug, html);
  return html;
}
