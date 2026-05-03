import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemoAuth } from '@/lib/demoAuth';
import PublicHeader from '@/components/layout/PublicHeader';
import Footer from '@/components/layout/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, User, Building2, Shield } from 'lucide-react';

const DEMO_ACCOUNTS = [
  { label: 'Borrower', email: 'borrower@crediflow.demo', password: 'borrower123', name: 'Maria Santos', icon: User, color: 'bg-secondary/10 text-secondary border-secondary/20' },
  { label: 'Partner', email: 'partner@crediflow.demo', password: 'partner123', name: 'Bayan Rural Bank', icon: Building2, color: 'bg-primary/10 text-primary border-primary/20' },
  { label: 'Admin', email: 'admin@crediflow.demo', password: 'admin123', name: 'CrediFlow Admin', icon: Shield, color: 'bg-accent/10 text-accent border-accent/20' },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-display font-bold text-foreground">Welcome to CrediFlow</h1>
            <p className="text-sm text-muted-foreground mt-1">Sign in to your demo account</p>
          </div>

          {/* Demo account cards */}
          <div className="grid grid-cols-3 gap-2">
            {DEMO_ACCOUNTS.map((a) => (
              <button
                key={a.label}
                onClick={() => fillCredentials(a)}
                className={`p-3 rounded-xl border text-center transition-all hover:shadow-md ${a.color}`}
              >
                <a.icon className="w-5 h-5 mx-auto mb-1.5" />
                <p className="text-xs font-semibold">{a.label}</p>
                <p className="text-[10px] opacity-70 mt-0.5 truncate">{a.name}</p>
              </button>
            ))}
          </div>

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