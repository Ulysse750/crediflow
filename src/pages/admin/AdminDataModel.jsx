import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ENTITIES = [
  { name: 'User / Profile', fields: ['id', 'role (borrower/partner/admin)', 'fullName', 'email', 'phone', 'partnerId', 'createdAt'] },
  { name: 'Borrower', fields: ['id', 'userId', 'dateOfBirth', 'gender', 'civilStatus', 'nationality', 'phone', 'email', 'province', 'city', 'barangay', 'address', 'language', 'incomeSource', 'monthlyIncome', 'householdSize', 'dependents', 'educationLevel', 'employmentType', 'businessType', 'yearsInWork', 'mobileWallet', 'hasBankAccount', 'hasExistingLoans', 'emergencyContact', 'emergencyPhone', 'emergencyRelation', 'onboardingStatus', 'profileCompletion (%)', 'questionnaireCompletion (%)', 'documentsCompletion (%)', 'consentCompletion (%)', 'groupCompletion (%)'] },
  { name: 'BorrowerQuestionnaire', fields: ['id', 'borrowerId', 'answers (JSON object, all section answers)', 'completionStatus', 'updatedAt'] },
  { name: 'BorrowerDocument', fields: ['id', 'borrowerId', 'applicationId', 'type', 'fileName', 'fileUrl', 'status (Not uploaded/Uploaded/Under review/Approved/Rejected/Needs replacement/AI analysis pending/AI analysis completed)', 'aiStatus', 'uploadedAt', 'verifiedAt', 'notes'] },
  { name: 'BorrowerGroup', fields: ['id', 'name', 'code', 'leaderBorrowerId', 'memberIds (array)', 'location', 'purpose', 'status (Active/Forming/Incomplete)', 'partnerId', 'readiness'] },
  { name: 'Application', fields: ['id', 'borrowerId', 'groupId', 'partnerId', 'requestedAmount', 'purpose', 'repaymentPeriod', 'repaymentFrequency', 'incomeSource', 'existingDebt', 'existingDebtDetails', 'repaymentSource', 'additionalExplanation', 'status (Draft/Submitted/Needs more information/Under CrediFlow review/Ready for partner/Sent to partner/Partner reviewing/Approved by partner/Rejected by partner/Disbursed by partner/Closed)', 'partnerDecision', 'riskLevel', 'consentGiven', 'submittedAt', 'createdAt'] },
  { name: 'ConsentRecord', fields: ['id', 'borrowerId', 'applicationId', 'consentType', 'status', 'policyVersion', 'acceptedAt', 'privacyNotice (bool)', 'dataSharing (bool)', 'accuracyDeclaration (bool)', 'communicationsConsent (bool)'] },
  { name: 'AIAnalysisPrompt', fields: ['id', 'name', 'version', 'purpose', 'promptText', 'active (bool)', 'createdAt', 'updatedAt'] },
  { name: 'AIApplicantAnalysis', fields: ['id', 'applicationId', 'borrowerId', 'partnerId', 'promptId', 'promptVersion', 'status (pending/completed/failed)', 'documentsReviewed', 'missingDocuments', 'profileSummary', 'loanRequestSummary', 'incomeSummary', 'alternativeDataSummary', 'groupContextSummary', 'documentSummary', 'repaymentEvidence', 'inconsistencies', 'riskObservations', 'followUpQuestions', 'humanReviewSteps', 'partnerSummary', 'humanReviewRequired (bool)', 'disclaimer', 'createdAt', 'reviewedAt'] },
  { name: 'RiskFlag', fields: ['id', 'borrowerId', 'applicationId', 'flagType', 'severity (Low/Medium/High)', 'source', 'explanation', 'status (Open/Resolved)', 'createdAt', 'resolvedAt'] },
  { name: 'Partner', fields: ['id', 'name', 'type', 'contact', 'email', 'region', 'status (Active/Inactive)', 'assignedApplications (count)'] },
  { name: 'Loan', fields: ['id', 'borrowerId', 'applicationId', 'groupId', 'partnerId', 'approvedAmount', 'disbursementDate', 'repaymentFrequency', 'totalInstallments', 'status (Approved/Active/Fully repaid/Late/Defaulted/Restructured)', 'partnerName'] },
  { name: 'Repayment', fields: ['id', 'loanId', 'borrowerId', 'dueDate', 'amountDue', 'amountPaid', 'status (Upcoming/Paid/Partially paid/Late/Missed/Rescheduled)', 'paidAt'] },
  { name: 'SupportRequest', fields: ['id', 'borrowerId', 'applicationId', 'type', 'message', 'status (New/In progress/Waiting for borrower/Waiting for partner/Resolved)', 'priority (Low/Medium/High)', 'createdAt', 'resolvedAt', 'notes'] },
];

export default function AdminDataModel() {
  const [open, setOpen] = useState('Borrower');
  return (
    <div className="space-y-6">
      <PageHeader title="Data Model" description="Planned entity schema for the CrediFlow backend." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {ENTITIES.map(e => (
          <Card key={e.name} className={`cursor-pointer transition-all ${open === e.name ? 'border-secondary ring-1 ring-secondary/20' : ''}`} onClick={() => setOpen(open === e.name ? null : e.name)}>
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-display font-semibold">{e.name}</CardTitle>
            </CardHeader>
            {open === e.name && (
              <CardContent className="px-4 pb-4">
                <ul className="space-y-1">
                  {e.fields.map(f => (
                    <li key={f} className="text-xs text-muted-foreground font-mono bg-muted/40 px-2 py-0.5 rounded">{f}</li>
                  ))}
                </ul>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}