import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/useAuth';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/shared/PageHeader';
import StatusChip from '@/components/shared/StatusChip';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Upload, FileText, AlertCircle, CheckCircle2, Info } from 'lucide-react';

const REQUIRED_DOCS = [
  { type: 'Government-issued ID', required: true, description: 'Any valid Philippine government ID (PhilSys, SSS, GSIS, Postal, Voter\'s ID, Driver\'s License, Passport).', hint: 'At least one clear, unexpired ID is required.' },
  { type: 'Proof of income or livelihood', required: true, description: 'Document supporting your stated income — barangay certification, business permit, DTI registration, sales receipts, farm records, employment certificate.', hint: 'Choose the document that best fits your livelihood.' },
];

const OPTIONAL_DOCS = [
  { type: 'Business proof (if applicable)', description: 'Additional support for business income — mayor\'s permit, DTI registration, BIR certificate, store photos.' },
  { type: 'Group agreement', description: 'Signed group solidarity or co-guarantee agreement.' },
];

export default function BorrowerDocuments() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(null);
  const fileInputRef = useRef(null);
  const [pendingType, setPendingType] = useState(null);

  useEffect(() => {
    if (!user) return;
    base44.entities.Document.filter({ borrowerEmail: user.email }).then(setDocuments);
  }, [user]);

  const getDoc = (type) => documents.find(d => d.type === type);

  const handleUploadClick = (type) => {
    setPendingType(type);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !pendingType) return;
    setUploading(pendingType);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    const existing = getDoc(pendingType);
    const docData = {
      borrowerEmail: user.email,
      type: pendingType,
      status: 'Uploaded',
      fileUrl: file_url,
      fileName: file.name,
    };
    if (existing) {
      await base44.entities.Document.update(existing.id, docData);
      setDocuments(prev => prev.map(d => d.id === existing.id ? { ...d, ...docData } : d));
    } else {
      const created = await base44.entities.Document.create(docData);
      setDocuments(prev => [...prev, created]);
    }
    setUploading(null);
    toast.success(`${pendingType} uploaded successfully`);
    fileInputRef.current.value = '';
  };

  const renderDocCard = (docDef, isOptional = false) => {
    const doc = getDoc(docDef.type);
    const status = doc?.status || 'Not uploaded';
    const needsAction = ['Not uploaded', 'Rejected', 'Needs replacement'].includes(status);
    const isApproved = status === 'Approved';

    return (
      <Card key={docDef.type} className={needsAction && !isOptional ? 'border-amber-200' : isApproved ? 'border-secondary/30' : isOptional ? 'border-dashed' : ''}>
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              {isApproved ? <CheckCircle2 className="w-5 h-5 mt-0.5 text-secondary shrink-0" /> : <FileText className={`w-5 h-5 mt-0.5 shrink-0 ${needsAction && !isOptional ? 'text-amber-500' : 'text-muted-foreground'}`} />}
              <div>
                <p className="font-medium text-sm">{docDef.type} {docDef.required && <span className="text-xs text-destructive font-normal">*required</span>}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{docDef.description}</p>
                {docDef.hint && <p className="text-xs text-primary mt-0.5 font-medium">{docDef.hint}</p>}
                <div className="flex items-center gap-2 mt-1.5">
                  <StatusChip status={status} />
                  {doc?.fileName && <span className="text-xs text-muted-foreground">{doc.fileName}</span>}
                </div>
                {doc?.notes && <p className="text-xs text-amber-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3 shrink-0" /> {doc.notes}</p>}
              </div>
            </div>
            {(needsAction || status === 'Uploaded') && (
              <Button variant={isOptional ? 'ghost' : 'outline'} size="sm" className="gap-1 shrink-0" disabled={uploading === docDef.type} onClick={() => handleUploadClick(docDef.type)}>
                <Upload className="w-3 h-3" /> {uploading === docDef.type ? 'Uploading…' : needsAction ? 'Upload' : 'Replace'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Documents" description="Upload the documents required for your application" />
      <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />

      <div className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/50 border border-border/50 text-xs text-muted-foreground">
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
        <p>These are the standard documents used in the CrediFlow workflow. The exact requirements may be confirmed by your assigned lending partner.</p>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-foreground mb-2">Required documents</h2>
        <div className="space-y-3">{REQUIRED_DOCS.map(d => renderDocCard(d))}</div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-foreground mb-2">Optional — upload if available</h2>
        <div className="space-y-3">{OPTIONAL_DOCS.map(d => renderDocCard(d, true))}</div>
      </div>
    </div>
  );
}