/**
 * Configuração central do site.
 * Qualquer string pública do site bate aqui — trocar em um só lugar.
 */

export const siteConfig = {
  name: "Juliana Maia — Nutri APLV",
  shortName: "Juliana Maia Nutri APLV",
  tagline: "Nutricionista por escolha, mãe de alérgico alimentar pelo destino.",
  description:
    "Referência em alergia à proteína do leite de vaca (APLV) infantil. Conteúdo clínico acolhedor, acompanhamento nutricional e orientação para mães em jornada APLV.",

  // Domínio público — fallback para build sem env; em prod vem de NEXT_PUBLIC_SITE_URL
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://julianamaianutriaplv.com",
  ogImage: "/og-default.png",

  // Credenciais públicas (extraídas do site atual da Juliana)
  professional: {
    fullName: "Juliana Fernandes Maia",
    crn: "CRN-9 22006",
    crnState: "MG",
    cnpj: "33.572.240/0001-10",
    experienceYears: "mais de 10",
    specialty: "Alergia Alimentar — APLV",
  },

  contact: {
    // Atendimento 100% pela equipe de suporte
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5531999191083",
    whatsappSupport:
      process.env.NEXT_PUBLIC_WHATSAPP_SUPPORT ?? "5531999191083",
    // Domínio .com (novo); Google Workspace entrega o e-mail
    email: "contato@julianamaianutriaplv.com",
  },

  social: {
    instagram: "https://www.instagram.com/julianamaianutriaplv/",
    youtube: "https://www.youtube.com/@JulianaMaiaNutriAplv",
    facebook: "https://www.facebook.com/julianamaianutriaplv/",
    tiktok: "https://www.tiktok.com/@julianamaianutriaplv",
  },

  booking: {
    url: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
    fallbackWhatsAppMessage:
      "Olá! Gostaria de mais informações sobre as consultas com a Juliana.",
  },

  // SEO / Analytics
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Link de WhatsApp formatado com mensagem pré-preenchida.
 */
export function whatsappLink(
  number: string = siteConfig.contact.whatsapp,
  message: string = siteConfig.booking.fallbackWhatsAppMessage,
): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

/**
 * URL absoluta a partir de path relativo.
 */
export function absoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
