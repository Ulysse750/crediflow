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
            <h1 className="text-2xl font-display font-bold text-foreground">Sign in to tawi.la</h1>
            <p className="text-sm text-muted-foreground mt-1">Use your registered email address</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
            <div className="p-3 bg-secondary/5 border border-secondary/20 rounded-lg text-sm text-secondary font-medium">
              Sign in with your registered email address to access your account.
            </div>
            <Button
              className="w-full bg-primary hover:bg-primary/90 gap-2"
              onClick={() => base44.auth.redirectToLogin('/auth-redirect')}
            >
              <LogIn className="w-4 h-4" /> Sign in
            </Button>
          </div>
          <div className="bg-muted/40 rounded-lg p-3 border border-border/50">
            <p className="text-sm font-medium text-foreground mb-2">New to tawi.la?</p>
            <Link to="/register">
              <Button variant="outline" className="w-full gap-2">
                Create your account
              </Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground/60 text-center">
            Partner and admin accounts are invited directly by tawi.la.
          </p>
        </div>
      </div>
    </div>
  );
}