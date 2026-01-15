// src/hooks/useNews.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchNewsByCategory } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

export function useNews(category: string, yearMonth?: string) {
  return useQuery({
    queryKey: queryKeys.news(category, yearMonth),
    queryFn: async () => {
      try {
        return await fetchNewsByCategory(category, yearMonth);
      } catch (error) {
        toast.error("Failed to load news");
        throw error;
      }
    },
    enabled: !!category,
  });
}
