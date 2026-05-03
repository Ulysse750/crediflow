import React from 'react';
import { Card } from '@/components/ui/card';

export default function MetricCard({ label, value, icon: Icon, color = 'text-primary' }) {
  return (
    <Card className="p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{label}</p>
          <p className="text-2xl font-bold mt-1 text-foreground">{value}</p>
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-xl bg-muted/60 ${color}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </Card>
  );
}