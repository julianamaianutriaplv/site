import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { VerificadorRotulo } from "@/components/verificador-rotulo";
import { getAllPosts } from "@/lib/blog";
import { siteConfig, whatsappLink } from "@/lib/site";

const PACOTES = [
  {
    nome: "Pacote completo",
    destaque: true,
    itens: [
      { t: "1 consulta + 2 retornos, um a cada 20 dias, por vídeo", ok: true },
      { t: "2 meses tirando dúvidas pelo WhatsApp em dias úteis", ok: true },
      { t: "Prescrição de suplementação para mãe e criança, quando necessário", ok: true },
      { t: "Orientação minuciosa da dieta de substituição", ok: true },
      { t: "Lista de marcas seguras atualizada", ok: true },
    ],
  },
  {
    nome: "Pacote básico",
    destaque: false,
    itens: [
      { t: "1 consulta + 1 retorno depois de 20 dias, por vídeo", ok: true },
      { t: "Sem acompanhamento por WhatsApp entre as consultas", ok: false },
      { t: "Prescrição de suplementação para mãe e criança, quando necessário", ok: true },
      { t: "Orientação minuciosa da dieta de substituição", ok: true },
      { t: "Lista de marcas seguras atualizada", ok: true },
    ],
  },
];

const MATERIAIS = [
  {
    titulo: "25 receitas doces",
    capa: "/materiais/capa-doces.jpg",
    texto:
      "Sobremesas sem leite, sem ovo e sem glúten — para o seu filho e para você, que também está em dieta de exclusão.",
  },
  {
    titulo: "25 receitas de lanches",
    capa: "/materiais/capa-lanches.jpg",
    texto:
      "Tortas, salgados e pizzas sem leite, sem soja, sem ovo e sem glúten, fáceis de fazer em qualquer hora do dia.",
  },
];

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* ---------------------------------------------------------- hero */}
      <section className="secao pb-0 md:pb-0">
        <div className="shell grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="olho">
              Nutricionista clínica · {siteConfig.professional.crn}
            </p>

            <h1 className="mt-6 text-[clamp(2.6rem,6vw,4.2rem)]">
              O leite tem <span className="marcador">muitos nomes</span>. Você
              vai aprender todos.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground text-pretty">
              Sou a Juliana Maia. Descobri a APLV do meu filho aos 12 dias de
              vida e saí do consultório com uma folha cheia de nomes e nenhuma
              ideia do que fazer. Hoje ajudo mães e cuidadores a estabilizar os
              sintomas com um caminho claro — de mãe de alérgico para mãe de
              alérgico.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  Agendar consulta
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#rotulo">Ler um rótulo comigo</a>
              </Button>
            </div>

            <p className="mt-10 flex items-baseline gap-3 border-t border-border pt-6">
              <b className="font-serif text-3xl text-secondary-strong">7.000+</b>
              <span className="text-muted-foreground">
                famílias atendidas no Brasil e no exterior, com os sintomas
                estabilizados.
              </span>
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="arco overflow-hidden bg-surface-pessego">
              <Image
                src="/juliana-hero.jpg"
                alt="Juliana Maia, nutricionista especialista em APLV"
                width={1082}
                height={1600}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------- a folha / verificador */}
      <section id="rotulo" className="secao faixa-pessego mt-16 scroll-mt-20 md:mt-24">
        <div className="shell grid items-start gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="olho">A folha da gaveta</p>

            <blockquote className="mt-6 border-l-4 border-primary pl-6 font-serif text-[1.75rem] leading-tight text-terra">
              “Abriu uma gaveta e me entregou uma folha com vários nomes. Falou
              que eu tinha que ler todos os rótulos.”
            </blockquote>
            <p className="mt-3 text-sm text-subtle">
              Juliana, sobre a consulta em que descobriu a APLV do João Artur.
            </p>

            <p className="mt-6 text-muted-foreground">
              Foi assim que começou. Uma folha, um supermercado inteiro pela
              frente e a sensação de que qualquer descuido machucava o meu
              filho. Refiz essa folha do jeito que eu queria ter recebido: com o
              que é leite, o que só parece, e o porquê de cada um.
            </p>

            <div className="mt-6 rounded-xl bg-white/70 p-5 text-[0.95rem] leading-relaxed text-muted-foreground">
              <strong className="text-foreground">A regra de ouro:</strong> todo
              rótulo brasileiro é obrigado a trazer, logo abaixo dos
              ingredientes, a frase{" "}
              <strong className="text-foreground">
                “ALÉRGICOS: CONTÉM DERIVADOS DE LEITE”
              </strong>
              . Comece por ela. A lista de nomes serve para quando a dúvida
              continuar — e para os nomes que confundem até quem já lê rótulo há
              anos.
            </div>
          </div>

          <VerificadorRotulo />
        </div>
      </section>

      {/* ------------------------------------------------------- história */}
      <section className="secao">
        <div className="shell grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div className="relative mx-auto w-full max-w-xs lg:max-w-none">
            {/* Bloco coral deslocado atrás — o retrato é retangular, então a
                moldura precisa aparecer por fora e não por baixo da foto. */}
            <div
              aria-hidden
              className="absolute -bottom-3 -right-3 h-full w-full rounded-xl bg-primary"
            />
            <div className="relative overflow-hidden rounded-xl">
              <Image
                src="/juliana-retrato.jpg"
                alt="Juliana Maia"
                width={1070}
                height={1600}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div>
            <p className="olho">17 de maio de 2016</p>
            <h2 className="mt-5 text-[clamp(2rem,4vw,2.75rem)]">
              Eu estava do outro lado dessa tela
            </h2>

            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Exausta, de pijama, quase duas semanas sem dormir. Troquei a
                fralda do João Artur e ela estava cheia de sangue.
              </p>
              <p>
                A pediatra confirmou a APLV e mandou tirar leite e derivados da
                minha alimentação. Eu era nutricionista e mesmo assim saí dali
                sem saber por onde começar. Os sintomas melhoravam, voltavam, e
                a culpa vinha junto.
              </p>
              <p>
                Foram anos estudando alergia alimentar para conseguir cuidar do
                meu filho — e depois para cuidar das famílias que chegavam com a
                mesma cara de susto que eu tive. Hoje ele está curado. É por isso
                que eu sei exatamente onde você está.
              </p>
            </div>

            <p className="mt-6 font-serif text-2xl italic text-terra">
              Juliana Maia
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">
              Nutricionista clínica · {siteConfig.professional.crn}
            </p>

            <Button asChild variant="outline" className="mt-6">
              <Link href="/sobre">Ler a história inteira</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ consultas */}
      <section className="secao faixa-creme">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="olho olho-centro">Atendimento</p>
            <h2 className="mt-5 text-[clamp(2rem,4vw,2.75rem)]">
              Consulta individual, online, de qualquer lugar
            </h2>
            <p className="mt-5 text-muted-foreground">
              Análise e orientação da dieta, prescrição de suplementos quando
              necessário, avaliação da fórmula infantil e a lista de marcas
              seguras atualizada.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {PACOTES.map((p) => (
              <div
                key={p.nome}
                className={`relative rounded-xl border bg-white p-7 ${
                  p.destaque
                    ? "border-secondary/40 shadow-card"
                    : "border-border"
                }`}
              >
                {p.destaque ? (
                  <span className="absolute -top-3 left-7 rounded-full bg-secondary px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white">
                    Mais escolhido
                  </span>
                ) : null}

                <h3 className="text-2xl">{p.nome}</h3>

                <ul className="mt-5 space-y-3">
                  {p.itens.map((i) => (
                    <li key={i.t} className="flex gap-3 text-[0.95rem]">
                      <span
                        aria-hidden
                        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                          i.ok
                            ? "bg-secondary-soft text-secondary-strong"
                            : "bg-primary-soft text-primary-strong"
                        }`}
                      >
                        {i.ok ? (
                          <Check className="h-3 w-3" strokeWidth={3} />
                        ) : (
                          <X className="h-3 w-3" strokeWidth={3} />
                        )}
                      </span>
                      <span
                        className={
                          i.ok ? "text-muted-foreground" : "text-subtle"
                        }
                      >
                        {i.t}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant={p.destaque ? "primary" : "outline"}
                  className="mt-7"
                >
                  <a
                    href={whatsappLink(
                      siteConfig.contact.whatsapp,
                      `Olá! Quero saber os valores do ${p.nome}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver valores no WhatsApp
                  </a>
                </Button>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Emito nota fiscal para reembolso no plano de saúde e no Imposto de
            Renda.{" "}
            <Link href="/consultas" className="text-secondary-strong underline">
              Ver tudo o que está incluído
            </Link>
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------ materiais */}
      <section className="secao">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="olho olho-centro">Para o dia a dia</p>
            <h2 className="mt-5 text-[clamp(2rem,4vw,2.75rem)]">
              Materiais que resolvem a semana
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {MATERIAIS.map((m) => (
              <article
                key={m.titulo}
                className="overflow-hidden rounded-xl border border-border bg-white"
              >
                <div className="grid place-items-center bg-surface-pessego-2 p-8">
                  <Image
                    src={m.capa}
                    alt={m.titulo}
                    width={420}
                    height={300}
                    className="h-44 w-auto object-contain drop-shadow-md"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl">{m.titulo}</h3>
                  <p className="mt-3 text-[0.95rem] text-muted-foreground">
                    {m.texto}
                  </p>
                  <Button asChild variant="outline" className="mt-5">
                    <Link href="/materiais">Conhecer</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- sobre APLV */}
      <section className="secao faixa-creme">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="olho olho-centro">Sobre APLV</p>
            <h2 className="mt-5 text-[clamp(2rem,4vw,2.75rem)]">
              Entenda o que está acontecendo
            </h2>
            <p className="mt-5 text-muted-foreground">
              Leituras para quem acabou de ouvir o diagnóstico — ou ainda
              desconfia dele.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug}>
                <h3 className="text-xl leading-snug">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 text-[0.95rem] text-muted-foreground">
                  {post.description}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-secondary-strong"
                >
                  Ler o artigo <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/blog">Ver todos os artigos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- faixa final */}
      <section className="secao faixa-verde">
        <div className="shell mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(2rem,4.5vw,3rem)]">
            Vamos começar pelo começo?
          </h2>
          <p className="mt-5 text-white/85">
            Na primeira consulta a gente organiza a dieta, revisa a fórmula,
            define a suplementação e você sai com um plano — não com uma folha
            de nomes.
          </p>
          <Button asChild variant="light" size="lg" className="mt-8">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              Agendar pelo WhatsApp
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
