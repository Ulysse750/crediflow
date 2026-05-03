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
  'borrower2@crediflow.demo': {
    email: 'borrower2@crediflow.demo',
    password: 'borrower123',
    role: 'borrower',
    name: 'Jose Reyes',
    borrowerId: 'BRW-002',
  },
  'partner@crediflow.demo': {
    email: 'partner@crediflow.demo',
    password: 'partner123',
    role: 'partner',
    name: 'Juan Dela Cruz',
    partnerId: 'PTR-001',
    institution: 'Bayan Rural Bank',
  },
  'partner2@crediflow.demo': {
    email: 'partner2@crediflow.demo',
    password: 'partner123',
    role: 'partner',
    name: 'Rosa Lim',
    partnerId: 'PTR-002',
    institution: 'Kapwa Microfinance',
  },
  'partner3@crediflow.demo': {
    email: 'partner3@crediflow.demo',
    password: 'partner123',
    role: 'partner',
    name: 'Pedro Tan',
    partnerId: 'PTR-003',
    institution: 'Unity Cooperative',
  },
  'admin@crediflow.demo': {
    email: 'admin@crediflow.demo',
    password: 'admin123',
    role: 'admin',
    name: 'CrediFlow Admin',
  },
};

export const BORROWERS = [
  { id: 'BRW-001', name: 'Maria Santos', dateOfBirth: '1988-04-12', gender: 'Female', civilStatus: 'Married', nationality: 'Filipino', phone: '+63 917 123 4567', email: 'maria@example.com', province: 'Cebu', city: 'Cebu City', barangay: 'Lahug', address: '12 Mahogany St, Lahug, Cebu City', language: 'Cebuano', incomeSource: 'Sari-sari store', monthlyIncome: '₱10,001–₱20,000', householdSize: 4, dependents: 2, educationLevel: 'High school graduate', employmentType: 'Self-employed', businessType: 'Retail', yearsInWork: '3–5 years', mobileWallet: 'GCash', hasBankAccount: true, hasExistingLoans: false, emergencyContact: 'Juan Santos', emergencyPhone: '+63 917 999 1111', emergencyRelation: 'Spouse', groupId: 'GRP-001', applicationStatus: 'Sent to partner', documentStatus: 'Approved', consentStatus: 'Accepted', onboardingStatus: 'Complete', profileCompletion: 100, questionnaireCompletion: 100, documentsCompletion: 100, consentCompletion: 100, groupCompletion: 100, notes: '' },
  { id: 'BRW-002', name: 'Jose Reyes', dateOfBirth: '1975-08-22', gender: 'Male', civilStatus: 'Married', nationality: 'Filipino', phone: '+63 918 234 5678', email: 'jose@example.com', province: 'Leyte', city: 'Tacloban City', barangay: 'San Jose', address: '45 Rice Field Road, San Jose, Tacloban City', language: 'Waray', incomeSource: 'Rice farming', monthlyIncome: '₱5,000–₱10,000', householdSize: 6, dependents: 4, educationLevel: 'Elementary graduate', employmentType: 'Farmer', businessType: null, yearsInWork: 'More than 5 years', mobileWallet: 'GCash', hasBankAccount: false, hasExistingLoans: 'Prefer not to say', emergencyContact: 'Lita Reyes', emergencyPhone: '+63 918 888 2222', emergencyRelation: 'Spouse', groupId: 'GRP-002', applicationStatus: 'Needs more information', documentStatus: 'Needs replacement', consentStatus: 'Accepted', onboardingStatus: 'Needs information', profileCompletion: 85, questionnaireCompletion: 80, documentsCompletion: 40, consentCompletion: 100, groupCompletion: 60, notes: '' },
  { id: 'BRW-003', name: 'Ana Cruz', dateOfBirth: '1993-01-30', gender: 'Female', civilStatus: 'Single', nationality: 'Filipino', phone: '+63 919 345 6789', email: 'ana@example.com', province: 'Laguna', city: 'Santa Rosa', barangay: 'Balibago', address: '78 Bougainvillea St, Balibago, Santa Rosa', language: 'Tagalog', incomeSource: 'Online selling', monthlyIncome: '₱10,001–₱20,000', householdSize: 3, dependents: 1, educationLevel: 'College graduate', employmentType: 'Self-employed', businessType: 'E-commerce', yearsInWork: '1–3 years', mobileWallet: 'Maya', hasBankAccount: true, hasExistingLoans: true, emergencyContact: 'Fe Cruz', emergencyPhone: '+63 919 777 3333', emergencyRelation: 'Mother', groupId: 'GRP-003', applicationStatus: 'Under CrediFlow review', documentStatus: 'Under review', consentStatus: 'Pending', onboardingStatus: 'In progress', profileCompletion: 75, questionnaireCompletion: 60, documentsCompletion: 50, consentCompletion: 0, groupCompletion: 40, notes: '' },
  { id: 'BRW-004', name: 'Lorna Dela Peña', dateOfBirth: '1985-11-05', gender: 'Female', civilStatus: 'Married', nationality: 'Filipino', phone: '+63 920 456 7890', email: 'lorna@example.com', province: 'Cebu', city: 'Mandaue City', barangay: 'Banilad', address: '22 Coral St, Banilad, Mandaue City', language: 'Cebuano', incomeSource: 'Food vending', monthlyIncome: '₱10,001–₱20,000', householdSize: 5, dependents: 3, educationLevel: 'High school graduate', employmentType: 'Self-employed', businessType: 'Food retail', yearsInWork: '3–5 years', mobileWallet: 'GCash', hasBankAccount: true, hasExistingLoans: false, emergencyContact: 'Ben Dela Peña', emergencyPhone: '+63 920 666 4444', emergencyRelation: 'Spouse', groupId: 'GRP-001', applicationStatus: 'Ready for partner', documentStatus: 'Approved', consentStatus: 'Accepted', onboardingStatus: 'Complete', profileCompletion: 100, questionnaireCompletion: 100, documentsCompletion: 100, consentCompletion: 100, groupCompletion: 100, notes: '' },
  { id: 'BRW-005', name: 'Carlo Mendoza', dateOfBirth: '1990-06-18', gender: 'Male', civilStatus: 'Single', nationality: 'Filipino', phone: '+63 921 567 8901', email: 'carlo@example.com', province: 'Davao', city: 'Davao City', barangay: 'Buhangin', address: '5 Durian Ave, Buhangin, Davao City', language: 'Bisaya', incomeSource: 'Tricycle driving', monthlyIncome: '₱5,000–₱10,000', householdSize: 4, dependents: 2, educationLevel: 'High school graduate', employmentType: 'Self-employed', businessType: 'Transport', yearsInWork: '3–5 years', mobileWallet: 'GCash', hasBankAccount: false, hasExistingLoans: true, emergencyContact: 'Rosa Mendoza', emergencyPhone: '+63 921 555 5555', emergencyRelation: 'Mother', groupId: 'GRP-004', applicationStatus: 'Submitted', documentStatus: 'Uploaded', consentStatus: 'Accepted', onboardingStatus: 'Complete', profileCompletion: 90, questionnaireCompletion: 100, documentsCompletion: 80, consentCompletion: 100, groupCompletion: 100, notes: '' },
  { id: 'BRW-006', name: 'Elena Garcia', dateOfBirth: '1982-03-27', gender: 'Female', civilStatus: 'Widowed', nationality: 'Filipino', phone: '+63 922 678 9012', email: 'elena@example.com', province: 'Laguna', city: 'San Pedro', barangay: 'Poblacion', address: '33 Sampaguita St, Poblacion, San Pedro', language: 'Tagalog', incomeSource: 'Laundry service', monthlyIncome: '₱10,001–₱20,000', householdSize: 3, dependents: 1, educationLevel: 'College graduate', employmentType: 'Self-employed', businessType: 'Services', yearsInWork: 'More than 5 years', mobileWallet: 'Maya', hasBankAccount: true, hasExistingLoans: false, emergencyContact: 'Pedro Garcia', emergencyPhone: '+63 922 444 6666', emergencyRelation: 'Brother', groupId: 'GRP-003', applicationStatus: 'Approved', documentStatus: 'Approved', consentStatus: 'Accepted', onboardingStatus: 'Complete', profileCompletion: 100, questionnaireCompletion: 100, documentsCompletion: 100, consentCompletion: 100, groupCompletion: 100, notes: '' },
  { id: 'BRW-007', name: 'Ramon Villanueva', dateOfBirth: '1970-09-14', gender: 'Male', civilStatus: 'Married', nationality: 'Filipino', phone: '+63 923 789 0123', email: 'ramon@example.com', province: 'Leyte', city: 'Ormoc City', barangay: 'Cogon', address: '9 Coconut Grove, Cogon, Ormoc City', language: 'Waray', incomeSource: 'Coconut farming', monthlyIncome: '₱5,000–₱10,000', householdSize: 7, dependents: 5, educationLevel: 'Elementary graduate', employmentType: 'Farmer', businessType: null, yearsInWork: 'More than 5 years', mobileWallet: 'GCash', hasBankAccount: false, hasExistingLoans: false, emergencyContact: 'Nena Villanueva', emergencyPhone: '+63 923 333 7777', emergencyRelation: 'Spouse', groupId: 'GRP-002', applicationStatus: 'Draft', documentStatus: 'Not uploaded', consentStatus: 'Pending', onboardingStatus: 'Not started', profileCompletion: 30, questionnaireCompletion: 0, documentsCompletion: 0, consentCompletion: 0, groupCompletion: 20, notes: '' },
  { id: 'BRW-008', name: 'Grace Bautista', dateOfBirth: '1991-12-09', gender: 'Female', civilStatus: 'Married', nationality: 'Filipino', phone: '+63 924 890 1234', email: 'grace@example.com', province: 'Davao', city: 'Tagum City', barangay: 'Magugpo', address: '16 Market Street, Magugpo, Tagum City', language: 'Bisaya', incomeSource: 'Market vending', monthlyIncome: '₱10,001–₱20,000', householdSize: 4, dependents: 2, educationLevel: 'High school graduate', employmentType: 'Self-employed', businessType: 'Market retail', yearsInWork: '3–5 years', mobileWallet: 'GCash', hasBankAccount: true, hasExistingLoans: true, emergencyContact: 'Tony Bautista', emergencyPhone: '+63 924 222 8888', emergencyRelation: 'Spouse', groupId: 'GRP-004', applicationStatus: 'Rejected', documentStatus: 'Rejected', consentStatus: 'Accepted', onboardingStatus: 'Needs information', profileCompletion: 80, questionnaireCompletion: 90, documentsCompletion: 30, consentCompletion: 100, groupCompletion: 100, notes: '' },
];

