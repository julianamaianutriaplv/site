import Link from "next/link";
import {
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Youtube,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, whatsappLink } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contato",
  description:
    "Fale com Juliana Maia e equipe pelo WhatsApp, Instagram ou e-mail. Agendamento de consultas e dúvidas.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <>
      <Section
        eyebrow="Contato"
        title="Vamos conversar"
        description="A forma mais rápida de falar com a Juliana e a equipe é pelo WhatsApp. Também estamos nas redes sociais."
      />

      <section className="container pb-20">
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl">
          <ContactCard
            icon={<MessageCircle className="h-6 w-6" />}
            title="WhatsApp — Equipe de suporte"
            description="Agendamento, valores e dúvidas operacionais. Respondemos em dias úteis."
            action={
              <Button asChild>
                <a
                  href={whatsappLink(
                    siteConfig.contact.whatsappSupport,
                    "Olá! Gostaria de saber mais sobre as consultas e valores.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir conversa no WhatsApp
                </a>
              </Button>
            }
          />

          <ContactCard
            icon={<Instagram className="h-6 w-6" />}
            title="Instagram"
            description="Conteúdo diário, stories e lives. 250k+ seguidores e uma comunidade ativa de mães APLV."
            action={
              <Button asChild variant="outline">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @julianamaianutriaplv
                </a>
              </Button>
            }
          />

          <ContactCard
            icon={<Youtube className="h-6 w-6" />}
            title="YouTube"
            description="Lives e vídeos educativos sobre APLV, alimentação infantil e rotina de famílias alérgicas."
            action={
              <Button asChild variant="outline">
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir canal
                </a>
              </Button>
            }
          />

          <ContactCard
            icon={<Facebook className="h-6 w-6" />}
            title="Facebook"
            description="Comunidade e conteúdos semanais."
            action={
              <Button asChild variant="outline">
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir página
                </a>
              </Button>
            }
          />
        </div>

        <div className="mt-12 rounded-2xl bg-muted/40 border border-border p-8 max-w-3xl">
          <h2 className="font-serif text-2xl text-primary mb-3">
            Aviso aos cuidadores
          </h2>
          <p className="text-foreground/80 text-sm leading-relaxed">
            Nosso canal de atendimento não é um pronto-socorro. Em caso de
            reação aguda — inchaço, dificuldade respiratória, vômitos
            repetidos, moleza — procure atendimento médico de urgência
            imediatamente. Mensagens por WhatsApp têm tempo de resposta em
            horário comercial e não substituem avaliação presencial de
            emergência.
          </p>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-card border border-border p-7 flex flex-col">
      <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-serif text-xl mb-2">{title}</h3>
      <p className="text-foreground/75 text-sm flex-1 mb-5">{description}</p>
      <div>{action}</div>
    </div>
  );
}
