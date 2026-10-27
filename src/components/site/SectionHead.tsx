import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Título de seção à esquerda e texto de apoio à direita (empilha no celular).
 * O espaçamento abaixo acompanha a altura da tela para a seção caber numa tela só.
 * `detailClassName` permite esconder o texto de apoio onde a altura não comporta (ex.: "hide-phone").
 */
export function SectionHead({
  title,
  children,
  as: Tag = "h2",
  detailClassName,
}: {
  title: ReactNode;
  children?: ReactNode;
  as?: "h1" | "h2";
  detailClassName?: string;
}) {
  return (
    <div className="mb-[clamp(1.25rem,5vh,3.5rem)] grid gap-[clamp(0.75rem,2.5vh,1.5rem)] md:grid-cols-2 md:items-end md:gap-8">
      <Tag className="h-section min-w-0">{title}</Tag>
      {children && (
        <p className={cn("min-w-0 max-w-[48ch] text-muted-foreground md:justify-self-end", detailClassName)}>{children}</p>
      )}
    </div>
  );
}
