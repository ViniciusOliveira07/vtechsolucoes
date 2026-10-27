import type { ReactNode } from "react";

/** Título de seção à esquerda e texto de apoio à direita (empilha no mobile). */
export function SectionHead({ title, children, as: Tag = "h2" }: { title: ReactNode; children?: ReactNode; as?: "h1" | "h2" }) {
  return (
    <div className="mb-14 grid gap-6 md:grid-cols-2 md:items-end md:gap-8">
      <Tag className="h-section min-w-0">{title}</Tag>
      {children && <p className="min-w-0 max-w-[48ch] text-muted-foreground md:justify-self-end">{children}</p>}
    </div>
  );
}
