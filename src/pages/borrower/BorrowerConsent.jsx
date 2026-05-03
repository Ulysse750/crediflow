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
  'I understand that CrediFlow is not a lender and does not directly provide loans.',
  'I understand that my application and supporting documents will be shared with a licensed lending partner for review. I consent to this sharing.',
  'I understand that the licensed lending partner — not CrediFlow — makes all final credit decisions.',
  'I consent to CrediFlow processing my personal and financial information solely for the purpose of preparing and routing my loan application.',
  'I consent to receiving communications about my application status from CrediFlow and the assigned lending partner.',
  'I confirm that the information I have provided is accurate and complete to the best of my knowledge.',
  'I understand that submitting inaccurate information may result in my application being declined.',
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
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
            <span className="shrink-0 font-bold">!</span>
            <p>You must accept all items below before your application can be submitted and shared with a lending partner. Consent is required for data sharing. You can withdraw consent at any time by contacting support — this will pause your application.</p>
          </div>
          <p className="text-sm font-medium">Please read and confirm each item:</p>
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