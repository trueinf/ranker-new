import { useState } from 'react';
import { GoogleSearch } from './GoogleSearch';

type Tab = 'google' | 'bing' | 'perplexity';

export function SEORankings() {
  const [activeTab, setActiveTab] = useState<Tab>('google');

  return (
    <div className="p-6">
      <div className="mb-6">
        <nav className="flex space-x-4 border-b border-gray-200">
          {[
            { id: 'google', label: 'Google' },
            { id: 'bing', label: 'Bing (SearchGPT)' },
            { id: 'perplexity', label: 'Perplexity' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`py-2 px-4 text-sm font-medium border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'google' && <GoogleSearch />}
      {activeTab === 'bing' && <div>Bing search coming soon...</div>}
      {activeTab === 'perplexity' && <div>Perplexity search coming soon...</div>}
    </div>
  );
}