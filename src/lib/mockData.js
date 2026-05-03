// ============================================================
// CrediFlow Demo Data
// ============================================================

export const DEMO_USERS = {
  'borrower@crediflow.demo': {
    email: 'borrower@crediflow.demo',
    password: 'borrower123',
    role: 'borrower',
    name: 'Maria Santos',
    borrowerId: 'BRW-001',
  },
  'partner@crediflow.demo': {
    email: 'partner@crediflow.demo',
    password: 'partner123',
    role: 'partner',
    name: 'Bayan Rural Bank',
    partnerId: 'PTR-001',
    institution: 'Bayan Rural Bank',
  },
  'admin@crediflow.demo': {
    email: 'admin@crediflow.demo',
    password: 'admin123',
    role: 'admin',
    name: 'CrediFlow Admin',
  },
};

export const BORROWERS = [
  { id: 'BRW-001', name: 'Maria Santos', phone: '+63 917 123 4567', email: 'maria@example.com', province: 'Cebu', city: 'Cebu City', barangay: 'Lahug', language: 'Cebuano', incomeSource: 'Sari-sari store', monthlyIncome: '₱15,000–₱25,000', householdSize: 4, mobileWallet: 'GCash', groupId: 'GRP-001', applicationStatus: 'Sent to partner', documentStatus: 'Approved', consentStatus: 'Accepted', supportStatus: 'Resolved', notes: '' },
  { id: 'BRW-002', name: 'Jose Reyes', phone: '+63 918 234 5678', email: 'jose@example.com', province: 'Leyte', city: 'Tacloban City', barangay: 'San Jose', language: 'Waray', incomeSource: 'Rice farming', monthlyIncome: '₱8,000–₱15,000', householdSize: 6, mobileWallet: 'GCash', groupId: 'GRP-002', applicationStatus: 'Needs more information', documentStatus: 'Needs replacement', consentStatus: 'Accepted', supportStatus: 'New', notes: '' },
  { id: 'BRW-003', name: 'Ana Cruz', phone: '+63 919 345 6789', email: 'ana@example.com', province: 'Laguna', city: 'Santa Rosa', barangay: 'Balibago', language: 'Tagalog', incomeSource: 'Online selling', monthlyIncome: '₱10,000–₱20,000', householdSize: 3, mobileWallet: 'Maya', groupId: 'GRP-003', applicationStatus: 'Under CrediFlow review', documentStatus: 'Under review', consentStatus: 'Pending', supportStatus: 'In progress', notes: '' },
  { id: 'BRW-004', name: 'Lorna Dela Peña', phone: '+63 920 456 7890', email: 'lorna@example.com', province: 'Cebu', city: 'Mandaue City', barangay: 'Banilad', language: 'Cebuano', incomeSource: 'Food vending', monthlyIncome: '₱12,000–₱18,000', householdSize: 5, mobileWallet: 'GCash', groupId: 'GRP-001', applicationStatus: 'Ready for partner', documentStatus: 'Approved', consentStatus: 'Accepted', supportStatus: 'None', notes: '' },
  { id: 'BRW-005', name: 'Carlo Mendoza', phone: '+63 921 567 8901', email: 'carlo@example.com', province: 'Davao', city: 'Davao City', barangay: 'Buhangin', language: 'Bisaya', incomeSource: 'Tricycle driving', monthlyIncome: '₱8,000–₱12,000', householdSize: 4, mobileWallet: 'GCash', groupId: 'GRP-004', applicationStatus: 'Submitted', documentStatus: 'Uploaded', consentStatus: 'Accepted', supportStatus: 'None', notes: '' },
  { id: 'BRW-006', name: 'Elena Garcia', phone: '+63 922 678 9012', email: 'elena@example.com', province: 'Laguna', city: 'San Pedro', barangay: 'Poblacion', language: 'Tagalog', incomeSource: 'Laundry service', monthlyIncome: '₱10,000–₱15,000', householdSize: 3, mobileWallet: 'Maya', groupId: 'GRP-003', applicationStatus: 'Approved', documentStatus: 'Approved', consentStatus: 'Accepted', supportStatus: 'Resolved', notes: '' },
  { id: 'BRW-007', name: 'Ramon Villanueva', phone: '+63 923 789 0123', email: 'ramon@example.com', province: 'Leyte', city: 'Ormoc City', barangay: 'Cogon', language: 'Waray', incomeSource: 'Coconut farming', monthlyIncome: '₱6,000–₱12,000', householdSize: 7, mobileWallet: 'GCash', groupId: 'GRP-002', applicationStatus: 'Draft', documentStatus: 'Not uploaded', consentStatus: 'Pending', supportStatus: 'None', notes: '' },
  { id: 'BRW-008', name: 'Grace Bautista', phone: '+63 924 890 1234', email: 'grace@example.com', province: 'Davao', city: 'Tagum City', barangay: 'Magugpo', language: 'Bisaya', incomeSource: 'Market vending', monthlyIncome: '₱10,000–₱18,000', householdSize: 4, mobileWallet: 'GCash', groupId: 'GRP-004', applicationStatus: 'Rejected', documentStatus: 'Rejected', consentStatus: 'Accepted', supportStatus: 'Waiting for borrower', notes: '' },
];

