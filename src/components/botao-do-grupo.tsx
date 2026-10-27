"use client";

// O botão da página. Todo CTA sai daqui, com o mesmo texto e o mesmo destino,
// para nenhuma seção prometer outra coisa. É um <a> de verdade: sem JS, o link
// continua funcionando, só o rastreio fica de fora.

import { RiWhatsappFill } from "@remixicon/react";
import { LINK_DO_GRUPO } from "@/lib/links";
import { registrarCliqueNoGrupo } from "@/lib/analytics";

type Tamanho = "grande" | "medio" | "pequeno";

const TAMANHO: Record<Tamanho, string> = {
  grande: "h-16 px-9 text-2xl gap-3",
  medio: "h-13 px-6 text-xl gap-2.5",
  pequeno: "h-10 px-4 text-base gap-2",
};

export function BotaoDoGrupo({
  origem,
  tamanho = "grande",
  largo = false,
  className = "",
}: {
  /** De onde veio o clique (hero, topo, final, fixo), para o funil. */
  origem: string;
  tamanho?: Tamanho;
  largo?: boolean;
  className?: string;
}) {
  return (
    <a
      href={LINK_DO_GRUPO}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => registrarCliqueNoGrupo(origem)}
      className={`botao-de-whatsapp botao-do-grupo inline-flex items-center justify-center whitespace-nowrap select-none ${TAMANHO[tamanho]} ${largo ? "w-full" : ""} ${className}`}
    >
      <RiWhatsappFill aria-hidden className="size-[1.25em] shrink-0" />
      Entrar no grupo
    </a>
  );
}
