import React from 'react';
import { useDemoAuth } from '@/lib/demoAuth';
import { getPartnerData, getBorrowerName } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function PartnerDocuments() {
  const { user } = useDemoAuth();
  const { documents } = getPartnerData(user?.partnerId || '');

  return (
    <div className="space-y-6">
      <PageHeader title="Documents" description="Documents linked to your assigned applications" />
      <div className="space-y-3">
        {documents.map(d => (
          <Card key={d.id}>
            <CardContent className="py-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-1 text-sm">
                  <div><p className="text-xs text-muted-foreground">Borrower</p><p className="font-medium">{getBorrowerName(d.borrowerId)}</p></div>
                  <div><p className="text-xs text-muted-foreground">Type</p><p className="font-medium">{d.type}</p></div>
                  <div><p className="text-xs text-muted-foreground">Status</p><StatusChip status={d.status} /></div>
                  <div><p className="text-xs text-muted-foreground">AI Status</p>{d.aiStatus ? <StatusChip status={d.aiStatus} /> : <span className="text-xs text-muted-foreground">—</span>}</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => toast.success('Accepted (demo)')}>Accept</Button>
                  <Button variant="outline" size="sm" onClick={() => toast.info('Rejected (demo)')}>Reject</Button>
                  <Button variant="ghost" size="sm" onClick={() => toast.info('Replacement requested (demo)')}>Replace</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}