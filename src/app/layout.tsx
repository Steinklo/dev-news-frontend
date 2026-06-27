// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Providers } from "@/components/providers";
import { HeaderNav } from "@/components/HeaderNav";
import { SocialLinks } from "@/components/SocialLinks";
import { GlobalProgress } from "@/components/GlobalProgress";
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
          <GlobalProgress />
          <div className="relative z-10 flex min-h-screen flex-col">
            <header className="header-gradient sticky top-0 z-40 border-b border-[#1a1d28]/80 backdrop-blur-xl">
              <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-6 sm:gap-6">
                <Link
                  href="/"
                  className="group flex shrink-0 items-center gap-2.5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/20 transition-all group-hover:bg-indigo-500/20 group-hover:ring-indigo-500/40">
                    <Zap className="h-4 w-4 text-indigo-400" />
                  </div>
                  <span className="text-lg font-semibold tracking-tight text-[#e8eaed]">
                    DevNews
                  </span>
                </Link>
                {/* Desktop: nav sits inline in the single header row */}
                <HeaderNav className="hidden min-w-0 flex-1 sm:flex" fade />
                <SocialLinks className="ml-auto shrink-0 sm:ml-0" />
              </div>
              {/* Mobile: nav drops to its own scrollable row with tighter pills */}
              <div className="border-t border-[#1a1d28]/60 sm:hidden">
                <div className="mx-auto max-w-6xl px-4 py-1.5">
                  <HeaderNav compact fade />
                </div>
              </div>
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
                  <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <SocialLinks />
                    <div className="flex items-center gap-4">
                      <Link
                        href="/privacy"
                        className="rounded text-[11px] text-[#5a6070] transition-colors hover:text-[#9aa0b0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                      >
                        Privacy
                      </Link>
                      <p className="text-[11px] text-[#3a3f52]">
                        Developer news, curated daily
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