export const GROUPS = [
  { id: 'GRP-001', name: 'Cebu Growth Circle', leader: 'Maria Santos', leaderBorrowerId: 'BRW-001', memberIds: ['BRW-001', 'BRW-004'], location: 'Cebu City', status: 'Active', partnerId: 'PTR-001', purpose: 'Business capital support', code: 'CGC-2024', readiness: 'Ready' },
  { id: 'GRP-002', name: 'Harvest Group', leader: 'Jose Reyes', leaderBorrowerId: 'BRW-002', memberIds: ['BRW-002', 'BRW-007'], location: 'Leyte', status: 'Active', partnerId: 'PTR-001', purpose: 'Farming inputs', code: 'HRV-2024', readiness: 'Incomplete' },
  { id: 'GRP-003', name: 'Laguna Sellers', leader: 'Ana Cruz', leaderBorrowerId: 'BRW-003', memberIds: ['BRW-003', 'BRW-006'], location: 'Laguna', status: 'Forming', partnerId: 'PTR-002', purpose: 'Online business capital', code: 'LGS-2024', readiness: 'Pending' },
  { id: 'GRP-004', name: 'Davao Food Vendors', leader: 'Carlo Mendoza', leaderBorrowerId: 'BRW-005', memberIds: ['BRW-005', 'BRW-008'], location: 'Davao City', status: 'Active', partnerId: 'PTR-003', purpose: 'Food vending capital', code: 'DFV-2024', readiness: 'Pending' },
];

