"""Monta o logo B como SVG genuinamente vetorial.

Duas metades:

  ícone  — o coração e a folha só existem como raster (o logo original é um
           JPEG de 1072px). São separados por tinta, ampliados 4x para o
           contorno sair suave, e vetorizados com potrace.

  texto  — "Dra. Juliana", "Maia" e "NUTRI APLV" são compostos em Nunito
           (variável, instanciada em 800 e 600), moldados pelo HarfBuzz para
           herdar o kerning real, e convertidos em contornos glifo a glifo.
           Nenhum <text> no arquivo final: só <path>.

As medidas reproduzem o lockup aprovado em logo-dra-alternativa-b.png.
"""
import io
import re
import subprocess
from pathlib import Path

import numpy as np
import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from PIL import Image, ImageFilter

S = Path(__file__).parent

CORAL = "#E46A65"
VERDE = "#6AAA88"

# ---------------------------------------------------------------- tipografia
FS_NOME = 128.0            # corpo do nome
TRACKING_NOME = -0.018     # em
ENTRELINHA = 0.99          # múltiplo do corpo
FS_SIG = 48.0              # corpo do "NUTRI APLV"
TRACKING_SIG = 0.13        # em — a assinatura é espacejada, como no original

# ------------------------------------------------------------------- lockup
ALTURA_ICONE = 300.0
VAO = 42.0


# =========================================================== ícone (potrace)
def separa_tintas(caminho):
    """Devolve duas máscaras booleanas (coral, verde) do mesmo tamanho."""
    im = Image.open(caminho).convert("RGBA")
    a = np.asarray(im).astype(float)
    rgb, alpha = a[:, :, :3], a[:, :, 3]
    tinta = alpha > 110
    # o PNG extraído guarda a cor PURA de cada tinta, então a separação é
    # por igualdade exata — comparar canais pegava borda antisserrilhada
    # e enchia o traço de respingo
    alvo = np.array([0x6A, 0xAA, 0x88], float)
    verde = tinta & (np.abs(rgb - alvo).sum(axis=2) < 30)
    coral = tinta & ~verde
    return coral, verde, im.size


def para_pbm(mask, destino, escala=8, desfoque=5.0):
    """Amplia, suaviza e grava PBM (1 = tinta), que é o que o potrace lê.

    O raster de origem é um recorte de JPEG: a borda carrega ondulação de
    compressão. Sem o desfoque antes do limiar, o potrace vetoriza fielmente
    esse ruído e o coração sai com marola. O desfoque roda na escala ampliada
    (5px a 8x ≈ 0,6px no original), o que apara a ondulação sem comer os
    cantos vivos da ponta do coração e das folhas.
    """
    im = Image.fromarray((mask * 255).astype(np.uint8), "L")
    im = im.resize((im.width * escala, im.height * escala), Image.LANCZOS)
    im = im.filter(ImageFilter.GaussianBlur(desfoque))
    bits = np.asarray(im) > 127
    h, w = bits.shape
    cab = f"P4\n{w} {h}\n".encode()
    # PBM cru: 1 = preto = tinta; bits empacotados por linha
    corpo = np.packbits(bits, axis=1).tobytes()
    Path(destino).write_bytes(cab + corpo)
    return w, h


def potrace_svg(pbm, svg):
    subprocess.run(
        ["potrace", "--backend", "svg", "--turdsize", "240",
         "--alphamax", "1.0", "--opttolerance", "0.6",
         "--output", str(svg), str(pbm)],
        check=True,
    )
    txt = Path(svg).read_text()
    vb = re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', txt)
    g = re.search(r"(<g[^>]*>)(.*?)(</g>)", txt, re.S)
    transform = re.search(r'transform="([^"]+)"', g.group(1)).group(1)
    corpo = g.group(2).strip()
    n = corpo.count("<path")
    return float(vb.group(1)), float(vb.group(2)), transform, corpo, n


# ====================================================== texto -> contornos
class Tipo:
    def __init__(self, ttf, peso):
        base = TTFont(ttf)
        inst = instancer.instantiateVariableFont(base, {"wght": peso})
        buf = io.BytesIO()
        inst.save(buf)
        self.bytes = buf.getvalue()
        self.tt = TTFont(io.BytesIO(self.bytes))
        self.upem = self.tt["head"].unitsPerEm
        self.glyphset = self.tt.getGlyphSet()
        self.ordem = self.tt.getGlyphOrder()
        face = hb.Face(self.bytes)
        self.hbfont = hb.Font(face)
        self.hbfont.scale = (self.upem, self.upem)

    def molda(self, texto):
        buf = hb.Buffer()
        buf.add_str(texto)
        buf.guess_segment_properties()
        hb.shape(self.hbfont, buf, {"kern": True, "liga": True})
        return list(zip(buf.glyph_infos, buf.glyph_positions))

    def linha(self, texto, corpo, tracking_em=0.0, extra_por_glifo=0.0):
        """Devolve (lista de (path_d, dx), largura) em unidades de desenho."""
        s = corpo / self.upem
        saida, x = [], 0.0
        moldado = self.molda(texto)
        for info, pos in moldado:
            nome = self.ordem[info.codepoint]
            pen = SVGPathPen(self.glyphset)
            self.glyphset[nome].draw(pen)
            d = pen.getCommands()
            if d:
                saida.append((d, x + pos.x_offset * s))
            x += pos.x_advance * s + tracking_em * corpo + extra_por_glifo
        largura = x - tracking_em * corpo - extra_por_glifo
        return saida, largura, s


