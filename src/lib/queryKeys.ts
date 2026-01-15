// src/lib/queryKeys.ts

export const queryKeys = {
  categories: ["categories"] as const,
  news: (category: string, yearMonth?: string) =>
    ["news", category, yearMonth] as const,
} as const;
