import { Link } from "@tanstack/react-router";
import { POSTS } from "@/lib/blog";
import { SectionHead } from "@/components/site/SectionHead";
import { PostCard } from "@/components/site/PostCard";

export function BlogPreview() {
  if (POSTS.length === 0) return null;
  return (
    <section id="blog" className="section">
      <div className="shell">
        <SectionHead title="Notas técnicas">
          Guias práticos sobre IA aplicada, integração e arquitetura para quem decide tecnologia.
        </SectionHead>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.slice(0, 3).map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
        <Link to="/blog" className="mt-6 inline-flex min-h-11 items-center font-mono text-[13px] text-signal hover:underline">
          ver todas as publicações →
        </Link>
      </div>
    </section>
  );
}
