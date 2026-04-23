import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
  coverImage?: string;
  readingMinutes: number;
  keywords: string[];
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllPosts(): BlogPostMeta[] {
  return getAllSlugs()
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      const { content: _c, ...meta } = post;
      return meta;
    })
    .filter(Boolean)
    .sort(
      (a, b) =>
        new Date((b as BlogPostMeta).publishedAt).getTime() -
        new Date((a as BlogPostMeta).publishedAt).getTime(),
    ) as BlogPostMeta[];
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const { minutes } = readingTime(content);

  return {
    slug,
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    category: String(data.category ?? "APLV"),
    author: String(data.author ?? "Juliana Maia"),
    publishedAt: String(data.publishedAt ?? new Date().toISOString()),
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    featured: Boolean(data.featured),
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    readingMinutes: Math.ceil(minutes),
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    content,
  };
}
