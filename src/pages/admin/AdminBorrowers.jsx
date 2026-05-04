import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';

export default function AdminBorrowers() {
  const [borrowers, setBorrowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.BorrowerProfile.list().then(b => { setBorrowers(b); setLoading(false); });
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

  return (
    <div className="space-y-6">
      <PageHeader title="All Borrowers" description={`${borrowers.length} registered borrower profiles`} />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left">
            <th className="p-3 font-medium text-muted-foreground">Email</th>
            <th className="p-3 font-medium text-muted-foreground">Province</th>
            <th className="p-3 font-medium text-muted-foreground">Income Source</th>
            <th className="p-3 font-medium text-muted-foreground">Mobile Wallet</th>
            <th className="p-3 font-medium text-muted-foreground">Registered</th>
          </tr></thead>
          <tbody>
            {borrowers.map(b => (
              <tr key={b.id} className="border-b hover:bg-muted/30 transition-colors">
                <td className="p-3 font-medium">{b.created_by}</td>
                <td className="p-3">{b.province || '—'}</td>
                <td className="p-3">{b.incomeSource || '—'}</td>
                <td className="p-3">{b.mobileWallet || '—'}</td>
                <td className="p-3 text-xs text-muted-foreground">{new Date(b.created_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {borrowers.length === 0 && <div className="p-8 text-center text-muted-foreground">No borrower profiles yet.</div>}
      </div>
    </div>
  );
}