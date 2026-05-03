import React, { useState } from 'react';
import { useDemoAuth } from '@/lib/demoAuth';
import { getBorrowerData } from '@/lib/mockData';
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
  const { user } = useDemoAuth();
  const { borrower } = getBorrowerData(user.borrowerId);
  const [form, setForm] = useState({ ...borrower });

  const handleSave = () => {
    toast.success('Profile saved in demo mode');
  };

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="My Profile" description="Manage your personal information" />
      <Card>
        <CardContent className="pt-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={form.name || ''} onChange={(e) => update('name', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input value={form.phone || ''} onChange={(e) => update('phone', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={form.email || ''} onChange={(e) => update('email', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Province / City</Label>
              <Input value={`${form.province}, ${form.city}`} onChange={(e) => update('province', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Barangay</Label>
              <Input value={form.barangay || ''} onChange={(e) => update('barangay', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Preferred Language</Label>
              <Select value={form.language} onValueChange={(v) => update('language', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tagalog">Tagalog</SelectItem>
                  <SelectItem value="Cebuano">Cebuano</SelectItem>
                  <SelectItem value="Waray">Waray</SelectItem>
                  <SelectItem value="Bisaya">Bisaya</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Main Income Source</Label>
              <Input value={form.incomeSource || ''} onChange={(e) => update('incomeSource', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Monthly Income Range</Label>
              <Input value={form.monthlyIncome || ''} onChange={(e) => update('monthlyIncome', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Household Size</Label>
              <Input type="number" value={form.householdSize || ''} onChange={(e) => update('householdSize', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Mobile Wallet</Label>
              <Input value={form.mobileWallet || ''} onChange={(e) => update('mobileWallet', e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea value={form.notes || ''} onChange={(e) => update('notes', e.target.value)} placeholder="Any additional notes..." />
          </div>
          <Button onClick={handleSave} className="gap-2 bg-secondary hover:bg-secondary/90">
            <Save className="w-4 h-4" /> Save Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}