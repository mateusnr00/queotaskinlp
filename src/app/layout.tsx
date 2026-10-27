import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Public_Sans } from "next/font/google";
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

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const titulo = "QUÉOTA SKIN · Grupo de sorteios de skins de CS2";
const descricao =
  "Entre no grupo do WhatsApp e fique sabendo de cada sorteio de skin de CS2 antes de todo mundo. Grátis.";

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
    <html lang="pt-BR" className={`${publicSans.variable} ${jetbrains.variable}`}>
      <body>
        {children}
        <ScriptsDeAnalytics />
      </body>
    </html>
  );
}