export const GROUPS = [
  { id: 'GRP-001', name: 'Cebu Growth Circle', leader: 'Maria Santos', memberIds: ['BRW-001', 'BRW-004'], location: 'Cebu City', status: 'Active', partnerId: 'PTR-001', purpose: 'Business capital support', code: 'CGC-2024', readiness: 'Ready' },
  { id: 'GRP-002', name: 'Harvest Group', leader: 'Jose Reyes', memberIds: ['BRW-002', 'BRW-007'], location: 'Leyte', status: 'Active', partnerId: 'PTR-001', purpose: 'Farming inputs', code: 'HRV-2024', readiness: 'Incomplete' },
  { id: 'GRP-003', name: 'Laguna Sellers', leader: 'Ana Cruz', memberIds: ['BRW-003', 'BRW-006'], location: 'Laguna', status: 'Forming', partnerId: 'PTR-002', purpose: 'Online business capital', code: 'LGS-2024', readiness: 'Pending' },
  { id: 'GRP-004', name: 'Davao Food Vendors', leader: 'Carlo Mendoza', memberIds: ['BRW-005', 'BRW-008'], location: 'Davao City', status: 'Active', partnerId: 'PTR-003', purpose: 'Food vending capital', code: 'DFV-2024', readiness: 'Pending' },
];

export const PARTNERS = [
  { id: 'PTR-001', name: 'Bayan Rural Bank', type: 'Rural bank', contact: 'Juan Dela Cruz', email: 'juan@bayanrb.com', region: 'Visayas', status: 'Active', assignedApplications: 4 },
  { id: 'PTR-002', name: 'Kapwa Microfinance', type: 'Microfinance institution', contact: 'Rosa Lim', email: 'rosa@kapwamf.com', region: 'Luzon', status: 'Active', assignedApplications: 2 },
  { id: 'PTR-003', name: 'Unity Cooperative', type: 'Cooperative', contact: 'Pedro Tan', email: 'pedro@unitycoop.com', region: 'Mindanao', status: 'Active', assignedApplications: 2 },
];

