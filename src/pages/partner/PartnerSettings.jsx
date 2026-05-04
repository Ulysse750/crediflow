import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/useAuth';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

const PARTNER_TYPES = ['Rural bank', 'Commercial bank', 'Microfinance institution', 'Cooperative', 'Lending company', 'Financing company', 'NGO', 'Other'];

export default function PartnerSettings() {
  const { user } = useAuth();
  const [form, setForm] = useState({ institutionName: '', institutionType: '', contactPerson: '', contactEmail: '', region: '' });
  const [profileId, setProfileId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    base44.entities.PartnerProfile.filter({ created_by: user.email }).then(([p]) => {
      if (p) { setForm(p); setProfileId(p.id); }
      else { setForm(prev => ({ ...prev, contactPerson: user.full_name || '', contactEmail: user.email || '' })); }
      setLoading(false);
    });
  }, [user]);

  const update = (f, v) => setForm(prev => ({ ...prev, [f]: v }));

  const handleSave = async () => {
    setSaving(true);
    if (profileId) {
      await base44.entities.PartnerProfile.update(profileId, form);
    } else {
      const created = await base44.entities.PartnerProfile.create(form);
      setProfileId(created.id);
    }
    setSaving(false);
    toast.success('Settings saved');
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Settings" description="Manage your institution settings" />
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Institution Name</Label><Input value={form.institutionName || ''} onChange={(e) => update('institutionName', e.target.value)} /></div>
            <div className="space-y-2"><Label>Institution Type</Label>
              <Select value={form.institutionType || ''} onValueChange={(v) => update('institutionType', v)}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>{PARTNER_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Contact Person</Label><Input value={form.contactPerson || ''} onChange={(e) => update('contactPerson', e.target.value)} /></div>
            <div className="space-y-2"><Label>Contact Email</Label><Input value={form.contactEmail || ''} onChange={(e) => update('contactEmail', e.target.value)} /></div>
            <div className="space-y-2"><Label>Region</Label><Input value={form.region || ''} onChange={(e) => update('region', e.target.value)} /></div>
          </div>
          <Button className="gap-2 bg-secondary hover:bg-secondary/90" onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save Settings'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}