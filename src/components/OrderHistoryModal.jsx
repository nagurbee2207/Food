import React, { useEffect, useState } from 'react';
import { X, Clock, Package, ArrowRight, RotateCcw, Eye, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getOrders } from '../utils/storage';

export const OrderHistoryModal = ({ isOpen, onClose, onTrackOrder }) => {
  if (!isOpen) return null;

  const { currentUser } = useAuth();
  const { addToCart } = useCart();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const all = getOrders();
    if (currentUser) {
      // Filter by current user if logged in, or show orders matching email
      const userOrders = all.filter(
        o => o.userId === currentUser.id || o.customerEmail === currentUser.email
      );
      setOrders(userOrders);
    } else {
      setOrders(all);
    }
  }, [currentUser]);

  const handleReorder = (order) => {
    order.items.forEach(item => {
      addToCart(item, item.quantity);
    });
    alert('Items from this order have been added to your cart!');
    onClose();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Preparing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Out for Delivery':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Your Past Orders</h2>
              <p className="text-xs text-slate-500 font-medium">
                Track status, view receipts, and easily reorder favorite meals
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

        {/* Orders List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-3xl mx-auto">
                📦
              </div>
              <h3 className="font-extrabold text-slate-800 text-base">No Orders Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Once you place an order, its real-time progress and receipts will appear here.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 hover:border-orange-300 transition-all space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-white px-2 py-1 rounded-md border border-slate-200 text-slate-800">
                      {order.id}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString()} at{' '}
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border uppercase tracking-wider ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items thumbnail row */}
                <div className="flex flex-wrap items-center gap-2">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-6 h-6 rounded-md object-cover"
                      />
                      <span className="font-bold text-slate-800">{item.name}</span>
                      <span className="text-slate-400 font-semibold">×{item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Row: Total & Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Total Paid
                    </span>
                    <span className="text-base font-black text-slate-900">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onTrackOrder(order)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold transition-colors border border-orange-200"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Track / Receipt</span>
                    </button>

                    <button
                      onClick={() => handleReorder(order)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Re-order</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
