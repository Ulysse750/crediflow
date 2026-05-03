import React, { useState } from 'react';
import { useDemoAuth } from '@/lib/demoAuth';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

export default function BorrowerSettings() {
  const { user } = useDemoAuth();
  const [displayName, setDisplayName] = useState(user.name);
  const [notifEmail, setNotifEmail] = useState(user.email || 'maria@example.com');
  const [channel, setChannel] = useState('email');
  const [language, setLanguage] = useState('English');

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Settings" description="Manage your account preferences" />
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Display Name</Label>
              <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Notification Email</Label>
              <Input value={notifEmail} onChange={(e) => setNotifEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Notification Channel</Label>
              <Select value={channel} onValueChange={setChannel}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="push">Push notification</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Tagalog">Tagalog</SelectItem>
                  <SelectItem value="Cebuano">Cebuano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="pt-2 space-y-2">
            <Label>Password / Security</Label>
            <p className="text-xs text-muted-foreground">Password change functionality will be available in production.</p>
          </div>
          <Button className="gap-2 bg-secondary hover:bg-secondary/90" onClick={() => toast.success('Settings saved (demo)')}>
            <Save className="w-4 h-4" /> Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}