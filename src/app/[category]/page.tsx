// src/app/[category]/page.tsx
"use client";

import { use, Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NewsCard } from "@/components/NewsCard";
import { MonthSelector } from "@/components/MonthSelector";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useNews } from "@/hooks/useNews";
import { getCategoryDisplayName, getCurrentYearMonth } from "@/lib/utils";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ year_month?: string }>;
}

function NewsCardSkeleton() {
  return (
    <div className="space-y-3 border border-[#1a4d1a] bg-[#0a0f0a] p-4">
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

function CategoryPageContent({
  category,
  yearMonth,
}: {
  category: string;
  yearMonth: string;
}) {
  const { data, isLoading, error } = useNews(category, yearMonth);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-4 -ml-2">
            <ArrowLeft className="mr-1 h-4 w-4" />
            cd ..
          </Button>
        </Link>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-mono text-xl text-[#33ff33]">
            <span className="text-[#1a8c1a]">$</span> cat /news/{getCategoryDisplayName(category).toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}{"/*"}
          </h1>
          <Suspense fallback={<Skeleton className="h-9 w-48" />}>
            <MonthSelector category={category} currentYearMonth={yearMonth} />
          </Suspense>
        </div>
      </div>

      {error && (
        <div className="border border-red-500/50 bg-red-500/10 p-4 font-mono text-sm text-red-400">
          <span className="text-red-500">[ERROR]</span> Failed to fetch news feed. Connection timeout.
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
            <div className="border border-[#1a4d1a] bg-[#0a0f0a] p-8 text-center font-mono">
              <p className="text-[#1a8c1a]">
                <span className="text-[#33ff33]">&gt;</span> No entries found for this period.
              </p>
              <p className="mt-2 text-xs text-[#1a8c1a]">
                Try selecting a different month.
              </p>
            </div>
          ) : (
            <>
              <p className="mb-4 font-mono text-xs text-[#1a8c1a]">
                {"// "}Found {data.count} {data.count === 1 ? "entry" : "entries"}
              </p>
              <div className="space-y-3">
                {data.items.map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
              <p className="mt-6 font-mono text-xs text-[#1a8c1a]">
                <span className="text-[#33ff33]">&gt;</span> EOF
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = use(params);
  const { year_month } = use(searchParams);
  const yearMonth = year_month ?? getCurrentYearMonth();

  return <CategoryPageContent category={category} yearMonth={yearMonth} />;
}
