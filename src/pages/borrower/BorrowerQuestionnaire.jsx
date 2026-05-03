import React, { useState } from 'react';
import { useDemoAuth } from '@/lib/demoAuth';
import { QUESTIONNAIRE_ANSWERS } from '@/lib/mockData';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Info } from 'lucide-react';

function Radio({ name, options, value, onChange }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
      {options.map(opt => (
        <label key={opt} className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer text-sm transition-all ${value === opt ? 'border-secondary bg-secondary/5 text-foreground' : 'border-border hover:border-secondary/40'}`}>
          <input type="radio" name={name} value={opt} checked={value === opt} onChange={() => onChange(opt)} className="accent-secondary" />
          {opt}
        </label>
      ))}
    </div>
  );
}

const SECTIONS = [
  {
    id: 'A', title: 'A. Income and livelihood stability',
    questions: [
      { id: 'A1', text: 'What is your main source of income?', options: ['Salaried employment', 'Small business', 'Farming', 'Fishing', 'Online selling', 'Market vending', 'Remittances', 'Transport', 'Services', 'Other'] },
      { id: 'A2', text: 'How long have you had this main source of income?', options: ['Less than 3 months', '3–6 months', '6–12 months', '1–3 years', 'More than 3 years'] },
      { id: 'A3', text: 'How regular is your income?', options: ['Daily', 'Weekly', 'Monthly', 'Seasonal', 'Irregular'] },
      { id: 'A4', text: 'What is your estimated monthly income?', options: ['Below PHP 5,000', 'PHP 5,000–10,000', 'PHP 10,001–20,000', 'PHP 20,001–40,000', 'Above PHP 40,000', 'Prefer not to say'] },
      { id: 'A5', text: 'Does your income change by season?', options: ['Yes', 'No', 'Not sure'] },
      { id: 'A6', text: 'If seasonal, when are your strongest income months? (optional)', type: 'text' },
    ],
  },
  {
    id: 'B', title: 'B. Expense and repayment capacity',
    questions: [
      { id: 'B1', text: 'How many people depend on your income?', options: ['0', '1–2', '3–4', '5 or more'] },
      { id: 'B2', text: 'Do you currently have other loans?', options: ['Yes', 'No', 'Prefer not to say'] },
      { id: 'B3', text: 'If yes, what type?', options: ['Bank loan', 'Cooperative loan', 'MFI loan', 'Informal lender', 'Family/friends', 'Store credit', 'Other'] },
      { id: 'B4', text: 'How much do you usually save in a month?', options: ['Nothing', 'Less than PHP 500', 'PHP 500–1,000', 'PHP 1,001–3,000', 'More than PHP 3,000'] },
      { id: 'B5', text: 'What repayment schedule would be easiest?', options: ['Weekly', 'Every two weeks', 'Monthly', 'Seasonal', 'Other'] },
    ],
  },
  {
    id: 'C', title: 'C. Business / livelihood details',
    questions: [
      { id: 'C1', text: 'What will the loan be used for?', options: ['Business capital', 'Inventory', 'Farming inputs', 'Fishing equipment', 'Education', 'Medical/emergency', 'Household needs', 'Debt consolidation', 'Other'] },
      { id: 'C2', text: 'How will the loan help increase or stabilise income?', type: 'text' },
      { id: 'C3', text: 'Do you keep written or digital records of sales/income?', options: ['Yes, written', 'Yes, digital', 'Sometimes', 'No'] },
      { id: 'C4', text: 'Can you provide proof of business/livelihood activity?', options: ['Yes', 'No', 'Not sure'] },
    ],
  },
  {
    id: 'D', title: 'D. Group-based lending context',
    questions: [
      { id: 'D1', text: 'Are you applying as part of a group?', options: ['Yes', 'No', 'I want to create a group', 'I want to join a group'] },
      { id: 'D2', text: 'How do you know the other group members?', options: ['Family', 'Neighbours', 'Same barangay', 'Same business area/market', 'Same cooperative', 'Same workplace', 'Other'] },
      { id: 'D3', text: 'How long have you known them?', options: ['Less than 3 months', '3–6 months', '6–12 months', 'More than 1 year'] },
      { id: 'D4', text: 'Would you be comfortable receiving repayment reminders as a group?', options: ['Yes', 'No', 'Maybe'] },
      { id: 'D5', text: 'Do you understand that individual financial details should remain private within the group?', options: ['Yes', 'No'] },
    ],
  },
  {
    id: 'E', title: 'E. Digital access and communications',
    questions: [
      { id: 'E1', text: 'Do you have regular access to a smartphone?', options: ['Yes', 'No', 'Shared device'] },
      { id: 'E2', text: 'Do you have reliable internet access?', options: ['Yes', 'Sometimes', 'Rarely'] },
      { id: 'E3', text: 'Which channels can CrediFlow use to contact you?', options: ['SMS', 'Phone call', 'Email', 'Messenger', 'WhatsApp', 'App notification'], type: 'multi' },
      { id: 'E4', text: 'Do you use a mobile wallet?', options: ['GCash', 'Maya', 'Other', 'No'] },
    ],
  },
  {
    id: 'F', title: 'F. Declarations',
    questions: [
      { id: 'F1', text: 'I confirm the information provided is accurate to the best of my knowledge.', type: 'checkbox' },
      { id: 'F2', text: 'I understand CrediFlow does not guarantee approval.', type: 'checkbox' },
      { id: 'F3', text: 'I consent to CrediFlow sharing my application with licensed partner lenders for review.', type: 'checkbox' },
      { id: 'F4', text: 'I understand licensed partners make final credit decisions.', type: 'checkbox' },
    ],
  },
];

export default function BorrowerQuestionnaire() {
  const { user } = useDemoAuth();
  const existing = QUESTIONNAIRE_ANSWERS[user?.borrowerId || 'BRW-001'] || {};
  const [answers, setAnswers] = useState(existing);

  const set = (id, val) => setAnswers(prev => ({ ...prev, [id]: val }));
  const toggleMulti = (id, val) => {
    const cur = answers[id] || [];
    setAnswers(prev => ({ ...prev, [id]: cur.includes(val) ? cur.filter(v => v !== val) : [...cur, val] }));
  };

  const answered = SECTIONS.flatMap(s => s.questions.filter(q => q.type !== 'text' && q.id !== 'B3' && q.id !== 'A6')).filter(q => {
    const v = answers[q.id];
    if (q.type === 'checkbox') return v === true;
    if (q.type === 'multi') return (v || []).length > 0;
    return !!v;
  });
  const total = SECTIONS.flatMap(s => s.questions.filter(q => q.type !== 'text' && q.id !== 'B3' && q.id !== 'A6')).length;
  const pct = Math.round((answered.length / total) * 100);

  const handleSave = () => toast.success('Questionnaire answers saved (demo).');

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Alternative-Data Questionnaire" description="Additional context to help licensed partners understand your situation." />

      <div className="p-3 bg-muted/50 border border-border/50 rounded-lg flex gap-2 text-xs text-muted-foreground">
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
        <p>This questionnaire provides context for human review by licensed lending partners. Your answers are not automatically scored or used for credit decisions. Final decisions remain with licensed partners.</p>
      </div>

      <Card>
        <CardContent className="pt-4 pb-3">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">Completion</span>
            <span className="text-secondary font-semibold">{pct}%</span>
          </div>
          <Progress value={pct} className="h-2" />
        </CardContent>
      </Card>

      {SECTIONS.map(section => (
        <Card key={section.id}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-display font-semibold text-foreground">{section.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {section.questions.map(q => (
              <div key={q.id}>
                <p className="text-sm font-medium text-foreground">{q.text}</p>
                {q.type === 'text' ? (
                  <Textarea className="mt-2" placeholder="Your answer…" value={answers[q.id] || ''} onChange={e => set(q.id, e.target.value)} rows={2} />
                ) : q.type === 'checkbox' ? (
                  <div className="flex items-start gap-2.5 mt-2">
                    <Checkbox id={q.id} checked={!!answers[q.id]} onCheckedChange={v => set(q.id, v)} className="mt-0.5" />
                    <label htmlFor={q.id} className="text-sm text-muted-foreground cursor-pointer">{q.text}</label>
                  </div>
                ) : q.type === 'multi' ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                    {q.options.map(opt => (
                      <label key={opt} className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer text-sm transition-all ${(answers[q.id] || []).includes(opt) ? 'border-secondary bg-secondary/5' : 'border-border hover:border-secondary/40'}`}>
                        <Checkbox checked={(answers[q.id] || []).includes(opt)} onCheckedChange={() => toggleMulti(q.id, opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                ) : (
                  <Radio name={q.id} options={q.options} value={answers[q.id] || ''} onChange={v => set(q.id, v)} />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-end">
        <Button className="bg-secondary hover:bg-secondary/90 px-8" onClick={handleSave}>Save answers</Button>
      </div>
    </div>
  );
}