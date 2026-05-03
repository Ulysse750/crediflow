import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Info, Shield, AlertTriangle } from 'lucide-react';

const LEGAL_POSITIONS = [
  { label: 'CrediFlow is not a lender of record', status: 'Confirmed', note: 'Licensed lending partners are lender of record. CrediFlow operates as a workflow and origination platform only.' },
  { label: 'No loan guarantees', status: 'Confirmed', note: 'No guarantee of approval is expressed or implied anywhere on the platform.' },
  { label: 'No fund holding', status: 'Confirmed', note: 'CrediFlow does not hold, receive, or disburse borrower funds in v1.' },
  { label: 'No payment processing', status: 'Confirmed', note: 'Payments are managed by licensed partners or approved payment providers.' },
  { label: 'No insurance offering', status: 'Confirmed', note: 'No insurance products are offered or implied in v1.' },
  { label: 'AI analysis labelled as review aid only', status: 'Confirmed', note: 'All AI-generated outputs include required disclaimer. AI does not approve, reject, or score borrowers.' },
  { label: 'No scraping of private device data', status: 'Confirmed', note: 'CrediFlow does not access contact lists, SMS logs, call logs, social media, or private device data.' },
  { label: 'No public shaming / debt exposure', status: 'Confirmed', note: 'Borrower debt details are not shared with other group members.' },
  { label: 'Data privacy consent captured', status: 'Confirmed', note: 'Consent records are captured for each borrower before application.' },
  { label: 'Role-based data isolation', status: 'Confirmed', note: 'Borrowers see only own data. Partners see only assigned applications. Admins see all.' },
];

const DISCLAIMERS = [
  { label: 'Homepage', text: 'Displayed on public landing page.' },
  { label: 'Loan application form', text: 'Displayed before submission.' },
  { label: 'AI analysis output', text: 'Appended to every AI analysis record.' },
  { label: 'Partner application package', text: 'Shown in partner decision panel.' },
  { label: 'Repayment section', text: 'Displayed in borrower and partner repayment views.' },
  { label: 'Risk flags', text: 'Shown alongside all risk flag outputs.' },
  { label: 'Document review', text: 'Shown in document verification views.' },
];

const PENDING = [
  'BSP / SEC regulatory compliance review (to be conducted before public launch)',
  'Philippines Data Privacy Act (Republic Act No. 10173) compliance review',
  'Anti-Money Laundering Act (AMLA) review',
  'Formal legal review of all consent and data-sharing terms',
  'Lending partner agreement template review',
  'Data retention and deletion policy finalisation',
];

export default function AdminCompliance() {
  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader title="Compliance Overview" description="Legal positioning and compliance status for the CrediFlow MVP." />

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display flex items-center gap-2"><Shield className="w-4 h-4 text-secondary" /> Legal positioning confirmations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {LEGAL_POSITIONS.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 text-sm">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.note}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display flex items-center gap-2"><Info className="w-4 h-4 text-secondary" /> Disclaimer placement</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="text-left p-2 font-medium text-muted-foreground">Location</th><th className="text-left p-2 font-medium text-muted-foreground">Status</th></tr></thead>
            <tbody>
              {DISCLAIMERS.map((d, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2 font-medium">{d.label}</td>
                  <td className="p-2 text-xs text-muted-foreground">{d.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500" /> Pending before public launch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {PENDING.map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
              <span>{item}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}