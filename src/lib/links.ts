// O único destino desta página: o grupo do WhatsApp.
//
// O convite (chat.whatsapp.com/...) é um endereço público, não um segredo. Fica
// configurável por ambiente para trocar de grupo, quando o atual lotar, sem
// mexer no código. O padrão é o mesmo grupo que a landing welcome/ já usa.
//
// De propósito, nada aqui aponta para o queotaskin.com: esta landing vive
// desligada do app principal e não carrega nenhum link para ele.

export const LINK_DO_GRUPO =
  process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL ||
  "https://chat.whatsapp.com/EtgVyfUofoCExqFOHtROVC";

/** URL desta landing, para canonical e Open Graph. */
export const URL_DO_SITE = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/+$/, "");
