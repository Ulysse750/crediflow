import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/useAuth';
import { base44 } from '@/api/base44Client';
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
  { key: 'profile', label: 'Basic profile', path: '/borrower/profile' },
  { key: 'questionnaire', label: 'Alternative-data questionnaire', path: '/borrower/questionnaire' },
  { key: 'documents', label: 'Required documents', path: '/borrower/documents' },
  { key: 'consent', label: 'Consent and data sharing', path: '/borrower/consent' },
  { key: 'group', label: 'Group setup', path: '/borrower/group' },
];

export default function BorrowerApplication() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [application, setApplication] = useState(null);
  const [appId, setAppId] = useState(null);
  const [consent, setConsent] = useState(null);
  const [group, setGroup] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [questionnaire, setQuestionnaire] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const update = (f, v) => setForm(prev => ({ ...prev, [f]: v }));

  useEffect(() => {
    if (!user) return;
    Promise.all([
      base44.entities.BorrowerProfile.filter({ created_by: user.email }),
      base44.entities.LoanApplication.filter({ borrowerEmail: user.email }),
      base44.entities.ConsentRecord.filter({ borrowerEmail: user.email }),
      base44.entities.BorrowerGroup.list(),
      base44.entities.Document.filter({ borrowerEmail: user.email }),
      base44.entities.QuestionnaireAnswer.filter({ borrowerEmail: user.email }),
    ]).then(([profiles, apps, consents, groups, docs, q]) => {
      setProfile(profiles[0] || null);
      if (apps[0]) { setApplication(apps[0]); setAppId(apps[0].id); setForm(apps[0]); }
      setConsent(consents[0] || null);
      setGroup(groups.find(g => (g.memberEmails || []).includes(user.email)) || null);
      setDocuments(docs);
      setQuestionnaire(q[0] || null);
      setLoading(false);
    });
  }, [user]);

  const onboardingStatus = {
    profile: !!profile,
    questionnaire: !!questionnaire,
    documents: documents.filter(d => d.status !== 'Not uploaded').length >= 2,
    consent: consent?.status === 'Accepted',
    group: !!group,
  };
  const incompleteSteps = ONBOARDING_STEPS.filter(s => !onboardingStatus[s.key]);
  const onboardingComplete = incompleteSteps.length === 0;
  const isSubmitted = application && application.status !== 'Draft';

  const handleSave = async () => {
    setSaving(true);
    const data = { ...form, borrowerEmail: user.email, groupId: group?.id };
    if (appId) {
      await base44.entities.LoanApplication.update(appId, { ...data, status: 'Draft' });
    } else {
      const created = await base44.entities.LoanApplication.create({ ...data, status: 'Draft' });
      setAppId(created.id); setApplication(created);
    }
    setSaving(false);
    toast.success('Draft saved');
  };

  const handleSubmit = async () => {
    if (!form.amount || !form.purpose) return toast.error('Please fill in amount and purpose');
    setSaving(true);
    const now = new Date().toISOString();
    const data = { ...form, borrowerEmail: user.email, groupId: group?.id, status: 'Submitted', submittedAt: now };
    if (appId) {
      await base44.entities.LoanApplication.update(appId, data);
    } else {
      const created = await base44.entities.LoanApplication.create(data);
      setAppId(created.id);
    }
    setApplication({ ...form, ...data });
    // Send confirmation email
    base44.integrations.Core.SendEmail({
      to: user.email,
      subject: 'CrediFlow — Application Submitted',
      body: `Hi ${user.full_name},\n\nYour loan application has been submitted for review.\n\nAmount: ₱${form.amount?.toLocaleString()}\nPurpose: ${form.purpose}\n\nA CrediFlow team member will review your application before forwarding it to a licensed lending partner. You will be notified of any status changes.\n\nCrediFlow does not guarantee loan approval. Final decisions are made by licensed lending partners.\n\nCrediFlow Team`,
    }).catch(() => {});
    setSaving(false);
    toast.success('Application submitted for CrediFlow review');
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

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
                <p className="text-sm text-muted-foreground mt-1">You must complete all onboarding steps — including consent — before submitting a loan application.</p>
              </div>
            </div>
            <div className="space-y-2">
              {ONBOARDING_STEPS.map(s => {
                const done = onboardingStatus[s.key];
                return (
                  <div key={s.key} className="flex items-center justify-between p-3 rounded-lg bg-white border">
                    <div className="flex items-center gap-3">
                      {done ? <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" /> : <div className="w-4 h-4 rounded-full border-2 border-muted-foreground shrink-0" />}
                      <span className={`text-sm ${done ? 'text-muted-foreground line-through' : 'font-medium'}`}>{s.label}</span>
                    </div>
                    {!done && <Link to={s.path}><Button variant="outline" size="sm" className="gap-1 text-xs">Go <ArrowRight className="w-3 h-3" /></Button></Link>}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <PageHeader title="Loan Application" description="Submit or review your application" />
      <ComplianceDisclaimer />

      {application && (
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base font-display">Application Summary</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div><p className="text-xs text-muted-foreground">Status</p><StatusChip status={application.status} /></div>
              <div><p className="text-xs text-muted-foreground">Amount</p><p className="font-medium">₱{application.amount?.toLocaleString()}</p></div>
              <div><p className="text-xs text-muted-foreground">Purpose</p><p className="font-medium">{application.purpose}</p></div>
              <div><p className="text-xs text-muted-foreground">Repayment</p><p className="font-medium">{application.repaymentFrequency}</p></div>
              <div><p className="text-xs text-muted-foreground">Consent</p><StatusChip status={consent?.status || 'Pending'} /></div>
            </div>
            {isSubmitted && <div className="mt-4 p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">Your application has been submitted. Contact support if you need to make changes.</div>}
          </CardContent>
        </Card>
      )}

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
                <Select value={form.purpose || ''} onValueChange={(v) => update('purpose', v)}>
                  <SelectTrigger><SelectValue placeholder="Select purpose" /></SelectTrigger>
                  <SelectContent>{PURPOSES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Preferred Repayment Period</Label>
                <Select value={form.repaymentPeriod || ''} onValueChange={(v) => update('repaymentPeriod', v)}>
                  <SelectTrigger><SelectValue placeholder="Select period" /></SelectTrigger>
                  <SelectContent>{PERIODS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Preferred Repayment Frequency</Label>
                <Select value={form.repaymentFrequency || ''} onValueChange={(v) => update('repaymentFrequency', v)}>
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
                <Select value={form.existingDebt || ''} onValueChange={(v) => update('existingDebt', v)}>
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
              <Button variant="outline" className="gap-2" onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save Draft'}
              </Button>
              <Button className="gap-2 bg-secondary hover:bg-secondary/90" disabled={!form.amount || !form.purpose || saving} onClick={handleSubmit}>
                <Send className="w-4 h-4" /> Submit for Review
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}