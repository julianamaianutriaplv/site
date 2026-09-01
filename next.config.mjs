/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Build estático para Cloudflare Workers Static Assets.
  // O site é 100% conteúdo — o único endpoint dinâmico (/api/lead) roda
  // como Worker, ver worker/index.ts.
  output: "export",

  images: {
    // Static export não tem o otimizador do Next em runtime.
    // As imagens já entram pré-otimizadas em public/ (AVIF/WebP + JPG fallback).
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    mdxRs: false,
  },
};

export default nextConfig;
