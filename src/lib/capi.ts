// Monta o evento da API de Conversões da Meta (o lado servidor do Pixel).
//
// Puro e testável: recebe o que o servidor sabe da requisição e devolve o
// corpo do POST para /{pixel}/events. O envio em si fica na rota
// (src/app/api/evento/route.ts), que é a única que conhece o token.
//
// Por que mandar do servidor também: bloqueador de anúncio e o navegador do
// Instagram derrubam parte do Pixel. O mesmo evento sai pelos dois lados com o
// mesmo event_id, e a Meta deduplica (fica um só). Com isso a cobertura de
// eventos e o casamento (EMQ) sobem.

import { createHash } from "node:crypto";
import { EVENTOS_META, type EventoMeta } from "@/lib/meta";

export interface PedidoDeEvento {
  evento: EventoMeta;
  id: string;
  url: string;
  origem?: string;
  fbclid?: string;
}

/** Valida o corpo que o navegador manda. Devolve null se algo não bate. */
export function lerPedido(corpo: unknown, hostDaPagina: string): PedidoDeEvento | null {
  if (!corpo || typeof corpo !== "object") return null;
  const c = corpo as Record<string, unknown>;
  if (!EVENTOS_META.includes(c.evento as EventoMeta)) return null;
  if (typeof c.id !== "string" || !/^[a-zA-Z0-9-]{8,64}$/.test(c.id)) return null;
  if (typeof c.url !== "string") return null;
  let url: URL;
  try {
    url = new URL(c.url);
  } catch {
    return null;
  }
  // Só aceita evento desta própria página.
  if (url.host !== hostDaPagina) return null;
  const origem = typeof c.origem === "string" && /^[a-z]{1,16}$/.test(c.origem) ? c.origem : undefined;
  const fbclid =
    typeof c.fbclid === "string" && /^[\w-]{1,512}$/.test(c.fbclid) ? c.fbclid : undefined;
  return { evento: c.evento as EventoMeta, id: c.id, url: url.toString(), origem, fbclid };
}

export function sha256(valor: string): string {
  return createHash("sha256").update(valor.trim().toLowerCase()).digest("hex");
}

/** Primeiro IP do x-forwarded-for (o do visitante; os outros são proxies). */
export function ipDoVisitante(xForwardedFor: string | null, xRealIp: string | null): string | undefined {
  const ip = xForwardedFor?.split(",")[0]?.trim() || xRealIp?.trim();
  return ip || undefined;
}

export interface ContextoDoServidor {
  ip?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
  externalId?: string;
  /** Segundos desde 1970. */
  agora: number;
  testEventCode?: string;
}

export function montarEvento(pedido: PedidoDeEvento, ctx: ContextoDoServidor) {
  // Sem o cookie _fbc, monta o click id a partir do fbclid da URL do anúncio,
  // no formato que a Meta pede: fb.1.<milissegundos>.<fbclid>.
  const fbc = ctx.fbc || (pedido.fbclid ? `fb.1.${ctx.agora * 1000}.${pedido.fbclid}` : undefined);

  const userData: Record<string, unknown> = {};
  if (ctx.ip) userData.client_ip_address = ctx.ip;
  if (ctx.userAgent) userData.client_user_agent = ctx.userAgent;
  if (ctx.fbp) userData.fbp = ctx.fbp;
  if (fbc) userData.fbc = fbc;
  if (ctx.externalId) userData.external_id = [sha256(ctx.externalId)];

  const evento: Record<string, unknown> = {
    event_name: pedido.evento,
    event_time: ctx.agora,
    event_id: pedido.id,
    event_source_url: pedido.url,
    action_source: "website",
    user_data: userData,
  };
  if (pedido.evento === "Lead") {
    evento.custom_data = { content_name: "grupo_whatsapp", ...(pedido.origem ? { origem: pedido.origem } : {}) };
  }

  return {
    data: [evento],
    ...(ctx.testEventCode ? { test_event_code: ctx.testEventCode } : {}),
  };
}
