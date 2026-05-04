import React from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import Logo from '@/components/shared/Logo';

const UserNotRegisteredError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <Logo size="md" />
        </div>
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 mx-auto">
            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-xl font-display font-bold text-foreground">Account not found</h1>
          <p className="text-sm text-muted-foreground">
            This email address is not registered on CrediFlow. Please sign up first to create a borrower account.
          </p>
          <div className="flex flex-col gap-2 pt-2">
            <Button
              className="w-full bg-secondary hover:bg-secondary/90"
              onClick={() => window.location.replace('/register')}
            >
              Create a borrower account
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => base44.auth.logout('/login')}
            >
              Try a different account
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground/60">
          Partner or admin? Your account is provided directly by CrediFlow.
        </p>
      </div>
    </div>
  );
};

export default UserNotRegisteredError;