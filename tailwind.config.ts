import type { Config } from "tailwindcss";

/**
 * Paleta — a cor tem função, não é enfeite.
 *
 * O eixo do site é a pergunta que a mãe faz no corredor do mercado:
 * "isso aqui tem leite?". Então a cor responde:
 *
 *   coral (#ED6D6B)  → CONTÉM leite
 *   âmbar (#B0741C)  → VARIA, confira a linha ALÉRGICOS
 *   verde (#46823E)  → SEGURO, e por isso é também a cor de ação (CTA)
 *
 * Os CTAs são verdes de propósito: se fossem coral, competiriam
 * visualmente com os avisos de "contém leite" e diluiriam o código.
 *
 * Títulos em terra (#9D3B2B) em vez de preto — puxa o serifado para
 * o mesmo território quente do logo sem gritar como o coral.
 */

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{mdx,md}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        md: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        // superfícies
        background: "#FFFEF8",
        surface: {
          DEFAULT: "#FBF6EC",
          pessego: "#F8E5D6",
          "pessego-2": "#FCEFE6",
        },
        foreground: "#2A302F",

        // coral — "contém leite" e marca
        primary: {
          DEFAULT: "#ED6D6B",
          hover: "#B53A33",
          soft: "#FBDDDA",
          strong: "#B53A33",
          contrast: "#FFFFFF",
        },
        // verde — "seguro" e ação
        secondary: {
          DEFAULT: "#46823E",
          hover: "#2F5C29",
          soft: "#E4F0DF",
          strong: "#2F5C29",
          contrast: "#FFFFFF",
        },
        // âmbar — "varia, confira"
        caution: {
          DEFAULT: "#B0741C",
          hover: "#8A5A12",
          soft: "#FAEBD3",
          strong: "#8A5A12",
        },

        terra: "#9D3B2B",
        sage: "#8ECAAC",

        accent: {
          DEFAULT: "#8ECAAC",
          hover: "#72A385",
          soft: "#E4F0DF",
        },
        muted: {
          DEFAULT: "#FBF6EC",
          foreground: "#5C6360",
        },
        subtle: "#6E7572",
        border: "rgba(42,48,47,.13)",
        "border-strong": "rgba(42,48,47,.22)",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#2A302F",
        },
        destructive: {
          DEFAULT: "#B53A33",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Iowan Old Style", "Georgia", "serif"],
        sans: ["var(--font-ubuntu)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Escala tipográfica 1.25 (major third), base 16
        xs: ["0.8rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.5" }],
        base: ["1rem", { lineHeight: "1.65" }],
        lg: ["1.125rem", { lineHeight: "1.65" }],
        xl: ["1.25rem", { lineHeight: "1.5" }],
        "2xl": ["1.5rem", { lineHeight: "1.35" }],
        "3xl": ["1.875rem", { lineHeight: "1.25" }],
        "4xl": ["2.25rem", { lineHeight: "1.15" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
        "6xl": ["3.75rem", { lineHeight: "1.05" }],
      },
      borderRadius: {
        lg: "0.625rem",
        xl: "1.125rem",
        "2xl": "1.5rem",
      },
      maxWidth: {
        shell: "1180px",
      },
      boxShadow: {
        soft: "0 2px 4px rgba(42,48,47,.04), 0 12px 28px -12px rgba(42,48,47,.18)",
        card: "0 2px 4px rgba(42,48,47,.04), 0 12px 28px -12px rgba(42,48,47,.18)",
        lift: "0 4px 8px rgba(42,48,47,.05), 0 28px 56px -20px rgba(157,59,43,.28)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
