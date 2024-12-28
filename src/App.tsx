import { QueryClient, QueryClientProvider } from 'react-query';
import { Newspaper } from 'lucide-react';
import { NewsFilters } from './components/NewsFilters';
import { NewsFeed } from './components/NewsFeed';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center">
              <Newspaper className="text-blue-500 mr-3" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">News Aggregator</h1>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NewsFilters />
          <NewsFeed />
        </main>

        <footer className="bg-white border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <p className="text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} News Aggregator. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;