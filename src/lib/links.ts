// O único destino desta página: o grupo do WhatsApp.
//
// O convite (chat.whatsapp.com/...) é um endereço público, não um segredo. Fica
// configurável por ambiente para trocar de grupo, quando o atual lotar, sem
// mexer no código.
//
// De propósito, nada aqui aponta para o queotaskin.com: esta landing vive
// desligada do app principal e não carrega nenhum link para ele.

export const LINK_DO_GRUPO =
  process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL ||
  "https://chat.whatsapp.com/GVscEAlDbLx2gfpGCcFKs3";

/** URL desta landing (www.queotaskin.vip, para onde o domínio raiz redireciona), para canonical e Open Graph. */
export const URL_DO_SITE = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.queotaskin.vip"
).replace(/\/+$/, "");