def bloco(tipo, glifos, corpo_escala, x0, baseline, cor):
    partes = []
    for d, dx in glifos:
        partes.append(
            f'<path transform="translate({x0 + dx:.3f} {baseline:.3f}) '
            f'scale({corpo_escala:.6f} {-corpo_escala:.6f})" d="{d}"/>'
        )
    return f'<g fill="{cor}">' + "".join(partes) + "</g>"


def main():
    # -------------------------------------------------------------- ícone
    coral_m, verde_m, (iw, ih) = separa_tintas(S / "logo-icone.png")
    print(f"ícone raster: {iw}x{ih}px  "
          f"(coral {coral_m.sum()} px, verde {verde_m.sum()} px)")

    pecas = {}
    for nome, mask in (("coral", coral_m), ("verde", verde_m)):
        para_pbm(mask, S / f"icone-{nome}.pbm")
        w, h, transform, corpo, n = potrace_svg(
            S / f"icone-{nome}.pbm", S / f"icone-{nome}.svg")
        pecas[nome] = (w, h, transform, corpo)
        print(f"  potrace {nome:6s}: {n} contorno(s), viewBox {w:.0f}x{h:.0f}")

    vw, vh = pecas["coral"][0], pecas["coral"][1]
    assert (vw, vh) == (pecas["verde"][0], pecas["verde"][1]), "traços fora de registro"

    esc_icone = ALTURA_ICONE / vh
    larg_icone = vw * esc_icone

    # ------------------------------------------------------------- texto
    n800 = Tipo(S / "Nunito.ttf", 800)
    n600 = Tipo(S / "Nunito.ttf", 600)

    l1, w1, s1 = n800.linha("Dra. Juliana", FS_NOME, TRACKING_NOME)
    l2, w2, _ = n800.linha("Maia", FS_NOME, TRACKING_NOME)

    l3, w3, s3 = n600.linha("NUTRI APLV", FS_SIG, TRACKING_SIG)
    print(f"assinatura: largura {w3:.1f}, "
          f"altura de maiúscula {n600.tt['OS/2'].sCapHeight / n600.upem * FS_SIG:.1f}")

    asc = n800.tt["hhea"].ascent / n800.upem * FS_NOME
    desc = -n800.tt["hhea"].descent / n800.upem * FS_NOME
    caixa = FS_NOME * ENTRELINHA
    base1 = (caixa - (asc + desc)) / 2 + asc
    base2 = base1 + caixa
    alt_nome = caixa * 2
    cap_sig = n600.tt["OS/2"].sCapHeight / n600.upem * FS_SIG
    base3 = alt_nome + 22.0 + cap_sig

    col = max(w1, w2, w3)
    alt_texto = base3
    alt_total = max(ALTURA_ICONE, alt_texto)

    x_icone = 0.0
    y_icone = (alt_total - ALTURA_ICONE) / 2
    x_texto = larg_icone + VAO
    dy = (alt_total - alt_texto) / 2

    corpos = [
        f'<g transform="translate({x_icone:.3f} {y_icone:.3f}) '
        f'scale({esc_icone:.6f})">',
    ]
    for nome, cor in (("coral", CORAL), ("verde", VERDE)):
        _, _, transform, corpo = pecas[nome]
        corpos.append(f'<g fill="{cor}" transform="{transform}">{corpo}</g>')
    corpos.append("</g>")

    corpos.append(bloco(n800, l1, s1, x_texto + (col - w1) / 2, dy + base1, CORAL))
    corpos.append(bloco(n800, l2, s1, x_texto + (col - w2) / 2, dy + base2, CORAL))
    corpos.append(bloco(n600, l3, s3, x_texto + (col - w3) / 2, dy + base3, VERDE))

    larg_total = x_texto + col

    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'viewBox="0 0 {larg_total:.3f} {alt_total:.3f}" '
        f'width="{larg_total:.0f}" height="{alt_total:.0f}" '
        f'role="img" aria-label="Dra. Juliana Maia — Nutri APLV">'
        f"<title>Dra. Juliana Maia — Nutri APLV</title>"
        + "".join(corpos)
        + "</svg>"
    )
    destino = S / "logo-dra.svg"
    destino.write_text(svg)

    # o coração sozinho, para favicon e para a variante compacta do header
    so_icone = (
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'viewBox="0 0 {larg_icone:.3f} {ALTURA_ICONE:.3f}" '
        f'width="{larg_icone:.0f}" height="{ALTURA_ICONE:.0f}" '
        f'role="img" aria-label="Dra. Juliana Maia Nutri APLV">'
        f'<title>Dra. Juliana Maia Nutri APLV</title>'
        f'<g transform="scale({esc_icone:.6f})">'
        + "".join(
            f'<g fill="{cor}" transform="{pecas[n][2]}">{pecas[n][3]}</g>'
            for n, cor in (("coral", CORAL), ("verde", VERDE))
        )
        + "</g></svg>"
    )
    (S / "logo-icone.svg").write_text(so_icone)
    print(f"ícone só: {larg_icone:.0f}x{ALTURA_ICONE:.0f} "
          f"({len(so_icone)/1024:.1f} KB) -> {S / 'logo-icone.svg'}")
    print(f"\nSVG: {larg_total:.0f}x{alt_total:.0f}  "
          f"{len(svg)/1024:.1f} KB  ->  {destino}")
    print(f"  <path>: {svg.count('<path')}   <text>: {svg.count('<text')}")


main()
