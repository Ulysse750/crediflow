import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/useAuth';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Card, CardContent } from '@/components/ui/card';

export default function PartnerLoans() {
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    base44.entities.PartnerProfile.filter({ created_by: user.email }).then(async ([p]) => {
      if (!p) { setLoading(false); return; }
      const ls = await base44.entities.Loan.filter({ partnerProfileId: p.id });
      setLoans(ls);
      setLoading(false);
    });
  }, [user]);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

  return (
    <div className="space-y-6">
      <PageHeader title="Loans" description="Active and approved loans" />
      <div className="space-y-3">
        {loans.map(l => (
          <Card key={l.id}>
            <CardContent className="py-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                <div><p className="text-xs text-muted-foreground">Loan ID</p><p className="font-medium font-mono text-xs">{l.id}</p></div>
                <div><p className="text-xs text-muted-foreground">Borrower</p><p className="font-medium">{l.borrowerEmail?.split('@')[0]}</p></div>
                <div><p className="text-xs text-muted-foreground">Amount</p><p className="font-medium">₱{l.approvedAmount?.toLocaleString()}</p></div>
                <div><p className="text-xs text-muted-foreground">Frequency</p><p className="font-medium">{l.repaymentFrequency}</p></div>
                <div><p className="text-xs text-muted-foreground">Status</p><StatusChip status={l.status} /></div>
              </div>
            </CardContent>
          </Card>
        ))}
        {loans.length === 0 && <Card className="p-8 text-center text-muted-foreground">No loans yet.</Card>}
      </div>
    </div>
  );
}