import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useDemoAuth } from '@/lib/demoAuth';
import { getPartnerData, getBorrowerName, getGroupName, AI_ANALYSES, DOCUMENTS, RISK_FLAGS } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { CheckCircle, XCircle, MessageSquare, AlertTriangle, FileText, Send } from 'lucide-react';

export default function PartnerApplicationDetail() {
  const { id } = useParams();
  const { user } = useDemoAuth();
  const data = getPartnerData(user.partnerId);
  const app = data.applications.find(a => a.id === id);
  const [note, setNote] = useState('');

  if (!app) return <Navigate to="/partner/applications" replace />;

  const docs = DOCUMENTS.filter(d => d.applicationId === app.id);
  const ai = AI_ANALYSES.find(a => a.applicationId === app.id);
  const flags = RISK_FLAGS.filter(r => r.applicationId === app.id);

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader title={`Application ${app.id}`} description={`Borrower: ${getBorrowerName(app.borrowerId)}`} />
      <ComplianceDisclaimer variant="partner" />

      {/* Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div><p className="text-xs text-muted-foreground">Amount</p><p className="font-medium">₱{app.amount?.toLocaleString()}</p></div>
            <div><p className="text-xs text-muted-foreground">Purpose</p><p className="font-medium">{app.purpose}</p></div>
            <div><p className="text-xs text-muted-foreground">Repayment</p><p className="font-medium">{app.repaymentPeriod} / {app.repaymentFrequency}</p></div>
            <div><p className="text-xs text-muted-foreground">Income Source</p><p className="font-medium">{app.incomeSource}</p></div>
            <div><p className="text-xs text-muted-foreground">Existing Debt</p><p className="font-medium">{app.existingDebt}</p></div>
            <div><p className="text-xs text-muted-foreground">Group</p><p className="font-medium">{getGroupName(app.groupId)}</p></div>
            <div><p className="text-xs text-muted-foreground">Status</p><StatusChip status={app.status} /></div>
            <div><p className="text-xs text-muted-foreground">Decision</p><StatusChip status={app.partnerDecision} /></div>
            <div><p className="text-xs text-muted-foreground">Risk Level</p><StatusChip status={app.riskLevel} /></div>
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base font-display flex items-center gap-2"><FileText className="w-4 h-4" /> Documents</CardTitle></CardHeader>
        <CardContent>
          {docs.length === 0 ? <p className="text-sm text-muted-foreground">No documents</p> : (
            <div className="space-y-2">
              {docs.map(d => (
                <div key={d.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 text-sm">
                  <div><p className="font-medium">{d.type}</p><p className="text-xs text-muted-foreground">{d.fileName || 'No file'}</p></div>
                  <div className="flex items-center gap-2">
                    <StatusChip status={d.status} />
                    <Button variant="ghost" size="sm" onClick={() => toast.success(`Document ${d.status === 'Approved' ? 'already approved' : 'accepted'} (demo)`)}>Accept</Button>
                    <Button variant="ghost" size="sm" onClick={() => toast.info('Replacement requested (demo)')}>Replace</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Summary */}
      {ai && (
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base font-display">AI Document Summary</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p><span className="font-medium">Documents Reviewed:</span> {ai.documentsReviewed.join(', ')}</p>
            {ai.missingDocuments.length > 0 && <p className="text-amber-600"><span className="font-medium">Missing:</span> {ai.missingDocuments.join(', ')}</p>}
            <p>{ai.reviewerSummary}</p>
            {ai.humanReviewRequired && <StatusChip status="Human review required" />}
            <ComplianceDisclaimer variant="ai" />
          </CardContent>
        </Card>
      )}

      {/* Risk Flags */}
      {flags.length > 0 && (
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base font-display flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500" /> Risk Flags</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {flags.map(f => (
              <div key={f.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 text-sm">
                <div><p className="font-medium">{f.flagType}</p><p className="text-xs text-muted-foreground">{f.explanation}</p></div>
                <StatusChip status={f.severity} />
              </div>
            ))}
            <ComplianceDisclaimer variant="risk" />
          </CardContent>
        </Card>
      )}

      {/* Partner Actions */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base font-display">Partner Actions</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-1" onClick={() => toast.info('More information requested (demo)')}>
              <MessageSquare className="w-4 h-4" /> Request More Info
            </Button>
            <Button className="gap-1 bg-emerald-600 hover:bg-emerald-700" onClick={() => toast.success('Application approved (demo)')}>
              <CheckCircle className="w-4 h-4" /> Approve
            </Button>
            <Button variant="destructive" className="gap-1" onClick={() => toast.info('Application rejected (demo)')}>
              <XCircle className="w-4 h-4" /> Reject
            </Button>
            <Button variant="outline" className="gap-1" onClick={() => toast.success('Marked as disbursed (demo)')}>
              Mark Disbursed
            </Button>
          </div>
          <div className="space-y-2">
            <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a partner note..." />
            <Button variant="outline" size="sm" className="gap-1" onClick={() => { toast.success('Note added (demo)'); setNote(''); }}>
              <Send className="w-3 h-3" /> Add Note
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}