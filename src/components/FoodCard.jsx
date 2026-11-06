import React from 'react';
import { Star, Clock, Heart, Plus, Minus, Flame, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const FoodCard = ({ product, onSelect }) => {
  const { cartItems, addToCart, updateQuantity, favorites, toggleFavorite } = useCart();

  const isFav = favorites.includes(product.id);
  const cartEntry = cartItems.find(item => item.id === product.id);
  const inCartQuantity = cartEntry ? cartEntry.quantity : 0;

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!product.inStock) return;
    addToCart(product, 1);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    updateQuantity(product.id, inCartQuantity + 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    updateQuantity(product.id, inCartQuantity - 1);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-orange-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {/* Veg / Non-Veg Indicator */}
            <span
              className={`w-6 h-6 rounded-md bg-white/90 backdrop-blur-md flex items-center justify-center border shadow-sm ${
                product.isVeg ? 'border-emerald-500' : 'border-rose-500'
              }`}
              title={product.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  product.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                }`}
              />
            </span>

            {/* Chef Special Badge */}
            {product.isChefSpecial && (
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-extrabold px-2 py-1 rounded-md shadow-sm flex items-center gap-1 uppercase tracking-wider">
                <Sparkles className="w-2.5 h-2.5" />
                Chef's Pick
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="pointer-events-auto w-8 h-8 rounded-full bg-white/90 backdrop-blur-md hover:bg-white flex items-center justify-center text-slate-700 hover:text-rose-500 shadow-md transition-all active:scale-90"
            title="Add to Favorites"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFav ? 'text-rose-500 fill-rose-500' : ''
              }`}
            />
          </button>
        </div>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
            <span className="bg-rose-500 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-lg">
              Out of Stock
            </span>
          </div>
        )}

        {/* Bottom Image Stats (Rating & Time) */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{product.rating}</span>
            <span className="text-white/70 text-[10px]">({product.reviewsCount})</span>
          </div>
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            <span>{product.prepTime}</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-orange-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </div>
          <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>
        </div>

        {/* Ingredients tag snippet */}
        {product.ingredients && product.ingredients.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {product.ingredients.slice(0, 3).map((ing, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
              >
                {ing}
              </span>
            ))}
            {product.ingredients.length > 3 && (
              <span className="text-[10px] font-medium text-slate-400 self-center">
                +{product.ingredients.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Price & Action Row */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-auto">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Price</span>
            <span className="text-lg sm:text-xl font-black text-slate-900">
              ${Number(product.price).toFixed(2)}
            </span>
          </div>

          {/* Cart Buttons */}
          {inCartQuantity > 0 ? (
            <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-2xl p-1 shadow-sm">
              <button
                onClick={handleDecrement}
                className="w-7 h-7 rounded-xl bg-white hover:bg-orange-100 text-orange-600 flex items-center justify-center font-bold transition-colors active:scale-90"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-extrabold text-sm text-orange-600 px-1 min-w-[18px] text-center">
                {inCartQuantity}
              </span>
              <button
                onClick={handleIncrement}
                className="w-7 h-7 rounded-xl bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center font-bold transition-colors active:scale-90 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all shadow-sm ${
                product.inStock
                  ? 'bg-orange-500 hover:bg-orange-600 active:scale-95 text-white shadow-orange-500/20'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
