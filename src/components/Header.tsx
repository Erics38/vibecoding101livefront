import React from 'react';
import { Shield, Plane } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold">TSA Item Checker</h1>
            <Plane className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <p className="text-center text-blue-100 text-lg max-w-2xl mx-auto">
          Check if your items are allowed in carry-on or checked luggage before you travel.
          Stay informed and travel with confidence.
        </p>
      </div>
    </header>
  );
};