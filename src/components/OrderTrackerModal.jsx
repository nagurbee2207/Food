import React from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  ChefHat,
  Bike,
  PackageCheck,
  MapPin,
  Phone,
  Printer,
  Receipt
} from 'lucide-react';

export const OrderTrackerModal = ({ order, onClose }) => {
  if (!order) return null;

  const steps = [
    { id: 'Pending', label: 'Order Confirmed', icon: Clock, desc: 'We received your order' },
    { id: 'Preparing', label: 'Kitchen Preparing', icon: ChefHat, desc: 'Chefs are grilling & packing' },
    { id: 'Out for Delivery', label: 'Out for Delivery', icon: Bike, desc: 'Driver is on the way' },
    { id: 'Delivered', label: 'Delivered', icon: PackageCheck, desc: 'Bon Appétit!' }
  ];

  const getStepIndex = (status) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Preparing': return 1;
      case 'Out for Delivery': return 2;
      case 'Delivered': return 3;
      default: return 0;
    }
  };

  const currentStepIdx = getStepIndex(order.status);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900">Live Order Tracker</h2>
                <span className="font-mono text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                  {order.id}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Placed on {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Progress Timeline Stepper */}
          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Real-Time Tracking Status
            </h3>
            <div className="space-y-4">
              {steps.map((step, idx) => {
                const isCompleted = idx <= currentStepIdx;
                const isCurrent = idx === currentStepIdx;

                return (
                  <div key={step.id} className="flex items-start gap-3 relative">
                    {/* Vertical connecting line */}
                    {idx < steps.length - 1 && (
                      <div
                        className={`absolute left-4 top-8 bottom-0 w-0.5 -mb-2 ${
                          idx < currentStepIdx ? 'bg-orange-500' : 'bg-slate-200'
                        }`}
                      />
                    )}

                    {/* Step Icon */}
                    <div
                      className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                        isCompleted
                          ? 'bg-orange-500 text-white shadow-orange-500/25 ring-4 ring-orange-100'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      <step.icon className="w-4 h-4" />
                    </div>

                    {/* Step Label */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`text-xs font-extrabold ${
                            isCompleted ? 'text-slate-900' : 'text-slate-400'
                          }`}
                        >
                          {step.label}
                        </h4>
                        {isCurrent && (
                          <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full animate-pulse">
                            In Progress
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Courier Partner Box */}
          <div className="flex items-center gap-4 bg-orange-50/60 p-4 rounded-2xl border border-orange-100">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold text-xl shadow-md">
              🛵
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                Assigned Express Courier
              </span>
              <h4 className="text-sm font-black text-slate-900">Marco Ramirez</h4>
              <p className="text-xs text-slate-500">Honda Scoopy 125cc • Contact: (555) 890-1234</p>
            </div>
          </div>

          {/* Items Summary */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Items Ordered ({order.items.length})
            </h4>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                    />
                    <div>
                      <span className="font-bold text-slate-800">{item.name}</span>
                      <span className="text-slate-500 ml-1.5 font-medium">× {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-black text-slate-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Receipt Breakdown */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span>${order.subtotal?.toFixed(2) || order.total.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Discount Applied</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-500">
              <span>Delivery Fee</span>
              <span>{order.deliveryFee === 0 ? 'FREE' : `$${order.deliveryFee?.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Tax (8%)</span>
              <span>${order.tax?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900">
              <span>Total Paid</span>
              <span className="text-orange-600">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
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
