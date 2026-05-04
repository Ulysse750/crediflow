import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Sparkles } from 'lucide-react';

export default function AdminAIAnalysis() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.AIAnalysis.list('-created_date').then(a => { setAnalyses(a); setLoading(false); });
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

  return (
    <div className="space-y-6">
      <PageHeader title="AI Document Analysis" description="AI-assisted document review summaries" />
      <ComplianceDisclaimer variant="ai" />
      {analyses.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">No AI analyses yet. Run AI review from Application Review page.</Card>
      ) : analyses.map(a => (
        <Card key={a.id}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-secondary" />
              {a.borrowerEmail} — <StatusChip status={a.status} />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><p className="text-xs text-muted-foreground font-medium mb-1">Documents Reviewed</p><p>{(a.documentsReviewed || []).join(', ') || 'None'}</p></div>
              <div><p className="text-xs text-muted-foreground font-medium mb-1">Missing Documents</p><p className={(a.missingDocuments || []).length > 0 ? 'text-amber-600' : ''}>{(a.missingDocuments || []).length > 0 ? a.missingDocuments.join(', ') : 'None'}</p></div>
            </div>
            {(a.inconsistencies || []).length > 0 && (
              <div><p className="text-xs text-muted-foreground font-medium mb-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-amber-500" /> Inconsistencies</p>
                <ul className="list-disc list-inside text-amber-700">{a.inconsistencies.map((c, i) => <li key={i}>{c}</li>)}</ul>
              </div>
            )}
            {(a.riskObservations || []).length > 0 && (
              <div><p className="text-xs text-muted-foreground font-medium mb-1">Risk Observations</p>
                <ul className="list-disc list-inside">{a.riskObservations.map((r, i) => <li key={i}>{r}</li>)}</ul>
              </div>
            )}
            {a.partnerSummary && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-1">Reviewer Summary</p>
                <p>{a.partnerSummary}</p>
              </div>
            )}
            {a.humanReviewRequired && (
              <div className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500" /><span className="text-sm font-medium text-amber-700">Human review required</span></div>
            )}
            <p className="text-xs text-muted-foreground italic">{a.disclaimer}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}