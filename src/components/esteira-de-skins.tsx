"use client";

// Carrossel horizontal automático das skins, em ordem aleatória a cada visita.
//
// O servidor entrega a ordem do catálogo (o HTML estático é igual para todo
// mundo e a hidratação não diverge). Na hidratação, o useSyncExternalStore
// troca para a ordem embaralhada, sorteada uma vez por carregamento da página.
//
// A faixa roda SEMPRE, mesmo com "reduzir movimento" ligado no sistema: no
// Windows isso vem ligado em muita máquina e a faixa congelava virando uma
// barra de rolagem. Mesma decisão do app principal (globals.css de lá). Para
// quem quiser parar, passar o dedo ou o mouse por cima pausa.

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { COR_DA_RARIDADE, type SkinDaVitrine } from "@/lib/skins";

function embaralhar<T>(lista: T[]): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// A ordem sorteada fica guardada: o snapshot precisa ser estável entre
// renders, senão o React entra em loop.
const sorteadas = new WeakMap<SkinDaVitrine[], SkinDaVitrine[]>();
function ordemSorteada(skins: SkinDaVitrine[]): SkinDaVitrine[] {
  let ordem = sorteadas.get(skins);
  if (!ordem) {
    ordem = embaralhar(skins);
    sorteadas.set(skins, ordem);
  }
  return ordem;
}

const semAssinatura = () => () => {};

export function EsteiraDeSkins({ skins }: { skins: SkinDaVitrine[] }) {
  const ordem = useSyncExternalStore(
    semAssinatura,
    () => ordemSorteada(skins),
    () => skins,
  );

  // Duas voltas da mesma lista: a animação anda -50% e emenda sem pulo.
  const voltas = [...ordem, ...ordem];

  // pt-3: só o respiro do card subindo no hover.
  return (
    <div className="overflow-hidden pt-3 pb-4 pl-4">
      <ul className="esteira flex w-max">
        {voltas.map((s, i) => (
          <li
            key={`${s.arma}-${s.skin}-${i}`}
            aria-hidden={i >= ordem.length}
            className="w-52 shrink-0 pr-4 md:w-60"
          >
            <div
              className="card-skin relative overflow-hidden rounded-[20px]"
              style={{ "--raridade": COR_DA_RARIDADE[s.raridade] } as React.CSSProperties}
            >
              {/* A arte inteira, reta e centrada: object-contain, sem corte. */}
              <div className="skin-pop relative mx-auto h-32 w-[86%] md:h-36">
                <Image
                  src={s.imagem}
                  alt={`${s.arma} | ${s.skin}`}
                  fill
                  sizes="220px"
                  className="object-contain drop-shadow-[0_14px_14px_rgba(0,0,0,0.6)]"
                />
              </div>
              <div className="border-t border-white/5 px-4 pt-3 pb-4">
                <p className="hud truncate text-xl leading-none not-italic">{s.arma.replace("★ ", "")}</p>
                <p
                  className="mt-1 truncate text-[0.8rem] font-semibold"
                  style={{ color: COR_DA_RARIDADE[s.raridade] }}
                >
                  {s.skin}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
