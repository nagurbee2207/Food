import React from 'react';
import { Flame, Clock, AlertTriangle, ArrowRight, ShieldAlert, Sparkles, MapPin } from 'lucide-react';
import { useFoodListing } from '../context/FoodListingContext';

export const UrgentPerishableBanner = ({ onClaimItem, onSelectItem }) => {
  const { urgentAlerts } = useFoodListing();

  if (!urgentAlerts || urgentAlerts.length === 0) return null;

  const getTimeRemaining = (expiresAt) => {
    const diff = new Date(expiresAt).getTime() - Date.now();
    if (diff <= 0) return 'Expired';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m left`;
  };

  return (
    <div className="mx-4 sm:mx-6 lg:mx-8 my-6 bg-gradient-to-r from-rose-900 via-amber-900 to-rose-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-rose-500/30 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Banner Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-bold shadow-lg shadow-rose-500/40 animate-pulse">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-widest text-amber-300 uppercase bg-black/40 px-2 py-0.5 rounded-md border border-amber-400/30">
                  ⚠️ Perishable Food Alert
                </span>
                <span className="text-xs text-rose-200 font-semibold">
                  {urgentAlerts.length} {urgentAlerts.length === 1 ? 'item requires' : 'items require'} immediate pickup
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
                Urgent Rescue Needed — Prevent Landfill Waste
              </h2>
            </div>
          </div>

          <span className="text-xs text-amber-200/90 font-medium hidden md:inline">
            Cooked meals and ripe fresh produce ready for instant charity distribution
          </span>
        </div>

        {/* Expiring Items Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {urgentAlerts.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-black/40 backdrop-blur-md border border-white/10 hover:border-amber-400/50 rounded-2xl p-3.5 flex items-center gap-3 transition-all duration-200 group"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white/20"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] font-extrabold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-md">
                    <Clock className="w-3 h-3 text-amber-300" />
                    {getTimeRemaining(item.expiresAt)}
                  </span>
                  <span className="text-[10px] text-slate-300 font-semibold truncate max-w-[80px]">
                    {item.distance}
                  </span>
                </div>

                <h4
                  onClick={() => onSelectItem(item)}
                  className="text-xs font-bold text-white truncate cursor-pointer group-hover:text-amber-300 transition-colors"
                >
                  {item.title}
                </h4>

                <p className="text-[11px] text-slate-300 truncate">
                  {item.quantity} • {item.donorName}
                </p>
              </div>

              <button
                onClick={() => onClaimItem(item)}
                className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-extrabold text-xs shadow-md shadow-rose-500/20 whitespace-nowrap active:scale-95 transition-all"
              >
                Claim Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
