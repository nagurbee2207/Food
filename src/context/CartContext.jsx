import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getCartStorage,
  saveCartStorage,
  getFavorites,
  toggleFavoriteStorage
} from '../utils/storage';
import { AVAILABLE_COUPONS } from '../data/initialData';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [favorites, setFavorites] = useState([]);

  // Load from local storage
  useEffect(() => {
    setCartItems(getCartStorage());
    setFavorites(getFavorites());
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    saveCartStorage(cartItems);
  }, [cartItems]);

  const addToCart = (product, quantity = 1, instructions = '') => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          instructions: instructions || updated[existingIndex].instructions
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            isVeg: product.isVeg,
            quantity: quantity,
            instructions: instructions
          }
        ];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  // Favorites
  const toggleFavorite = (productId) => {
    const updated = toggleFavoriteStorage(productId);
    setFavorites(updated);
  };

  const isFavorite = (productId) => favorites.includes(productId);

  // Financial calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Apply Coupon
  const applyCoupon = (codeToApply) => {
    const cleanCode = (codeToApply || couponCode).trim().toUpperCase();
    setCouponError('');

    if (!cleanCode) {
      setCouponError('Please enter a coupon code.');
      return false;
    }

    const coupon = AVAILABLE_COUPONS[cleanCode];
    if (!coupon) {
      setCouponError('Invalid coupon code. Try TASTY20 or WELCOME50.');
      return false;
    }

    if (subtotal < coupon.minSpend) {
      setCouponError(`Requires minimum order of $${coupon.minSpend.toFixed(2)}.`);
      return false;
    }

    setAppliedCoupon(coupon);
    setCouponCode(cleanCode);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  // Calculate discounts
  let discountAmount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minSpend) {
    if (appliedCoupon.type === 'percent') {
      discountAmount = (subtotal * appliedCoupon.value) / 100;
    } else if (appliedCoupon.type === 'flat') {
      discountAmount = Math.min(appliedCoupon.value, subtotal);
    }
  }

  // Delivery fee: $3.99, free above $35, or waived by FREESHIP coupon
  let deliveryFee = cartItems.length === 0 ? 0 : subtotal >= 35 ? 0 : 3.99;
  if (appliedCoupon && appliedCoupon.type === 'delivery') {
    deliveryFee = 0;
  }

  // Tax: 8% on subtotal after discount
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = cartItems.length === 0 ? 0 : taxableAmount * 0.08;

  const total = Math.max(0, taxableAmount + tax + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemsCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        discountAmount,
        deliveryFee,
        tax,
        total,
        couponCode,
        setCouponCode,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        favorites,
        toggleFavorite,
        isFavorite
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
