import Image from "next/image";

// A logo oficial da QUÉOTA SKIN (letras prateadas, mira vermelha no O).
// A arte é larga (900x241); quem usa define só a altura pela className.

export function Marca({ className = "", prioridade = false }: { className?: string; prioridade?: boolean }) {
  return (
    <Image
      src="/arte/logo-queota-skin.webp"
      alt="QUÉOTA SKIN"
      width={900}
      height={241}
      priority={prioridade}
      className={`w-auto select-none ${className}`}
    />
  );
}
