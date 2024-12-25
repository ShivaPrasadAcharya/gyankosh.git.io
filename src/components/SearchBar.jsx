import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <Input
        type="text"
        className="pl-10 pr-4"
        placeholder="Search terms (use | for multiple terms, e.g., 'Meditation|Karma')"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <div className="absolute right-3 top-2 text-xs text-gray-500">
          Use | to search multiple terms
        </div>
      )}
    </div>
  );
};

export default SearchBar;
