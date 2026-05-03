import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDemoAuth } from '@/lib/demoAuth';
import { getBorrowerData, getGroupName, getPartnerName } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Save, Send, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

const PURPOSES = ['Business capital', 'Farming inputs', 'Education', 'Medical expense', 'Household emergency', 'Other'];
const PERIODS = ['Less than 1 month', '1–3 months', '3–6 months', '6–12 months', 'Seasonal'];
const FREQUENCIES = ['Weekly', 'Every 2 weeks', 'Monthly', 'Seasonal'];

const ONBOARDING_STEPS = [
  { key: 'profileCompletion', label: 'Basic profile', path: '/borrower/profile' },
  { key: 'questionnaireCompletion', label: 'Alternative-data questionnaire', path: '/borrower/questionnaire' },
  { key: 'documentsCompletion', label: 'Required documents', path: '/borrower/documents' },
  { key: 'consentCompletion', label: 'Consent and data sharing', path: '/borrower/consent' },
  { key: 'groupCompletion', label: 'Group setup', path: '/borrower/group' },
];

export default function BorrowerApplication() {
  const { user } = useDemoAuth();
  const data = getBorrowerData(user.borrowerId);
  const { borrower } = data;
  const app = data.applications[0];
  const [form, setForm] = useState(app || {});
  const update = (f, v) => setForm(prev => ({ ...prev, [f]: v }));

  // Strict onboarding gate
  const incompleteSteps = ONBOARDING_STEPS.filter(s => (borrower?.[s.key] || 0) < 100);
  const consentGiven = data.consent?.status === 'Accepted';
  const onboardingComplete = incompleteSteps.length === 0 && consentGiven;

  // Also gate if app is already submitted (past Draft status)
  const isSubmitted = app && app.status !== 'Draft';

  if (!onboardingComplete) {
    return (
      <div className="max-w-2xl space-y-6">
        <PageHeader title="Loan Application" description="Complete all onboarding steps before submitting" />
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Application locked</p>
                <p className="text-sm text-muted-foreground mt-1">
                  You must complete all onboarding steps — including consent — before submitting a loan application. This ensures your application can be properly reviewed by a licensed lending partner.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {ONBOARDING_STEPS.map(s => {
                const pct = borrower?.[s.key] || 0;
                const done = pct >= 100 && (s.key !== 'consentCompletion' || consentGiven);
                return (
                  <div key={s.key} className="flex items-center justify-between p-3 rounded-lg bg-white border">
                    <div className="flex items-center gap-3">
                      {done
                        ? <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                        : <div className="w-4 h-4 rounded-full border-2 border-muted-foreground shrink-0" />
                      }
                      <span className={`text-sm ${done ? 'text-muted-foreground line-through' : 'font-medium'}`}>{s.label}</span>
                    </div>
                    {!done && (
                      <Link to={s.path}>
                        <Button variant="outline" size="sm" className="gap-1 text-xs">
                          Go <ArrowRight className="w-3 h-3" />
                        </Button>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
            <Link to="/borrower/onboarding">
              <Button variant="outline" className="w-full gap-2">
                View onboarding checklist <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <PageHeader title="Loan Application" description="Submit or review your application" />
      <ComplianceDisclaimer />

      {/* Status Summary */}
      {app && (
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base font-display">Application Summary</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div><p className="text-xs text-muted-foreground">Status</p><StatusChip status={app.status} /></div>
              <div><p className="text-xs text-muted-foreground">Amount</p><p className="font-medium">₱{app.amount?.toLocaleString()}</p></div>
              <div><p className="text-xs text-muted-foreground">Purpose</p><p className="font-medium">{app.purpose}</p></div>
              <div><p className="text-xs text-muted-foreground">Repayment</p><p className="font-medium">{app.repaymentFrequency}</p></div>
              <div><p className="text-xs text-muted-foreground">Group</p><p className="font-medium">{getGroupName(app.groupId)}</p></div>
              <div><p className="text-xs text-muted-foreground">Consent</p><StatusChip status={data.consent?.status || 'Pending'} /></div>
            </div>
            {isSubmitted && (
              <div className="mt-4 p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
                Your application has been submitted. You can track its status above. Contact support if you need to make changes.
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Application form — only editable if Draft or no app yet */}
      {!isSubmitted && (
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base font-display">Application Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Requested Amount (PHP) *</Label>
                <Input type="number" value={form.amount || ''} onChange={(e) => update('amount', Number(e.target.value))} placeholder="e.g. 25000" min="1" />
              </div>
              <div className="space-y-2">
                <Label>Loan Purpose *</Label>
                <Select value={form.purpose} onValueChange={(v) => update('purpose', v)}>
                  <SelectTrigger><SelectValue placeholder="Select purpose" /></SelectTrigger>
                  <SelectContent>{PURPOSES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Preferred Repayment Period</Label>
                <Select value={form.repaymentPeriod} onValueChange={(v) => update('repaymentPeriod', v)}>
                  <SelectTrigger><SelectValue placeholder="Select period" /></SelectTrigger>
                  <SelectContent>{PERIODS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Preferred Repayment Frequency</Label>
                <Select value={form.repaymentFrequency} onValueChange={(v) => update('repaymentFrequency', v)}>
                  <SelectTrigger><SelectValue placeholder="Select frequency" /></SelectTrigger>
                  <SelectContent>{FREQUENCIES.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Primary Income Source</Label>
                <Input value={form.incomeSource || ''} onChange={(e) => update('incomeSource', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Do you have any existing loans?</Label>
                <Select value={form.existingDebt} onValueChange={(v) => update('existingDebt', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {form.existingDebt === 'Yes' && (
              <div className="space-y-2">
                <Label>Existing Debt Details (optional)</Label>
                <Textarea value={form.existingDebtDetails || ''} onChange={(e) => update('existingDebtDetails', e.target.value)} placeholder="Briefly describe the loan — lender type, approximate amount" />
              </div>
            )}
            <div className="space-y-2">
              <Label>How do you plan to repay the loan?</Label>
              <Input value={form.repaymentSource || ''} onChange={(e) => update('repaymentSource', e.target.value)} placeholder="e.g. Daily store sales, harvest income" />
            </div>
            <div className="space-y-2">
              <Label>Additional information (optional)</Label>
              <Textarea value={form.additionalExplanation || ''} onChange={(e) => update('additionalExplanation', e.target.value)} placeholder="Anything else you'd like the reviewer to know" />
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="gap-2" onClick={() => toast.success('Draft saved')}>
                <Save className="w-4 h-4" /> Save Draft
              </Button>
              <Button
                className="gap-2 bg-secondary hover:bg-secondary/90"
                disabled={!form.amount || !form.purpose}
                onClick={() => toast.success('Application submitted for CrediFlow review. A team member will review it before forwarding to the lending partner.')}
              >
                <Send className="w-4 h-4" /> Submit for Review
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}