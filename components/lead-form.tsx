"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LeadFormProps {
  /** Identificador do material/fonte. Ex: "guia-rotulos" */
  source: string;
  /** Texto do CTA quando idle */
  cta?: string;
  /** Texto de sucesso customizado */
  successMessage?: string;
  /** Compacto: layout horizontal (bom para footer / newsletter) */
  compact?: boolean;
}

type Status = "idle" | "loading" | "success" | "error";

export function LeadForm({
  source,
  cta = "Receber por e-mail",
  successMessage = "Tudo certo! Em instantes você recebe o material no e-mail cadastrado.",
  compact = false,
}: LeadFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          source,
          consent,
        }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };

      if (data.ok) {
        setStatus("success");
        setMessage(data.message ?? successMessage);
        setName("");
        setEmail("");
        setConsent(false);
      } else {
        setStatus("error");
        setMessage(data.message ?? "Não conseguimos registrar. Tente novamente.");
      }
    } catch {
      setStatus("error");
      setMessage("Erro de conexão. Tente novamente.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-accent/60 bg-accent-soft p-5 text-foreground/85 flex gap-3 items-start">
        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="font-medium">{message}</p>
          <p className="mt-1 text-sm text-foreground/70">
            Verifique também a pasta de promoções/spam. Se não chegar em alguns
            minutos, confira se digitou o e-mail corretamente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? "space-y-3" : "space-y-4"}
      noValidate
    >
      <div className={compact ? "grid sm:grid-cols-2 gap-3" : "space-y-3"}>
        <div>
          <label htmlFor={`name-${source}`} className="sr-only">
            Nome
          </label>
          <Input
            id={`name-${source}`}
            name="name"
            placeholder="Seu nome"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            aria-invalid={status === "error" ? "true" : undefined}
          />
        </div>
        <div>
          <label htmlFor={`email-${source}`} className="sr-only">
            E-mail
          </label>
          <Input
            id={`email-${source}`}
            name="email"
            type="email"
            inputMode="email"
            placeholder="seu@email.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-invalid={status === "error" ? "true" : undefined}
          />
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm text-foreground/75 cursor-pointer">
        <input
          type="checkbox"
          name="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-1 h-4 w-4 rounded border-border accent-primary"
        />
        <span>
          Autorizo o uso do meu e-mail para receber o material e, eventualmente,
          novos conteúdos educativos sobre APLV. Posso descadastrar a qualquer
          momento. Li a{" "}
          <Link
            href="/privacidade"
            className="underline text-primary"
            target="_blank"
          >
            política de privacidade
          </Link>
          .
        </span>
      </label>

      {status === "error" && message ? (
        <p className="text-sm text-destructive" role="alert">
          {message}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={status === "loading" || !consent}
        size="lg"
        className={compact ? "w-full sm:w-auto" : "w-full sm:w-auto"}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          cta
        )}
      </Button>
    </form>
  );
}
