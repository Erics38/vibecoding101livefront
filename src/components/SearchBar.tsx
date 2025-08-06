import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search for an item (e.g., water bottle, laptop, scissors)..."
}) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl 
                   focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 
                   transition-all duration-200 shadow-sm hover:shadow-md"
        />
      </div>
    </div>
  );
};