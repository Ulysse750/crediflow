import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';

export default function AdminLoans() {
  const [loans, setLoans] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ borrowerEmail: '', applicationId: '', approvedAmount: '', repaymentFrequency: 'Monthly', totalInstallments: 6 });

  useEffect(() => {
    Promise.all([
      base44.entities.Loan.list('-created_date'),
      base44.entities.PartnerProfile.list(),
    ]).then(([ls, pts]) => { setLoans(ls); setPartners(pts); setLoading(false); });
  }, []);

  const handleCreate = async () => {
    const created = await base44.entities.Loan.create({ ...form, approvedAmount: Number(form.approvedAmount), status: 'Approved' });
    setLoans(prev => [created, ...prev]);
    setOpen(false);
    toast.success('Loan created');
  };

  const getPartnerName = (id) => partners.find(p => p.id === id)?.institutionName || '—';

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

  return (
    <div className="space-y-6">
      <PageHeader title="All Loans" description="Manage active and approved loans">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-secondary hover:bg-secondary/90"><Plus className="w-4 h-4" /> Create Loan</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Loan</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1"><Label>Borrower Email</Label><Input value={form.borrowerEmail} onChange={e => setForm(p => ({ ...p, borrowerEmail: e.target.value }))} /></div>
              <div className="space-y-1"><Label>Application ID</Label><Input value={form.applicationId} onChange={e => setForm(p => ({ ...p, applicationId: e.target.value }))} /></div>
              <div className="space-y-1"><Label>Approved Amount (₱)</Label><Input type="number" value={form.approvedAmount} onChange={e => setForm(p => ({ ...p, approvedAmount: e.target.value }))} /></div>
              <Button className="w-full bg-secondary hover:bg-secondary/90" onClick={handleCreate}>Create Loan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </PageHeader>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left">
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
                <td className="p-3 text-xs">{l.borrowerEmail}</td>
                <td className="p-3">{l.partnerName || getPartnerName(l.partnerProfileId)}</td>
                <td className="p-3">₱{l.approvedAmount?.toLocaleString()}</td>
                <td className="p-3">{l.disbursementDate || '—'}</td>
                <td className="p-3">{l.repaymentFrequency}</td>
                <td className="p-3"><StatusChip status={l.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {loans.length === 0 && <div className="p-8 text-center text-muted-foreground">No loans yet.</div>}
      </div>
    </div>
  );
}