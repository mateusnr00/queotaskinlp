import {
  RiLiveLine,
  RiNotification3Line,
  RiTrophyLine,
} from "@remixicon/react";

import { ArteDaSkin } from "@/components/arte-da-skin";
import { BotaoDoGrupo } from "@/components/botao-do-grupo";
import { BotaoFixoMobile } from "@/components/botao-fixo-mobile";
import { Marca } from "@/components/marca";
import { COR_DA_RARIDADE, SKINS } from "@/lib/skins";

// Uma página, um objetivo: entrar no grupo do WhatsApp. Sem menu, sem link
// para o site, sem segundo caminho. Quem chega do anúncio só tem uma porta.

const [DESTAQUE, APOIO] = SKINS;

const NO_GRUPO = [
  {
    icone: RiNotification3Line,
    titulo: "Sorteio novo, assim que abre",
    texto: "Skin, valor e link no mesmo aviso. Quem está no grupo vê primeiro.",
  },
  {
    icone: RiLiveLine,
    titulo: "Sorteio ao vivo",
    texto: "O link da transmissão chega na hora em que o sorteio começa.",
  },
  {
    icone: RiTrophyLine,
    titulo: "Quem ganhou",
    texto: "O resultado sai no grupo assim que o sorteio termina.",
  },
];

export default function Pagina() {
  return (
    <>
      <header className="wrap flex h-16 items-center justify-between">
        <Marca className="text-lg" />
        {/* No celular o botão do hero já está na dobra: o do topo só repetiria. */}
        <div className="hidden sm:block">
          <BotaoDoGrupo origem="topo" tamanho="pequeno" />
        </div>
      </header>

      <main>
        {/* HERO: texto e botão primeiro no celular, a skin logo abaixo. */}
        <section className="wrap grid items-center gap-10 pt-6 pb-16 md:grid-cols-[1.2fr_0.8fr] md:gap-8 md:pt-14 md:pb-24">
          <div>
            <h1 className="display entra text-[clamp(2.4rem,8.6vw,4rem)]">
              A próxima skin
              <br />
              <span className="text-red">sai primeiro</span> no grupo.
            </h1>
            <p
              className="entra mt-5 max-w-md text-lg leading-relaxed text-mute"
              style={{ "--atraso": "90ms" } as React.CSSProperties}
            >
              Todo sorteio de skin de CS2 é avisado no WhatsApp antes de
              qualquer outro lugar. Entrar é de graça.
            </p>
            <div
              id="cta-hero"
              className="entra mt-8"
              style={{ "--atraso": "180ms" } as React.CSSProperties}
            >
              <BotaoDoGrupo origem="hero" />
            </div>
          </div>

          <div
            className="entra relative mx-auto w-full max-w-[460px] pb-14 md:mx-0 md:justify-self-end"
            style={{ "--atraso": "120ms" } as React.CSSProperties}
          >
            <ArteDaSkin
              skin={DESTAQUE}
              prioridade
              tamanhos="(min-width: 768px) 460px, 92vw"
              className="aspect-[4/3] w-full"
            />
            <p className="mt-3 max-w-[50%] font-mono text-xs text-mute-2">
              {DESTAQUE.arma} | {DESTAQUE.skin}
            </p>
            <div className="absolute -right-3 -bottom-2 w-[46%] md:-right-10">
              <ArteDaSkin
                skin={APOIO}
                tamanhos="(min-width: 768px) 210px, 44vw"
                className="aspect-[4/3] w-full shadow-[0_24px_50px_-20px_rgba(0,0,0,0.9)]"
              />
            </div>
          </div>
        </section>

        {/* O QUE CHEGA: título de um lado, a lista do outro, sem cards. */}
        <section className="border-t border-line">
          <div className="wrap grid gap-10 py-16 md:grid-cols-[0.8fr_1.2fr] md:py-24">
            <h2 className="display revela text-[clamp(1.9rem,5vw,3rem)]">
              O que chega no seu WhatsApp
            </h2>
            <ul className="grid gap-9">
              {NO_GRUPO.map(({ icone: Icone, titulo, texto }) => (
                <li key={titulo} className="revela flex gap-4">
                  <Icone aria-hidden className="mt-0.5 size-6 shrink-0 text-red" />
                  <div>
                    <p className="text-lg font-extrabold">{titulo}</p>
                    <p className="mt-1 max-w-[46ch] leading-relaxed text-mute">{texto}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ESTEIRA: a variedade de skins que roda nos sorteios. */}
        <section aria-label="Skins que já rodaram nos sorteios" className="pb-20 md:pb-28">
          <p className="wrap mb-6 text-sm font-semibold text-mute">
            Faca, luva, AK, AWP. Tem de tudo nos sorteios.
          </p>
          <div className="esteira-trilho overflow-hidden">
            <ul className="esteira flex w-max gap-4 pl-4">
              {[...SKINS, ...SKINS].map((s, i) => (
                <li
                  key={`${s.arma}-${s.skin}-${i}`}
                  aria-hidden={i >= SKINS.length}
                  className="w-52 shrink-0 md:w-60"
                >
                  <ArteDaSkin
                    skin={s}
                    tamanhos="240px"
                    className="aspect-[4/3] w-full"
                  />
                  <p className="mt-2 truncate text-sm font-semibold">
                    {s.arma}{" "}
                    <span style={{ color: COR_DA_RARIDADE[s.raridade] }}>| {s.skin}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CHAMADA FINAL */}
        <section className="border-t border-line">
          <div className="wrap py-20 md:py-28">
            <div className="revela max-w-2xl">
              <h2 className="display text-[clamp(2rem,6vw,3.6rem)]">
                Entra, silencia se quiser e fica de olho.
              </h2>
              <p className="mt-4 text-mute">
                O grupo é gratuito e você sai quando quiser.
              </p>
              <div id="chamada-final" className="mt-8">
                <BotaoDoGrupo origem="final" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line pb-28 md:pb-0">
        <div className="wrap flex flex-col gap-2 py-8 text-xs text-mute-2 sm:flex-row sm:items-center sm:justify-between">
          <Marca className="text-sm" />
          <p>Não afiliado à Valve. Counter-Strike é marca da Valve Corporation.</p>
        </div>
      </footer>

      <BotaoFixoMobile alvo="cta-hero" />
    </>
  );
}
