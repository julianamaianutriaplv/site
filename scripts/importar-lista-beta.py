#!/usr/bin/env python3
"""
Importa o app "Rótulo Seguro" (projeto irmão de produtos) para o site, como
/receitas/beta — aplicando a pele do site por cima, sem tocar no template dela.

    python3 scripts/importar-lista-beta.py            # receitas só com título/selo
    python3 scripts/importar-lista-beta.py --receitas-completas

Por que a pele é um invólucro e não uma edição do template: o template mora no
repositório da Juliana, governado pelo CLAUDE.md dela; o site só precisa
redefinir as variáveis CSS (:root) e as fontes. Zero acoplamento.

Por que as receitas saem SEM ingredientes e preparo por padrão: elas são o
conteúdo dos e-books vendidos a R$27,90 — e este repositório é PÚBLICO. O que
entra aqui vai para o histórico do git para sempre.
"""
import json, re, sys
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
ORIGEM = SITE.parent / "JulianaMaiaNutriAPLV-produtos" / "saida" / "rotulo-seguro.html"
DESTINO = SITE / "public" / "receitas" / "beta.html"
COMPLETAS = "--receitas-completas" in sys.argv

EBOOK = {"doces": "25 Receitas Doces para APLV", "lanches": "25 Receitas de Lanches para APLV"}

PELE = """
<style id="pele-do-site">
/* Pele do site por cima do app: só variáveis e fontes. Tokens de
   tailwind.config.ts — coral = contém, âmbar = varia/atenção, verde = seguro/ação. */
:root{
  --marca:#46823E; --marca-forte:#2F5C29;
  --fundo:#FFFEF8; --superficie:#FFFFFF; --superficie-2:#FBF6EC;
  --tinta:#2A302F; --tinta-2:#5C6360; --apagado:#6E7572;
  --borda:rgba(42,48,47,.13); --borda-forte:rgba(42,48,47,.22);
  --ok:#2F5C29;     --ok-fundo:#E4F0DF;     --ok-borda:#46823E;
  --duvida:#8A5A12; --duvida-fundo:#FAEBD3; --duvida-borda:#B0741C;
  --nao:#B53A33;    --nao-fundo:#FBDDDA;    --nao-borda:#ED6D6B;
  --sombra:0 2px 4px rgba(42,48,47,.04), 0 12px 28px -12px rgba(42,48,47,.18);
  --raio:18px;
  --display:"Fraunces","Iowan Old Style",Georgia,serif;
  --dados:"Ubuntu",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
}
.corpo h3,.folha h2,.vazio p{font-family:var(--display);font-variation-settings:"SOFT" 40,"WONK" 1;
  font-weight:600;color:#9D3B2B;letter-spacing:-.01em}
.selo .nome,.meta,.aba,.badge,.placar,.faixa-idade,.ing-secao{
  font-family:"DM Mono",ui-monospace,SFMono-Regular,monospace}
.selo .nome{font-size:12px;letter-spacing:.16em}
.selo .porque{font-family:var(--dados);font-weight:500}
.aba{letter-spacing:.06em;font-size:11px}
.chip,.acao,.salvar,.trocar,.carregar,.mais,.avatar,.marcador b,.quem .nome{font-family:var(--dados)}
.marcador b{font-weight:700}
:focus-visible{outline:3px solid #ED6D6B}

/* cabeçalho fino do site, acima do app */
.site-topo{background:#FFFEF8;border-bottom:1px solid var(--borda)}
.site-topo .env{max-width:1100px;margin:0 auto;padding:10px 14px;display:flex;align-items:center;gap:12px}
.site-topo img{height:34px;width:auto;display:block}
.site-topo .beta{font-family:"DM Mono",ui-monospace,monospace;font-size:10.5px;letter-spacing:.16em;
  text-transform:uppercase;color:#8A5A12;background:#FAEBD3;border:1px solid #B0741C;
  border-radius:99px;padding:3px 9px}
.site-topo a.voltar{margin-left:auto;font-family:var(--dados);font-size:14px;font-weight:500;
  color:#2F5C29;text-decoration:none;min-height:40px;display:inline-flex;align-items:center;gap:6px}
.site-topo a.voltar:hover{text-decoration:underline}
.site-aviso{max-width:1100px;margin:0 auto;padding:10px 14px 0;font-family:var(--dados);
  font-size:13px;line-height:1.5;color:#5C6360}
.site-aviso b{color:#2A302F}
</style>
"""

