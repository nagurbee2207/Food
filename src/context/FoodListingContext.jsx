import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getFoodListings,
  saveFoodListings,
  addFoodListing,
  updateFoodListing,
  deleteFoodListing,
  claimFoodListing,
  cancelFoodClaim,
  updateListingStatus,
  getImpactMetrics,
  getPerishableUrgentItems,
  resetToDefaultListings
} from '../utils/storage';

const FoodListingContext = createContext(null);

export const FoodListingProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [urgentAlerts, setUrgentAlerts] = useState([]);
  const [impactMetrics, setImpactMetrics] = useState(getImpactMetrics());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [dietaryFilter, setDietaryFilter] = useState('all');

  // Refresh listings & alerts
  const refreshData = () => {
    const all = getFoodListings();
    setListings(all);
    setUrgentAlerts(getPerishableUrgentItems());
    setImpactMetrics(getImpactMetrics());
  };

  useEffect(() => {
    refreshData();
    // Auto refresh every 60 seconds to check expiring perishable timestamps
    const interval = setInterval(refreshData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Post surplus food (Donor)
  const postListing = (listingData) => {
    const created = addFoodListing(listingData);
    refreshData();
    return created;
  };

  // Edit surplus food (Donor/Admin)
  const editListing = (listingId, data) => {
    const updated = updateFoodListing(listingId, data);
    refreshData();
    return updated;
  };

  // Delete listing (Donor/Admin)
  const removeListing = (listingId) => {
    const updated = deleteFoodListing(listingId);
    refreshData();
    return updated;
  };

  // Claim surplus food (Charity/Recipient)
  const claimListing = (listingId, recipientUser, claimDetails) => {
    const claimed = claimFoodListing(listingId, recipientUser, claimDetails);
    refreshData();
    return claimed;
  };

  // Cancel reservation / Release back to available
  const cancelClaim = (listingId, reason) => {
    const released = cancelFoodClaim(listingId, reason);
    refreshData();
    return released;
  };

  // Change fulfillment status (Claimed -> Picked Up -> Distributed)
  const setStatus = (listingId, newStatus) => {
    const updated = updateListingStatus(listingId, newStatus);
    refreshData();
    return updated;
  };

  // Reset to initial seed catalog
  const resetCatalog = () => {
    const reset = resetToDefaultListings();
    refreshData();
    return reset;
  };

  // Filter listings based on active controls
  const filteredListings = listings.filter((item) => {
    // Search query matches title, description, or donor name
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title?.toLowerCase().includes(q);
      const matchDesc = item.description?.toLowerCase().includes(q);
      const matchDonor = item.donorName?.toLowerCase().includes(q);
      const matchLoc = item.location?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchDonor && !matchLoc) return false;
    }

    // Category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }

    // Location zone filter
    if (selectedLocation !== 'all' && item.locationZone !== selectedLocation) {
      return false;
    }

    // Dietary filter
    if (dietaryFilter !== 'all' && item.dietary?.toLowerCase() !== dietaryFilter.toLowerCase()) {
      return false;
    }

    // Urgent perishable only filter
    if (urgentOnly) {
      if (!item.expiresAt) return false;
      const hoursLeft = (new Date(item.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60);
      if (hoursLeft <= 0 || hoursLeft > 6) return false;
    }

    return true;
  });

  return (
    <FoodListingContext.Provider
      value={{
        listings,
        filteredListings,
        urgentAlerts,
        impactMetrics,
        selectedCategory,
        setSelectedCategory,
        selectedLocation,
        setSelectedLocation,
        searchQuery,
        setSearchQuery,
        urgentOnly,
        setUrgentOnly,
        dietaryFilter,
        setDietaryFilter,
        postListing,
        editListing,
        removeListing,
        claimListing,
        cancelClaim,
        setStatus,
        resetCatalog,
        refreshData
      }}
    >
      {children}
    </FoodListingContext.Provider>
  );
};

export const useFoodListing = () => {
  const context = useContext(FoodListingContext);
  if (!context) {
    throw new Error('useFoodListing must be used within a FoodListingProvider');
  }
  return context;
};

