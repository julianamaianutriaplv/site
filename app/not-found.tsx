import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container py-24 md:py-32 text-center">
      <p className="font-serif text-7xl text-primary mb-3">404</p>
      <h1 className="font-serif text-3xl text-foreground mb-4">
        Página não encontrada
      </h1>
      <p className="text-foreground/70 max-w-md mx-auto mb-8">
        O link pode ter sido alterado ou a página já não existe. Enquanto isso,
        explore o blog ou tire sua dúvida nas perguntas frequentes.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild>
          <Link href="/">Voltar para a home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/blog">Ir para o blog</Link>
        </Button>
      </div>
    </div>
  );
}
