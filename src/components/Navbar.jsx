import React, { useState } from 'react';
import {
  HeartHandshake,
  PlusCircle,
  Clock,
  User,
  ShieldCheck,
  Search,
  Bell,
  Sparkles,
  LogOut,
  ChevronDown,
  Building2,
  PackageCheck,
  LayoutDashboard,
  UtensilsCrossed,
  MapPin,
  Flame,
  Leaf
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFoodListing } from '../context/FoodListingContext';

export const Navbar = ({
  onOpenPostModal,
  onOpenClaimsModal,
  onOpenAuthModal,
  onOpenProfileModal,
  currentView,
  setCurrentView,
  onScrollToUrgent
}) => {
  const { currentUser, isAdmin, isDonor, isRecipient, logout } = useAuth();
  const { searchQuery, setSearchQuery, urgentAlerts, impactMetrics, urgentOnly, setUrgentOnly } = useFoodListing();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100/80 shadow-sm transition-all">
      {/* Top Sustainability & Urgency Bar */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white text-xs py-1.5 px-4 font-medium flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold tracking-wide">Food Waste Management & Community Rescue Platform</span>
            <span className="hidden md:inline text-emerald-200">• Bridging Surplus Food to People in Need</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-600/30 text-emerald-300">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span><strong>{impactMetrics.totalMealsSaved.toLocaleString()}</strong> Meals Saved</span>
            </div>

            {urgentAlerts.length > 0 && (
              <button
                onClick={onScrollToUrgent}
                className="flex items-center gap-1 bg-rose-500/90 hover:bg-rose-600 px-2.5 py-0.5 rounded-full text-white font-extrabold text-[11px] animate-pulse"
              >
                <Flame className="w-3 h-3" />
                <span>{urgentAlerts.length} Perishables Expiring Soon</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Platform Name */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => setCurrentView('user')}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-700/25 text-white font-extrabold text-2xl transform hover:scale-105 transition-transform">
              🌱
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 bg-clip-text text-transparent tracking-tight">
                  Eco<span className="text-emerald-600">Feast</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                  Zero Waste
                </span>
              </div>
              <p className="text-xs text-slate-500 font-semibold hidden sm:block">
                Surplus Food Donation & Distribution Network
              </p>
            </div>
          </div>

          {/* Search Bar (Storefront / Feed view) */}
          {currentView === 'user' && (
            <div className="hidden md:flex flex-1 max-w-md mx-2">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search available meals, produce, donors, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-100 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-xs sm:text-sm outline-none placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 hover:bg-slate-300 w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Right Navigation Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Admin Switcher */}
            {isAdmin && (
              <button
                onClick={() => setCurrentView(currentView === 'admin' ? 'user' : 'admin')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  currentView === 'admin'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {currentView === 'admin' ? (
                  <>
                    <UtensilsCrossed className="w-4 h-4 text-emerald-600" />
                    <span>View Public Feed</span>
                  </>
                ) : (
                  <>
                    <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                    <span>Admin Control Center</span>
                  </>
                )}
              </button>
            )}

            {/* Post Surplus Food button (Donors / Any logged-in user) */}
            {currentView === 'user' && (
              <button
                onClick={onOpenPostModal}
                className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 text-white px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Donate Food</span>
              </button>
            )}

            {/* Claims & History Button */}
            {currentView === 'user' && (
              <button
                onClick={onOpenClaimsModal}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all"
                title="Claims & Rescues"
              >
                <PackageCheck className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">Claims & History</span>
              </button>
            )}

            {/* Auth Dropdown / Login */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white transition-all shadow-sm"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-xl object-cover border border-emerald-200"
                  />
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[120px]">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] font-semibold text-emerald-700 capitalize truncate max-w-[120px]">
                      {currentUser.organization || currentUser.role}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-3 border-b border-slate-100 bg-emerald-50/40">
                      <p className="text-sm font-extrabold text-slate-900 truncate">
                        {currentUser.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          currentUser.role === 'admin'
                            ? 'bg-purple-100 text-purple-700'
                            : currentUser.role === 'donor'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {currentUser.role === 'admin'
                            ? '🛡️ Platform Coordinator'
                            : currentUser.role === 'donor'
                            ? '🏢 Food Donor'
                            : '🥫 Charity / Food Bank'}
                        </span>
                        {currentUser.verified && (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100/80 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                            <ShieldCheck className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-1">
                      <button
                        onClick={onOpenProfileModal}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2"
                      >
                        <User className="w-4 h-4 text-slate-500" />
                        My Organization & Profile
                      </button>

                      <button
                        onClick={onOpenClaimsModal}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2"
                      >
                        <PackageCheck className="w-4 h-4 text-slate-500" />
                        Donation & Claim History
                      </button>

                      {isAdmin && (
                        <button
                          onClick={() => setCurrentView(currentView === 'admin' ? 'user' : 'admin')}
                          className="w-full text-left px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 rounded-xl flex items-center gap-2"
                        >
                          <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                          {currentView === 'admin' ? 'Switch to Public Feed' : 'Open Admin Center'}
                        </button>
                      )}
                    </div>

                    <div className="p-1 border-t border-slate-100">
                      <button
                        onClick={logout}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-2xl transition-all shadow-sm"
              >
                Sign In / Join
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search Field */}
        {currentView === 'user' && (
          <div className="md:hidden pb-3">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search food donations, donors, areas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs outline-none focus:bg-white focus:border-emerald-500"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
