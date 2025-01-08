import { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';

export function GoogleSearch() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tnmRank, setTnmRank] = useState<number | null>(null);

  const handleSearch = async () => {
    if (!keyword.trim()) {
      setError('Please enter a keyword');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);
    setTnmRank(null);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(keyword)}`
      );

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      const organicResults = data.organic_results || [];
      setResults(organicResults);

      // Find TNM article rank
      const tnmIndex = organicResults.findIndex((result: any) => 
        result.link?.includes('thenewsminute.com')
      );
      setTnmRank(tnmIndex !== -1 ? tnmIndex + 1 : null);

    } catch (err) {
      setError('Failed to fetch search results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter keyword to search..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-400 flex items-center gap-2"
            >
              <Search size={18} />
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {error}
            </div>
          )}

          <div className="mt-6 space-y-6">
            {results.map((result, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg ${
                  result.link?.includes('thenewsminute.com') 
                    ? 'bg-purple-50 border border-purple-200' 
                    : 'bg-gray-50'
                }`}
              >
                <a 
                  href={result.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-lg font-medium text-purple-800 hover:text-purple-600 mb-2"
                >
                  {result.title}
                  <ExternalLink size={16} />
                </a>
                <p className="text-sm text-gray-600 mb-2">{result.snippet}</p>
                <p className="text-xs text-gray-500">{result.link}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-72">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">TNM Rankings</h3>
          {tnmRank ? (
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">#{tnmRank}</div>
              <p className="text-sm text-gray-600">Current rank for "The News Minute"</p>
            </div>
          ) : (
            <p className="text-sm text-gray-600 text-center">
              {results.length > 0 
                ? 'No TNM articles found in search results' 
                : 'Enter a keyword to see TNM rankings'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}