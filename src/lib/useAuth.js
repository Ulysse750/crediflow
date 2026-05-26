import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

export function useAuth() {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.auth.me()
      .then(u => {
        setUser(u || null);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  const logout = () => base44.auth.logout('/');
  const redirectToLogin = (next) => base44.auth.redirectToLogin(next || window.location.pathname);

  return { user, loading, logout, redirectToLogin, isAuthenticated: !!user };
}