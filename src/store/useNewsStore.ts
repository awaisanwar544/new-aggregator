import { create } from 'zustand';
import { NewsFilters, NewsSource, NewsCategory } from '../types/news';

interface NewsStore {
  filters: NewsFilters;
  sources: NewsSource[];
  categories: NewsCategory[];
  setFilters: (filters: Partial<NewsFilters>) => void;
  toggleSource: (sourceId: string) => void;
  toggleCategory: (categoryId: string) => void;
}

export const useNewsStore = create<NewsStore>((set) => ({
  filters: {
    search: '',
    categories: [],
    sources: [],
  },
  sources: [
    { id: 'guardian', name: 'The Guardian', enabled: true },
    { id: 'nyt', name: 'New York Times', enabled: true },
    { id: 'bbc', name: 'BBC News', enabled: true },
  ],
  categories: [
    { id: 'technology', name: 'Technology', enabled: true },
    { id: 'business', name: 'Business', enabled: true },
    { id: 'science', name: 'Science', enabled: true },
    { id: 'health', name: 'Health', enabled: true },
    { id: 'sports', name: 'Sports', enabled: true },
  ],
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  toggleSource: (sourceId) =>
    set((state) => ({
      sources: state.sources.map((source) =>
        source.id === sourceId
          ? { ...source, enabled: !source.enabled }
          : source
      ),
    })),
  toggleCategory: (categoryId) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === categoryId
          ? { ...category, enabled: !category.enabled }
          : category
      ),
    })),
}));