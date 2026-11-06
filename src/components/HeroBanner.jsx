import React, { useState } from 'react';
import { Sparkles, Clock, ShieldCheck, Flame, Tag, Check, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const HeroBanner = ({ onExploreMenu }) => {
  const { applyCoupon } = useCart();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleApplyCoupon = (code) => {
    applyCoupon(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-6 p-6 sm:p-10 lg:p-14 shadow-2xl border border-slate-700/50">
      {/* Background Decorative Blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Hero Copy */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-wide">
            <Flame className="w-4 h-4 text-orange-400 animate-bounce" />
            <span>Chef's Winter Culinary Masterpieces</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
            Handcrafted Flavors, <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
              Delivered Hot & Fast.
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
            Experience restaurant-grade wagyu burgers, artisan wood-fired pizzas, fresh sushi rolls, and decadent desserts prepared by certified master chefs.
          </p>

          {/* Quick Coupon Codes */}
          <div className="pt-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-center lg:justify-start gap-1.5">
              <Tag className="w-3.5 h-3.5 text-orange-400" />
              Click to activate exclusive discount codes:
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              {[
                { code: 'TASTY20', label: '20% OFF (Min $25)' },
                { code: 'WELCOME50', label: '$10 OFF (Min $30)' },
                { code: 'FREESHIP', label: 'Free Delivery' }
              ].map(promo => (
                <button
                  key={promo.code}
                  onClick={() => handleApplyCoupon(promo.code)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    copiedCode === promo.code
                      ? 'bg-emerald-500 text-white border-emerald-400 scale-105'
                      : 'bg-white/10 hover:bg-white/20 text-orange-300 border-white/15'
                  }`}
                >
                  {copiedCode === promo.code ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{promo.code} Applied!</span>
                    </>
                  ) : (
                    <>
                      <span className="bg-orange-500 text-white px-1.5 py-0.5 rounded text-[10px]">{promo.code}</span>
                      <span className="text-white/80">{promo.label}</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* CTA & Trust badges */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              onClick={onExploreMenu}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-3.5 rounded-2xl font-extrabold text-sm shadow-xl shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore Full Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>30 Min Express</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Hygienic</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Hero Dish Collage */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="relative w-full max-w-sm aspect-square">
            {/* Main dish circle card */}
            <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 relative group">
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80"
                alt="Signature Truffle Burger"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-orange-500 text-white uppercase tracking-wider">
                      Chef Special
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">Truffle Wagyu Supreme</h3>
                  </div>
                  <span className="text-xl font-extrabold text-amber-400">$18.99</span>
                </div>
              </div>
            </div>

            {/* Floating Review Badge */}
            <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md text-slate-900 rounded-2xl p-3 shadow-xl border border-white/40 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl">
                ⭐
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-sm text-slate-900">4.9 / 5.0</span>
                  <span className="text-[10px] text-slate-500 font-semibold">(1,400+ reviews)</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Top Rated Gourmet Destination</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
