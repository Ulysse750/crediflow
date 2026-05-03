import React from 'react';
import { useDemoAuth } from '@/lib/demoAuth';
import { getPartnerData, getBorrowerName } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function PartnerRepayments() {
  const { user } = useDemoAuth();
  const { repayments } = getPartnerData(user.partnerId);

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
                  <div><p className="text-xs text-muted-foreground">Loan</p><p className="font-medium">{r.loanId}</p></div>
                  <div><p className="text-xs text-muted-foreground">Due Date</p><p className="font-medium">{r.dueDate}</p></div>
                  <div><p className="text-xs text-muted-foreground">Due</p><p className="font-medium">₱{r.amountDue?.toLocaleString()}</p></div>
                  <div><p className="text-xs text-muted-foreground">Paid</p><p className="font-medium">₱{r.amountPaid?.toLocaleString()}</p></div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusChip status={r.status} />
                  <Button variant="outline" size="sm" onClick={() => toast.success('Status updated (demo)')}>Update</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}