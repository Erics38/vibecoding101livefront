import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Luggage, Briefcase } from 'lucide-react';
import { TSAItem } from '../data/tsaItems';

interface ItemResultProps {
  item: TSAItem;
}

export const ItemResult: React.FC<ItemResultProps> = ({ item }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'allowed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'prohibited':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'restricted':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'allowed':
        return 'Allowed';
      case 'prohibited':
        return 'Prohibited';
      case 'restricted':
        return 'Restricted';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'allowed':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'prohibited':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'restricted':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.name}</h3>
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
            {item.category}
          </span>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4 leading-relaxed">{item.description}</p>
      
      {item.rules && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Rules:</strong> {item.rules}
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`flex items-center justify-between p-3 rounded-lg border ${getStatusColor(item.carryOn)}`}>
          <div className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5" />
            <span className="font-medium">Carry-On</span>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon(item.carryOn)}
            <span className="text-sm font-medium">{getStatusText(item.carryOn)}</span>
          </div>
        </div>
        
        <div className={`flex items-center justify-between p-3 rounded-lg border ${getStatusColor(item.checkedBag)}`}>
          <div className="flex items-center space-x-2">
            <Luggage className="w-5 h-5" />
            <span className="font-medium">Checked Bag</span>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon(item.checkedBag)}
            <span className="text-sm font-medium">{getStatusText(item.checkedBag)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};