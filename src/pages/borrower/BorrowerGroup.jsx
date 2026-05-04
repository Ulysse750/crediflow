import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/useAuth';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Users, Copy, UserPlus, Plus } from 'lucide-react';

export default function BorrowerGroup() {
  const { user } = useAuth();
  const [group, setGroup] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joinCode, setJoinCode] = useState('');
  const [createName, setCreateName] = useState('');
  const [createLocation, setCreateLocation] = useState('');
  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    if (!user) return;
    base44.entities.BorrowerGroup.list().then(groups => {
      const myGroup = groups.find(g => (g.memberEmails || []).includes(user.email));
      if (myGroup) { setGroup(myGroup); setGroupId(myGroup.id); }
      setLoading(false);
    });
  }, [user]);

  const handleJoin = async () => {
    if (!joinCode.trim()) return;
    setJoining(true);
    const groups = await base44.entities.BorrowerGroup.filter({ code: joinCode.trim().toUpperCase() });
    if (groups[0]) {
      const g = groups[0];
      const members = [...new Set([...(g.memberEmails || []), user.email])];
      await base44.entities.BorrowerGroup.update(g.id, { memberEmails: members });
      setGroup({ ...g, memberEmails: members });
      setGroupId(g.id);
      toast.success(`Joined group: ${g.name}`);
    } else {
      toast.error('Group not found. Check the group code.');
    }
    setJoining(false);
  };

  const handleCreate = async () => {
    if (!createName.trim()) return toast.error('Please enter a group name');
    setCreating(true);
    const code = createName.trim().toUpperCase().replace(/\s+/g, '-').slice(0, 8) + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
    const created = await base44.entities.BorrowerGroup.create({
      name: createName.trim(),
      leaderEmail: user.email,
      memberEmails: [user.email],
      location: createLocation.trim(),
      status: 'Forming',
      code,
      readiness: 'Pending',
    });
    setGroup(created); setGroupId(created.id);
    toast.success('Group created');
    setCreating(false);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

  if (!group) {
    return (
      <div className="max-w-3xl space-y-6">
        <PageHeader title="My Group" description="Join or create a borrower group" />
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div>
              <p className="text-sm font-semibold mb-3">Join an existing group</p>
              <div className="flex gap-2">
                <Input placeholder="Enter group code" value={joinCode} onChange={(e) => setJoinCode(e.target.value)} className="w-48" />
                <Button variant="outline" onClick={handleJoin} disabled={joining}>{joining ? 'Joining…' : 'Join'}</Button>
              </div>
            </div>
            <div className="border-t pt-6">
              <p className="text-sm font-semibold mb-3">Create a new group</p>
              <div className="space-y-3">
                <Input placeholder="Group name" value={createName} onChange={(e) => setCreateName(e.target.value)} />
                <Input placeholder="Location (city/barangay)" value={createLocation} onChange={(e) => setCreateLocation(e.target.value)} />
                <Button className="gap-2 bg-secondary hover:bg-secondary/90" onClick={handleCreate} disabled={creating}>
                  <Plus className="w-4 h-4" /> {creating ? 'Creating…' : 'Create Group'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="My Group" description="Your group membership details" />
      <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 border border-border/50 text-xs text-muted-foreground">
        <span className="shrink-0">🔒</span>
        <p>Group members can see each other's first names and member count only. Individual loan amounts, repayment records, and income details are private and are not shared with other group members.</p>
      </div>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display flex items-center gap-2"><Users className="w-5 h-5 text-secondary" /> {group.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div><p className="text-xs text-muted-foreground">Location</p><p className="font-medium">{group.location || '—'}</p></div>
            <div><p className="text-xs text-muted-foreground">Members</p><p className="font-medium">{(group.memberEmails || []).length}</p></div>
            <div><p className="text-xs text-muted-foreground">Status</p><StatusChip status={group.status} /></div>
            <div><p className="text-xs text-muted-foreground">Purpose</p><p className="font-medium">{group.purpose || '—'}</p></div>
            <div><p className="text-xs text-muted-foreground">Readiness</p><StatusChip status={group.readiness} /></div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="text-xs text-muted-foreground">Group Code</p>
              <p className="font-mono font-bold text-lg">{group.code}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => { navigator.clipboard.writeText(group.code); toast.success('Code copied!'); }}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Members ({(group.memberEmails || []).length})</p>
            <div className="space-y-2">
              {(group.memberEmails || []).map(email => (
                <div key={email} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary text-xs font-bold">
                    {email.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">{email === user.email ? 'You' : email.split('@')[0]}</span>
                  {email === group.leaderEmail && <span className="text-xs text-muted-foreground">(Leader)</span>}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}