export const APPLICATIONS = [
  { id: 'APP-001', borrowerId: 'BRW-001', groupId: 'GRP-001', partnerId: 'PTR-001', amount: 25000, purpose: 'Business capital', repaymentPeriod: '3–6 months', repaymentFrequency: 'Monthly', incomeSource: 'Sari-sari store', existingDebt: 'No', existingDebtDetails: '', repaymentSource: 'Daily store sales', status: 'Sent to partner', partnerDecision: 'Approved', riskLevel: 'Low', consentGiven: true, createdAt: '2024-11-15' },
  { id: 'APP-002', borrowerId: 'BRW-002', groupId: 'GRP-002', partnerId: 'PTR-001', amount: 15000, purpose: 'Farming inputs', repaymentPeriod: 'Seasonal', repaymentFrequency: 'Seasonal', incomeSource: 'Rice farming', existingDebt: 'Prefer not to say', existingDebtDetails: '', repaymentSource: 'Harvest sales', status: 'Needs more information', partnerDecision: 'More information needed', riskLevel: 'Medium', consentGiven: true, createdAt: '2024-12-01' },
  { id: 'APP-003', borrowerId: 'BRW-003', groupId: 'GRP-003', partnerId: 'PTR-002', amount: 20000, purpose: 'Business capital', repaymentPeriod: '3–6 months', repaymentFrequency: 'Monthly', incomeSource: 'Online selling', existingDebt: 'Yes', existingDebtDetails: 'Small personal loan from relative', repaymentSource: 'Monthly online sales', status: 'Under CrediFlow review', partnerDecision: 'Pending', riskLevel: 'Medium', consentGiven: false, createdAt: '2024-12-10' },
  { id: 'APP-004', borrowerId: 'BRW-004', groupId: 'GRP-001', partnerId: 'PTR-001', amount: 18000, purpose: 'Business capital', repaymentPeriod: '3–6 months', repaymentFrequency: 'Every 2 weeks', incomeSource: 'Food vending', existingDebt: 'No', existingDebtDetails: '', repaymentSource: 'Daily food sales', status: 'Ready for partner', partnerDecision: 'Pending', riskLevel: 'Low', consentGiven: true, createdAt: '2024-12-05' },
  { id: 'APP-005', borrowerId: 'BRW-005', groupId: 'GRP-004', partnerId: 'PTR-003', amount: 10000, purpose: 'Personal consumption', repaymentPeriod: '1–3 months', repaymentFrequency: 'Weekly', incomeSource: 'Tricycle driving', existingDebt: 'Yes', existingDebtDetails: 'Informal loan from neighbor', repaymentSource: 'Daily tricycle income', status: 'Submitted', partnerDecision: 'Pending', riskLevel: 'High', consentGiven: true, createdAt: '2024-12-15' },
  { id: 'APP-006', borrowerId: 'BRW-006', groupId: 'GRP-003', partnerId: 'PTR-002', amount: 12000, purpose: 'Business capital', repaymentPeriod: '3–6 months', repaymentFrequency: 'Monthly', incomeSource: 'Laundry service', existingDebt: 'No', existingDebtDetails: '', repaymentSource: 'Monthly laundry revenue', status: 'Sent to partner', partnerDecision: 'Approved', riskLevel: 'Low', consentGiven: true, createdAt: '2024-11-20' },
  { id: 'APP-007', borrowerId: 'BRW-007', groupId: 'GRP-002', partnerId: null, amount: 8000, purpose: 'Farming inputs', repaymentPeriod: 'Seasonal', repaymentFrequency: 'Seasonal', incomeSource: 'Coconut farming', existingDebt: 'No', existingDebtDetails: '', repaymentSource: 'Copra sales', status: 'Draft', partnerDecision: 'Pending', riskLevel: 'Medium', consentGiven: false, createdAt: '2024-12-18' },
  { id: 'APP-008', borrowerId: 'BRW-008', groupId: 'GRP-004', partnerId: 'PTR-003', amount: 15000, purpose: 'Business capital', repaymentPeriod: '3–6 months', repaymentFrequency: 'Monthly', incomeSource: 'Market vending', existingDebt: 'Yes', existingDebtDetails: 'Existing loan with lending company', repaymentSource: 'Daily market sales', status: 'Sent to partner', partnerDecision: 'Rejected', riskLevel: 'High', consentGiven: true, createdAt: '2024-11-25' },
];

