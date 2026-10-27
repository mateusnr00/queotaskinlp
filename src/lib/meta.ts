// Constantes do rastreio da Meta, compartilhadas entre navegador e servidor.

/** ID do Pixel (dataset) da QUÉOTA SKIN. Público: aparece no HTML de qualquer
 *  site com Pixel. A env só existe para trocar sem mexer no código. */
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "2850933681947315";

/** Os únicos eventos que a página manda. O servidor recusa qualquer outro. */
export const EVENTOS_META = ["PageView", "Lead"] as const;
export type EventoMeta = (typeof EVENTOS_META)[number];

/** Cookie primário com um id anônimo do visitante, usado como external_id
 *  no Pixel e na API de Conversões (melhora o casamento dos eventos). */
export const COOKIE_EXTERNAL_ID = "qs_eid";
