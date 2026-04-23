import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MdxContent } from "@/components/mdx-content";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig, whatsappLink } from "@/lib/site";
import { formatDate } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    keywords: post.keywords,
    image: post.coverImage,
  });
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const jsonLd = articleJsonLd({
    title: post.title,
    description: post.description,
    slug: post.slug,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: post.coverImage,
  });

  const breadcrumb = breadcrumbJsonLd([
    { name: "Início", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <>
      <article className="py-16 md:py-20">
        <div className="container-prose">
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para o blog
            </Link>
          </div>

          <header className="mb-10">
            <div className="flex items-center gap-3 text-sm text-foreground/60 mb-4">
              <span className="uppercase tracking-wider text-secondary font-medium">
                {post.category}
              </span>
              <span>·</span>
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              <span>·</span>
              <span>{post.readingMinutes} min</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-primary text-balance">
              {post.title}
            </h1>
            <p className="mt-5 text-xl text-foreground/75 text-pretty">
              {post.description}
            </p>
          </header>

          <MdxContent source={post.content} />
        </div>
      </article>

      <section className="container max-w-3xl pb-20">
        <div className="rounded-2xl bg-primary-soft p-8 md:p-10 text-center">
          <p className="font-serif text-2xl text-primary mb-3">
            Precisa de um plano individual?
          </p>
          <p className="text-foreground/80 max-w-xl mx-auto mb-6">
            Conteúdo educativo ajuda, mas não substitui acompanhamento
            profissional. Agende uma consulta para um plano feito para a sua
            criança.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <a
                href={whatsappLink(
                  siteConfig.contact.whatsappSupport,
                  `Olá! Li o artigo "${post.title}" e gostaria de agendar uma consulta.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com a equipe
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/consultas">Ver as consultas</Link>
            </Button>
          </div>
        </div>
      </section>

      <Script
        id={`ld-article-${post.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <Script
        id={`ld-breadcrumb-${post.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb),
        }}
      />
    </>
  );
}