export const DOCUMENTS = [
  { id: 'DOC-001', borrowerId: 'BRW-001', applicationId: 'APP-001', type: 'ID document', status: 'Approved', aiStatus: 'AI analysis completed', uploadedAt: '2024-11-16', fileName: 'maria_id.pdf' },
  { id: 'DOC-002', borrowerId: 'BRW-001', applicationId: 'APP-001', type: 'Business proof', status: 'Approved', aiStatus: 'AI analysis completed', uploadedAt: '2024-11-16', fileName: 'maria_business.pdf' },
  { id: 'DOC-003', borrowerId: 'BRW-002', applicationId: 'APP-002', type: 'ID document', status: 'Uploaded', aiStatus: 'AI analysis completed', uploadedAt: '2024-12-02', fileName: 'jose_id.pdf' },
  { id: 'DOC-004', borrowerId: 'BRW-002', applicationId: 'APP-002', type: 'Farming proof', status: 'Needs replacement', aiStatus: 'AI analysis completed', uploadedAt: null, fileName: null },
  { id: 'DOC-005', borrowerId: 'BRW-003', applicationId: 'APP-003', type: 'Business proof', status: 'Under review', aiStatus: 'AI analysis pending', uploadedAt: '2024-12-11', fileName: 'ana_business.pdf' },
  { id: 'DOC-006', borrowerId: 'BRW-003', applicationId: 'APP-003', type: 'Consent form', status: 'Not uploaded', aiStatus: null, uploadedAt: null, fileName: null },
  { id: 'DOC-007', borrowerId: 'BRW-004', applicationId: 'APP-004', type: 'ID document', status: 'Approved', aiStatus: 'AI analysis completed', uploadedAt: '2024-12-06', fileName: 'lorna_id.pdf' },
  { id: 'DOC-008', borrowerId: 'BRW-005', applicationId: 'APP-005', type: 'ID document', status: 'Uploaded', aiStatus: null, uploadedAt: '2024-12-16', fileName: 'carlo_id.pdf' },
  { id: 'DOC-009', borrowerId: 'BRW-006', applicationId: 'APP-006', type: 'ID document', status: 'Approved', aiStatus: 'AI analysis completed', uploadedAt: '2024-11-21', fileName: 'elena_id.pdf' },
  { id: 'DOC-010', borrowerId: 'BRW-008', applicationId: 'APP-008', type: 'ID document', status: 'Rejected', aiStatus: null, uploadedAt: '2024-11-26', fileName: 'grace_id_blurry.pdf' },
];

export const CONSENT_RECORDS = [
  { id: 'CON-001', borrowerId: 'BRW-001', status: 'Accepted', acceptedAt: '2024-11-15', policyVersion: 'v1.0' },
  { id: 'CON-002', borrowerId: 'BRW-002', status: 'Accepted', acceptedAt: '2024-12-01', policyVersion: 'v1.0' },
  { id: 'CON-003', borrowerId: 'BRW-003', status: 'Pending', acceptedAt: null, policyVersion: 'v1.0' },
  { id: 'CON-004', borrowerId: 'BRW-004', status: 'Accepted', acceptedAt: '2024-12-05', policyVersion: 'v1.0' },
  { id: 'CON-005', borrowerId: 'BRW-005', status: 'Accepted', acceptedAt: '2024-12-15', policyVersion: 'v1.0' },
  { id: 'CON-006', borrowerId: 'BRW-006', status: 'Accepted', acceptedAt: '2024-11-20', policyVersion: 'v1.0' },
  { id: 'CON-007', borrowerId: 'BRW-007', status: 'Pending', acceptedAt: null, policyVersion: 'v1.0' },
  { id: 'CON-008', borrowerId: 'BRW-008', status: 'Accepted', acceptedAt: '2024-11-25', policyVersion: 'v1.0' },
];

export const LOANS = [
  { id: 'LN-001', borrowerId: 'BRW-001', applicationId: 'APP-001', groupId: 'GRP-001', partnerId: 'PTR-001', approvedAmount: 25000, disbursementDate: '2024-12-01', repaymentFrequency: 'Monthly', status: 'Active', partnerName: 'Bayan Rural Bank' },
  { id: 'LN-002', borrowerId: 'BRW-006', applicationId: 'APP-006', groupId: 'GRP-003', partnerId: 'PTR-002', approvedAmount: 12000, disbursementDate: '2024-12-10', repaymentFrequency: 'Monthly', status: 'Active', partnerName: 'Kapwa Microfinance' },
  { id: 'LN-003', borrowerId: 'BRW-004', applicationId: 'APP-004', groupId: 'GRP-001', partnerId: 'PTR-001', approvedAmount: 18000, disbursementDate: null, repaymentFrequency: 'Every 2 weeks', status: 'Approved', partnerName: 'Bayan Rural Bank' },
];

