import { Link } from "@tanstack/react-router";
import { getPosts } from "@/lib/blog";
import { useLocale, useT } from "@/lib/i18n";
import { SectionHead } from "@/components/site/SectionHead";
import { PostCard } from "@/components/site/PostCard";
import { RailHint } from "@/components/site/RailHint";

const TEXT = {
  pt: {
    title: "Notas técnicas",
    detail: "Guias práticos sobre IA aplicada, integração e arquitetura para quem decide tecnologia.",
    label: "Artigos recentes",
    all: "ver todas as publicações →",
  },
  en: {
    title: "Technical notes",
    detail: "Practical guides on applied AI, integration and architecture for people who make technology decisions.",
    label: "Recent articles",
    all: "see all articles →",
  },
  es: {
    title: "Notas técnicas",
    detail: "Guías prácticas sobre IA aplicada, integración y arquitectura para quienes deciden sobre tecnología.",
    label: "Artículos recientes",
    all: "ver todas las publicaciones →",
  },
};

export function BlogPreview() {
  const t = useT(TEXT);
  const posts = getPosts(useLocale());
  if (posts.length === 0) return null;
  return (
    <section id="blog" className="section">
      <div className="shell">
        <SectionHead title={t.title} detailClassName="hide-phone">
          {t.detail}
        </SectionHead>
        <div tabIndex={0} aria-label={t.label} className="rail grid gap-5 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
        <RailHint />
        <Link
          to="/blog"
          className="mt-[clamp(0.5rem,2vh,1.5rem)] inline-flex min-h-11 items-center font-mono text-[0.8125rem] text-signal hover:underline"
        >
          {t.all}
        </Link>
      </div>
    </section>
  );
}
