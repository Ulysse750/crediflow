import React from 'react';
import { Link } from 'react-router-dom';
import { useDemoAuth } from '@/lib/demoAuth';
import { getBorrowerData, getGroupName, getPartnerName } from '@/lib/mockData';
import RoleScopeNote from '@/components/shared/RoleScopeNote';
import StatusChip from '@/components/shared/StatusChip';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Users, Upload, CheckCircle, CreditCard, MessageSquare, User } from 'lucide-react';

export default function BorrowerDashboard() {
  const { user } = useDemoAuth();
  const data = getBorrowerData(user.borrowerId);
  const app = data.applications[0];
  const profileComplete = !!data.borrower;
  const docsUploaded = data.documents.filter(d => d.status !== 'Not uploaded').length;
  const totalDocs = data.documents.length;
  const consentDone = data.consent?.status === 'Accepted';

  const nextSteps = [];
  if (!consentDone) nextSteps.push({ label: 'Confirm consent', path: '/borrower/consent', icon: CheckCircle });
  if (docsUploaded < totalDocs) nextSteps.push({ label: 'Upload required documents', path: '/borrower/documents', icon: Upload });
  if (app?.status === 'Draft') nextSteps.push({ label: 'Submit your application', path: '/borrower/application', icon: FileText });
  if (nextSteps.length === 0) nextSteps.push({ label: 'Wait for partner review', path: '/borrower/application', icon: FileText });

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-display font-bold">Welcome back, {data.borrower?.name}</h1>
        <p className="text-sm text-muted-foreground mt-1">Your borrower portal overview</p>
      </div>
      <RoleScopeNote role="borrower" />

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Profile</p>
          <p className="text-lg font-bold mt-1">{profileComplete ? '100%' : '0%'}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Application</p>
          <div className="mt-1"><StatusChip status={app?.status || 'None'} /></div>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Documents</p>
          <p className="text-lg font-bold mt-1">{docsUploaded}/{totalDocs}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Group</p>
          <p className="text-sm font-semibold mt-1 truncate">{data.group?.name || 'None'}</p>
        </Card>
      </div>

      {/* Current application */}
      {app && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display">Current Application</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div><p className="text-muted-foreground text-xs">Application ID</p><p className="font-medium">{app.id}</p></div>
              <div><p className="text-muted-foreground text-xs">Amount</p><p className="font-medium">₱{app.amount?.toLocaleString()}</p></div>
              <div><p className="text-muted-foreground text-xs">Purpose</p><p className="font-medium">{app.purpose}</p></div>
              <div><p className="text-muted-foreground text-xs">Group</p><p className="font-medium">{getGroupName(app.groupId)}</p></div>
              <div><p className="text-muted-foreground text-xs">Status</p><StatusChip status={app.status} /></div>
              <div><p className="text-muted-foreground text-xs">Partner</p><p className="font-medium">{getPartnerName(app.partnerId)}</p></div>
            </div>
            <Link to="/borrower/application" className="inline-block mt-4">
              <Button variant="outline" size="sm" className="gap-1">View details <ArrowRight className="w-3 h-3" /></Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Next steps */}
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