import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { appParams } from '@/lib/app-params';

// Central auth hook — replaces useDemoAuth everywhere
export function useAuth() {
  const [user, setUser] = useState(undefined); // undefined = loading, null = not logged in
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Re-read params from localStorage in case a token just landed
    const token = localStorage.getItem('base44_access_token') || appParams.token;

    const attempt = () => base44.auth.me()
      .then(u => {
        if (u) { setUser(u); setLoading(false); }
        else if (token) {
          // Token exists but SDK returned null — SDK singleton may not have it yet, reload
          window.location.reload();
        } else {
          setUser(null); setLoading(false);
        }
      })
      .catch(() => { setUser(null); setLoading(false); });

    attempt();
  }, []);

  const logout = () => base44.auth.logout('/');
  const redirectToLogin = (next) => base44.auth.redirectToLogin(next || window.location.pathname);

  return { user, loading, logout, redirectToLogin, isAuthenticated: !!user };
}