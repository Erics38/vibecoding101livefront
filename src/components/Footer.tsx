import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Important Disclaimer</p>
              <p>
                This app provides general TSA guidelines for reference only. Rules may change, 
                and final decisions are always made by TSA officers at security checkpoints. 
                Always check the official TSA website for the most current information.
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-600">
          <p className="mb-2">
            For official TSA information, visit{' '}
            <a 
              href="https://www.tsa.gov/travel/what-can-i-bring" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center space-x-1"
            >
              <span>TSA.gov</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
          <p className="text-sm text-gray-500">
            Built for travelers by travelers • Not affiliated with TSA
          </p>
        </div>
      </div>
    </footer>
  );
};