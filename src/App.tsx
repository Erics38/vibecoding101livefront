import React, { useState, useMemo, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { ItemResult } from './components/ItemResult';
import { EmptyState } from './components/EmptyState';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { apiService, TSAItem } from './services/api';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hasSearched, setHasSearched] = useState(false);
  const [displayedItems, setDisplayedItems] = useState<TSAItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');

  // Check API connection on mount
  useEffect(() => {
    const checkAPI = async () => {
      try {
        await apiService.healthCheck();
        setApiStatus('connected');
      } catch (err) {
        console.error('API connection failed:', err);
        setApiStatus('disconnected');
      }
    };
    
    checkAPI();
  }, []);

  // Load items based on search query or category
  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let items: TSAItem[] = [];
        
        if (searchQuery.trim()) {
          // Search for items
          items = await apiService.searchItems(searchQuery);
        } else if (selectedCategory !== 'all') {
          // Get items by category
          const categoryData = await apiService.getItemsByCategory(selectedCategory);
          items = categoryData.items;
        } else {
          // Get all items (limited)
          items = await apiService.getAllItems('all', 50);
        }
        
        setDisplayedItems(items);
      } catch (err) {
        console.error('Failed to load items:', err);
        setError('Failed to load items. Please try again.');
        setDisplayedItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [searchQuery, selectedCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && !hasSearched) {
      setHasSearched(true);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category !== 'all' && !hasSearched) {
      setHasSearched(true);
    }
  };

  const getResultsText = () => {
    if (searchQuery.trim()) {
      const categoryText = selectedCategory !== 'all' ? ` in ${selectedCategory}` : '';
      return `Found ${displayedItems.length} result${displayedItems.length === 1 ? '' : 's'} for "${searchQuery}"${categoryText}`;
    } else if (selectedCategory !== 'all') {
      return `Showing ${displayedItems.length} item${displayedItems.length === 1 ? '' : 's'} in ${selectedCategory}`;
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* API Status Indicator */}
        {apiStatus === 'checking' && (
          <div className="text-center mb-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
              Connecting to API...
            </div>
          </div>
        )}
        
        {apiStatus === 'disconnected' && (
          <div className="text-center mb-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
              ⚠️ Backend API is not connected. Running in offline mode.
            </div>
          </div>
        )}

        <div className="mb-8">
          <SearchBar 
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search for an item (e.g., water bottle, laptop, scissors)..."
          />
        </div>

        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-lg text-sm bg-red-100 text-red-800">
                ⚠️ {error}
              </div>
            </div>
          )}

          {loading && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-lg text-sm bg-blue-100 text-blue-800">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Loading items...
              </div>
            </div>
          )}

          {!loading && !error && displayedItems.length > 0 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <p className="text-gray-600">
                  <span className="font-semibold text-blue-600">{getResultsText()}</span>
                </p>
              </div>
              
              {displayedItems.map((item) => (
                <ItemResult key={item.id} item={item} />
              ))}
            </div>
          )}

          {!loading && !error && displayedItems.length === 0 && (
            <EmptyState 
              hasSearched={hasSearched || selectedCategory !== 'all'} 
              searchQuery={searchQuery} 
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;