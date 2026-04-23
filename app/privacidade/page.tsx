import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Política de privacidade",
  description:
    "Política de privacidade do site Juliana Maia Nutri APLV, em conformidade com a LGPD (Lei 13.709/2018).",
  path: "/privacidade",
  noIndex: false,
});

export default function PrivacidadePage() {
  return (
    <>
      <Section
        eyebrow="LGPD"
        title="Política de privacidade"
        description="Este documento explica quais dados coletamos, por que coletamos, como armazenamos e quais são seus direitos. Em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018)."
      />

      <div className="container-prose pb-20">
        <div className="prose-custom">
          <p className="text-sm text-foreground/60">
            Última atualização: 2026-04-23
          </p>
          <p>
            <strong>Importante:</strong> este modelo foi redigido com base na
            LGPD e em boas práticas de sites educacionais e de saúde. Antes de
            publicação definitiva, recomendamos revisão por advogado
            especializado em proteção de dados.
          </p>

          <h2>1. Quem é o controlador dos seus dados</h2>
          <p>
            {siteConfig.professional.fullName} ({siteConfig.professional.cnpj}),
            profissional nutricionista ({siteConfig.professional.crn}), é a
            controladora dos dados pessoais tratados neste site.
          </p>
          <p>
            <strong>Contato para questões de privacidade:</strong>{" "}
            {siteConfig.contact.email}
          </p>

          <h2>2. Quais dados coletamos</h2>
          <p>Coletamos dois tipos de dados:</p>
          <h3>2.1. Dados fornecidos ativamente por você</h3>
          <ul>
            <li>Nome e e-mail, ao se cadastrar para materiais gratuitos</li>
            <li>
              Mensagens e informações enviadas por formulários de contato, se
              aplicáveis
            </li>
          </ul>
          <h3>2.2. Dados coletados automaticamente</h3>
          <ul>
            <li>
              Informações técnicas: navegador, sistema operacional, tipo de
              dispositivo, páginas visitadas (via Google Analytics, com IP
              anonimizado)
            </li>
            <li>
              Cookies essenciais (funcionamento do site) e, mediante seu
              consentimento, cookies analíticos
            </li>
          </ul>

          <h2>3. Por que coletamos</h2>
          <ul>
            <li>
              Enviar os materiais gratuitos solicitados (legítimo interesse e
              execução de solicitação)
            </li>
            <li>
              Responder a contatos e solicitações de agendamento
              (execução de serviço)
            </li>
            <li>
              Entender como o site é utilizado e melhorar a experiência
              (consentimento)
            </li>
            <li>Cumprir obrigações legais, quando aplicável</li>
          </ul>

          <h2>4. Base legal do tratamento</h2>
          <p>
            As bases legais aplicadas (Art. 7º da LGPD) são:
            consentimento, execução de contrato/procedimento preliminar,
            cumprimento de obrigação legal, e legítimo interesse (quando aplicável
            e sem sobrepor direitos fundamentais).
          </p>

          <h2>5. Com quem compartilhamos seus dados</h2>
          <p>Não vendemos dados. Compartilhamos apenas com:</p>
          <ul>
            <li>
              Provedores de infraestrutura do site (hospedagem, analytics) — sob
              contrato
            </li>
            <li>Provedor de e-mail marketing, caso você se cadastre em listas</li>
            <li>
              Autoridades, quando legalmente obrigado (ordem judicial, fiscalização
              sanitária)
            </li>
          </ul>

          <h2>6. Tempo de retenção</h2>
          <ul>
            <li>
              Dados de cadastro em lista: enquanto você consentir receber
              comunicações. Descadastramento a qualquer momento.
            </li>
            <li>
              Registros de contato: pelo tempo necessário ao atendimento e por
              obrigação legal (em geral 5 anos para documentos fiscais).
            </li>
            <li>
              Dados de analytics: agregados e anonimizados, conforme
              configuração do provedor.
            </li>
          </ul>

          <h2>7. Seus direitos (Art. 18 da LGPD)</h2>
          <ul>
            <li>Confirmação da existência de tratamento</li>
            <li>Acesso aos dados</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados</li>
            <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
            <li>
              Portabilidade a outro fornecedor de serviço ou produto
            </li>
            <li>
              Eliminação dos dados tratados com consentimento, exceto quando a
              lei exigir sua manutenção
            </li>
            <li>
              Informações sobre compartilhamento e entidades com as quais os
              dados foram compartilhados
            </li>
            <li>Revogação do consentimento</li>
          </ul>
          <p>
            Para exercer qualquer desses direitos, entre em contato pelo
            e-mail {siteConfig.contact.email}. Responderemos em prazo
            razoável (em geral até 15 dias corridos).
          </p>

          <h2>8. Segurança</h2>
          <p>
            Utilizamos medidas técnicas e administrativas razoáveis para
            proteger seus dados contra acesso não autorizado, perda,
            alteração ou destruição. Apesar disso, nenhum sistema é
            absolutamente imune — em caso de incidente com risco aos
            titulares, seguiremos as diretrizes da ANPD (Autoridade Nacional
            de Proteção de Dados).
          </p>

          <h2>9. Cookies</h2>
          <p>
            Utilizamos cookies essenciais (necessários para o funcionamento do
            site) e, mediante seu consentimento, cookies analíticos (para
            entender o uso do site). Você pode aceitar ou recusar no banner
            exibido em sua primeira visita e, a qualquer momento, limpar os
            cookies pelo seu navegador.
          </p>

          <h2>10. Alterações desta política</h2>
          <p>
            Esta política pode ser atualizada. Publicaremos aqui a data da
            última revisão. Alterações relevantes serão comunicadas por e-mail
            aos cadastrados em listas.
          </p>

          <h2>11. Contato</h2>
          <p>
            Para dúvidas, solicitações de direitos ou reclamações:
            <br />
            E-mail: {siteConfig.contact.email}
            <br />
            Responsável pelo tratamento: {siteConfig.professional.fullName}
          </p>
        </div>
      </div>
    </>
  );
}
