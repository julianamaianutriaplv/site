/**
 * Structured data (schema.org) renderizada no HTML do servidor.
 *
 * Deliberadamente NÃO usa `next/script`: com `strategy="afterInteractive"` o
 * schema só entra no DOM depois da hidratação. Isso deixa o rich result
 * dependente da fila de renderização do Google — e Bing, crawlers sociais e
 * crawlers de IA, que não executam JS, não veem nada. Como <script> simples,
 * o JSON-LD já sai no HTML estático.
 */
export function JsonLd({ id, data }: { id: string; data: unknown }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // Escapa "<" para que um valor de conteúdo não consiga fechar a tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
