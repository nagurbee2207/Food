// Initial Seed Data for Food Waste Management & Rescue System (EcoFeast)

export const INITIAL_USERS = [
  {
    id: 'user_admin_01',
    name: 'Sarah Jenkins',
    organization: 'City Food Rescue Alliance',
    email: 'admin@ecofeast.org',
    password: 'admin123',
    role: 'admin',
    phone: '+1 (555) 019-8234',
    address: 'City Hall Annex, 200 Civic Center Plaza, Suite 4B',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    verified: true,
    status: 'active',
    createdAt: '2026-01-10T08:00:00.000Z'
  },
  {
    id: 'user_donor_01',
    name: 'Chef Marcus Vance',
    organization: 'Grand Metropolis Hotel & Banquets',
    email: 'donor@metrohotel.com',
    password: 'donor123',
    role: 'donor',
    phone: '+1 (555) 432-8901',
    address: '750 Grand Promenade Blvd, Downtown Central',
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80',
    verified: true,
    status: 'active',
    donorType: 'Hotel & Catering',
    createdAt: '2026-01-18T10:15:00.000Z'
  },
  {
    id: 'user_recipient_01',
    name: 'Elena Rostova',
    organization: 'Hope Community Food Bank & Shelter',
    email: 'recipient@hopefoodbank.org',
    password: 'recipient123',
    role: 'recipient',
    phone: '+1 (555) 892-4512',
    address: '142 Samaritan Way, North District',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    verified: true,
    status: 'active',
    recipientType: 'Charity Food Bank',
    createdAt: '2026-02-01T11:45:00.000Z'
  },
  {
    id: 'user_donor_02',
    name: 'David Lin',
    organization: 'Green Valley Organic Supermarket',
    email: 'david@greenvalley.com',
    password: 'donor123',
    role: 'donor',
    phone: '+1 (555) 321-7654',
    address: '88 Market Square, Westside Green',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    verified: true,
    status: 'active',
    donorType: 'Supermarket & Grocer',
    createdAt: '2026-02-14T09:20:00.000Z'
  }
];

export const FOOD_CATEGORIES = [
  { id: 'all', name: 'All Surplus Food', icon: '🍲' },
  { id: 'cooked', name: 'Prepared Meals', icon: '🍱' },
  { id: 'bakery', name: 'Bakery & Grains', icon: '🥖' },
  { id: 'produce', name: 'Fresh Fruits & Veggies', icon: '🥗' },
  { id: 'dairy', name: 'Dairy & Chilled', icon: '🥛' },
  { id: 'pantry', name: 'Packaged & Canned', icon: '🥫' }
];

export const LOCATIONS = [
  { id: 'all', name: 'All Locations' },
  { id: 'downtown', name: 'Downtown Central (within 1 mi)' },
  { id: 'north', name: 'North District (2-3 mi)' },
  { id: 'westside', name: 'Westside Green (3-5 mi)' },
  { id: 'eastend', name: 'East End Riverside (5+ mi)' }
];

// Helper to generate dynamic expiring timestamps relative to today
const now = new Date();
const addHours = (h) => new Date(now.getTime() + h * 60 * 60 * 1000).toISOString();

