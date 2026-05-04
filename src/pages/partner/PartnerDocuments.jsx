import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/useAuth';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function PartnerDocuments() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    base44.entities.PartnerProfile.filter({ created_by: user.email }).then(async ([p]) => {
      if (!p) { setLoading(false); return; }
      const apps = await base44.entities.LoanApplication.filter({ partnerProfileId: p.id });
      const appIds = apps.map(a => a.id);
      const docs = await base44.entities.Document.list();
      setDocuments(docs.filter(d => appIds.includes(d.applicationId)));
      setLoading(false);
    });
  }, [user]);

  const updateDocStatus = async (docId, status) => {
    await base44.entities.Document.update(docId, { status });
    setDocuments(prev => prev.map(d => d.id === docId ? { ...d, status } : d));
    toast.success(`Document ${status.toLowerCase()}`);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

  return (
    <div className="space-y-6">
      <PageHeader title="Documents" description="Documents linked to your assigned applications" />
      <div className="space-y-3">
        {documents.map(d => (
          <Card key={d.id}>
            <CardContent className="py-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-1 text-sm">
                  <div><p className="text-xs text-muted-foreground">Borrower</p><p className="font-medium">{d.borrowerEmail?.split('@')[0]}</p></div>
                  <div><p className="text-xs text-muted-foreground">Type</p><p className="font-medium">{d.type}</p></div>
                  <div><p className="text-xs text-muted-foreground">Status</p><StatusChip status={d.status} /></div>
                  <div><p className="text-xs text-muted-foreground">AI Status</p>{d.aiStatus ? <StatusChip status={d.aiStatus} /> : <span className="text-xs text-muted-foreground">—</span>}</div>
                </div>
                <div className="flex gap-2">
                  {d.fileUrl && <a href={d.fileUrl} target="_blank" rel="noopener noreferrer"><Button variant="ghost" size="sm">View</Button></a>}
                  <Button variant="outline" size="sm" onClick={() => updateDocStatus(d.id, 'Approved')}>Accept</Button>
                  <Button variant="outline" size="sm" onClick={() => updateDocStatus(d.id, 'Rejected')}>Reject</Button>
                  <Button variant="ghost" size="sm" onClick={() => updateDocStatus(d.id, 'Needs replacement')}>Replace</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {documents.length === 0 && <Card className="p-8 text-center text-muted-foreground">No documents yet.</Card>}
      </div>
    </div>
  );
}