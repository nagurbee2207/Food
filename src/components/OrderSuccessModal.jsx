import React from 'react';
import { CheckCircle2, Clock, MapPin, ArrowRight, Sparkles, ReceiptText } from 'lucide-react';

export const OrderSuccessModal = ({ order, onClose, onTrackOrder }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Success Badge */}
        <div className="relative w-20 h-20 mx-auto">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>
          <div className="absolute -top-1 -right-1 text-2xl animate-pulse">🎉</div>
        </div>

        <div>
          <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
            Order Confirmed!
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-2">
            Deliciousness is On The Way!
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Order Reference: <strong className="text-slate-800 font-mono">{order.id}</strong>
          </p>
        </div>

        {/* Info card */}
        <div className="bg-slate-50 rounded-2xl p-4 text-left border border-slate-100 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <Clock className="w-4 h-4 text-orange-500 shrink-0" />
            <span>Estimated Delivery: <strong>{order.estimatedDeliveryTime || '30-40 min'}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="truncate">Delivering to: <strong>{order.deliveryAddress}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <ReceiptText className="w-4 h-4 text-purple-500 shrink-0" />
            <span>Total Paid: <strong>${order.total.toFixed(2)}</strong> via {order.paymentMethod}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => onTrackOrder(order)}
            className="w-full py-3.5 px-4 rounded-2xl bg-orange-500 hover:bg-orange-600 active:scale-98 text-white font-extrabold text-sm shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 transition-all"
          >
            <span>Track Order in Real-Time</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs transition-colors"
          >
            Back to Home & Menu
          </button>
        </div>
      </div>
    </div>
  );
};
