import React, { useEffect } from 'react';
import { base44 } from '@/api/base44Client';

export default function AuthRedirect() {
  useEffect(() => {
    // The SDK client may have been initialized before the new access_token
    // arrived in the URL. app-params.js stores it to localStorage, so we do
    // a hard reload (without the token in the URL) to reinitialize the SDK
    // with the freshly stored token.
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('access_token')) {
      urlParams.delete('access_token');
      const cleanUrl = '/auth-redirect' + (urlParams.toString() ? `?${urlParams.toString()}` : '');
      window.location.replace(cleanUrl);
      return;
    }

    base44.auth.me().then(user => {
      if (!user) {
        window.location.replace('/');
        return;
      }
      if (user.role === 'partner') {
        window.location.replace('/partner');
      } else if (user.role === 'admin') {
        window.location.replace('/admin');
      } else {
        window.location.replace('/borrower');
      }
    }).catch(() => {
      window.location.replace('/');
    });
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
    </div>
  );
}