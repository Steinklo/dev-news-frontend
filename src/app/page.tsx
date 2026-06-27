// src/app/page.tsx
"use client";

import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { format, subMonths } from "date-fns";
import { NewsCard } from "@/components/NewsCard";
import { LoadingState } from "@/components/LoadingState";
import { useCategories } from "@/hooks/useCategories";
import { fetchNewsByCategory } from "@/lib/api";
import type { NewsItem } from "@/lib/types";
import { Activity, AlertCircle } from "lucide-react";

// How many months back "Latest" will look for content before giving up, so the
// front page never sits empty across a month rollover or ingestion gap.
const MAX_LOOKBACK = 6;

export default function HomePage() {
  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();
  const categories = categoriesData?.categories ?? [];

  // Start at the current month; walk backwards if it has no articles.
  const [monthOffset, setMonthOffset] = useState(0);
  const activeMonth = subMonths(new Date(), monthOffset);
  const yearMonth = format(activeMonth, "yyyy-MM");

  const newsQueries = useQueries({
    queries: categories.map((cat) => ({
      queryKey: ["news", cat.name, yearMonth],
      queryFn: () => fetchNewsByCategory(cat.name, yearMonth),
      enabled: categories.length > 0,
    })),
  });

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

  const hasErrors = newsQueries.some((q) => q.isError);
  const queriesSettled =
    categories.length > 0 && newsQueries.every((q) => !q.isLoading);
  const reachedLookbackLimit = monthOffset >= MAX_LOOKBACK;
  const monthEmpty = queriesSettled && allArticles.length === 0;

  // Step back a month when the current one is empty and we still have budget.
  // Adjusting state during render (React re-runs render with the new value and
  // discards this pass) is the supported pattern here — it avoids an effect.
  // Skip on error: a failed query also looks "empty", and walking back would
  // bury the failure instead of surfacing it.
  if (monthEmpty && !reachedLookbackLimit && !hasErrors) {
    setMonthOffset((o) => o + 1);
  }

  const isLoading = categoriesLoading || newsQueries.some((q) => q.isLoading);
  const showError = hasErrors && allArticles.length === 0;
  // Keep showing skeletons while we walk back, so the empty state never flashes.
  const showLoading =
    !showError && (isLoading || (monthEmpty && !reachedLookbackLimit));
  const showEmpty = !hasErrors && monthEmpty && reachedLookbackLimit;
  const isPastMonth = monthOffset > 0 && allArticles.length > 0;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex items-end justify-between">
        <div className="flex items-baseline gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-[#e8eaed]">
            Latest
          </h1>
          {isPastMonth && (
            <span className="font-mono text-xs text-[#5a6070]">
              {format(activeMonth, "MMMM yyyy")}
            </span>
          )}
        </div>
        {allArticles.length > 0 && (
          <span className="text-xs text-[#5a6070]">
            {allArticles.length} articles
          </span>
        )}
      </div>

      {showError && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-5">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
          <p className="text-xs text-red-400">
            Failed to load articles. Please try again later.
          </p>
        </div>
      )}

      {showLoading && <LoadingState />}

      {showEmpty && (
        <div className="rounded-xl border border-[#1a1d28] bg-[#0c0d14] p-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10">
            <Activity className="h-5 w-5 text-indigo-400/60" />
          </div>
          <p className="text-base text-[#9ba1b0]">No articles yet</p>
          <p className="mt-2 text-xs text-[#5a6070]">
            New articles are added daily — check back soon
          </p>
        </div>
      )}

      {!showLoading && allArticles.length > 0 && (
        <div className="stagger-children space-y-3">
          {allArticles.map((item) => (
            <NewsCard key={item.id} item={item} showCategory />
          ))}
        </div>
      )}
    </div>
  );
}
