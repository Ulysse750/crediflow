import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';

export default function AdminGroups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.BorrowerGroup.list().then(g => { setGroups(g); setLoading(false); });
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

  return (
    <div className="space-y-6">
      <PageHeader title="All Groups" description={`${groups.length} borrower groups`} />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left">
            <th className="p-3 font-medium text-muted-foreground">Name</th>
            <th className="p-3 font-medium text-muted-foreground">Leader</th>
            <th className="p-3 font-medium text-muted-foreground">Members</th>
            <th className="p-3 font-medium text-muted-foreground">Location</th>
            <th className="p-3 font-medium text-muted-foreground">Code</th>
            <th className="p-3 font-medium text-muted-foreground">Status</th>
            <th className="p-3 font-medium text-muted-foreground">Readiness</th>
          </tr></thead>
          <tbody>
            {groups.map(g => (
              <tr key={g.id} className="border-b hover:bg-muted/30">
                <td className="p-3 font-medium">{g.name}</td>
                <td className="p-3 text-xs">{g.leaderEmail}</td>
                <td className="p-3">{(g.memberEmails || []).length}</td>
                <td className="p-3">{g.location || '—'}</td>
                <td className="p-3 font-mono text-xs">{g.code}</td>
                <td className="p-3"><StatusChip status={g.status} /></td>
                <td className="p-3"><StatusChip status={g.readiness} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {groups.length === 0 && <div className="p-8 text-center text-muted-foreground">No groups yet.</div>}
      </div>
    </div>
  );
}