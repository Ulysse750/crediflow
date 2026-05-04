import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/useAuth';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, AlertTriangle } from 'lucide-react';

export default function PartnerAIReviews() {
  const { user } = useAuth();
  const [aiAnalyses, setAiAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    base44.entities.PartnerProfile.filter({ created_by: user.email }).then(async ([p]) => {
      if (!p) { setLoading(false); return; }
      const analyses = await base44.entities.AIAnalysis.filter({ partnerProfileId: p.id });
      setAiAnalyses(analyses);
      setLoading(false);
    });
  }, [user]);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

  return (
    <div className="space-y-6">
      <PageHeader title="AI-Assisted Review Summaries" description="Review aids prepared by CrediFlow — not credit decisions" />
      <ComplianceDisclaimer variant="ai" />
      {aiAnalyses.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">No AI reviews available for your assigned applications.</Card>
      ) : (
        <div className="space-y-4">
          {aiAnalyses.map(a => (
            <Card key={a.id}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-secondary" />
                  {a.applicationId} — <span className="text-sm font-normal text-muted-foreground">{a.borrowerEmail}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2 p-3 rounded-lg bg-purple-50 border border-purple-200 text-xs text-purple-800 font-medium">
                  <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>{a.disclaimer || 'This AI-generated analysis is a review aid only. Not a credit decision.'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusChip status={a.status} />
                  {a.humanReviewRequired && <span className="text-xs text-amber-600 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Human review required before forwarding</span>}
                </div>
                {a.partnerSummary && <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground font-medium mb-1">Reviewer's Note</p><p>{a.partnerSummary}</p></div>}
                {a.inconsistencies?.length > 0 && <div><p className="text-xs text-muted-foreground font-medium mb-1">Noted Inconsistencies</p><ul className="list-disc list-inside text-amber-700">{a.inconsistencies.map((c, i) => <li key={i}>{c}</li>)}</ul></div>}
                {a.followUpQuestions?.length > 0 && <div><p className="text-xs text-muted-foreground font-medium mb-1">Suggested Follow-Up Questions</p><ul className="list-disc list-inside">{a.followUpQuestions.map((q, i) => <li key={i}>{q}</li>)}</ul></div>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}