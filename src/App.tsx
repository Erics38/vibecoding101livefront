import React, { useState, useMemo } from 'react';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { ItemResult } from './components/ItemResult';
import { EmptyState } from './components/EmptyState';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { searchItems, getItemsByCategory } from './data/tsaItems';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hasSearched, setHasSearched] = useState(false);

  const displayedItems = useMemo(() => {
    // If there's a search query, prioritize search results
    if (!searchQuery.trim()) {
      // No search query, show items by category
      return selectedCategory === 'all' ? [] : getItemsByCategory(selectedCategory);
    }
    
    // Search within selected category if not 'all'
    const searchResults = searchItems(searchQuery);
    if (selectedCategory === 'all') {
      return searchResults;
    }
    
    return searchResults.filter(item => item.category === selectedCategory);
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
          {displayedItems.length > 0 ? (
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
          ) : (
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