// src/components/NewsCard.tsx

"use client";

import * as React from "react";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { NewsItem } from "@/lib/types";
import { formatDateRelative, getCategoryDisplayName } from "@/lib/utils";

interface NewsCardProps {
  item: NewsItem;
  showCategory?: boolean;
}

const categoryGlowColors: Record<string, string> = {
  AiModelsAndApis: "#6366f1",
  AiDeveloperTools: "#a78bfa",
  AgentsAndFrameworks: "#22d3ee",
  AiEngineering: "#f59e0b",
  AiSafetyAndSecurity: "#ef4444",
};

const categoryBadgeColors: Record<string, string> = {
  AiModelsAndApis: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  AiDeveloperTools: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  AgentsAndFrameworks: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  AiEngineering: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  AiSafetyAndSecurity: "bg-red-500/10 text-red-400 border-red-500/20",
};

function SeverityIndicator({ severity }: { severity: string }) {
  const level = severity.toLowerCase();
  return (
    <div className="flex items-center gap-1.5">
      <span className={`severity-dot ${level}`} />
      <span className="text-[10px] font-medium uppercase text-[#5a6070]">
        {severity}
      </span>
    </div>
  );
}

export function NewsCard({ item, showCategory = false }: NewsCardProps) {
  const glowColor = categoryGlowColors[item.category] ?? "#6366f1";
  const [open, setOpen] = React.useState(false);

  const openDialog = () => setOpen(true);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openDialog();
    }
  };

  const meta = (
    <div className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-[#5a6070]">
      <span className="text-[#9ba1b0]">{item.source}</span>
      {item.author && (
        <>
          <span className="text-[#2a2e3d]">/</span>
          <span>{item.author}</span>
        </>
      )}
      <span className="text-[#2a2e3d]">/</span>
      <time dateTime={item.created_at}>{formatDateRelative(item.created_at)}</time>
    </div>
  );

  const tags = item.tags.length > 0 && (
    <div className="flex flex-wrap gap-1.5">
      {item.tags.map((tag) => (
        <Badge key={tag} variant="secondary">
          {tag}
        </Badge>
      ))}
    </div>
  );

  return (
    <>
      <Card
        className="group cursor-pointer transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090d]"
        onClick={openDialog}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label={`${item.title} — show summary`}
        style={{ "--glow-color": glowColor } as React.CSSProperties}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-1.5">
              {showCategory && (
                <Badge
                  variant="outline"
                  className={categoryBadgeColors[item.category] ?? "text-[#9ba1b0]"}
                >
                  {getCategoryDisplayName(item.category)}
                </Badge>
              )}
              <CardTitle className="text-[15px] leading-relaxed">
                <span className="text-[#e8eaed] transition-colors group-hover:text-white">
                  {item.title}
                </span>
              </CardTitle>
            </div>
            {item.severity && <SeverityIndicator severity={item.severity} />}
          </div>
          {meta}
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="line-clamp-3 text-sm leading-relaxed text-[#9ba1b0]">
            {item.summary}
          </p>
          {tags}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            {showCategory && (
              <div>
                <Badge
                  variant="outline"
                  className={categoryBadgeColors[item.category] ?? "text-[#9ba1b0]"}
                >
                  {getCategoryDisplayName(item.category)}
                </Badge>
              </div>
            )}
            <DialogTitle>{item.title}</DialogTitle>
            <div className="flex items-center justify-between gap-4">
              {meta}
              {item.severity && <SeverityIndicator severity={item.severity} />}
            </div>
          </DialogHeader>

          <DialogDescription asChild>
            <p className="max-h-[70vh] overflow-y-auto whitespace-pre-line">
              {item.summary}
            </p>
          </DialogDescription>

          {tags}

          <DialogFooter>
            <Button asChild>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                Read full article
                <ExternalLink aria-hidden="true" />
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
