import React from 'react';
import { FOOD_CATEGORIES, LOCATIONS } from '../data/initialData';
import { MapPin, Flame, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const FoodFilters = ({
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  dietaryFilter,
  setDietaryFilter,
  urgentOnly,
  setUrgentOnly,
  itemsCount
}) => {
  return (
    <div className="mx-4 sm:mx-6 lg:mx-8 mb-6 space-y-4">
      {/* Category Pills horizontal scroll */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {FOOD_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 select-none ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-700/20 scale-[1.02]'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary Controls: Location Selector + Dietary Filters + Urgent Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Left: Location Proximity Filter */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-2xl px-3 py-2 shadow-sm text-xs">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-500 hidden sm:inline">Location:</span>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Urgent Perishable Quick Filter Toggle */}
          <button
            onClick={() => setUrgentOnly(!urgentOnly)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold border transition-all ${
              urgentOnly
                ? 'bg-rose-500 text-white border-rose-600 shadow-md shadow-rose-500/20'
                : 'bg-white text-slate-700 border-slate-200 hover:border-rose-300'
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${urgentOnly ? 'text-white' : 'text-rose-500'}`} />
            <span>Expiring Soon (&lt; 6 hrs)</span>
          </button>
        </div>

        {/* Right: Dietary Options */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs">
            {[
              { id: 'all', label: 'All Diets' },
              { id: 'vegetarian', label: 'Veg' },
              { id: 'vegan', label: 'Vegan' },
              { id: 'non-vegetarian', label: 'Non-Veg' }
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setDietaryFilter(d.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  dietaryFilter === d.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <span className="text-xs font-semibold text-slate-500 hidden md:inline ml-2">
            <strong>{itemsCount}</strong> listings
          </span>
        </div>
      </div>
    </div>
  );
};

