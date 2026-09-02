import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Abas da seção Receitas: os ebooks (à venda) e a lista beta de produtos e
 * receitas, que é um app à parte (arquivo estático em /receitas/beta com a
 * própria navegação de rodapé). Por isso a aba é um link, não um painel.
 */
const ABAS = [
  { href: "/receitas", label: "Ebooks" },
  { href: "/receitas/beta", label: "Lista de produtos e receitas", beta: true },
];

export function AbasReceitas({ ativa }: { ativa: "/receitas" | "/receitas/beta" }) {
  return (
    <nav aria-label="Seções de receitas" className="container -mt-6 mb-10">
      <ul className="flex gap-2 border-b border-border max-w-5xl">
        {ABAS.map((a) => {
          const atual = a.href === ativa;
          return (
            <li key={a.href}>
              <Link
                href={a.href}
                aria-current={atual ? "page" : undefined}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-3 -mb-px border-b-2 font-medium text-[0.95rem] transition-colors",
                  atual
                    ? "border-secondary text-secondary-strong"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border-strong",
                )}
              >
                {a.label}
                {a.beta ? (
                  <span className="rounded-full border border-caution bg-caution-soft px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-caution-strong">
                    beta
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