export const PARTNERS = [
  { id: 'PTR-001', name: 'Bayan Rural Bank', type: 'Rural bank', contact: 'Juan Dela Cruz', email: 'juan@bayanrb.com', region: 'Visayas', status: 'Active', assignedApplications: 4 },
  { id: 'PTR-002', name: 'Kapwa Microfinance', type: 'Microfinance institution', contact: 'Rosa Lim', email: 'rosa@kapwamf.com', region: 'Luzon', status: 'Active', assignedApplications: 2 },
  { id: 'PTR-003', name: 'Unity Cooperative', type: 'Cooperative', contact: 'Pedro Tan', email: 'pedro@unitycoop.com', region: 'Mindanao', status: 'Active', assignedApplications: 2 },
];

export const APPLICATIONS = [
  { id: 'APP-001', borrowerId: 'BRW-001', groupId: 'GRP-001', partnerId: 'PTR-001', amount: 25000, purpose: 'Business capital', repaymentPeriod: '3–6 months', repaymentFrequency: 'Monthly', incomeSource: 'Sari-sari store', existingDebt: 'No', existingDebtDetails: '', repaymentSource: 'Daily store sales', additionalExplanation: 'Expanding sari-sari store stock for the holiday season.', status: 'Sent to partner', partnerDecision: 'Approved', riskLevel: 'Low', consentGiven: true, submittedAt: '2024-11-16', createdAt: '2024-11-15' },
  { id: 'APP-002', borrowerId: 'BRW-002', groupId: 'GRP-002', partnerId: 'PTR-001', amount: 15000, purpose: 'Farming inputs', repaymentPeriod: 'Seasonal', repaymentFrequency: 'Seasonal', incomeSource: 'Rice farming', existingDebt: 'Prefer not to say', existingDebtDetails: '', repaymentSource: 'Harvest sales', additionalExplanation: 'Need seeds and fertilizer for next planting season.', status: 'Needs more information', partnerDecision: 'More information needed', riskLevel: 'Medium', consentGiven: true, submittedAt: '2024-12-02', createdAt: '2024-12-01' },
  { id: 'APP-003', borrowerId: 'BRW-003', groupId: 'GRP-003', partnerId: 'PTR-002', amount: 20000, purpose: 'Business capital', repaymentPeriod: '3–6 months', repaymentFrequency: 'Monthly', incomeSource: 'Online selling', existingDebt: 'Yes', existingDebtDetails: 'Small personal loan from relative', repaymentSource: 'Monthly online sales', additionalExplanation: 'Growing my Shopee store with more inventory.', status: 'Under CrediFlow review', partnerDecision: 'Pending', riskLevel: 'Medium', consentGiven: false, submittedAt: '2024-12-11', createdAt: '2024-12-10' },
  { id: 'APP-004', borrowerId: 'BRW-004', groupId: 'GRP-001', partnerId: 'PTR-001', amount: 18000, purpose: 'Business capital', repaymentPeriod: '3–6 months', repaymentFrequency: 'Every 2 weeks', incomeSource: 'Food vending', existingDebt: 'No', existingDebtDetails: '', repaymentSource: 'Daily food sales', additionalExplanation: 'Need capital for additional food stall equipment.', status: 'Ready for partner', partnerDecision: 'Pending', riskLevel: 'Low', consentGiven: true, submittedAt: '2024-12-06', createdAt: '2024-12-05' },
  { id: 'APP-005', borrowerId: 'BRW-005', groupId: 'GRP-004', partnerId: 'PTR-003', amount: 10000, purpose: 'Personal consumption', repaymentPeriod: '1–3 months', repaymentFrequency: 'Weekly', incomeSource: 'Tricycle driving', existingDebt: 'Yes', existingDebtDetails: 'Informal loan from neighbor', repaymentSource: 'Daily tricycle income', additionalExplanation: 'Emergency household repair needed.', status: 'Submitted', partnerDecision: 'Pending', riskLevel: 'High', consentGiven: true, submittedAt: '2024-12-15', createdAt: '2024-12-15' },
  { id: 'APP-006', borrowerId: 'BRW-006', groupId: 'GRP-003', partnerId: 'PTR-002', amount: 12000, purpose: 'Business capital', repaymentPeriod: '3–6 months', repaymentFrequency: 'Monthly', incomeSource: 'Laundry service', existingDebt: 'No', existingDebtDetails: '', repaymentSource: 'Monthly laundry revenue', additionalExplanation: 'Buying a second washing machine to expand capacity.', status: 'Sent to partner', partnerDecision: 'Approved', riskLevel: 'Low', consentGiven: true, submittedAt: '2024-11-21', createdAt: '2024-11-20' },
  { id: 'APP-007', borrowerId: 'BRW-007', groupId: 'GRP-002', partnerId: null, amount: 8000, purpose: 'Farming inputs', repaymentPeriod: 'Seasonal', repaymentFrequency: 'Seasonal', incomeSource: 'Coconut farming', existingDebt: 'No', existingDebtDetails: '', repaymentSource: 'Copra sales', additionalExplanation: '', status: 'Draft', partnerDecision: 'Pending', riskLevel: 'Medium', consentGiven: false, submittedAt: null, createdAt: '2024-12-18' },
  { id: 'APP-008', borrowerId: 'BRW-008', groupId: 'GRP-004', partnerId: 'PTR-003', amount: 15000, purpose: 'Business capital', repaymentPeriod: '3–6 months', repaymentFrequency: 'Monthly', incomeSource: 'Market vending', existingDebt: 'Yes', existingDebtDetails: 'Existing loan with lending company', repaymentSource: 'Daily market sales', additionalExplanation: 'Expanding my vegetable vending stall.', status: 'Sent to partner', partnerDecision: 'Rejected', riskLevel: 'High', consentGiven: true, submittedAt: '2024-11-26', createdAt: '2024-11-25' },
];

