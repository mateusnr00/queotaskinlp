import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { LINK_DO_GRUPO } from "@/lib/links";

function arquivos(dir: string): string[] {
  return readdirSync(dir).flatMap((nome) => {
    const p = path.join(dir, nome);
    return statSync(p).isDirectory() ? arquivos(p) : [p];
  });
}

const fontes = arquivos(path.resolve(__dirname, "..")).filter(
  (f) => /\.(tsx?|css)$/.test(f) && !f.endsWith(".test.ts"),
);

describe("landing do grupo", () => {
  it("o destino padrão é um convite de grupo do WhatsApp", () => {
    expect(LINK_DO_GRUPO).toMatch(/^https:\/\/chat\.whatsapp\.com\/\w+/);
  });

  it("não carrega link para o app principal", () => {
    for (const f of fontes) {
      const codigo = readFileSync(f, "utf8").replace(/^\s*\/\/.*$/gm, "");
      expect(codigo, f).not.toMatch(/queotaskin\.com/);
    }
  });

  it("não usa travessão em lugar nenhum", () => {
    for (const f of fontes) {
      expect(readFileSync(f, "utf8"), f).not.toMatch(/[—–]/);
    }
  });
});
