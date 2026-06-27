// src/components/MonthContext.tsx
"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { getCurrentYearMonth } from "@/lib/utils";

interface MonthContextValue {
  yearMonth: string;
  setYearMonth: (yearMonth: string) => void;
}

const MonthContext = createContext<MonthContextValue | null>(null);

// Holds the selected month above the page tree so it survives client-side
// navigation between categories (a per-page useState would reset on each nav).
export function MonthProvider({ children }: { children: ReactNode }) {
  const [yearMonth, setYearMonth] = useState(getCurrentYearMonth);
  return (
    <MonthContext.Provider value={{ yearMonth, setYearMonth }}>
      {children}
    </MonthContext.Provider>
  );
}

export function useSelectedMonth() {
  const ctx = useContext(MonthContext);
  if (!ctx) {
    throw new Error("useSelectedMonth must be used within a MonthProvider");
  }
  return ctx;
}
