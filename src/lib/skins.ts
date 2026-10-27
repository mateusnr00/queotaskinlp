// Vitrine de skins da landing.
//
// Espelho de linhas reais do catálogo SkinTemplate do app principal (nome,
// raridade e foto oficial da CDN da Steam), copiadas da vitrine do welcome/.
// É vitrine, não estoque: a página não promete nenhuma destas a ninguém, só
// mostra o tipo de skin que a comunidade curte.

export type Raridade = "COVERT" | "EXTRAORDINARY" | "CLASSIFIED";

export interface SkinDaVitrine {
  arma: string;
  skin: string;
  raridade: Raridade;
  imagem: string;
}

/** Hex oficial da Valve, para borda e brilho (mesmo valor do app principal). */
export const COR_DA_RARIDADE: Record<Raridade, string> = {
  COVERT: "#eb4b4b",
  EXTRAORDINARY: "#e4ae39",
  CLASSIFIED: "#d32ce6",
};

const STEAM = "https://community.akamai.steamstatic.com/economy/image/";

export const SKINS: SkinDaVitrine[] = [
  // A primeira é a do hero.
  { arma: "★ Butterfly Knife", skin: "Gamma Doppler Emerald", raridade: "COVERT", imagem: STEAM + "i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2qvxONzouBlSxa-lA8lvziMgIr9HifOOV5kFJp2Ee9b4Rntm4GxY7_ntQHc2o1DmH6r3Hgcv3w4t-pXU6ZzrPHQjQnfcepq0dwfRJw" },
  { arma: "★ M9 Bayonet", skin: "Slaughter", raridade: "COVERT", imagem: STEAM + "i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWad_vRzsvNocCW6khUz_WXQyN6uIH-fbFd1XJcjFuEJ50W6xofhYuu05AHdiYxNn3-viXlM7C91o7FVpU-ja-I" },
  { arma: "AK-47", skin: "Fire Serpent", raridade: "COVERT", imagem: STEAM + "i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0PSneqF-JeKDC2mE_u995LZWTTuygxIYvzSCkpu3cnvFPQB2DpUkROFY4Rntw93lP7i241DbiI1BxSuviHlKunk_6-sHU71lpPMTRLyP4Q" },
  { arma: "★ Specialist Gloves", skin: "Fade", raridade: "EXTRAORDINARY", imagem: STEAM + "i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJtuBtSha_nBovp3PQy42sdX6eagIjW5AlQOVetBXuk92xNLvg4gOMjd5AmC2ointB53w__a9cBqntWBk3" },
  { arma: "M4A1-S", skin: "Printstream", raridade: "COVERT", imagem: STEAM + "i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj_F7Rienhgk1tjyIpYPwJiPTcAAoCpsiEO5ZsUbpm9C2Zuni4VHW3o5EzSX62HxP7Sg96-hWVqYi_6TJz1aW0nxrkGs" },
  { arma: "AWP", skin: "Asiimov", raridade: "COVERT", imagem: STEAM + "i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6V-Kf2cGFidxOp_pewnF3nhxEt0sGnSzN76dH3GOg9xC8FyEORftRe-x9PuYurq71bW3d8UnjK-0H0YSTpMGQ" },
  { arma: "★ Skeleton Knife", skin: "Ultraviolet", raridade: "COVERT", imagem: STEAM + "i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-AAViA1PxmvORWQyC0nQlp4WTSnN74J3PCOAF0A5V3R-ACsUS6kYCzYrzk7geI2YlMzS2r2i1NvzErvbhVpSdBEA" },
  { arma: "Glock-18", skin: "Gamma Doppler", raridade: "COVERT", imagem: STEAM + "i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a4s2paalgIc-XAXeAzetkj_FhTjq2wSIgvzKGkbD1KCzPKhhxC5FyRbII4Ua_ltDhY-Ln41fW2I1Ayn_9ii5P7Xpr5ekHV6Mg__HekUifZpA8glcU" },
  { arma: "M4A4", skin: "Buzz Kill", raridade: "COVERT", imagem: STEAM + "i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSM_WQGmiC_uJ_t-l9AX22kBh0tm3Qn92qdS7GPARyW5t0QLQD4xi6w9XkZe3jsgDW3ogUnH3gznQeqfpfmso" },
];
