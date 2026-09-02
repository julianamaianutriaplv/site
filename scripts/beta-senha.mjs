#!/usr/bin/env node
/**
 * Define a senha da lista beta SEM ela passar por ninguém.
 *
 *   npm run beta:senha          → pede a senha escondida, sobe hash + pepper
 *                                 para a Cloudflare (wrangler secret put)
 *   npm run beta:senha -- --dev → em vez de subir, grava em .dev.vars para
 *                                 testar com `npm run preview`
 *
 * O que sobe: BETA_PEPPER (aleatório, 32 bytes) e BETA_SENHA_HASH
 * (HMAC-SHA256 do pepper sobre a senha). A senha em si não é gravada em
 * lugar nenhum. HMAC com pepper aleatório, e não PBKDF2 com muitas
 * iterações, por causa do limite de 10 ms de CPU do plano gratuito do
 * Workers — a força vem da senha longa e do pepper de 256 bits.
 */
import { createHmac, randomBytes } from "node:crypto";
import { spawnSync } from "node:child_process";
import { writeFileSync, existsSync, readFileSync } from "node:fs";
import readline from "node:readline";

const dev = process.argv.includes("--dev");

function perguntaEscondida(pergunta) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    const escreve = rl._writeToOutput;
    rl.question(pergunta, (resp) => { rl._writeToOutput = escreve; rl.close(); process.stdout.write("\n"); resolve(resp); });
    rl._writeToOutput = () => {};
  });
}

function sobeSegredo(nome, valor) {
  const r = spawnSync("npx", ["wrangler", "secret", "put", nome], { input: valor, encoding: "utf8", stdio: ["pipe", "inherit", "inherit"] });
  if (r.status !== 0) { console.error(`falhou ao subir ${nome}`); process.exit(1); }
}

const senha = await perguntaEscondida("Senha da lista beta (mínimo 12 caracteres, não aparece): ");
const de_novo = await perguntaEscondida("Repita a senha: ");
if (senha !== de_novo) { console.error("As duas não batem. Nada foi alterado."); process.exit(1); }
if (senha.length < 12) { console.error("Curta demais: use 12 caracteres ou mais. Nada foi alterado."); process.exit(1); }

const pepper = randomBytes(32).toString("hex");
const hash = createHmac("sha256", pepper).update(senha).digest();
const hashB64url = hash.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

if (dev) {
  const cookie = randomBytes(32).toString("hex");
  const linhas = [`BETA_PEPPER=${pepper}`, `BETA_SENHA_HASH=${hashB64url}`, `BETA_COOKIE_SECRET=${cookie}`];
  const atual = existsSync(".dev.vars") ? readFileSync(".dev.vars", "utf8").split("\n").filter((l) => !/^BETA_/.test(l) && l.trim()) : [];
  writeFileSync(".dev.vars", [...atual, ...linhas].join("\n") + "\n");
  console.log(".dev.vars atualizado (gitignored). Teste com: npm run preview");
} else {
  sobeSegredo("BETA_PEPPER", pepper);
  sobeSegredo("BETA_SENHA_HASH", hashB64url);
  console.log("\nSenha definida na Cloudflare. Vale a partir do próximo acesso — não precisa de deploy.");
}
