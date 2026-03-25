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
  Server,
  GitFork,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCategories } from "@/hooks/useCategories";

const navLabels: Record<string, string> = {
  AiModelsAndApis: "AI Models",
  AiDeveloperTools: "AI Tools",
  AgentsAndFrameworks: "AI Agents",
  AiEngineering: "AI Engineering",
  AiSafetyAndSecurity: "AI Safety",
  InfrastructureAndCloud: "Infra & Cloud",
  OpenSourceAndCommunity: "Open Source",
};

const categoryIcons: Record<string, LucideIcon> = {
  AiModelsAndApis: Brain,
  AiDeveloperTools: Wrench,
  AgentsAndFrameworks: Bot,
  AiEngineering: FlaskConical,
  AiSafetyAndSecurity: ShieldAlert,
  InfrastructureAndCloud: Server,
  OpenSourceAndCommunity: GitFork,
};

export function HeaderNav() {
  const pathname = usePathname();
  const { data, isLoading } = useCategories();

  if (isLoading || !data) return null;

  return (
    <div className="border-b border-[#262626]">
      <nav
        className="no-scrollbar mx-auto flex max-w-5xl items-center justify-center gap-0.5 overflow-x-auto px-4 py-1.5"
        aria-label="News categories"
      >
        {data.categories.map((category) => {
          const Icon = categoryIcons[category.name] ?? Brain;
          const isActive = pathname === `/${category.name}`;

          return (
            <Link
              key={category.id}
              href={`/${category.name}`}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                "hover:bg-[#262626] hover:text-[#fafafa]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]",
                isActive
                  ? "bg-[#3b82f6]/10 text-[#3b82f6]"
                  : "text-[#a1a1aa]"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{navLabels[category.name] ?? category.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