export const REPAYMENTS = [
  { id: 'RPY-001', loanId: 'LN-001', borrowerId: 'BRW-001', dueDate: '2025-01-01', amountDue: 4500, amountPaid: 4500, status: 'Paid' },
  { id: 'RPY-002', loanId: 'LN-001', borrowerId: 'BRW-001', dueDate: '2025-02-01', amountDue: 4500, amountPaid: 4500, status: 'Paid' },
  { id: 'RPY-003', loanId: 'LN-001', borrowerId: 'BRW-001', dueDate: '2025-03-01', amountDue: 4500, amountPaid: 2000, status: 'Partially paid' },
  { id: 'RPY-004', loanId: 'LN-001', borrowerId: 'BRW-001', dueDate: '2025-04-01', amountDue: 4500, amountPaid: 0, status: 'Upcoming' },
  { id: 'RPY-005', loanId: 'LN-002', borrowerId: 'BRW-006', dueDate: '2025-01-10', amountDue: 2200, amountPaid: 2200, status: 'Paid' },
  { id: 'RPY-006', loanId: 'LN-002', borrowerId: 'BRW-006', dueDate: '2025-02-10', amountDue: 2200, amountPaid: 0, status: 'Late' },
  { id: 'RPY-007', loanId: 'LN-002', borrowerId: 'BRW-006', dueDate: '2025-03-10', amountDue: 2200, amountPaid: 0, status: 'Missed' },
  { id: 'RPY-008', loanId: 'LN-002', borrowerId: 'BRW-006', dueDate: '2025-04-10', amountDue: 2200, amountPaid: 0, status: 'Rescheduled' },
];

export const SUPPORT_REQUESTS = [
  { id: 'SUP-001', borrowerId: 'BRW-001', type: 'Application help', message: 'How do I check my application status?', status: 'Resolved', priority: 'Low', createdAt: '2024-11-20', resolvedAt: '2024-11-21', notes: 'Guided borrower to dashboard.' },
  { id: 'SUP-002', borrowerId: 'BRW-002', type: 'Document issue', message: 'I cannot upload my farming proof. The file is too large.', status: 'New', priority: 'Medium', createdAt: '2024-12-12', resolvedAt: null, notes: '' },
  { id: 'SUP-003', borrowerId: 'BRW-003', type: 'Group issue', message: 'How do I invite a new member to my group?', status: 'In progress', priority: 'Low', createdAt: '2024-12-14', resolvedAt: null, notes: 'Providing group code instructions.' },
  { id: 'SUP-004', borrowerId: 'BRW-005', type: 'Repayment issue', message: 'I made a payment but it does not show on my account.', status: 'Waiting for partner', priority: 'High', createdAt: '2024-12-18', resolvedAt: null, notes: 'Escalated to partner for manual update.' },
  { id: 'SUP-005', borrowerId: 'BRW-006', type: 'Data/privacy question', message: 'Can I request deletion of my data?', status: 'Resolved', priority: 'Medium', createdAt: '2024-12-10', resolvedAt: '2024-12-11', notes: 'Referred to data privacy policy.' },
  { id: 'SUP-006', borrowerId: 'BRW-008', type: 'Application help', message: 'Why was my application rejected?', status: 'Waiting for borrower', priority: 'High', createdAt: '2024-12-16', resolvedAt: null, notes: 'Waiting for borrower to provide additional documents.' },
];

