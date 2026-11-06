import React, { useState } from 'react';
import {
  LayoutDashboard,
  UtensilsCrossed,
  PackageCheck,
  Users2,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Search,
  PlusCircle,
  Eye,
  MapPin,
  Clock,
  Leaf,
  Scale,
  Building2,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFoodListing } from '../../context/FoodListingContext';

export const AdminDashboard = ({ onOpenPostModal, onSelectPass }) => {
  const { users, toggleUserVerification, toggleUserStatus } = useAuth();
  const {
    listings,
    filteredListings,
    impactMetrics,
    removeListing,
    setStatus,
    resetCatalog,
    searchQuery,
    setSearchQuery
  } = useFoodListing();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'listings' | 'claims' | 'users'
  const [statusFilter, setStatusFilter] = useState('all');

  const claimsList = listings.filter((l) => l.status !== 'available');

  const displayedListings = listings.filter((l) => {
    if (statusFilter !== 'all' && l.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        l.title.toLowerCase().includes(q) ||
        l.donorName.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-900/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Administrator & Coordinator Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Food Waste Management Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Monitor real-time food diversion, verify partner charities, review perishable alerts, and inspect distribution logistics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetCatalog}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition-all"
            title="Reset to default seed listings"
          >
            <RotateCcw className="w-4 h-4 text-emerald-400" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={onOpenPostModal}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Surplus Listing</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'overview', label: 'Platform Impact & Overview', icon: LayoutDashboard },
          { id: 'listings', label: `Food Listings (${listings.length})`, icon: UtensilsCrossed },
          { id: 'claims', label: `Claims & Logistics (${claimsList.length})`, icon: PackageCheck },
          { id: 'users', label: `Donors & Charities Directory (${users.length})`, icon: Users2 }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW & IMPACT KPIS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Meals Saved</span>
              <div className="text-3xl font-black text-emerald-600">
                {impactMetrics.totalMealsSaved.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Nourished local communities</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Food Diverted</span>
              <div className="text-3xl font-black text-teal-600">
                {impactMetrics.totalWeightRescuedKg.toLocaleString()} kg
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Kept out of waste landfills</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">CO₂ Emissions Saved</span>
              <div className="text-3xl font-black text-amber-600">
                {impactMetrics.totalCo2SavedKg.toLocaleString()} kg
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Methane and carbon prevention</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Available Listings</span>
              <div className="text-3xl font-black text-slate-900">
                {impactMetrics.activeListingsCount}
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Ready for immediate pickup</p>
            </div>
          </div>

          {/* Environmental Mission Card */}
          <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-black text-emerald-950">
                Sustainability & Hunger Relief Impact
              </h3>
              <p className="text-xs text-emerald-800 leading-relaxed max-w-2xl">
                Every kilogram of rescued food prevents approximately 2.2 kg of CO₂ equivalent greenhouse gas emissions while directly addressing food insecurity across city shelters and community pantries.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('listings')}
              className="px-5 py-2.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs whitespace-nowrap shadow-md"
            >
              Manage Active Listings
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: FOOD LISTINGS MANAGEMENT (CRUD) */}
      {activeTab === 'listings' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Controls Bar */}
          <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Filter Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="available">Available</option>
                <option value="claimed">Claimed</option>
                <option value="picked_up">Picked Up</option>
                <option value="distributed">Distributed</option>
              </select>
            </div>

            <span className="text-xs font-bold text-slate-500">
              Showing {displayedListings.length} surplus food donations
            </span>
          </div>

          {/* Listings Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4">Food Item</th>
                  <th className="py-3.5 px-4">Donor Organization</th>
                  <th className="py-3.5 px-4">Quantity / Weight</th>
                  <th className="py-3.5 px-4">Location Zone</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedListings.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <p className="font-extrabold text-slate-900 line-clamp-1">{item.title}</p>
                          <span className="text-[10px] text-slate-400 capitalize">
                            {item.category} • {item.dietary}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-800">{item.donorName}</p>
                      <span className="text-[10px] text-slate-400">{item.donorContact}</span>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {item.quantity}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      <span className="truncate block max-w-[150px]">{item.location}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={item.status}
                        onChange={(e) => setStatus(item.id, e.target.value)}
                        className={`text-[11px] font-extrabold px-2.5 py-1 rounded-xl border outline-none cursor-pointer ${
                          item.status === 'available'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : item.status === 'claimed'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : item.status === 'picked_up'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : 'bg-teal-50 text-teal-800 border-teal-300'
                        }`}
                      >
                        <option value="available">Available</option>
                        <option value="claimed">Claimed</option>
                        <option value="picked_up">Picked Up</option>
                        <option value="distributed">Distributed</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => removeListing(item.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Remove listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CLAIMS & LOGISTICS MONITOR */}
      {activeTab === 'claims' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-base">Active Food Rescue Logistics</h3>
            <span className="text-xs font-bold text-slate-500">{claimsList.length} total transfers</span>
          </div>

          <div className="space-y-3">
            {claimsList.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-slate-900 text-sm">{item.title}</h4>
                      <span className="font-mono text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                        {item.claimId}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      From: <strong>{item.donorName}</strong> ➔ Claimed by:{' '}
                      <strong className="text-emerald-800">{item.claimedBy?.charityName}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onSelectPass(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Pass</span>
                  </button>

                  <select
                    value={item.status}
                    onChange={(e) => setStatus(item.id, e.target.value)}
                    className="text-xs font-bold bg-white border border-slate-200 px-3 py-1.5 rounded-xl outline-none"
                  >
                    <option value="claimed">Claimed</option>
                    <option value="picked_up">Picked Up</option>
                    <option value="distributed">Distributed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: DONORS & CHARITIES DIRECTORY */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-slate-900 text-base">Community Partners Directory</h3>
              <p className="text-xs text-slate-500">Verify NGO credentials and manage partner participation</p>
            </div>
            <span className="text-xs font-bold text-slate-500">{users.length} registered partners</span>
          </div>

          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-300"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-slate-900 text-sm">
                        {user.organization || user.name}
                      </h4>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-700'
                          : user.role === 'donor'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {user.role}
                      </span>
                      {user.verified && (
                        <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Contact: {user.name} • {user.email} • {user.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleUserVerification(user.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      user.verified
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-400'
                    }`}
                  >
                    {user.verified ? '✓ Verified Partner' : 'Verify Organization'}
                  </button>

                  <button
                    onClick={() => toggleUserStatus(user.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      user.status === 'active'
                        ? 'bg-slate-100 text-slate-700 border-slate-200'
                        : 'bg-rose-50 text-rose-700 border-rose-300'
                    }`}
                  >
                    {user.status === 'active' ? 'Active' : 'Suspended'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
