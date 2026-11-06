import React, { useState } from 'react';
import {
  X,
  MapPin,
  Clock,
  Building2,
  Phone,
  Leaf,
  Scale,
  Utensils,
  Thermometer,
  ShieldCheck,
  Flame,
  ArrowRight,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFoodListing } from '../context/FoodListingContext';

export const FoodDetailModal = ({ item, onClose, onClaim }) => {
  if (!item) return null;

  const { currentUser, isAdmin } = useAuth();
  const { cancelClaim } = useFoodListing();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const isAvailable = item.status === 'available';
  const isClaimed = item.status === 'claimed';

  const handleCancelReservation = () => {
    cancelClaim(item.id, 'Reservation cancelled from details view');
    alert('Reservation cancelled. The food has been released back to the public feed.');
    onClose();
  };

  const getTimeRemaining = (expiresAt) => {
    if (!expiresAt) return 'No expiry provided';
    const diff = new Date(expiresAt).getTime() - Date.now();
    if (diff <= 0) return 'Expired';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m left`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Image Header */}
        <div className="relative aspect-video w-full bg-slate-100">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/40" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on Image */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="text-[11px] font-extrabold bg-emerald-600 text-white px-3 py-1 rounded-full shadow-md">
              {item.category.toUpperCase()}
            </span>
            <span className="text-[11px] font-bold bg-white/90 text-slate-800 px-3 py-1 rounded-full backdrop-blur-md shadow-md">
              {item.dietary}
            </span>
          </div>

          {/* Title on Image */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-bold mb-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>{item.donorName}</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black leading-tight">
              {item.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Urgency & Expiration Alert Bar */}
          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl flex items-center justify-between text-xs font-bold text-amber-900">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Consume Before: {new Date(item.expiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md font-mono">
              {getTimeRemaining(item.expiresAt)}
            </span>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Quantity</span>
              <span className="text-sm font-black text-slate-900 mt-0.5 block">{item.quantity}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Storage</span>
              <span className="text-xs font-bold text-emerald-700 mt-0.5 block">{item.storageReq}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Carbon Impact</span>
              <span className="text-xs font-bold text-teal-700 mt-0.5 block">-{item.co2SavedKg} kg CO₂</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Food Description & Packaging
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Pickup Logistics */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2.5 text-xs">
            <h4 className="font-extrabold text-slate-800 uppercase tracking-wider text-[11px]">
              Pickup Location & Details
            </h4>
            <div className="flex items-start gap-2 text-slate-700">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">{item.location}</p>
                <p className="text-[11px] text-slate-400">Proximity: {item.distance}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Pickup Window: <strong>{item.pickupWindow}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Phone className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Donor Hotline: <strong>{item.donorContact}</strong></span>
            </div>
          </div>

          {/* Claim status info if not available */}
          {!isAvailable && item.claimedBy && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs space-y-1">
              <p className="font-extrabold text-emerald-900">Claimed by Registered Food Partner:</p>
              <p className="font-bold text-emerald-800">{item.claimedBy.charityName}</p>
              <p className="text-emerald-700">Claim Code: <strong className="font-mono">{item.claimedBy.claimCode}</strong></p>
              <p className="text-[11px] text-emerald-600">ETA: {item.claimedBy.eta}</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-2xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors"
          >
            Close
          </button>

          {isAvailable ? (
            <button
              onClick={() => {
                onClose();
                onClaim(item);
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/25 active:scale-98 transition-all"
            >
              <span>Claim This Surplus Food</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : isClaimed ? (
            <div className="flex items-center gap-2">
              {!showCancelConfirm ? (
                <button
                  type="button"
                  onClick={() => setShowCancelConfirm(true)}
                  className="px-4 py-2.5 rounded-2xl bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Cancel Reservation</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 p-1.5 rounded-xl text-xs">
                  <span className="text-rose-800 font-bold text-[11px] px-1">Release food?</span>
                  <button
                    type="button"
                    onClick={handleCancelReservation}
                    className="px-3 py-1 bg-rose-600 text-white rounded-lg font-bold text-xs"
                  >
                    Yes, Release
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCancelConfirm(false)}
                    className="px-2 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs"
                  >
                    No
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs font-bold text-slate-500">
              This donation is currently locked or fulfilled.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
