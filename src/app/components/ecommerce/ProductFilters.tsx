'use client';

import React, { useState } from 'react';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  type: 'checkbox' | 'radio' | 'range';
}

interface ProductFiltersProps {
  filters: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (filterId: string, optionId: string, checked: boolean) => void;
  onClearFilters: () => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  selectedFilters,
  onFilterChange,
  onClearFilters,
  priceRange,
  onPriceRangeChange
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(filters.map(f => f.id))
  );

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const getActiveFiltersCount = () => {
    return Object.values(selectedFilters).reduce((count, filters) => count + filters.length, 0);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-nike-black">Filtros</h3>
        {getActiveFiltersCount() > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm text-accent-600 hover:text-accent-700 font-medium transition-colors duration-200"
          >
            Limpar ({getActiveFiltersCount()})
          </button>
        )}
      </div>

      {/* Filtro de Preço */}
      <div className="mb-6 pb-6 border-b border-nike-gray-200">
        <h4 className="font-semibold text-nike-black mb-4">Faixa de Preço</h4>
        
        <div className="space-y-4">
          {/* Range Slider */}
          <div className="relative">
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={priceRange[0]}
              onChange={(e) => onPriceRangeChange([parseInt(e.target.value), priceRange[1]])}
              className="absolute w-full h-2 bg-nike-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
              className="absolute w-full h-2 bg-nike-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          {/* Valores */}
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-nike-black">
              {formatPrice(priceRange[0])}
            </span>
            <span className="text-nike-gray-500">até</span>
            <span className="font-medium text-nike-black">
              {formatPrice(priceRange[1])}
            </span>
          </div>
        </div>
      </div>

      {/* Grupos de Filtros */}
      <div className="space-y-6">
        {filters.map((group) => (
          <div key={group.id} className="border-b border-nike-gray-200 pb-6 last:border-b-0 last:pb-0">
            <button
              onClick={() => toggleGroup(group.id)}
              className="flex items-center justify-between w-full text-left mb-4 hover:text-accent-600 transition-colors duration-200"
            >
              <h4 className="font-semibold text-nike-black">{group.label}</h4>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  expandedGroups.has(group.id) ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedGroups.has(group.id) && (
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {group.options.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center gap-3 cursor-pointer hover:bg-nike-gray-50 p-2 rounded-lg transition-colors duration-200"
                  >
                    <input
                      type={group.type === 'radio' ? 'radio' : 'checkbox'}
                      name={group.type === 'radio' ? group.id : undefined}
                      checked={selectedFilters[group.id]?.includes(option.id) || false}
                      onChange={(e) => onFilterChange(group.id, option.id, e.target.checked)}
                      className="w-4 h-4 text-accent-600 border-nike-gray-300 rounded focus:ring-accent-500 focus:ring-2"
                    />
                    <span className="flex-1 text-sm text-nike-black">
                      {option.label}
                    </span>
                    {option.count && (
                      <span className="text-xs text-nike-gray-500 bg-nike-gray-100 px-2 py-1 rounded-full">
                        {option.count}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Filtros Rápidos */}
      <div className="mt-6 pt-6 border-t border-nike-gray-200">
        <h4 className="font-semibold text-nike-black mb-4">Filtros Rápidos</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Novidades', filter: 'new' },
            { label: 'Promoção', filter: 'sale' },
            { label: 'Mais Vendidos', filter: 'bestseller' },
            { label: 'Avaliação 5★', filter: 'top-rated' }
          ].map((quick) => (
            <button
              key={quick.filter}
              className="px-3 py-2 text-xs font-medium bg-nike-gray-100 text-nike-gray-700 rounded-full hover:bg-accent-600 hover:text-white transition-all duration-200"
            >
              {quick.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;