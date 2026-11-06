import React, { useState } from 'react';
import {
  X,
  MapPin,
  Phone,
  CreditCard,
  Banknote,
  QrCode,
  ShieldCheck,
  CheckCircle,
  Truck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { createOrder } from '../utils/storage';

export const CheckoutModal = ({ isOpen, onClose, onOrderSuccess }) => {
  if (!isOpen) return null;

  const { currentUser } = useAuth();
  const {
    cartItems,
    subtotal,
    discountAmount,
    deliveryFee,
    tax,
    total,
    clearCart,
    appliedCoupon
  } = useCart();

  // Form State prefilled from current user if available
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    address: currentUser?.address || '',
    notes: '',
    paymentMethod: 'Credit Card',
    // Mock card data
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '•••'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.address.trim()) errs.address = 'Delivery address is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (cartItems.length === 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const orderPayload = {
          userId: currentUser?.id || 'guest_' + Date.now(),
          customerName: formData.name,
          customerEmail: formData.email || 'customer@foodie.com',
          customerPhone: formData.phone,
          deliveryAddress: formData.address,
          items: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            instructions: item.instructions || ''
          })),
          subtotal,
          discount: discountAmount,
          couponCode: appliedCoupon?.code || null,
          tax,
          deliveryFee,
          total,
          paymentMethod: formData.paymentMethod,
          notes: formData.notes
        };

        const newOrder = createOrder(orderPayload);
        clearCart();
        setIsSubmitting(false);
        onOrderSuccess(newOrder);
      } catch (err) {
        console.error('Order creation failed:', err);
        setIsSubmitting(false);
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Secure Checkout</h2>
              <p className="text-xs text-slate-500 font-medium">
                Fast & contactless doorstep delivery
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
        <form onSubmit={handlePlaceOrder} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Section 1: Delivery Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm uppercase tracking-wide">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>1. Delivery Destination</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all ${
                    errors.name ? 'border-rose-500 bg-rose-50' : 'border-slate-200 focus:border-orange-500'
                  }`}
                />
                {errors.name && <p className="text-[10px] text-rose-500 mt-0.5">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all ${
                    errors.phone ? 'border-rose-500 bg-rose-50' : 'border-slate-200 focus:border-orange-500'
                  }`}
                />
                {errors.phone && <p className="text-[10px] text-rose-500 mt-0.5">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Address</label>
              <input
                type="text"
                placeholder="Street address, building, apartment or suite"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all ${
                  errors.address ? 'border-rose-500 bg-rose-50' : 'border-slate-200 focus:border-orange-500'
                }`}
              />
              {errors.address && <p className="text-[10px] text-rose-500 mt-0.5">{errors.address}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Drop-off Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Leave at front door, ring bell twice, gate code #402"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-orange-500 transition-all"
              />
            </div>
          </div>

          {/* Section 2: Payment Method */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm uppercase tracking-wide">
              <CreditCard className="w-4 h-4 text-orange-500" />
              <span>2. Payment Method</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'Credit Card', label: 'Credit Card', icon: CreditCard },
                { id: 'Cash on Delivery', label: 'Cash on Delivery', icon: Banknote },
                { id: 'UPI / QR Mock', label: 'Instant UPI / QR', icon: QrCode }
              ].map(method => (
                <button
                  type="button"
                  key={method.id}
                  onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                  className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-2 transition-all ${
                    formData.paymentMethod === method.id
                      ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <method.icon className="w-5 h-5" />
                  <span className="text-[11px] font-bold">{method.label}</span>
                </button>
              ))}
            </div>

            {/* Mock Card Preview */}
            {formData.paymentMethod === 'Credit Card' && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Demo Credit Card</span>
                  <span className="font-mono text-amber-400 font-bold">VISA DEMO</span>
                </div>
                <div className="font-mono text-lg tracking-widest text-slate-200">
                  4242 •••• •••• 4242
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
                  <span>CARDHOLDER: {formData.name || 'GUEST USER'}</span>
                  <span>EXP: 12/28</span>
                </div>
              </div>
            )}

            {formData.paymentMethod === 'UPI / QR Mock' && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <div className="w-24 h-24 mx-auto bg-white p-2 rounded-xl border border-slate-300 flex items-center justify-center">
                  <QrCode className="w-20 h-20 text-slate-800" />
                </div>
                <p className="text-xs font-bold text-slate-700">Scan & Pay via any UPI App</p>
                <p className="text-[11px] text-slate-400">Payment automatically verified upon order placement</p>
              </div>
            )}

            {formData.paymentMethod === 'Cash on Delivery' && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
                <Banknote className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold">Pay Cash or Card at Doorstep</p>
                  <p className="text-[11px] text-emerald-600">Our delivery partner carries change and card terminal.</p>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Summary breakdown */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Items Total ({cartItems.length} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Voucher Discount</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm font-extrabold text-slate-900">
              <span>Grand Total</span>
              <span className="text-xl font-black text-orange-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-2xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold"
          >
            Cancel
          </button>

          <button
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing Order...</span>
              </div>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm & Place Order (${total.toFixed(2)})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
