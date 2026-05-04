import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { MessageSquare } from 'lucide-react';

const STATUSES = ['New', 'In progress', 'Waiting for borrower', 'Waiting for partner', 'Resolved'];

export default function AdminSupport() {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.SupportRequest.list('-created_date').then(r => { setRequests(r); setLoading(false); });
  }, []);

  const updateStatus = async (id, status) => {
    await base44.entities.SupportRequest.update(id, { status, ...(status === 'Resolved' ? { resolvedAt: new Date().toISOString() } : {}) });
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    if (selected?.id === id) setSelected(prev => ({ ...prev, status }));
    toast.success(`Status updated to ${status}`);
  };

  const addNote = async () => {
    if (!note.trim() || !selected) return;
    await base44.entities.SupportRequest.update(selected.id, { notes: note });
    setNote('');
    toast.success('Note saved');
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

  return (
    <div className="space-y-6">
      <PageHeader title="Support Requests" description="Manage borrower and partner support tickets" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-2">
          {requests.map(r => (
            <Card key={r.id} className={`cursor-pointer transition-all ${selected?.id === r.id ? 'border-secondary ring-1 ring-secondary/30' : ''}`} onClick={() => setSelected(r)}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <StatusChip status={r.priority === 'High' ? 'High' : r.priority === 'Medium' ? 'Medium' : 'Low'} />
                    </div>
                    <p className="font-medium text-sm mt-1">{r.borrowerEmail?.split('@')[0]}</p>
                    <p className="text-xs text-muted-foreground">{r.type}</p>
                    <p className="text-sm text-foreground mt-1 line-clamp-2">{r.message}</p>
                  </div>
                  <StatusChip status={r.status} />
                </div>
              </CardContent>
            </Card>
          ))}
          {requests.length === 0 && <Card className="p-8 text-center text-muted-foreground">No support requests yet.</Card>}
        </div>
        <div className="space-y-3">
          {selected ? (
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-secondary" /><span className="font-medium text-sm">{selected.type}</span></div>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Borrower:</span> {selected.borrowerEmail}</p>
                  <p><span className="text-muted-foreground">Priority:</span> {selected.priority}</p>
                  <p><span className="text-muted-foreground">Created:</span> {new Date(selected.created_date).toLocaleDateString()}</p>
                </div>
                <div className="p-2.5 bg-muted/50 rounded text-sm">{selected.message}</div>
                {selected.notes && <p className="text-xs text-muted-foreground italic">{selected.notes}</p>}
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Update status</p>
                  <Select onValueChange={(v) => updateStatus(selected.id, v)}>
                    <SelectTrigger><SelectValue placeholder="Change status" /></SelectTrigger>
                    <SelectContent>{STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <Textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Add note or response…" rows={3} />
                <Button size="sm" className="w-full bg-secondary hover:bg-secondary/90" onClick={addNote}>Add note</Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="p-8 text-center text-muted-foreground text-sm">Select a support request to manage it.</Card>
          )}
        </div>
      </div>
    </div>
  );
}