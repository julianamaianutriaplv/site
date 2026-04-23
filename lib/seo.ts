import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./site";

interface SeoOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function buildMetadata(options: SeoOptions = {}): Metadata {
  const {
    title,
    description = siteConfig.description,
    path = "/",
    image = siteConfig.ogImage,
    type = "website",
    publishedTime,
    modifiedTime,
    keywords,
    noIndex,
  } = options;

  const fullTitle = title
    ? `${title} | ${siteConfig.shortName}`
    : `${siteConfig.shortName} — Nutricionista especialista em APLV`;

  const url = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    metadataBase: new URL(siteConfig.url),
    title: fullTitle,
    description,
    keywords: keywords?.join(", "),
    authors: [{ name: siteConfig.professional.fullName }],
    creator: siteConfig.professional.fullName,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: "pt_BR",
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.shortName,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: fullTitle }],
      ...(type === "article" && publishedTime
        ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

/**
 * Schema.org: MedicalBusiness (raiz do site)
 */
export function medicalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${siteConfig.url}/#org`,
    name: siteConfig.shortName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: `+${siteConfig.contact.whatsapp}`,
    medicalSpecialty: "Nutrition",
    founder: {
      "@type": "Person",
      name: siteConfig.professional.fullName,
      jobTitle: "Nutricionista Clínica",
      identifier: siteConfig.professional.crn,
    },
    areaServed: {
      "@type": "Country",
      name: "Brasil",
    },
    availableService: {
      "@type": "MedicalTherapy",
      name: "Acompanhamento nutricional em APLV",
    },
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.youtube,
      siteConfig.social.facebook,
      siteConfig.social.tiktok,
    ],
  };
}

/**
 * Schema.org: FAQPage
 */
export function faqPageJsonLd(
  faqs: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

/**
 * Schema.org: Article (posts do blog)
 */
export function articleJsonLd(input: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    image: input.image
      ? absoluteUrl(input.image)
      : absoluteUrl(siteConfig.ogImage),
    author: {
      "@type": "Person",
      name: siteConfig.professional.fullName,
      jobTitle: "Nutricionista Clínica",
      identifier: siteConfig.professional.crn,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.shortName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${input.slug}`),
    },
  };
}

/**
 * Schema.org: BreadcrumbList
 */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
