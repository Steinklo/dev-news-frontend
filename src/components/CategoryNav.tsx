// src/components/CategoryNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Brain,
  Wrench,
  Bot,
  Server,
  Shield,
  Cloud,
  GitFork,
  type LucideIcon,
} from "lucide-react";
import { cn, getCategoryDisplayName } from "@/lib/utils";
import type { Category } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

const categoryIcons: Record<string, LucideIcon> = {
  AiModelsAndApis: Brain,
  AiDeveloperTools: Wrench,
  AgentsAndFrameworks: Bot,
  AiInfrastructure: Server,
  SecurityAndVulnerabilities: Shield,
  CloudAndInfrastructure: Cloud,
  OpenSourceAndCommunity: GitFork,
};

interface CategoryNavProps {
  categories: Category[];
  isLoading?: boolean;
}

export function CategoryNav({ categories, isLoading }: CategoryNavProps) {
  const pathname = usePathname();

  if (isLoading) {
    return (
      <nav className="flex flex-wrap gap-2" aria-label="Categories loading">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-32" />
        ))}
      </nav>
    );
  }

  return (
    <nav className="flex flex-wrap gap-2" aria-label="News categories">
      {categories.map((category) => {
        const Icon = categoryIcons[category.name] ?? Brain;
        const isActive = pathname === `/${category.name}`;

        return (
          <Link
            key={category.id}
            href={`/${category.name}`}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              "hover:bg-zinc-100 dark:hover:bg-zinc-800",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300",
              isActive
                ? "bg-zinc-900 text-zinc-50 hover:bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50"
                : "text-zinc-600 dark:text-zinc-400"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            <span>{getCategoryDisplayName(category.name)}</span>
          </Link>
        );
      })}
    </nav>
  );
}
