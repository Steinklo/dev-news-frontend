// src/hooks/useCategories.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchCategories } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: async () => {
      try {
        return await fetchCategories();
      } catch (error) {
        toast.error("Failed to load categories");
        throw error;
      }
    },
  });
}
