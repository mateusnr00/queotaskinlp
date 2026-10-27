// Rastreio da página: a visita (PageView) e o clique no grupo (Lead).
//
// Cada evento sai por dois caminhos com o MESMO event_id: o Pixel no
// navegador e a API de Conversões pelo servidor (/api/evento). A Meta junta
// os dois e conta um só. Falha em silêncio: rastreio nunca pode travar o clique.

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

function novoIdDeEvento(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
  }
}

function lerCookie(nome: string): string | undefined {
  return document.cookie.match(new RegExp(`(?:^|; )${nome}=([^;]+)`))?.[1];
}

/** Manda o evento para o servidor repassar à Meta. sendBeacon sobrevive à
 *  troca de página (o clique abre o WhatsApp); fetch keepalive é a reserva. */
function enviarAoServidor(evento: "PageView" | "Lead", id: string, origem?: string): void {
  const corpo = JSON.stringify({
    evento,
    id,
    url: window.location.href,
    origem,
    fbclid: new URLSearchParams(window.location.search).get("fbclid") ?? undefined,
  });
  try {
    if (navigator.sendBeacon?.("/api/evento", new Blob([corpo], { type: "application/json" }))) return;
  } catch {
    /* cai no fetch */
  }
  fetch("/api/evento", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: corpo,
    keepalive: true,
  }).catch(() => {});
}

/** Espera o Pixel carregar e gravar o _fbp (até ~3s): com ele o evento do
 *  servidor casa melhor. Passado o prazo, segue sem. */
function quandoOPixelEstiverPronto(fn: () => void): void {
  let tentativas = 0;
  const tentar = () => {
    if ((window.fbq && lerCookie("_fbp")) || tentativas++ >= 15) fn();
    else window.setTimeout(tentar, 200);
  };
  tentar();
}

/** A visita, uma vez por carregamento. */
export function registrarVisita(): void {
  if (typeof window === "undefined") return;
  const id = novoIdDeEvento();
  quandoOPixelEstiverPronto(() => {
    try {
      window.fbq?.("track", "PageView", {}, { eventID: id });
    } catch {
      /* noop */
    }
    enviarAoServidor("PageView", id);
  });
}

/** Entrar no grupo: Lead na Meta, whatsapp_click no GA. */
export function registrarCliqueNoGrupo(origem: string): void {
  if (typeof window === "undefined") return;
  const id = novoIdDeEvento();
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "whatsapp_click", origem });
    window.fbq?.("track", "Lead", { content_name: "grupo_whatsapp", origem }, { eventID: id });
    window.gtag?.("event", "whatsapp_click", { origem });
  } catch {
    /* noop */
  }
  enviarAoServidor("Lead", id, origem);
}
