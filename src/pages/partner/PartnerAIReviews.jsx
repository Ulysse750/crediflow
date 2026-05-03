import React from 'react';
import { useDemoAuth } from '@/lib/demoAuth';
import { getPartnerData, getBorrowerName } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Sparkles, AlertTriangle } from 'lucide-react';

export default function PartnerAIReviews() {
  const { user } = useDemoAuth();
  const { aiAnalyses } = getPartnerData(user.partnerId);

  return (
    <div className="space-y-6">
      <PageHeader title="AI-Assisted Review Summaries" description="Review aids prepared by CrediFlow for assigned applications — not credit decisions" />
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
                  {a.applicationId} — {getBorrowerName(a.borrowerId)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {/* Prominent disclaimer must appear first */}
                <div className="flex items-start gap-2 p-3 rounded-lg bg-purple-50 border border-purple-200 text-xs text-purple-800 font-medium">
                  <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>{a.disclaimer}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusChip status={a.status} />
                  {a.humanReviewRequired && (
                    <span className="text-xs text-amber-600 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Human review required before forwarding</span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div><p className="text-xs text-muted-foreground font-medium">Documents Reviewed</p><p>{a.documentsReviewed.join(', ') || 'None'}</p></div>
                  <div><p className="text-xs text-muted-foreground font-medium">Missing Documents</p><p className={a.missingDocuments.length > 0 ? 'text-amber-600 font-medium' : ''}>{a.missingDocuments.length > 0 ? a.missingDocuments.join(', ') : 'None'}</p></div>
                </div>
                {a.inconsistencies?.length > 0 && (
                  <div><p className="text-xs text-muted-foreground font-medium mb-1">Noted Inconsistencies</p>
                    <ul className="list-disc list-inside text-amber-700">{a.inconsistencies.map((c, i) => <li key={i}>{c}</li>)}</ul>
                  </div>
                )}
                {a.followUpQuestions?.length > 0 && (
                  <div><p className="text-xs text-muted-foreground font-medium mb-1">Suggested Follow-Up Questions</p>
                    <ul className="list-disc list-inside">{a.followUpQuestions.map((q, i) => <li key={i}>{q}</li>)}</ul>
                  </div>
                )}
                {a.partnerSummary && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground font-medium mb-1">Reviewer's Note</p>
                    <p>{a.partnerSummary}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}