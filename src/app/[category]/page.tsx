// src/app/[category]/page.tsx

import { CategoryPageContent } from "@/components/CategoryPageContent";

// Pre-generate pages for all categories (required for static export)
export function generateStaticParams() {
  return [
    { category: "AiModelsAndApis" },
    { category: "AiDeveloperTools" },
    { category: "AgentsAndFrameworks" },
    { category: "AiEngineering" },
    { category: "AiSafetyAndSecurity" },
    { category: "InfrastructureAndCloud" },
    { category: "OpenSourceAndCommunity" },
  ];
}

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  return <CategoryPageContent category={category} />;
}
