import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/lib/useAuth';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { CheckCircle, XCircle, MessageSquare, AlertTriangle, FileText, Send, Info, User, Users, ClipboardList, Bot } from 'lucide-react';

function DataRow({ label, value }) {
  return <div><p className="text-xs text-muted-foreground">{label}</p><p className="font-medium text-sm mt-0.5">{value || '—'}</p></div>;
}

export default function PartnerApplicationDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [partner, setPartner] = useState(null);
  const [app, setApp] = useState(null);
  const [profile, setProfile] = useState(null);
  const [group, setGroup] = useState(null);
  const [docs, setDocs] = useState([]);
  const [ai, setAi] = useState(null);
  const [flags, setFlags] = useState([]);
  const [questionnaire, setQuestionnaire] = useState(null);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [notAuthorized, setNotAuthorized] = useState(false);

  useEffect(() => {
    if (!user) return;
    base44.entities.PartnerProfile.filter({ created_by: user.email }).then(async ([p]) => {
      setPartner(p || null);
      const application = await base44.entities.LoanApplication.filter({ id }).then(apps => apps.find(a => a.id === id));
      if (!application || application.partnerProfileId !== p?.id) { setNotAuthorized(true); setLoading(false); return; }
      setApp(application);
      const [profiles, groups, documents, analyses, riskFlags, q] = await Promise.all([
        base44.entities.BorrowerProfile.filter({ created_by: application.borrowerEmail }),
        base44.entities.BorrowerGroup.filter({ id: application.groupId }),
        base44.entities.Document.filter({ applicationId: application.id }),
        base44.entities.AIAnalysis.filter({ applicationId: application.id }),
        base44.entities.RiskFlag.filter({ applicationId: application.id }),
        base44.entities.QuestionnaireAnswer.filter({ borrowerEmail: application.borrowerEmail }),
      ]);
      setProfile(profiles[0] || null);
      setGroup(groups[0] || null);
      setDocs(documents);
      setAi(analyses[0] || null);
      setFlags(riskFlags.filter(f => f.status === 'Open'));
      setQuestionnaire(q[0] || null);
      setLoading(false);
    });
  }, [user, id]);

  const handleDecision = async (decision) => {
    await base44.entities.LoanApplication.update(app.id, { partnerDecision: decision });
    setApp(prev => ({ ...prev, partnerDecision: decision }));
    // Email borrower
    base44.integrations.Core.SendEmail({
      to: app.borrowerEmail,
      subject: `CrediFlow — Application Update: ${decision}`,
      body: `Your loan application has been reviewed by ${partner?.institutionName || 'the lending partner'}.\n\nDecision: ${decision}\n\nCrediFlow does not make credit decisions. This decision was made solely by the licensed lending partner. If you have questions, contact support.\n\nCrediFlow Team`,
    }).catch(() => {});
    toast.success(`Decision recorded: ${decision}`);
  };

  const handleNote = async () => {
    if (!note.trim()) return;
    await base44.entities.LoanApplication.update(app.id, { partnerNotes: note });
    setNote('');
    toast.success('Note saved');
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;
  if (notAuthorized) return <Navigate to="/partner/applications" replace />;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/partner/applications" className="hover:text-foreground">Applications</Link>
        <span>/</span>
        <span className="text-foreground">{app.id}</span>
      </div>
      <PageHeader title={`Application ${app.id}`} description={`Submitted for your review`} />
      <div className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/50 border border-border/50 text-xs text-muted-foreground">
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
        <p>This application package has been prepared and reviewed by CrediFlow. All loan decisions are made solely by your institution. CrediFlow provides workflow organisation and preliminary review information only.</p>
      </div>

      {/* Application summary */}
      <Card><CardHeader className="pb-3"><CardTitle className="text-base font-display flex items-center gap-2"><ClipboardList className="w-4 h-4 text-primary" /> Application Summary</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <DataRow label="Amount Requested" value={`₱${app.amount?.toLocaleString()}`} />
            <DataRow label="Purpose" value={app.purpose} />
            <DataRow label="Repayment Period" value={app.repaymentPeriod} />
            <DataRow label="Repayment Frequency" value={app.repaymentFrequency} />
            <DataRow label="Income Source" value={app.incomeSource} />
            <DataRow label="Existing Debt" value={app.existingDebt} />
            <DataRow label="Repayment Source" value={app.repaymentSource} />
            <div><p className="text-xs text-muted-foreground">Workflow Status</p><div className="mt-0.5"><StatusChip status={app.status} /></div></div>
            <div><p className="text-xs text-muted-foreground">Current Decision</p><div className="mt-0.5"><StatusChip status={app.partnerDecision} /></div></div>
          </div>
          {app.additionalExplanation && <div className="mt-4 p-3 rounded-lg bg-muted/30 text-sm"><p className="text-xs text-muted-foreground mb-1">Applicant's statement</p><p>"{app.additionalExplanation}"</p></div>}
        </CardContent>
      </Card>

      {/* Borrower profile */}
      {profile && (
        <Card><CardHeader className="pb-3"><CardTitle className="text-base font-display flex items-center gap-2"><User className="w-4 h-4 text-primary" /> Borrower Profile</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <DataRow label="Province / City" value={profile.city && profile.province ? `${profile.city}, ${profile.province}` : profile.province || profile.city} />
              <DataRow label="Civil Status" value={profile.civilStatus} />
              <DataRow label="Household Size" value={profile.householdSize} />
              <DataRow label="Employment Type" value={profile.employmentType} />
              <DataRow label="Monthly Income (self-reported)" value={profile.monthlyIncome} />
              <DataRow label="Mobile Wallet" value={profile.mobileWallet} />
            </div>
            <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground"><Info className="w-3.5 h-3.5 shrink-0 mt-0.5" /><span>All income and household data is self-reported by the applicant.</span></div>
          </CardContent>
        </Card>
      )}

      {/* Group context */}
      {group && (
        <Card><CardHeader className="pb-3"><CardTitle className="text-base font-display flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> Group Context</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <DataRow label="Group Name" value={group.name} />
              <DataRow label="Location" value={group.location} />
              <DataRow label="Member Count" value={(group.memberEmails || []).length} />
              <DataRow label="Group Status" value={group.status} />
              <DataRow label="Readiness" value={group.readiness} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documents */}
      <Card><CardHeader className="pb-3"><CardTitle className="text-base font-display flex items-center gap-2"><FileText className="w-4 h-4 text-primary" /> Submitted Documents</CardTitle></CardHeader>
        <CardContent>
          {docs.length === 0 ? <p className="text-sm text-muted-foreground">No documents submitted.</p> : (
            <div className="space-y-2">
              {docs.map(d => (
                <div key={d.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 text-sm">
                  <div><p className="font-medium">{d.type}</p><p className="text-xs text-muted-foreground">{d.fileName || 'No file attached'}</p></div>
                  <div className="flex items-center gap-2">
                    <StatusChip status={d.status} />
                    {d.fileUrl && <a href={d.fileUrl} target="_blank" rel="noopener noreferrer"><Button variant="ghost" size="sm">View</Button></a>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Review */}
      {ai && (
        <Card className="border-purple-200">
          <CardHeader className="pb-3"><CardTitle className="text-base font-display flex items-center gap-2"><Bot className="w-4 h-4 text-purple-600" /> AI-Assisted Review Summary</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-purple-50 border border-purple-200 text-xs text-purple-800 font-medium">
              <Bot className="w-4 h-4 shrink-0 mt-0.5" />
              <p>{ai.disclaimer || 'This AI-generated analysis is a review aid only. It is not a credit decision, legal conclusion, or approval recommendation.'}</p>
            </div>
            {ai.partnerSummary && <div className="p-3 bg-muted/40 border rounded-lg"><p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Reviewer's Note</p><p>{ai.partnerSummary}</p></div>}
            {ai.inconsistencies?.length > 0 && <div><p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">Noted Inconsistencies</p><ul className="space-y-1">{ai.inconsistencies.map((item, i) => <li key={i} className="flex items-start gap-2 text-amber-700"><AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />{item}</li>)}</ul></div>}
            {ai.followUpQuestions?.length > 0 && <div><p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Suggested Follow-Up</p><ul className="space-y-1 text-muted-foreground">{ai.followUpQuestions.map((q, i) => <li key={i}>• {q}</li>)}</ul></div>}
          </CardContent>
        </Card>
      )}

      {/* Decision */}
      <Card><CardHeader className="pb-3"><CardTitle className="text-base font-display">Your Decision</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 rounded-lg bg-muted/50 border text-xs text-muted-foreground">The decision below is yours alone as the licensed lending partner. CrediFlow does not make or influence credit decisions.</div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-1" onClick={() => handleDecision('More information needed')}><MessageSquare className="w-4 h-4" /> Request More Info</Button>
            <Button className="gap-1 bg-emerald-600 hover:bg-emerald-700" onClick={() => handleDecision('Approved')}><CheckCircle className="w-4 h-4" /> Approve</Button>
            <Button variant="destructive" className="gap-1" onClick={() => handleDecision('Rejected')}><XCircle className="w-4 h-4" /> Reject</Button>
            <Button variant="outline" className="gap-1" onClick={() => handleDecision('Disbursed')}>Mark Disbursed</Button>
          </div>
          <div className="space-y-2">
            <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a decision note or request for more information..." />
            <Button variant="outline" size="sm" className="gap-1" onClick={handleNote}><Send className="w-3 h-3" /> Save Note</Button>
          </div>
        </CardContent>
      </Card>
      <ComplianceDisclaimer variant="partner" />
    </div>
  );
}