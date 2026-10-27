// Rastreio do clique no WhatsApp, o único evento que importa nesta página.
//
// Os IDs são públicos e opcionais: sem eles nada é carregado e a página
// funciona igual. Falha em silêncio, analytics nunca pode travar o clique.

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/** Registra a entrada no grupo como Lead (Meta) e whatsapp_click (GA). */
export function registrarCliqueNoGrupo(origem: string): void {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "whatsapp_click", origem });
    window.fbq?.("track", "Lead", { content_name: "grupo_whatsapp", origem });
    window.gtag?.("event", "whatsapp_click", { origem });
  } catch {
    /* noop */
  }
}
