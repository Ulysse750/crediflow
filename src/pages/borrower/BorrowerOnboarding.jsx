import React from 'react';
import { Link } from 'react-router-dom';
import { useDemoAuth } from '@/lib/demoAuth';
import { getBorrowerData } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, AlertCircle, ArrowRight, ChevronRight } from 'lucide-react';

const STEPS = [
  { key: 'profile', label: 'Basic profile', description: 'Personal, contact, and household details', path: '/borrower/profile', field: 'profileCompletion' },
  { key: 'questionnaire', label: 'Alternative-data questionnaire', description: 'Income, livelihood, and context questions', path: '/borrower/questionnaire', field: 'questionnaireCompletion' },
  { key: 'documents', label: 'Required documents', description: 'Upload identity, income, and business documents', path: '/borrower/documents', field: 'documentsCompletion' },
  { key: 'consent', label: 'Consent and data sharing', description: 'Review and accept privacy and partner sharing terms', path: '/borrower/consent', field: 'consentCompletion' },
  { key: 'group', label: 'Group setup', description: 'Join or create a borrower group', path: '/borrower/group', field: 'groupCompletion' },
];

function StepIcon({ pct }) {
  if (pct >= 100) return <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />;
  if (pct > 0) return <AlertCircle className="w-5 h-5 text-accent shrink-0" />;
  return <Circle className="w-5 h-5 text-muted-foreground shrink-0" />;
}

export default function BorrowerOnboarding() {
  const { user } = useDemoAuth();
  const { borrower } = getBorrowerData(user?.borrowerId || 'BRW-001');

  const overall = Math.round(
    STEPS.reduce((sum, s) => sum + (borrower?.[s.field] || 0), 0) / STEPS.length
  );

  const allDone = STEPS.every(s => (borrower?.[s.field] || 0) >= 100);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Borrower Onboarding</h1>
        <p className="text-sm text-muted-foreground mt-1">Complete all steps before submitting a loan application.</p>
      </div>

      <Card>
        <CardContent className="pt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall progress</span>
            <span className="text-sm font-semibold text-secondary">{overall}%</span>
          </div>
          <Progress value={overall} className="h-2.5" />
          {allDone && (
            <div className="mt-3 flex items-center gap-2 text-sm text-secondary font-medium">
              <CheckCircle2 className="w-4 h-4" /> All steps complete — you can now submit an application.
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-2">
        {STEPS.map((step) => {
          const pct = borrower?.[step.field] || 0;
          return (
            <Card key={step.key} className={pct >= 100 ? 'border-secondary/30' : ''}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <StepIcon pct={pct} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground">{step.label}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                    {pct > 0 && pct < 100 && (
                      <div className="mt-1.5">
                        <Progress value={pct} className="h-1.5 w-32" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs font-medium ${pct >= 100 ? 'text-secondary' : pct > 0 ? 'text-accent' : 'text-muted-foreground'}`}>
                      {pct >= 100 ? 'Complete' : pct > 0 ? `${pct}%` : 'Not started'}
                    </span>
                    <Link to={step.path}>
                      <Button variant="ghost" size="sm" className="gap-1 text-xs">
                        {pct >= 100 ? 'View' : 'Start'} <ChevronRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Link to="/borrower/application">
          <Button
            className={`gap-2 ${allDone ? 'bg-secondary hover:bg-secondary/90' : 'opacity-50 cursor-not-allowed'}`}
            disabled={!allDone}
            onClick={(e) => !allDone && e.preventDefault()}
          >
            Start loan application <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {!allDone && (
        <p className="text-xs text-muted-foreground text-center">
          Complete all steps above before you can submit a loan application.
        </p>
      )}
    </div>
  );
}