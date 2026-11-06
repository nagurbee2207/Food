import React, { useState, useRef } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FoodListingProvider, useFoodListing } from './context/FoodListingContext';
import { Navbar } from './components/Navbar';
import { UrgentPerishableBanner } from './components/UrgentPerishableBanner';
import { ImpactStats } from './components/ImpactStats';
import { FoodFilters } from './components/FoodFilters';
import { FoodListingCard } from './components/FoodListingCard';
import { FoodDetailModal } from './components/FoodDetailModal';
import { PostFoodModal } from './components/PostFoodModal';
import { ClaimFoodModal } from './components/ClaimFoodModal';
import { PickupPassModal } from './components/PickupPassModal';
import { DonationHistoryModal } from './components/DonationHistoryModal';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import {
  Leaf,
  PlusCircle,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Heart,
  Globe,
  ExternalLink
} from 'lucide-react';

function MainApp() {
  const { currentUser } = useAuth();
  const {
    filteredListings,
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    dietaryFilter,
    setDietaryFilter,
    urgentOnly,
    setUrgentOnly
  } = useFoodListing();

  // Navigation view: 'user' (Public Feed) | 'admin' (Admin Dashboard)
  const [currentView, setCurrentView] = useState('user');

  // Modal States
  const [selectedItem, setSelectedItem] = useState(null);
  const [claimTargetItem, setClaimTargetItem] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isClaimsModalOpen, setIsClaimsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activePassItem, setActivePassItem] = useState(null);

  const urgentRef = useRef(null);

  const handleScrollToUrgent = () => {
    urgentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClaimSuccess = (claimedItem) => {
    setClaimTargetItem(null);
    setActivePassItem(claimedItem);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* Global Navigation */}
      <Navbar
        onOpenPostModal={() => setIsPostModalOpen(true)}
        onOpenClaimsModal={() => setIsClaimsModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        currentView={currentView}
        setCurrentView={setCurrentView}
        onScrollToUrgent={handleScrollToUrgent}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'admin' ? (
          <AdminDashboard
            onOpenPostModal={() => setIsPostModalOpen(true)}
            onSelectPass={(item) => setActivePassItem(item)}
          />
        ) : (
          <div className="max-w-7xl mx-auto py-6">
            {/* Urgent Perishable Alerts Banner */}
            <div ref={urgentRef}>
              <UrgentPerishableBanner
                onSelectItem={(item) => setSelectedItem(item)}
                onClaimItem={(item) => setClaimTargetItem(item)}
              />
            </div>

            {/* Sustainability Impact Metric Cards */}
            <ImpactStats />

            {/* Food Filters: Categories, Proximity, Diets */}
            <FoodFilters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              dietaryFilter={dietaryFilter}
              setDietaryFilter={setDietaryFilter}
              urgentOnly={urgentOnly}
              setUrgentOnly={setUrgentOnly}
              itemsCount={filteredListings.length}
            />

            {/* Surplus Food Cards Grid */}
            <div className="mx-4 sm:mx-6 lg:mx-8">
              {filteredListings.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl mx-auto">
                    🥗
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-lg">
                    No Surplus Food Matches Current Filters
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try adjusting your category, distance zone, or search query. Or be the first to post a new food donation!
                  </p>
                  <button
                    onClick={() => setIsPostModalOpen(true)}
                    className="mt-2 px-5 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-md"
                  >
                    Post Surplus Food Now
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {filteredListings.map((item) => (
                    <FoodListingCard
                      key={item.id}
                      item={item}
                      onSelect={(food) => setSelectedItem(food)}
                      onClaim={(food) => setClaimTargetItem(food)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedItem && (
        <FoodDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onClaim={(food) => {
            setSelectedItem(null);
            setClaimTargetItem(food);
          }}
        />
      )}

      {claimTargetItem && (
        <ClaimFoodModal
          item={claimTargetItem}
          isOpen={true}
          onClose={() => setClaimTargetItem(null)}
          onClaimSuccess={handleClaimSuccess}
        />
      )}

      {isPostModalOpen && (
        <PostFoodModal
          isOpen={true}
          onClose={() => setIsPostModalOpen(false)}
        />
      )}

      {isClaimsModalOpen && (
        <DonationHistoryModal
          isOpen={true}
          onClose={() => setIsClaimsModalOpen(false)}
          onSelectPass={(item) => setActivePassItem(item)}
        />
      )}

      {activePassItem && (
        <PickupPassModal
          item={activePassItem}
          onClose={() => setActivePassItem(null)}
        />
      )}

      {isAuthModalOpen && (
        <AuthModal
          isOpen={true}
          onClose={() => setIsAuthModalOpen(false)}
        />
      )}

      {isProfileModalOpen && (
        <UserProfileModal
          isOpen={true}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌱</span>
                <span className="text-xl font-black">
                  Eco<span className="text-emerald-400">Feast</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A community-driven Food Waste Management System connecting businesses, hotels, and individuals having surplus food with certified charities, shelters, and food banks.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
                Key Platform Modules
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>• Real-Time Perishable Alerts</li>
                <li>• Proximity & Location Matching</li>
                <li>• Digital QR Pickup Passes</li>
                <li>• Donation History & Verification</li>
                <li>• Environmental CO₂e Impact Calculator</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
                UN Sustainable Goal 12.3
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Aiming to halve per capita global food waste at the retail and consumer levels and reduce food losses along production and supply chains.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
                Deployment & Tech Stack
              </h4>
              <div className="space-y-2 text-xs text-slate-400">
                <p>• Built with <strong>React + Vite</strong></p>
                <p>• Styled with <strong>Tailwind CSS</strong></p>
                <p>• Data Engine: <strong>Local Storage</strong></p>
                <p>• Production Ready for <strong>Vercel</strong></p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3">
            <p>© 2026 EcoFeast Food Waste Management System. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Zero Hunger & Sustainability
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <FoodListingProvider>
        <MainApp />
      </FoodListingProvider>
    </AuthProvider>
  );
}

