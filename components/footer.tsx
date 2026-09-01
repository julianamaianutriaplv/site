import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white/70 mt-0">
      <div className="container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <BrandMark />
            <p className="mt-4 text-sm text-white/70 max-w-md">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 text-xs text-white/45">
              {siteConfig.professional.fullName} · {siteConfig.professional.crn} ·
              Nutricionista Clínica expert em APLV
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-white/50 mb-4">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/sobre"
                  className="text-white/75 hover:text-sage"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/aplv"
                  className="text-white/75 hover:text-sage"
                >
                  O que é APLV
                </Link>
              </li>
              <li>
                <Link
                  href="/consultas"
                  className="text-white/75 hover:text-sage"
                >
                  Consultas
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-white/75 hover:text-sage"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/perguntas-frequentes"
                  className="text-white/75 hover:text-sage"
                >
                  Perguntas frequentes
                </Link>
              </li>
              <li>
                <Link
                  href="/materiais"
                  className="text-white/75 hover:text-sage"
                >
                  Materiais
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-white/50 mb-4">
              Contato
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/contato"
                  className="text-white/75 hover:text-sage"
                >
                  Página de contato
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                  className="text-white/75 hover:text-sage"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center text-white/75 hover:border-sage hover:text-sage"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center text-white/75 hover:border-sage hover:text-sage"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center text-white/75 hover:border-sage hover:text-sage"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/12 flex flex-col md:flex-row gap-4 justify-between text-xs text-white/45">
          <div>
            © {year} {siteConfig.professional.fullName}. Todos os direitos
            reservados.
          </div>
          <div className="flex gap-4">
            <Link href="/privacidade" className="hover:text-sage">
              Política de privacidade
            </Link>
            <Link href="/termos" className="hover:text-sage">
              Termos de uso
            </Link>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-white/[.06] p-4 text-xs leading-relaxed text-white/60">
          <strong className="text-foreground/85">Aviso importante:</strong>{" "}
          Todo o conteúdo deste site é educativo e informativo e não substitui
          consulta individualizada com profissional de saúde habilitado. Nenhuma
          informação aqui presente deve ser interpretada como diagnóstico,
          tratamento ou prescrição. Em caso de sintomas ou dúvidas sobre APLV,
          procure um nutricionista ou médico. Em concordância com o Código de
          Ética da categoria ({siteConfig.professional.crn}), não prometemos
          cura ou resultados específicos.
        </div>
      </div>
    </footer>
  );
}
