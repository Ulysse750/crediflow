import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PublicHeader from '@/components/layout/PublicHeader';
import Logo from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

export default function Login() {
  useEffect(() => {
    base44.auth.me().then(user => {
      if (user) {
        const path = user.role === 'partner' ? '/partner' : user.role === 'admin' ? '/admin' : '/borrower';
        window.location.replace(path);
      }
    }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm space-y-6 text-center">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Sign in to CrediFlow</h1>
            <p className="text-sm text-muted-foreground mt-1">Use your registered email address</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
            <p className="text-sm text-muted-foreground">
              Click below to sign in securely. You'll be prompted for your email and password.
            </p>
            <Button
              className="w-full bg-primary hover:bg-primary/90 gap-2"
              onClick={() => base44.auth.redirectToLogin('/')}
            >
              <LogIn className="w-4 h-4" /> Sign in
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Borrower?{' '}
            <Link to="/register" className="text-secondary font-medium hover:underline">Create a free account</Link>
          </p>
          <p className="text-xs text-muted-foreground/60">
            Partner and admin accounts are provided by CrediFlow directly.
          </p>
        </div>
      </div>
    </div>
  );
}