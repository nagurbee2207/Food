import { INITIAL_USERS, INITIAL_FOOD_LISTINGS, INITIAL_IMPACT_METRICS } from '../data/initialData';

const KEYS = {
  USERS: 'foodwaste_users',
  CURRENT_USER: 'foodwaste_current_user',
  LISTINGS: 'foodwaste_listings',
  IMPACT: 'foodwaste_impact'
};

// Initialize LocalStorage with default food waste management data
export const initializeStorage = () => {
  try {
    if (!localStorage.getItem(KEYS.USERS)) {
      localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_USERS));
    }
    if (!localStorage.getItem(KEYS.LISTINGS)) {
      localStorage.setItem(KEYS.LISTINGS, JSON.stringify(INITIAL_FOOD_LISTINGS));
    }
    if (!localStorage.getItem(KEYS.IMPACT)) {
      localStorage.setItem(KEYS.IMPACT, JSON.stringify(INITIAL_IMPACT_METRICS));
    }
  } catch (error) {
    console.error('Failed to initialize local storage:', error);
  }
};

initializeStorage();

// USER & AUTH STORAGE
export const getUsers = () => {
  try {
    const data = localStorage.getItem(KEYS.USERS);
    return data ? JSON.parse(data) : INITIAL_USERS;
  } catch (e) {
    return INITIAL_USERS;
  }
};

export const saveUsers = (users) => {
  try {
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
  } catch (e) {
    console.error('Error saving users:', e);
  }
};

export const getCurrentUser = () => {
  try {
    const data = localStorage.getItem(KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

export const setCurrentUser = (user) => {
  try {
    if (user) {
      localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEYS.CURRENT_USER);
    }
  } catch (e) {
    console.error('Error setting current user:', e);
  }
};

export const registerUser = ({
  name,
  organization,
  email,
  password,
  role = 'donor', // donor | recipient | admin
  phone = '',
  address = ''
}) => {
  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const existing = users.find(u => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    throw new Error('An account with this email address already exists.');
  }

  const defaultAvatar = role === 'admin'
    ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    : role === 'donor'
    ? 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80'
    : 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80';

  const newUser = {
    id: 'user_' + Date.now(),
    name: name.trim(),
    organization: organization ? organization.trim() : (role === 'donor' ? 'Individual Food Donor' : 'Community Partner'),
    email: normalizedEmail,
    password,
    role: role || 'donor',
    phone: phone.trim() || '+1 (555) 123-4567',
    address: address.trim() || '100 Green Planet Ave, City Center',
    avatar: defaultAvatar,
    verified: role === 'admin' ? true : false,
    status: 'active',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);
  return newUser;
};

export const authenticateUser = (email, password) => {
  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const user = users.find(
    u => u.email.toLowerCase() === normalizedEmail && u.password === password
  );

  if (!user) {
    throw new Error('Invalid email or password combination.');
  }

  if (user.status === 'suspended') {
    throw new Error('Your account is currently suspended. Please contact the administrator.');
  }

  return user;
};

export const updateUserProfile = (userId, updatedFields) => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedFields };
    saveUsers(users);

    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(users[index]);
    }
    return users[index];
  }
  throw new Error('User not found.');
};

export const toggleUserVerification = (userId) => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    users[index].verified = !users[index].verified;
    saveUsers(users);
    return users[index];
  }
  return null;
};

export const toggleUserStatus = (userId) => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    users[index].status = users[index].status === 'active' ? 'suspended' : 'active';
    saveUsers(users);
    return users[index];
  }
  return null;
};

// SURPLUS FOOD LISTINGS HELPERS
export const getFoodListings = () => {
  try {
    const data = localStorage.getItem(KEYS.LISTINGS);
    return data ? JSON.parse(data) : INITIAL_FOOD_LISTINGS;
  } catch (e) {
    return INITIAL_FOOD_LISTINGS;
  }
};

export const saveFoodListings = (listings) => {
  try {
    localStorage.setItem(KEYS.LISTINGS, JSON.stringify(listings));
  } catch (e) {
    console.error('Error saving listings:', e);
  }
};

export const addFoodListing = (listingData) => {
  const listings = getFoodListings();
  const servings = Number(listingData.servingsCount) || 20;
  const weight = Number(listingData.weightKg) || Math.round(servings * 0.4);

  const newListing = {
    ...listingData,
    id: 'FOOD-' + Math.floor(100 + Math.random() * 900),
    servingsCount: servings,
    weightKg: weight,
    co2SavedKg: Math.round(weight * 2.2), // Standard EPA food waste CO2 eq multiplier
    status: 'available',
    claimedBy: null,
    claimId: null,
    createdAt: new Date().toISOString()
  };

  listings.unshift(newListing);
  saveFoodListings(listings);
  return newListing;
};

