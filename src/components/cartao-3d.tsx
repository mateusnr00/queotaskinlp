"use client";

// O card do hero inclina seguindo o mouse, como carta segurada na mão.
// Escreve só duas variáveis CSS direto no elemento, sem estado do React (nada
// de re-render a cada movimento). No toque não há hover, então fica parado.

import { useRef, type ReactNode } from "react";

const MAX_GRAUS = 9;

export function Cartao3D({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function mover(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty("--ry", `${(x * MAX_GRAUS * 2).toFixed(2)}deg`);
    ref.current.style.setProperty("--rx", `${(-y * MAX_GRAUS * 2).toFixed(2)}deg`);
  }

  function soltar() {
    ref.current?.style.removeProperty("--rx");
    ref.current?.style.removeProperty("--ry");
  }

  return (
    <div className="cena" onPointerMove={mover} onPointerLeave={soltar}>
      <div ref={ref} className={`cartao-3d ${className}`}>
        {children}
      </div>
    </div>
  );
}
