import Image from "next/image";

import { BotaoDoGrupo } from "@/components/botao-do-grupo";
import { BotaoFixoMobile } from "@/components/botao-fixo-mobile";
import { Cartao3D } from "@/components/cartao-3d";
import { EsteiraDeSkins } from "@/components/esteira-de-skins";
import { Marca } from "@/components/marca";
import { SKINS } from "@/lib/skins";

// LOBBY DO FNX. A página é a tela de "partida encontrada" do CS2: quem joga
// reconhece na hora, e o botão verde de aceitar é o botão do WhatsApp.
// Uma porta só: sem menu, sem link para o site, nenhum outro caminho.

const FACA = SKINS[0];

const NO_GRUPO = ["Sorteio novo.", "Link da live.", "Quem ganhou."];

export default function Pagina() {
  return (
    <>
      <header className="wrap relative z-20 flex h-16 items-center justify-between">
        <Marca className="text-lg" />
        {/* No celular o botão do hero já está na dobra: o do topo só repetiria. */}
        <div className="hidden sm:block">
          <BotaoDoGrupo origem="topo" tamanho="pequeno" />
        </div>
      </header>

      <main>
        {/* PARTIDA ENCONTRADA */}
        <section className="relative overflow-hidden">
          {/* Brilho vermelho atrás do card. */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute top-[10%] right-[-15%] h-[620px] w-[760px] rounded-full bg-[radial-gradient(closest-side,rgba(255,59,48,0.28),transparent)] blur-2xl" />
          </div>

          <div className="wrap relative grid items-center gap-6 pt-6 pb-24 md:grid-cols-[1fr_1.1fr] md:gap-4 md:pt-10 md:pb-32">
            <div className="relative z-10">
              <p className="rotulo-hud entra text-red">Partida encontrada</p>
              <h1
                className="hud entra mt-4 text-[clamp(3.6rem,14vw,7.4rem)]"
                style={{ "--atraso": "80ms" } as React.CSSProperties}
              >
                O lobby
                <br />
                do <span className="text-red">FNX</span>
                <br />
                <span className="vazado">tá aberto.</span>
              </h1>
              <p
                className="entra mt-6 max-w-sm text-lg leading-relaxed text-mute"
                style={{ "--atraso": "160ms" } as React.CSSProperties}
              >
                Todo sorteio de skin de CS2 cai primeiro no grupo do WhatsApp.
                Entrar é de graça.
              </p>
              <div
                id="cta-hero"
                className="entra mt-9"
                style={{ "--atraso": "240ms" } as React.CSSProperties}
              >
                <BotaoDoGrupo origem="hero" />
              </div>
            </div>

            {/* O card: fundo dentro, faca e FNX saindo pela borda. */}
            <div className="relative mx-auto mt-16 w-full max-w-[560px] md:mt-0 md:justify-self-end">
              <Cartao3D>
                <div className="relative aspect-[5/4]">
                  <div className="camada-fundo absolute inset-0 overflow-hidden rounded-[30px] border border-red/40 shadow-[0_40px_80px_-30px_rgba(255,59,48,0.55)]">
                    <Image
                      src="/arte/fundo-vermelho.webp"
                      alt=""
                      fill
                      priority
                      sizes="(min-width: 768px) 560px, 92vw"
                      className="object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(7,8,9,0.15)_10%,rgba(7,8,9,0.85)_75%)]" />
                    <Image
                      src="/mapas/mirage.webp"
                      alt=""
                      width={180}
                      height={180}
                      className="absolute top-5 left-5 size-16 opacity-80 md:size-20"
                    />
                  </div>

                  <div className="camada-faca pointer-events-none absolute -top-[30%] -right-[10%] h-[78%] w-[86%]">
                    <Image
                      src={FACA.imagem}
                      alt={`${FACA.arma} | ${FACA.skin}`}
                      fill
                      priority
                      sizes="(min-width: 768px) 480px, 80vw"
                      className="object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.7)]"
                    />
                  </div>

                  <div className="camada-fnx pointer-events-none absolute -bottom-[17%] -left-[9%] w-[112%]">
                    <Image
                      src="/arte/fnx-3d.webp"
                      alt="FNX deitado segurando o troféu do Major"
                      width={1100}
                      height={449}
                      priority
                      sizes="(min-width: 768px) 630px, 100vw"
                      className="h-auto w-full drop-shadow-[0_24px_30px_rgba(0,0,0,0.65)]"
                    />
                  </div>
                </div>
              </Cartao3D>
            </div>
          </div>
        </section>

        {/* CHEGA PRIMEIRO: faixa vermelha inclinada, tipografia como imagem. */}
        <section aria-label="O que chega no grupo" className="faixa bg-red py-14 md:py-20">
          <div className="wrap">
            <p className="rotulo-hud text-ink/70">No grupo chega primeiro</p>
            <ul className="mt-3 flex flex-col gap-1 md:flex-row md:flex-wrap md:gap-x-8">
              {NO_GRUPO.map((t, i) => (
                <li
                  key={t}
                  className={`hud text-[clamp(3rem,9vw,6rem)] ${i === 1 ? "text-ink" : "text-paper"}`}
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* O QUE RODA: cards com a skin saindo pelo topo, em ordem aleatória. */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24">
          <h2 className="hud revela wrap text-[clamp(2.6rem,7vw,4.6rem)]">
            Faca, luva, AK, AWP.
            <br />
            <span className="vazado">Tem de tudo.</span>
          </h2>
          <div className="mt-4">
            <EsteiraDeSkins skins={SKINS} />
          </div>
        </section>

        {/* ACEITAR */}
        <section className="wrap pb-24 md:pb-32">
          <div className="revela relative overflow-hidden rounded-[30px] border border-zap/30 bg-surface px-6 py-16 text-center md:py-24">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -bottom-1/2 mx-auto h-full w-[80%] rounded-full bg-[radial-gradient(closest-side,rgba(37,211,102,0.2),transparent)] blur-2xl"
            />
            <p className="rotulo-hud relative text-zap">Sua partida está pronta</p>
            <h2 className="hud relative mx-auto mt-4 max-w-3xl text-[clamp(3rem,10vw,6.4rem)]">
              Aceita e cola no lobby.
            </h2>
            <p className="relative mx-auto mt-5 max-w-md text-mute">
              O grupo é gratuito e você sai quando quiser.
            </p>
            <div id="chamada-final" className="relative mt-10 flex justify-center">
              <BotaoDoGrupo origem="final" />
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
