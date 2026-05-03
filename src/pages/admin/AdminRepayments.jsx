import React from 'react';
import { getAdminData, getBorrowerName } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AdminRepayments() {
  const { repayments } = getAdminData();
  return (
    <div className="space-y-6">
      <PageHeader title="All Repayments" description="Manual repayment tracking records" />
      <ComplianceDisclaimer variant="repayment" />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              {['ID', 'Loan', 'Borrower', 'Due Date', 'Amount Due', 'Amount Paid', 'Status', ''].map(h => (
                <th key={h} className="p-3 font-medium text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {repayments.map(r => (
              <tr key={r.id} className="border-b hover:bg-muted/30">
                <td className="p-3 font-mono text-xs">{r.id}</td>
                <td className="p-3 font-mono text-xs">{r.loanId}</td>
                <td className="p-3">{getBorrowerName(r.borrowerId)}</td>
                <td className="p-3">{r.dueDate}</td>
                <td className="p-3 font-medium">₱{r.amountDue?.toLocaleString()}</td>
                <td className="p-3">₱{r.amountPaid?.toLocaleString()}</td>
                <td className="p-3"><StatusChip status={r.status} /></td>
                <td className="p-3">
                  <Button variant="ghost" size="sm" onClick={() => toast.success(`Status updated for ${r.id} (demo)`)}>Update</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}