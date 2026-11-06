import React from 'react';
import { X, Heart, ShoppingBag, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProducts } from '../utils/storage';

export const FavoritesModal = ({ isOpen, onClose, onSelectProduct }) => {
  if (!isOpen) return null;

  const { favorites, toggleFavorite, addToCart } = useCart();
  const allProducts = getProducts();
  const favoriteItems = allProducts.filter(p => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5 fill-rose-600" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Your Favorite Dishes</h2>
              <p className="text-xs text-slate-500 font-medium">
                {favoriteItems.length} wishlisted {favoriteItems.length === 1 ? 'item' : 'items'}
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

        {/* List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {favoriteItems.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-3xl mx-auto">
                ❤️
              </div>
              <h3 className="font-extrabold text-slate-800 text-base">No Favorites Yet</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Tap the heart icon on any dish to save it here for quick access anytime!
              </p>
            </div>
          ) : (
            favoriteItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all gap-3"
              >
                <div
                  className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                  onClick={() => {
                    onSelectProduct(item);
                    onClose();
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs font-black text-slate-900 mt-0.5">
                      ${item.price.toFixed(2)}
                    </p>
                    <span className="text-[10px] text-slate-400 capitalize">
                      {item.category} • ⭐ {item.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => addToCart(item, 1)}
                    disabled={!item.inStock}
                    className="p-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1 shadow-sm disabled:bg-slate-200 disabled:text-slate-400"
                    title="Add to Cart"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add</span>
                  </button>

                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
