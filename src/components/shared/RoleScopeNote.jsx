import React from 'react';
import { Shield } from 'lucide-react';

const NOTES = {
  borrower: 'You only see your own information.',
  partner: 'You only see records assigned to your institution.',
  admin: 'Admin view: all operational records.',
};

export default function RoleScopeNote({ role }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/60 text-sm text-muted-foreground border border-border/50">
      <Shield className="w-4 h-4 shrink-0" />
      <span>{NOTES[role] || ''}</span>
    </div>
  );
}