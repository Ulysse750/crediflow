import React from 'react';
import { useDemoAuth } from '@/lib/demoAuth';
import { getPartnerData } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Card, CardContent } from '@/components/ui/card';

export default function PartnerGroups() {
  const { user } = useDemoAuth();
  const { groups } = getPartnerData(user.partnerId);

  return (
    <div className="space-y-6">
      <PageHeader title="Assigned Groups" description="Groups assigned to your institution" />
      <div className="space-y-3">
        {groups.map(g => (
          <Card key={g.id}>
            <CardContent className="py-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                <div><p className="text-xs text-muted-foreground">Group</p><p className="font-medium">{g.name}</p></div>
                <div><p className="text-xs text-muted-foreground">Members</p><p className="font-medium">{g.memberIds.length}</p></div>
                <div><p className="text-xs text-muted-foreground">Location</p><p className="font-medium">{g.location}</p></div>
                <div><p className="text-xs text-muted-foreground">Status</p><StatusChip status={g.status} /></div>
                <div><p className="text-xs text-muted-foreground">Readiness</p><StatusChip status={g.readiness} /></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}