import React from 'react';
import { getAdminData, getGroupName } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminBorrowers() {
  const { borrowers } = getAdminData();

  return (
    <div className="space-y-6">
      <PageHeader title="All Borrowers" description="Manage all borrower records" />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left">
            <th className="p-3 font-medium text-muted-foreground">ID</th>
            <th className="p-3 font-medium text-muted-foreground">Name</th>
            <th className="p-3 font-medium text-muted-foreground">Location</th>
            <th className="p-3 font-medium text-muted-foreground">Income</th>
            <th className="p-3 font-medium text-muted-foreground">Group</th>
            <th className="p-3 font-medium text-muted-foreground">Application</th>
            <th className="p-3 font-medium text-muted-foreground">Documents</th>
            <th className="p-3 font-medium text-muted-foreground">Consent</th>
          </tr></thead>
          <tbody>
            {borrowers.map(b => (
              <tr key={b.id} className="border-b hover:bg-muted/30 transition-colors">
                <td className="p-3 font-mono text-xs">{b.id}</td>
                <td className="p-3 font-medium">{b.name}</td>
                <td className="p-3">{b.province}</td>
                <td className="p-3">{b.incomeSource}</td>
                <td className="p-3">{getGroupName(b.groupId)}</td>
                <td className="p-3"><StatusChip status={b.applicationStatus} /></td>
                <td className="p-3"><StatusChip status={b.documentStatus} /></td>
                <td className="p-3"><StatusChip status={b.consentStatus} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}