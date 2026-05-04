import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/useAuth';
import { base44 } from '@/api/base44Client';
import RoleScopeNote from '@/components/shared/RoleScopeNote';
import StatusChip from '@/components/shared/StatusChip';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Users, Upload, CheckCircle, CreditCard, MessageSquare, User } from 'lucide-react';

export default function BorrowerDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [application, setApplication] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [consent, setConsent] = useState(null);
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      base44.entities.BorrowerProfile.filter({ created_by: user.email }),
      base44.entities.LoanApplication.filter({ borrowerEmail: user.email }),
      base44.entities.Document.filter({ borrowerEmail: user.email }),
      base44.entities.ConsentRecord.filter({ borrowerEmail: user.email }),
      base44.entities.BorrowerGroup.list(),
    ]).then(([profiles, apps, docs, consents, groups]) => {
      setProfile(profiles[0] || null);
      setApplication(apps[0] || null);
      setDocuments(docs);
      setConsent(consents[0] || null);
      setGroup(groups.find(g => (g.memberEmails || []).includes(user.email)) || null);
      setLoading(false);
    });
  }, [user]);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

  const docsUploaded = documents.filter(d => d.status !== 'Not uploaded').length;
  const totalDocs = documents.length;
  const consentDone = consent?.status === 'Accepted';

  const nextSteps = [];
  if (!profile) nextSteps.push({ label: 'Complete your profile', path: '/borrower/profile', icon: User });
  if (!consentDone) nextSteps.push({ label: 'Confirm consent', path: '/borrower/consent', icon: CheckCircle });
  if (docsUploaded < 2) nextSteps.push({ label: 'Upload required documents', path: '/borrower/documents', icon: Upload });
  if (application?.status === 'Draft') nextSteps.push({ label: 'Submit your application', path: '/borrower/application', icon: FileText });
  if (nextSteps.length === 0) nextSteps.push({ label: 'Wait for partner review', path: '/borrower/application', icon: FileText });

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-display font-bold">Welcome back, {user?.full_name || user?.email}</h1>
        <p className="text-sm text-muted-foreground mt-1">Your borrower portal overview</p>
      </div>
      <RoleScopeNote role="borrower" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Profile</p>
          <p className="text-lg font-bold mt-1">{profile ? '✓' : 'Incomplete'}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Application</p>
          <div className="mt-1"><StatusChip status={application?.status || 'None'} /></div>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Documents</p>
          <p className="text-lg font-bold mt-1">{totalDocs > 0 ? `${docsUploaded}/${totalDocs}` : '—'}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Group</p>
          <p className="text-sm font-semibold mt-1 truncate">{group?.name || 'None'}</p>
        </Card>
      </div>

      {application && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display">Current Application</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div><p className="text-muted-foreground text-xs">Application ID</p><p className="font-medium font-mono text-xs">{application.id}</p></div>
              <div><p className="text-muted-foreground text-xs">Amount</p><p className="font-medium">₱{application.amount?.toLocaleString()}</p></div>
              <div><p className="text-muted-foreground text-xs">Purpose</p><p className="font-medium">{application.purpose}</p></div>
              <div><p className="text-muted-foreground text-xs">Status</p><StatusChip status={application.status} /></div>
              <div><p className="text-muted-foreground text-xs">Consent</p><StatusChip status={consent?.status || 'Pending'} /></div>
            </div>
            <Link to="/borrower/application" className="inline-block mt-4">
              <Button variant="outline" size="sm" className="gap-1">View details <ArrowRight className="w-3 h-3" /></Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display">Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {nextSteps.map((s, i) => (
            <Link key={i} to={s.path} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <s.icon className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">{s.label}</span>
              <ArrowRight className="w-3 h-3 ml-auto text-muted-foreground" />
            </Link>
          ))}
        </CardContent>
      </Card>

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