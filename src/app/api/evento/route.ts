// Recebe o evento do navegador e repassa para a API de Conversões da Meta.
//
// O token (META_CAPI_TOKEN) só existe no servidor, como variável de ambiente
// da Vercel. Nunca vai para o navegador nem para o repositório. Sem ele, a
// rota responde e não faz nada: o Pixel do navegador segue funcionando.
//
// Responde na hora e manda para a Meta depois (after), para o clique no botão
// nunca esperar a Meta.

import { after, type NextRequest } from "next/server";
import { ipDoVisitante, lerPedido, montarEvento } from "@/lib/capi";
import { COOKIE_EXTERNAL_ID, META_PIXEL_ID } from "@/lib/meta";

const VERSAO_DA_API = "v26.0";

export async function POST(req: NextRequest) {
  const token = process.env.META_CAPI_TOKEN;
  if (!token || !META_PIXEL_ID) return new Response(null, { status: 204 });

  let corpo: unknown;
  try {
    corpo = await req.json();
  } catch {
    return new Response(null, { status: 400 });
  }

  const pedido = lerPedido(corpo, req.nextUrl.host);
  if (!pedido) return new Response(null, { status: 400 });

  const payload = montarEvento(pedido, {
    ip: ipDoVisitante(req.headers.get("x-forwarded-for"), req.headers.get("x-real-ip")),
    userAgent: req.headers.get("user-agent") ?? undefined,
    fbp: req.cookies.get("_fbp")?.value,
    fbc: req.cookies.get("_fbc")?.value,
    externalId: req.cookies.get(COOKIE_EXTERNAL_ID)?.value,
    agora: Math.floor(Date.now() / 1000),
    testEventCode: process.env.META_TEST_EVENT_CODE || undefined,
  });

  after(async () => {
    try {
      const r = await fetch(`https://graph.facebook.com/${VERSAO_DA_API}/${META_PIXEL_ID}/events`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        // O token vai no corpo, não na URL: URL acaba em log.
        body: JSON.stringify({ ...payload, access_token: token }),
      });
      if (!r.ok) console.error("[capi]", pedido.evento, r.status, await r.text());
    } catch (e) {
      console.error("[capi]", pedido.evento, "falhou", e);
    }
  });

  return new Response(null, { status: 202 });
}
