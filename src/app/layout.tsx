// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Terminal } from "lucide-react";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevNews // Developer News Terminal",
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
        className={`${geistMono.variable} min-h-screen bg-[#0d0d0d] font-mono antialiased`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 border-b border-[#1a4d1a] bg-[#0d0d0d]/95 backdrop-blur-sm">
              <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-mono text-[#33ff33] transition-all hover:text-[#66ff66]"
                >
                  <Terminal className="h-4 w-4" aria-hidden="true" />
                  <span className="tracking-wider">devnews</span>
                  <span className="text-[#1a8c1a]">~$</span>
                  <span className="cursor-blink" />
                </Link>
                <div className="text-xs text-[#1a8c1a]">
                  [{new Date().toISOString().split("T")[0]}]
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t border-[#1a4d1a] py-4">
              <div className="mx-auto max-w-5xl px-4 text-center font-mono text-xs text-[#1a8c1a]">
                <span className="text-[#33ff33]">&gt;</span> devnews v1.0.0 // high signal, zero noise
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
