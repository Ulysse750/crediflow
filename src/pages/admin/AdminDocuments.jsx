import React from 'react';
import { getAdminData, getBorrowerName } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Sparkles } from 'lucide-react';

export default function AdminDocuments() {
  const { documents } = getAdminData();
  return (
    <div className="space-y-6">
      <PageHeader title="All Documents" description="Document verification workflow" />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left">
            <th className="p-3 font-medium text-muted-foreground">ID</th>
            <th className="p-3 font-medium text-muted-foreground">Borrower</th>
            <th className="p-3 font-medium text-muted-foreground">App</th>
            <th className="p-3 font-medium text-muted-foreground">Type</th>
            <th className="p-3 font-medium text-muted-foreground">Status</th>
            <th className="p-3 font-medium text-muted-foreground">AI</th>
            <th className="p-3 font-medium text-muted-foreground">Actions</th>
          </tr></thead>
          <tbody>
            {documents.map(d => (
              <tr key={d.id} className="border-b hover:bg-muted/30">
                <td className="p-3 font-mono text-xs">{d.id}</td>
                <td className="p-3">{getBorrowerName(d.borrowerId)}</td>
                <td className="p-3 font-mono text-xs">{d.applicationId}</td>
                <td className="p-3">{d.type}</td>
                <td className="p-3"><StatusChip status={d.status} /></td>
                <td className="p-3"><StatusChip status={d.aiStatus || 'N/A'} /></td>
                <td className="p-3">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => toast.success('Approved (demo)')}>Approve</Button>
                    <Button variant="ghost" size="sm" onClick={() => toast.info('Rejected (demo)')}>Reject</Button>
                    <Button variant="ghost" size="sm" className="gap-1" onClick={() => toast.success('AI analysis triggered (demo)')}>
                      <Sparkles className="w-3 h-3" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}