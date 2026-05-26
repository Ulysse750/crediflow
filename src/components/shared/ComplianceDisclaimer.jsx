import React from 'react';
import { Info } from 'lucide-react';

export default function ComplianceDisclaimer({ variant = 'default' }) {
  const messages = {
    default: 'tawi.la does not directly provide loans. Loan decisions are made by licensed lending partners. No loan approval is guaranteed.',
    ai: 'This AI-generated summary is a review aid only. It is not a credit decision, legal conclusion, fraud finding, or approval recommendation. Final decisions remain with licensed partners and human reviewers.',
    partner: 'Partner decisions are made by the licensed lending partner. tawi.la provides organisation, workflow support, and preliminary review information only.',
    repayment: 'tawi.la does not process or hold funds. Payments are handled by the licensed partner or approved payment provider.',
    risk: 'Risk flags are workflow review aids only. They are not automated credit decisions.',
  };

  return (
    <div className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/50 border border-border/50 text-xs text-muted-foreground">
      <Info className="w-4 h-4 shrink-0 mt-0.5" />
      <p>{messages[variant]}</p>
    </div>
  );
}