import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Sparkles, AlertTriangle, FileText, Building2 } from 'lucide-react';

export default function AdminApplicationReview() {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [docs, setDocs] = useState([]);
  const [ai, setAi] = useState(null);
  const [flags, setFlags] = useState([]);
  const [partners, setPartners] = useState([]);
  const [partnerAssign, setPartnerAssign] = useState('');
  const [flagNote, setFlagNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [runningAI, setRunningAI] = useState(false);

  useEffect(() => {
    Promise.all([
      base44.entities.LoanApplication.list().then(apps => apps.find(a => a.id === id)),
      base44.entities.PartnerProfile.list(),
    ]).then(async ([application, pts]) => {
      if (!application) { setNotFound(true); setLoading(false); return; }
      setApp(application);
      setPartnerAssign(application.partnerProfileId || '');
      setPartners(pts);
      const [documents, analyses, riskFlags] = await Promise.all([
        base44.entities.Document.filter({ applicationId: application.id }),
        base44.entities.AIAnalysis.filter({ applicationId: application.id }),
        base44.entities.RiskFlag.filter({ applicationId: application.id }),
      ]);
      setDocs(documents);
      setAi(analyses[0] || null);
      setFlags(riskFlags);
      setLoading(false);
    });
  }, [id]);

  const updateStatus = async (status) => {
    await base44.entities.LoanApplication.update(app.id, { status });
    setApp(prev => ({ ...prev, status }));
    // Email borrower on key transitions
    if (status === 'Needs more information') {
      base44.integrations.Core.SendEmail({
        to: app.borrowerEmail,
        subject: 'CrediFlow — Additional Information Required',
        body: `Hi,\n\nCrediFlow has reviewed your loan application and requires additional information before it can proceed.\n\nPlease log in to your borrower portal and check your application for details.\n\nCrediFlow Team`,
      }).catch(() => {});
    }
    toast.success(`Status updated to: ${status}`);
  };

  const assignPartner = async () => {
    if (!partnerAssign) return toast.error('Select a partner');
    await base44.entities.LoanApplication.update(app.id, { partnerProfileId: partnerAssign, status: 'Sent to partner' });
    setApp(prev => ({ ...prev, partnerProfileId: partnerAssign, status: 'Sent to partner' }));
    const partner = partners.find(p => p.id === partnerAssign);
    toast.success(`Assigned to ${partner?.institutionName || partnerAssign}`);
  };

  const addRiskFlag = async () => {
    if (!flagNote.trim()) return;
    const flag = await base44.entities.RiskFlag.create({
      borrowerEmail: app.borrowerEmail,
      applicationId: app.id,
      flagType: 'Manual review needed',
      severity: 'Medium',
      source: 'Admin review',
      explanation: flagNote,
      status: 'Open',
    });
    setFlags(prev => [...prev, flag]);
    setFlagNote('');
    toast.success('Risk flag added');
  };

  const runAIReview = async () => {
    setRunningAI(true);
    const prompts = await base44.entities.AIPrompt.filter({ active: true });
    const activePrompt = prompts[0];
    if (!activePrompt) { toast.error('No active AI prompt found. Go to AI Prompts to activate one.'); setRunningAI(false); return; }

    const [profile] = await base44.entities.BorrowerProfile.filter({ created_by: app.borrowerEmail });
    const q = await base44.entities.QuestionnaireAnswer.filter({ borrowerEmail: app.borrowerEmail });
    const documents = await base44.entities.Document.filter({ applicationId: app.id });
    const group = app.groupId ? await base44.entities.BorrowerGroup.list().then(gs => gs.find(g => g.id === app.groupId)) : null;

    const prompt = `${activePrompt.promptText}

APPLICATION DATA:
Borrower: ${app.borrowerEmail}
Amount: ₱${app.amount?.toLocaleString()}
Purpose: ${app.purpose}
Repayment: ${app.repaymentPeriod}, ${app.repaymentFrequency}
Income source: ${app.incomeSource}
Existing debt: ${app.existingDebt}
Repayment source: ${app.repaymentSource}
Applicant statement: ${app.additionalExplanation || 'None'}

BORROWER PROFILE:
Province: ${profile?.province || 'Not provided'}, City: ${profile?.city || 'Not provided'}
Income: ${profile?.monthlyIncome || 'Not provided'}
Employment: ${profile?.employmentType || 'Not provided'}
Household: ${profile?.householdSize || 'Not provided'} people, ${profile?.dependents || 'Not provided'} dependents

DOCUMENTS SUBMITTED:
${documents.map(d => `- ${d.type}: ${d.status}${d.notes ? ' (Note: ' + d.notes + ')' : ''}`).join('\n') || 'None uploaded'}

GROUP CONTEXT:
${group ? `Group: ${group.name}, Status: ${group.status}, Members: ${(group.memberEmails || []).length}, Readiness: ${group.readiness}` : 'No group assigned'}

QUESTIONNAIRE (key answers):
${q[0] ? `Income type: ${q[0].A1}, Frequency: ${q[0].A3}, Monthly: ${q[0].A4}, Existing loans: ${q[0].B2}, Loan purpose: ${q[0].C1}` : 'Not completed'}

Respond with a JSON object matching this structure:
{
  "profileSummary": "string",
  "loanRequestSummary": "string",
  "incomeSummary": "string",
  "groupContextSummary": "string",
  "documentSummary": "string",
  "repaymentEvidence": "string",
  "alternativeDataSummary": "string",
  "inconsistencies": ["string"],
  "riskObservations": ["string"],
  "followUpQuestions": ["string"],
  "humanReviewSteps": ["string"],
  "partnerSummary": "string",
  "humanReviewRequired": true,
  "missingDocuments": ["string"],
  "documentsReviewed": ["string"]
}`;

    const result = await base44.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: 'object',
        properties: {
          profileSummary: { type: 'string' }, loanRequestSummary: { type: 'string' },
          incomeSummary: { type: 'string' }, groupContextSummary: { type: 'string' },
          documentSummary: { type: 'string' }, repaymentEvidence: { type: 'string' },
          alternativeDataSummary: { type: 'string' },
          inconsistencies: { type: 'array', items: { type: 'string' } },
          riskObservations: { type: 'array', items: { type: 'string' } },
          followUpQuestions: { type: 'array', items: { type: 'string' } },
          humanReviewSteps: { type: 'array', items: { type: 'string' } },
          partnerSummary: { type: 'string' }, humanReviewRequired: { type: 'boolean' },
          missingDocuments: { type: 'array', items: { type: 'string' } },
          documentsReviewed: { type: 'array', items: { type: 'string' } },
        }
      }
    });

    const DISCLAIMER = 'This AI-generated analysis is a review aid only. It is not a credit decision, legal conclusion, fraud finding, credit score, or approval recommendation. Final decisions remain with licensed lending partners and human reviewers.';
    const aiData = {
      applicationId: app.id,
      borrowerEmail: app.borrowerEmail,
      partnerProfileId: app.partnerProfileId || '',
      promptId: activePrompt.id,
      status: 'completed',
      ...result,
      disclaimer: DISCLAIMER,
    };

    if (ai) {
      await base44.entities.AIAnalysis.update(ai.id, aiData);
      setAi({ ...ai, ...aiData });
    } else {
      const created = await base44.entities.AIAnalysis.create(aiData);
      setAi(created);
    }
    setRunningAI(false);
    toast.success('AI review completed');
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;
  if (notFound) return <Navigate to="/admin/applications" replace />;

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader title={`Review Application`} description={`Borrower: ${app.borrowerEmail}`} />

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div><p className="text-xs text-muted-foreground">Amount</p><p className="font-medium">₱{app.amount?.toLocaleString()}</p></div>
            <div><p className="text-xs text-muted-foreground">Purpose</p><p className="font-medium">{app.purpose}</p></div>
            <div><p className="text-xs text-muted-foreground">Status</p><StatusChip status={app.status} /></div>
            <div><p className="text-xs text-muted-foreground">Decision</p><StatusChip status={app.partnerDecision} /></div>
            <div><p className="text-xs text-muted-foreground">Risk</p>{app.riskLevel ? <StatusChip status={app.riskLevel} /> : <span className="text-muted-foreground text-sm">—</span>}</div>
            <div><p className="text-xs text-muted-foreground">Submitted</p><p className="font-medium text-sm">{app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : '—'}</p></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base font-display">Admin Actions</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => updateStatus('Needs more information')}>Needs More Info</Button>
            <Button variant="outline" onClick={() => updateStatus('Under CrediFlow review')}>Under Review</Button>
            <Button className="bg-secondary hover:bg-secondary/90" onClick={() => updateStatus('Ready for partner')}>Ready for Partner</Button>
            <Button variant="outline" onClick={() => updateStatus('Closed')}>Close</Button>
          </div>
          <div className="flex items-center gap-3">
            <Select value={partnerAssign} onValueChange={setPartnerAssign}>
              <SelectTrigger className="w-56"><SelectValue placeholder="Assign partner" /></SelectTrigger>
              <SelectContent>
                {partners.map(p => <SelectItem key={p.id} value={p.id}>{p.institutionName}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-1" onClick={assignPartner}>
              <Building2 className="w-4 h-4" /> Assign &amp; Send
            </Button>
          </div>
          <div className="space-y-2">
            <Textarea value={flagNote} onChange={(e) => setFlagNote(e.target.value)} placeholder="Add risk flag note..." />
            <Button variant="outline" size="sm" className="gap-1" onClick={addRiskFlag}>
              <AlertTriangle className="w-3 h-3" /> Add Risk Flag
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base font-display flex items-center gap-2"><FileText className="w-4 h-4" /> Documents ({docs.length})</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {docs.length === 0 ? <p className="text-sm text-muted-foreground">No documents uploaded.</p> : docs.map(d => (
            <div key={d.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 text-sm">
              <div>
                <p className="font-medium">{d.type}</p>
                {d.fileName && <p className="text-xs text-muted-foreground">{d.fileName}</p>}
              </div>
              <div className="flex items-center gap-2">
                <StatusChip status={d.status} />
                {d.aiStatus && <StatusChip status={d.aiStatus} />}
                {d.fileUrl && <a href={d.fileUrl} target="_blank" rel="noopener noreferrer"><Button variant="ghost" size="sm">View</Button></a>}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base font-display flex items-center gap-2"><Sparkles className="w-4 h-4 text-secondary" /> AI Analysis</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
          {ai ? (
            <>
              <div className="flex items-center gap-2"><StatusChip status={ai.status} />{ai.humanReviewRequired && <span className="inline-flex items-center gap-1 text-xs text-amber-700 font-medium bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5">⚠ Human review required</span>}</div>
              {ai.partnerSummary && <div className="p-3 rounded-lg bg-muted/40 border"><p className="text-xs font-semibold text-muted-foreground mb-1">Reviewer's Note</p><p>{ai.partnerSummary}</p></div>}
              {ai.inconsistencies?.length > 0 && <div><p className="text-xs font-semibold text-amber-700 mb-1">Inconsistencies</p><ul className="list-disc list-inside text-amber-700">{ai.inconsistencies.map((c, i) => <li key={i}>{c}</li>)}</ul></div>}
              {ai.riskObservations?.length > 0 && <div><p className="text-xs font-semibold text-muted-foreground mb-1">Risk Observations</p><ul className="list-disc list-inside text-muted-foreground">{ai.riskObservations.map((r, i) => <li key={i}>{r}</li>)}</ul></div>}
              {ai.followUpQuestions?.length > 0 && <div><p className="text-xs font-semibold text-muted-foreground mb-1">Follow-up Questions</p><ul className="list-disc list-inside text-muted-foreground">{ai.followUpQuestions.map((q, i) => <li key={i}>{q}</li>)}</ul></div>}
              <ComplianceDisclaimer variant="ai" />
              <Button variant="outline" size="sm" className="gap-2" onClick={runAIReview} disabled={runningAI}>
                <Sparkles className="w-3 h-3" /> {runningAI ? 'Running AI…' : 'Re-run AI Review'}
              </Button>
            </>
          ) : (
            <div className="space-y-3">
              <p className="text-muted-foreground">No AI analysis yet for this application.</p>
              <Button className="gap-2" onClick={runAIReview} disabled={runningAI}>
                <Sparkles className="w-4 h-4" /> {runningAI ? 'Running AI…' : 'Run AI Document Review'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

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
                  {f.status === 'Open' && <Button variant="ghost" size="sm" onClick={async () => { await base44.entities.RiskFlag.update(f.id, { status: 'Resolved', resolvedAt: new Date().toISOString() }); setFlags(prev => prev.map(r => r.id === f.id ? { ...r, status: 'Resolved' } : r)); toast.success('Flag resolved'); }}>Resolve</Button>}
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