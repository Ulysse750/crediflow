import React from 'react';
import { getAdminData } from '@/lib/mockData';
import RoleScopeNote from '@/components/shared/RoleScopeNote';
import MetricCard from '@/components/shared/MetricCard';
import { Users, UsersRound, FileText, Clock, CheckCircle, XCircle, CreditCard, AlertTriangle, MessageSquare, Sparkles, Building2 } from 'lucide-react';

export default function AdminDashboard() {
  const d = getAdminData();
  const submitted = d.applications.filter(a => a.status !== 'Draft').length;
  const underReview = d.applications.filter(a => a.status === 'Under CrediFlow review').length;
  const readyForPartner = d.applications.filter(a => a.status === 'Ready for partner').length;
  const sentToPartner = d.applications.filter(a => a.status === 'Sent to partner').length;
  const approved = d.applications.filter(a => a.partnerDecision === 'Approved').length;
  const rejected = d.applications.filter(a => a.partnerDecision === 'Rejected').length;
  const activeLoans = d.loans.filter(l => l.status === 'Active').length;
  const lateRepayments = d.repayments.filter(r => r.status === 'Late' || r.status === 'Missed').length;
  const unresolvedSupport = d.supportRequests.filter(s => s.status !== 'Resolved' && s.status !== 'Closed').length;
  const highRisk = d.riskFlags.filter(r => r.severity === 'High' && r.status === 'Open').length;
  const aiPending = d.aiAnalyses.filter(a => a.status === 'pending').length;
  const aiCompleted = d.aiAnalyses.filter(a => a.status === 'completed').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Operational overview</p>
      </div>
      <RoleScopeNote role="admin" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard label="Total Borrowers" value={d.borrowers.length} icon={Users} />
        <MetricCard label="Active Groups" value={d.groups.filter(g => g.status === 'Active').length} icon={UsersRound} />
        <MetricCard label="Submitted Apps" value={submitted} icon={FileText} />
        <MetricCard label="Under Review" value={underReview} icon={Clock} color="text-purple-600" />
        <MetricCard label="Ready for Partner" value={readyForPartner} icon={Building2} color="text-secondary" />
        <MetricCard label="Sent to Partner" value={sentToPartner} icon={FileText} color="text-indigo-600" />
        <MetricCard label="Approved" value={approved} icon={CheckCircle} color="text-emerald-600" />
        <MetricCard label="Rejected" value={rejected} icon={XCircle} color="text-red-500" />
        <MetricCard label="Active Loans" value={activeLoans} icon={CreditCard} color="text-secondary" />
        <MetricCard label="Late Repayments" value={lateRepayments} icon={CreditCard} color="text-red-500" />
        <MetricCard label="Unresolved Support" value={unresolvedSupport} icon={MessageSquare} color="text-amber-500" />
        <MetricCard label="High Risk Flags" value={highRisk} icon={AlertTriangle} color="text-red-500" />
        <MetricCard label="AI Reviews Pending" value={aiPending} icon={Sparkles} color="text-amber-500" />
        <MetricCard label="AI Reviews Done" value={aiCompleted} icon={Sparkles} color="text-emerald-600" />
      </div>
    </div>
  );
}