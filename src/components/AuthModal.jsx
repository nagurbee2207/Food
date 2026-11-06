import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  Building2,
  Phone,
  MapPin,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { login, signup, demoLogin } = useAuth();
  const [tab, setTab] = useState('login'); // 'login' | 'signup'

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    organization: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'donor', // donor | recipient | admin
    phone: '',
    address: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const res = login(loginData.email, loginData.password);
    if (res.success) {
      setSuccessMessage(`Welcome back, ${res.user.name}!`);
      setTimeout(() => {
        onClose();
        setSuccessMessage('');
      }, 800);
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (signupData.password !== signupData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (signupData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    const res = signup({
      name: signupData.name,
      organization: signupData.organization,
      email: signupData.email,
      password: signupData.password,
      role: signupData.role,
      phone: signupData.phone,
      address: signupData.address
    });

    if (res.success) {
      setSuccessMessage(`Account created successfully as ${signupData.role}!`);
      setTimeout(() => {
        onClose();
        setSuccessMessage('');
      }, 900);
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleQuickDemo = (role) => {
    setErrorMessage('');
    const res = demoLogin(role);
    if (res.success) {
      setSuccessMessage(`Logged in as Demo ${role.toUpperCase()}!`);
      setTimeout(() => {
        onClose();
        setSuccessMessage('');
      }, 700);
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-emerald-50/50">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              🌱
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">EcoFeast Portal</h2>
              <p className="text-xs text-slate-500 font-medium">Join the Food Waste Rescue Network</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-100 mx-5 mt-4 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => {
              setTab('login');
              setErrorMessage('');
            }}
            className={`py-2 rounded-xl transition-all ${
              tab === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setTab('signup');
              setErrorMessage('');
            }}
            className={`py-2 rounded-xl transition-all ${
              tab === 'signup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Register Organization
          </button>
        </div>

        {/* Feedback Alerts */}
        <div className="px-5 pt-3">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}
        </div>

        {/* Body forms */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {tab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@organization.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition-all active:scale-98"
              >
                Sign In to Account
              </button>

              {/* 1-Click Demo Testing Buttons */}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center mb-2">
                  ⚡ 1-Click Instant Demo Login:
                </p>
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('admin')}
                    className="w-full p-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold flex items-center justify-between"
                  >
                    <span>🛡️ Login as Coordinator / Admin</span>
                    <span className="text-[10px] text-purple-600 font-mono">admin@ecofeast.org</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('donor')}
                    className="w-full p-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold flex items-center justify-between"
                  >
                    <span>🏨 Login as Food Donor (Hotel)</span>
                    <span className="text-[10px] text-amber-600 font-mono">donor@metrohotel.com</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('recipient')}
                    className="w-full p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between"
                  >
                    <span>🥫 Login as Charity / Food Bank</span>
                    <span className="text-[10px] text-emerald-600 font-mono">recipient@hopefoodbank.org</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              {/* Role Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Your Account Role:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSignupData({ ...signupData, role: 'donor' })}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      signupData.role === 'donor'
                        ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <span className="text-xs block">🏢 Food Donor</span>
                    <span className="text-[10px] text-slate-500">Restaurant, Hotel, Grocer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSignupData({ ...signupData, role: 'recipient' })}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      signupData.role === 'recipient'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <span className="text-xs block">🥫 Food Bank / Charity</span>
                    <span className="text-[10px] text-slate-500">NGO, Shelter, Pantry</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={signupData.name}
                  onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Organization Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grand City Bakery / Hope Mission"
                  value={signupData.organization}
                  onChange={(e) => setSignupData({ ...signupData, organization: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="contact@org.com"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="Min 6 chars"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Confirm *</label>
                  <input
                    type="password"
                    required
                    placeholder="Confirm"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+1 (555) 000-0000"
                  value={signupData.phone}
                  onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pickup / Facility Address</label>
                <input
                  type="text"
                  placeholder="Street address, city"
                  value={signupData.address}
                  onChange={(e) => setSignupData({ ...signupData, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-98"
              >
                Register & Start Rescuing Food
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