export const RISK_FLAGS = [
  { id: 'RF-001', borrowerId: 'BRW-002', applicationId: 'APP-002', flagType: 'Missing documents', severity: 'Medium', source: 'AI document analysis', explanation: 'Farming proof not submitted.', status: 'Open', createdAt: '2024-12-05', resolvedAt: null },
  { id: 'RF-002', borrowerId: 'BRW-005', applicationId: 'APP-005', flagType: 'High requested amount', severity: 'Low', source: 'Manual', explanation: 'Amount relative to income is within moderate range but noted.', status: 'Open', createdAt: '2024-12-16', resolvedAt: null },
  { id: 'RF-003', borrowerId: 'BRW-005', applicationId: 'APP-005', flagType: 'Existing debt', severity: 'High', source: 'Admin review', explanation: 'Borrower disclosed existing informal loan. Repayment burden should be reviewed.', status: 'Open', createdAt: '2024-12-16', resolvedAt: null },
  { id: 'RF-004', borrowerId: 'BRW-003', applicationId: 'APP-003', flagType: 'Incomplete group', severity: 'Medium', source: 'Manual', explanation: 'Group has only 2 members. Minimum recommended is 3.', status: 'Open', createdAt: '2024-12-12', resolvedAt: null },
  { id: 'RF-005', borrowerId: 'BRW-008', applicationId: 'APP-008', flagType: 'Existing debt', severity: 'High', source: 'Partner note', explanation: 'Borrower has existing loan with another lending company.', status: 'Resolved', createdAt: '2024-12-01', resolvedAt: '2024-12-10' },
  { id: 'RF-006', borrowerId: 'BRW-002', applicationId: 'APP-002', flagType: 'Irregular income', severity: 'Medium', source: 'AI document analysis', explanation: 'Income is seasonal and crop-cycle evidence is missing.', status: 'Open', createdAt: '2024-12-05', resolvedAt: null },
  { id: 'RF-007', borrowerId: 'BRW-003', applicationId: 'APP-003', flagType: 'Data inconsistency', severity: 'Low', source: 'AI document analysis', explanation: 'Online selling income stated but supporting document is incomplete.', status: 'Open', createdAt: '2024-12-12', resolvedAt: null },
  { id: 'RF-008', borrowerId: 'BRW-007', applicationId: 'APP-007', flagType: 'Manual review needed', severity: 'Low', source: 'Admin review', explanation: 'Application is in draft. No documents uploaded yet.', status: 'Open', createdAt: '2024-12-19', resolvedAt: null },
];

export const AI_ANALYSES = [
  {
    id: 'AIA-001', applicationId: 'APP-001', borrowerId: 'BRW-001', createdAt: '2024-11-20', status: 'completed',
    documentsReviewed: ['ID document', 'Business proof'],
    missingDocuments: [],
    extractedSignals: { identity: 'ID document uploaded and readable', incomeEvidence: 'Sari-sari store revenue mentioned in application and business proof uploaded', businessEvidence: 'Business proof present', farmingEvidence: null, repaymentSourceEvidence: 'Daily store sales claimed' },
    inconsistencies: [],
    riskObservations: ['Income stability should be verified'],
    followUpQuestions: ['Confirm average weekly sales', 'Confirm whether income is seasonal'],
    reviewerSummary: 'Maria submitted complete basic documents for the demo application. Human reviewer should verify income stability, group membership, and repayment source before forwarding to partner.',
    humanReviewRequired: true,
    disclaimer: 'This AI-generated summary is a review aid only. It is not a credit decision, legal conclusion, fraud finding, or approval recommendation. Final decisions remain with licensed partners and human reviewers.'
  },
  {
    id: 'AIA-002', applicationId: 'APP-002', borrowerId: 'BRW-002', createdAt: '2024-12-05', status: 'completed',
    documentsReviewed: ['ID document'],
    missingDocuments: ['Farming proof'],
    extractedSignals: { identity: 'ID document uploaded', incomeEvidence: 'Farming income stated but not supported by uploaded farming proof', businessEvidence: null, farmingEvidence: 'Missing', repaymentSourceEvidence: 'Harvest sales claimed but not verifiable' },
    inconsistencies: ['Repayment period is seasonal but crop-cycle cash-flow evidence is missing'],
    riskObservations: ['Seasonal income without cash-flow documentation', 'Missing farming proof'],
    followUpQuestions: ['Upload farming proof', 'Provide expected harvest date', 'Provide estimated crop sale revenue'],
    reviewerSummary: 'Application requires additional documentation before partner review. Human reviewer should request farming proof and crop-cycle cash-flow details.',
    humanReviewRequired: true,
    disclaimer: 'This AI-generated summary is a review aid only. It is not a credit decision, legal conclusion, fraud finding, or approval recommendation. Final decisions remain with licensed partners and human reviewers.'
  },
  {
    id: 'AIA-003', applicationId: 'APP-003', borrowerId: 'BRW-003', createdAt: '2024-12-14', status: 'completed',
    documentsReviewed: ['Business proof (partial)'],
    missingDocuments: ['Valid business proof', 'Consent form'],
    extractedSignals: { identity: 'Not yet reviewed', incomeEvidence: 'Online selling income stated', businessEvidence: 'Partial - document incomplete', farmingEvidence: null, repaymentSourceEvidence: 'Monthly online sales claimed' },
    inconsistencies: ['Online selling income stated but supporting document incomplete'],
    riskObservations: ['Incomplete business documentation', 'Existing debt disclosed'],
    followUpQuestions: ['Upload clearer business proof', 'Confirm average monthly sales'],
    reviewerSummary: 'Application should remain in needs-more-information status until missing documents are replaced.',
    humanReviewRequired: true,
    disclaimer: 'This AI-generated summary is a review aid only. It is not a credit decision, legal conclusion, fraud finding, or approval recommendation. Final decisions remain with licensed partners and human reviewers.'
  },
];

