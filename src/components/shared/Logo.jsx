import React from 'react';

export default function Logo({ size = 'md', light = false }) {
  const sizes = { sm: 'text-lg', md: 'text-2xl', lg: 'text-3xl' };
  const iconSize = { sm: 'w-6 h-6', md: 'w-8 h-8', lg: 'w-10 h-10' };

  return (
    <div className="flex items-center gap-2">
      {/* Hand + sprout icon */}
      <svg
        className={iconSize[size]}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hand / leaf base */}
        <path
          d="M4 26 C8 22 14 20 20 22 C26 24 32 22 36 18"
          stroke={light ? '#a7f3a0' : '#1a6b3a'}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M6 28 C10 24 16 22 22 24 C28 26 33 24 36 20"
          stroke={light ? '#bbf7d0' : '#22543d'}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        {/* Left leaf */}
        <path
          d="M16 22 C14 16 10 12 14 8 C16 12 18 16 16 22Z"
          fill={light ? '#86efac' : '#2d7a4f'}
        />
        {/* Right leaf */}
        <path
          d="M21 20 C22 14 26 10 24 6 C20 9 18 14 21 20Z"
          fill={light ? '#4ade80' : '#5cb85c'}
        />
        {/* Center sprout */}
        <path
          d="M19 22 L19 14"
          stroke={light ? '#bbf7d0' : '#1a6b3a'}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Text: tawi.la with two-tone styling */}
      <span className={`font-display font-bold tracking-tight ${sizes[size]}`}>
        <span style={{ color: light ? '#fff' : '#1a5c38' }}>tawi</span>
        <span style={{ color: light ? '#86efac' : '#4a9e4a' }}>.</span>
        <span style={{ color: light ? '#4ade80' : '#5cb85c' }}>la</span>
      </span>
    </div>
  );
}