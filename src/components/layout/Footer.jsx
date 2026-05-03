import React from 'react';
import Logo from '@/components/shared/Logo';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-sm">
            <Logo size="sm" light />
            <p className="text-sm mt-3 text-primary-foreground/70 leading-relaxed">
              Responsible credit, made simple. A technology platform connecting borrower groups with licensed lending partners.
            </p>
          </div>
          <div className="text-xs text-primary-foreground/50 max-w-md space-y-2">
            <p>CrediFlow is a technology platform. Loans, where offered, are provided by licensed lending partners.</p>
            <p>No loan approval is guaranteed.</p>
            <p>This MVP does not process payments or offer insurance.</p>
            <p>CrediFlow does not scrape contact lists, SMS logs, call logs, social media accounts, or private device data.</p>
            <p>CrediFlow does not use public shaming or exposure of individual debt information.</p>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} CrediFlow. Demo MVP. All rights reserved.
        </div>
      </div>
    </footer>
  );
}