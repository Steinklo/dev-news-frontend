// src/lib/utils.ts

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateRelative(dateString: string): string {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, "MMM d, yyyy");
}

export function getCurrentYearMonth(): string {
  return format(new Date(), "yyyy-MM");
}

export function formatYearMonth(yearMonth: string): string {
  const [year, month] = yearMonth.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return format(date, "MMMM yyyy");
}

export function getCategoryDisplayName(slug: string): string {
  const displayNames: Record<string, string> = {
    AiModelsAndApis: "AI Models",
    AiDeveloperTools: "AI Tools",
    AgentsAndFrameworks: "AI Agents & Frameworks",
    AiEngineering: "AI Engineering",
    AiSafetyAndSecurity: "AI Safety & Security",
  };
  return displayNames[slug] ?? slug;
}

export function getSeverityColor(severity: string | undefined): string {
  switch (severity) {
    case "Critical":
      return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
    case "High":
      return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20";
    case "Medium":
      return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
    case "Low":
      return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
    default:
      return "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20";
  }
}