export const DOCUMENTS = [
  { id: 'DOC-001', borrowerId: 'BRW-001', applicationId: 'APP-001', type: 'Government-issued ID', status: 'Approved', aiStatus: 'AI analysis completed', uploadedAt: '2024-11-16', fileName: 'maria_philid.pdf', notes: '' },
  { id: 'DOC-002', borrowerId: 'BRW-001', applicationId: 'APP-001', type: 'Business proof', status: 'Approved', aiStatus: 'AI analysis completed', uploadedAt: '2024-11-16', fileName: 'maria_business_permit.pdf', notes: '' },
  { id: 'DOC-003', borrowerId: 'BRW-001', applicationId: 'APP-001', type: 'Consent form', status: 'Approved', aiStatus: null, uploadedAt: '2024-11-15', fileName: 'maria_consent.pdf', notes: '' },
  { id: 'DOC-004', borrowerId: 'BRW-002', applicationId: 'APP-002', type: 'Government-issued ID', status: 'Uploaded', aiStatus: 'AI analysis completed', uploadedAt: '2024-12-02', fileName: 'jose_id.pdf', notes: '' },
  { id: 'DOC-005', borrowerId: 'BRW-002', applicationId: 'APP-002', type: 'Farming proof', status: 'Needs replacement', aiStatus: 'AI analysis completed', uploadedAt: null, fileName: null, notes: 'Farming records not clearly readable. Please re-upload.' },
  { id: 'DOC-006', borrowerId: 'BRW-003', applicationId: 'APP-003', type: 'Business proof', status: 'Under review', aiStatus: 'AI analysis pending', uploadedAt: '2024-12-11', fileName: 'ana_business.pdf', notes: '' },
  { id: 'DOC-007', borrowerId: 'BRW-003', applicationId: 'APP-003', type: 'Consent form', status: 'Not uploaded', aiStatus: null, uploadedAt: null, fileName: null, notes: 'Consent form is required before submission.' },
  { id: 'DOC-008', borrowerId: 'BRW-004', applicationId: 'APP-004', type: 'Government-issued ID', status: 'Approved', aiStatus: 'AI analysis completed', uploadedAt: '2024-12-06', fileName: 'lorna_id.pdf', notes: '' },
  { id: 'DOC-009', borrowerId: 'BRW-004', applicationId: 'APP-004', type: 'Business proof', status: 'Approved', aiStatus: 'AI analysis completed', uploadedAt: '2024-12-06', fileName: 'lorna_stall_photo.jpg', notes: '' },
  { id: 'DOC-010', borrowerId: 'BRW-005', applicationId: 'APP-005', type: 'Government-issued ID', status: 'Uploaded', aiStatus: null, uploadedAt: '2024-12-16', fileName: 'carlo_id.pdf', notes: '' },
  { id: 'DOC-011', borrowerId: 'BRW-006', applicationId: 'APP-006', type: 'Government-issued ID', status: 'Approved', aiStatus: 'AI analysis completed', uploadedAt: '2024-11-21', fileName: 'elena_id.pdf', notes: '' },
  { id: 'DOC-012', borrowerId: 'BRW-006', applicationId: 'APP-006', type: 'Business proof', status: 'Approved', aiStatus: 'AI analysis completed', uploadedAt: '2024-11-21', fileName: 'elena_business_permit.pdf', notes: '' },
  { id: 'DOC-013', borrowerId: 'BRW-008', applicationId: 'APP-008', type: 'Government-issued ID', status: 'Rejected', aiStatus: null, uploadedAt: '2024-11-26', fileName: 'grace_id_blurry.pdf', notes: 'Image is too blurry. Please re-upload a clear copy.' },
];

