import React from 'react';
import { getAdminData, getBorrowerName } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Sparkles, AlertTriangle } from 'lucide-react';

export default function AdminAIAnalysis() {
  const { aiAnalyses } = getAdminData();

  return (
    <div className="space-y-6">
      <PageHeader title="AI Document Analysis" description="AI-assisted document review summaries" />
      <ComplianceDisclaimer variant="ai" />

      {aiAnalyses.map(a => (
        <Card key={a.id}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-secondary" />
              {a.applicationId} — {getBorrowerName(a.borrowerId)}
              <StatusChip status={a.status} />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">Documents Reviewed</p>
                <p>{a.documentsReviewed.join(', ')}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">Missing Documents</p>
                <p className={a.missingDocuments.length > 0 ? 'text-amber-600' : ''}>{a.missingDocuments.length > 0 ? a.missingDocuments.join(', ') : 'None'}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">Extracted Signals</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {Object.entries(a.extractedSignals).filter(([, v]) => v).map(([key, val]) => (
                  <div key={key} className="p-2 bg-muted/30 rounded text-xs">
                    <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>{val}
                  </div>
                ))}
              </div>
            </div>

            {a.inconsistencies.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-amber-500" /> Inconsistencies</p>
                <ul className="list-disc list-inside text-amber-700">{a.inconsistencies.map((c, i) => <li key={i}>{c}</li>)}</ul>
              </div>
            )}

            {a.riskObservations.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">Risk Observations</p>
                <ul className="list-disc list-inside">{a.riskObservations.map((r, i) => <li key={i}>{r}</li>)}</ul>
              </div>
            )}

            {a.followUpQuestions.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">Follow-up Questions</p>
                <ul className="list-disc list-inside">{a.followUpQuestions.map((q, i) => <li key={i}>{q}</li>)}</ul>
              </div>
            )}

            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground font-medium mb-1">Reviewer Summary</p>
              <p>{a.reviewerSummary}</p>
            </div>

            {a.humanReviewRequired && (
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-amber-700">Human review required</span>
              </div>
            )}

            <p className="text-xs text-muted-foreground italic">{a.disclaimer}</p>
          </CardContent>
        </Card>
      ))}

      <Card className="p-6 text-center">
        <Button className="gap-2" onClick={() => toast.success('AI analysis triggered for all pending documents (demo)')}>
          <Sparkles className="w-4 h-4" /> Run AI Document Review on Pending
        </Button>
      </Card>
    </div>
  );
}