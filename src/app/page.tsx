import Image from "next/image";

import { BotaoDoGrupo } from "@/components/botao-do-grupo";
import { BotaoFixoMobile } from "@/components/botao-fixo-mobile";
import { Cartao3D } from "@/components/cartao-3d";
import { EsteiraDeSkins } from "@/components/esteira-de-skins";
import { Marca } from "@/components/marca";
import { PopupDeEntrada } from "@/components/popup-de-entrada";
import { POPUP_ATIVO, POPUP_IMAGEM } from "@/lib/popup";
import { SKINS } from "@/lib/skins";

// LOBBY DO FNX. Uma porta só: o grupo do WhatsApp da comunidade do FNX. Sem
// menu, sem link para o site, nenhum outro caminho. O pop-up de entrada,
// quando ligado na Vercel (src/lib/popup.ts), leva ao mesmo grupo.

const FACA = SKINS[0];

const NO_GRUPO = ["Skin rara.", "Live do FNX.", "Resenha de CS."];

export default function Pagina() {
  return (
    <>
      <header className="wrap relative z-20 flex h-16 items-center justify-between">
        <Marca prioridade className="h-9 md:h-11" />
        {/* No celular o botão do hero já está na dobra: o do topo só repetiria. */}
        <div className="hidden sm:block">
          <BotaoDoGrupo origem="topo" tamanho="pequeno" />
        </div>
      </header>

      <main>
        {/* PARTIDA ENCONTRADA */}
        <section className="relative overflow-hidden">
          {/* Degradê do hero: vermelho subindo do canto do card até o preto. */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_85%_60%,rgba(255,59,48,0.32),transparent_70%),linear-gradient(180deg,transparent_60%,var(--color-ink))]" />
          </div>

          <div className="wrap relative grid items-center gap-6 pt-6 pb-24 md:grid-cols-[1fr_1.1fr] md:gap-4 md:pt-10 md:pb-32">
            <div className="relative z-10">
              <p className="rotulo-hud entra text-red">Comunidade do FNX</p>
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
                A comunidade de CS2 do FNX no WhatsApp. Skin, live e resenha num
                grupo só. Entrar é de graça.
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
            <div className="relative mx-auto mt-24 w-full max-w-[560px] md:mt-24 md:justify-self-end">
              <Cartao3D>
                <div className="relative aspect-[5/4]">
                  <div className="camada-fundo absolute inset-0 overflow-hidden rounded-[30px] border border-red/40 bg-[radial-gradient(120%_90%_at_30%_100%,#ff3b30_0%,#b3140c_35%,#3a0805_70%,#120405_100%)] shadow-[0_40px_80px_-30px_rgba(255,59,48,0.6)]">
                    {/* Luz de cima, para o card não ficar chapado. */}
                    <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_80%_0%,rgba(255,255,255,0.14),transparent_60%)]" />
                    <Image
                      src="/mapas/mirage.webp"
                      alt=""
                      width={180}
                      height={180}
                      className="absolute right-5 bottom-5 size-16 opacity-80 md:size-20"
                    />
                  </div>

                  {/* A faca atrás dele, cruzando a borda direita. */}
                  <div className="camada-faca pointer-events-none absolute -top-[13%] -right-[14%] h-[72%] w-[86%] md:-right-[24%]">
                    <Image
                      src={FACA.imagem}
                      alt={`${FACA.arma} | ${FACA.skin}`}
                      fill
                      priority
                      sizes="(min-width: 768px) 440px, 72vw"
                      className="object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.7)]"
                    />
                  </div>

                  {/* O FNX de pé no card: o corte do peito encosta na base e a
                      cabeça passa do topo. */}
                  <div className="camada-fnx pointer-events-none absolute bottom-0 left-[4%] w-[68%]">
                    <Image
                      src="/arte/fnx-bracos-cruzados.webp"
                      alt="FNX de braços cruzados"
                      width={833}
                      height={1242}
                      priority
                      sizes="(min-width: 768px) 380px, 64vw"
                      className="h-auto w-full drop-shadow-[0_28px_36px_rgba(0,0,0,0.7)]"
                    />
                  </div>
                </div>
              </Cartao3D>
            </div>
          </div>
        </section>

        {/* NO GRUPO: faixa vermelha inclinada, tipografia como imagem. */}
        <section aria-label="O que rola no grupo" className="faixa bg-red py-14 md:py-20">
          <div className="wrap">
            <p className="rotulo-hud text-ink/70">No grupo rola</p>
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
        <section className="pt-24 pb-4 md:pt-32 md:pb-8">
          <h2 className="hud revela wrap text-[clamp(2.6rem,7vw,4.6rem)]">
            Faca, luva, AK, AWP.
            <br />
            <span className="vazado">Tem de tudo.</span>
          </h2>
          <div className="mt-8 md:mt-10">
            <EsteiraDeSkins skins={SKINS} />
          </div>
        </section>

        {/* ACEITAR */}
        <section className="wrap revela relative pt-24 pb-24 md:pt-32 md:pb-32">
          {/* O FNX do troféu deitado em cima do card, fora do recorte dele. */}
          <div className="pointer-events-none absolute top-[calc(6rem-62px)] right-4 z-10 w-[260px] md:top-[calc(8rem-108px)] md:right-12 md:w-[440px]">
            <Image
              src="/arte/fnx-3d.webp"
              alt="FNX deitado segurando o troféu do Major"
              width={1100}
              height={449}
              sizes="(min-width: 768px) 440px, 260px"
              className="h-auto w-full drop-shadow-[0_18px_24px_rgba(0,0,0,0.6)]"
            />
          </div>
          <div className="relative overflow-hidden rounded-[30px] border border-zap/30 bg-surface px-6 py-16 text-center md:py-24">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -bottom-1/2 mx-auto h-full w-[80%] rounded-full bg-[radial-gradient(closest-side,rgba(37,211,102,0.2),transparent)] blur-2xl"
            />
            <p className="rotulo-hud relative text-zap">Grátis no WhatsApp</p>
            <h2 className="hud relative mx-auto mt-4 max-w-3xl text-[clamp(3rem,10vw,6.4rem)]">
              Bora pro grupo do FNX.
            </h2>
            <p className="relative mx-auto mt-5 max-w-md text-mute">
              Entra, silencia se quiser e sai quando quiser.
            </p>
            <div id="chamada-final" className="relative mt-10 flex justify-center">
              <BotaoDoGrupo origem="final" />
            </div>
          </div>
        </section>
      </main>

      {/* pb-24 no celular: espaço para o botão fixo não cobrir o rodapé. */}
      <footer className="border-t border-line pb-24 md:pb-0">
        <div className="wrap flex flex-col items-center gap-3 py-10 text-center md:flex-row md:justify-between md:py-8 md:text-left">
          <Marca className="h-9 shrink-0 md:h-8" />
          <p className="max-w-[30ch] text-[11px] leading-relaxed text-mute-2 md:max-w-none md:text-xs">
            Não afiliado à Valve. Counter-Strike é marca da Valve Corporation.
          </p>
        </div>
      </footer>

      <BotaoFixoMobile alvo="cta-hero" />
      {POPUP_ATIVO ? <PopupDeEntrada imagem={POPUP_IMAGEM} /> : null}
    </>
  );
}
