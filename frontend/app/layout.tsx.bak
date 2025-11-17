import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "コア・ランゲージ・ハブ",
  description: "ビジネス成長のための実践的なマーケティング、デザイン、フレームワークの知識を提供するWebメディア",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-N86E2LCTFL" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];\n          function gtag(){dataLayer.push(arguments);}\n          gtag('js', new Date());\n          gtag('config', 'G-N86E2LCTFL');`}
        </Script>
        {children}
      </body>
    </html>
  );
}
