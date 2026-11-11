import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/** Peças do layout novo para as páginas internas (mesma linguagem da home). */

/** O ponto ciano da marca substitui o ponto final do título (sem ficar "..") */
export const noDot = (t: ReactNode) => (typeof t === "string" ? t.replace(/\.\s*$/, "") : t);

export type Crumb = { label: string; to?: string };

export function Crumbs({ items, label }: { items: Crumb[]; label: string }) {
  return (
    <nav aria-label={label} className="vt-crumbs">
      {items.map((c, i) => (
        <span key={i}>
          {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
          {i < items.length - 1 && <i aria-hidden>/</i>}
        </span>
      ))}
    </nav>
  );
}

/** Primeira dobra das páginas internas: trilha, rótulo, título, texto, ações e (opcional) ilustração ao lado. */
export function PageHero({
  crumbs,
  crumbsLabel,
  kicker,
  title,
  sub,
  children,
  aside,
  full = false,
}: {
  crumbs?: Crumb[];
  crumbsLabel?: string;
  kicker?: string;
  title: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  /** ocupa a tela inteira (páginas de serviço); as demais ficam com a altura do conteúdo */
  full?: boolean;
}) {
  return (
    <section className={cn("vt-hero vt-page-hero", full && "vt-screen")}>
      <div className={cn("vt-wrap", aside && "vt-hero-grid")}>
        <div className="min-w-0">
          {crumbs && <Crumbs items={crumbs} label={crumbsLabel ?? "breadcrumb"} />}
          {kicker && <span className="vt-kicker">{kicker}</span>}
          <h1 className="vt-h1 vt-page-title vt-dot">{noDot(title)}</h1>
          {sub && <p className="vt-hero-sub">{sub}</p>}
          {children}
        </div>
        {aside && <div className="min-w-0">{aside}</div>}
      </div>
    </section>
  );
}

/** Cabeçalho de seção: rótulo ▸, título com o ponto da marca e texto de apoio. */
export function SecHead({
  kicker,
  title,
  children,
  as: H = "h2",
  className,
}: {
  kicker?: string;
  title: ReactNode;
  children?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("vt-head", className)}>
      {kicker && <span className="vt-kicker">{kicker}</span>}
      <H className={cn("vt-h2 vt-dot", H === "h1" && "vt-page-title")}>{noDot(title)}</H>
      {children && <p>{children}</p>}
    </div>
  );
}
