// src/components/LoadingState.tsx
"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Skeleton that structurally mirrors <NewsCard> so the swap to real content
// produces no layout shift. [continuity / no CLS]
function NewsCardSkeleton() {
  return (
    <div className="card-glow rounded-xl border border-[#1a1d28] bg-[#0c0d14]">
      <div className="flex flex-col space-y-2 p-5 pb-2">
        <Skeleton className="h-[18px] w-20 rounded-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-44" />
      </div>
      <div className="space-y-3 p-5 pt-2">
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
        <div className="flex gap-1.5">
          <Skeleton className="h-[18px] w-14 rounded-full" />
          <Skeleton className="h-[18px] w-16 rounded-full" />
          <Skeleton className="h-[18px] w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}

interface LoadingStateProps {
  count?: number;
}

export function LoadingState({ count = 5 }: LoadingStateProps) {
  // Only surface the cold-start message on genuinely slow loads, so warm
  // loads (sub-second) never flash it. [honest feedback]
  const [showStatus, setShowStatus] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowStatus(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      <div
        className={cn(
          "mb-4 flex items-center gap-2 text-xs text-[#5a6070] transition-opacity duration-700",
          showStatus ? "opacity-100" : "opacity-0"
        )}
        role="status"
        aria-live="polite"
      >
        <span
          className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-indigo-400"
          aria-hidden="true"
        />
        <span>Waking the news engine — first load takes a moment…</span>
      </div>
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <NewsCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
