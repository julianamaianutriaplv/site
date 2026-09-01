"use client";

import { useMemo, useState } from "react";

import {
  itensRotulo,
  normalizar,
  notaRotulo,
  totaisRotulo,
  type EstadoRotulo,
  type ItemRotulo,
} from "@/content/rotulo";

const ESTILO: Record<
  EstadoRotulo,
  { pill: string; marca: string; titulo: string; caixa: string }
> = {
  contem: {
    pill: "bg-primary-soft text-primary-strong border-primary/30 hover:border-primary",
    marca: "●",
    titulo: "Contém leite",
    caixa: "bg-primary-soft border-primary/30 text-primary-strong",
  },
  confira: {
    pill: "bg-caution-soft text-caution-strong border-caution/30 hover:border-caution",
    marca: "!",
    titulo: "Depende da marca — confira",
    caixa: "bg-caution-soft border-caution/30 text-caution-strong",
  },
  seguro: {
    pill: "bg-secondary-soft text-secondary-strong border-secondary/30 hover:border-secondary",
    marca: "✓",
    titulo: "Não é leite",
    caixa: "bg-secondary-soft border-secondary/30 text-secondary-strong",
  },
};

/** Casa por nome ou por qualquer grafia alternativa. */
function casa(item: ItemRotulo, termo: string): boolean {
  const t = normalizar(termo);
  if (!t) return true;
  if (normalizar(item.n).includes(t)) return true;
  return (item.alt ?? []).some((a) => normalizar(a).includes(t));
}

export function VerificadorRotulo() {
  const [termo, setTermo] = useState("");
  const [escolhido, setEscolhido] = useState<ItemRotulo | null>(null);

  const filtrados = useMemo(
    () => itensRotulo.filter((i) => casa(i, termo)),
    [termo],
  );

  // Enquanto a busca casa exatamente um item, ele vira o veredito — assim
  // digitar o nome já responde, sem precisar clicar.
  const veredito =
    escolhido ?? (termo.trim() && filtrados.length === 1 ? filtrados[0] : null);

  const buscouSemAchar = termo.trim().length > 1 && filtrados.length === 0;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-card">
      <div className="flex items-center justify-between gap-4 bg-foreground px-5 py-3.5">
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/85">
          Ingredientes
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/60">
          {totaisRotulo.contem} são leite
        </span>
      </div>

      <div className="p-5">
        <label htmlFor="ingrediente" className="sr-only">
          Nome do ingrediente
        </label>
        <input
          id="ingrediente"
          type="search"
          autoComplete="off"
          value={termo}
          onChange={(e) => {
            setTermo(e.target.value);
            setEscolhido(null);
          }}
          placeholder="Digite um ingrediente do rótulo…"
          className="w-full rounded-lg border border-border bg-background px-4 py-3
                     text-base text-foreground placeholder:text-subtle
                     focus:border-secondary focus:outline-none"
        />

        <div aria-live="polite">
          {veredito ? (
            <div
              className={`mt-4 flex items-start gap-3 rounded-lg border px-4 py-3 ${ESTILO[veredito.estado].caixa}`}
            >
              <span aria-hidden className="mt-0.5 text-lg leading-none">
                {ESTILO[veredito.estado].marca}
              </span>
              <span className="text-[0.95rem] leading-relaxed">
                <strong className="font-semibold">{veredito.n}</strong> ·{" "}
                {ESTILO[veredito.estado].titulo}. {veredito.obs}
              </span>
            </div>
          ) : null}

          {buscouSemAchar ? (
            <div className="mt-4 rounded-lg border border-border bg-surface px-4 py-3 text-[0.95rem] leading-relaxed text-muted-foreground">
              Não está na lista. Isso <strong>não</strong> quer dizer que é
              seguro — procure a linha{" "}
              <strong className="text-foreground">ALÉRGICOS</strong> logo abaixo
              dos ingredientes, que é obrigatória em todo rótulo brasileiro.
            </div>
          ) : null}
        </div>

        <ul className="mt-5 flex flex-wrap gap-2">
          {filtrados.map((item) => (
            <li key={item.n}>
              <button
                type="button"
                onClick={() =>
                  setEscolhido((atual) => (atual?.n === item.n ? null : item))
                }
                aria-pressed={escolhido?.n === item.n}
                className={`rounded-md border px-2.5 py-1.5 font-mono text-[0.8rem]
                            transition-colors ${ESTILO[item.estado].pill}`}
              >
                {item.n}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-primary" />
            é leite
          </span>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-caution" />
            depende da marca
          </span>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-secondary" />
            assusta, mas não é
          </span>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-subtle">{notaRotulo}</p>
      </div>
    </div>
  );
}
