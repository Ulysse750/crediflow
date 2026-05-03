import React from 'react';
import { Link } from 'react-router-dom';
import { useDemoAuth } from '@/lib/demoAuth';
import Logo from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { LogIn, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';

export default function PublicHeader() {
  const { user, logout, isAuthenticated } = useDemoAuth();
  const [open, setOpen] = React.useState(false);

  const dashboardPath = user?.role === 'borrower' ? '/borrower' : user?.role === 'partner' ? '/partner' : '/admin';

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="shrink-0">
          <Logo size="sm" />
        </Link>

        {/* Desktop */}
        <nav className="hidden sm:flex items-center gap-3">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to={dashboardPath}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="gap-2" onClick={logout}>
                <LogOut className="w-4 h-4" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LogIn className="w-4 h-4" /> Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
                  Create account
                </Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile toggle */}
        <button className="sm:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="sm:hidden border-t border-border bg-white px-4 py-3 space-y-2">
          <Link to="/" className="block text-sm py-2" onClick={() => setOpen(false)}>Home</Link>
          {isAuthenticated ? (
            <>
              <Link to={dashboardPath} className="block text-sm py-2" onClick={() => setOpen(false)}>Dashboard</Link>
              <button className="block text-sm py-2 text-destructive" onClick={() => { logout(); setOpen(false); }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-sm py-2 text-primary font-medium" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/register" className="block text-sm py-2 font-medium text-secondary" onClick={() => setOpen(false)}>Create account</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}