export const CONSENT_RECORDS = [
  { id: 'CON-001', borrowerId: 'BRW-001', applicationId: 'APP-001', consentType: 'Full consent package', status: 'Accepted', acceptedAt: '2024-11-15', policyVersion: 'v1.0', privacyNotice: true, dataSharing: true, accuracyDeclaration: true, communicationsConsent: true },
  { id: 'CON-002', borrowerId: 'BRW-002', applicationId: 'APP-002', consentType: 'Full consent package', status: 'Accepted', acceptedAt: '2024-12-01', policyVersion: 'v1.0', privacyNotice: true, dataSharing: true, accuracyDeclaration: true, communicationsConsent: true },
  { id: 'CON-003', borrowerId: 'BRW-003', applicationId: 'APP-003', consentType: 'Partial', status: 'Pending', acceptedAt: null, policyVersion: 'v1.0', privacyNotice: false, dataSharing: false, accuracyDeclaration: false, communicationsConsent: false },
  { id: 'CON-004', borrowerId: 'BRW-004', applicationId: 'APP-004', consentType: 'Full consent package', status: 'Accepted', acceptedAt: '2024-12-05', policyVersion: 'v1.0', privacyNotice: true, dataSharing: true, accuracyDeclaration: true, communicationsConsent: true },
  { id: 'CON-005', borrowerId: 'BRW-005', applicationId: 'APP-005', consentType: 'Full consent package', status: 'Accepted', acceptedAt: '2024-12-15', policyVersion: 'v1.0', privacyNotice: true, dataSharing: true, accuracyDeclaration: true, communicationsConsent: true },
  { id: 'CON-006', borrowerId: 'BRW-006', applicationId: 'APP-006', consentType: 'Full consent package', status: 'Accepted', acceptedAt: '2024-11-20', policyVersion: 'v1.0', privacyNotice: true, dataSharing: true, accuracyDeclaration: true, communicationsConsent: true },
  { id: 'CON-007', borrowerId: 'BRW-007', applicationId: null, consentType: null, status: 'Pending', acceptedAt: null, policyVersion: 'v1.0', privacyNotice: false, dataSharing: false, accuracyDeclaration: false, communicationsConsent: false },
  { id: 'CON-008', borrowerId: 'BRW-008', applicationId: 'APP-008', consentType: 'Full consent package', status: 'Accepted', acceptedAt: '2024-11-25', policyVersion: 'v1.0', privacyNotice: true, dataSharing: true, accuracyDeclaration: true, communicationsConsent: true },
];

export const LOANS = [
  { id: 'LN-001', borrowerId: 'BRW-001', applicationId: 'APP-001', groupId: 'GRP-001', partnerId: 'PTR-001', approvedAmount: 25000, disbursementDate: '2024-12-01', repaymentFrequency: 'Monthly', totalInstallments: 6, status: 'Active', partnerName: 'Bayan Rural Bank' },
  { id: 'LN-002', borrowerId: 'BRW-006', applicationId: 'APP-006', groupId: 'GRP-003', partnerId: 'PTR-002', approvedAmount: 12000, disbursementDate: '2024-12-10', repaymentFrequency: 'Monthly', totalInstallments: 6, status: 'Active', partnerName: 'Kapwa Microfinance' },
  { id: 'LN-003', borrowerId: 'BRW-004', applicationId: 'APP-004', groupId: 'GRP-001', partnerId: 'PTR-001', approvedAmount: 18000, disbursementDate: null, repaymentFrequency: 'Every 2 weeks', totalInstallments: 8, status: 'Approved', partnerName: 'Bayan Rural Bank' },
];

export const REPAYMENTS = [
  { id: 'RPY-001', loanId: 'LN-001', borrowerId: 'BRW-001', dueDate: '2025-01-01', amountDue: 4500, amountPaid: 4500, status: 'Paid', paidAt: '2025-01-01' },
  { id: 'RPY-002', loanId: 'LN-001', borrowerId: 'BRW-001', dueDate: '2025-02-01', amountDue: 4500, amountPaid: 4500, status: 'Paid', paidAt: '2025-02-01' },
  { id: 'RPY-003', loanId: 'LN-001', borrowerId: 'BRW-001', dueDate: '2025-03-01', amountDue: 4500, amountPaid: 2000, status: 'Partially paid', paidAt: '2025-03-05' },
  { id: 'RPY-004', loanId: 'LN-001', borrowerId: 'BRW-001', dueDate: '2025-04-01', amountDue: 4500, amountPaid: 0, status: 'Upcoming', paidAt: null },
  { id: 'RPY-005', loanId: 'LN-002', borrowerId: 'BRW-006', dueDate: '2025-01-10', amountDue: 2200, amountPaid: 2200, status: 'Paid', paidAt: '2025-01-10' },
  { id: 'RPY-006', loanId: 'LN-002', borrowerId: 'BRW-006', dueDate: '2025-02-10', amountDue: 2200, amountPaid: 0, status: 'Late', paidAt: null },
  { id: 'RPY-007', loanId: 'LN-002', borrowerId: 'BRW-006', dueDate: '2025-03-10', amountDue: 2200, amountPaid: 0, status: 'Missed', paidAt: null },
  { id: 'RPY-008', loanId: 'LN-002', borrowerId: 'BRW-006', dueDate: '2025-04-10', amountDue: 2200, amountPaid: 0, status: 'Rescheduled', paidAt: null },
];

