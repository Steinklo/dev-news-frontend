// src/app/page.tsx
"use client";

import Link from "next/link";
import {
  Brain,
  Wrench,
  Bot,
  FlaskConical,
  ShieldAlert,
  Server,
  GitFork,
  type LucideIcon,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/useCategories";
import { getCategoryDisplayName } from "@/lib/utils";

const categoryIcons: Record<string, LucideIcon> = {
  AiModelsAndApis: Brain,
  AiDeveloperTools: Wrench,
  AgentsAndFrameworks: Bot,
  AiEngineering: FlaskConical,
  AiSafetyAndSecurity: ShieldAlert,
  InfrastructureAndCloud: Server,
  OpenSourceAndCommunity: GitFork,
};

const categoryDescriptions: Record<string, string> = {
  AiModelsAndApis: "Model releases, API updates, benchmarks, fine-tuning",
  AiDeveloperTools: "Coding assistants, IDE integrations, prompt tools",
  AgentsAndFrameworks: "LLM frameworks, agent patterns, RAG, orchestration",
  AiEngineering: "Prompt engineering, evals, guardrails, patterns",
  AiSafetyAndSecurity: "Prompt injection, jailbreaks, alignment, CVEs",
  InfrastructureAndCloud: "GPU, serving, MLOps, cloud AI services",
  OpenSourceAndCommunity: "Open-weight models, datasets, community projects",
};

export default function HomePage() {
  const { data, isLoading, error } = useCategories();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-[#fafafa]">DevNews</h1>
        <p className="mt-2 text-[#a1a1aa]">AI developer news. High signal, zero noise.</p>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-[#71717a]">Categories</h2>

        {error && (
          <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400">
            Failed to load categories. Please try again later.
          </div>
        )}

        {isLoading && (
          <div className="grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
        )}

        {data && (
          <div className="grid gap-3 sm:grid-cols-2">
            {data.categories.map((category) => {
              const Icon = categoryIcons[category.name] ?? Brain;
              const description =
                categoryDescriptions[category.name] ?? "Latest news and updates";

              return (
                <Link key={category.id} href={`/${category.name}`}>
                  <Card className="group h-full">
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-3">
                        <Icon
                          className="h-4 w-4 text-[#3b82f6]"
                          aria-hidden="true"
                        />
                        <CardTitle className="text-sm text-[#fafafa]">
                          {getCategoryDisplayName(category.name)}
                        </CardTitle>
                      </div>
                      <CardDescription className="mt-1 pl-7 text-xs">
                        {description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
