// Liga e desliga o pop-up de entrada pela Vercel, sem mexer no código.
//
// NEXT_PUBLIC_POPUP=1        mostra o pop-up (qualquer outro valor, ou vazio, esconde)
// NEXT_PUBLIC_POPUP_IMAGEM   troca a arte por outra URL (vazio usa a do repositório)
//
// São variáveis de build: depois de mudar, é preciso fazer Redeploy na Vercel.

export const POPUP_ATIVO = process.env.NEXT_PUBLIC_POPUP === "1";

export const POPUP_IMAGEM = process.env.NEXT_PUBLIC_POPUP_IMAGEM?.trim() || "/arte/popup-fnx.webp";
