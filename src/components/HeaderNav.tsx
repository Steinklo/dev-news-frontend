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
import { cn, getCategoryDisplayName } from "@/lib/utils";
import { useCategories } from "@/hooks/useCategories";

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
    <div className="border-b border-[#262626] bg-[#0a0a0a]/95 backdrop-blur-sm">
      <nav
        className="no-scrollbar mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 py-2"
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
                "inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                "hover:bg-[#262626] hover:text-[#fafafa]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]",
                isActive
                  ? "bg-[#262626] text-[#fafafa]"
                  : "text-[#71717a]"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{getCategoryDisplayName(category.name)}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
