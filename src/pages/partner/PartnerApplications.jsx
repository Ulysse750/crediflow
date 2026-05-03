import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDemoAuth } from '@/lib/demoAuth';
import { getPartnerData, getBorrowerName, getGroupName } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye } from 'lucide-react';

export default function PartnerApplications() {
  const { user } = useDemoAuth();
  const data = getPartnerData(user?.partnerId || '');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = statusFilter === 'all'
    ? data.applications
    : data.applications.filter(a => a.status === statusFilter || a.partnerDecision === statusFilter);

  return (
    <div className="space-y-6">
      <PageHeader title="Assigned Applications" description="Review applications assigned to your institution">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48"><SelectValue placeholder="Filter" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Ready for partner">Ready for review</SelectItem>
            <SelectItem value="Sent to partner">Sent to partner</SelectItem>
            <SelectItem value="Needs more information">Needs info</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </PageHeader>
      <ComplianceDisclaimer variant="partner" />

      <div className="space-y-3">
        {filtered.map(app => (
          <Card key={app.id}>
            <CardContent className="py-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 flex-1 text-sm">
                  <div><p className="text-xs text-muted-foreground">ID</p><p className="font-medium">{app.id}</p></div>
                  <div><p className="text-xs text-muted-foreground">Borrower</p><p className="font-medium">{getBorrowerName(app.borrowerId)}</p></div>
                  <div><p className="text-xs text-muted-foreground">Amount</p><p className="font-medium">₱{app.amount?.toLocaleString()}</p></div>
                  <div><p className="text-xs text-muted-foreground">Status</p><StatusChip status={app.status} /></div>
                  <div><p className="text-xs text-muted-foreground">Decision</p><StatusChip status={app.partnerDecision} /></div>
                </div>
                <Link to={`/partner/applications/${app.id}`}>
                  <Button variant="outline" size="sm" className="gap-1"><Eye className="w-3 h-3" /> View</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card className="p-8 text-center text-muted-foreground">No applications found.</Card>
        )}
      </div>
    </div>
  );
}