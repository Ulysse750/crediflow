import React from 'react';

export default function Logo({ size = 'md', light = false }) {
  const sizes = { sm: 'text-lg', md: 'text-2xl', lg: 'text-3xl' };
  const iconSize = { sm: 'w-7 h-7', md: 'w-9 h-9', lg: 'w-11 h-11' };

  const darkGreen = light ? '#bbf7d0' : '#1a5c38';
  const midGreen = light ? '#86efac' : '#2d7a4f';
  const lightGreen = light ? '#4ade80' : '#5cb85c';
  const stem = light ? '#bbf7d0' : '#1a6b3a';

  return (
    <div className="flex items-center gap-2">
      <svg
        className={iconSize[size]}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Curved hand/wave base */}
        <path
          d="M3 28 C8 22 15 20 20 23 C25 26 32 23 37 18"
          stroke={darkGreen}
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Left leaf */}
        <path
          d="M17 23 C15 17 11 12 15 7 C17 11 19 17 17 23Z"
          fill={midGreen}
        />
        {/* Right leaf */}
        <path
          d="M21 21 C23 15 27 10 25 5 C21 9 19 15 21 21Z"
          fill={lightGreen}
        />
        {/* Stem */}
        <line x1="19" y1="23" x2="19" y2="14" stroke={stem} strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      <span className={`font-display font-bold tracking-tight ${sizes[size]}`}>
        <span style={{ color: light ? '#ffffff' : '#1a5c38' }}>tawi</span>
        <span style={{ color: lightGreen }}>.</span>
        <span style={{ color: lightGreen }}>la</span>
      </span>
    </div>
  );
}