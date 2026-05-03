import React from 'react';
import { Badge } from '@/components/ui/badge';

const STATUS_STYLES = {
  // Application
  'Draft': 'bg-muted text-muted-foreground border-border',
  'Submitted': 'bg-blue-50 text-blue-700 border-blue-200',
  'Needs more information': 'bg-amber-50 text-amber-700 border-amber-200',
  'Under CrediFlow review': 'bg-purple-50 text-purple-700 border-purple-200',
  'Ready for partner': 'bg-teal-50 text-teal-700 border-teal-200',
  'Sent to partner': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Closed': 'bg-gray-100 text-gray-600 border-gray-200',
  // Partner decisions
  'Pending': 'bg-muted text-muted-foreground border-border',
  'Approved': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Rejected': 'bg-red-50 text-red-700 border-red-200',
  'More information needed': 'bg-amber-50 text-amber-700 border-amber-200',
  'Disbursed': 'bg-green-50 text-green-700 border-green-200',
  // Document
  'Not uploaded': 'bg-gray-100 text-gray-500 border-gray-200',
  'Uploaded': 'bg-blue-50 text-blue-700 border-blue-200',
  'Under review': 'bg-purple-50 text-purple-700 border-purple-200',
  'Needs replacement': 'bg-orange-50 text-orange-700 border-orange-200',
  'AI analysis pending': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'AI analysis completed': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  // Loan
  'Active': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Fully repaid': 'bg-green-50 text-green-700 border-green-200',
  'Late': 'bg-red-50 text-red-700 border-red-200',
  'Restructured': 'bg-amber-50 text-amber-700 border-amber-200',
  'Defaulted': 'bg-red-100 text-red-800 border-red-300',
  // Repayment
  'Upcoming': 'bg-blue-50 text-blue-600 border-blue-200',
  'Paid': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Partially paid': 'bg-amber-50 text-amber-700 border-amber-200',
  'Missed': 'bg-red-100 text-red-800 border-red-300',
  'Rescheduled': 'bg-purple-50 text-purple-700 border-purple-200',
  // Risk
  'Low': 'bg-green-50 text-green-700 border-green-200',
  'Medium': 'bg-amber-50 text-amber-700 border-amber-200',
  'High': 'bg-red-50 text-red-700 border-red-200',
  // Support
  'New': 'bg-blue-50 text-blue-700 border-blue-200',
  'In progress': 'bg-purple-50 text-purple-700 border-purple-200',
  'Waiting for borrower': 'bg-amber-50 text-amber-700 border-amber-200',
  'Waiting for partner': 'bg-orange-50 text-orange-700 border-orange-200',
  'Resolved': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  // Consent
  'Accepted': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  // Group
  'Forming': 'bg-blue-50 text-blue-700 border-blue-200',
  'Ready': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Incomplete': 'bg-amber-50 text-amber-700 border-amber-200',
  // General
  'Open': 'bg-blue-50 text-blue-700 border-blue-200',
  'None': 'bg-muted text-muted-foreground border-border',
  'completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'pending': 'bg-amber-50 text-amber-700 border-amber-200',
  'failed': 'bg-red-50 text-red-700 border-red-200',
};

export default function StatusChip({ status }) {
  if (!status) return null;
  const style = STATUS_STYLES[status] || 'bg-muted text-muted-foreground border-border';
  return (
    <Badge variant="outline" className={`${style} font-medium text-xs whitespace-nowrap`}>
      {status}
    </Badge>
  );
}