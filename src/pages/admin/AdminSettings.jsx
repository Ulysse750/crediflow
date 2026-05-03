import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

export default function AdminSettings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="Admin Settings" description="Platform configuration for CrediFlow MVP." />

      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base font-display">Platform information</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1"><Label>Platform name</Label><Input defaultValue="CrediFlow" /></div>
          <div className="space-y-1"><Label>Tagline</Label><Input defaultValue="Responsible credit, made simple." /></div>
          <div className="space-y-1"><Label>Support email</Label><Input defaultValue="support@crediflow.ph" /></div>
          <Button size="sm" className="bg-secondary hover:bg-secondary/90" onClick={() => toast.success('Settings saved (demo)')}>Save</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base font-display">Feature flags</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            ['Allow borrower self-registration', true],
            ['Allow apply without group', false],
            ['AI document analysis enabled', true],
            ['Partner portal enabled', true],
            ['Show compliance disclaimers', true],
          ].map(([label, defaultVal]) => (
            <div key={label} className="flex items-center justify-between py-1">
              <span className="text-sm">{label}</span>
              <Switch defaultChecked={defaultVal} onCheckedChange={() => toast.info(`${label} toggled (demo)`)} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base font-display">Demo accounts</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          {[
            ['Borrower', 'borrower@crediflow.demo', 'borrower123'],
            ['Partner', 'partner@crediflow.demo', 'partner123'],
            ['Admin', 'admin@crediflow.demo', 'admin123'],
          ].map(([role, email, pass]) => (
            <div key={role} className="flex items-center justify-between p-2.5 bg-muted/40 rounded-lg">
              <div>
                <span className="font-medium">{role}</span>
                <span className="text-muted-foreground ml-2 text-xs">{email} / {pass}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}