// /entrar pula a página e cai direto no grupo. Serve para bio do Instagram,
// QR code e qualquer lugar onde a pessoa já decidiu entrar.

import { LINK_DO_GRUPO } from "@/lib/links";

export const dynamic = "force-static";

export function GET() {
  return Response.redirect(LINK_DO_GRUPO, 307);
}
