import type { Metadata } from "next";
import { cormorantGaramond, plusJakartaSans, greatVibes } from "./fonts";
import { SITE_CONFIG } from "@/utils/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
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
      <body className="bg-background text-foreground antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
