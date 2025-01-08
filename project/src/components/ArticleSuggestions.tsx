import { useState } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'sk-proj-ieJ21gGWAjWFD9UerS3WT3BlbkFJaim8Y9fuSBEnUV408rsO',
  dangerouslyAllowBrowser: true
});

export function ArticleSuggestions() {
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchContent = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setFetchLoading(true);
    setError('');
    
    try {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'f9513d88bemsh78000d428cce2d3p1d08e5jsn328d2231f921',
          'X-RapidAPI-Host': 'news-article-data-extract-and-summarization1.p.rapidapi.com'
        }
      };

      const response = await fetch(`https://news-article-data-extract-and-summarization1.p.rapidapi.com/extract?url=${encodeURIComponent(url)}`, options);
      
      if (!response.ok) {
        throw new Error('Failed to fetch article');
      }
      
      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      if (!result.text) {
        throw new Error('No article content found');
      }
      
      setContent(result.text);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch article content. Please try pasting the content directly.');
    } finally {
      setFetchLoading(false);
    }
  };

  const generateSuggestions = async () => {
    if (!content) {
      setError('Please enter or fetch article content first');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{
          role: "user",
          content: `For the article provided, return 5 headline suggestions in about 10 words each which are punchy and attention grabbing without being too tabloidy. Article content: ${content}`
        }]
      });

      const suggestions = response.choices[0].message.content
        ?.split('\n')
        .filter(line => line.trim())
        .map(line => line.replace(/^\d+\.\s*/, ''));

      setSuggestions(suggestions || []);
    } catch (err) {
      setError('Failed to generate suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Article Content</h2>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Article URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/article"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              />
              <button
                onClick={handleFetchContent}
                disabled={fetchLoading}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-400"
              >
                {fetchLoading ? 'Fetching...' : 'Fetch'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Article Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your article content here..."
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <button
            onClick={generateSuggestions}
            disabled={loading || !content}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-400"
          >
            {loading ? 'Generating...' : 'Generate Headline Suggestions'}
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md mb-4">
            {error}
          </div>
        )}

        {suggestions.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Suggested Headlines</h3>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-3 bg-purple-50 rounded-md hover:bg-purple-100 transition-colors"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}