// src/app/[category]/page.tsx

import { CategoryPageContent } from "@/components/CategoryPageContent";

// Pre-generate pages for all categories (required for static export)
export function generateStaticParams() {
  return [
    { category: "SecurityAndVulnerabilities" },
    { category: "ProgrammingLanguagesAndRuntimes" },
    { category: "FrameworksAndLibraries" },
    { category: "CloudAndInfrastructure" },
    { category: "DevOpsCiCdObservabilityTesting" },
    { category: "AiMlDeveloperTooling" },
    { category: "PerformanceAndArchitecturePatterns" },
    { category: "DeveloperToolsIdesProductivity" },
  ];
}

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  return <CategoryPageContent category={category} />;
}
