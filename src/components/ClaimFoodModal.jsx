import React, { useState } from 'react';
import {
  X,
  PackageCheck,
  Building2,
  Clock,
  Truck,
  Phone,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFoodListing } from '../context/FoodListingContext';

export const ClaimFoodModal = ({ item, isOpen, onClose, onClaimSuccess }) => {
  if (!isOpen || !item) return null;

  const { currentUser } = useAuth();
  const { claimListing } = useFoodListing();

  const [formData, setFormData] = useState({
    charityName: currentUser?.organization || currentUser?.name || 'Hope Community Food Bank',
    contactName: currentUser?.name || 'Community Volunteer',
    phone: currentUser?.phone || '+1 (555) 892-4512',
    email: currentUser?.email || 'charity@hopefoodbank.org',
    eta: 'Pickup within 1 hour',
    transportType: 'Refrigerated Van / Food Rescue Vehicle',
    notes: 'Bringing insulated thermal boxes to maintain food safety.'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleConfirmClaim = (e) => {
    e.preventDefault();
    if (!formData.charityName.trim()) {
      setError('Please provide the recipient charity or organization name.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Please provide a valid contact phone number.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      try {
        const recipientUser = {
          id: currentUser?.id || 'charity_' + Date.now(),
          name: formData.contactName,
          organization: formData.charityName,
          phone: formData.phone,
          email: formData.email
        };

        const updated = claimListing(item.id, recipientUser, {
          eta: formData.eta,
          transportType: formData.transportType,
          notes: formData.notes
        });

        setIsSubmitting(false);
        onClaimSuccess(updated);
      } catch (err) {
        setError(err.message || 'Failed to claim listing.');
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-emerald-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-600/20">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Claim Surplus Food</h2>
              <p className="text-xs text-slate-500 font-medium">
                Reserve this donation for your charity or community food bank
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

        {/* Content Body */}
        <form onSubmit={handleConfirmClaim} className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Target Food Summary Snippet */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center gap-3">
            <img
              src={item.image}
              alt={item.title}
              className="w-14 h-14 rounded-xl object-cover border border-slate-300 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-black text-slate-900 truncate">{item.title}</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {item.quantity} • Donor: <strong>{item.donorName}</strong>
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-bold mt-1">
                <MapPin className="w-3 h-3 text-rose-500" />
                <span className="truncate">{item.location} ({item.distance})</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Recipient Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              Charity & Logistics Details
            </h4>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Organization / Food Bank Name *
              </label>
              <input
                type="text"
                value={formData.charityName}
                onChange={(e) => setFormData({ ...formData, charityName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contact Person *
                </label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contact Phone *
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Estimated Pickup ETA
                </label>
                <select
                  value={formData.eta}
                  onChange={(e) => setFormData({ ...formData, eta: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs outline-none focus:border-emerald-500"
                >
                  <option value="Pickup within 30 minutes">Pickup within 30 minutes</option>
                  <option value="Pickup within 1 hour">Pickup within 1 hour</option>
                  <option value="Pickup within 2 hours">Pickup within 2 hours</option>
                  <option value="Pickup before deadline tonight">Pickup before deadline tonight</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Transportation Vehicle
                </label>
                <select
                  value={formData.transportType}
                  onChange={(e) => setFormData({ ...formData, transportType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs outline-none focus:border-emerald-500"
                >
                  <option value="Refrigerated Van / Food Rescue Vehicle">Refrigerated Van</option>
                  <option value="Personal Car with Thermal Boxes">Car with Thermal Boxes</option>
                  <option value="Cargo E-Bike / Cart">Cargo E-Bike</option>
                  <option value="Volunteer Walk-in Carrier">Volunteer Walk-in</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Distribution / Volunteer Note
              </label>
              <input
                type="text"
                placeholder="e.g. Distributing directly to downtown community evening shelter"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-2xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmClaim}
            disabled={isSubmitting}
            className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Confirming Reservation...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm Reservation & Generate Pass</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
