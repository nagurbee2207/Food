import React from 'react';
import { CATEGORIES } from '../data/initialData';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const CategoryFilter = ({
  activeCategory,
  setActiveCategory,
  dietaryFilter,
  setDietaryFilter,
  sortBy,
  setSortBy,
  itemCount
}) => {
  return (
    <div className="space-y-4 mb-8">
      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 select-none ${
                isActive
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25 scale-[1.02]'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span className="text-base sm:text-lg">{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary Controls: Diet filter & Sorting */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        {/* Diet Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'veg', label: 'Veg Only 🌿' },
            { id: 'nonveg', label: 'Non-Veg 🍗' }
          ].map(d => (
            <button
              key={d.id}
              onClick={() => setDietaryFilter(d.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                dietaryFilter === d.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Right side: Item count & Sort Dropdown */}
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
            Showing <strong className="text-slate-800">{itemCount}</strong> dishes
          </span>

          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-2xl px-3 py-1.5 shadow-sm">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
