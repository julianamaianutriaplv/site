import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Termos de uso",
  description:
    "Termos de uso do site Juliana Maia Nutri APLV — conteúdo educativo, limites de responsabilidade e disclaimer médico.",
  path: "/termos",
});

export default function TermosPage() {
  return (
    <>
      <Section
        eyebrow="Termos"
        title="Termos de uso"
        description="Regras para o uso deste site e dos conteúdos publicados."
      />

      <div className="container-prose pb-20">
        <div className="prose-custom">
          <p className="text-sm text-foreground/60">
            Última atualização: 2026-04-23
          </p>

          <h2>1. Natureza do conteúdo</h2>
          <p>
            Todo o conteúdo deste site — artigos, perguntas frequentes, guias,
            materiais gratuitos, posts em redes sociais vinculadas e qualquer
            outra informação publicada — tem caráter{" "}
            <strong>educativo e informativo</strong>.
          </p>
          <p>
            <strong>Nenhum conteúdo aqui substitui consulta individualizada</strong>{" "}
            com profissional de saúde habilitado. Diagnóstico, tratamento e
            prescrição requerem avaliação presencial ou por teleconsulta, com
            análise do caso específico da criança.
          </p>

          <h2>2. Limites de responsabilidade</h2>
          <p>
            Ao aplicar qualquer orientação extraída deste site sem
            acompanhamento profissional, você assume a responsabilidade
            integral pelas decisões. A Juliana Maia Nutri APLV não se
            responsabiliza por desfechos decorrentes do uso do conteúdo fora
            do contexto de consulta.
          </p>
          <p>
            <strong>Em caso de reação aguda, dúvida clínica ou emergência,
            procure atendimento médico imediatamente.</strong>
          </p>

          <h2>3. Promessas e resultados</h2>
          <p>
            Em conformidade com o Código de Ética do Nutricionista (Conselho
            Federal de Nutricionistas) e com a Resolução CFN nº 599/2018, este
            site não promete cura, não garante resultados específicos, não
            utiliza depoimentos de pacientes como técnica de persuasão em
            publicidade, não divulga "antes e depois" e não faz promessas
            baseadas em casos individuais. A evolução de cada criança depende
            de múltiplos fatores individuais.
          </p>

          <h2>4. Propriedade intelectual</h2>
          <p>
            Todo o conteúdo publicado é de autoria de{" "}
            {siteConfig.professional.fullName} ou devidamente citado. É
            permitido compartilhar trechos curtos com atribuição e link para a
            fonte original. É vedada a reprodução integral de artigos,
            materiais gratuitos ou qualquer conteúdo deste site sem
            autorização por escrito.
          </p>

          <h2>5. Consultas</h2>
          <p>
            As consultas ofertadas pelo site são atendimentos nutricionais
            particulares, realizados por videochamada, com profissional
            habilitada ({siteConfig.professional.crn}). Informações sobre
            pacotes, valores, agendamento e documentação fiscal são passadas
            pela equipe pelo WhatsApp.
          </p>

          <h2>6. Alterações</h2>
          <p>
            Estes termos podem ser atualizados. A versão vigente é sempre a
            publicada nesta página, com a data da última atualização.
          </p>

          <h2>7. Foro e legislação aplicável</h2>
          <p>
            Fica eleito o foro da comarca de Belo Horizonte (MG) para dirimir
            quaisquer questões oriundas destes termos, aplicando-se a
            legislação brasileira vigente.
          </p>

          <h2>8. Contato</h2>
          <p>
            Para dúvidas sobre estes termos:{" "}
            {siteConfig.contact.email}
          </p>
        </div>
      </div>
    </>
  );
}
