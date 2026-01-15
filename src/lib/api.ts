// src/lib/api.ts

import type { CategoriesResponse, NewsByCategoryResponse } from "./types";

// For static export, call the API directly
// Set NEXT_PUBLIC_API_URL in your environment (e.g., https://func-devnews-api-dev.azurewebsites.net/api/v1)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:7020/api/v1";

class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `API request failed: ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}

export async function fetchCategories(): Promise<CategoriesResponse> {
  return fetchApi<CategoriesResponse>("/news/categories");
}

export async function fetchNewsByCategory(
  category: string,
  yearMonth?: string
): Promise<NewsByCategoryResponse> {
  const params = yearMonth ? `?year_month=${yearMonth}` : "";
  return fetchApi<NewsByCategoryResponse>(`/news/category/${category}${params}`);
}

export { ApiError };
