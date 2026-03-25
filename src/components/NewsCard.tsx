// src/components/NewsCard.tsx

import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { NewsItem } from "@/lib/types";
import { formatDateRelative, getCategoryDisplayName } from "@/lib/utils";

interface NewsCardProps {
  item: NewsItem;
  showCategory?: boolean;
}

const categoryColors: Record<string, string> = {
  AiModelsAndApis: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  AiDeveloperTools: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  AgentsAndFrameworks: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  AiEngineering: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  AiSafetyAndSecurity: "bg-red-500/10 text-red-400 border-red-500/20",
  InfrastructureAndCloud: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  OpenSourceAndCommunity: "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

function getSeverityVariant(severity: string | undefined) {
  switch (severity) {
    case "Critical":
      return "border-red-500 bg-red-500/20 text-red-400";
    case "High":
      return "border-orange-500 bg-orange-500/20 text-orange-400";
    case "Medium":
      return "border-yellow-500 bg-yellow-500/20 text-yellow-400";
    case "Low":
      return "border-green-500 bg-green-500/20 text-green-400";
    default:
      return "";
  }
}

export function NewsCard({ item, showCategory = false }: NewsCardProps) {
  return (
    <Card className="group cursor-pointer">
      <CardHeader className="pb-2">
        {showCategory && (
          <div className="mb-1">
            <Badge
              variant="outline"
              className={categoryColors[item.category] ?? "text-[#a1a1aa]"}
            >
              {getCategoryDisplayName(item.category)}
            </Badge>
          </div>
        )}
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-sm leading-snug">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-1.5 text-[#fafafa] transition-colors hover:text-[#3b82f6] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3b82f6]"
            >
              {item.title}
              <ExternalLink
                className="mt-0.5 h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-60"
                aria-hidden="true"
              />
            </a>
          </CardTitle>
          {item.severity && (
            <Badge
              variant="outline"
              className={getSeverityVariant(item.severity)}
            >
              {item.severity.toUpperCase()}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-[#71717a]">
          <span className="text-[#a1a1aa]">{item.source}</span>
          {item.author && (
            <>
              <span aria-hidden="true">/</span>
              <span>{item.author}</span>
            </>
          )}
          <span aria-hidden="true">/</span>
          <time dateTime={item.created_at}>{formatDateRelative(item.created_at)}</time>
        </div>
      </CardHeader>
      <CardContent className="space-y-2.5">
        <p className="text-sm leading-relaxed text-[#a1a1aa]">
          {item.summary}
        </p>
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-[11px]"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
