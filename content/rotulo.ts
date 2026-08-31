/**
 * Lista de nomes que aparecem em rótulos brasileiros.
 *
 * Três estados, não dois. A divisão binária "é leite / não é leite" quebra
 * justamente nos ingredientes que mais confundem — margarina, creme vegetal,
 * aroma natural — que variam de marca para marca. Classificar esses como
 * "seguro" com uma ressalva no texto é convite a acidente, então eles têm
 * estado próprio: `confira`.
 *
 * Fontes: conteúdo clínico da Juliana + o artigo /blog/como-ler-rotulos-aplv.
 * A lista NÃO substitui a linha "ALÉRGICOS" exigida pela RDC 26/2015.
 */

export type EstadoRotulo = "contem" | "confira" | "seguro";

export interface ItemRotulo {
  /** Nome como aparece no rótulo. */
  n: string;
  /** Explicação em uma frase, sem jargão. */
  obs: string;
  estado: EstadoRotulo;
  /** Grafias alternativas que a busca também deve encontrar. */
  alt?: string[];
}

export const notaRotulo =
  "Lista educativa de nomes que aparecem em rótulos brasileiros. Não substitui a leitura da linha ALÉRGICOS exigida pela RDC 26/2015 nem a orientação em consulta.";

export const itensRotulo: ItemRotulo[] = [
  // ------------------------------------------------------------ contém
  { n: "leite", obs: "O nome mais direto — e nem sempre o que aparece.", estado: "contem" },
  { n: "leite em pó", obs: "Integral, desnatado ou instantâneo: é leite.", estado: "contem" },
  { n: "leite condensado", obs: "Leite concentrado com açúcar.", estado: "contem" },
  { n: "leite maltado", obs: "Leite com extrato de malte. Continua sendo leite.", estado: "contem" },
  { n: "soro de leite", obs: "Sobra da fabricação do queijo. Tem proteína do leite.", estado: "contem", alt: ["soro do leite", "lactossoro"] },
  { n: "soro lácteo", obs: "Outro nome para soro de leite.", estado: "contem" },
  { n: "whey protein", obs: "É proteína do soro do leite — a mesma que causa a reação.", estado: "contem", alt: ["whey", "proteína do soro do leite"] },
  { n: "caseína", obs: "A principal proteína do leite.", estado: "contem", alt: ["caseina"] },
  { n: "caseinato de sódio", obs: "Caseína processada. Continua sendo proteína do leite.", estado: "contem" },
  { n: "caseinato de cálcio", obs: "Caseína processada. Continua sendo proteína do leite.", estado: "contem" },
  { n: "caseinato de potássio", obs: "Caseína processada. Continua sendo proteína do leite.", estado: "contem" },
  { n: "lactoalbumina", obs: "Proteína do soro do leite.", estado: "contem", alt: ["alfa-lactoalbumina", "alfalactoalbumina"] },
  { n: "lactoglobulina", obs: "Proteína do soro do leite — das que mais causam reação.", estado: "contem", alt: ["beta-lactoglobulina", "betalactoglobulina"] },
  { n: "lactoferrina", obs: "Proteína do leite.", estado: "contem" },
  { n: "lactose", obs: "É o açúcar do leite. Atenção: “zero lactose” NÃO é “sem leite”.", estado: "contem" },
  { n: "proteína láctea", obs: "Exatamente o que o nome diz.", estado: "contem", alt: ["proteina lactea"] },
  { n: "sólidos do leite", obs: "Leite com a água retirada.", estado: "contem", alt: ["solidos do leite", "extrato seco de leite"] },
  { n: "composto lácteo", obs: "Mistura à base de leite.", estado: "contem", alt: ["composto lacteo"] },
  { n: "mistura láctea", obs: "À base de leite, como o nome diz.", estado: "contem", alt: ["mistura lactea"] },
  { n: "fermentado lácteo", obs: "Leite fermentado.", estado: "contem", alt: ["fermentado lacteo"] },
  { n: "gordura láctea", obs: "Gordura vinda do leite.", estado: "contem", alt: ["gordura lactea", "gordura do leite"] },
  { n: "manteiga", obs: "Feita de creme de leite.", estado: "contem" },
  { n: "gordura de manteiga", obs: "Derivado da manteiga.", estado: "contem" },
  { n: "aroma de manteiga", obs: "Muitas vezes é feito a partir de leite.", estado: "contem" },
  { n: "ghee", obs: "Manteiga clarificada. Pode conter traços de proteína.", estado: "contem", alt: ["manteiga clarificada"] },
  { n: "creme de leite", obs: "Nata do leite.", estado: "contem" },
  { n: "nata", obs: "A gordura que sobe no leite.", estado: "contem" },
  { n: "chantilly", obs: "Creme de leite batido.", estado: "contem" },
  { n: "queijo", obs: "Todos os tipos, inclusive os “vegetais” que levam caseína.", estado: "contem" },
  { n: "requeijão", obs: "Feito de leite.", estado: "contem", alt: ["requeijao"] },
  { n: "ricota", obs: "Feita do soro do leite.", estado: "contem" },
  { n: "coalhada", obs: "Leite fermentado.", estado: "contem" },
  { n: "coalho", obs: "Usado para coagular o leite; aparece em queijos.", estado: "contem" },
  { n: "iogurte", obs: "Leite fermentado.", estado: "contem" },
  { n: "petit suisse", obs: "Queijo fresco batido. É leite.", estado: "contem" },
  { n: "kefir", obs: "Quando feito com leite — o de água não tem.", estado: "contem" },
  { n: "doce de leite", obs: "Leite e açúcar cozidos.", estado: "contem" },

  // ------------------------------------------------------------ confira
  {
    n: "aroma natural",
    obs: "Pode incluir derivado de leite sem dizer qual. Confira a linha ALÉRGICOS.",
    estado: "confira",
    alt: ["aroma", "aromatizante"],
  },
  {
    n: "margarina",
    obs: "Muitas levam leite ou soro; algumas não. Varia por marca — sempre leia.",
    estado: "confira",
  },
  {
    n: "creme vegetal",
    obs: "Parece seguro pelo nome, mas várias marcas adicionam soro de leite.",
    estado: "confira",
  },
  {
    n: "chocolate",
    obs: "Ao leite sempre tem. O amargo costuma trazer aviso de traços — leia.",
    estado: "confira",
    alt: ["chocolate amargo", "chocolate meio amargo"],
  },
  {
    n: "pode conter leite",
    obs: "Contaminação cruzada na fábrica. Em APLV IgE mediada, evite.",
    estado: "confira",
  },
  {
    n: "caramelo",
    obs: "O corante costuma ser seguro, mas o doce de caramelo geralmente leva leite.",
    estado: "confira",
  },

  // ------------------------------------------------------------ seguro
  { n: "ácido láctico", obs: "Vem de fermentação, quase sempre de vegetais. Não é leite.", estado: "seguro", alt: ["acido lactico", "ácido lático"] },
  { n: "lactato de cálcio", obs: "Sal do ácido láctico. Não é leite.", estado: "seguro", alt: ["lactato de calcio"] },
  { n: "lactato de sódio", obs: "Sal do ácido láctico. Não é leite.", estado: "seguro", alt: ["lactato de sodio"] },
  { n: "estearoil lactilato de sódio", obs: "Emulsificante derivado do ácido láctico. Não é leite.", estado: "seguro", alt: ["estearoil lactilato"] },
  { n: "manteiga de cacau", obs: "É a gordura do cacau. Não tem nada de leite.", estado: "seguro" },
  { n: "manteiga de amendoim", obs: "Só amendoim. Não tem leite.", estado: "seguro" },
  { n: "leite de coco", obs: "Extrato da polpa do coco.", estado: "seguro" },
  { n: "leite de castanha", obs: "Bebida vegetal.", estado: "seguro" },
  { n: "leite de amêndoa", obs: "Bebida vegetal.", estado: "seguro", alt: ["leite de amendoa"] },
  { n: "leite de aveia", obs: "Bebida vegetal. Atenção separada se houver restrição a glúten.", estado: "seguro" },
  { n: "leite de arroz", obs: "Bebida vegetal.", estado: "seguro" },
  { n: "leite de soja", obs: "Bebida vegetal. Atenção separada se houver alergia a soja.", estado: "seguro" },
  { n: "albumina", obs: "Proteína do ovo. Não confunda com lactoalbumina.", estado: "seguro" },
  { n: "lecitina de soja", obs: "Vem da soja. Atenção separada se houver alergia a soja.", estado: "seguro" },
  { n: "gordura vegetal", obs: "De origem vegetal.", estado: "seguro" },
  { n: "óleo vegetal", obs: "De origem vegetal.", estado: "seguro", alt: ["oleo vegetal"] },
  { n: "lactase", obs: "É a enzima que quebra a lactose, não o leite em si.", estado: "seguro" },
];

/** Contagem por estado — usada no contador do painel. */
export const totaisRotulo = {
  contem: itensRotulo.filter((i) => i.estado === "contem").length,
  confira: itensRotulo.filter((i) => i.estado === "confira").length,
  seguro: itensRotulo.filter((i) => i.estado === "seguro").length,
  total: itensRotulo.length,
};

/** Remove acento e caixa para a busca casar "caseina" com "caseína". */
export function normalizar(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
