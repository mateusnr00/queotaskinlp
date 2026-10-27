"use client";

// Pop-up de entrada: o banner do FNX com o botão do grupo embaixo e um X para
// fechar e ver o site. Abre uma vez por sessão, logo que a página carrega.
//
// É um <dialog> nativo: Esc fecha, o foco fica preso dentro dele e o leitor de
// tela entende que é um modal, sem biblioteca. Clicar fora da arte também
// fecha. Se o sessionStorage falhar (aba anônima, bloqueio), abre do mesmo
// jeito: melhor mostrar de novo do que quebrar.

import Image from "next/image";
import { useEffect, useRef } from "react";
import { RiCloseLine } from "@remixicon/react";
import { BotaoDoGrupo } from "@/components/botao-do-grupo";

const CHAVE = "popup-de-entrada-visto";

function jaViu(): boolean {
  try {
    return window.sessionStorage.getItem(CHAVE) === "1";
  } catch {
    return false;
  }
}

function marcarVisto(): void {
  try {
    window.sessionStorage.setItem(CHAVE, "1");
  } catch {
    /* noop */
  }
}

export function PopupDeEntrada() {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogo = ref.current;
    if (!dialogo || jaViu()) return;
    dialogo.showModal();
    marcarVisto();
  }, []);

  function fechar() {
    ref.current?.close();
  }

  return (
    <dialog
      ref={ref}
      aria-label="Entrar no grupo do FNX"
      className="popup m-auto bg-transparent p-0"
      onClick={(e) => {
        // O clique no fundo escuro chega com o próprio <dialog> como alvo.
        if (e.target === e.currentTarget) fechar();
      }}
    >
      <div className="flex flex-col items-center gap-4 px-4 py-4">
        <div className="relative">
          <Image
            src="/arte/popup-fnx.webp"
            alt="FNX de terno com a logo da QUÉOTA SKIN"
            width={760}
            height={1270}
            priority
            sizes="420px"
            className="block h-[min(68dvh,620px)] w-auto rounded-[22px] border border-red/40 shadow-[0_30px_80px_-20px_rgba(255,59,48,0.55)]"
          />
          <button
            type="button"
            onClick={fechar}
            aria-label="Fechar e ver o site"
            className="absolute -top-3 -right-3 grid size-11 place-items-center rounded-full border border-white/20 bg-ink/90 text-paper backdrop-blur transition-transform hover:scale-105 active:scale-95"
          >
            <RiCloseLine aria-hidden className="size-6" />
          </button>
        </div>
        <BotaoDoGrupo origem="popup" largo className="max-w-[min(100%,372px)]" />
      </div>
    </dialog>
  );
}