export const INITIAL_FOOD_LISTINGS = [
  {
    id: 'FOOD-101',
    title: '45 Portions Roasted Chicken & Herb Roasted Veggies',
    category: 'cooked',
    donorId: 'user_donor_01',
    donorName: 'Grand Metropolis Hotel & Banquets',
    donorContact: '+1 (555) 432-8901',
    quantity: '45 Servings (~18 kg)',
    servingsCount: 45,
    weightKg: 18,
    isPerishable: true,
    storageReq: 'Keep Warm or Refrigerate (4°C)',
    dietary: 'Non-Vegetarian',
    location: '750 Grand Promenade Blvd, Downtown Central',
    locationZone: 'downtown',
    distance: '0.8 miles away',
    pickupWindow: 'Today 5:00 PM - 8:00 PM',
    expiresAt: addHours(3), // Expiring in 3 hours -> Urgent Perishable Alert!
    description: 'Surplus executive lunch banquet trays. High quality grilled chicken breast, herb roasted potatoes, steamed broccoli and carrots. Sealed in commercial stainless hotel pans.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    status: 'available', // available | claimed | picked_up | distributed
    claimedBy: null,
    claimId: null,
    co2SavedKg: 45,
    createdAt: new Date().toISOString()
  },
  {
    id: 'FOOD-102',
    title: '60 Fresh Artisan Sourdough Loaves & Croissants',
    category: 'bakery',
    donorId: 'user_donor_02',
    donorName: 'Green Valley Organic Supermarket',
    donorContact: '+1 (555) 321-7654',
    quantity: '60 Items (~22 kg)',
    servingsCount: 60,
    weightKg: 22,
    isPerishable: false,
    storageReq: 'Dry / Room Temperature',
    dietary: 'Vegetarian',
    location: '88 Market Square, Westside Green',
    locationZone: 'westside',
    distance: '3.4 miles away',
    pickupWindow: 'Today until 9:00 PM',
    expiresAt: addHours(18), // Expiring in 18 hours
    description: 'Unsold freshly baked organic sourdough baguettes, whole grain loaves, and chocolate croissants from morning bake. Bagged in clean food-safe kraft paper.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    status: 'available',
    claimedBy: null,
    claimId: null,
    co2SavedKg: 35,
    createdAt: new Date().toISOString()
  },
  {
    id: 'FOOD-103',
    title: '30 Crates Organic Strawberries, Avocados & Baby Spinach',
    category: 'produce',
    donorId: 'user_donor_02',
    donorName: 'Green Valley Organic Supermarket',
    donorContact: '+1 (555) 321-7654',
    quantity: '30 Crates (~35 kg)',
    servingsCount: 80,
    weightKg: 35,
    isPerishable: true,
    storageReq: 'Refrigerated Display (2-5°C)',
    dietary: 'Vegan',
    location: '88 Market Square, Westside Green',
    locationZone: 'westside',
    distance: '3.4 miles away',
    pickupWindow: 'Today 4:00 PM - 7:00 PM',
    expiresAt: addHours(4), // Urgent perishable!
    description: 'Perfect ripe produce ready for immediate consumption or soup/smoothie kitchen distribution. Cosmetic skin marks only, completely healthy and nutritious.',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&auto=format&fit=crop&q=80',
    status: 'available',
    claimedBy: null,
    claimId: null,
    co2SavedKg: 52,
    createdAt: new Date().toISOString()
  },
  {
    id: 'FOOD-104',
    title: '35 Servings Vegetarian Penne Pomodoro & Garlic Bread',
    category: 'cooked',
    donorId: 'user_donor_01',
    donorName: 'Grand Metropolis Hotel & Banquets',
    donorContact: '+1 (555) 432-8901',
    quantity: '35 Servings (~14 kg)',
    servingsCount: 35,
    weightKg: 14,
    isPerishable: true,
    storageReq: 'Heated or Refrigerate',
    dietary: 'Vegetarian',
    location: '750 Grand Promenade Blvd, Downtown Central',
    locationZone: 'downtown',
    distance: '0.8 miles away',
    pickupWindow: 'Today 6:00 PM - 9:00 PM',
    expiresAt: addHours(2.5), // Urgent perishable!
    description: 'Surplus dinner conference pasta trays with rich tomato-basil sauce, parmesan cheese, and freshly toasted herb garlic bread slices.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop&q=80',
    status: 'claimed',
    claimedBy: {
      charityName: 'Hope Community Food Bank & Shelter',
      recipientId: 'user_recipient_01',
      recipientContact: '+1 (555) 892-4512',
      claimCode: 'CLM-7491',
      claimedAt: new Date(Date.now() - 3600000).toISOString(),
      eta: 'Pickup scheduled at 6:30 PM'
    },
    claimId: 'CLM-7491',
    co2SavedKg: 28,
    createdAt: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'FOOD-105',
    title: '40 Jugs Pasteurized Whole Milk & Greek Yogurt Cups',
    category: 'dairy',
    donorId: 'user_donor_02',
    donorName: 'Green Valley Organic Supermarket',
    donorContact: '+1 (555) 321-7654',
    quantity: '40 Units (~20 kg)',
    servingsCount: 40,
    weightKg: 20,
    isPerishable: true,
    storageReq: 'Strict Cold Storage (2-4°C)',
    dietary: 'Vegetarian',
    location: '88 Market Square, Westside Green',
    locationZone: 'westside',
    distance: '3.4 miles away',
    pickupWindow: 'Tomorrow morning 8:00 AM - 11:00 AM',
    expiresAt: addHours(24),
    description: 'Whole milk gallons reaching best before date in 24 hours. Sealed from dairy manufacturer, stored continuously under refrigeration.',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80',
    status: 'available',
    claimedBy: null,
    claimId: null,
    co2SavedKg: 38,
    createdAt: new Date().toISOString()
  },
  {
    id: 'FOOD-106',
    title: '50 Boxes Canned Soups, Beans & Organic Rice',
    category: 'pantry',
    donorId: 'user_donor_02',
    donorName: 'Green Valley Organic Supermarket',
    donorContact: '+1 (555) 321-7654',
    quantity: '50 Items (~30 kg)',
    servingsCount: 75,
    weightKg: 30,
    isPerishable: false,
    storageReq: 'Ambient / Dry Storage',
    dietary: 'Vegan',
    location: '88 Market Square, Westside Green',
    locationZone: 'westside',
    distance: '3.4 miles away',
    pickupWindow: 'Anytime 9:00 AM - 8:00 PM',
    expiresAt: addHours(120), // 5 days
    description: 'Pantry staples with minor label defects. Assorted vegetable broth, black beans, chickpeas, brown rice bags. Perfect for emergency food parcel distribution.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    status: 'distributed',
    claimedBy: {
      charityName: 'Hope Community Food Bank & Shelter',
      recipientId: 'user_recipient_01',
      recipientContact: '+1 (555) 892-4512',
      claimCode: 'CLM-6102',
      claimedAt: '2026-11-04T14:00:00.000Z',
      eta: 'Completed distribution to 35 local families'
    },
    claimId: 'CLM-6102',
    co2SavedKg: 65,
    createdAt: '2026-11-03T10:00:00.000Z'
  }
];

export const INITIAL_IMPACT_METRICS = {
  totalMealsSaved: 1845,
  totalWeightRescuedKg: 1240,
  totalCo2SavedKg: 2890,
  activeDonorsCount: 48,
  activeCharitiesCount: 26
};