export const updateFoodListing = (listingId, updatedData) => {
  const listings = getFoodListings();
  const index = listings.findIndex(l => l.id === listingId);
  if (index !== -1) {
    listings[index] = { ...listings[index], ...updatedData };
    saveFoodListings(listings);
    return listings[index];
  }
  throw new Error('Listing not found.');
};

export const deleteFoodListing = (listingId) => {
  const listings = getFoodListings();
  const filtered = listings.filter(l => l.id !== listingId);
  saveFoodListings(filtered);
  return filtered;
};

// Claim a surplus food listing (by a recipient/charity)
export const claimFoodListing = (listingId, recipientUser, claimDetails = {}) => {
  const listings = getFoodListings();
  const index = listings.findIndex(l => l.id === listingId);

  if (index === -1) {
    throw new Error('Listing not found.');
  }

  if (listings[index].status !== 'available') {
    throw new Error('This surplus food listing has already been claimed or distributed.');
  }

  const claimCode = 'CLM-' + Math.floor(1000 + Math.random() * 9000);

  listings[index].status = 'claimed';
  listings[index].claimId = claimCode;
  listings[index].claimedBy = {
    recipientId: recipientUser.id,
    charityName: recipientUser.organization || recipientUser.name,
    recipientContact: recipientUser.phone,
    recipientEmail: recipientUser.email,
    claimCode,
    transportType: claimDetails.transportType || 'Van / Vehicle',
    eta: claimDetails.eta || 'Pickup within 2 hours',
    claimedAt: new Date().toISOString()
  };

  saveFoodListings(listings);
  return listings[index];
};

// Cancel claim / release food back to available status
export const cancelFoodClaim = (listingId, reason = '') => {
  const listings = getFoodListings();
  const index = listings.findIndex(l => l.id === listingId);

  if (index === -1) {
    throw new Error('Listing not found.');
  }

  listings[index].status = 'available';
  listings[index].claimedBy = null;
  listings[index].claimId = null;
  listings[index].cancelledAt = new Date().toISOString();
  listings[index].cancelReason = reason || 'Reservation cancelled by charity partner';

  saveFoodListings(listings);
  return listings[index];
};

// Update status of claim / distribution (e.g. claimed -> picked_up -> distributed)
export const updateListingStatus = (listingId, newStatus) => {
  const listings = getFoodListings();
  const index = listings.findIndex(l => l.id === listingId);
  if (index !== -1) {
    listings[index].status = newStatus;
    saveFoodListings(listings);
    return listings[index];
  }
  throw new Error('Listing not found.');
};

export const resetToDefaultListings = () => {
  saveFoodListings(INITIAL_FOOD_LISTINGS);
  return INITIAL_FOOD_LISTINGS;
};

// SUSTAINABILITY IMPACT CALCULATOR
export const getImpactMetrics = () => {
  const listings = getFoodListings();
  
  // Rescued items (claimed, picked_up, or distributed)
  const rescued = listings.filter(l => l.status !== 'available');

  const dynamicMeals = rescued.reduce((acc, l) => acc + (l.servingsCount || 0), 0);
  const dynamicWeight = rescued.reduce((acc, l) => acc + (l.weightKg || 0), 0);
  const dynamicCo2 = rescued.reduce((acc, l) => acc + (l.co2SavedKg || 0), 0);

  return {
    totalMealsSaved: INITIAL_IMPACT_METRICS.totalMealsSaved + dynamicMeals,
    totalWeightRescuedKg: INITIAL_IMPACT_METRICS.totalWeightRescuedKg + dynamicWeight,
    totalCo2SavedKg: INITIAL_IMPACT_METRICS.totalCo2SavedKg + dynamicCo2,
    activeDonorsCount: INITIAL_IMPACT_METRICS.activeDonorsCount,
    activeCharitiesCount: INITIAL_IMPACT_METRICS.activeCharitiesCount,
    activeListingsCount: listings.filter(l => l.status === 'available').length,
    claimedListingsCount: rescued.length
  };
};

// PERISHABLE URGENT ALERTS HELPER
export const getPerishableUrgentItems = () => {
  const listings = getFoodListings();
  const now = new Date().getTime();

  return listings.filter(item => {
    if (item.status !== 'available') return false;
    if (!item.expiresAt) return false;
    
    const expiryTime = new Date(item.expiresAt).getTime();
    const hoursRemaining = (expiryTime - now) / (1000 * 60 * 60);

    // Items expiring within 6 hours are considered urgent perishable alerts!
    return hoursRemaining > 0 && hoursRemaining <= 6;
  });
};
