import React, { useState } from 'react';
import { useDemoAuth } from '@/lib/demoAuth';
import { getBorrowerData, getBorrowerName } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Users, Copy, UserPlus, Plus } from 'lucide-react';

export default function BorrowerGroup() {
  const { user } = useDemoAuth();
  const { group } = getBorrowerData(user.borrowerId);
  const [joinCode, setJoinCode] = useState('');

  if (!group) {
    return (
      <div className="max-w-3xl space-y-6">
        <PageHeader title="My Group" description="Join or create a borrower group" />
        <Card className="p-8 text-center">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg">No group yet</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-6">Join an existing group or create a new one.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <div className="flex gap-2">
              <Input placeholder="Enter group code" value={joinCode} onChange={(e) => setJoinCode(e.target.value)} className="w-48" />
              <Button variant="outline" onClick={() => toast.success('Group join request sent (demo)')}>Join</Button>
            </div>
            <Button className="gap-2 bg-secondary hover:bg-secondary/90" onClick={() => toast.success('Group creation flow (demo)')}>
              <Plus className="w-4 h-4" /> Create Group
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="My Group" description="Your group membership details" />

      <div className="p-3 rounded-lg bg-muted/50 border border-border/50 text-xs text-muted-foreground">
        Group members cannot see one another's private loan or repayment details.
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display flex items-center gap-2">
            <Users className="w-5 h-5 text-secondary" /> {group.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div><p className="text-xs text-muted-foreground">Group ID</p><p className="font-medium">{group.id}</p></div>
            <div><p className="text-xs text-muted-foreground">Leader</p><p className="font-medium">{group.leader}</p></div>
            <div><p className="text-xs text-muted-foreground">Members</p><p className="font-medium">{group.memberIds.length}</p></div>
            <div><p className="text-xs text-muted-foreground">Location</p><p className="font-medium">{group.location}</p></div>
            <div><p className="text-xs text-muted-foreground">Purpose</p><p className="font-medium">{group.purpose}</p></div>
            <div><p className="text-xs text-muted-foreground">Status</p><StatusChip status={group.status} /></div>
            <div><p className="text-xs text-muted-foreground">Readiness</p><StatusChip status={group.readiness} /></div>
          </div>

          {/* Group code */}
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="text-xs text-muted-foreground">Group Code</p>
              <p className="font-mono font-bold text-lg">{group.code}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => { navigator.clipboard.writeText(group.code); toast.success('Code copied!'); }}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>

          {/* Members list (privacy-safe) */}
          <div>
            <p className="text-sm font-medium mb-2">Members</p>
            <div className="space-y-2">
              {group.memberIds.map(id => (
                <div key={id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary text-xs font-bold">
                    {getBorrowerName(id).charAt(0)}
                  </div>
                  <span className="text-sm font-medium">{getBorrowerName(id)}</span>
                  {id === user.borrowerId && <span className="text-xs text-muted-foreground">(You)</span>}
                </div>
              ))}
            </div>
          </div>

          <Button variant="outline" className="gap-2" onClick={() => toast.info('Invite member placeholder (demo)')}>
            <UserPlus className="w-4 h-4" /> Invite Member
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}