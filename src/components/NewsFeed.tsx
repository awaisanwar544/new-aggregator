import { useQuery } from 'react-query';
import { Loader } from 'lucide-react';
import { fetchAllNews } from '../services/api';
import { useNewsStore } from '../store/useNewsStore';
import { ArticleCard } from './ArticleCard';

export function NewsFeed() {
  const { filters, sources, categories } = useNewsStore();
  
  const activeSourceIds = sources
    .filter((s) => s.enabled)
    .map((s) => s.id);
  
  const activeCategoryIds = categories
    .filter((c) => c.enabled)
    .map((c) => c.id);

  const { data: articles, isLoading, error } = useQuery(
    ['news', filters, activeSourceIds, activeCategoryIds],
    () => fetchAllNews({
      ...filters,
      sources: activeSourceIds,
      categories: activeCategoryIds,
    }),
    {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        An error occurred while fetching the news.
      </div>
    );
  }

  if (!articles?.length) {
    return (
      <div className="text-center text-gray-500 p-4">
        No articles found matching your criteria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}