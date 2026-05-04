import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye } from 'lucide-react';

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.LoanApplication.list('-created_date').then(a => { setApplications(a); setLoading(false); });
  }, []);

  const filtered = filter === 'all' ? applications : applications.filter(a => a.status === filter);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

  return (
    <div className="space-y-6">
      <PageHeader title="All Applications" description="Manage loan applications">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Submitted">Submitted</SelectItem>
            <SelectItem value="Needs more information">Needs info</SelectItem>
            <SelectItem value="Under CrediFlow review">Under review</SelectItem>
            <SelectItem value="Ready for partner">Ready for partner</SelectItem>
            <SelectItem value="Sent to partner">Sent to partner</SelectItem>
          </SelectContent>
        </Select>
      </PageHeader>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left">
            <th className="p-3 font-medium text-muted-foreground">ID</th>
            <th className="p-3 font-medium text-muted-foreground">Borrower</th>
            <th className="p-3 font-medium text-muted-foreground">Amount</th>
            <th className="p-3 font-medium text-muted-foreground">Status</th>
            <th className="p-3 font-medium text-muted-foreground">Decision</th>
            <th className="p-3 font-medium text-muted-foreground">Risk</th>
            <th className="p-3 font-medium text-muted-foreground"></th>
          </tr></thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} className="border-b hover:bg-muted/30">
                <td className="p-3 font-mono text-xs">{a.id.slice(0,8)}…</td>
                <td className="p-3 font-medium">{a.borrowerEmail?.split('@')[0]}</td>
                <td className="p-3">₱{a.amount?.toLocaleString()}</td>
                <td className="p-3"><StatusChip status={a.status} /></td>
                <td className="p-3"><StatusChip status={a.partnerDecision} /></td>
                <td className="p-3">{a.riskLevel ? <StatusChip status={a.riskLevel} /> : '—'}</td>
                <td className="p-3"><Link to={`/admin/applications/${a.id}`}><Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="p-8 text-center text-muted-foreground">No applications found.</div>}
      </div>
    </div>
  );
}