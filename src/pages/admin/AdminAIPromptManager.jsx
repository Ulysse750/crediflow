import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Sparkles, Pencil } from 'lucide-react';
import ComplianceDisclaimer from '@/components/shared/ComplianceDisclaimer';

const DEFAULT_PROMPT = `You are an AI assistant helping CrediFlow review a borrower application for a licensed lending partner. You are not making a credit decision. You must not approve, reject, score, or rank the borrower. Summarise the application, documents, alternative-data questionnaire, group context, and missing information. Identify inconsistencies and follow-up questions. Provide a human-review summary. Use cautious language. Do not make legal conclusions or fraud accusations. Final decisions remain with licensed lending partners and human reviewers.`;

export default function AdminAIPromptManager() {
  const [prompts, setPrompts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState('');
  const [creating, setCreating] = useState(false);
  const [newPrompt, setNewPrompt] = useState({ name: '', version: 'v1.0', purpose: '', promptText: DEFAULT_PROMPT, active: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.AIPrompt.list().then(p => { setPrompts(p); setLoading(false); });
  }, []);

  const handleSave = async () => {
    await base44.entities.AIPrompt.update(editing, { promptText: editText });
    setPrompts(prev => prev.map(p => p.id === editing ? { ...p, promptText: editText } : p));
    setEditing(null);
    toast.success('Prompt saved');
  };

  const handleCreate = async () => {
    if (!newPrompt.name) return toast.error('Name is required');
    const created = await base44.entities.AIPrompt.create(newPrompt);
    setPrompts(prev => [...prev, created]);
    setCreating(false);
    toast.success('Prompt created');
  };

  const toggleActive = async (id) => {
    // Deactivate all, then activate selected
    await Promise.all(prompts.map(p => base44.entities.AIPrompt.update(p.id, { active: p.id === id })));
    setPrompts(prev => prev.map(p => ({ ...p, active: p.id === id })));
    toast.success('Active prompt updated');
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>;

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
                <div className="space-y-1"><Label>Version</Label><Input value={newPrompt.version} onChange={e => setNewPrompt(p => ({ ...p, version: e.target.value }))} /></div>
              </div>
              <div className="space-y-1"><Label>Purpose</Label><Input value={newPrompt.purpose} onChange={e => setNewPrompt(p => ({ ...p, purpose: e.target.value }))} /></div>
              <div className="space-y-1"><Label>Prompt text</Label><Textarea value={newPrompt.promptText} onChange={e => setNewPrompt(p => ({ ...p, promptText: e.target.value }))} rows={8} className="font-mono text-xs" /></div>
              <ComplianceDisclaimer variant="ai" />
              <Button className="w-full bg-secondary hover:bg-secondary/90" onClick={handleCreate}>Create prompt</Button>
            </div>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <ComplianceDisclaimer variant="ai" />

      {prompts.length === 0 && (
        <Card className="p-8 text-center text-muted-foreground">
          No prompts yet. Create one to enable AI reviews.
        </Card>
      )}

      {prompts.map(prompt => (
        <Card key={prompt.id} className={prompt.active ? 'border-secondary ring-1 ring-secondary/20' : ''}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle className="text-base font-display flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-secondary" /> {prompt.name}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">Version {prompt.version} · {prompt.purpose}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-2 text-xs">
                  <Switch checked={!!prompt.active} onCheckedChange={() => toggleActive(prompt.id)} />
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
                <Textarea value={editText} onChange={e => setEditText(e.target.value)} rows={8} className="font-mono text-xs" />
                <div className="flex gap-2">
                  <Button size="sm" className="bg-secondary hover:bg-secondary/90" onClick={handleSave}>Save</Button>
                  <Button size="sm" variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="relative">
                <pre className="text-xs text-muted-foreground whitespace-pre-wrap bg-muted/30 p-3 rounded-lg font-mono leading-relaxed">{prompt.promptText}</pre>
                <Button size="sm" variant="ghost" className="absolute top-2 right-2 gap-1 text-xs" onClick={() => { setEditing(prompt.id); setEditText(prompt.promptText); }}>
                  <Pencil className="w-3 h-3" /> Edit
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}