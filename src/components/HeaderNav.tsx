// src/components/HeaderNav.tsx
"use client";

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

export function HeaderNav() {
  const pathname = usePathname();
  const { data, isLoading } = useCategories();

  if (isLoading || !data) return null;

  return (
    <nav
      className="no-scrollbar mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-6 py-2"
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
              "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all",
              "hover:bg-[#1a1d28] hover:text-[#e8eaed]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50",
              isActive
                ? cn("ring-1", accentClasses)
                : "text-[#5a6070]"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="h-3 w-3" aria-hidden="true" />
            <span>{navLabels[category.name] ?? category.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
