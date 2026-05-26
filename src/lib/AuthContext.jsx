import React, { createContext, useState, useContext, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    base44.auth.me()
      .then(currentUser => {
        setUser(currentUser || null);
        setIsLoadingAuth(false);
      })
      .catch(err => {
        // user_not_registered is a special platform error — show a specific screen
        if (err?.data?.extra_data?.reason === 'user_not_registered' || err?.status === 403) {
          setAuthError({ type: 'user_not_registered' });
        }
        setUser(null);
        setIsLoadingAuth(false);
      });
  }, []);

  const logout = () => {
    base44.auth.logout('/');
  };

  const refreshUser = async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser || null);
    } catch {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoadingAuth,
      authError,
      logout,
      refreshUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};