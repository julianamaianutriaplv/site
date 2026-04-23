import type { Config } from "tailwindcss";

/**
 * Paleta Direção C — "Clínico-Humano"
 *
 * Primário:    #4A3B7C (roxo-ardósia)
 * Secundário:  #C06C86 (rosa dessaturado)
 * Apoio:       #C8D4C1 (verde-pálido, elementos "natural/saúde")
 * Fundo:       #F6F3EE (creme quente)
 * Tinta:       #23232B (quase-preto)
 *
 * Mantém a alma roxo/magenta do branding atual da Juliana,
 * mas no registro de clínica boutique premium (autoridade editorial).
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
        // Tokens semânticos
        background: "#F6F3EE",
        foreground: "#23232B",
        primary: {
          DEFAULT: "#4A3B7C",
          hover: "#3C3065",
          soft: "#EFEBF5",
          contrast: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#C06C86",
          hover: "#A85A73",
          soft: "#F6E8EC",
        },
        accent: {
          DEFAULT: "#C8D4C1",
          hover: "#B2C2A9",
          soft: "#EEF2EB",
        },
        muted: {
          DEFAULT: "#EDE8DF",
          foreground: "#6B6B74",
        },
        border: "#E2DDD2",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#23232B",
        },
        destructive: {
          DEFAULT: "#B53D3D",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
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
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(35,35,43,0.04), 0 4px 12px rgba(35,35,43,0.06)",
        card: "0 4px 20px rgba(74,59,124,0.08)",
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
