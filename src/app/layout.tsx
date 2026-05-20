import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rift Roulette | League of Legends Randomizer",
  description: "Randomizador premium de campeones, roles, builds, runas, challenges y composiciones para League of Legends.",
  manifest: "/manifest.json",
  icons: [{ rel: "icon", url: "/icon.svg" }]
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
