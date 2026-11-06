import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getCurrentUser,
  setCurrentUser as persistCurrentUser,
  getUsers,
  authenticateUser,
  registerUser,
  updateUserProfile,
  toggleUserVerification as toggleVerificationStorage,
  toggleUserStatus as toggleStatusStorage
} from '../utils/storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load auth state from LocalStorage on mount
  useEffect(() => {
    try {
      const user = getCurrentUser();
      const allUsers = getUsers();
      setCurrentUser(user);
      setUsers(allUsers);
    } catch (e) {
      console.error('Failed to load auth state:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Standard Login
  const login = (email, password) => {
    try {
      const user = authenticateUser(email, password);
      setCurrentUser(user);
      persistCurrentUser(user);
      return { success: true, user };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // Standard Registration
  const signup = (userData) => {
    try {
      const newUser = registerUser(userData);
      setCurrentUser(newUser);
      persistCurrentUser(newUser);
      setUsers(getUsers());
      return { success: true, user: newUser };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // Instant Demo Login (for testing without typing)
  const demoLogin = (role = 'donor') => {
    const allUsers = getUsers();
    const demoUser = allUsers.find(u => u.role === role);
    if (demoUser) {
      setCurrentUser(demoUser);
      persistCurrentUser(demoUser);
      return { success: true, user: demoUser };
    }
    return { success: false, message: `No demo account found for role "${role}".` };
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
    persistCurrentUser(null);
  };

  // Profile update
  const updateProfile = (updatedFields) => {
    if (!currentUser) return { success: false, message: 'Not authenticated' };
    try {
      const updated = updateUserProfile(currentUser.id, updatedFields);
      setCurrentUser(updated);
      setUsers(getUsers());
      return { success: true, user: updated };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // Admin action: verify charity or donor organization
  const toggleUserVerification = (userId) => {
    const updated = toggleVerificationStorage(userId);
    setUsers(getUsers());
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(updated);
    }
    return updated;
  };

  // Admin action: toggle user active/suspended status
  const toggleUserStatus = (userId) => {
    const updated = toggleStatusStorage(userId);
    setUsers(getUsers());
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(updated);
    }
    return updated;
  };

  const isAdmin = currentUser?.role === 'admin';
  const isDonor = currentUser?.role === 'donor';
  const isRecipient = currentUser?.role === 'recipient';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        loading,
        isAdmin,
        isDonor,
        isRecipient,
        login,
        signup,
        demoLogin,
        logout,
        updateProfile,
        toggleUserVerification,
        toggleUserStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
