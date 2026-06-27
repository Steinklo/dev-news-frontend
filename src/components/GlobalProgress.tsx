// src/components/GlobalProgress.tsx
"use client";

import { useIsFetching } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

// Thin indeterminate bar pinned to the very top of the viewport.
// Visible whenever any TanStack Query is in-flight — gives the user a
// continuous signal during the backend cold start. [visibility of system status]
export function GlobalProgress() {
  const active = useIsFetching() > 0;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 overflow-hidden transition-opacity duration-500",
        active ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="progress-indeterminate h-full" />
    </div>
  );
}
