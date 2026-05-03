import React from 'react';

export default function Logo({ size = 'md', light = false }) {
  const sizes = { sm: 'text-lg', md: 'text-2xl', lg: 'text-3xl' };
  const dotSize = { sm: 'w-1.5 h-1.5', md: 'w-2 h-2', lg: 'w-2.5 h-2.5' };

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center gap-0.5">
        <div className={`${dotSize[size]} rounded-full ${light ? 'bg-white' : 'bg-primary'}`} />
        <svg className={`${size === 'sm' ? 'w-4 h-3' : size === 'md' ? 'w-6 h-4' : 'w-8 h-5'}`} viewBox="0 0 24 16" fill="none">
          <path d="M0 8C4 2 8 2 12 8C16 14 20 14 24 8" stroke={light ? '#fff' : '#2FAE8F'} strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div className={`${dotSize[size]} rounded-full bg-secondary`} />
        <svg className={`${size === 'sm' ? 'w-4 h-3' : size === 'md' ? 'w-6 h-4' : 'w-8 h-5'}`} viewBox="0 0 24 16" fill="none">
          <path d="M0 8C4 2 8 2 12 8C16 14 20 14 24 8" stroke={light ? '#fff' : '#2FAE8F'} strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div className={`${dotSize[size]} rounded-full ${light ? 'bg-white' : 'bg-accent'}`} />
      </div>
      <span className={`font-display font-bold tracking-tight ${sizes[size]} ${light ? 'text-white' : 'text-primary'}`}>
        CrediFlow
      </span>
    </div>
  );
}