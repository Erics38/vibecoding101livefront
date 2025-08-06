import React from 'react';
import { 
  Droplets, 
  Laptop, 
  Scissors, 
  Heart, 
  Wrench, 
  Apple, 
  Trophy, 
  Shield, 
  Package 
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'All Categories', icon: Package },
  { id: 'Liquids', name: 'Liquids & Gels', icon: Droplets },
  { id: 'Electronics', name: 'Electronics', icon: Laptop },
  { id: 'Sharp Objects', name: 'Sharp Objects', icon: Scissors },
  { id: 'Medical', name: 'Medical Items', icon: Heart },
  { id: 'Tools', name: 'Tools', icon: Wrench },
  { id: 'Food', name: 'Food & Drinks', icon: Apple },
  { id: 'Sports', name: 'Sports Equipment', icon: Trophy },
  { id: 'Weapons', name: 'Weapons', icon: Shield },
  { id: 'Miscellaneous', name: 'Miscellaneous', icon: Package },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        Browse by Category
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`
                flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200
                hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md' 
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }
              `}
            >
              <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
              <span className="text-sm font-medium text-center leading-tight">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};