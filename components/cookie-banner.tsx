"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const STORAGE_KEY = "jmn-aplv-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) setVisible(true);
    } catch {
      // ignora
    }
  }, []);

  function handleAccept() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ accepted: true, at: new Date().toISOString() }),
      );
    } catch {}
    setVisible(false);
  }

  function handleDecline() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ accepted: false, at: new Date().toISOString() }),
      );
    } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso sobre cookies"
      className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur animate-fade-in"
    >
      <div className="container py-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <p className="text-sm text-foreground/80 max-w-2xl">
          Usamos cookies essenciais para o funcionamento do site e, com seu
          consentimento, cookies de análise para entender como ele é utilizado
          (conforme LGPD). Você pode aceitar ou recusar a qualquer momento.{" "}
          <Link
            href="/privacidade"
            className="underline underline-offset-4 hover:text-primary"
          >
            Saiba mais
          </Link>
          .
        </p>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={handleDecline}>
            Recusar
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  );
}
