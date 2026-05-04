import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/useAuth';
import { base44 } from '@/api/base44Client';
import RoleScopeNote from '@/components/shared/RoleScopeNote';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';
import MetricCard from '@/components/shared/MetricCard';
import { FileText, CheckCircle, XCircle, AlertTriangle, CreditCard, Users, Clock, FileSearch } from 'lucide-react';

export default function PartnerDashboard() {
  const { user } = useAuth();
  const [partner, setPartner] = useState(null);
  const [applications, setApplications] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loans, setLoans] = useState([]);
  const [repayments, setRepayments] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [aiAnalyses, setAiAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    base44.entities.PartnerProfile.filter({ created_by: user.email }).then(async ([p]) => {
      setPartner(p || null);
      if (!p) { setLoading(false); return; }
      const apps = await base44.entities.LoanApplication.filter({ partnerProfileId: p.id });
      const appIds = apps.map(a => a.id);
      const [grps, lns, docs, ais] = await Promise.all([
        base44.entities.BorrowerGroup.filter({ partnerProfileId: p.id }),
        base44.entities.Loan.filter({ partnerProfileId: p.id }),
        base44.entities.Document.list(),
        base44.entities.AIAnalysis.filter({ partnerProfileId: p.id }),
      ]);
      const loanIds = lns.map(l => l.id);
      const rpys = loanIds.length ? await base44.entities.Repayment.list() : [];
      setApplications(apps); setGroups(grps); setLoans(lns);
      setDocuments(docs.filter(d => appIds.includes(d.applicationId)));
      setRepayments(rpys.filter(r => loanIds.includes(r.loanId)));
      setAiAnalyses(ais);
      setLoading(false);
    });
  }, [user]);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

  if (!partner) {
    return (
      <div className="space-y-4 max-w-xl">
        <h1 className="text-2xl font-display font-bold">Partner Dashboard</h1>
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
          <p className="font-semibold">Partner profile not set up</p>
          <p className="mt-1">Contact a CrediFlow admin to create your partner institution profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-display font-bold">{partner.institutionName}</h1>
        <p className="text-sm text-muted-foreground mt-1">Partner dashboard overview</p>
      </div>
      <RoleScopeNote role="partner" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard label="Assigned Applications" value={applications.length} icon={FileText} />
        <MetricCard label="Ready for Review" value={applications.filter(a => a.status === 'Ready for partner' || a.status === 'Sent to partner').length} icon={Clock} color="text-secondary" />
        <MetricCard label="Needs More Info" value={applications.filter(a => a.partnerDecision === 'More information needed').length} icon={AlertTriangle} color="text-amber-500" />
        <MetricCard label="Approved" value={applications.filter(a => a.partnerDecision === 'Approved').length} icon={CheckCircle} color="text-emerald-600" />
        <MetricCard label="Rejected" value={applications.filter(a => a.partnerDecision === 'Rejected').length} icon={XCircle} color="text-red-500" />
        <MetricCard label="Active Groups" value={groups.length} icon={Users} />
        <MetricCard label="Late Repayments" value={repayments.filter(r => r.status === 'Late' || r.status === 'Missed').length} icon={CreditCard} color="text-red-500" />
        <MetricCard label="Pending Doc Reviews" value={documents.filter(d => d.status === 'Uploaded' || d.status === 'Under review').length} icon={FileSearch} />
      </div>
      <ComplianceDisclaimer variant="partner" />
    </div>
  );
}