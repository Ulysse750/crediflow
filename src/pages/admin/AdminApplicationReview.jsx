import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { APPLICATIONS, DOCUMENTS, AI_ANALYSES, RISK_FLAGS, PARTNERS, getBorrowerName, getGroupName, getPartnerName } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Sparkles, AlertTriangle, FileText, Building2, Send } from 'lucide-react';

export default function AdminApplicationReview() {
  const { id } = useParams();
  const app = APPLICATIONS.find(a => a.id === id);
  const [partnerAssign, setPartnerAssign] = useState(app?.partnerId || '');
  const [flagNote, setFlagNote] = useState('');

  if (!app) return <Navigate to="/admin/applications" replace />;

  const docs = DOCUMENTS.filter(d => d.applicationId === app.id);
  const ai = AI_ANALYSES.find(a => a.applicationId === app.id);
  const flags = RISK_FLAGS.filter(r => r.applicationId === app.id);

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader title={`Review ${app.id}`} description={`Borrower: ${getBorrowerName(app.borrowerId)}`} />

      {/* Application Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div><p className="text-xs text-muted-foreground">Amount</p><p className="font-medium">₱{app.amount?.toLocaleString()}</p></div>
            <div><p className="text-xs text-muted-foreground">Purpose</p><p className="font-medium">{app.purpose}</p></div>
            <div><p className="text-xs text-muted-foreground">Group</p><p className="font-medium">{getGroupName(app.groupId)}</p></div>
            <div><p className="text-xs text-muted-foreground">Status</p><StatusChip status={app.status} /></div>
            <div><p className="text-xs text-muted-foreground">Decision</p><StatusChip status={app.partnerDecision} /></div>
            <div><p className="text-xs text-muted-foreground">Risk</p><StatusChip status={app.riskLevel} /></div>
            <div><p className="text-xs text-muted-foreground">Income</p><p className="font-medium">{app.incomeSource}</p></div>
            <div><p className="text-xs text-muted-foreground">Existing Debt</p><p className="font-medium">{app.existingDebt}</p></div>
            <div><p className="text-xs text-muted-foreground">Repayment Source</p><p className="font-medium">{app.repaymentSource}</p></div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Actions */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base font-display">Admin Actions</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => toast.info('Marked needs more information (demo)')}>Needs More Info</Button>
            <Button variant="outline" onClick={() => toast.info('Under CrediFlow review (demo)')}>Under Review</Button>
            <Button className="bg-secondary hover:bg-secondary/90" onClick={() => toast.success('Ready for partner (demo)')}>Ready for Partner</Button>
            <Button variant="outline" onClick={() => toast.info('Documents marked complete (demo)')}>Docs Complete</Button>
          </div>

          <div className="flex items-center gap-3">
            <Select value={partnerAssign} onValueChange={setPartnerAssign}>
              <SelectTrigger className="w-56"><SelectValue placeholder="Assign partner" /></SelectTrigger>
              <SelectContent>
                {PARTNERS.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-1" onClick={() => toast.success(`Assigned to ${getPartnerName(partnerAssign)} (demo)`)}>
              <Building2 className="w-4 h-4" /> Assign
            </Button>
          </div>

          <div className="space-y-2">
            <Textarea value={flagNote} onChange={(e) => setFlagNote(e.target.value)} placeholder="Add risk flag note..." />
            <Button variant="outline" size="sm" className="gap-1" onClick={() => { toast.success('Risk flag added (demo)'); setFlagNote(''); }}>
              <AlertTriangle className="w-3 h-3" /> Add Risk Flag
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base font-display flex items-center gap-2"><FileText className="w-4 h-4" /> Documents ({docs.length})</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {docs.map(d => (
            <div key={d.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 text-sm">
              <div><p className="font-medium">{d.type}</p></div>
              <div className="flex items-center gap-2">
                <StatusChip status={d.status} />
                {d.aiStatus && <StatusChip status={d.aiStatus} />}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Analysis */}
      {ai ? (
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base font-display flex items-center gap-2"><Sparkles className="w-4 h-4 text-secondary" /> AI Analysis</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="font-medium">Status: <StatusChip status={ai.status} /></p>
            <p>{ai.partnerSummary || ai.profileSummary}</p>
            {ai.humanReviewRequired && <span className="inline-flex items-center gap-1 text-xs text-amber-700 font-medium bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5">⚠ Human review required</span>}
            <ComplianceDisclaimer variant="ai" />
          </CardContent>
        </Card>
      ) : (
        <Card className="p-6">
          <Button className="gap-2" onClick={() => toast.success('AI document analysis triggered (demo)')}>
            <Sparkles className="w-4 h-4" /> Run AI Document Review
          </Button>
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
                <div className="flex items-center gap-2">
                  <StatusChip status={f.severity} />
                  <StatusChip status={f.status} />
                  {f.status === 'Open' && <Button variant="ghost" size="sm" onClick={() => toast.success('Flag resolved (demo)')}>Resolve</Button>}
                </div>
              </div>
            ))}
            <ComplianceDisclaimer variant="risk" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}