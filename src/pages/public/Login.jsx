import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemoAuth } from '@/lib/demoAuth';
import PublicHeader from '@/components/layout/PublicHeader';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, User, Building2, Shield, ChevronDown, ChevronUp } from 'lucide-react';

const DEMO_ACCOUNTS = [
  { label: 'Borrower — Maria Santos', email: 'borrower@crediflow.demo', password: 'borrower123', icon: User, color: 'bg-secondary/10 text-secondary border-secondary/20', role: 'borrower' },
  { label: 'Borrower — Jose Reyes', email: 'borrower2@crediflow.demo', password: 'borrower123', icon: User, color: 'bg-secondary/10 text-secondary border-secondary/20', role: 'borrower' },
  { label: 'Partner — Bayan Rural Bank', email: 'partner@crediflow.demo', password: 'partner123', icon: Building2, color: 'bg-primary/10 text-primary border-primary/20', role: 'partner' },
  { label: 'Partner — Kapwa Microfinance', email: 'partner2@crediflow.demo', password: 'partner123', icon: Building2, color: 'bg-primary/10 text-primary border-primary/20', role: 'partner' },
  { label: 'Partner — Unity Cooperative', email: 'partner3@crediflow.demo', password: 'partner123', icon: Building2, color: 'bg-primary/10 text-primary border-primary/20', role: 'partner' },
  { label: 'Admin — CrediFlow', email: 'admin@crediflow.demo', password: 'admin123', icon: Shield, color: 'bg-accent/10 text-accent border-accent/20', role: 'admin' },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAccounts, setShowAccounts] = useState(true);
  const { login } = useDemoAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (result.success) {
        const path = result.user.role === 'borrower' ? '/borrower' : result.user.role === 'partner' ? '/partner' : '/admin';
        navigate(path);
      } else {
        setError(result.error);
      }
    }, 400);
  };

  const fillCredentials = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setError('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-5">
          <div className="text-center">
            <h1 className="text-2xl font-display font-bold text-foreground">Sign in to CrediFlow</h1>
            <p className="text-sm text-muted-foreground mt-1">Demo environment — use a demo account below</p>
          </div>

          {/* Demo accounts */}
          <Card>
            <CardContent className="pt-4 pb-4">
              <button
                className="flex items-center justify-between w-full text-sm font-medium text-foreground mb-3"
                onClick={() => setShowAccounts(v => !v)}
              >
                <span>Demo accounts — click to fill login</span>
                {showAccounts ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showAccounts && (
                <div className="space-y-1.5">
                  {DEMO_ACCOUNTS.map((a) => (
                    <button
                      key={a.email}
                      onClick={() => fillCredentials(a)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-all hover:shadow-sm ${a.color}`}
                    >
                      <a.icon className="w-4 h-4 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold truncate">{a.label}</p>
                        <p className="text-[10px] opacity-60 truncate">{a.email}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter demo email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required className="pr-10" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign in'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-xs text-center text-muted-foreground">
            This is a demo environment. No real data is collected or processed.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}