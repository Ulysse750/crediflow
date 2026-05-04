import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/useAuth';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

export default function BorrowerRepayments() {
  const { user } = useAuth();
  const [repayments, setRepayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    base44.entities.Repayment.filter({ borrowerEmail: user.email }).then(r => { setRepayments(r); setLoading(false); });
  }, [user]);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Repayments" description="Track your repayment schedule" />
      <ComplianceDisclaimer variant="repayment" />
      {repayments.length === 0 ? (
        <Card className="p-8 text-center">
          <CreditCard className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No repayment records yet.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {repayments.map(r => (
            <Card key={r.id}>
              <CardContent className="py-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1 text-sm">
                    <div><p className="text-xs text-muted-foreground">Loan</p><p className="font-medium font-mono text-xs">{r.loanId}</p></div>
                    <div><p className="text-xs text-muted-foreground">Due Date</p><p className="font-medium">{r.dueDate}</p></div>
                    <div><p className="text-xs text-muted-foreground">Amount Due</p><p className="font-medium">₱{r.amountDue?.toLocaleString()}</p></div>
                    <div><p className="text-xs text-muted-foreground">Paid</p><p className="font-medium">₱{r.amountPaid?.toLocaleString()}</p></div>
                  </div>
                  <StatusChip status={r.status} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}