// Helper functions for role-scoped data access
export function getBorrowerData(borrowerId) {
  const borrower = BORROWERS.find(b => b.id === borrowerId);
  const applications = APPLICATIONS.filter(a => a.borrowerId === borrowerId);
  const documents = DOCUMENTS.filter(d => d.borrowerId === borrowerId);
  const consent = CONSENT_RECORDS.find(c => c.borrowerId === borrowerId);
  const repayments = REPAYMENTS.filter(r => r.borrowerId === borrowerId);
  const support = SUPPORT_REQUESTS.filter(s => s.borrowerId === borrowerId);
  const group = GROUPS.find(g => g.memberIds.includes(borrowerId));
  const loans = LOANS.filter(l => l.borrowerId === borrowerId);
  return { borrower, applications, documents, consent, repayments, support, group, loans };
}

export function getPartnerData(partnerId) {
  const partner = PARTNERS.find(p => p.id === partnerId);
  const applications = APPLICATIONS.filter(a => a.partnerId === partnerId);
  const borrowerIds = [...new Set(applications.map(a => a.borrowerId))];
  const borrowers = BORROWERS.filter(b => borrowerIds.includes(b.id));
  const groups = GROUPS.filter(g => g.partnerId === partnerId);
  const documents = DOCUMENTS.filter(d => applications.some(a => a.id === d.applicationId));
  const loans = LOANS.filter(l => l.partnerId === partnerId);
  const loanIds = loans.map(l => l.id);
  const repayments = REPAYMENTS.filter(r => loanIds.includes(r.loanId));
  const aiAnalyses = AI_ANALYSES.filter(a => applications.some(app => app.id === a.applicationId));
  return { partner, applications, borrowers, groups, documents, loans, repayments, aiAnalyses };
}

export function getAdminData() {
  return {
    borrowers: BORROWERS,
    groups: GROUPS,
    partners: PARTNERS,
    applications: APPLICATIONS,
    documents: DOCUMENTS,
    consentRecords: CONSENT_RECORDS,
    loans: LOANS,
    repayments: REPAYMENTS,
    supportRequests: SUPPORT_REQUESTS,
    riskFlags: RISK_FLAGS,
    aiAnalyses: AI_ANALYSES,
  };
}

export function getBorrowerName(id) {
  return BORROWERS.find(b => b.id === id)?.name || id;
}

export function getPartnerName(id) {
  return PARTNERS.find(p => p.id === id)?.name || id || 'Unassigned';
}

export function getGroupName(id) {
  return GROUPS.find(g => g.id === id)?.name || id || 'No group';
}