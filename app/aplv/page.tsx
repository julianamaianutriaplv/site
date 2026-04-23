import Link from "next/link";
import { AlertTriangle, Baby, BookOpen, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

export const metadata = buildMetadata({
  title: "O que é APLV — Guia educacional completo",
  description:
    "Entenda APLV: o que é, tipos (IgE, não-IgE, mista), sintomas, diagnóstico e mitos. Baseado no Consenso Brasileiro ASBAI/SBP.",
  path: "/aplv",
  keywords: [
    "o que é APLV",
    "alergia proteína leite vaca",
    "tipos de APLV",
    "sintomas APLV",
    "IgE mediada não mediada",
  ],
});

export default function AplvPage() {
  return (
    <>
      <Section
        eyebrow="Página educacional"
        title="O que é APLV"
        description="Um guia objetivo sobre alergia à proteína do leite de vaca: o que acontece no corpo da criança, os tipos, sintomas, como é diagnosticada e os principais mitos."
      />

      <section className="container-prose pb-16">
        <div className="prose-custom">
          <p>
            APLV é a sigla para <strong>alergia à proteína do leite de vaca</strong>.
            É uma reação do sistema imunológico à proteína do leite — diferente
            (e muitas vezes confundida com) intolerância à lactose. Enquanto a
            intolerância é um problema digestivo, a APLV é uma resposta de
            defesa do corpo.
          </p>
          <p>
            Afeta cerca de <strong>2 a 3% das crianças menores de 3 anos</strong>,
            segundo o Consenso Brasileiro sobre Alergia Alimentar (ASBAI/SBP). A
            boa notícia: a maior parte das crianças desenvolve tolerância
            natural até os 3 anos de idade.
          </p>

          <h2>Os três tipos de APLV</h2>
          <p>
            A classificação por mecanismo imunológico guia tudo: diagnóstico,
            tratamento e reintrodução. Conhecer o tipo é essencial.
          </p>

          <h3>APLV IgE mediada</h3>
          <p>
            O sistema imune produz anticorpos IgE contra a proteína do leite.
            Reações são <strong>rápidas</strong> — entre minutos e 2 horas após
            contato. Sintomas típicos: urticária, inchaço (lábios, pálpebras,
            rosto), coriza, tosse, vômito imediato. Em casos graves pode
            ocorrer <strong>anafilaxia</strong>, com risco de vida.
          </p>

          <h3>APLV não-IgE mediada</h3>
          <p>
            O mecanismo é celular, não produz IgE. Reações são{" "}
            <strong>tardias</strong> — aparecem horas a dias após o consumo.
            Predominam sintomas gastrointestinais: sangue ou muco nas fezes,
            cólicas intensas, refluxo persistente, diarreia ou constipação
            crônica, vômitos recorrentes. Entram aqui quadros como FPIAP
            (proctocolite alérgica) e FPIES.
          </p>

          <h3>APLV mista</h3>
          <p>
            Combina características das duas. Por exemplo, eczema importante
            (componente IgE) com sintomas digestivos crônicos (componente
            não-IgE).
          </p>

          <h2>Sinais para ficar atenta</h2>
          <p>
            Nenhum sintoma isolado fecha diagnóstico. Mas alguns sinais,
            especialmente em combinação, devem acender o alerta:
          </p>
          <ul>
            <li>Sangue ou muco visível nas fezes</li>
            <li>Cólicas intensas, choro de horas</li>
            <li>Refluxo que não cede com medidas comuns</li>
            <li>Vômitos recorrentes</li>
            <li>Diarreia crônica ou constipação persistente</li>
            <li>Dermatite atópica extensa ou urticária recorrente</li>
            <li>Inchaço em lábios, pálpebras ou rosto após mamar</li>
            <li>Baixo ganho de peso</li>
            <li>Tosse ou chiado sem causa clara</li>
          </ul>

          <h2>Como é feito o diagnóstico</h2>
          <p>
            O diagnóstico é clínico e combina diferentes informações:
          </p>
          <ul>
            <li><strong>História detalhada</strong>: sintomas, frequência, relação com alimentação</li>
            <li><strong>Diário alimentar</strong>: registro de 7 a 14 dias</li>
            <li><strong>Exame físico</strong>: crescimento, sinais de atopia, fezes</li>
            <li><strong>Exames complementares</strong> (em suspeita IgE): IgE específico, prick test</li>
            <li><strong>Dieta de exclusão</strong>: retirada da proteína por 2 a 4 semanas</li>
            <li><strong>Reintrodução supervisionada</strong>: teste de provocação oral (TPO), padrão-ouro</li>
          </ul>
          <p>
            O teste de "IgG para alimentos" vendido em alguns laboratórios{" "}
            <strong>não é válido</strong> para diagnosticar APLV — posicionamento
            explícito da ASBAI. Não orienta exclusões alimentares.
          </p>

          <h2>O tratamento em linhas gerais</h2>
          <ol>
            <li>
              <strong>Dieta de exclusão</strong>: retirada da proteína do leite
              da alimentação da criança e, se amamentada, da mãe.
            </li>
            <li>
              <strong>Escolha de fórmula, quando aplicável</strong>:
              extensamente hidrolisada (primeira linha), aminoácidos (casos
              graves), soja (exceção).
            </li>
            <li>
              <strong>Acompanhamento nutricional</strong>: manter nutrição
              adequada apesar das restrições, cálcio, vitamina D, proteína,
              calorias suficientes.
            </li>
            <li>
              <strong>Educação da família</strong>: leitura de rótulos,
              prevenção de contaminação cruzada, ação em caso de reação.
            </li>
            <li>
              <strong>Reintrodução programada</strong>: escada do leite, teste
              de provocação oral, quando for o momento.
            </li>
          </ol>

          <h2>Três mitos que precisam morrer</h2>
          <h3>1. "Leite sem lactose serve para APLV"</h3>
          <p>
            Não. Leite sem lactose ainda contém a proteína do leite — é o
            açúcar que foi quebrado. Para quem tem APLV, a proteína é o
            problema. Continua proibido.
          </p>

          <h3>2. "Criança que tem APLV não vai tomar leite nunca mais"</h3>
          <p>
            Na maioria dos casos, a criança desenvolve tolerância até os 3
            anos. A reintrodução, feita pela escada do leite, permite retomar
            laticínios de forma segura na grande maioria dos casos.
          </p>

          <h3>3. "É só tirar o leite e pronto"</h3>
          <p>
            Tirar o leite sem compensar os nutrientes compromete o crescimento
            e a saúde da criança. Tratamento de APLV é nutricional: é{" "}
            <strong>substituir</strong>, não apenas excluir.
          </p>

          <h2>Próximos passos</h2>
          <p>
            Se você suspeita que o seu filho pode ter APLV, o caminho é:
            procurar um pediatra com experiência em alergia alimentar, evitar
            restrições por conta própria (que atrapalham o diagnóstico),
            manter diário alimentar, e procurar acompanhamento nutricional
            assim que houver suspeita forte ou diagnóstico.
          </p>
        </div>
      </section>

      <Section className="bg-muted/30">
        <div className="grid gap-6 md:grid-cols-3">
          <InfoCard
            icon={<BookOpen className="h-6 w-6" />}
            title="Leia os artigos do blog"
            href="/blog"
            description="Guias práticos sobre leitura de rótulo, dieta materna, escada do leite, fórmulas."
          />
          <InfoCard
            icon={<Info className="h-6 w-6" />}
            title="25+ perguntas respondidas"
            href="/perguntas-frequentes"
            description="FAQ dividido por categoria — do diagnóstico ao dia a dia na creche."
          />
          <InfoCard
            icon={<Baby className="h-6 w-6" />}
            title="Agende uma consulta"
            href="/consultas"
            description="Plano individualizado 100% online, com suporte pós-consulta."
          />
        </div>
      </Section>

      <Section>
        <div className="rounded-2xl bg-secondary-soft border border-secondary/20 p-6 md:p-8 max-w-3xl mx-auto flex gap-4 items-start">
          <AlertTriangle className="h-6 w-6 text-secondary shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-foreground mb-1">Importante</p>
            <p className="text-foreground/80 text-sm leading-relaxed">
              Este conteúdo é educativo e não substitui consulta com
              profissional habilitado. Em caso de suspeita de APLV, procure um
              pediatra e/ou nutricionista. Em caso de reação aguda, procure
              atendimento de urgência.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

function InfoCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl bg-card border border-border p-6 hover:border-primary/40 hover:shadow-card transition-all"
    >
      <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-serif text-xl mb-2 text-foreground">{title}</h3>
      <p className="text-sm text-foreground/75">{description}</p>
    </Link>
  );
}
