/**
 * Banco de perguntas frequentes sobre APLV.
 *
 * FONTES de referência consultadas para as respostas técnicas:
 * - Consenso Brasileiro sobre Alergia Alimentar (ASBAI + SBP), 2018/2024
 * - Atualização em Alergia Alimentar 2025 (ASBAI + SBP)
 * - PCDT APLV CONITEC / Ministério da Saúde, 2022
 * - Portaria SCTIE nº 67/2018 — incorporação de fórmulas ao SUS
 *
 * Todo texto aqui é educativo. Não substitui consulta individualizada.
 */

export type FaqCategory =
  | "diagnostico"
  | "alimentacao-crianca"
  | "alimentacao-mae"
  | "formulas"
  | "reintroducao"
  | "vida-pratica";

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}

export const faqCategories: Record<
  FaqCategory,
  { label: string; description: string }
> = {
  diagnostico: {
    label: "Diagnóstico",
    description: "Sintomas, exames, diferenças entre APLV e intolerância à lactose.",
  },
  "alimentacao-crianca": {
    label: "Alimentação da criança",
    description: "O que pode, o que não pode, rótulos e contaminação cruzada.",
  },
  "alimentacao-mae": {
    label: "Mãe que amamenta",
    description: "Dieta de exclusão materna na amamentação do bebê APLV.",
  },
  formulas: {
    label: "Fórmulas infantis",
    description: "Fórmulas extensamente hidrolisadas, aminoácidos e soja.",
  },
  reintroducao: {
    label: "Reintrodução e prognóstico",
    description: "Escada do leite, quando testar, evolução natural da alergia.",
  },
  "vida-pratica": {
    label: "Vida prática",
    description: "Creche, festas, viagens, lidar com família que não entende.",
  },
};

