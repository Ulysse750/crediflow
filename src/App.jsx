import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "sonner"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Public pages
import Home from '@/pages/public/Home';
import Login from '@/pages/public/Login';
import Register from '@/pages/public/Register';

// Borrower pages
import BorrowerDashboard from '@/pages/borrower/BorrowerDashboard';
import BorrowerOnboarding from '@/pages/borrower/BorrowerOnboarding';
import BorrowerProfile from '@/pages/borrower/BorrowerProfile';
import BorrowerQuestionnaire from '@/pages/borrower/BorrowerQuestionnaire';
import BorrowerApplication from '@/pages/borrower/BorrowerApplication';
import BorrowerGroup from '@/pages/borrower/BorrowerGroup';
import BorrowerDocuments from '@/pages/borrower/BorrowerDocuments';
import BorrowerConsent from '@/pages/borrower/BorrowerConsent';
import BorrowerRepayments from '@/pages/borrower/BorrowerRepayments';
import BorrowerSupport from '@/pages/borrower/BorrowerSupport';
import BorrowerSettings from '@/pages/borrower/BorrowerSettings';

// Partner pages
import PartnerDashboard from '@/pages/partner/PartnerDashboard';
import PartnerApplications from '@/pages/partner/PartnerApplications';
import PartnerApplicationDetail from '@/pages/partner/PartnerApplicationDetail';
import PartnerBorrowers from '@/pages/partner/PartnerBorrowers';
import PartnerGroups from '@/pages/partner/PartnerGroups';
import PartnerDocuments from '@/pages/partner/PartnerDocuments';
import PartnerAIReviews from '@/pages/partner/PartnerAIReviews';
import PartnerLoans from '@/pages/partner/PartnerLoans';
import PartnerRepayments from '@/pages/partner/PartnerRepayments';
import PartnerSupport from '@/pages/partner/PartnerSupport';
import PartnerSettings from '@/pages/partner/PartnerSettings';

// Admin pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminBorrowers from '@/pages/admin/AdminBorrowers';
import AdminGroups from '@/pages/admin/AdminGroups';
import AdminApplications from '@/pages/admin/AdminApplications';
import AdminApplicationReview from '@/pages/admin/AdminApplicationReview';
import AdminPartners from '@/pages/admin/AdminPartners';
import AdminDocuments from '@/pages/admin/AdminDocuments';
import AdminAIAnalysis from '@/pages/admin/AdminAIAnalysis';
import AdminAIPromptManager from '@/pages/admin/AdminAIPromptManager';
import AdminLoans from '@/pages/admin/AdminLoans';
import AdminRepayments from '@/pages/admin/AdminRepayments';
import AdminSupport from '@/pages/admin/AdminSupport';
import AdminRiskFlags from '@/pages/admin/AdminRiskFlags';
import AdminCompliance from '@/pages/admin/AdminCompliance';
import AdminMVPReadiness from '@/pages/admin/AdminMVPReadiness';
import AdminDataModel from '@/pages/admin/AdminDataModel';
import AdminSettings from '@/pages/admin/AdminSettings';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Borrower routes */}
          <Route element={<DashboardLayout role="borrower" />}>
            <Route path="/borrower" element={<BorrowerDashboard />} />
            <Route path="/borrower/onboarding" element={<BorrowerOnboarding />} />
            <Route path="/borrower/profile" element={<BorrowerProfile />} />
            <Route path="/borrower/questionnaire" element={<BorrowerQuestionnaire />} />
            <Route path="/borrower/application" element={<BorrowerApplication />} />
            <Route path="/borrower/group" element={<BorrowerGroup />} />
            <Route path="/borrower/documents" element={<BorrowerDocuments />} />
            <Route path="/borrower/consent" element={<BorrowerConsent />} />
            <Route path="/borrower/repayments" element={<BorrowerRepayments />} />
            <Route path="/borrower/support" element={<BorrowerSupport />} />
            <Route path="/borrower/settings" element={<BorrowerSettings />} />
          </Route>

          {/* Partner routes */}
          <Route element={<DashboardLayout role="partner" />}>
            <Route path="/partner" element={<PartnerDashboard />} />
            <Route path="/partner/applications" element={<PartnerApplications />} />
            <Route path="/partner/applications/:id" element={<PartnerApplicationDetail />} />
            <Route path="/partner/borrowers" element={<PartnerBorrowers />} />
            <Route path="/partner/groups" element={<PartnerGroups />} />
            <Route path="/partner/documents" element={<PartnerDocuments />} />
            <Route path="/partner/ai-reviews" element={<PartnerAIReviews />} />
            <Route path="/partner/loans" element={<PartnerLoans />} />
            <Route path="/partner/repayments" element={<PartnerRepayments />} />
            <Route path="/partner/support" element={<PartnerSupport />} />
            <Route path="/partner/settings" element={<PartnerSettings />} />
          </Route>

          {/* Admin routes */}
          <Route element={<DashboardLayout role="admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/borrowers" element={<AdminBorrowers />} />
            <Route path="/admin/groups" element={<AdminGroups />} />
            <Route path="/admin/applications" element={<AdminApplications />} />
            <Route path="/admin/applications/:id" element={<AdminApplicationReview />} />
            <Route path="/admin/partners" element={<AdminPartners />} />
            <Route path="/admin/documents" element={<AdminDocuments />} />
            <Route path="/admin/ai-analysis" element={<AdminAIAnalysis />} />
            <Route path="/admin/ai-prompts" element={<AdminAIPromptManager />} />
            <Route path="/admin/loans" element={<AdminLoans />} />
            <Route path="/admin/repayments" element={<AdminRepayments />} />
            <Route path="/admin/support" element={<AdminSupport />} />
            <Route path="/admin/risk-flags" element={<AdminRiskFlags />} />
            <Route path="/admin/compliance" element={<AdminCompliance />} />
            <Route path="/admin/mvp-readiness" element={<AdminMVPReadiness />} />
            <Route path="/admin/data-model" element={<AdminDataModel />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster />
      <Sonner richColors position="top-right" />
    </QueryClientProvider>
  );
}

export default App;