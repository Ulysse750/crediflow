import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AdminDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Document.list('-created_date').then(d => { setDocuments(d); setLoading(false); });
  }, []);

  const updateStatus = async (docId, status) => {
    await base44.entities.Document.update(docId, { status });
    setDocuments(prev => prev.map(d => d.id === docId ? { ...d, status } : d));
    toast.success(`Document ${status.toLowerCase()}`);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

  return (
    <div className="space-y-6">
      <PageHeader title="All Documents" description="Document verification workflow" />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left">
            <th className="p-3 font-medium text-muted-foreground">Borrower</th>
            <th className="p-3 font-medium text-muted-foreground">Type</th>
            <th className="p-3 font-medium text-muted-foreground">File</th>
            <th className="p-3 font-medium text-muted-foreground">Status</th>
            <th className="p-3 font-medium text-muted-foreground">AI</th>
            <th className="p-3 font-medium text-muted-foreground">Actions</th>
          </tr></thead>
          <tbody>
            {documents.map(d => (
              <tr key={d.id} className="border-b hover:bg-muted/30">
                <td className="p-3 text-xs">{d.borrowerEmail}</td>
                <td className="p-3">{d.type}</td>
                <td className="p-3 text-xs">{d.fileName ? <a href={d.fileUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">{d.fileName}</a> : '—'}</td>
                <td className="p-3"><StatusChip status={d.status} /></td>
                <td className="p-3">{d.aiStatus ? <StatusChip status={d.aiStatus} /> : <span className="text-muted-foreground">—</span>}</td>
                <td className="p-3">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => updateStatus(d.id, 'Approved')}>Approve</Button>
                    <Button variant="ghost" size="sm" onClick={() => updateStatus(d.id, 'Rejected')}>Reject</Button>
                    <Button variant="ghost" size="sm" onClick={() => updateStatus(d.id, 'Needs replacement')}>Replace</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {documents.length === 0 && <div className="p-8 text-center text-muted-foreground">No documents uploaded yet.</div>}
      </div>
    </div>
  );
}