import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PublicHeader from '@/components/layout/PublicHeader';
import Footer from '@/components/layout/Footer';
import Logo from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, UserPlus, Users, Building2, FileCheck, BarChart3, Shield, CheckCircle } from 'lucide-react';

const steps = [
  { num: 1, title: 'Create your profile', desc: 'Simple onboarding with essential information only.', icon: UserPlus },
  { num: 2, title: 'Join or create a group', desc: 'Connect with trusted peers for group-based support.', icon: Users },
  { num: 3, title: 'Get reviewed by a partner', desc: 'Licensed lending partners review your application.', icon: Building2 },
];

const borrowerBenefits = [
  { title: 'Simple onboarding', desc: 'No complicated forms. Just what\'s needed.' },
  { title: 'Group-based support', desc: 'Apply with your trusted circle.' },
  { title: 'Clear status tracking', desc: 'Always know where your application stands.' },
];

const partnerBenefits = [
  { title: 'Cleaner applications', desc: 'Organised borrower data and documents.' },
  { title: 'Group context', desc: 'See borrower group dynamics and readiness.' },
  { title: 'Document review tools', desc: 'AI-assisted document analysis and review.' },
];

export default function Home() {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    base44.auth.me().then(user => {
      if (!user) { setChecking(false); return; }
      if (user.role === 'partner') window.location.href = '/partner';
      else if (user.role === 'admin') window.location.href = '/admin';
      else window.location.href = '/borrower';
    }).catch(() => setChecking(false));
  }, []);

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-2xl">
            <div className="mb-6">
              <Logo size="lg" light />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
              Responsible credit,<br />made simple.
            </h1>
            <p className="mt-5 text-lg text-white/80 leading-relaxed max-w-lg">
              CrediFlow helps trusted borrower groups apply for loans through licensed lending partners in the Philippines and Southeast Asia.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-semibold gap-2 px-6"
                onClick={() => base44.auth.redirectToLogin('/auth-redirect')}>
                Create account <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold gap-2 px-6"
                onClick={() => base44.auth.redirectToLogin('/auth-redirect')}>
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-center text-foreground">How it works</h2>
          <p className="text-center text-muted-foreground mt-2 max-w-md mx-auto">Three simple steps to connect with licensed lending partners.</p>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {steps.map((s) => (
              <Card key={s.num} className="p-6 text-center hover:shadow-lg transition-shadow border-border/50">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-7 h-7 text-secondary" />
                </div>
                <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Step {s.num}</div>
                <h3 className="font-display font-semibold text-lg text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-2 text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
              <UserPlus className="w-4 h-4" /> For Borrowers
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-6">Apply with confidence</h3>
            <div className="space-y-4">
              {borrowerBenefits.map((b, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">{b.title}</p>
                    <p className="text-sm text-muted-foreground">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              <Building2 className="w-4 h-4" /> For Partners
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-6">Review with clarity</h3>
            <div className="space-y-4">
              {partnerBenefits.map((b, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">{b.title}</p>
                    <p className="text-sm text-muted-foreground">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-12 bg-white border-t border-border/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            CrediFlow does not directly provide loans. Loan decisions are made by licensed lending partners. 
            CrediFlow is a technology and loan-origination workflow platform that helps borrowers submit applications 
            and routes them to licensed partners. No loan approval is guaranteed.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}