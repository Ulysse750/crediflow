import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PublicHeader from '@/components/layout/PublicHeader';
import Logo from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Info, ArrowRight } from 'lucide-react';

// Base44 handles actual account creation via its own auth flow.
// This page explains what borrowers are signing up for, collects consent,
// then redirects them into the Base44 registration/login flow.
// After login, DashboardLayout auto-assigns the borrower role on first visit.

export default function Register() {
  const [consent, setConsent] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // If already logged in, redirect to dashboard
    base44.auth.me().then(user => {
      if (user) window.location.replace('/auth-redirect');
    }).catch(() => {});
  }, []);

  const handleStart = () => {
    if (!consent) return;
    // Redirect into Base44 auth. After sign-up/login, user lands on /borrower.
    // DashboardLayout will set their role to 'borrower' if not yet assigned.
    base44.auth.redirectToLogin('/auth-redirect');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader />
      <div className="flex-1 flex items-start justify-center py-10 px-4">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display font-bold text-foreground">Create your borrower account</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Free to join. Apply for loans through licensed lending partners.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-5">

            {/* What to expect */}
            <div className="space-y-3">
              {[
                { title: '1. Create your secure account', desc: 'Enter your name and email — takes under a minute.' },
                { title: '2. Complete your borrower profile', desc: 'Tell us about yourself, your income, and your situation.' },
                { title: '3. Upload documents & join a group', desc: 'A few required documents and a borrower group connection.' },
                { title: '4. Submit your application', desc: 'Your application is reviewed by a licensed lending partner.' },
              ].map((s, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-secondary/10 text-secondary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                  <div>
                    <p className="font-medium text-foreground">{s.title}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-muted/50 rounded-lg border border-border/50 text-xs text-muted-foreground flex gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <p>
                CrediFlow does not provide loans directly. Loan decisions are made entirely by licensed lending partners.
                No loan approval is guaranteed. We do not charge borrowers any fees for using this platform.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={v => setConsent(!!v)}
                className="mt-0.5"
              />
              <label htmlFor="consent" className="text-sm text-foreground cursor-pointer leading-relaxed">
                I understand CrediFlow is a loan-origination platform, not a lender. I agree to the{' '}
                <span className="text-secondary font-medium">Privacy Notice</span> and{' '}
                <span className="text-secondary font-medium">Data Processing Terms</span>.
                My application data will be shared with licensed lending partners for review.
                I confirm I am at least 18 years old.
              </label>
            </div>

            <Button
              className="w-full bg-secondary hover:bg-secondary/90 gap-2"
              disabled={!consent}
              onClick={handleStart}
            >
              Continue to create account <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-secondary font-medium hover:underline">Sign in</Link>
          </p>
          <p className="text-center text-xs text-muted-foreground/60 mt-2">
            Partner or admin? Your account is provided directly by CrediFlow.
          </p>
        </div>
      </div>
    </div>
  );
}