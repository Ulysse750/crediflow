import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAdminData, getBorrowerName, getGroupName, getPartnerName } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye } from 'lucide-react';

export default function AdminApplications() {
  const { applications } = getAdminData();
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? applications : applications.filter(a => a.status === filter);

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
            <th className="p-3 font-medium text-muted-foreground">Group</th>
            <th className="p-3 font-medium text-muted-foreground">Partner</th>
            <th className="p-3 font-medium text-muted-foreground">Amount</th>
            <th className="p-3 font-medium text-muted-foreground">Status</th>
            <th className="p-3 font-medium text-muted-foreground">Decision</th>
            <th className="p-3 font-medium text-muted-foreground">Risk</th>
            <th className="p-3 font-medium text-muted-foreground"></th>
          </tr></thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} className="border-b hover:bg-muted/30">
                <td className="p-3 font-mono text-xs">{a.id}</td>
                <td className="p-3 font-medium">{getBorrowerName(a.borrowerId)}</td>
                <td className="p-3">{getGroupName(a.groupId)}</td>
                <td className="p-3">{getPartnerName(a.partnerId)}</td>
                <td className="p-3">₱{a.amount?.toLocaleString()}</td>
                <td className="p-3"><StatusChip status={a.status} /></td>
                <td className="p-3"><StatusChip status={a.partnerDecision} /></td>
                <td className="p-3"><StatusChip status={a.riskLevel} /></td>
                <td className="p-3">
                  <Link to={`/admin/applications/${a.id}`}>
                    <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}