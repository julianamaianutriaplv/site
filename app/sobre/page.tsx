import Link from "next/link";
import {
  BadgeCheck,
  BookOpen,
  HeartHandshake,
  Sprout,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProfilePhoto } from "@/components/profile-photo";
import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, whatsappLink } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Sobre a Dra. Juliana Maia",
  description:
    "Sou a Dra. Juliana Maia, nutricionista há 20 anos. Descobri a APLV do meu filho aos 12 dias de vida — e foi assim que virei especialista.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <>
      <Section
        titleAs="h1"
        eyebrow="Quem sou"
        title="Dra. Juliana Maia"
        description={siteConfig.tagline}
      >
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] items-start">
          <div className="space-y-5 text-lg leading-relaxed text-foreground/85">
            <div className="md:hidden mb-6">
              <ProfilePhoto
                src={process.env.NEXT_PUBLIC_PROFILE_IMAGE}
                shape="portrait"
              />
            </div>
            <p>
              Olá! Sou a Juliana Maia, nutricionista clínica expert em alergia
              alimentar ({siteConfig.professional.crn}). Eu quero te contar
              sobre o meu maior e mais desafiador papel: ser mãe de um
              menininho muito esperado e muito esperto, que no dia 17 de maio de
              2016, aos 12 dias de nascido, me deu o maior susto da vida.
            </p>
            <p>
              Eu estava ali exausta, há quase duas semanas praticamente sem
              dormir, ainda de pijama, um tanto descabelada, amamentando o João
              Artur — e foi quando ele fez uma força e disparou a chorar.
              Terminamos a mamada, fui fazer a troca e, ao abrir a fraldinha
              dele, tinha muito, mas muito sangue. Minha perna bambeou. Eu quase
              caí e só tive forças para gritar pelo meu marido. Fiquei
              desesperada, achando que ele estava morrendo.
            </p>
            <p>
              Liguei para a pediatra aos prantos. Ela, por coincidência do
              destino, era também gastropediatra. Escutou a nossa história,
              olhou as fotos das fraldas, olhou para mim e disse: “Você já sabe,
              né?”. Acho que ela disse isso por eu ser nutricionista. Mas eu
              juro que não sabia de nada — eu só queria que o meu filho não
              morresse. Aí ela completou: “Ele tem APLV. Agora você tem que
              tirar leite e derivados da sua alimentação.” Abriu uma gaveta, me
              entregou uma folha com vários nomes e falou que eu tinha que ler
              todos os rótulos. E foi isso. Fim da consulta.
            </p>
            <p>
              Eu limpei as lágrimas e pensei: “Calma, Juliana, é só tirar o
              leite e ele vai ficar bem.” Só que não. As semanas foram passando,
              ele melhorava um pouco e voltava a piorar — e a culpa vinha com
              tudo. “Que fracasso de mãe eu sou, que não consigo fazer o meu
              filho ficar bem.” Ele chorava, eu chorava junto, e aquele começo
              de maternidade que na minha cabeça era para ser tão lindo estava
              um caos.
            </p>
            <p>
              Eu procurei diversos especialistas — foram mais de oito. E ouvi
              deles que eu já tinha tirado o leite, que tem bebê que fica com
              sintoma mesmo, que com o tempo ia passar. Enquanto isso, o que
              vinha era remédio e mais remédio para aliviar o que a alergia
              causava nele. O atendente da farmácia já me conhecia pelo nome. E
              o João seguia em reação: dor, chiado, infecção respiratória, muco
              e sangue nas fezes. Eu restringia ainda mais a minha dieta, e nem
              sei quantas vezes fiquei com fome por medo de comer alguma coisa
              que fizesse o meu filho piorar.
            </p>
            <p>
              Como se não bastasse, ainda vinham os olhares e os comentários de
              parentes me chamando de louca, de exagerada, dizendo que não
              existia isso de alergia a leite. E a pressão para eu parar de
              amamentar e entrar logo com a fórmula — recebi essa recomendação
              até de profissionais de saúde, que sequer tentaram investigar o
              que eu estava fazendo de errado.
            </p>
            <p>
              Mas desistir não era uma opção. Se nenhuma orientação que eu
              recebi foi suficiente, eu mesma tive que correr atrás. Nas
              madrugadas, mesmo exausta, eu estudava — e quando ele acordava,
              eu amamentava com um braço e com o outro continuava ali, no
              computador, nos livros, nas anotações. Mesmo com mais de dez anos
              de formada, eu demorei. Levei meses estudando até entender o que
              precisava fazer para estabilizar o meu filho.
            </p>
            <p>
              E aconteceu. A nossa vida virou da água para o vinho. O João
              parou de reagir, parou de ter dor, e quando tinha acabado de
              completar um ano e dois meses já não reagia mais ao leite. Hoje
              ele come de tudo.
            </p>
            <p>
              Contei o nosso caminho em grupos de mães de que eu participava, e
              elas começaram a me procurar. Comecei a orientar o mesmo passo a
              passo, claro e simples, e vi que funcionava para os filhos delas
              também — não importava o sintoma, a idade da criança ou se a mãe
              amamentava. Uma foi indicando para a outra, e não demorou para o
              meu telefone ser bombardeado de pedidos de consulta, de mães do
              Brasil inteiro e até do exterior. Eu era concursada, trabalhava o
              dia inteiro. Saí do meu emprego para me dedicar a isso.
            </p>
            <p>
              Essa é a minha missão: acabar com os sintomas que a alergia
              alimentar causa nas crianças, com um caminho claro para a mãe
              seguir. Eu sei exatamente onde você está — porque eu estive aí.
            </p>
          </div>

          <div>
            <div className="hidden md:block mb-8">
              <ProfilePhoto
                src={process.env.NEXT_PUBLIC_PROFILE_IMAGE}
                shape="portrait"
              />
            </div>
            <div className="rounded-2xl bg-card border border-border p-8">
            <h2 className="font-serif text-xl text-primary mb-5">
              Credenciais
            </h2>
            <ul className="space-y-4 text-foreground/85">
              <Cred
                label="Nome completo"
                value={siteConfig.professional.fullName}
              />
              <Cred
                label="Registro profissional"
                value={`${siteConfig.professional.crn} · ${siteConfig.professional.crnState}`}
              />
              <Cred
                label="Experiência"
                value={`${siteConfig.professional.experienceYears} anos em nutrição clínica`}
              />
              <Cred
                label="Especialização"
                value={`${siteConfig.professional.specialty} (${siteConfig.professional.specialtyYears} anos)`}
              />
              <Cred
                label="Pós-graduação"
                value="Nutrição clínica (pós-graduação lato sensu)"
              />
              <Cred
                label="CNPJ"
                value={siteConfig.professional.cnpj}
              />
            </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Método"
        title="Como funciona"
        description="Um plano para cada criança, sem receita de bolo. O método combina quatro pilares que se reforçam."
        className="bg-muted/30"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <PillarBox
            icon={<BadgeCheck className="h-6 w-6" />}
            title="Avaliação clínica precisa"
            description="Levantamento detalhado da história, sintomas, exames (quando pertinentes), tipo provável de APLV (IgE, não-IgE, mista) e comorbidades."
          />
          <PillarBox
            icon={<Sprout className="h-6 w-6" />}
            title="Plano nutricional individualizado"
            description="Dieta de exclusão para criança e mãe (se amamenta), escolha de fórmula se aplicável, suplementação orientada, adequação nutricional completa."
          />
          <PillarBox
            icon={<BookOpen className="h-6 w-6" />}
            title="Educação da família"
            description="Leitura de rótulo, prevenção de contaminação cruzada, como navegar creche, festas, viagens. Autonomia é parte do tratamento."
          />
          <PillarBox
            icon={<HeartHandshake className="h-6 w-6" />}
            title="Acompanhamento próximo"
            description="Retornos programados, suporte por WhatsApp no pacote completo, ajustes de plano conforme evolução. Reintrodução supervisionada quando for o momento."
          />
        </div>
      </Section>

      <Section
        eyebrow="Responsabilidade"
        title="O que você não vai encontrar aqui"
        description="Tão importante quanto o que a gente faz, é o que não faz. Parte do trabalho é desmontar expectativas irrealistas."
      >
        <ul className="grid gap-4 max-w-3xl text-foreground/85">
          <li className="flex gap-3">
            <span className="mt-1 text-secondary">—</span>
            <div>
              <strong>Promessa de cura.</strong> APLV não é "curada" por método nenhum; a criança desenvolve tolerância ao longo do tempo. O acompanhamento guia esse processo com segurança — não o fabrica.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 text-secondary">—</span>
            <div>
              <strong>Testes "IgG alimentos" ou "food intolerance".</strong> A ASBAI é explícita: esses testes não têm validade para APLV e não orientam exclusões alimentares.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 text-secondary">—</span>
            <div>
              <strong>Protocolos genéricos.</strong> Cada criança tem um ritmo, um tipo de APLV e uma rotina. O plano não serve se não for feito para ela.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 text-secondary">—</span>
            <div>
              <strong>Prescrição medicamentosa.</strong> Medicação é papel do médico. A nutrição cuida da parte nutricional, em parceria com o pediatra e/ou alergista.
            </div>
          </li>
        </ul>
      </Section>

      <Section>
        <div className="rounded-2xl bg-primary-soft p-8 md:p-12 max-w-3xl mx-auto text-center">
          <p className="font-serif text-2xl md:text-3xl text-primary mb-3 text-balance">
            Se você chegou até aqui, está no caminho certo.
          </p>
          <p className="text-foreground/80 mb-6 text-pretty">
            O próximo passo é conversar sobre o caso da sua criança.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar consulta
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/consultas">Ver pacotes de consulta</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function Cred({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex flex-col">
      <span className="text-xs uppercase tracking-wider text-foreground/60">
        {label}
      </span>
      <span className="text-base">{value}</span>
    </li>
  );
}

function PillarBox({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl bg-card border border-border p-7">
      <div className="h-11 w-11 rounded-xl bg-secondary-soft text-secondary flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-serif text-xl mb-2">{title}</h3>
      <p className="text-foreground/75">{description}</p>
    </div>
  );
}
