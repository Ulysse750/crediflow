import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/useAuth';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Card, CardContent } from '@/components/ui/card';

export default function PartnerGroups() {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    base44.entities.PartnerProfile.filter({ created_by: user.email }).then(async ([p]) => {
      if (!p) { setLoading(false); return; }
      const grps = await base44.entities.BorrowerGroup.filter({ partnerProfileId: p.id });
      setGroups(grps);
      setLoading(false);
    });
  }, [user]);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

  return (
    <div className="space-y-6">
      <PageHeader title="Assigned Groups" description="Groups assigned to your institution" />
      <div className="space-y-3">
        {groups.map(g => (
          <Card key={g.id}>
            <CardContent className="py-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                <div><p className="text-xs text-muted-foreground">Group</p><p className="font-medium">{g.name}</p></div>
                <div><p className="text-xs text-muted-foreground">Members</p><p className="font-medium">{(g.memberEmails || []).length}</p></div>
                <div><p className="text-xs text-muted-foreground">Location</p><p className="font-medium">{g.location || '—'}</p></div>
                <div><p className="text-xs text-muted-foreground">Status</p><StatusChip status={g.status} /></div>
                <div><p className="text-xs text-muted-foreground">Readiness</p><StatusChip status={g.readiness} /></div>
              </div>
            </CardContent>
          </Card>
        ))}
        {groups.length === 0 && <Card className="p-8 text-center text-muted-foreground">No groups assigned yet.</Card>}
      </div>
    </div>
  );
}