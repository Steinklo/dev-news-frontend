// src/components/CategoryPageContent.tsx
"use client";

import { useState } from "react";
import { NewsCard } from "@/components/NewsCard";
import { CategoryNav } from "@/components/CategoryNav";
import { MonthSelector } from "@/components/MonthSelector";
import { Skeleton } from "@/components/ui/skeleton";
import { useNews } from "@/hooks/useNews";
import { useCategories } from "@/hooks/useCategories";
import { getCurrentYearMonth, getCategoryDisplayName } from "@/lib/utils";

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

interface CategoryPageContentProps {
  category: string;
}

export function CategoryPageContent({ category }: CategoryPageContentProps) {
  const [yearMonth, setYearMonth] = useState(getCurrentYearMonth);
  const { data, isLoading, error } = useNews(category, yearMonth);
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6">
        <CategoryNav
          categories={categoriesData?.categories ?? []}
          isLoading={categoriesLoading}
        />
      </div>
      <div className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-semibold text-[#fafafa]">{getCategoryDisplayName(category)}</h1>
          <MonthSelector currentYearMonth={yearMonth} onChange={setYearMonth} />
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400">
          Failed to fetch news feed. Please try again later.
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
            <div className="rounded-lg border border-[#262626] bg-[#141414] p-8 text-center">
              <p className="text-[#a1a1aa]">
                No entries found for this period.
              </p>
              <p className="mt-2 text-xs text-[#71717a]">
                Try selecting a different month.
              </p>
            </div>
          ) : (
            <>
              <p className="mb-4 text-xs text-[#71717a]">
                {data.count} {data.count === 1 ? "article" : "articles"}
              </p>
              <div className="space-y-3">
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
