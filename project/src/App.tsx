import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { ArticleSuggestions } from './components/ArticleSuggestions';
import { SEORankings } from './components/SEORankings';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState('suggestions');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation onNavigate={setActivePage} activePage={activePage} />
        {activePage === 'suggestions' && <ArticleSuggestions />}
        {activePage === 'seo' && <SEORankings />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex min-h-screen">
        <div className="flex-1 hidden lg:block">
          <img 
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80"
            alt="News Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-purple-800 mb-2">Ranker</h1>
              <h2 className="text-2xl font-bold text-gray-900">
                {isLogin ? 'Sign in to your account' : 'Create your account'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  {isLogin ? 'Sign in' : 'Sign up'}
                </button>
              </div>
            </form>

            <div className="text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-purple-600 hover:text-purple-500"
              >
                {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;