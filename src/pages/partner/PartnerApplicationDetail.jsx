import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useDemoAuth } from '@/lib/demoAuth';
import { getPartnerData, getBorrowerName, getGroupName, AI_ANALYSES, DOCUMENTS, RISK_FLAGS, GROUPS, BORROWERS, QUESTIONNAIRE_ANSWERS } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { CheckCircle, XCircle, MessageSquare, AlertTriangle, FileText, Send, Info, User, Users, ClipboardList, Bot } from 'lucide-react';

function SectionCard({ icon: Icon, title, children, className = '' }) {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-display flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function DataRow({ label, value }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium text-sm mt-0.5">{value || '—'}</p>
    </div>
  );
}

export default function PartnerApplicationDetail() {
  const { id } = useParams();
  const { user } = useDemoAuth();
  const data = getPartnerData(user?.partnerId || '');
  const app = data.applications.find(a => a.id === id);
  const [note, setNote] = useState('');

  // Hard scope: partner can only see applications assigned to them
  if (!app) return <Navigate to="/partner/applications" replace />;

  const docs = DOCUMENTS.filter(d => d.applicationId === app.id);
  const ai = AI_ANALYSES.find(a => a.applicationId === app.id);
  const flags = RISK_FLAGS.filter(r => r.applicationId === app.id && r.status === 'Open');

  // Borrower profile — only name-safe fields exposed; no cross-borrower data
  const borrower = BORROWERS.find(b => b.id === app.borrowerId);
  const group = GROUPS.find(g => g.id === app.groupId);
  const questionnaire = QUESTIONNAIRE_ANSWERS[app.borrowerId];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/partner/applications" className="hover:text-foreground">Applications</Link>
        <span>/</span>
        <span className="text-foreground">{app.id}</span>
      </div>

      <PageHeader title={`Application ${app.id}`} description={`Submitted for your review — ${getBorrowerName(app.borrowerId)}`} />

      {/* Partner disclaimer */}
      <div className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/50 border border-border/50 text-xs text-muted-foreground">
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
        <p>
          This application package has been prepared and reviewed by CrediFlow. All loan decisions are made solely by your institution. CrediFlow provides workflow organisation and preliminary review information only. No approval is implied.
        </p>
      </div>

      {/* Application summary */}
      <SectionCard icon={ClipboardList} title="Application Summary">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <DataRow label="Application ID" value={app.id} />
          <DataRow label="Amount Requested" value={`₱${app.amount?.toLocaleString()}`} />
          <DataRow label="Purpose" value={app.purpose} />
          <DataRow label="Repayment Period" value={app.repaymentPeriod} />
          <DataRow label="Repayment Frequency" value={app.repaymentFrequency} />
          <DataRow label="Income Source" value={app.incomeSource} />
          <DataRow label="Existing Debt" value={app.existingDebt} />
          <DataRow label="Repayment Source" value={app.repaymentSource} />
          <div className="col-span-2 md:col-span-1">
            <p className="text-xs text-muted-foreground">Workflow Status</p>
            <div className="mt-0.5"><StatusChip status={app.status} /></div>
          </div>
        </div>
        {app.additionalExplanation && (
          <div className="mt-4 p-3 rounded-lg bg-muted/30 text-sm">
            <p className="text-xs text-muted-foreground mb-1">Applicant's statement</p>
            <p>"{app.additionalExplanation}"</p>
          </div>
        )}
      </SectionCard>

      {/* Borrower profile */}
      {borrower && (
        <SectionCard icon={User} title="Borrower Profile">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <DataRow label="Name" value={borrower.name} />
            <DataRow label="Province / City" value={`${borrower.city}, ${borrower.province}`} />
            <DataRow label="Civil Status" value={borrower.civilStatus} />
            <DataRow label="Household Size" value={borrower.householdSize} />
            <DataRow label="Dependents" value={borrower.dependents} />
            <DataRow label="Education" value={borrower.educationLevel} />
            <DataRow label="Employment Type" value={borrower.employmentType} />
            <DataRow label="Years in Work" value={borrower.yearsInWork} />
            <DataRow label="Monthly Income (self-reported)" value={borrower.monthlyIncome} />
            <DataRow label="Mobile Wallet" value={borrower.mobileWallet} />
            <DataRow label="Has Bank Account" value={borrower.hasBankAccount ? 'Yes' : 'No'} />
            <DataRow label="Language" value={borrower.language} />
          </div>
          <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>All income and household data is self-reported by the applicant. No third-party income verification has been performed.</span>
          </div>
        </SectionCard>
      )}

      {/* Group context */}
      {group && (
        <SectionCard icon={Users} title="Group Context">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <DataRow label="Group Name" value={group.name} />
            <DataRow label="Location" value={group.location} />
            <DataRow label="Member Count" value={group.memberIds.length} />
            <DataRow label="Group Status" value={group.status} />
            <DataRow label="Readiness" value={group.readiness} />
            <DataRow label="Purpose" value={group.purpose} />
          </div>
          <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>Individual financial details of other group members are not shared. Group context is provided for readiness assessment only.</span>
          </div>
        </SectionCard>
      )}

      {/* Documents */}
      <SectionCard icon={FileText} title="Submitted Documents">
        {docs.length === 0 ? (
          <p className="text-sm text-muted-foreground">No documents submitted.</p>
        ) : (
          <div className="space-y-2">
            {docs.map(d => (
              <div key={d.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 text-sm">
                <div>
                  <p className="font-medium">{d.type}</p>
                  <p className="text-xs text-muted-foreground">{d.fileName || 'No file attached'}</p>
                  {d.notes && <p className="text-xs text-amber-600 mt-0.5">{d.notes}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <StatusChip status={d.status} />
                  <Button variant="ghost" size="sm" onClick={() => toast.success('Note added (demo)')}>Note</Button>
                  <Button variant="ghost" size="sm" onClick={() => toast.info('Replacement requested (demo)')}>Request Replacement</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Alternative-data questionnaire summary (if available) */}
      {questionnaire && (
        <SectionCard icon={ClipboardList} title="Alternative-Data Summary">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <DataRow label="Primary livelihood" value={questionnaire.A1} />
            <DataRow label="Years in current work" value={questionnaire.A2} />
            <DataRow label="Income frequency" value={questionnaire.A3} />
            <DataRow label="Monthly income range" value={questionnaire.A4} />
            <DataRow label="Seasonal income?" value={questionnaire.A5} />
            <DataRow label="Business capital purpose" value={questionnaire.C1} />
            <DataRow label="Keeps business records?" value={questionnaire.C3} />
            <DataRow label="Loan purpose explanation" value={questionnaire.C2 || '—'} />
            <DataRow label="Group known > 1 year?" value={questionnaire.D3} />
            <DataRow label="Internet / smartphone access?" value={questionnaire.E1} />
            <DataRow label="Mobile wallet" value={questionnaire.E4} />
          </div>
          <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>Alternative-data responses are self-reported by the borrower and have not been independently verified. They are provided as contextual information to support human review.</span>
          </div>
        </SectionCard>
      )}

      {/* Risk flags */}
      {flags.length > 0 && (
        <SectionCard icon={AlertTriangle} title="Review Flags" className="border-amber-200">
          <div className="space-y-2 mb-4">
            {flags.map(f => (
              <div key={f.id} className="flex items-start justify-between p-3 rounded-lg bg-amber-50/50 border border-amber-100 text-sm gap-3">
                <div>
                  <p className="font-medium">{f.flagType}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{f.explanation}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Source: {f.source}</p>
                </div>
                <StatusChip status={f.severity} />
              </div>
            ))}
          </div>
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>Risk flags are workflow review aids only. They are not automated credit decisions and do not determine the outcome of this application.</span>
          </div>
        </SectionCard>
      )}

      {/* AI review summary — clearly labelled as review aid only */}
      {ai && (
        <Card className="border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <Bot className="w-4 h-4 text-purple-600" /> AI-Assisted Review Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Prominent disclaimer — must come first */}
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-purple-50 border border-purple-200 text-xs text-purple-800 font-medium">
              <Bot className="w-4 h-4 shrink-0 mt-0.5" />
              <p>{ai.disclaimer}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Profile Summary</p>
                <p>{ai.profileSummary}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Loan Request</p>
                <p>{ai.loanRequestSummary}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Income Summary</p>
                <p>{ai.incomeSummary}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Repayment Evidence</p>
                <p>{ai.repaymentEvidence}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Document Summary</p>
                <p>{ai.documentSummary}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Group Context</p>
                <p>{ai.groupContextSummary}</p>
              </div>
            </div>

            {ai.inconsistencies?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">Noted Inconsistencies</p>
                <ul className="text-sm space-y-1">
                  {ai.inconsistencies.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-amber-700">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {ai.riskObservations?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Review Observations</p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  {ai.riskObservations.map((item, i) => <li key={i}>• {item}</li>)}
                </ul>
              </div>
            )}

            {ai.followUpQuestions?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Suggested Follow-Up Questions</p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  {ai.followUpQuestions.map((item, i) => <li key={i}>• {item}</li>)}
                </ul>
              </div>
            )}

            {ai.humanReviewSteps?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Recommended Human Review Steps</p>
                <ul className="text-sm space-y-1">
                  {ai.humanReviewSteps.map((item, i) => <li key={i} className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />{item}</li>)}
                </ul>
              </div>
            )}

            {ai.partnerSummary && (
              <div className="p-3 rounded-lg bg-muted/40 border text-sm">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Reviewer's Note</p>
                <p>{ai.partnerSummary}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Partner decision actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display">Your Decision</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 rounded-lg bg-muted/50 border text-xs text-muted-foreground">
            The decision below is yours alone as the licensed lending partner. CrediFlow does not make or influence credit decisions.
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-1" onClick={() => toast.info('More information requested (demo)')}>
              <MessageSquare className="w-4 h-4" /> Request More Info
            </Button>
            <Button className="gap-1 bg-emerald-600 hover:bg-emerald-700" onClick={() => toast.success('Decision noted as Approved (demo)')}>
              <CheckCircle className="w-4 h-4" /> Approve
            </Button>
            <Button variant="destructive" className="gap-1" onClick={() => toast.info('Decision noted as Rejected (demo)')}>
              <XCircle className="w-4 h-4" /> Reject
            </Button>
            <Button variant="outline" className="gap-1" onClick={() => toast.success('Marked as disbursed (demo)')}>
              Mark Disbursed
            </Button>
          </div>
          <div className="space-y-2">
            <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a decision note or request for more information..." />
            <Button variant="outline" size="sm" className="gap-1" onClick={() => { toast.success('Note added (demo)'); setNote(''); }}>
              <Send className="w-3 h-3" /> Submit Note
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}