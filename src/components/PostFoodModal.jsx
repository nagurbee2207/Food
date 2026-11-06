import React, { useState } from 'react';
import {
  X,
  PlusCircle,
  Clock,
  MapPin,
  Utensils,
  AlertCircle,
  Thermometer,
  ShieldCheck,
  CheckCircle,
  Leaf,
  Camera
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFoodListing } from '../context/FoodListingContext';

const PRESET_IMAGES = [
  { label: 'Prepared Meal Buffet', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80' },
  { label: 'Artisan Bakery Bread', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80' },
  { label: 'Fresh Produce & Fruits', url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&auto=format&fit=crop&q=80' },
  { label: 'Pasta & Italian Trays', url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop&q=80' },
  { label: 'Dairy & Chilled Goods', url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80' },
  { label: 'Pantry Canned Food', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80' }
];

export const PostFoodModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { currentUser } = useAuth();
  const { postListing } = useFoodListing();

  // Expiry hours from now default
  const [formData, setFormData] = useState({
    title: '',
    category: 'cooked',
    servingsCount: 30,
    weightKg: 12,
    isPerishable: true,
    expiryHours: '4', // 4 hours left default
    storageReq: 'Keep Warm or Refrigerate (4°C)',
    dietary: 'Vegetarian',
    location: currentUser?.address || '750 Grand Promenade Blvd, Downtown Central',
    locationZone: 'downtown',
    pickupWindow: 'Today 5:00 PM - 8:30 PM',
    description: '',
    image: PRESET_IMAGES[0].url,
    donorContact: currentUser?.phone || '+1 (555) 432-8901'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Title of surplus food is required';
    if (!formData.description.trim()) errs.description = 'Please describe the food items and packaging';
    if (!formData.location.trim()) errs.location = 'Pickup address is required';
    if (Number(formData.servingsCount) <= 0) errs.servingsCount = 'Servings must be at least 1';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const hours = parseFloat(formData.expiryHours) || 4;
    const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();

    const distanceMapping = {
      downtown: '0.8 miles away',
      north: '2.5 miles away',
      westside: '3.4 miles away',
      eastend: '5.2 miles away'
    };

    setTimeout(() => {
      postListing({
        title: formData.title,
        category: formData.category,
        donorId: currentUser?.id || 'donor_guest',
        donorName: currentUser?.organization || currentUser?.name || 'Local Food Partner',
        donorContact: formData.donorContact,
        quantity: `${formData.servingsCount} Servings (~${formData.weightKg} kg)`,
        servingsCount: Number(formData.servingsCount),
        weightKg: Number(formData.weightKg),
        isPerishable: formData.isPerishable,
        storageReq: formData.storageReq,
        dietary: formData.dietary,
        location: formData.location,
        locationZone: formData.locationZone,
        distance: distanceMapping[formData.locationZone] || '1.2 miles away',
        pickupWindow: formData.pickupWindow,
        expiresAt,
        description: formData.description,
        image: formData.image
      });

      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-emerald-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-600/20">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Post Surplus Food</h2>
              <p className="text-xs text-slate-500 font-medium">
                Connect your excess wholesome food with local charities & food banks
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
        {success ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Surplus Food Posted!</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Your surplus listing is now live. Local verified food banks and shelters in your area have been notified.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Surplus Food Title *
              </label>
              <input
                type="text"
                placeholder="e.g. 40 Trays Gourmet Vegetable Lasagna & Rolls"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all ${
                  errors.title ? 'border-rose-500 bg-rose-50' : 'border-slate-200 focus:border-emerald-500'
                }`}
              />
              {errors.title && <p className="text-[10px] text-rose-500 mt-0.5">{errors.title}</p>}
            </div>

            {/* Category & Dietary row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs outline-none focus:border-emerald-500"
                >
                  <option value="cooked">Prepared / Cooked Meals</option>
                  <option value="bakery">Bakery & Grains</option>
                  <option value="produce">Fresh Fruits & Produce</option>
                  <option value="dairy">Dairy & Chilled</option>
                  <option value="pantry">Packaged & Canned Goods</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dietary Type</label>
                <select
                  value={formData.dietary}
                  onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs outline-none focus:border-emerald-500"
                >
                  <option value="Vegetarian">Vegetarian 🌿</option>
                  <option value="Vegan">Vegan 🌱</option>
                  <option value="Non-Vegetarian">Non-Vegetarian 🍗</option>
                  <option value="Halal">Halal Certified</option>
                </select>
              </div>
            </div>

            {/* Quantity: Servings & Approx Weight */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Servings Count *</label>
                <input
                  type="number"
                  min="1"
                  value={formData.servingsCount}
                  onChange={(e) => {
                    const serv = e.target.value;
                    setFormData({
                      ...formData,
                      servingsCount: serv,
                      weightKg: Math.round(Number(serv) * 0.4)
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Weight (kg)</label>
                <input
                  type="number"
                  min="1"
                  value={formData.weightKg}
                  onChange={(e) => setFormData({ ...formData, weightKg: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-emerald-500"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-bold text-slate-700 mb-1">Expires In (Hours)</label>
                <select
                  value={formData.expiryHours}
                  onChange={(e) => setFormData({ ...formData, expiryHours: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs outline-none focus:border-emerald-500"
                >
                  <option value="2">2 Hours (Urgent)</option>
                  <option value="4">4 Hours (Urgent)</option>
                  <option value="6">6 Hours</option>
                  <option value="12">12 Hours</option>
                  <option value="24">24 Hours</option>
                  <option value="48">48 Hours</option>
                </select>
              </div>
            </div>

            {/* Storage requirement */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Storage Requirement</label>
              <select
                value={formData.storageReq}
                onChange={(e) => setFormData({ ...formData, storageReq: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs outline-none focus:border-emerald-500"
              >
                <option value="Keep Warm or Refrigerate (4°C)">Keep Warm or Refrigerate (4°C)</option>
                <option value="Strict Cold Storage (2-4°C)">Strict Cold Storage (2-4°C)</option>
                <option value="Dry / Room Temperature">Dry / Room Temperature</option>
                <option value="Frozen (-18°C)">Frozen (-18°C)</option>
              </select>
            </div>

            {/* Pickup Location & Zone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Location Zone</label>
                <select
                  value={formData.locationZone}
                  onChange={(e) => setFormData({ ...formData, locationZone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs outline-none focus:border-emerald-500"
                >
                  <option value="downtown">Downtown Central (&lt; 1 mi)</option>
                  <option value="north">North District (2-3 mi)</option>
                  <option value="westside">Westside Green (3-5 mi)</option>
                  <option value="eastend">East End Riverside (5+ mi)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Time Window</label>
                <input
                  type="text"
                  placeholder="e.g. Today 5:00 PM - 8:30 PM"
                  value={formData.pickupWindow}
                  onChange={(e) => setFormData({ ...formData, pickupWindow: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Street Address for Pickup *</label>
              <input
                type="text"
                placeholder="Building name, street address, suite or loading bay"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all ${
                  errors.location ? 'border-rose-500 bg-rose-50' : 'border-slate-200 focus:border-emerald-500'
                }`}
              />
              {errors.location && <p className="text-[10px] text-rose-500 mt-0.5">{errors.location}</p>}
            </div>

            {/* Photo Preset Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>Select High-Resolution Photo Preset:</span>
                <span className="text-[10px] text-emerald-700 font-semibold">1-Click Thumbnail</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {PRESET_IMAGES.map((img, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setFormData({ ...formData, image: img.url })}
                    className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                      formData.image === img.url
                        ? 'border-emerald-600 scale-105 shadow-md'
                        : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Description & Packaging Condition *
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Freshly sealed in catering pans from convention dinner. Untouched, clean, includes separate vegetable dishes."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`w-full p-3 rounded-xl border text-xs outline-none resize-none transition-all ${
                  errors.description ? 'border-rose-500 bg-rose-50' : 'border-slate-200 focus:border-emerald-500'
                }`}
              />
              {errors.description && <p className="text-[10px] text-rose-500 mt-0.5">{errors.description}</p>}
            </div>
          </form>
        )}

        {/* Modal Footer */}
        {!success && (
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Publishing Listing...</span>
              ) : (
                <>
                  <Leaf className="w-4 h-4" />
                  <span>Publish Surplus Food Listing</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

