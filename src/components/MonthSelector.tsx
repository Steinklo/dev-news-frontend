// src/components/MonthSelector.tsx
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, subMonths, addMonths, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { getCurrentYearMonth } from "@/lib/utils";

interface MonthSelectorProps {
  currentYearMonth: string;
  onChange: (yearMonth: string) => void;
}

export function MonthSelector({ currentYearMonth, onChange }: MonthSelectorProps) {
  const currentDate = parse(currentYearMonth, "yyyy-MM", new Date());
  const today = new Date();
  const currentMonthStr = getCurrentYearMonth();

  const isCurrentMonth = currentYearMonth === currentMonthStr;

  const handleMonthChange = (newDate: Date) => {
    const newYearMonth = format(newDate, "yyyy-MM");
    onChange(newYearMonth);
  };

  const goToPreviousMonth = () => {
    handleMonthChange(subMonths(currentDate, 1));
  };

  const goToNextMonth = () => {
    handleMonthChange(addMonths(currentDate, 1));
  };

  const canGoNext = currentDate < today;

  return (
    <div className="flex items-center gap-1 font-mono">
      <Button
        variant="ghost"
        size="icon"
        onClick={goToPreviousMonth}
        aria-label="Previous month"
        className="h-7 w-7"
      >
        <ChevronLeft className="h-3 w-3" />
      </Button>
      <span className="min-w-[100px] text-center text-xs text-[#fafafa]">
        {currentYearMonth}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={goToNextMonth}
        disabled={!canGoNext}
        aria-label="Next month"
        className="h-7 w-7"
      >
        <ChevronRight className="h-3 w-3" />
      </Button>
      {!isCurrentMonth && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleMonthChange(today)}
          className="ml-2 h-7 text-xs"
        >
          Current
        </Button>
      )}
    </div>
  );
}
