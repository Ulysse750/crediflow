import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/useAuth';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, AlertCircle, ArrowRight, ChevronRight } from 'lucide-react';

const STEPS = [
  { key: 'profile', label: 'Basic profile', description: 'Personal, contact, and household details', path: '/borrower/profile' },
  { key: 'questionnaire', label: 'Alternative-data questionnaire', description: 'Income, livelihood, and context questions', path: '/borrower/questionnaire' },
  { key: 'documents', label: 'Required documents', description: 'Upload identity, income, and business documents', path: '/borrower/documents' },
  { key: 'consent', label: 'Consent and data sharing', description: 'Review and accept privacy and partner sharing terms', path: '/borrower/consent' },
  { key: 'group', label: 'Group setup', description: 'Join or create a borrower group', path: '/borrower/group' },
];

function StepIcon({ done, partial }) {
  if (done) return <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />;
  if (partial) return <AlertCircle className="w-5 h-5 text-accent shrink-0" />;
  return <Circle className="w-5 h-5 text-muted-foreground shrink-0" />;
}

export default function BorrowerOnboarding() {
  const { user } = useAuth();
  const [status, setStatus] = useState({ profile: false, questionnaire: false, documents: false, consent: false, group: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      base44.entities.BorrowerProfile.filter({ created_by: user.email }),
      base44.entities.QuestionnaireAnswer.filter({ borrowerEmail: user.email }),
      base44.entities.Document.filter({ borrowerEmail: user.email }),
      base44.entities.ConsentRecord.filter({ borrowerEmail: user.email }),
      base44.entities.BorrowerGroup.list(),
    ]).then(([profiles, q, docs, consents, groups]) => {
      const docsUploaded = docs.filter(d => d.status !== 'Not uploaded').length;
      const myGroup = groups.find(g => (g.memberEmails || []).includes(user.email));
      setStatus({
        profile: !!profiles[0],
        questionnaire: !!q[0],
        documents: docsUploaded >= 2,
        consent: consents[0]?.status === 'Accepted',
        group: !!myGroup,
      });
      setLoading(false);
    });
  }, [user]);

  const completed = Object.values(status).filter(Boolean).length;
  const total = STEPS.length;
  const overall = Math.round((completed / total) * 100);
  const allDone = completed === total;

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

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
            <span className="text-sm font-semibold text-secondary">{completed}/{total} steps</span>
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
          const done = status[step.key];
          return (
            <Card key={step.key} className={done ? 'border-secondary/30' : ''}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <StepIcon done={done} partial={false} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground">{step.label}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs font-medium ${done ? 'text-secondary' : 'text-muted-foreground'}`}>
                      {done ? 'Complete' : 'Not started'}
                    </span>
                    <Link to={step.path}>
                      <Button variant="ghost" size="sm" className="gap-1 text-xs">
                        {done ? 'View' : 'Start'} <ChevronRight className="w-3 h-3" />
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
          <Button className={`gap-2 ${allDone ? 'bg-secondary hover:bg-secondary/90' : 'opacity-50 cursor-not-allowed'}`} disabled={!allDone}>
            Start loan application <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}