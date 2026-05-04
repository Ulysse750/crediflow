import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AlertTriangle } from 'lucide-react';

export default function AdminRiskFlags() {
  const [flags, setFlags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.RiskFlag.list('-created_date').then(f => { setFlags(f); setLoading(false); });
  }, []);

  const resolve = async (id) => {
    await base44.entities.RiskFlag.update(id, { status: 'Resolved', resolvedAt: new Date().toISOString() });
    setFlags(prev => prev.map(f => f.id === id ? { ...f, status: 'Resolved' } : f));
    toast.success('Flag resolved');
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

  const open = flags.filter(f => f.status === 'Open');
  const resolved = flags.filter(f => f.status === 'Resolved');

  return (
    <div className="space-y-6">
      <PageHeader title="Risk Flags" description={`${open.length} open · ${resolved.length} resolved`} />
      <ComplianceDisclaimer variant="risk" />
      <div className="space-y-2">
        <p className="text-sm font-semibold text-foreground flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500" /> Open flags</p>
        {open.length === 0 && <p className="text-sm text-muted-foreground">No open flags.</p>}
        {open.map(f => (
          <div key={f.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-amber-200 bg-amber-50/50 rounded-xl text-sm">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium">{f.flagType}</span>
                <StatusChip status={f.severity} />
                <span className="text-xs text-muted-foreground">— {f.borrowerEmail}</span>
              </div>
              <p className="text-muted-foreground text-xs">{f.explanation}</p>
              <p className="text-xs text-muted-foreground">Source: {f.source}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => resolve(f.id)}>Resolve</Button>
          </div>
        ))}
      </div>
      {resolved.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-muted-foreground">Resolved flags</p>
          {resolved.map(f => (
            <div key={f.id} className="flex items-center justify-between gap-3 p-3 border border-border rounded-xl text-sm bg-muted/20">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium">{f.flagType}</span>
                  <StatusChip status={f.severity} />
                  <StatusChip status="Resolved" />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{f.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}