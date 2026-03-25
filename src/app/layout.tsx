// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Providers } from "@/components/providers";
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
  title: "DevNews - AI Developer News",
  description:
    "The freshest, most relevant news and updates for professional software developers. High signal, zero noise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#0a0a0a] font-sans text-[#fafafa] antialiased`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 border-b border-[#262626] bg-[#0a0a0a]/95 backdrop-blur-sm">
              <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4">
                <Link
                  href="/"
                  className="font-semibold text-[#fafafa] transition-colors hover:text-[#3b82f6]"
                >
                  DevNews
                </Link>
                <div className="text-xs text-[#71717a]">
                  {new Date().toISOString().split("T")[0]}
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t border-[#262626] py-4">
              <div className="mx-auto max-w-5xl px-4 text-center text-xs text-[#71717a]">
                DevNews
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
