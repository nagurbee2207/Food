import React from 'react';
import {
  X,
  QrCode,
  MapPin,
  Phone,
  Clock,
  Building2,
  CheckCircle2,
  Printer,
  Truck,
  Leaf,
  ShieldCheck,
  Utensils
} from 'lucide-react';
import { useFoodListing } from '../context/FoodListingContext';

export const PickupPassModal = ({ item, onClose }) => {
  if (!item) return null;

  const { setStatus } = useFoodListing();

  const handleUpdateStatus = (newStatus) => {
    setStatus(item.id, newStatus);
  };

  const handlePrint = () => {
    window.print();
  };

  const claimInfo = item.claimedBy || {
    charityName: 'Hope Community Food Bank',
    claimCode: item.claimId || 'CLM-7491',
    recipientContact: '+1 (555) 892-4512',
    eta: 'Pickup within 1 hour'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pass Header */}
        <div className="p-5 border-b border-emerald-100 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center font-bold text-emerald-300">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black">Digital Food Rescue Pass</h2>
                <span className="font-mono text-xs bg-emerald-500/30 border border-emerald-400/40 px-2 py-0.5 rounded text-emerald-200 font-bold">
                  {claimInfo.claimCode}
                </span>
              </div>
              <p className="text-[11px] text-emerald-200">
                Show this digital authorization pass at donor pickup point
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Stepper for Rescue Fulfillment */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
              Rescue Fulfillment Progress
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 mx-auto text-emerald-600 mb-1" />
                <span className="text-[11px] font-extrabold block">1. Claimed</span>
                <span className="text-[9px] text-emerald-700">Reserved</span>
              </div>

              <div className={`p-2 rounded-xl border ${
                item.status === 'picked_up' || item.status === 'distributed'
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-white text-slate-500 border-slate-200'
              }`}>
                <Truck className={`w-4 h-4 mx-auto mb-1 ${item.status === 'picked_up' || item.status === 'distributed' ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className="text-[11px] font-extrabold block">2. Picked Up</span>
                <span className="text-[9px]">In Custody</span>
              </div>

              <div className={`p-2 rounded-xl border ${
                item.status === 'distributed'
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-white text-slate-500 border-slate-200'
              }`}>
                <Utensils className={`w-4 h-4 mx-auto mb-1 ${item.status === 'distributed' ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className="text-[11px] font-extrabold block">3. Distributed</span>
                <span className="text-[9px]">Completed</span>
              </div>
            </div>
          </div>

          {/* QR Code and Pass Details */}
          <div className="bg-gradient-to-b from-slate-50 to-emerald-50/30 p-5 rounded-3xl border border-dashed border-emerald-300 text-center space-y-3">
            <div className="w-28 h-28 mx-auto bg-white p-3 rounded-2xl shadow-md border border-slate-200 flex items-center justify-center">
              <QrCode className="w-full h-full text-slate-900" />
            </div>
            <div>
              <p className="font-mono text-base font-black tracking-widest text-slate-900">
                {claimInfo.claimCode}
              </p>
              <p className="text-xs text-slate-500 font-semibold">
                Authorized for: <strong className="text-emerald-800">{claimInfo.charityName}</strong>
              </p>
            </div>
          </div>

          {/* Food Details summary */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-bold text-slate-900 text-sm block">{item.title}</span>
                <span className="text-slate-500">{item.quantity} • {item.storageReq}</span>
              </div>
              <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                -{item.co2SavedKg} kg CO₂
              </span>
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-1.5 text-slate-600">
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Donor: <strong>{item.donorName}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Location: <strong>{item.location}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Hotline: <strong>{item.donorContact}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                <span>Window: <strong>{item.pickupWindow}</strong></span>
              </div>
            </div>
          </div>

          {/* State Update Quick Actions */}
          <div className="space-y-2 pt-1">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Update Logistics State:
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleUpdateStatus('picked_up')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  item.status === 'picked_up'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                ✓ Mark Picked Up
              </button>

              <button
                type="button"
                onClick={() => handleUpdateStatus('distributed')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  item.status === 'distributed'
                    ? 'bg-teal-700 text-white border-teal-700'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                ✓ Mark Distributed
              </button>
            </div>
          </div>
        </div>

        {/* Pass Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Pass</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
