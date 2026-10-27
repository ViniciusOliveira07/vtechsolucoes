import { Link } from "@tanstack/react-router";
import { POSTS } from "@/lib/blog";
import { SectionHead } from "@/components/site/SectionHead";
import { PostCard } from "@/components/site/PostCard";
import { RailHint } from "@/components/site/RailHint";

export function BlogPreview() {
  if (POSTS.length === 0) return null;
  return (
    <section id="blog" className="section">
      <div className="shell">
        <SectionHead title="Notas técnicas" detailClassName="hide-phone">
          Guias práticos sobre IA aplicada, integração e arquitetura para quem decide tecnologia.
        </SectionHead>
        <div tabIndex={0} aria-label="Artigos recentes" className="rail grid gap-5 md:grid-cols-3">
          {POSTS.slice(0, 3).map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
        <RailHint />
        <Link
          to="/blog"
          className="mt-[clamp(0.5rem,2vh,1.5rem)] inline-flex min-h-11 items-center font-mono text-[0.8125rem] text-signal hover:underline"
        >
          ver todas as publicações →
        </Link>
      </div>
    </section>
  );
}
