import React from 'react';
import { useDemoAuth } from '@/lib/demoAuth';
import { getPartnerData } from '@/lib/mockData';
import RoleScopeNote from '@/components/shared/RoleScopeNote';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';
import MetricCard from '@/components/shared/MetricCard';
import { FileText, CheckCircle, XCircle, AlertTriangle, CreditCard, Users, Clock, FileSearch } from 'lucide-react';

export default function PartnerDashboard() {
  const { user } = useDemoAuth();
  const data = getPartnerData(user.partnerId);

  const readyForReview = data.applications.filter(a => a.status === 'Ready for partner' || a.status === 'Sent to partner').length;
  const needsInfo = data.applications.filter(a => a.partnerDecision === 'More information needed').length;
  const approved = data.applications.filter(a => a.partnerDecision === 'Approved').length;
  const rejected = data.applications.filter(a => a.partnerDecision === 'Rejected').length;
  const disbursed = data.loans.filter(l => l.status === 'Active' || l.status === 'Approved').length;
  const lateRepayments = data.repayments.filter(r => r.status === 'Late' || r.status === 'Missed').length;
  const pendingDocs = data.documents.filter(d => d.status === 'Uploaded' || d.status === 'Under review').length;
  const aiCompleted = data.aiAnalyses.filter(a => a.status === 'completed').length;

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-display font-bold">{user.institution}</h1>
        <p className="text-sm text-muted-foreground mt-1">Partner dashboard overview</p>
      </div>
      <RoleScopeNote role="partner" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard label="Assigned Applications" value={data.applications.length} icon={FileText} />
        <MetricCard label="Ready for Review" value={readyForReview} icon={Clock} color="text-secondary" />
        <MetricCard label="Needs More Info" value={needsInfo} icon={AlertTriangle} color="text-amber-500" />
        <MetricCard label="Approved" value={approved} icon={CheckCircle} color="text-emerald-600" />
        <MetricCard label="Rejected" value={rejected} icon={XCircle} color="text-red-500" />
        <MetricCard label="Active Groups" value={data.groups.length} icon={Users} />
        <MetricCard label="Late Repayments" value={lateRepayments} icon={CreditCard} color="text-red-500" />
        <MetricCard label="Pending Doc Reviews" value={pendingDocs} icon={FileSearch} />
      </div>

      <ComplianceDisclaimer variant="partner" />
    </div>
  );
}