import React from 'react';
import { Search, Plane } from 'lucide-react';

interface EmptyStateProps {
  hasSearched: boolean;
  searchQuery: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ hasSearched, searchQuery }) => {
  if (!hasSearched) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-6 text-blue-400">
          <Plane className="w-full h-full" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Ready for Your Trip?
        </h3>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Search for any item to check TSA regulations for carry-on and checked luggage.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-sm">
          <div className="p-4 bg-blue-50 rounded-lg">
            <strong className="text-blue-700">Try searching:</strong>
            <p className="text-blue-600 mt-1">"water bottle"</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <strong className="text-green-700">Or check:</strong>
            <p className="text-green-600 mt-1">"laptop"</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-lg">
            <strong className="text-amber-700">Maybe ask about:</strong>
            <p className="text-amber-600 mt-1">"scissors"</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 mx-auto mb-6 text-gray-400">
        <Search className="w-full h-full" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No Results Found
      </h3>
      <p className="text-gray-500 mb-4">
        We couldn't find any items matching "{searchQuery}".
      </p>
      <p className="text-sm text-gray-400 max-w-md mx-auto">
        Try searching for common travel items like "toothpaste", "phone charger", 
        "medication", or "tools".
      </p>
    </div>
  );
};