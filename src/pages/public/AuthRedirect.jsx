import React, { useEffect } from 'react';
import { base44 } from '@/api/base44Client';

export default function AuthRedirect() {
  useEffect(() => {
    base44.auth.me().then(user => {
      if (!user) {
        window.location.replace('/login');
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
      window.location.replace('/login');
    });
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
    </div>
  );
}