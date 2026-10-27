import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Public_Sans } from "next/font/google";
import "./globals.css";

import { URL_DO_SITE } from "@/lib/links";
import { ScriptsDeAnalytics } from "@/components/scripts-de-analytics";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-public-sans",
  display: "swap",
});

// Condensada pesada para títulos e rótulos de HUD: lembra a fonte da interface
// do CS2 (Stratum2), que não é livre.
const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-hud",
  display: "swap",
});

const titulo = "Lobby do FNX · Sorteios de skins de CS2 no WhatsApp";
const descricao =
  "O grupo da comunidade do FNX no WhatsApp: cada sorteio de skin de CS2 chega lá primeiro. Grátis.";

export const metadata: Metadata = {
  metadataBase: new URL(URL_DO_SITE),
  title: titulo,
  description: descricao,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "QUÉOTA SKIN",
    title: titulo,
    description: descricao,
    locale: "pt_BR",
  },
  twitter: { card: "summary_large_image", title: titulo, description: descricao },
};

export const viewport: Viewport = {
  themeColor: "#07090c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${publicSans.variable} ${barlow.variable}`}>
      <body>
        {children}
        <ScriptsDeAnalytics />
      </body>
    </html>
  );
}
