import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/useAuth';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function PartnerRepayments() {
  const { user } = useAuth();
  const [repayments, setRepayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    base44.entities.PartnerProfile.filter({ created_by: user.email }).then(async ([p]) => {
      if (!p) { setLoading(false); return; }
      const loans = await base44.entities.Loan.filter({ partnerProfileId: p.id });
      const loanIds = loans.map(l => l.id);
      if (!loanIds.length) { setLoading(false); return; }
      const all = await base44.entities.Repayment.list();
      setRepayments(all.filter(r => loanIds.includes(r.loanId)));
      setLoading(false);
    });
  }, [user]);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

  return (
    <div className="space-y-6">
      <PageHeader title="Repayments" description="Track repayments for your loans" />
      <ComplianceDisclaimer variant="repayment" />
      <div className="space-y-3">
        {repayments.map(r => (
          <Card key={r.id}>
            <CardContent className="py-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-1 text-sm">
                  <div><p className="text-xs text-muted-foreground">Loan</p><p className="font-medium font-mono text-xs">{r.loanId}</p></div>
                  <div><p className="text-xs text-muted-foreground">Due Date</p><p className="font-medium">{r.dueDate}</p></div>
                  <div><p className="text-xs text-muted-foreground">Due</p><p className="font-medium">₱{r.amountDue?.toLocaleString()}</p></div>
                  <div><p className="text-xs text-muted-foreground">Paid</p><p className="font-medium">₱{r.amountPaid?.toLocaleString()}</p></div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusChip status={r.status} />
                  <Button variant="outline" size="sm" onClick={() => toast.success('Status update — use admin panel to update repayment status')}>Update</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {repayments.length === 0 && <Card className="p-8 text-center text-muted-foreground">No repayments yet.</Card>}
      </div>
    </div>
  );
}