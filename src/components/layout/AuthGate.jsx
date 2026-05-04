import React from 'react';
import { useAuth } from '@/lib/useAuth';

// Wraps a route section — redirects to login if not authenticated or wrong role
export default function AuthGate({ role, children }) {
  const { user, loading, redirectToLogin } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    redirectToLogin();
    return null;
  }

  if (role && user.role !== role) {
    const correctPath = user.role === 'borrower' ? '/borrower' : user.role === 'partner' ? '/partner' : '/admin';
    window.location.href = correctPath;
    return null;
  }

  return children;
}