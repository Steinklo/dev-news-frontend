// src/app/page.tsx
"use client";

import { useQueries } from "@tanstack/react-query";
import { NewsCard } from "@/components/NewsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/useCategories";
import { fetchNewsByCategory } from "@/lib/api";
import { getCurrentYearMonth } from "@/lib/utils";
import type { NewsItem } from "@/lib/types";

function NewsCardSkeleton() {
  return (
    <div className="space-y-3 rounded-lg border border-[#262626] bg-[#141414] p-4">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-16 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-16" />
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
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-5 flex items-baseline justify-between">
        <h1 className="text-xl font-semibold tracking-tight text-[#fafafa]">
          Latest
        </h1>
        {allArticles.length > 0 && (
          <span className="text-xs text-[#71717a]">
            {allArticles.length} articles
          </span>
        )}
      </div>

      {isLoading && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && allArticles.length === 0 && (
        <div className="rounded-lg border border-[#262626] bg-[#141414] p-8 text-center">
          <p className="text-[#a1a1aa]">No articles yet this month.</p>
          <p className="mt-2 text-xs text-[#71717a]">
            Check back soon — new articles are curated daily.
          </p>
        </div>
      )}

      {!isLoading && allArticles.length > 0 && (
        <div className="space-y-2">
          {allArticles.map((item) => (
            <NewsCard key={item.id} item={item} showCategory />
          ))}
        </div>
      )}
    </div>
  );
}
