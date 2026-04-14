// src/app/page.tsx
"use client";

import { useQueries } from "@tanstack/react-query";
import { NewsCard } from "@/components/NewsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/useCategories";
import { fetchNewsByCategory } from "@/lib/api";
import { getCurrentYearMonth } from "@/lib/utils";
import type { NewsItem } from "@/lib/types";
import { Activity } from "lucide-react";

function NewsCardSkeleton() {
  return (
    <div className="space-y-3 rounded-xl border border-[#1a1d28] bg-[#0c0d14] p-5">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-3 w-1/3" />
      <Skeleton className="h-16 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    </div>
  );
}

export default function HomePage() {
  const yearMonth = getCurrentYearMonth();
  const { data: categoriesData } = useCategories();

  const categories = categoriesData?.categories ?? [];

  const newsQueries = useQueries({
    queries: categories.map((cat) => ({
      queryKey: ["news", cat.name, yearMonth],
      queryFn: () => fetchNewsByCategory(cat.name, yearMonth),
      enabled: categories.length > 0,
    })),
  });

  const isLoading = newsQueries.some((q) => q.isLoading);
  const allArticles: (NewsItem & { _category: string })[] = newsQueries
    .flatMap((q, i) =>
      (q.data?.items ?? []).map((item) => ({
        ...item,
        _category: categories[i]?.name ?? "",
        category: categories[i]?.name ?? item.category,
      }))
    )
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex items-end justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-[#e8eaed]">
          Latest
        </h1>
        {allArticles.length > 0 && (
          <span className="text-xs text-[#5a6070]">
            {allArticles.length} articles
          </span>
        )}
      </div>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && allArticles.length === 0 && (
        <div className="rounded-xl border border-[#1a1d28] bg-[#0c0d14] p-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10">
            <Activity className="h-5 w-5 text-indigo-400/60" />
          </div>
          <p className="text-base text-[#9ba1b0]">
            No articles yet this month
          </p>
          <p className="mt-2 text-xs text-[#5a6070]">
            New articles are added daily — check back soon
          </p>
        </div>
      )}

      {!isLoading && allArticles.length > 0 && (
        <div className="stagger-children space-y-3">
          {allArticles.map((item) => (
            <NewsCard key={item.id} item={item} showCategory />
          ))}
        </div>
      )}
    </div>
  );
}
