import React from 'react';
import { getAdminData, getBorrowerName, getGroupName, getPartnerName } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AdminLoans() {
  const { loans } = getAdminData();
  return (
    <div className="space-y-6">
      <PageHeader title="All Loans" description="Manage active and approved loans">
        <Button className="bg-secondary hover:bg-secondary/90" onClick={() => toast.info('Create loan flow (demo)')}>Create Loan</Button>
      </PageHeader>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left">
            <th className="p-3 font-medium text-muted-foreground">ID</th>
            <th className="p-3 font-medium text-muted-foreground">Borrower</th>
            <th className="p-3 font-medium text-muted-foreground">Partner</th>
            <th className="p-3 font-medium text-muted-foreground">Amount</th>
            <th className="p-3 font-medium text-muted-foreground">Disbursed</th>
            <th className="p-3 font-medium text-muted-foreground">Frequency</th>
            <th className="p-3 font-medium text-muted-foreground">Status</th>
          </tr></thead>
          <tbody>
            {loans.map(l => (
              <tr key={l.id} className="border-b hover:bg-muted/30">
                <td className="p-3 font-mono text-xs">{l.id}</td>
                <td className="p-3">{getBorrowerName(l.borrowerId)}</td>
                <td className="p-3">{l.partnerName}</td>
                <td className="p-3">₱{l.approvedAmount?.toLocaleString()}</td>
                <td className="p-3">{l.disbursementDate || '—'}</td>
                <td className="p-3">{l.repaymentFrequency}</td>
                <td className="p-3"><StatusChip status={l.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}