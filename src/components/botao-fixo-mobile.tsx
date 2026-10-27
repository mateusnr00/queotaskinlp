"use client";

// Botão fixo no rodapé do celular. Só aparece quando o botão do hero sai da
// tela, para nunca existirem dois CTAs iguais disputando a mesma vista.
// IntersectionObserver, sem ouvir scroll.

import { useEffect, useState } from "react";
import { BotaoDoGrupo } from "@/components/botao-do-grupo";

export function BotaoFixoMobile({ alvo }: { alvo: string }) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = document.getElementById(alvo);
    const final = document.getElementById("chamada-final");
    if (!el) return;
    const vistos = new Map<Element, boolean>();
    const obs = new IntersectionObserver((entradas) => {
      for (const e of entradas) vistos.set(e.target, e.isIntersecting);
      const algumCtaNaTela = [...vistos.values()].some(Boolean);
      setVisivel(!algumCtaNaTela);
    });
    obs.observe(el);
    if (final) obs.observe(final);
    return () => obs.disconnect();
  }, [alvo]);

  return (
    <div
      aria-hidden={!visivel}
      className={`botao-fixo fixed inset-x-0 bottom-0 z-40 px-4 pt-3 md:hidden ${visivel ? "botao-fixo--on" : ""}`}
    >
      <BotaoDoGrupo origem="fixo" tamanho="medio" largo />
    </div>
  );
}
