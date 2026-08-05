import type { Metadata, Viewport } from "next";
import { cormorantGaramond, plusJakartaSans, greatVibes } from "./fonts";
import { SITE_CONFIG } from "@/utils/constants";
import { AudioProvider } from "@/context/AudioContext";
import { SiteConfigProvider } from "@/context/SiteConfigContext";
import "./globals.css";

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  manifest: "/manifest.json",
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    type: "website",
    locale: "en_US",
    siteName: "Forever You",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#fff5f7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${plusJakartaSans.variable} ${greatVibes.variable}`}
    >
      <body className="bg-background text-foreground antialiased min-h-screen relative overflow-x-hidden">
        <SiteConfigProvider>
          <AudioProvider>{children}</AudioProvider>
        </SiteConfigProvider>
      </body>
    </html>
  );
}
