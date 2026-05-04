import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/useAuth';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Card, CardContent } from '@/components/ui/card';

export default function PartnerBorrowers() {
  const { user } = useAuth();
  const [borrowerApps, setBorrowerApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    base44.entities.PartnerProfile.filter({ created_by: user.email }).then(async ([p]) => {
      if (!p) { setLoading(false); return; }
      const apps = await base44.entities.LoanApplication.filter({ partnerProfileId: p.id });
      setBorrowerApps(apps);
      setLoading(false);
    });
  }, [user]);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

  // Deduplicate by borrowerEmail
  const uniqueBorrowers = [...new Map(borrowerApps.map(a => [a.borrowerEmail, a])).values()];

  return (
    <div className="space-y-6">
      <PageHeader title="Assigned Borrowers" description="Borrowers linked to your applications" />
      <div className="space-y-3">
        {uniqueBorrowers.map(a => (
          <Card key={a.borrowerEmail}>
            <CardContent className="py-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div><p className="text-xs text-muted-foreground">Borrower</p><p className="font-medium">{a.borrowerEmail?.split('@')[0]}</p></div>
                <div><p className="text-xs text-muted-foreground">Email</p><p className="font-medium text-xs">{a.borrowerEmail}</p></div>
                <div><p className="text-xs text-muted-foreground">Purpose</p><p className="font-medium">{a.purpose}</p></div>
                <div><p className="text-xs text-muted-foreground">Application</p><StatusChip status={a.status} /></div>
              </div>
            </CardContent>
          </Card>
        ))}
        {uniqueBorrowers.length === 0 && <Card className="p-8 text-center text-muted-foreground">No borrowers assigned yet.</Card>}
      </div>
    </div>
  );
}