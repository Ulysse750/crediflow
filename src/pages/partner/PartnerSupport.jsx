import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Send, MessageSquare } from 'lucide-react';

export default function PartnerSupport() {
  const [note, setNote] = useState('');

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Support & Notes" description="Add notes and view support requests" />
      <Card>
        <CardContent className="pt-6 space-y-3">
          <p className="text-sm font-medium">Add a Note</p>
          <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Type your note or request..." />
          <Button className="gap-2 bg-secondary hover:bg-secondary/90" onClick={() => { toast.success('Note added (demo)'); setNote(''); }}>
            <Send className="w-4 h-4" /> Submit
          </Button>
        </CardContent>
      </Card>
      <Card className="p-8 text-center">
        <MessageSquare className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">Support requests related to your applications will appear here.</p>
      </Card>
    </div>
  );
}