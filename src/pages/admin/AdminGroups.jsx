import React from 'react';
import { getAdminData, getPartnerName } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';

export default function AdminGroups() {
  const { groups } = getAdminData();
  return (
    <div className="space-y-6">
      <PageHeader title="All Groups" description="Manage borrower groups" />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left">
            <th className="p-3 font-medium text-muted-foreground">ID</th>
            <th className="p-3 font-medium text-muted-foreground">Name</th>
            <th className="p-3 font-medium text-muted-foreground">Leader</th>
            <th className="p-3 font-medium text-muted-foreground">Members</th>
            <th className="p-3 font-medium text-muted-foreground">Location</th>
            <th className="p-3 font-medium text-muted-foreground">Status</th>
            <th className="p-3 font-medium text-muted-foreground">Partner</th>
            <th className="p-3 font-medium text-muted-foreground">Readiness</th>
          </tr></thead>
          <tbody>
            {groups.map(g => (
              <tr key={g.id} className="border-b hover:bg-muted/30">
                <td className="p-3 font-mono text-xs">{g.id}</td>
                <td className="p-3 font-medium">{g.name}</td>
                <td className="p-3">{g.leader}</td>
                <td className="p-3">{g.memberIds.length}</td>
                <td className="p-3">{g.location}</td>
                <td className="p-3"><StatusChip status={g.status} /></td>
                <td className="p-3">{getPartnerName(g.partnerId)}</td>
                <td className="p-3"><StatusChip status={g.readiness} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}