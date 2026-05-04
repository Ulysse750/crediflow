import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/useAuth';
import { base44 } from '@/api/base44Client';
import StatusChip from '@/components/shared/StatusChip';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Users, Upload, CheckCircle, CreditCard, MessageSquare, User, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function BorrowerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [application, setApplication] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [consent, setConsent] = useState(null);
  const [group, setGroup] = useState(null);
  const [questionnaire, setQuestionnaire] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      base44.entities.BorrowerProfile.filter({ created_by: user.email }),
      base44.entities.LoanApplication.filter({ borrowerEmail: user.email }),
      base44.entities.Document.filter({ borrowerEmail: user.email }),
      base44.entities.ConsentRecord.filter({ borrowerEmail: user.email }),
      base44.entities.BorrowerGroup.list(),
      base44.entities.QuestionnaireAnswer.filter({ borrowerEmail: user.email }),
    ]).then(([profiles, apps, docs, consents, groups, q]) => {
      const p = profiles[0] || null;
      setProfile(p);
      setApplication(apps[0] || null);
      setDocuments(docs);
      setConsent(consents[0] || null);
      setGroup(groups.find(g => (g.memberEmails || []).includes(user.email)) || null);
      setQuestionnaire(q[0] || null);
      setLoading(false);

      // Fresh account — no profile at all — redirect to onboarding
      if (!p) {
        navigate('/borrower/onboarding', { replace: true });
      }
    });
  }, [user]);

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
    </div>
  );

  const docsUploaded = documents.filter(d => d.status !== 'Not uploaded').length;
  const consentDone = consent?.status === 'Accepted';

  // Onboarding checklist
  const onboardingSteps = [
    { done: !!profile, label: 'Profile complete', path: '/borrower/profile' },
    { done: !!questionnaire, label: 'Questionnaire done', path: '/borrower/questionnaire' },
    { done: docsUploaded >= 2, label: 'Documents uploaded', path: '/borrower/documents' },
    { done: consentDone, label: 'Consent accepted', path: '/borrower/consent' },
    { done: !!group, label: 'Group joined', path: '/borrower/group' },
  ];
  const doneCount = onboardingSteps.filter(s => s.done).length;
  const onboardingComplete = doneCount === onboardingSteps.length;

  const nextSteps = onboardingSteps.filter(s => !s.done);
  if (onboardingComplete && (!application || application.status === 'Draft')) {
    nextSteps.push({ label: 'Submit your application', path: '/borrower/application' });
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-display font-bold">Welcome, {user?.full_name?.split(' ')[0] || 'there'}</h1>
        <p className="text-sm text-muted-foreground mt-1">Your borrower portal</p>
      </div>

      {/* Onboarding progress */}
      {!onboardingComplete && (
        <Card className="border-secondary/30 bg-secondary/5">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Target className="w-4 h-4 text-secondary" /> Complete your onboarding
              </p>
              <span className="text-sm font-semibold text-secondary">{doneCount}/5</span>
            </div>
            <Progress value={(doneCount / 5) * 100} className="h-2 mb-3" />
            <div className="space-y-1">
              {onboardingSteps.map((s, i) => (
                <Link key={i} to={s.path} className="flex items-center gap-2 text-sm py-1 hover:text-secondary transition-colors">
                  {s.done
                    ? <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                    : <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/40 shrink-0" />}
                  <span className={s.done ? 'text-muted-foreground line-through' : 'text-foreground'}>{s.label}</span>
                  {!s.done && <ArrowRight className="w-3 h-3 ml-auto text-muted-foreground" />}
                </Link>
              ))}
            </div>
            <Link to="/borrower/onboarding" className="inline-block mt-3">
              <Button size="sm" className="bg-secondary hover:bg-secondary/90 gap-1">
                View onboarding checklist <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Status grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Profile</p>
          <p className="text-sm font-bold mt-1">{profile ? '✓ Complete' : 'Incomplete'}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Application</p>
          <div className="mt-1"><StatusChip status={application?.status || 'None'} /></div>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Documents</p>
          <p className="text-sm font-bold mt-1">{documents.length > 0 ? `${docsUploaded}/${documents.length}` : '—'}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Group</p>
          <p className="text-sm font-semibold mt-1 truncate">{group?.name || 'None'}</p>
        </Card>
      </div>

      {/* Current application */}
      {application && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display">Current Application</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div><p className="text-muted-foreground text-xs">Amount</p><p className="font-medium">₱{application.amount?.toLocaleString()}</p></div>
              <div><p className="text-muted-foreground text-xs">Purpose</p><p className="font-medium">{application.purpose}</p></div>
              <div><p className="text-muted-foreground text-xs">Status</p><StatusChip status={application.status} /></div>
            </div>
            <Link to="/borrower/application" className="inline-block mt-4">
              <Button variant="outline" size="sm" className="gap-1">View details <ArrowRight className="w-3 h-3" /></Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Repayments', path: '/borrower/repayments', icon: CreditCard },
          { label: 'Support', path: '/borrower/support', icon: MessageSquare },
          { label: 'Profile', path: '/borrower/profile', icon: User },
          { label: 'Group', path: '/borrower/group', icon: Users },
        ].map(q => (
          <Link key={q.path} to={q.path}>
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer text-center">
              <q.icon className="w-5 h-5 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm font-medium">{q.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <ComplianceDisclaimer />
    </div>
  );
}