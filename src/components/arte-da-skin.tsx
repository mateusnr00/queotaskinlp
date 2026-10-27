import Image from "next/image";
import { COR_DA_RARIDADE, type SkinDaVitrine } from "@/lib/skins";

// A arte da skin num palco com o brilho da raridade. Sempre object-contain,
// centrada: a skin aparece inteira, sem corte e sem esticar.
export function ArteDaSkin({
  skin,
  prioridade = false,
  className = "",
  tamanhos,
}: {
  skin: SkinDaVitrine;
  prioridade?: boolean;
  className?: string;
  tamanhos: string;
}) {
  return (
    <div
      className={`palco relative overflow-hidden rounded-2xl ${className}`}
      style={{ "--raridade": COR_DA_RARIDADE[skin.raridade] } as React.CSSProperties}
    >
      <Image
        src={skin.imagem}
        alt={`${skin.arma} | ${skin.skin}`}
        fill
        priority={prioridade}
        sizes={tamanhos}
        className="object-contain p-[8%] drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)]"
      />
    </div>
  );
}
