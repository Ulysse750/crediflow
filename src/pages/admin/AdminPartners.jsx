import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
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
  const [partners, setPartners] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ institutionName: '', institutionType: '', contactPerson: '', contactEmail: '', region: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.PartnerProfile.list().then(p => { setPartners(p); setLoading(false); });
  }, []);

  const handleAdd = async () => {
    if (!form.institutionName) return toast.error('Institution name is required');
    const created = await base44.entities.PartnerProfile.create({ ...form, status: 'Active' });
    setPartners(prev => [...prev, created]);
    setForm({ institutionName: '', institutionType: '', contactPerson: '', contactEmail: '', region: '' });
    setOpen(false);
    toast.success('Partner added');
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

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
              <div className="space-y-1"><Label>Name *</Label><Input placeholder="Institution name" value={form.institutionName} onChange={e => setForm(p => ({ ...p, institutionName: e.target.value }))} /></div>
              <div className="space-y-1"><Label>Type</Label>
                <Select onValueChange={v => setForm(p => ({ ...p, institutionType: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>{PARTNER_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1"><Label>Contact Person</Label><Input placeholder="Contact person" value={form.contactPerson} onChange={e => setForm(p => ({ ...p, contactPerson: e.target.value }))} /></div>
              <div className="space-y-1"><Label>Contact Email</Label><Input placeholder="Email" value={form.contactEmail} onChange={e => setForm(p => ({ ...p, contactEmail: e.target.value }))} /></div>
              <div className="space-y-1"><Label>Region</Label><Input placeholder="Region" value={form.region} onChange={e => setForm(p => ({ ...p, region: e.target.value }))} /></div>
              <Button className="w-full bg-secondary hover:bg-secondary/90" onClick={handleAdd}>Add Partner</Button>
            </div>
          </DialogContent>
        </Dialog>
      </PageHeader>
      <div className="space-y-3">
        {partners.map(p => (
          <Card key={p.id}>
            <CardContent className="py-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                <div><p className="text-xs text-muted-foreground">Name</p><p className="font-medium">{p.institutionName}</p></div>
                <div><p className="text-xs text-muted-foreground">Type</p><p className="font-medium">{p.institutionType || '—'}</p></div>
                <div><p className="text-xs text-muted-foreground">Contact</p><p className="font-medium">{p.contactPerson || '—'}</p></div>
                <div><p className="text-xs text-muted-foreground">Region</p><p className="font-medium">{p.region || '—'}</p></div>
                <div><p className="text-xs text-muted-foreground">Status</p><StatusChip status={p.status} /></div>
              </div>
            </CardContent>
          </Card>
        ))}
        {partners.length === 0 && <div className="p-8 text-center text-muted-foreground">No partners added yet.</div>}
      </div>
    </div>
  );
}