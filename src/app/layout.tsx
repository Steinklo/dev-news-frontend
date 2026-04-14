// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Providers } from "@/components/providers";
import { HeaderNav } from "@/components/HeaderNav";
import { Zap } from "lucide-react";
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
  title: "DevNews — Developer News",
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
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#08090d] font-sans text-[#e8eaed] antialiased`}
      >
        <div className="noise-overlay" aria-hidden="true" />
        <Providers>
          <div className="relative z-10 flex min-h-screen flex-col">
            <header className="header-gradient sticky top-0 z-40 border-b border-[#1a1d28]/80 backdrop-blur-xl">
              <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
                <Link
                  href="/"
                  className="group flex items-center gap-2.5 transition-all"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/20 transition-all group-hover:bg-indigo-500/20 group-hover:ring-indigo-500/40">
                    <Zap className="h-4 w-4 text-indigo-400" />
                  </div>
                  <span className="text-lg font-semibold tracking-tight text-[#e8eaed]">
                    DevNews
                  </span>
                </Link>
                <div className="text-xs text-[#5a6070]">
                  {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </div>
              </div>
              <HeaderNav />
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t border-[#1a1d28]">
              <div className="mx-auto max-w-6xl px-6 py-8">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                  <div className="flex items-center gap-2">
                    <Zap className="h-3.5 w-3.5 text-indigo-400/60" />
                    <span className="text-sm text-[#5a6070]">
                      DevNews
                    </span>
                  </div>
                  <p className="text-[11px] text-[#3a3f52]">
                    Developer news, curated daily
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
