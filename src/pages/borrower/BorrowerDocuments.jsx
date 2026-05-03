import React from 'react';
import { useDemoAuth } from '@/lib/demoAuth';
import { getBorrowerData } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Upload, FileText, AlertCircle } from 'lucide-react';

const DOC_TYPES = ['ID document', 'Proof of income', 'Business proof', 'Farming proof', 'Group agreement', 'Consent form', 'Other'];

export default function BorrowerDocuments() {
  const { user } = useDemoAuth();
  const { documents } = getBorrowerData(user.borrowerId);

  const getDocByType = (type) => documents.find(d => d.type === type);

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Documents" description="Upload and track your required documents" />

      <div className="space-y-3">
        {DOC_TYPES.map(type => {
          const doc = getDocByType(type);
          const status = doc?.status || 'Not uploaded';
          const needsAction = ['Not uploaded', 'Rejected', 'Needs replacement'].includes(status);

          return (
            <Card key={type} className={needsAction ? 'border-amber-200' : ''}>
              <CardContent className="py-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <FileText className={`w-5 h-5 mt-0.5 ${needsAction ? 'text-amber-500' : 'text-muted-foreground'}`} />
                    <div>
                      <p className="font-medium text-sm">{type}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <StatusChip status={status} />
                        {doc?.fileName && <span className="text-xs text-muted-foreground">{doc.fileName}</span>}
                      </div>
                      {status === 'Rejected' && (
                        <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Please upload a replacement document.
                        </p>
                      )}
                      {status === 'Needs replacement' && (
                        <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> This document needs to be replaced. Please upload a new version.
                        </p>
                      )}
                    </div>
                  </div>
                  {needsAction && (
                    <Button variant="outline" size="sm" className="gap-1 shrink-0" onClick={() => toast.success(`Upload placeholder for ${type} (demo)`)}>
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
  );
}