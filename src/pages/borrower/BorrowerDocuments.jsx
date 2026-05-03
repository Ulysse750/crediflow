import React from 'react';
import { useDemoAuth } from '@/lib/demoAuth';
import { getBorrowerData } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Upload, FileText, AlertCircle, CheckCircle2, Info } from 'lucide-react';

// Required documents scoped to Philippines group-lending context.
// These are practical examples — the exact list will depend on the lending partner.
const REQUIRED_DOCS = [
  {
    type: 'Government-issued ID',
    required: true,
    description: "Any valid Philippine government ID (e.g. PhilSys, SSS, GSIS, Postal, Voter\u2019s ID, Driver\u2019s License, Passport).",
    hint: 'At least one clear, unexpired ID is required.',
  },
  {
    type: 'Proof of income or livelihood',
    required: true,
    description: 'Document supporting your stated income — e.g. barangay certification, business permit, DTI registration, sales receipts, farm records, employment certificate.',
    hint: 'Choose the document that best fits your livelihood. Farmers may submit barangay certification or harvest records.',
  },
];

const OPTIONAL_DOCS = [
  {
    type: 'Business proof (if applicable)',
    description: 'Additional support for business income — e.g. mayor\'s permit, DTI registration, BIR certificate, store photos.',
  },
  {
    type: 'Group agreement',
    description: 'Signed group solidarity or co-guarantee agreement, if your group has prepared one.',
  },
];

// Map back to stored document types
const TYPE_MAP = {
  'Government-issued ID': 'Government-issued ID',
  'Proof of income or livelihood': 'Business proof',
  'Business proof (if applicable)': 'Business proof',
  'Group agreement': 'Group agreement',
};

export default function BorrowerDocuments() {
  const { user } = useDemoAuth();
  const { documents } = getBorrowerData(user.borrowerId);

  const getDocByType = (type) => {
    const mapped = TYPE_MAP[type] || type;
    return documents.find(d => d.type === mapped || d.type === type);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Documents" description="Upload the documents required for your application" />

      {/* Scope disclaimer */}
      <div className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/50 border border-border/50 text-xs text-muted-foreground">
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
        <p>
          These are the standard documents used in the CrediFlow workflow. The exact requirements for your loan may be confirmed by your assigned lending partner. Additional documents are not legally required by CrediFlow.
        </p>
      </div>

      {/* Required documents */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-2">Required documents</h2>
        <div className="space-y-3">
          {REQUIRED_DOCS.map(docDef => {
            const doc = getDocByType(docDef.type);
            const status = doc?.status || 'Not uploaded';
            const needsAction = ['Not uploaded', 'Rejected', 'Needs replacement'].includes(status);
            const isApproved = status === 'Approved';

            return (
              <Card key={docDef.type} className={needsAction ? 'border-amber-200' : isApproved ? 'border-secondary/30' : ''}>
                <CardContent className="py-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {isApproved
                        ? <CheckCircle2 className="w-5 h-5 mt-0.5 text-secondary shrink-0" />
                        : <FileText className={`w-5 h-5 mt-0.5 shrink-0 ${needsAction ? 'text-amber-500' : 'text-muted-foreground'}`} />
                      }
                      <div>
                        <p className="font-medium text-sm">{docDef.type} <span className="text-xs text-destructive font-normal">*required</span></p>
                        <p className="text-xs text-muted-foreground mt-0.5">{docDef.description}</p>
                        {docDef.hint && <p className="text-xs text-primary mt-0.5 font-medium">{docDef.hint}</p>}
                        <div className="flex items-center gap-2 mt-1.5">
                          <StatusChip status={status} />
                          {doc?.fileName && <span className="text-xs text-muted-foreground">{doc.fileName}</span>}
                        </div>
                        {doc?.notes && (
                          <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" /> {doc.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    {(needsAction || status === 'Uploaded') && (
                      <Button variant="outline" size="sm" className="gap-1 shrink-0" onClick={() => toast.success(`Upload placeholder for ${docDef.type} (demo)`)}>
                        <Upload className="w-3 h-3" /> {needsAction ? 'Upload' : 'Replace'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Optional documents */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-2">Optional — upload if available</h2>
        <div className="space-y-3">
          {OPTIONAL_DOCS.map(docDef => {
            const doc = getDocByType(docDef.type);
            const status = doc?.status || 'Not uploaded';
            const isApproved = status === 'Approved';

            return (
              <Card key={docDef.type} className={isApproved ? 'border-secondary/30' : 'border-dashed'}>
                <CardContent className="py-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {isApproved
                        ? <CheckCircle2 className="w-5 h-5 mt-0.5 text-secondary shrink-0" />
                        : <FileText className="w-5 h-5 mt-0.5 text-muted-foreground shrink-0" />
                      }
                      <div>
                        <p className="font-medium text-sm">{docDef.type}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{docDef.description}</p>
                        <div className="mt-1.5">
                          <StatusChip status={status} />
                        </div>
                      </div>
                    </div>
                    {status === 'Not uploaded' && (
                      <Button variant="ghost" size="sm" className="gap-1 shrink-0 text-muted-foreground" onClick={() => toast.success(`Upload placeholder for ${docDef.type} (demo)`)}>
                        <Upload className="w-3 h-3" /> Upload
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}