import Link from "next/link";

import { BlogCard } from "@/components/blog-card";
import { Section } from "@/components/section";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog — Conteúdo clínico sobre APLV",
  description:
    "Artigos sobre alergia à proteína do leite de vaca em linguagem clara, com base em diretrizes oficiais. Diagnóstico, alimentação, escada do leite, fórmulas e mais.",
  path: "/blog",
  keywords: ["APLV", "blog APLV", "alergia proteína leite", "nutrição infantil"],
});

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <Section
        eyebrow="Blog"
        title="Conteúdo clínico, em linguagem clara"
        description="Artigos baseados em diretrizes oficiais (ASBAI/SBP/Consenso Brasileiro). Zero mimimi, zero promessa de cura — só informação útil para quem vive a APLV."
        className="pb-0 md:pb-0"
      />

      {featured ? (
        <section className="container">
          <Link
            href={`/blog/${featured.slug}`}
            className="group block rounded-2xl border border-border bg-card p-8 md:p-12 hover:border-primary/40 hover:shadow-card transition-all"
          >
            <div className="flex items-center gap-3 text-xs text-foreground/60 mb-4">
              <span className="rounded-full bg-secondary-soft text-secondary px-3 py-1 font-medium">
                Em destaque
              </span>
              <span className="uppercase tracking-wider text-secondary font-medium">
                {featured.category}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-balance text-primary mb-4">
              {featured.title}
            </h2>
            <p className="text-lg text-foreground/75 max-w-3xl text-pretty">
              {featured.description}
            </p>
            <div className="mt-6 text-sm font-medium text-primary group-hover:underline">
              Ler artigo completo →
            </div>
          </Link>
        </section>
      ) : null}

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {rest.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>
    </>
  );
}
