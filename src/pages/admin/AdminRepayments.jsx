import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const STATUSES = ['Upcoming', 'Paid', 'Partially paid', 'Late', 'Missed', 'Rescheduled'];

export default function AdminRepayments() {
  const [repayments, setRepayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Repayment.list('-dueDate').then(r => { setRepayments(r); setLoading(false); });
  }, []);

  const updateStatus = async (id, status) => {
    await base44.entities.Repayment.update(id, { status });
    setRepayments(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    toast.success('Status updated');
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

  return (
    <div className="space-y-6">
      <PageHeader title="All Repayments" description="Manual repayment tracking records" />
      <ComplianceDisclaimer variant="repayment" />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left">
            <th className="p-3 font-medium text-muted-foreground">Loan</th>
            <th className="p-3 font-medium text-muted-foreground">Borrower</th>
            <th className="p-3 font-medium text-muted-foreground">Due Date</th>
            <th className="p-3 font-medium text-muted-foreground">Amount Due</th>
            <th className="p-3 font-medium text-muted-foreground">Amount Paid</th>
            <th className="p-3 font-medium text-muted-foreground">Status</th>
            <th className="p-3 font-medium text-muted-foreground">Update</th>
          </tr></thead>
          <tbody>
            {repayments.map(r => (
              <tr key={r.id} className="border-b hover:bg-muted/30">
                <td className="p-3 font-mono text-xs">{r.loanId?.slice(0, 8)}…</td>
                <td className="p-3 text-xs">{r.borrowerEmail?.split('@')[0]}</td>
                <td className="p-3">{r.dueDate}</td>
                <td className="p-3 font-medium">₱{r.amountDue?.toLocaleString()}</td>
                <td className="p-3">₱{r.amountPaid?.toLocaleString()}</td>
                <td className="p-3"><StatusChip status={r.status} /></td>
                <td className="p-3">
                  <Select onValueChange={(v) => updateStatus(r.id, v)}>
                    <SelectTrigger className="w-32 h-7 text-xs"><SelectValue placeholder="Update" /></SelectTrigger>
                    <SelectContent>{STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {repayments.length === 0 && <div className="p-8 text-center text-muted-foreground">No repayments yet.</div>}
      </div>
    </div>
  );
}