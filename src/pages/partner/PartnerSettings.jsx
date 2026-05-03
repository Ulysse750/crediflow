import React, { useState } from 'react';
import { useDemoAuth } from '@/lib/demoAuth';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

export default function PartnerSettings() {
  const { user } = useDemoAuth();
  const [institution, setInstitution] = useState(user.institution || 'Bayan Rural Bank');
  const [contact, setContact] = useState('Juan Dela Cruz');
  const [email, setEmail] = useState('juan@bayanrb.com');
  const [region, setRegion] = useState('Visayas');

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Settings" description="Manage your institution settings" />
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Institution Name</Label><Input value={institution} onChange={(e) => setInstitution(e.target.value)} /></div>
            <div className="space-y-2"><Label>Contact Person</Label><Input value={contact} onChange={(e) => setContact(e.target.value)} /></div>
            <div className="space-y-2"><Label>Contact Email</Label><Input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div className="space-y-2"><Label>Region</Label><Input value={region} onChange={(e) => setRegion(e.target.value)} /></div>
          </div>
          <Button className="gap-2 bg-secondary hover:bg-secondary/90" onClick={() => toast.success('Settings saved (demo)')}>
            <Save className="w-4 h-4" /> Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}