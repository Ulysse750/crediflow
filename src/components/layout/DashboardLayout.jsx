import React, { useState } from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { useDemoAuth } from '@/lib/demoAuth';
import Logo from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { LogOut, Menu, X, ChevronRight } from 'lucide-react';

const BORROWER_NAV = [
  { label: 'Dashboard', path: '/borrower', icon: '📊' },
  { label: 'Onboarding', path: '/borrower/onboarding', icon: '🎯' },
  { label: 'Profile', path: '/borrower/profile', icon: '👤' },
  { label: 'Questionnaire', path: '/borrower/questionnaire', icon: '📋' },
  { label: 'Documents', path: '/borrower/documents', icon: '📄' },
  { label: 'Consent', path: '/borrower/consent', icon: '✅' },
  { label: 'Group', path: '/borrower/group', icon: '👥' },
  { label: 'Application', path: '/borrower/application', icon: '📝' },
  { label: 'Repayments', path: '/borrower/repayments', icon: '💰' },
  { label: 'Support', path: '/borrower/support', icon: '💬' },
  { label: 'Settings', path: '/borrower/settings', icon: '⚙️' },
];

const PARTNER_NAV = [
  { label: 'Dashboard', path: '/partner', icon: '📊' },
  { label: 'Applications', path: '/partner/applications', icon: '📝' },
  { label: 'Borrowers', path: '/partner/borrowers', icon: '👤' },
  { label: 'Groups', path: '/partner/groups', icon: '👥' },
  { label: 'Documents', path: '/partner/documents', icon: '📄' },
  { label: 'AI Reviews', path: '/partner/ai-reviews', icon: '🤖' },
  { label: 'Loans', path: '/partner/loans', icon: '🏦' },
  { label: 'Repayments', path: '/partner/repayments', icon: '💰' },
  { label: 'Support', path: '/partner/support', icon: '💬' },
  { label: 'Settings', path: '/partner/settings', icon: '⚙️' },
];

const ADMIN_NAV = [
  { label: 'Dashboard', path: '/admin', icon: '📊' },
  { label: 'Borrowers', path: '/admin/borrowers', icon: '👤' },
  { label: 'Groups', path: '/admin/groups', icon: '👥' },
  { label: 'Applications', path: '/admin/applications', icon: '📝' },
  { label: 'Partners', path: '/admin/partners', icon: '🏦' },
  { label: 'Documents', path: '/admin/documents', icon: '📄' },
  { label: 'AI Analysis', path: '/admin/ai-analysis', icon: '🤖' },
  { label: 'AI Prompts', path: '/admin/ai-prompts', icon: '✏️' },
  { label: 'Loans', path: '/admin/loans', icon: '💳' },
  { label: 'Repayments', path: '/admin/repayments', icon: '💰' },
  { label: 'Support', path: '/admin/support', icon: '💬' },
  { label: 'Risk Flags', path: '/admin/risk-flags', icon: '⚠️' },
  { label: 'Compliance', path: '/admin/compliance', icon: '🛡️' },
  { label: 'MVP Readiness', path: '/admin/mvp-readiness', icon: '🚀' },
  { label: 'Data Model', path: '/admin/data-model', icon: '🗄️' },
  { label: 'Settings', path: '/admin/settings', icon: '⚙️' },
];

const NAV_MAP = { borrower: BORROWER_NAV, partner: PARTNER_NAV, admin: ADMIN_NAV };

export default function DashboardLayout({ role }) {
  const { user, logout } = useDemoAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user || user.role !== role) {
    const correctPath = user ? `/${user.role}` : '/login';
    return <Navigate to={correctPath} replace />;
  }

  const navItems = NAV_MAP[role] || [];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-sidebar-border">
        <Logo size="sm" light />
        <p className="text-xs text-sidebar-foreground/50 mt-1 capitalize">{role} Portal</p>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
              {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-50" />}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-foreground/60 mb-3 truncate">{user.name || user.email}</div>
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50" onClick={logout}>
          <LogOut className="w-4 h-4" /> Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 bg-sidebar flex-col border-r border-sidebar-border shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-sidebar shadow-xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-14 border-b border-border bg-card flex items-center px-4 gap-3 shrink-0">
          <button className="lg:hidden p-1.5 hover:bg-muted rounded-md" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="text-sm font-medium text-foreground">
            {navItems.find(n => n.path === location.pathname)?.label || 'Dashboard'}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}