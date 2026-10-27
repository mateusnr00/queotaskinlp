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

const MAPAS = ["/mapas/dust2.webp", "/mapas/mirage.webp", "/mapas/inferno.webp", "/mapas/cache.webp"];

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

  // pt-24: respiro para a skin que sai pelo topo do card não ser cortada
  // pelo overflow horizontal do trilho.
  return (
    <div className="overflow-hidden pt-24 pb-4 pl-4">
      <ul className="esteira flex w-max">
        {voltas.map((s, i) => (
          <li
            key={`${s.arma}-${s.skin}-${i}`}
            aria-hidden={i >= ordem.length}
            className="w-60 shrink-0 pr-5 md:w-72"
          >
            <div
              className="card-skin relative h-52 rounded-[22px] md:h-60"
              style={{ "--raridade": COR_DA_RARIDADE[s.raridade] } as React.CSSProperties}
            >
              {/* Brasão do mapa, apagado no canto: só textura de CS. */}
              <Image
                src={MAPAS[i % MAPAS.length]}
                alt=""
                width={140}
                height={140}
                className="pointer-events-none absolute right-3 bottom-3 size-24 opacity-[0.13] grayscale md:size-28"
              />
              <div className="skin-pop pointer-events-none absolute -inset-x-[8%] -top-[38%] h-[90%]">
                <Image
                  src={s.imagem}
                  alt={`${s.arma} | ${s.skin}`}
                  fill
                  sizes="320px"
                  className="-rotate-12 object-contain drop-shadow-[0_22px_24px_rgba(0,0,0,0.75)]"
                />
              </div>
              <div className="absolute inset-x-5 bottom-4">
                <p className="hud text-[1.7rem] leading-none not-italic">{s.arma.replace("★ ", "")}</p>
                <p
                  className="mt-1 text-sm font-semibold"
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
