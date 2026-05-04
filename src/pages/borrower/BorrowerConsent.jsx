import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/useAuth';
import { base44 } from '@/api/base44Client';
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
  const { user } = useAuth();
  const [consent, setConsent] = useState(null);
  const [consentId, setConsentId] = useState(null);
  const [checks, setChecks] = useState(CONSENT_ITEMS.map(() => false));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    base44.entities.ConsentRecord.filter({ borrowerEmail: user.email }).then(records => {
      if (records[0]) {
        setConsent(records[0]);
        setConsentId(records[0].id);
        if (records[0].status === 'Accepted') {
          setChecks(CONSENT_ITEMS.map(() => true));
        }
      }
    });
  }, [user]);

  const toggleCheck = (i) => {
    const next = [...checks];
    next[i] = !next[i];
    setChecks(next);
  };

  const allChecked = checks.every(Boolean);

  const handleAccept = async () => {
    setSaving(true);
    const now = new Date().toISOString();
    const data = {
      borrowerEmail: user.email,
      status: 'Accepted',
      privacyNotice: true, dataSharing: true, accuracyDeclaration: true, communicationsConsent: true,
      acceptedAt: now,
      policyVersion: 'v1.0',
    };
    if (consentId) {
      await base44.entities.ConsentRecord.update(consentId, data);
    } else {
      const created = await base44.entities.ConsentRecord.create(data);
      setConsentId(created.id);
    }
    setConsent(data);
    setSaving(false);
    // Send email notification
    base44.integrations.Core.SendEmail({
      to: user.email,
      subject: 'CrediFlow — Consent Accepted',
      body: `Hi ${user.full_name},\n\nYour consent has been recorded on ${new Date().toLocaleDateString()}.\n\nYour application data may now be shared with a licensed lending partner for review.\n\nCrediFlow does not guarantee loan approval. Final decisions are made by licensed partners.\n\nCrediFlow Team`,
    }).catch(() => {});
    toast.success('Consent accepted');
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
            <p className="text-xs text-muted-foreground">Accepted on: {new Date(consent.acceptedAt).toLocaleDateString()}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
            <span className="shrink-0 font-bold">!</span>
            <p>You must accept all items below before your application can be submitted and shared with a lending partner. You can withdraw consent at any time by contacting support — this will pause your application.</p>
          </div>
          <p className="text-sm font-medium">Please read and confirm each item:</p>
          {CONSENT_ITEMS.map((item, i) => (
            <label key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors">
              <Checkbox checked={checks[i]} onCheckedChange={() => toggleCheck(i)} className="mt-0.5" disabled={consent?.status === 'Accepted'} />
              <span className="text-sm">{item}</span>
            </label>
          ))}

          <Button
            disabled={!allChecked || consent?.status === 'Accepted' || saving}
            className="w-full gap-2 bg-secondary hover:bg-secondary/90"
            onClick={handleAccept}
          >
            <CheckCircle className="w-4 h-4" />
            {consent?.status === 'Accepted' ? 'Consent Already Accepted' : saving ? 'Saving…' : 'Accept Consent'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}