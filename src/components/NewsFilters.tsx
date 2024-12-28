import { Search, Calendar, Filter } from 'lucide-react';
import { useNewsStore } from '../store/useNewsStore';

export function NewsFilters() {
  const { filters, setFilters, sources, categories, toggleSource, toggleCategory } = useNewsStore();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search news..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <Calendar size={20} className="text-gray-500" />
            <input
              type="date"
              className="border rounded-lg px-3 py-1.5"
              onChange={(e) => setFilters({ startDate: e.target.value })}
              defaultValue={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div>
            <h3 className="font-medium mb-2 flex items-center">
              <Filter size={20} className="mr-2" /> Sources
            </h3>
            <div className="flex flex-wrap gap-2">
              {sources.map((source) => (
                <button
                  key={source.id}
                  onClick={() => toggleSource(source.id)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    source.enabled
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {source.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    category.enabled
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}