export const SUPPORT_REQUESTS = [
  { id: 'SUP-001', borrowerId: 'BRW-001', applicationId: 'APP-001', type: 'Application help', message: 'How do I check my application status?', status: 'Resolved', priority: 'Low', createdAt: '2024-11-20', resolvedAt: '2024-11-21', notes: 'Guided borrower to dashboard.' },
  { id: 'SUP-002', borrowerId: 'BRW-002', applicationId: 'APP-002', type: 'Document issue', message: 'I cannot upload my farming proof. The file is too large.', status: 'New', priority: 'Medium', createdAt: '2024-12-12', resolvedAt: null, notes: '' },
  { id: 'SUP-003', borrowerId: 'BRW-003', applicationId: 'APP-003', type: 'Group issue', message: 'How do I invite a new member to my group?', status: 'In progress', priority: 'Low', createdAt: '2024-12-14', resolvedAt: null, notes: 'Providing group code instructions.' },
  { id: 'SUP-004', borrowerId: 'BRW-005', applicationId: 'APP-005', type: 'Repayment issue', message: 'I made a payment but it does not show on my account.', status: 'Waiting for partner', priority: 'High', createdAt: '2024-12-18', resolvedAt: null, notes: 'Escalated to partner for manual update.' },
  { id: 'SUP-005', borrowerId: 'BRW-006', applicationId: 'APP-006', type: 'Data/privacy question', message: 'Can I request deletion of my data?', status: 'Resolved', priority: 'Medium', createdAt: '2024-12-10', resolvedAt: '2024-12-11', notes: 'Referred to data privacy policy.' },
  { id: 'SUP-006', borrowerId: 'BRW-008', applicationId: 'APP-008', type: 'Application help', message: 'Why was my application rejected?', status: 'Waiting for borrower', priority: 'High', createdAt: '2024-12-16', resolvedAt: null, notes: 'Waiting for borrower to provide additional documents.' },
];

export const RISK_FLAGS = [
  { id: 'RF-001', borrowerId: 'BRW-002', applicationId: 'APP-002', flagType: 'Missing documents', severity: 'Medium', source: 'AI document analysis', explanation: 'Farming proof not submitted. Cannot verify agricultural income.', status: 'Open', createdAt: '2024-12-05', resolvedAt: null },
  { id: 'RF-002', borrowerId: 'BRW-005', applicationId: 'APP-005', flagType: 'High requested amount', severity: 'Low', source: 'Manual', explanation: 'Amount relative to income is within moderate range but noted for human review.', status: 'Open', createdAt: '2024-12-16', resolvedAt: null },
  { id: 'RF-003', borrowerId: 'BRW-005', applicationId: 'APP-005', flagType: 'Existing debt', severity: 'High', source: 'Admin review', explanation: 'Borrower disclosed existing informal loan. Repayment burden should be reviewed by partner.', status: 'Open', createdAt: '2024-12-16', resolvedAt: null },
  { id: 'RF-004', borrowerId: 'BRW-003', applicationId: 'APP-003', flagType: 'Incomplete group', severity: 'Medium', source: 'Manual', explanation: 'Group has only 2 members. Minimum recommended is 3 for group-based lending.', status: 'Open', createdAt: '2024-12-12', resolvedAt: null },
  { id: 'RF-005', borrowerId: 'BRW-008', applicationId: 'APP-008', flagType: 'Existing debt', severity: 'High', source: 'Partner note', explanation: 'Borrower has existing loan with another lending company. Partner decision: Rejected.', status: 'Resolved', createdAt: '2024-12-01', resolvedAt: '2024-12-10' },
  { id: 'RF-006', borrowerId: 'BRW-002', applicationId: 'APP-002', flagType: 'Irregular income', severity: 'Medium', source: 'AI document analysis', explanation: 'Income is seasonal and crop-cycle cash-flow evidence is missing.', status: 'Open', createdAt: '2024-12-05', resolvedAt: null },
  { id: 'RF-007', borrowerId: 'BRW-003', applicationId: 'APP-003', flagType: 'Data inconsistency', severity: 'Low', source: 'AI document analysis', explanation: 'Online selling income stated in application but supporting document is incomplete.', status: 'Open', createdAt: '2024-12-12', resolvedAt: null },
  { id: 'RF-008', borrowerId: 'BRW-007', applicationId: 'APP-007', flagType: 'Manual review needed', severity: 'Low', source: 'Admin review', explanation: 'Application is in draft. No documents uploaded yet. Onboarding incomplete.', status: 'Open', createdAt: '2024-12-19', resolvedAt: null },
];

