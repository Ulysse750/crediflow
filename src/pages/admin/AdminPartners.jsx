import React, { useState } from 'react';
import { getAdminData } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';

const PARTNER_TYPES = ['Rural bank', 'Commercial bank', 'Microfinance institution', 'Cooperative', 'Lending company', 'Financing company', 'NGO', 'Other'];

export default function AdminPartners() {
  const { partners } = getAdminData();
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader title="Partners" description="Manage lending partners">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-secondary hover:bg-secondary/90"><Plus className="w-4 h-4" /> Add Partner</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Partner</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1"><Label>Name</Label><Input placeholder="Institution name" /></div>
              <div className="space-y-1"><Label>Type</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>{PARTNER_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1"><Label>Contact</Label><Input placeholder="Contact person" /></div>
              <div className="space-y-1"><Label>Email</Label><Input placeholder="Email" /></div>
              <div className="space-y-1"><Label>Region</Label><Input placeholder="Region" /></div>
              <Button className="w-full bg-secondary hover:bg-secondary/90" onClick={() => { toast.success('Partner added (demo)'); setOpen(false); }}>Add Partner</Button>
            </div>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <div className="space-y-3">
        {partners.map(p => (
          <Card key={p.id}>
            <CardContent className="py-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                <div><p className="text-xs text-muted-foreground">Name</p><p className="font-medium">{p.name}</p></div>
                <div><p className="text-xs text-muted-foreground">Type</p><p className="font-medium">{p.type}</p></div>
                <div><p className="text-xs text-muted-foreground">Contact</p><p className="font-medium">{p.contact}</p></div>
                <div><p className="text-xs text-muted-foreground">Region</p><p className="font-medium">{p.region}</p></div>
                <div><p className="text-xs text-muted-foreground">Status</p><StatusChip status={p.status} /></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}