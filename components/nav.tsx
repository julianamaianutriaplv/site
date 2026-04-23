"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/sobre", label: "Sobre" },
  { href: "/aplv", label: "Sobre APLV" },
  { href: "/consultas", label: "Consultas" },
  { href: "/perguntas-frequentes", label: "Perguntas" },
  { href: "/blog", label: "Blog" },
  { href: "/materiais", label: "Materiais" },
  { href: "/contato", label: "Contato" },
];
// Nota: /depoimentos removido em conformidade com CFN Res. 599/2018
// (veda uso de depoimentos de pacientes em publicidade nutricional).

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
          aria-label="Juliana Maia Nutri APLV — página inicial"
        >
          <BrandMark />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-primary-soft"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild size="sm">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Agendar consulta
            </a>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-md hover:bg-primary-soft"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "lg:hidden border-t border-border bg-background",
          open ? "block" : "hidden",
        )}
      >
        <nav className="container py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="px-3 py-3 text-base text-foreground/80 hover:text-primary rounded-md hover:bg-primary-soft"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="mt-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              Agendar consulta
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
