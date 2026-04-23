import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { BlogPostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <article className="group relative flex flex-col p-6 md:p-8 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-card transition-all">
      <div className="flex items-center gap-3 text-xs text-foreground/60 mb-3">
        <span className="font-medium uppercase tracking-wider text-secondary">
          {post.category}
        </span>
        <span>·</span>
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <span>·</span>
        <span>{post.readingMinutes} min de leitura</span>
      </div>

      <h3 className="font-serif text-2xl md:text-[1.75rem] leading-tight text-balance mb-3 group-hover:text-primary transition-colors">
        <Link
          href={`/blog/${post.slug}`}
          className="after:absolute after:inset-0"
        >
          {post.title}
        </Link>
      </h3>

      <p className="text-foreground/75 text-pretty line-clamp-3">
        {post.description}
      </p>

      <div className="mt-5 flex items-center gap-2 text-sm font-medium text-primary">
        Ler artigo
        <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </article>
  );
}
