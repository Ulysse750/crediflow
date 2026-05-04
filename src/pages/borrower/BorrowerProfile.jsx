import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/useAuth';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

export default function BorrowerProfile() {
  const { user } = useAuth();
  const [form, setForm] = useState({});
  const [profileId, setProfileId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    base44.entities.BorrowerProfile.filter({ created_by: user.email }).then(profiles => {
      if (profiles[0]) {
        setProfileId(profiles[0].id);
        setForm(profiles[0]);
      }
      setLoading(false);
    });
  }, [user]);

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    setSaving(true);
    const data = { ...form, borrowerEmail: user.email };
    if (profileId) {
      await base44.entities.BorrowerProfile.update(profileId, data);
    } else {
      const created = await base44.entities.BorrowerProfile.create(data);
      setProfileId(created.id);
    }
    setSaving(false);
    toast.success('Profile saved');
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="My Profile" description="Manage your personal information" />
      <Card>
        <CardContent className="pt-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={form.full_name || user?.full_name || ''} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input value={form.phone || ''} onChange={(e) => update('phone', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user?.email || ''} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Input type="date" value={form.dateOfBirth || ''} onChange={(e) => update('dateOfBirth', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={form.gender || ''} onValueChange={(v) => update('gender', v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Non-binary">Non-binary</SelectItem>
                  <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Civil Status</Label>
              <Select value={form.civilStatus || ''} onValueChange={(v) => update('civilStatus', v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {['Single', 'Married', 'Widowed', 'Separated', 'Cohabiting'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Province</Label>
              <Input value={form.province || ''} onChange={(e) => update('province', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>City / Municipality</Label>
              <Input value={form.city || ''} onChange={(e) => update('city', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Barangay</Label>
              <Input value={form.barangay || ''} onChange={(e) => update('barangay', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Preferred Language</Label>
              <Select value={form.language || ''} onValueChange={(v) => update('language', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['Tagalog', 'Cebuano', 'Waray', 'Bisaya', 'English'].map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Main Income Source</Label>
              <Input value={form.incomeSource || ''} onChange={(e) => update('incomeSource', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Monthly Income Range</Label>
              <Select value={form.monthlyIncome || ''} onValueChange={(v) => update('monthlyIncome', v)}>
                <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                <SelectContent>
                  {['Below ₱5,000', '₱5,000–₱10,000', '₱10,001–₱20,000', '₱20,001–₱40,000', 'Above ₱40,000', 'Prefer not to say'].map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Household Size</Label>
              <Input type="number" value={form.householdSize || ''} onChange={(e) => update('householdSize', Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Mobile Wallet</Label>
              <Select value={form.mobileWallet || ''} onValueChange={(v) => update('mobileWallet', v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {['GCash', 'Maya', 'Other', 'None'].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea value={form.notes || ''} onChange={(e) => update('notes', e.target.value)} placeholder="Any additional notes..." />
          </div>
          <Button onClick={handleSave} disabled={saving} className="gap-2 bg-secondary hover:bg-secondary/90">
            <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save Profile'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}