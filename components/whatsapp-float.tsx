import { MessageCircle } from "lucide-react";

import { siteConfig, whatsappLink } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(
        siteConfig.contact.whatsappSupport,
        "Olá! Gostaria de falar com a equipe da Juliana sobre consultas e valores.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-[#25D366] text-white px-4 h-12 shadow-lg hover:shadow-xl transition-all hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline text-sm font-medium">
        Fale com a equipe
      </span>
    </a>
  );
}
