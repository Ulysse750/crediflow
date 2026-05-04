import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import RoleScopeNote from '@/components/shared/RoleScopeNote';
import MetricCard from '@/components/shared/MetricCard';
import { Users, UsersRound, FileText, Clock, CheckCircle, XCircle, CreditCard, AlertTriangle, MessageSquare, Sparkles, Building2 } from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState({ borrowers: [], groups: [], applications: [], loans: [], repayments: [], support: [], flags: [], aiAnalyses: [], partners: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      base44.entities.BorrowerProfile.list(),
      base44.entities.BorrowerGroup.list(),
      base44.entities.LoanApplication.list(),
      base44.entities.Loan.list(),
      base44.entities.Repayment.list(),
      base44.entities.SupportRequest.list(),
      base44.entities.RiskFlag.list(),
      base44.entities.AIAnalysis.list(),
      base44.entities.PartnerProfile.list(),
    ]).then(([borrowers, groups, applications, loans, repayments, support, flags, aiAnalyses, partners]) => {
      setData({ borrowers, groups, applications, loans, repayments, support, flags, aiAnalyses, partners });
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

  const { borrowers, groups, applications, loans, repayments, support, flags, aiAnalyses, partners } = data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Operational overview</p>
      </div>
      <RoleScopeNote role="admin" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard label="Total Borrowers" value={borrowers.length} icon={Users} />
        <MetricCard label="Active Groups" value={groups.filter(g => g.status === 'Active').length} icon={UsersRound} />
        <MetricCard label="Submitted Apps" value={applications.filter(a => a.status !== 'Draft').length} icon={FileText} />
        <MetricCard label="Under Review" value={applications.filter(a => a.status === 'Under CrediFlow review').length} icon={Clock} color="text-purple-600" />
        <MetricCard label="Ready for Partner" value={applications.filter(a => a.status === 'Ready for partner').length} icon={Building2} color="text-secondary" />
        <MetricCard label="Sent to Partner" value={applications.filter(a => a.status === 'Sent to partner').length} icon={FileText} color="text-indigo-600" />
        <MetricCard label="Approved" value={applications.filter(a => a.partnerDecision === 'Approved').length} icon={CheckCircle} color="text-emerald-600" />
        <MetricCard label="Rejected" value={applications.filter(a => a.partnerDecision === 'Rejected').length} icon={XCircle} color="text-red-500" />
        <MetricCard label="Active Loans" value={loans.filter(l => l.status === 'Active').length} icon={CreditCard} color="text-secondary" />
        <MetricCard label="Late Repayments" value={repayments.filter(r => r.status === 'Late' || r.status === 'Missed').length} icon={CreditCard} color="text-red-500" />
        <MetricCard label="Unresolved Support" value={support.filter(s => s.status !== 'Resolved').length} icon={MessageSquare} color="text-amber-500" />
        <MetricCard label="High Risk Flags" value={flags.filter(f => f.severity === 'High' && f.status === 'Open').length} icon={AlertTriangle} color="text-red-500" />
        <MetricCard label="AI Reviews Pending" value={aiAnalyses.filter(a => a.status === 'pending').length} icon={Sparkles} color="text-amber-500" />
        <MetricCard label="AI Reviews Done" value={aiAnalyses.filter(a => a.status === 'completed').length} icon={Sparkles} color="text-emerald-600" />
        <MetricCard label="Partners" value={partners.length} icon={Building2} />
      </div>
    </div>
  );
}