import React from 'react';
import { Utensils, Scale, Leaf, Users2, ShieldCheck, Heart } from 'lucide-react';
import { useFoodListing } from '../context/FoodListingContext';

export const ImpactStats = () => {
  const { impactMetrics } = useFoodListing();

  const stats = [
    {
      id: 'meals',
      label: 'Meals Rescued',
      value: impactMetrics.totalMealsSaved.toLocaleString(),
      subtext: 'Nourished vulnerable communities',
      icon: Utensils,
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconBg: 'bg-emerald-500 text-white'
    },
    {
      id: 'weight',
      label: 'Food Diverted',
      value: `${impactMetrics.totalWeightRescuedKg.toLocaleString()} kg`,
      subtext: 'Saved from municipal landfills',
      icon: Scale,
      bg: 'bg-teal-50 text-teal-700 border-teal-200',
      iconBg: 'bg-teal-600 text-white'
    },
    {
      id: 'co2',
      label: 'CO₂e Prevented',
      value: `${impactMetrics.totalCo2SavedKg.toLocaleString()} kg`,
      subtext: 'Greenhouse gas emissions averted',
      icon: Leaf,
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
      iconBg: 'bg-amber-500 text-white'
    },
    {
      id: 'partners',
      label: 'Community Partners',
      value: `${impactMetrics.activeDonorsCount + impactMetrics.activeCharitiesCount}+`,
      subtext: 'Hotels, grocers & registered charities',
      icon: Users2,
      bg: 'bg-sky-50 text-sky-800 border-sky-200',
      iconBg: 'bg-sky-600 text-white'
    }
  ];

  return (
    <div className="mx-4 sm:mx-6 lg:mx-8 mb-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`p-4 sm:p-5 rounded-3xl border shadow-sm transition-all hover:shadow-md ${stat.bg} flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider opacity-80">
                {stat.label}
              </span>
              <div className={`w-8 h-8 rounded-xl ${stat.iconBg} flex items-center justify-center shadow-sm`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {stat.value}
              </div>
              <p className="text-[11px] opacity-75 font-medium mt-0.5 truncate">
                {stat.subtext}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

