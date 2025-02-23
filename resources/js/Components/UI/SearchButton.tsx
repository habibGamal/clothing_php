import React, { useState, useCallback } from 'react';
import { router } from '@inertiajs/react';
import * as _ from 'lodash';

export const SearchButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearch = useCallback(
    _.debounce((query: string) => {
      router.get('/products', { search: query }, {
        preserveState: true,
        preserveScroll: true,
        replace: true
      });
    }, 300),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  return (
    <div className="relative">
      <div className={`flex items-center transition-all duration-300 ease-out ${isExpanded ? 'w-64 md:w-80' : 'w-10'}`}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="ابحث عن الملابس..."
          className={`
            w-full bg-white rounded-full border border-gray-300
            py-2 pr-10 pl-4 text-right text-sm
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            placeholder:text-gray-400
            transition-all duration-300
            ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
        />
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute right-0 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-gray-900"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </button>
      </div>
    </div>
  );
};
