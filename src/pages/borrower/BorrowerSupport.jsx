import React, { useState } from 'react';
import { useDemoAuth } from '@/lib/demoAuth';
import { getBorrowerData } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Send, MessageSquare } from 'lucide-react';

const TYPES = ['Application help', 'Group issue', 'Document issue', 'Repayment issue', 'Data/privacy question', 'General question'];

export default function BorrowerSupport() {
  const { user } = useDemoAuth();
  const { support } = getBorrowerData(user?.borrowerId || '');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!type || !message) return toast.error('Please fill in all fields');
    toast.success('Support request submitted (demo)');
    setType('');
    setMessage('');
  };

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Support" description="Get help with your account" />

      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base font-display">New Request</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Request Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
              <SelectContent>{TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe your issue..." />
          </div>
          <Button onClick={handleSubmit} className="gap-2 bg-secondary hover:bg-secondary/90">
            <Send className="w-4 h-4" /> Submit Request
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Your Requests</h3>
        {support.length === 0 ? (
          <Card className="p-6 text-center">
            <MessageSquare className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No support requests yet.</p>
          </Card>
        ) : support.map(s => (
          <Card key={s.id}>
            <CardContent className="py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">{s.type}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">Created: {s.createdAt}</p>
                </div>
                <StatusChip status={s.status} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}