import type { ReactNode } from "react";
import { SecHead } from "@/components/site/vt/Page";

/** Título de seção no layout novo (rótulo opcional, título com o ponto da marca e texto de apoio). */
export function SectionHead({
  title,
  children,
  as = "h2",
  kicker,
}: {
  title: ReactNode;
  children?: ReactNode;
  as?: "h1" | "h2";
  kicker?: string;
  /** mantido por compatibilidade; o texto de apoio aparece em todas as telas */
  detailClassName?: string;
}) {
  return (
    <SecHead as={as} title={title} kicker={kicker}>
      {children}
    </SecHead>
  );
}
