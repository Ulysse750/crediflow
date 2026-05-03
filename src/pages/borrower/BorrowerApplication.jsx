import React, { useState } from 'react';
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
import { Save, Send } from 'lucide-react';

const PURPOSES = ['Business capital', 'Farming inputs', 'Education', 'Medical expense', 'Household emergency', 'Personal consumption', 'Other'];
const PERIODS = ['Less than 1 month', '1–3 months', '3–6 months', '6–12 months', 'Seasonal'];
const FREQUENCIES = ['Weekly', 'Every 2 weeks', 'Monthly', 'Seasonal'];

export default function BorrowerApplication() {
  const { user } = useDemoAuth();
  const data = getBorrowerData(user.borrowerId);
  const app = data.applications[0];
  const [form, setForm] = useState(app || {});
  const update = (f, v) => setForm(prev => ({ ...prev, [f]: v }));

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
              <div><p className="text-xs text-muted-foreground">Existing Debt</p><p className="font-medium">{app.existingDebt}</p></div>
              <div><p className="text-xs text-muted-foreground">Documents</p><p className="font-medium">{data.documents.length} uploaded</p></div>
              <div><p className="text-xs text-muted-foreground">Consent</p><StatusChip status={data.consent?.status || 'Pending'} /></div>
              <div><p className="text-xs text-muted-foreground">Partner</p><p className="font-medium">{getPartnerName(app.partnerId)}</p></div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Application Form */}
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
              <Label>Income Source</Label>
              <Input value={form.incomeSource || ''} onChange={(e) => update('incomeSource', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Existing Debt</Label>
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
              <Label>Existing Debt Details</Label>
              <Textarea value={form.existingDebtDetails || ''} onChange={(e) => update('existingDebtDetails', e.target.value)} />
            </div>
          )}
          <div className="space-y-2">
            <Label>Repayment Source</Label>
            <Input value={form.repaymentSource || ''} onChange={(e) => update('repaymentSource', e.target.value)} />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="gap-2" onClick={() => toast.success('Draft saved')}>
              <Save className="w-4 h-4" /> Save Draft
            </Button>
            <Button className="gap-2 bg-secondary hover:bg-secondary/90" onClick={() => toast.success('Application submitted for CrediFlow review')}>
              <Send className="w-4 h-4" /> Submit for Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}