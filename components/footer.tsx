import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30 mt-16">
      <div className="container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <BrandMark />
            <p className="mt-4 text-sm text-foreground/70 max-w-md">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 text-xs text-foreground/60">
              {siteConfig.professional.fullName} · {siteConfig.professional.crn} ·
              Nutricionista Clínica especialista em APLV
            </p>
          </div>

          <div>
            <h3 className="font-serif text-base text-foreground mb-3">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/sobre"
                  className="text-foreground/70 hover:text-primary"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/aplv"
                  className="text-foreground/70 hover:text-primary"
                >
                  O que é APLV
                </Link>
              </li>
              <li>
                <Link
                  href="/consultas"
                  className="text-foreground/70 hover:text-primary"
                >
                  Consultas
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-foreground/70 hover:text-primary"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/perguntas-frequentes"
                  className="text-foreground/70 hover:text-primary"
                >
                  Perguntas frequentes
                </Link>
              </li>
              <li>
                <Link
                  href="/materiais"
                  className="text-foreground/70 hover:text-primary"
                >
                  Materiais gratuitos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-base text-foreground mb-3">
              Contato
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/contato"
                  className="text-foreground/70 hover:text-primary"
                >
                  Página de contato
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                  className="text-foreground/70 hover:text-primary"
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
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row gap-4 justify-between text-xs text-foreground/60">
          <div>
            © {year} {siteConfig.professional.fullName}. Todos os direitos
            reservados.
          </div>
          <div className="flex gap-4">
            <Link href="/privacidade" className="hover:text-primary">
              Política de privacidade
            </Link>
            <Link href="/termos" className="hover:text-primary">
              Termos de uso
            </Link>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-muted/60 p-4 text-xs leading-relaxed text-foreground/70">
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
