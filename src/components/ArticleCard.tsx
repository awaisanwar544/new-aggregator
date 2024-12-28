import { ExternalLink, Clock, User } from 'lucide-react';
import { Article } from '../types/news';
import { formatDistanceToNow } from 'date-fns';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-600">{article.source}</span>
          <span className="text-sm text-gray-500 flex items-center">
            <Clock size={16} className="mr-1" />
            {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
          </span>
        </div>
        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
        <p className="text-gray-600 mb-4">{article.description}</p>
        <div className="flex items-center justify-between">
          {article.author && (
            <span className="text-sm text-gray-500 flex items-center">
              <User size={16} className="mr-1" />
              {article.author}
            </span>
          )}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-500 hover:text-blue-600"
          >
            Read more <ExternalLink size={16} className="ml-1" />
          </a>
        </div>
      </div>
    </article>
  );
}