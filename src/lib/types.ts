// src/lib/types.ts

export interface Category {
  id: number;
  name: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  category: string;
  relevance_score: number;
  source: string;
  author?: string;
  severity?: "Critical" | "High" | "Medium" | "Low" | string;
  tags: string[];
  created_at: string;
}

export interface NewsByCategoryResponse {
  category: string;
  year_month: string;
  count: number;
  items: NewsItem[];
}

export interface CategoriesResponse {
  categories: Category[];
}