CABECALHO = """
<div class="site-topo"><div class="env">
  <a href="/" aria-label="Dra. Juliana Maia Nutri APLV — início"><img src="/logo.svg" alt="Dra. Juliana Maia Nutri APLV"></a>
  <span class="beta">beta</span>
  <a class="voltar" href="/receitas">← Ebooks e receitas</a>
</div></div>
<div class="site-aviso"><b>Versão beta.</b> Lista de produtos e receitas em construção pela Dra. Juliana —
a maioria dos produtos ainda está em revalidação com os fabricantes, por isso muitos aparecem como
ATENÇÃO. O selo diz sempre o motivo. Confira o rótulo antes de consumir.</div>
"""


def main():
    if not ORIGEM.exists():
        sys.exit(f"origem não encontrada: {ORIGEM}\n(rode ./atualizar no projeto de produtos)")
    html = ORIGEM.read_text(encoding="utf-8")

    # 1) dados: receitas sem o miolo, a menos que peçam completas
    m = re.search(r'(<script id="dados" type="application/json">)(.*?)(</script>)', html, re.S)
    dados = json.loads(m.group(2).replace("<\\/", "</"))
    if not COMPLETAS:
        for r in dados["receitas"]:
            r["ing"] = []
            r["prep"] = ""
            r["dica"] = (f"Ingredientes e modo de preparo completos estão no ebook "
                         f"«{EBOOK.get(r['c'], 'de receitas')}», em julianamaianutriaplv.com.br/receitas.")
    novo = json.dumps(dados, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
    html = html[:m.start(2)] + novo + html[m.end(2):]

    # 2) fontes do site no lugar de Poppins/IBM Plex
    html = re.sub(r'<link rel="stylesheet" href="https://fonts\.googleapis\.com/css2\?family=Poppins[^"]*">',
                  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,400..700,0..100,0..1&family=Ubuntu:wght@400;500;700&family=DM+Mono:wght@400;500&display=swap">',
                  html)

    # 3) pele depois do <style> dela, cabeçalho antes do .topo
    html = html.replace("</style>", "</style>" + PELE, 1)
    html = html.replace('<div class="topo">', CABECALHO + '<div class="topo">', 1)

    # 4) esqueleto: o artifact envolvia isso; como arquivo estático, o site precisa fazer
    pagina = ('<!doctype html><html lang="pt-BR" data-theme="light"><head>'
              '<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
              '<meta name="robots" content="noindex, nofollow">'
              '<meta name="theme-color" content="#46823E">'
              '<link rel="icon" href="/favicon.ico">'
              + html.replace("<title>Rótulo Seguro</title>",
                             "<title>Lista de produtos e receitas (beta) — Dra. Juliana Maia</title>", 1)
              + "</html>")
    # o <title>/<link> dela ficam no <head>; o resto é body — o navegador resolve
    DESTINO.parent.mkdir(parents=True, exist_ok=True)
    DESTINO.write_text(pagina, encoding="utf-8")
    print(f"{len(dados['produtos'])} produtos · {len(dados['receitas'])} receitas "
          f"({'completas' if COMPLETAS else 'só título/selo/idade'}) · "
          f"{len(pagina)//1024} KB → {DESTINO.relative_to(SITE)}")
    if not COMPLETAS:
        vazou = sum(1 for r in dados["receitas"] if r["ing"] or r["prep"])
        assert vazou == 0, "receita com miolo escapou"
        print("conferido: nenhuma receita saiu com ingredientes ou preparo")


if __name__ == "__main__":
    main()
