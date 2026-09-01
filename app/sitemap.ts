import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");

  const staticRoutes = [
    { path: "/", priority: 1.0, freq: "weekly" as const },
    { path: "/sobre", priority: 0.8, freq: "monthly" as const },
    { path: "/aplv", priority: 0.9, freq: "monthly" as const },
    { path: "/consultas", priority: 0.8, freq: "monthly" as const },
    { path: "/perguntas-frequentes", priority: 0.9, freq: "monthly" as const },
    { path: "/blog", priority: 0.9, freq: "weekly" as const },
    { path: "/materiais", priority: 0.6, freq: "monthly" as const },
    { path: "/contato", priority: 0.6, freq: "yearly" as const },
    { path: "/privacidade", priority: 0.3, freq: "yearly" as const },
    { path: "/termos", priority: 0.3, freq: "yearly" as const },
  ];

  const posts = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.updatedAt ?? p.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    // Sem lastModified nas páginas institucionais: o campo é opcional, e
    // carimbar a data do build em página que não mudou ensina o Google a
    // ignorar o sinal justamente onde ele importa — nos artigos.
    ...staticRoutes.map((r) => ({
      url: `${base}${r.path}`,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...posts,
  ];
}
