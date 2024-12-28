export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  source: string;
  category: string;
  author?: string;
  publishedAt: string;
}

export interface NewsSource {
  id: string;
  name: string;
  enabled: boolean;
}

export interface NewsCategory {
  id: string;
  name: string;
  enabled: boolean;
}

export interface NewsFilters {
  search: string;
  startDate?: string;
  endDate?: string;
  categories: string[];
  sources: string[];
}