export const faqItems: FaqItem[] = [
  // ─────────── DIAGNÓSTICO ───────────
  {
    id: "aplv-vs-intolerancia-lactose",
    category: "diagnostico",
    question:
      "Qual a diferença entre APLV e intolerância à lactose?",
    answer:
      "São condições completamente diferentes, e essa confusão é uma das mais comuns (e mais perigosas) na rotina das famílias. A APLV é uma reação do sistema imunológico à proteína do leite de vaca — o corpo trata aquela proteína como uma ameaça. Já a intolerância à lactose é uma dificuldade digestiva: falta ou reduz a enzima lactase, que quebra o açúcar do leite (a lactose). Na prática: leite 'sem lactose' continua tendo a proteína do leite de vaca e NÃO é seguro para quem tem APLV. Por isso leitura de rótulo e troca de fórmula precisam de avaliação individualizada. A APLV é comum no primeiro ano e a maioria dos bebês desenvolve tolerância até os 3 anos de idade; a intolerância à lactose primária raramente acontece em bebês.",
  },
  {
    id: "sintomas-aplv",
    category: "diagnostico",
    question:
      "Quais são os principais sintomas de APLV em bebês e crianças?",
    answer:
      "Os sintomas variam muito porque a APLV pode ser IgE mediada (reações rápidas), não-IgE mediada (reações lentas) ou mista. Sinais comuns: sangue ou muco nas fezes, cólicas intensas e choro excessivo, refluxo persistente, vômitos, diarreia ou constipação que não melhoram, dermatite atópica, urticária, inchaço em lábios/rosto, congestão nasal crônica, baixo ganho de peso. Em casos mais graves pode haver reação respiratória e anafilaxia (IgE mediada). Esses sintomas são inespecíficos — vários outros problemas causam quadro parecido. O diagnóstico deve ser feito por profissional e combina história clínica, diário alimentar, exames (quando pertinentes) e resposta à dieta de exclusão.",
  },
  {
    id: "exames-aplv",
    category: "diagnostico",
    question:
      "Quais exames são usados para diagnosticar APLV?",
    answer:
      "Para APLV IgE mediada, o profissional pode solicitar IgE específico sérico para leite de vaca e suas frações (caseína, alfa-lactoalbumina, beta-lactoglobulina) e prick test (teste cutâneo). Para APLV não-IgE mediada, não existe exame laboratorial validado — o diagnóstico é clínico, baseado em história, diário alimentar e resposta à dieta de exclusão por pelo menos 2 a 4 semanas, seguida de reintrodução supervisionada. O teste de provocação oral (TPO), feito em ambiente controlado, é considerado o padrão-ouro para confirmação. Segundo a ASBAI, testes de 'IgG para alimentos' e exames do tipo 'food intolerance' vendidos em laboratórios particulares NÃO têm validade científica para APLV e não devem ser usados para guiar exclusões alimentares.",
  },
  {
    id: "tipos-aplv",
    category: "diagnostico",
    question:
      "O que são APLV IgE mediada, não-IgE mediada e mista?",
    answer:
      "É a classificação pelo mecanismo imunológico envolvido. Na APLV IgE mediada, o corpo produz anticorpos IgE contra a proteína do leite e as reações são rápidas (minutos a 2 horas): urticária, inchaço, coriza, vômito imediato, e em casos graves anafilaxia. Na APLV não-IgE mediada, o mecanismo é celular, as reações são tardias (horas a dias) e geralmente gastrointestinais: sangue nas fezes, cólicas, refluxo, diarreia/constipação crônica. Entram aqui quadros como FPIAP (proctocolite alérgica) e FPIES. Na forma mista, há características das duas — por exemplo, eczema importante junto de sintomas digestivos. A classificação orienta o tipo de exame, a escolha de fórmula e o processo de reintrodução, por isso é importante chegar a ela com avaliação adequada.",
  },
  {
    id: "crianca-crescer-aplv",
    category: "diagnostico",
    question:
      "Meu filho vai ter APLV para sempre?",
    answer:
      "Na maioria dos casos, não. As diretrizes brasileiras (ASBAI/SBP) e a literatura internacional mostram que a maior parte das crianças desenvolve tolerância até os 3 anos de idade, especialmente nas formas não-IgE mediadas. Em APLV IgE mediada a resolução tende a ser um pouco mais lenta. O acompanhamento profissional é o que vai sinalizar quando é seguro iniciar a reintrodução, que pode ser feita em etapas (escada do leite) sob supervisão. Alguns quadros persistem na adolescência e vida adulta, mas são a minoria. O importante é não reintroduzir por conta própria — reação grave é possível.",
  },

  // ─────────── ALIMENTAÇÃO DA CRIANÇA ───────────
  {
    id: "rotulos-aplv",
    category: "alimentacao-crianca",
    question:
      "Como ler rótulos para identificar leite 'escondido'?",
    answer:
      "A legislação brasileira (RDC 26/2015 da Anvisa) obriga que alergênicos, entre eles o leite, sejam destacados no rótulo depois da lista de ingredientes, em caixa alta e negrito: 'ALÉRGICOS: CONTÉM LEITE'. Alimentos produzidos em linha compartilhada trazem 'PODE CONTER LEITE' — esses também devem ser evitados na APLV. Fora disso, fique atento a termos que indicam leite: lactoalbumina, lactoglobulina, caseína, caseinato, soro de leite, whey, whey protein, manteiga, creme de leite, requeijão, iogurte em pó, queijo em pó, gordura do leite, sólidos do leite. 'Leite sem lactose' NÃO é seguro para APLV (ainda tem a proteína). Crie o hábito de ler TODO rótulo, mesmo de produtos que você já comprou — fórmulas mudam.",
  },
  {
    id: "contaminacao-cruzada",
    category: "alimentacao-crianca",
    question:
      "O que é contaminação cruzada e como evitar em casa?",
    answer:
      "É quando um alimento seguro entra em contato com alimentos que contêm a proteína do leite, por meio de utensílios, mãos, panelas, esponjas ou superfícies. Em APLV IgE mediada, traços podem desencadear reação. Práticas que reduzem risco: separar utensílios e esponjas da criança, lavar bem as mãos após manusear laticínios, usar tábuas separadas, evitar reaproveitar óleo de fritura, armazenar pote separado de manteiga vegetal sem leite, conferir se copos e mamadeiras foram lavados antes de secar com panos limpos. Em restaurantes, explique a gravidade — não é 'frescura', é saúde. Em festas, leve a comida da criança em pote identificado.",
  },
  {
    id: "calcio-sem-leite",
    category: "alimentacao-crianca",
    question:
      "Como garantir cálcio na dieta sem leite de vaca?",
    answer:
      "A ingestão adequada de cálcio é essencial, mas não depende de laticínios. Fontes vegetais com boa biodisponibilidade: folhas verde-escuras (couve, brócolis, rúcula, espinafre cozido), gergelim e tahine, chia, feijões, amêndoa, tofu com cálcio, sardinha com espinha, figo seco. Bebidas vegetais fortificadas (se adequadas para a idade) ajudam a completar. As necessidades variam por faixa etária, então a quantidade precisa é ajustada por um nutricionista. Em alguns casos é indicada suplementação por período determinado, especialmente na fase inicial da dieta de exclusão. Vitamina D, magnésio e exposição solar influenciam fortemente a fixação do cálcio nos ossos — não adianta focar só em quantidade.",
  },
  {
    id: "iogurte-soja-aveia",
    category: "alimentacao-crianca",
    question:
      "Bebida vegetal de aveia, coco ou soja substitui leite?",
    answer:
      "Bebidas vegetais podem ser usadas em receitas como substitutas de leite, mas NÃO substituem fórmula infantil. Em bebês menores de 1 ano, a alimentação base é leite materno ou fórmula específica — bebidas vegetais comuns não têm perfil nutricional adequado e podem causar deficiências graves. A partir de 1 ano, bebidas vegetais podem aparecer na rotina, mas com critério: escolher versões sem açúcar, fortificadas com cálcio, e lembrar que muitas crianças com APLV também reagem a soja. Aveia tem risco de contaminação cruzada com trigo na produção. O melhor caminho é individualizado — a decisão de qual bebida vegetal usar, em que idade e quantidade depende da avaliação da criança.",
  },

  // ─────────── ALIMENTAÇÃO DA MÃE ───────────
  {
    id: "dieta-exclusao-materna",
    category: "alimentacao-mae",
    question:
      "Preciso tirar leite da minha dieta se estou amamentando um bebê APLV?",
    answer:
      "Em muitos casos, sim — a proteína do leite ingerida pela mãe passa pelo leite materno e pode desencadear sintomas no bebê. A dieta de exclusão materna é um dos pilares do tratamento quando se confirma APLV em lactentes em aleitamento. Ela geralmente inclui excluir leite e todos os derivados (iogurte, queijo, manteiga, requeijão, creme de leite, achocolatado, pães e biscoitos com leite, chocolate ao leite, doces e produtos industrializados que tenham leite como ingrediente). O período mínimo costuma ser de 2 a 4 semanas para avaliar resposta, e pode se estender por meses. A exclusão deve ser acompanhada por nutricionista — a mãe também precisa de cálcio, vitamina D, B12, proteína e calorias adequadas.",
  },
  {
    id: "mae-dieta-emagrecimento",
    category: "alimentacao-mae",
    question:
      "Eu posso emagrecer fazendo dieta de exclusão materna?",
    answer:
      "O foco da dieta de exclusão materna NÃO é emagrecimento — é tratamento da APLV do bebê. Fazer restrição alimentar durante a amamentação sem acompanhamento pode comprometer a produção de leite, reduzir nutrientes no leite materno e afetar seu próprio bem-estar emocional e físico. É comum haver perda de peso como consequência, mas também é comum haver ganho (muitas mães compensam com ultraprocessados sem leite, que são calóricos). O mais saudável é focar em ter energia, cálcio, ferro, proteína e ômega-3 suficientes. Emagrecimento pós-parto, se desejado, é uma conversa separada e deve respeitar a amamentação.",
  },
  {
    id: "soja-carne-ovo-mae",
    category: "alimentacao-mae",
    question:
      "Preciso tirar também soja, ovo e carne?",
    answer:
      "Só se houver evidência clínica. A orientação inicial padrão é retirar leite e derivados; outros alérgenos entram na exclusão apenas se o bebê continuar sintomático ou se já houver suspeita/confirmação de reação cruzada. Cerca de 10 a 15% dos bebês com APLV também reagem à soja. Alergia a ovo, trigo ou peixe é possível, mas não é automática — não precisa tirar tudo por precaução. Restrição sem base técnica empobrece a dieta materna sem benefício para o bebê. A estratégia correta é exclusão orientada, com reintroduções testadas de forma organizada, sempre com acompanhamento profissional.",
  },

  // ─────────── FÓRMULAS ───────────
  {
    id: "qual-formula-aplv",
    category: "formulas",
    question:
      "Qual é a fórmula correta para bebês com APLV?",
    answer:
      "Segundo o protocolo brasileiro (CONITEC 2022 e Consenso ASBAI/SBP), a primeira escolha para a maioria dos casos de APLV é a fórmula extensamente hidrolisada (FEH). Ela quebra a proteína do leite em pedaços muito pequenos, pouco reconhecidos pelo sistema imune, e é tolerada em cerca de 90% dos bebês menores de 6 meses e 95% acima de 6 meses. Nos casos graves, sintomas persistentes após 2 a 4 semanas em FEH, alergias múltiplas ou anafilaxia, indica-se fórmula à base de aminoácidos (FAA). Fórmula de soja não é primeira linha — pode ser considerada apenas em casos leves, em bebês maiores de 6 meses com APLV IgE mediada, ou após estabilização. A escolha não é do mercado nem da farmácia: é clínica, individualizada.",
  },
  {
    id: "formula-amargo-recusa",
    category: "formulas",
    question:
      "O bebê recusou a fórmula hidrolisada. O que fazer?",
    answer:
      "Recusa é muito comum — fórmulas hidrolisadas e de aminoácidos têm sabor e cheiro diferentes, muitas vezes amargos. Estratégias que ajudam: introdução gradual, misturando a nova fórmula em pequena proporção com a que o bebê já toma (se for segura), e aumentando ao longo de dias; oferecer fria (gelada até reduz o amargor); usar copinho, colher ou seringa quando o bebê rejeita a mamadeira; escolher um horário em que o bebê esteja com fome mas não irritado; paciência, sem forçar. Nunca adoçar com açúcar. Se a recusa persiste e o bebê não está ganhando peso, é urgente reavaliar com o profissional — pode haver indicação de outra fórmula ou suporte adicional.",
  },
  {
    id: "formula-sus",
    category: "formulas",
    question:
      "O SUS fornece fórmula para APLV?",
    answer:
      "Sim. A Portaria SCTIE nº 67/2018 incorporou ao SUS as fórmulas extensamente hidrolisada (com e sem lactose), à base de aminoácidos e à base de soja para crianças de 0 a 24 meses com APLV, dentro do Protocolo Clínico e Diretrizes Terapêuticas (PCDT APLV, CONITEC 2022). O acesso depende da rede local (estados e municípios organizam o fluxo) e exige: laudo médico, exames ou relatório clínico, e em geral cadastro na Secretaria de Saúde. Cada estado tem protocolo próprio. Se a família enfrenta dificuldade, o caminho costuma passar por defensoria pública ou ação judicial — infelizmente essa é uma realidade frequente no Brasil. Documentos bem preparados pelo médico e nutricionista fortalecem o pedido.",
  },

  // ─────────── REINTRODUÇÃO ───────────
  {
    id: "escada-leite",
    category: "reintroducao",
    question:
      "O que é a escada do leite?",
    answer:
      "A escada do leite (Milk Ladder) é um protocolo de reintrodução progressiva do leite de vaca em crianças que passaram por período adequado de exclusão e mostraram sinais de tolerância. Começa-se pelas formas mais 'cozidas' e processadas (como biscoito amanteigado, bolo bem assado) — o calor desnatura parte das proteínas e reduz a alergenicidade — e progride por etapas até laticínios frescos (iogurte, queijo, leite). Cada etapa tem observação de sintomas por dias a semanas antes de avançar. O método tem boa base para APLV não-IgE mediada; em IgE mediada, a decisão de quando e como reintroduzir é mais cautelosa e precisa de acompanhamento médico próximo, muitas vezes com teste de provocação oral supervisionado.",
  },
  {
    id: "quando-testar-leite",
    category: "reintroducao",
    question:
      "Quando posso testar leite de novo?",
    answer:
      "Não existe prazo fixo universal. A orientação geral do Consenso Brasileiro é manter a dieta de exclusão por, no mínimo, 6 meses, e só então considerar reintrodução — desde que a criança esteja estável, sem sintomas, e com indicação do profissional. Em APLV IgE mediada, costuma-se considerar repetir IgE específico e prick test antes de testar; em não-IgE mediada, se guia mais pela evolução clínica e diário alimentar. Reintroduzir sem planejamento é arriscado: pode haver reação tardia intensa ou, em IgE mediada, anafilaxia. O teste deve ser feito com protocolo, começando por porções mínimas e em ambiente seguro.",
  },
  {
    id: "reacao-durante-reintroducao",
    category: "reintroducao",
    question:
      "O que fazer se meu filho tiver reação durante a reintrodução?",
    answer:
      "Pare imediatamente a oferta e observe. Em reações leves (vermelhidão localizada, coceira discreta), registre o que aconteceu, o alimento, a quantidade e o tempo de reação, e entre em contato com o profissional para reavaliar. Em reações moderadas ou graves — inchaço de lábios, rosto ou pálpebras, vômitos repetidos, dificuldade respiratória, tosse seca intensa, rouquidão, palidez, moleza — procure pronto-socorro imediatamente. Em casos com risco de anafilaxia, não espere: se já houver prescrição de adrenalina autoinjetável, aplique conforme instruído e leve a criança ao hospital. Depois do episódio, a escada volta alguns degraus e se retoma com mais calma.",
  },

  // ─────────── VIDA PRÁTICA ───────────
  {
    id: "creche-aplv",
    category: "vida-pratica",
    question:
      "Como colocar meu filho APLV na creche com segurança?",
    answer:
      "O primeiro passo é conversar com a coordenação e a pessoa responsável pela alimentação, apresentando laudo ou orientação por escrito do profissional. Fornecer por escrito: diagnóstico, alimentos proibidos (leite e derivados — incluindo termos comuns de rótulo), o que pode substituir, plano de ação em caso de reação (incluindo adrenalina, se houver). Levar rotulados os alimentos da criança (lancheira identificada, garrafinha, utensílios). Treinar a equipe sobre contaminação cruzada — não basta 'não oferecer leite', é também lavar mãos, utilizar utensílios separados, não reaproveitar panela. Visitas periódicas ajudam a manter o padrão. Reação em creche acontece; um protocolo escrito reduz muito o risco.",
  },
  {
    id: "festas-niver",
    category: "vida-pratica",
    question:
      "E festas de aniversário? Meu filho pode ir?",
    answer:
      "Sim, e deve — a vida social também é saúde. O que muda é o preparo. Combine com os anfitriões, envie um bilhete simpático explicando a APLV e o que não pode (evite listas monstruosas; foque no essencial: leite e derivados). Leve uma 'comidinha de festa' equivalente (bolo individual sem leite, salgadinho seguro, docinho só da criança), identificada em pote. Conversa com o garçom/buffet ajuda. Em festa infantil, o momento do parabéns é o mais tenso — tenha um cupcake só dela pronto. Lembrar outras crianças 'essa sobremesa é da Maria' evita bagunça. Se a criança já entende, ela mesma aprende a recusar o que oferecem.",
  },
  {
    id: "viagem-aplv",
    category: "vida-pratica",
    question:
      "Como viajar com segurança tendo um filho APLV?",
    answer:
      "Planejamento antecipa 95% dos problemas. Antes de viajar: leve laudo e orientação nutricional em papel, cópia da receita de adrenalina (se prescrita) e a medicação em si, mala com lanches seguros (frutas, barrinhas sem leite, bolo caseiro congelado, biscoitos), utensílios próprios se for ficar em local com cozinha. Pesquise supermercados e hospitais próximos do destino. Em restaurantes, explique antes de pedir, foque em pratos simples (arroz, feijão, carnes grelhadas, ovo) e fuja de molhos prontos. Em voos, informe a companhia do alergénico no momento da reserva — muitas trocam o lanche de bordo. Em viagens internacionais, tenha frases de explicação no idioma do destino e pesquise equivalentes das fórmulas.",
  },
  {
    id: "familia-nao-entende",
    category: "vida-pratica",
    question:
      "Como lidar com parentes que não levam a APLV a sério?",
    answer:
      "A frase 'um pouquinho não faz mal' é uma das mais perigosas na APLV. Argumentos que funcionam: explicar que a APLV é uma reação imunológica, não preferência; mostrar fotos/relato de reação anterior (o impacto é real); trazer materiais da ASBAI ou do pediatra; deixar claro que em IgE mediada existe risco de anafilaxia. Às vezes a resistência familiar é emocional — medo, culpa, negação. Vale separar o que é conflito afetivo (trabalhe junto, com paciência) do que é segurança inegociável (esse limite não abre). Em último caso, não deixar a criança sozinha com adulto que não respeita. E lembre: você não precisa convencer o mundo todo. Precisa proteger seu filho.",
  },
  {
    id: "aplv-peso-ganho",
    category: "vida-pratica",
    question:
      "Meu bebê está ganhando pouco peso por causa da APLV?",
    answer:
      "Pode ser. APLV não tratada, ou tratada de forma incompleta, pode afetar o ganho de peso e o crescimento — seja por má absorção (inflamação intestinal), por sintomas que dificultam a alimentação, ou por dieta de exclusão mal planejada. O acompanhamento nutricional não é opcional nesses casos: é parte do tratamento. Monitoramento periódico de peso, comprimento, perímetro cefálico e marcos de desenvolvimento é essencial. Se o bebê já está em fórmula adequada, em aleitamento com dieta materna ajustada, e o ganho ainda está aquém, é preciso investigar outras causas associadas (refluxo grave, intolerância múltipla, baixa ingesta calórica) — não pare só na APLV.",
  },
  {
    id: "remedio-natural-aplv",
    category: "vida-pratica",
    question:
      "Existe 'tratamento natural' ou fitoterápico para APLV?",
    answer:
      "Não existe remédio, chá, suplemento 'milagroso' ou terapia alternativa que cure APLV. O tratamento reconhecido pelas diretrizes nacionais (ASBAI/SBP) e internacionais é a exclusão da proteína do leite da dieta (e da mãe, se amamenta), com reintrodução programada quando houver tolerância. Suplementos, probióticos e ajustes nutricionais podem ser coadjuvantes — em alguns casos de não-IgE mediada há evidência de benefício com cepas específicas de probiótico, por exemplo — mas isso é parte de um plano individualizado, não substituto. Desconfie de promessas de 'cura rápida', 'método exclusivo que o sistema esconde' e pagamentos adiantados para programas sem acompanhamento profissional real.",
  },
];
