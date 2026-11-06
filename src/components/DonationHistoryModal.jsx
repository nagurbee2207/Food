import React, { useState } from 'react';
import {
  X,
  PackageCheck,
  Building2,
  Clock,
  MapPin,
  Leaf,
  Eye,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFoodListing } from '../context/FoodListingContext';

export const DonationHistoryModal = ({ isOpen, onClose, onSelectPass }) => {
  if (!isOpen) return null;

  const { currentUser } = useAuth();
  const { listings } = useFoodListing();

  const [activeTab, setActiveTab] = useState('all');

  const filtered = listings.filter((item) => {
    if (activeTab === 'my_donations') {
      return item.donorId === currentUser?.id || item.donorName === currentUser?.organization;
    }
    if (activeTab === 'my_claims') {
      return item.claimedBy?.recipientId === currentUser?.id || item.claimedBy?.charityName === currentUser?.organization;
    }
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">Available</span>;
      case 'claimed':
        return <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">Claimed</span>;
      case 'picked_up':
        return <span className="bg-blue-100 text-blue-800 border border-blue-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">Picked Up</span>;
      case 'distributed':
        return <span className="bg-teal-100 text-teal-800 border border-teal-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">Distributed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-emerald-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-600/20">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Donation & Claim History</h2>
              <p className="text-xs text-slate-500 font-medium">
                Track surplus food transfers, pickup passes, and environmental impact
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="px-6 pt-4 flex items-center gap-2 border-b border-slate-100">
          {[
            { id: 'all', label: 'All Platform Transfers' },
            { id: 'my_donations', label: 'My Posted Donations' },
            { id: 'my_claims', label: 'My Claimed Pickups' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-xs font-bold transition-all relative ${
                activeTab === tab.id
                  ? 'text-emerald-800 font-extrabold border-b-2 border-emerald-600'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Listings List */}
        <div className="p-6 overflow-y-auto space-y-3.5 flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-3xl mx-auto">
                📦
              </div>
              <h3 className="font-extrabold text-slate-800 text-base">No Records in this Filter</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Post surplus food or claim available donations to see them recorded in your history.
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 hover:border-emerald-300 transition-all space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800">
                      {item.id}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div>{getStatusBadge(item.status)}</div>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {item.quantity} • Donor: <strong>{item.donorName}</strong>
                    </p>
                    {item.claimedBy && (
                      <p className="text-[11px] text-emerald-700 font-semibold truncate mt-0.5">
                        Claimed by: {item.claimedBy.charityName} ({item.claimedBy.claimCode})
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <Leaf className="w-3.5 h-3.5" />
                    <span>Rescued {item.servingsCount} meals (-{item.co2SavedKg} kg CO₂)</span>
                  </div>

                  {item.claimedBy && (
                    <button
                      onClick={() => {
                        onSelectPass(item);
                        onClose();
                      }}
                      className="flex items-center gap-1 text-emerald-800 font-bold hover:underline"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Pass & Logistics</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
