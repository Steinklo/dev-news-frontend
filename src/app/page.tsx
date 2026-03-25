// src/app/page.tsx
"use client";

import Link from "next/link";
import {
  Brain,
  Wrench,
  Bot,
  Server,
  Shield,
  Cloud,
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
  AiInfrastructure: Server,
  SecurityAndVulnerabilities: Shield,
  CloudAndInfrastructure: Cloud,
  OpenSourceAndCommunity: GitFork,
};

const categoryDescriptions: Record<string, string> = {
  AiModelsAndApis: "Model releases, API updates, benchmarks, fine-tuning",
  AiDeveloperTools: "Coding assistants, IDE integrations, prompt tools",
  AgentsAndFrameworks: "LLM frameworks, agent patterns, RAG, orchestration",
  AiInfrastructure: "GPUs, training clusters, inference optimization, MLOps",
  SecurityAndVulnerabilities: "AI security, prompt injection, model vulnerabilities",
  CloudAndInfrastructure: "Cloud AI services, deployment, scaling",
  OpenSourceAndCommunity: "Open-weight models, datasets, community projects",
};

export default function HomePage() {
  const { data, isLoading, error } = useCategories();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <section className="mb-10">
        <div className="mb-6 border border-[#1a4d1a] bg-[#0a0f0a] p-4">
          <pre className="font-mono text-xs text-[#1a8c1a] sm:text-sm">
{`╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   ██████╗ ███████╗██╗   ██╗███╗   ██╗███████╗██╗    ██╗███████╗  ║
║   ██╔══██╗██╔════╝██║   ██║████╗  ██║██╔════╝██║    ██║██╔════╝  ║
║   ██║  ██║█████╗  ██║   ██║██╔██╗ ██║█████╗  ██║ █╗ ██║███████╗  ║
║   ██║  ██║██╔══╝  ╚██╗ ██╔╝██║╚██╗██║██╔══╝  ██║███╗██║╚════██║  ║
║   ██████╔╝███████╗ ╚████╔╝ ██║ ╚████║███████╗╚███╔███╔╝███████║  ║
║   ╚═════╝ ╚══════╝  ╚═══╝  ╚═╝  ╚═══╝╚══════╝ ╚══╝╚══╝ ╚══════╝  ║
║                                                              ║
║   > AI developer news feed // High signal, zero noise           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝`}
          </pre>
        </div>
        <p className="font-mono text-sm text-[#1a8c1a]">
          <span className="text-[#33ff33]">$</span> cat /etc/motd
          <br />
          <span className="text-[#33ff33]">&gt;</span> The freshest AI engineering news for developers.
          <br />
          <span className="text-[#33ff33]">&gt;</span> Select a category to begin...
        </p>
      </section>

      <section>
        <h2 className="mb-4 font-mono text-sm text-[#33ff33]">
          <span className="text-[#1a8c1a]">$</span> ls -la /categories/
        </h2>

        {error && (
          <div className="border border-red-500/50 bg-red-500/10 p-4 font-mono text-sm text-red-400">
            <span className="text-red-500">[ERROR]</span> Failed to load categories. Connection refused.
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
            {data.categories.map((category, index) => {
              const Icon = categoryIcons[category.name] ?? Brain;
              const description =
                categoryDescriptions[category.name] ?? "Latest news and updates";

              return (
                <Link key={category.id} href={`/${category.name}`}>
                  <Card className="group h-full">
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-3">
                        <Icon
                          className="h-4 w-4 text-[#33ff33]"
                          aria-hidden="true"
                        />
                        <CardTitle className="flex items-center gap-2 text-sm">
                          <span className="text-[#1a8c1a]">{String(index).padStart(2, "0")}</span>
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
