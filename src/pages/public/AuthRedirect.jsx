import React, { useEffect } from 'react';
import { base44 } from '@/api/base44Client';

export default function AuthRedirect() {
  useEffect(() => {
    // If access_token is in the URL, app-params.js has already stored it to
    // localStorage. We must do a full hard reload so the base44 SDK client
    // re-initialises with that token (it's a singleton created at import time).
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('access_token')) {
      // Reload the page without the token in the URL — SDK will pick it up from localStorage
      window.location.href = window.location.origin + '/auth-redirect';
      return;
    }

    base44.auth.me().then(user => {
      if (!user) {
        window.location.href = '/';
        return;
      }
      if (user.role === 'partner') {
        window.location.href = '/partner';
      } else if (user.role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/borrower';
      }
    }).catch(() => {
      window.location.href = '/';
    });
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
    </div>
  );
}