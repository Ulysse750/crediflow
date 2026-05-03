import React from 'react';
import { useDemoAuth } from '@/lib/demoAuth';
import { getPartnerData } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Card, CardContent } from '@/components/ui/card';

export default function PartnerBorrowers() {
  const { user } = useDemoAuth();
  const { borrowers } = getPartnerData(user?.partnerId || '');

  return (
    <div className="space-y-6">
      <PageHeader title="Assigned Borrowers" description="Borrowers linked to your applications" />
      <div className="space-y-3">
        {borrowers.map(b => (
          <Card key={b.id}>
            <CardContent className="py-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                <div><p className="text-xs text-muted-foreground">ID</p><p className="font-medium">{b.id}</p></div>
                <div><p className="text-xs text-muted-foreground">Name</p><p className="font-medium">{b.name}</p></div>
                <div><p className="text-xs text-muted-foreground">Location</p><p className="font-medium">{b.province}</p></div>
                <div><p className="text-xs text-muted-foreground">Income</p><p className="font-medium">{b.incomeSource}</p></div>
                <div><p className="text-xs text-muted-foreground">Application</p><StatusChip status={b.applicationStatus} /></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}