export const AI_ANALYSES = [
  {
    id: 'AIA-001', applicationId: 'APP-001', borrowerId: 'BRW-001', partnerId: 'PTR-001', promptId: 'PRM-001', promptVersion: 'v1.0', createdAt: '2024-11-20', reviewedAt: '2024-11-21', status: 'completed',
    documentsReviewed: ['Government-issued ID', 'Business proof', 'Consent form'],
    missingDocuments: [],
    profileSummary: 'Maria Santos, 36, married, Cebu City. 4-person household, 2 dependents. Sari-sari store operator, self-reported stable daily income.',
    loanRequestSummary: 'PHP 25,000 for business capital. Monthly repayment requested. Group: Cebu Growth Circle (2 members, status: Active).',
    incomeSummary: 'Primary source: Sari-sari store. Estimated monthly income PHP 10,001–20,000. Income described as daily/weekly. GCash wallet user.',
    alternativeDataSummary: 'Questionnaire completed. Income stable, 3+ years in current business. Group membership confirmed. Records kept in written format.',
    groupContextSummary: 'Group: Cebu Growth Circle. Leader: Maria Santos. Members: 2. Status: Active. Purpose: Business capital support.',
    documentSummary: 'ID document uploaded and approved. Business proof uploaded and approved. Consent form completed.',
    repaymentEvidence: 'Daily store sales stated as repayment source. Business proof uploaded. Monthly repayment capacity: plausible based on stated income.',
    inconsistencies: [],
    riskObservations: ['Income stability should be verified against actual sales records', 'Group has only 2 members — minimum recommended 3'],
    followUpQuestions: ['Confirm average weekly store sales', 'Confirm whether any seasonal dip in sales affects repayment capacity', 'Verify group membership with second member'],
    humanReviewSteps: ['Verify government-issued ID physically or via document check', 'Verify business proof against stated income', 'Confirm consent completion', 'Forward to partner only after human review sign-off'],
    partnerSummary: 'Applicant profile appears complete for review purposes. Documents uploaded and approved in demo data. Income source plausible. Human review recommended before final partner decision.',
    humanReviewRequired: true,
    disclaimer: 'This AI-generated analysis is a review aid only. It is not a credit decision, legal conclusion, fraud finding, credit score, or approval recommendation. Final decisions remain with licensed lending partners and human reviewers.'
  },
  {
    id: 'AIA-002', applicationId: 'APP-002', borrowerId: 'BRW-002', partnerId: 'PTR-001', promptId: 'PRM-001', promptVersion: 'v1.0', createdAt: '2024-12-05', reviewedAt: null, status: 'completed',
    documentsReviewed: ['Government-issued ID'],
    missingDocuments: ['Farming proof'],
    profileSummary: 'Jose Reyes, 49, married, Tacloban City. 6-person household, 4 dependents. Rice farmer, seasonal income.',
    loanRequestSummary: 'PHP 15,000 for farming inputs. Seasonal repayment requested. Group: Harvest Group.',
    incomeSummary: 'Primary source: Rice farming. Estimated monthly income PHP 5,000–10,000. Income is seasonal. No bank account. GCash wallet.',
    alternativeDataSummary: 'Questionnaire partially complete. Seasonal income pattern acknowledged. No written or digital records indicated. Group membership partially confirmed.',
    groupContextSummary: 'Group: Harvest Group. Leader: Jose Reyes. Members: 2. Readiness: Incomplete.',
    documentSummary: 'ID document uploaded. Farming proof not uploaded — marked Needs Replacement.',
    repaymentEvidence: 'Harvest sales claimed as repayment source. No crop-cycle cash-flow documentation provided.',
    inconsistencies: ['Seasonal repayment period requested but no crop-cycle cash-flow evidence provided', 'Farming proof not uploaded — income cannot be independently verified'],
    riskObservations: ['Missing farming proof prevents income verification', 'Seasonal income without harvest timeline creates repayment timing uncertainty', 'Large household size (6 persons, 4 dependents) relative to stated income'],
    followUpQuestions: ['Upload farming proof (land title, barangay certification, harvest records)', 'Provide expected next harvest date', 'Provide estimated crop sale revenue for next harvest', 'Confirm group member Ramon Villanueva onboarding status'],
    humanReviewSteps: ['Request farming proof before proceeding', 'Assess crop-cycle repayment alignment', 'Review group readiness before partner assignment'],
    partnerSummary: 'Application requires additional documentation before partner review. Missing farming proof is a key gap. Human reviewer should request proof and crop-cycle cash-flow details before forwarding.',
    humanReviewRequired: true,
    disclaimer: 'This AI-generated analysis is a review aid only. It is not a credit decision, legal conclusion, fraud finding, credit score, or approval recommendation. Final decisions remain with licensed lending partners and human reviewers.'
  },
  {
    id: 'AIA-003', applicationId: 'APP-003', borrowerId: 'BRW-003', partnerId: 'PTR-002', promptId: 'PRM-001', promptVersion: 'v1.0', createdAt: '2024-12-14', reviewedAt: null, status: 'completed',
    documentsReviewed: ['Business proof (partial)'],
    missingDocuments: ['Government-issued ID (not reviewed)', 'Consent form'],
    profileSummary: 'Ana Cruz, 31, single, Santa Rosa, Laguna. 3-person household, 1 dependent. Online seller, self-reported e-commerce income.',
    loanRequestSummary: 'PHP 20,000 for business capital. Monthly repayment. Group: Laguna Sellers (forming).',
    incomeSummary: 'Primary source: Online selling (Shopee). Estimated monthly income PHP 10,001–20,000. Maya wallet user.',
    alternativeDataSummary: 'Questionnaire partially complete (60%). Income from online selling stated. Digital records sometimes kept. Group forming — not yet fully constituted.',
    groupContextSummary: 'Group: Laguna Sellers. Status: Forming. Readiness: Pending. Group constitution not yet complete.',
    documentSummary: 'Business proof uploaded but incomplete/under review. Consent form not uploaded. ID not yet reviewed.',
    repaymentEvidence: 'Monthly online sales claimed. No platform transaction history uploaded. Business proof incomplete.',
    inconsistencies: ['Online selling income stated but business proof document incomplete', 'Consent form missing — consent status Pending'],
    riskObservations: ['Missing consent form blocks submission', 'Incomplete business documentation does not support stated income', 'Group in Forming status — not ready for group-based lending'],
    followUpQuestions: ['Upload clearer business proof (platform screenshots, BIR or DTI registration, sales records)', 'Complete and submit consent form', 'Confirm average monthly Shopee/platform sales', 'Confirm group member Elena Garcia participation'],
    humanReviewSteps: ['Do not forward to partner until consent form is completed', 'Request clearer business proof', 'Confirm group formation before partner assignment'],
    partnerSummary: 'Application should remain in needs-more-information status. Key gaps: missing consent form and incomplete business proof. Human reviewer should not forward until these are resolved.',
    humanReviewRequired: true,
    disclaimer: 'This AI-generated analysis is a review aid only. It is not a credit decision, legal conclusion, fraud finding, credit score, or approval recommendation. Final decisions remain with licensed lending partners and human reviewers.'
  },
];

