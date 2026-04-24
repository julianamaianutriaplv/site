import { cn } from "@/lib/utils";

interface AppleHeartPathsProps {
  coral?: string;
  sage?: string;
  stroke?: number;
}

/**
 * Paths da maçã-coração inclinada (sem <svg> wrapper).
 *
 * Fiel ao original da Juliana — observações-chave:
 *
 * 1. O CORAÇÃO em si é quase simétrico (não é rotacionado).
 *    O que dá o ar de "maçã" é o lobo superior direito se
 *    estendendo um pouco mais para CIMA, como se a linha do
 *    coração formasse a pontinha/caule da maçã.
 *
 * 2. A SEMENTE interna é o elemento mais inclinado: uma gota
 *    que vai da parte inferior-esquerda para a superior-direita,
 *    aproximadamente 35° da vertical.
 *
 * 3. As DUAS CURVAS SAGE são quase horizontais, saindo do canto
 *    superior esquerdo e caindo levemente para a direita,
 *    como linhas de movimento / folha estilizada.
 *
 * 4. Traço coral uniforme, cantos arredondados (linecap/linejoin).
 *
 * ViewBox: 100x100.
 */
export function AppleHeartPaths({
  coral = "#D46E6E",
  sage = "#89B89A",
  stroke = 5,
}: AppleHeartPathsProps) {
  return (
    <g>
      {/* Duas linhas sage: quase horizontais, curvam descendo para a direita.
          Partem do canto superior-esquerdo, param antes do coração. */}
      <path
        d="M 8 20 C 20 14, 32 14, 42 22"
        stroke={sage}
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 12 28 C 22 24, 32 24, 42 30"
        stroke={sage}
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
      />

      {/*
        Coração-maçã outline.

        Construído em um único path contínuo, começando e terminando
        no TOPO do lobo direito (o "caule" da maçã — ponto mais alto).

        Sequência:
        • Começa no ponto alto do lobo direito (caule da maçã)
        • Sobe/curva para a direita e desce pelo lado direito
        • Vai até a ponta inferior central
        • Sobe pelo lado esquerdo
        • Arredonda o lobo esquerdo (mais simétrico/cheio)
        • Desce para o vale entre os lobos (centro superior)
        • Sobe para fechar no ponto inicial do lobo direito
      */}
      <path
        d="
          M 60 22
          C 74 18, 88 30, 86 48
          C 84 64, 68 78, 52 88
          C 36 78, 20 64, 18 48
          C 16 30, 30 20, 42 26
          C 48 30, 50 34, 52 38
          C 54 34, 56 26, 60 22 Z
        "
        stroke={coral}
        strokeWidth={stroke}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />

      {/*
        Semente em forma de gota (outline, não preenchida).
        Posicionada no lobo superior direito do coração.
        Inclinada ~35° no sentido horário (vem de baixo-esquerda,
        ponta para cima-direita).
      */}
      <g transform="rotate(35 56 46)">
        <path
          d="
            M 56 38
            C 50 40, 48 46, 50 52
            C 54 55, 60 53, 62 48
            C 63 43, 60 38, 56 38 Z
          "
          stroke={coral}
          strokeWidth={stroke * 0.85}
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </g>
  );
}

interface AppleHeartProps {
  className?: string;
  coral?: string;
  sage?: string;
  stroke?: number;
}

export function AppleHeart({
  className,
  coral,
  sage,
  stroke,
}: AppleHeartProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-hidden="true"
    >
      <AppleHeartPaths coral={coral} sage={sage} stroke={stroke} />
    </svg>
  );
}
