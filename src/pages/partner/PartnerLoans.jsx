import React from 'react';
import { useDemoAuth } from '@/lib/demoAuth';
import { getPartnerData, getBorrowerName, getGroupName } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Card, CardContent } from '@/components/ui/card';

export default function PartnerLoans() {
  const { user } = useDemoAuth();
  const { loans } = getPartnerData(user?.partnerId || '');

  return (
    <div className="space-y-6">
      <PageHeader title="Loans" description="Active and approved loans" />
      <div className="space-y-3">
        {loans.map(l => (
          <Card key={l.id}>
            <CardContent className="py-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                <div><p className="text-xs text-muted-foreground">Loan ID</p><p className="font-medium">{l.id}</p></div>
                <div><p className="text-xs text-muted-foreground">Borrower</p><p className="font-medium">{getBorrowerName(l.borrowerId)}</p></div>
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