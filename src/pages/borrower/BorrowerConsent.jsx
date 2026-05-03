import React, { useState } from 'react';
import { useDemoAuth } from '@/lib/demoAuth';
import { getBorrowerData } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { CheckCircle } from 'lucide-react';

const CONSENT_ITEMS = [
  'I understand CrediFlow is not directly offering me a loan.',
  'I understand my application may be shared with a licensed lending partner.',
  'I understand the licensed partner makes the final credit decision.',
  'I consent to processing of my information for application review.',
  'I consent to communications about my application.',
  'I understand group participation rules.',
];

export default function BorrowerConsent() {
  const { user } = useDemoAuth();
  const { consent } = getBorrowerData(user.borrowerId);
  const [checks, setChecks] = useState(CONSENT_ITEMS.map(() => consent?.status === 'Accepted'));
  const allChecked = checks.every(Boolean);

  const toggleCheck = (i) => {
    const next = [...checks];
    next[i] = !next[i];
    setChecks(next);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Consent" description="Review and accept consent terms" />
      <ComplianceDisclaimer />

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Consent Status</p>
              <p className="text-xs text-muted-foreground mt-0.5">Policy version: {consent?.policyVersion || 'v1.0'}</p>
            </div>
            <StatusChip status={consent?.status || 'Pending'} />
          </div>
          {consent?.acceptedAt && (
            <p className="text-xs text-muted-foreground">Accepted on: {consent.acceptedAt}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <p className="text-sm font-medium">Please review each item:</p>
          {CONSENT_ITEMS.map((item, i) => (
            <label key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors">
              <Checkbox checked={checks[i]} onCheckedChange={() => toggleCheck(i)} className="mt-0.5" />
              <span className="text-sm">{item}</span>
            </label>
          ))}

          <Button
            disabled={!allChecked || consent?.status === 'Accepted'}
            className="w-full gap-2 bg-secondary hover:bg-secondary/90"
            onClick={() => toast.success('Consent accepted (demo)')}
          >
            <CheckCircle className="w-4 h-4" />
            {consent?.status === 'Accepted' ? 'Consent Already Accepted' : 'Accept Consent'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}