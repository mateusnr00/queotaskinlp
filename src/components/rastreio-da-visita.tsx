"use client";

// Dispara o PageView uma vez por carregamento (Pixel + servidor, mesmo id).

import { useEffect } from "react";
import { registrarVisita } from "@/lib/analytics";

let jaRegistrou = false;

export function RastreioDaVisita() {
  useEffect(() => {
    // O StrictMode monta duas vezes em dev: a trava evita PageView em dobro.
    if (jaRegistrou) return;
    jaRegistrou = true;
    registrarVisita();
  }, []);
  return null;
}
