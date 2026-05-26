import React, { useEffect } from 'react';
import { base44 } from '@/api/base44Client';

// This page is the landing point after Base44 OAuth login/signup.
// The SDK reads the token from localStorage automatically (no singleton re-init needed).
// We just call auth.me() and route based on role.
export default function AuthRedirect() {
  useEffect(() => {
    base44.auth.me().then(user => {
      if (!user) {
        window.location.href = '/login';
        return;
      }
      if (user.role === 'partner') {
        window.location.href = '/partner';
      } else if (user.role === 'admin') {
        window.location.href = '/admin';
      } else {
        // borrower role, or no role yet (new user) → go to borrower dashboard
        // DashboardLayout will auto-assign the 'borrower' role on first visit
        window.location.href = '/borrower';
      }
    }).catch(() => {
      window.location.href = '/login';
    });
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
    </div>
  );
}