export const AI_PROMPTS = [
  {
    id: 'PRM-001', name: 'Default Applicant Review Prompt', version: 'v1.0', purpose: 'Standard applicant review for all loan applications',
    promptText: `You are an AI assistant helping CrediFlow review a borrower application for a licensed lending partner. You are not making a credit decision. You must not approve, reject, score, or rank the borrower. Summarise the application, documents, alternative-data questionnaire, group context, and missing information. Identify inconsistencies and follow-up questions. Provide a human-review summary. Use cautious language. Do not make legal conclusions or fraud accusations. Final decisions remain with licensed lending partners and human reviewers.`,
    active: true, createdAt: '2024-11-01', updatedAt: '2024-11-01'
  },
  {
    id: 'PRM-002', name: 'Agricultural Borrower Prompt', version: 'v1.0', purpose: 'Specialised prompt for farming and fishing income borrowers',
    promptText: `You are an AI assistant helping CrediFlow review a borrower application for agricultural/fishing income. Focus on seasonal income patterns, crop-cycle cash-flow, farming proof documentation, and harvest timing relative to repayment schedule. Do not make credit decisions. Summarise gaps, inconsistencies, and follow-up questions. Human review required before partner assignment.`,
    active: false, createdAt: '2024-11-15', updatedAt: '2024-11-15'
  },
];

export const QUESTIONNAIRE_ANSWERS = {
  'BRW-001': {
    borrowerId: 'BRW-001', completionStatus: 'Complete', updatedAt: '2024-11-15',
    A1: 'Small business', A2: 'More than 3 years', A3: 'Daily', A4: 'PHP 10,001–20,000', A5: 'No', A6: '',
    B1: '1–2', B2: 'No', B3: null, B4: 'PHP 500–1,000', B5: 'Monthly',
    C1: 'Business capital', C2: 'Expanding sari-sari store will increase daily revenue by adding higher-demand items.', C3: 'Yes, written', C4: 'Yes',
    D1: 'Yes', D2: 'Neighbours', D3: 'More than 1 year', D4: 'Yes', D5: 'Yes',
    E1: 'Yes', E2: 'Sometimes', E3: ['SMS', 'App notification', 'Messenger'], E4: 'GCash',
    F1: true, F2: true, F3: true, F4: true,
  },
  'BRW-002': {
    borrowerId: 'BRW-002', completionStatus: 'In progress', updatedAt: '2024-12-02',
    A1: 'Farming', A2: 'More than 3 years', A3: 'Seasonal', A4: 'PHP 5,000–10,000', A5: 'Yes', A6: 'March–May and August–October',
    B1: '5 or more', B2: 'Prefer not to say', B3: null, B4: 'Nothing', B5: 'Seasonal',
    C1: 'Farming inputs', C2: '', C3: 'No', C4: 'Not sure',
    D1: 'Yes', D2: 'Same barangay', D3: 'More than 1 year', D4: 'Yes', D5: 'Yes',
    E1: 'Yes', E2: 'Rarely', E3: ['SMS', 'Phone call'], E4: 'GCash',
    F1: true, F2: true, F3: true, F4: true,
  },
};

// ============================================================
// Helper functions
// ============================================================

export function getBorrowerData(borrowerId) {
  const borrower = BORROWERS.find(b => b.id === borrowerId);
  const applications = APPLICATIONS.filter(a => a.borrowerId === borrowerId);
  const documents = DOCUMENTS.filter(d => d.borrowerId === borrowerId);
  const consent = CONSENT_RECORDS.find(c => c.borrowerId === borrowerId);
  const repayments = REPAYMENTS.filter(r => r.borrowerId === borrowerId);
  const support = SUPPORT_REQUESTS.filter(s => s.borrowerId === borrowerId);
  const group = GROUPS.find(g => g.memberIds.includes(borrowerId));
  const loans = LOANS.filter(l => l.borrowerId === borrowerId);
  const questionnaire = QUESTIONNAIRE_ANSWERS[borrowerId] || null;
  return { borrower, applications, documents, consent, repayments, support, group, loans, questionnaire };
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
    aiPrompts: AI_PROMPTS,
    questionnaires: QUESTIONNAIRE_ANSWERS,
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