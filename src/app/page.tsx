// src/app/page.tsx
"use client";

import { useQueries } from "@tanstack/react-query";
import { NewsCard } from "@/components/NewsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useCategories } from "@/hooks/useCategories";
import { fetchNewsByCategory } from "@/lib/api";
import { getCurrentYearMonth, getCategoryDisplayName } from "@/lib/utils";
import type { NewsItem } from "@/lib/types";

function NewsCardSkeleton() {
  return (
    <div className="space-y-3 rounded-lg border border-[#262626] bg-[#141414] p-4">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-20 w-full" />
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

  // Fetch news from all categories in parallel
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
      }))
    )
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <section className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-[#fafafa]">
          Latest
        </h1>
        <p className="mt-1 text-sm text-[#71717a]">
          {allArticles.length > 0
            ? `${allArticles.length} articles this month`
            : "AI developer news. High signal, zero noise."}
        </p>
      </section>

      {isLoading && (
        <div className="space-y-3">
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
        <div className="space-y-3">
          {allArticles.map((item) => (
            <div key={item.id}>
              <div className="mb-1.5 ml-1">
                <Badge variant="secondary" className="text-[10px]">
                  {getCategoryDisplayName(item._category)}
                </Badge>
              </div>
              <NewsCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
