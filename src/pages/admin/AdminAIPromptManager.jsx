import React, { useState } from 'react';
import { AI_PROMPTS, APPLICATIONS, getBorrowerName } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Sparkles, Pencil } from 'lucide-react';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';

const DEFAULT_PROMPT = `You are an AI assistant helping CrediFlow review a borrower application for a licensed lending partner. You are not making a credit decision. You must not approve, reject, score, or rank the borrower. Summarise the application, documents, alternative-data questionnaire, group context, and missing information. Identify inconsistencies and follow-up questions. Provide a human-review summary. Use cautious language. Do not make legal conclusions or fraud accusations. Final decisions remain with licensed lending partners and human reviewers.`;

export default function AdminAIPromptManager() {
  const [prompts, setPrompts] = useState(AI_PROMPTS);
  const [editing, setEditing] = useState(null);
  const [testApp, setTestApp] = useState('');
  const [creating, setCreating] = useState(false);
  const [newPrompt, setNewPrompt] = useState({ name: '', version: 'v1.0', purpose: '', promptText: DEFAULT_PROMPT, active: false });

  const handleSave = () => { toast.success('Prompt saved (demo)'); setEditing(null); };
  const handleCreate = () => { toast.success('Prompt created (demo)'); setCreating(false); };
  const handleTest = () => {
    if (!testApp) { toast.error('Select an application to test.'); return; }
    toast.success(`AI analysis triggered for ${testApp} using active prompt (demo)`);
  };
  const toggleActive = (id) => {
    setPrompts(prev => prev.map(p => ({ ...p, active: p.id === id })));
    toast.success('Active prompt updated (demo)');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader title="AI Prompt Manager" description="Manage the AI analysis prompts used for applicant reviews.">
        <Dialog open={creating} onOpenChange={setCreating}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-secondary hover:bg-secondary/90"><Plus className="w-4 h-4" /> New prompt</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>Create new AI prompt</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1"><Label>Prompt name</Label><Input value={newPrompt.name} onChange={e => setNewPrompt(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Default Applicant Review" /></div>
                <div className="space-y-1"><Label>Version</Label><Input value={newPrompt.version} onChange={e => setNewPrompt(p => ({ ...p, version: e.target.value }))} placeholder="v1.0" /></div>
              </div>
              <div className="space-y-1"><Label>Purpose</Label><Input value={newPrompt.purpose} onChange={e => setNewPrompt(p => ({ ...p, purpose: e.target.value }))} placeholder="What is this prompt for?" /></div>
              <div className="space-y-1"><Label>Prompt text</Label><Textarea value={newPrompt.promptText} onChange={e => setNewPrompt(p => ({ ...p, promptText: e.target.value }))} rows={8} className="font-mono text-xs" /></div>
              <ComplianceDisclaimer variant="ai" />
              <Button className="w-full bg-secondary hover:bg-secondary/90" onClick={handleCreate}>Create prompt</Button>
            </div>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <ComplianceDisclaimer variant="ai" />

      {prompts.map(prompt => (
        <Card key={prompt.id} className={prompt.active ? 'border-secondary ring-1 ring-secondary/20' : ''}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle className="text-base font-display flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-secondary" /> {prompt.name}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">Version {prompt.version} · {prompt.purpose}</p>
                <p className="text-xs text-muted-foreground">Last updated: {prompt.updatedAt}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-2 text-xs">
                  <Switch checked={prompt.active} onCheckedChange={() => toggleActive(prompt.id)} />
                  <span className={prompt.active ? 'text-secondary font-medium' : 'text-muted-foreground'}>
                    {prompt.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {editing === prompt.id ? (
              <div className="space-y-2">
                <Textarea defaultValue={prompt.promptText} rows={8} className="font-mono text-xs" />
                <div className="flex gap-2">
                  <Button size="sm" className="bg-secondary hover:bg-secondary/90" onClick={handleSave}>Save</Button>
                  <Button size="sm" variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="relative">
                <pre className="text-xs text-muted-foreground whitespace-pre-wrap bg-muted/30 p-3 rounded-lg font-mono leading-relaxed">{prompt.promptText}</pre>
                <Button size="sm" variant="ghost" className="absolute top-2 right-2 gap-1 text-xs" onClick={() => setEditing(prompt.id)}>
                  <Pencil className="w-3 h-3" /> Edit
                </Button>
              </div>
            )}

            <div className="flex items-center gap-2 pt-1">
              <Select value={testApp} onValueChange={setTestApp}>
                <SelectTrigger className="w-56 text-xs"><SelectValue placeholder="Test with application…" /></SelectTrigger>
                <SelectContent>
                  {APPLICATIONS.map(a => <SelectItem key={a.id} value={a.id}>{a.id} — {getBorrowerName(a.borrowerId)}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button size="sm" variant="outline" className="gap-1" onClick={handleTest}>
                <Sparkles className="w-3 h-3" /> Test prompt
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}