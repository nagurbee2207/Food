import React from 'react';
import {
  Clock,
  MapPin,
  Building2,
  Leaf,
  ShieldCheck,
  CheckCircle2,
  PackageCheck,
  Thermometer,
  Flame,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const FoodListingCard = ({ item, onSelect, onClaim }) => {
  const { currentUser, isRecipient, isDonor } = useAuth();

  // Expiration calculation
  const getExpiryBadge = () => {
    if (!item.expiresAt) return null;
    const diff = new Date(item.expiresAt).getTime() - Date.now();
    if (diff <= 0) {
      return (
        <span className="bg-slate-800 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
          Expired
        </span>
      );
    }
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours < 6) {
      return (
        <span className="bg-rose-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-md flex items-center gap-1 uppercase tracking-wider animate-pulse">
          <Flame className="w-3 h-3 text-amber-300" />
          Urgent: {hours}h {minutes}m left
        </span>
      );
    }
    return (
      <span className="bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
        <Clock className="w-3 h-3 text-emerald-300" />
        Expires in {hours}h
      </span>
    );
  };

  const isAvailable = item.status === 'available';
  const isClaimed = item.status === 'claimed';
  const isDistributed = item.status === 'distributed';

  return (
    <div
      onClick={() => onSelect(item)}
      className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Food Photo Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {/* Expiration urgency badge */}
          <div className="pointer-events-auto">
            {getExpiryBadge()}
          </div>

          {/* Dietary badge */}
          <span className="pointer-events-auto text-[10px] font-extrabold bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-slate-800 shadow-sm border border-white/40">
            {item.dietary === 'Vegetarian' && '🌿 Veg'}
            {item.dietary === 'Vegan' && '🌱 100% Vegan'}
            {item.dietary === 'Non-Vegetarian' && '🍗 Non-Veg'}
          </span>
        </div>

        {/* Claimed / Distributed Overlays */}
        {!isAvailable && (
          <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center">
            <span className={`text-xs font-black px-3.5 py-1.5 rounded-xl uppercase tracking-wider shadow-lg ${
              isClaimed ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-white'
            }`}>
              {isClaimed ? 'Reserved by Food Bank' : 'Successfully Distributed'}
            </span>
            {item.claimedBy && (
              <p className="text-white text-xs font-semibold mt-2 truncate max-w-xs">
                {item.claimedBy.charityName}
              </p>
            )}
          </div>
        )}

        {/* Bottom image overlay: Servings & Storage */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
            <span>📦 {item.quantity}</span>
          </div>
          <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] flex items-center gap-1">
            <Thermometer className="w-3 h-3 text-emerald-400" />
            <span>{item.storageReq}</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Donor details row */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-bold text-slate-700 truncate">{item.donorName}</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" title="Verified Food Donor" />
          </div>

          {/* Title */}
          <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
            {item.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Location & Logistics info */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span className="truncate">{item.location}</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded shrink-0">
              {item.distance}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Window: {item.pickupWindow}</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-700 font-bold">
              <Leaf className="w-3 h-3" />
              <span>Saves {item.co2SavedKg} kg CO₂</span>
            </div>
          </div>
        </div>

        {/* Actions Row */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(item);
            }}
            className="text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            Full Details
          </button>

          {isAvailable ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClaim(item);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
            >
              <span>Claim for Charity</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
              {isClaimed ? 'Claimed' : 'Delivered'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
