import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USERS } from './mockData';

const DemoAuthContext = createContext(null);

export function DemoAuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('crediflow_user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('crediflow_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('crediflow_user');
    }
  }, [user]);

  const login = (email, password) => {
    const demoUser = DEMO_USERS[email];
    if (!demoUser) return { success: false, error: 'Account not found. Please use a demo account.' };
    if (demoUser.password !== password) return { success: false, error: 'Incorrect password. Please try again.' };
    setUser(demoUser);
    return { success: true, user: demoUser };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <DemoAuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </DemoAuthContext.Provider>
  );
}

export function useDemoAuth() {
  const ctx = useContext(DemoAuthContext);
  if (!ctx) throw new Error('useDemoAuth must be used within DemoAuthProvider');
  return ctx;
}