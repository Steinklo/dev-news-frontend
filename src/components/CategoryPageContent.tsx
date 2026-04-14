// src/components/CategoryPageContent.tsx
"use client";

import { useState } from "react";
import { NewsCard } from "@/components/NewsCard";
import { MonthSelector } from "@/components/MonthSelector";
import { Skeleton } from "@/components/ui/skeleton";
import { useNews } from "@/hooks/useNews";
import { getCurrentYearMonth, getCategoryDisplayName } from "@/lib/utils";
import { Activity, AlertCircle } from "lucide-react";

function NewsCardSkeleton() {
  return (
    <div className="space-y-3 rounded-xl border border-[#1a1d28] bg-[#0c0d14] p-5">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-3 w-1/3" />
      <Skeleton className="h-20 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    </div>
  );
}

interface CategoryPageContentProps {
  category: string;
}

export function CategoryPageContent({ category }: CategoryPageContentProps) {
  const [yearMonth, setYearMonth] = useState(getCurrentYearMonth);
  const { data, isLoading, error } = useNews(category, yearMonth);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#e8eaed]">
              {getCategoryDisplayName(category)}
            </h1>
          </div>
          <MonthSelector currentYearMonth={yearMonth} onChange={setYearMonth} />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-5">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
          <p className="text-xs text-red-400">
            Failed to load articles. Please try again later.
          </p>
        </div>
      )}

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      )}

      {data && (
        <>
          {data.items.length === 0 ? (
            <div className="rounded-xl border border-[#1a1d28] bg-[#0c0d14] p-12 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10">
                <Activity className="h-5 w-5 text-indigo-400/60" />
              </div>
              <p className="text-base text-[#9ba1b0]">
                No articles for this period
              </p>
              <p className="mt-2 text-xs text-[#5a6070]">
                Try selecting a different month
              </p>
            </div>
          ) : (
            <>
              <p className="mb-4 text-xs text-[#5a6070]">
                {data.count} {data.count === 1 ? "article" : "articles"}
              </p>
              <div className="stagger-children space-y-3">
                {data.items.map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
