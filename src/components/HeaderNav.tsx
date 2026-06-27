// src/components/HeaderNav.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Brain,
  Wrench,
  Bot,
  FlaskConical,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCategories } from "@/hooks/useCategories";

const navLabels: Record<string, string> = {
  AiModelsAndApis: "Models",
  AiDeveloperTools: "Tools",
  AgentsAndFrameworks: "Agents",
  AiEngineering: "Engineering",
  AiSafetyAndSecurity: "Safety",
};

const categoryIcons: Record<string, LucideIcon> = {
  AiModelsAndApis: Brain,
  AiDeveloperTools: Wrench,
  AgentsAndFrameworks: Bot,
  AiEngineering: FlaskConical,
  AiSafetyAndSecurity: ShieldAlert,
};

const categoryAccentColors: Record<string, string> = {
  AiModelsAndApis: "text-indigo-400 bg-indigo-500/10 ring-indigo-500/20",
  AiDeveloperTools: "text-violet-400 bg-violet-500/10 ring-violet-500/20",
  AgentsAndFrameworks: "text-cyan-400 bg-cyan-500/10 ring-cyan-500/20",
  AiEngineering: "text-amber-400 bg-amber-500/10 ring-amber-500/20",
  AiSafetyAndSecurity: "text-red-400 bg-red-500/10 ring-red-500/20",
};

interface HeaderNavProps {
  className?: string;
  // Tighter pills + smaller icons for the stacked mobile row.
  compact?: boolean;
  // Fade the edge(s) that have more scrollable content, hinting overflow.
  fade?: boolean;
}

// Width of the edge fade, in px.
const FADE = 28;

export function HeaderNav({
  className,
  compact = false,
  fade = false,
}: HeaderNavProps) {
  const pathname = usePathname();
  const { data, isLoading } = useCategories();
  const navRef = useRef<HTMLElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  const update = useCallback(() => {
    const el = navRef.current;
    if (!el) return;
    const left = el.scrollLeft > 4;
    const right =
      Math.ceil(el.scrollLeft + el.clientWidth) < el.scrollWidth - 1;
    setEdges((prev) =>
      prev.left === left && prev.right === right ? prev : { left, right }
    );
  }, []);

  // Re-measure when the fade is enabled, on resize, and once the category
  // list has rendered (data dependency) so scrollWidth is accurate.
  useEffect(() => {
    if (!fade) return;
    const el = navRef.current;
    if (!el) return;
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [fade, update, data]);

  if (isLoading || !data) return null;

  const maskImage =
    edges.left && edges.right
      ? `linear-gradient(to right, transparent, #000 ${FADE}px, #000 calc(100% - ${FADE}px), transparent)`
      : edges.right
        ? `linear-gradient(to right, #000 calc(100% - ${FADE}px), transparent)`
        : edges.left
          ? `linear-gradient(to right, transparent, #000 ${FADE}px)`
          : undefined;

  const maskStyle =
    fade && maskImage
      ? { WebkitMaskImage: maskImage, maskImage }
      : undefined;

  return (
    <nav
      ref={navRef}
      onScroll={fade ? update : undefined}
      style={maskStyle}
      className={cn(
        "no-scrollbar flex items-center gap-1 overflow-x-auto",
        className
      )}
      aria-label="News categories"
    >
      {data.categories.map((category) => {
        const Icon = categoryIcons[category.name] ?? Brain;
        const isActive = pathname === `/${category.name}`;
        const accentClasses = categoryAccentColors[category.name] ?? "";

        return (
          <Link
            key={category.id}
            href={`/${category.name}`}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full font-medium transition-all",
              compact ? "px-2.5 py-1 text-[13px]" : "px-3 py-1.5 text-sm",
              "hover:bg-[#1a1d28] hover:text-[#e8eaed]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50",
              isActive ? cn("ring-1", accentClasses) : "text-[#5a6070]"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon
              className={compact ? "h-2.5 w-2.5" : "h-3 w-3"}
              aria-hidden="true"
            />
            <span>{navLabels[category.name] ?? category.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
