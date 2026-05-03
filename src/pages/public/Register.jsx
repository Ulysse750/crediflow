import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Info } from 'lucide-react';

const PROVINCES = ['Metro Manila', 'Cebu', 'Davao', 'Laguna', 'Leyte', 'Batangas', 'Pampanga', 'Bulacan', 'Rizal', 'Cavite', 'Iloilo', 'Negros Occidental', 'Pangasinan', 'Quezon', 'Other'];
const LANGUAGES = ['Tagalog', 'Cebuano', 'Waray', 'Bisaya', 'Ilocano', 'Hiligaynon', 'English', 'Other'];

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', password: '', confirmPassword: '',
    province: '', city: '', barangay: '', language: '', consent: false,
  });
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !form.password) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    if (!form.consent) {
      toast.error('You must accept the consent terms to create an account.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Account created! This is a demo — please use the demo borrower account to log in.', { duration: 5000 });
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="h-14 border-b border-border bg-card flex items-center px-6">
        <Link to="/"><Logo size="sm" /></Link>
      </header>
      <div className="flex-1 flex items-start justify-center py-10 px-4">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display font-bold text-foreground">Create your borrower account</h1>
            <p className="text-sm text-muted-foreground mt-1">Start your loan application journey with CrediFlow.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <Label>Full legal name <span className="text-destructive">*</span></Label>
                  <Input placeholder="As shown on your government ID" value={form.fullName} onChange={e => set('fullName', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>Email address <span className="text-destructive">*</span></Label>
                    <Input type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label>Mobile number <span className="text-destructive">*</span></Label>
                    <Input placeholder="+63 9XX XXX XXXX" value={form.phone} onChange={e => set('phone', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>Password <span className="text-destructive">*</span></Label>
                    <Input type="password" placeholder="At least 8 characters" value={form.password} onChange={e => set('password', e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label>Confirm password <span className="text-destructive">*</span></Label>
                    <Input type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>Province / City</Label>
                    <Select onValueChange={v => set('province', v)}>
                      <SelectTrigger><SelectValue placeholder="Select province" /></SelectTrigger>
                      <SelectContent>{PROVINCES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>City / Municipality</Label>
                    <Input placeholder="City or municipality" value={form.city} onChange={e => set('city', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>Barangay</Label>
                    <Input placeholder="Barangay name" value={form.barangay} onChange={e => set('barangay', e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label>Preferred language</Label>
                    <Select onValueChange={v => set('language', v)}>
                      <SelectTrigger><SelectValue placeholder="Select language" /></SelectTrigger>
                      <SelectContent>{LANGUAGES.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg border border-border/50 text-xs text-muted-foreground flex gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <p>CrediFlow does not provide loans directly. By creating an account, you are registering to submit loan applications to licensed lending partners. No loan approval is guaranteed.</p>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox id="consent" checked={form.consent} onCheckedChange={v => set('consent', v)} className="mt-0.5" />
                <label htmlFor="consent" className="text-sm text-foreground cursor-pointer">
                  I understand and agree to the <span className="text-secondary font-medium">Privacy Notice</span>, <span className="text-secondary font-medium">Data Processing Terms</span>, and that CrediFlow will share my application with licensed lending partners for review. I confirm I am at least 18 years old.
                </label>
              </div>

              <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90" disabled={loading}>
                {loading ? 'Creating account…' : 'Create account'}
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Already have an account? <Link to="/login" className="text-secondary font-medium hover:underline">Sign in</Link>
            </p>
          </div>

          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">
            <strong>Demo mode:</strong> Self-registration is for demonstration only. To explore the borrower portal, use: <strong>borrower@crediflow.demo / borrower123</strong>
          </div>
        </div>
      </div>
    </div>
  );
}