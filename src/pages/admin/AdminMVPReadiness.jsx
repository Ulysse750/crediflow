import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react';

const FEATURES = [
  { label: 'Borrower self-registration', status: 'complete', note: 'Public register page available.' },
  { label: 'Borrower onboarding module', status: 'complete', note: 'Profile, questionnaire, documents, consent, group steps.' },
  { label: 'Alternative-data questionnaire', status: 'complete', note: '6-section questionnaire with completion tracking.' },
  { label: 'Required document upload section', status: 'demo', note: 'Upload UI present. Actual file storage requires backend.' },
  { label: 'Consent and data sharing', status: 'complete', note: 'Consent records tracked per borrower.' },
  { label: 'Group creation / join', status: 'complete', note: 'Group management for borrowers.' },
  { label: 'Loan application form', status: 'complete', note: 'Application form with onboarding gate.' },
  { label: 'Admin application review workflow', status: 'complete', note: 'Full application review with partner assignment.' },
  { label: 'Partner assignment and routing', status: 'complete', note: 'Admin can assign applications to partners.' },
  { label: 'Partner application package', status: 'complete', note: 'Full partner view with AI analysis and decision panel.' },
  { label: 'AI applicant analysis (mock)', status: 'complete', note: 'Deterministic mock AI analyses for demo applications.' },
  { label: 'AI prompt management', status: 'complete', note: 'Admin can create, edit, and activate AI prompts.' },
  { label: 'Role-based access control', status: 'complete', note: 'Borrower/partner/admin role isolation enforced.' },
  { label: 'Risk flags management', status: 'complete', note: 'Admin risk flag review and resolution.' },
  { label: 'Support request management', status: 'complete', note: 'Admin support ticket workflow.' },
  { label: 'Repayment tracking (manual)', status: 'complete', note: 'Manual repayment status tracking.' },
  { label: 'Compliance overview', status: 'complete', note: 'Legal positioning confirmations and pending items.' },
  { label: 'Real AI integration (InvokeLLM)', status: 'complete', note: 'Wired to Core.InvokeLLM using active admin prompt from AI Prompt Manager.' },
  { label: 'Real file upload (UploadFile)', status: 'complete', note: 'Wired to Core.UploadFile — documents stored and accessible via URL.' },
  { label: 'Email notifications', status: 'complete', note: 'Core.SendEmail sends notifications on application submit, consent, and partner decisions.' },
  { label: 'Real authentication (Base44 auth)', status: 'complete', note: 'Migrated from demo auth to Base44 real auth with role-based access.' },
  { label: 'BSP/SEC regulatory approval', status: 'pending', note: 'Required before public lending operations.' },
];

const STATUS_ICON = {
  complete: <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />,
  demo: <AlertCircle className="w-4 h-4 text-accent shrink-0" />,
  pending: <Circle className="w-4 h-4 text-muted-foreground shrink-0" />,
};

const STATUS_LABEL = { complete: 'Complete', demo: 'Demo only', pending: 'Pending' };
const STATUS_COLOR = { complete: 'text-secondary', demo: 'text-accent', pending: 'text-muted-foreground' };

export default function AdminMVPReadiness() {
  const complete = FEATURES.filter(f => f.status === 'complete').length;
  const demo = FEATURES.filter(f => f.status === 'demo').length;
  const pending = FEATURES.filter(f => f.status === 'pending').length;

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader title="MVP Readiness" description="Feature completion status for the CrediFlow MVP." />

      <div className="grid grid-cols-3 gap-3">
        {[['Complete', complete, 'text-secondary'], ['Demo only', demo, 'text-accent'], ['Pending', pending, 'text-muted-foreground']].map(([label, count, color]) => (
          <Card key={label}>
            <CardContent className="pt-4 pb-3 text-center">
              <p className={`text-2xl font-bold font-display ${color}`}>{count}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-4 space-y-2">
          {FEATURES.map((f, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 text-sm">
              {STATUS_ICON[f.status]}
              <div className="flex-1 min-w-0">
                <span className="font-medium">{f.label}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{f.note}</p>
              </div>
              <span className={`text-xs font-medium shrink-0 ${STATUS_COLOR[f.status]}`}>{STATUS_LABEL[f.status]}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}