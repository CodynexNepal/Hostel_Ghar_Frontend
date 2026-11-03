'use client';

import React, { useState } from 'react';

export type LottieVariant =
  | 'house-assembly'
  | 'search-empty'
  | 'success-check'
  | 'owner-dashboard'
  | 'security-shield'
  | 'location-pin';

interface LottieAnimationProps {
  variant: LottieVariant;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loop?: boolean;
  autoplay?: boolean;
  interactive?: boolean;
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24 sm:w-28 sm:h-28',
  lg: 'w-36 h-36 sm:w-44 sm:h-44',
  xl: 'w-52 h-52 sm:w-64 sm:h-64',
};

export default function LottieAnimation({
  variant,
  className = '',
  size = 'md',
  loop = true,
  interactive = true,
}: LottieAnimationProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      className={`relative inline-flex items-center justify-center ${sizeClasses[size]} ${className} select-none transition-transform duration-300 ${
        isHovered ? 'scale-105' : 'scale-100'
      }`}
      role="img"
      aria-label={`Animation: ${variant}`}
    >
      {/* 1. House Assembly & Discovery */}
      {variant === 'house-assembly' && (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          {/* Ambient Glow */}
          <circle
            cx="60"
            cy="60"
            r="48"
            fill="#B9FF66"
            fillOpacity="0.12"
            className="animate-pulse"
          />

          {/* House Base Structure */}
          <rect
            x="32"
            y="52"
            width="56"
            height="46"
            rx="6"
            fill="#0F0F10"
            stroke="#B9FF66"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Animated Roof Assembly */}
          <path
            d="M24 54L60 22L96 54"
            stroke="#010101"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24 54L60 22L96 54"
            stroke="#B9FF66"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="140"
            strokeDashoffset="0"
          />

          {/* Chimney */}
          <rect
            x="74"
            y="28"
            width="8"
            height="14"
            rx="2"
            fill="#0F0F10"
            stroke="#B9FF66"
            strokeWidth="2"
          />

          {/* Cozy Glowing Window (Left) */}
          <rect
            x="40"
            y="62"
            width="14"
            height="14"
            rx="2.5"
            fill="#B9FF66"
            className="animate-pulse"
          />
          <line x1="47" y1="62" x2="47" y2="76" stroke="#010101" strokeWidth="1.5" />
          <line x1="40" y1="69" x2="54" y2="69" stroke="#010101" strokeWidth="1.5" />

          {/* Doorway (Right) */}
          <path
            d="M66 98V74C66 71.8 67.8 70 70 70H78C80.2 70 82 71.8 82 74V98"
            fill="#B9FF66"
            fillOpacity="0.25"
            stroke="#B9FF66"
            strokeWidth="2"
          />
          <circle cx="78" cy="84" r="1.5" fill="#B9FF66" />

          {/* Floating Key / Star */}
          <circle cx="94" cy="36" r="3" fill="#B9FF66" className="animate-ping" />
        </svg>
      )}

      {/* 2. Search / Empty State Discovery */}
      {variant === 'search-empty' && (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          <circle cx="60" cy="60" r="50" fill="#F4F4F5" />

          {/* Cozy Bed Frame */}
          <rect x="30" y="64" width="60" height="26" rx="4" fill="#0F0F10" />
          <rect x="34" y="58" width="22" height="10" rx="3" fill="#E4E4E7" />
          <rect x="30" y="74" width="60" height="16" rx="3" fill="#B9FF66" />

          {/* Floating Magnifier */}
          <g className="transition-transform duration-500 origin-center hover:rotate-12">
            <circle
              cx="68"
              cy="48"
              r="20"
              fill="#FFFFFF"
              stroke="#010101"
              strokeWidth="4"
              className="drop-shadow-lg"
            />
            <circle cx="68" cy="48" r="15" fill="#B9FF66" fillOpacity="0.3" />
            <line
              x1="82"
              y1="62"
              x2="98"
              y2="78"
              stroke="#010101"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <line
              x1="82"
              y1="62"
              x2="98"
              y2="78"
              stroke="#B9FF66"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>

          {/* Little Stars */}
          <circle cx="36" cy="36" r="2" fill="#B9FF66" />
          <circle cx="92" cy="30" r="3" fill="#B9FF66" className="animate-ping" />
        </svg>
      )}

      {/* 3. Success Checkmark Burst */}
      {variant === 'success-check' && (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-lg"
        >
          {/* Burst Particles */}
          <circle cx="60" cy="16" r="3" fill="#B9FF66" />
          <circle cx="104" cy="60" r="3" fill="#B9FF66" />
          <circle cx="60" cy="104" r="3" fill="#B9FF66" />
          <circle cx="16" cy="60" r="3" fill="#B9FF66" />
          <circle cx="28" cy="28" r="2" fill="#010101" />
          <circle cx="92" cy="92" r="2" fill="#010101" />

          {/* Outer Badge */}
          <circle
            cx="60"
            cy="60"
            r="38"
            fill="#B9FF66"
            stroke="#010101"
            strokeWidth="4"
            className="drop-shadow-md"
          />
          {/* Checkmark */}
          <path
            d="M44 60L54 70L76 46"
            stroke="#010101"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {/* 4. Hostel Owner Dashboard & Telemetry */}
      {variant === 'owner-dashboard' && (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          {/* Tablet/Dashboard Chassis */}
          <rect
            x="22"
            y="24"
            width="76"
            height="72"
            rx="8"
            fill="#0F0F10"
            stroke="#262626"
            strokeWidth="2"
          />

          {/* Header Bar */}
          <line
            x1="28"
            y1="36"
            x2="68"
            y2="36"
            stroke="#525252"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="88" cy="36" r="3" fill="#B9FF66" className="animate-pulse" />

          {/* Rising Analytics Bars */}
          <rect x="32" y="66" width="10" height="20" rx="2" fill="#B9FF66" fillOpacity="0.4" />
          <rect x="46" y="52" width="10" height="34" rx="2" fill="#B9FF66" fillOpacity="0.7" />
          <rect x="60" y="44" width="10" height="42" rx="2" fill="#B9FF66" />
          <rect x="74" y="58" width="10" height="28" rx="2" fill="#B9FF66" fillOpacity="0.85" />

          {/* Telemetry Target Trendline */}
          <path
            d="M37 64L51 50L65 42L79 56"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {/* 5. Physical Audit & Security Shield */}
      {variant === 'security-shield' && (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-lg"
        >
          <path
            d="M60 20L92 34V60C92 78 78 94 60 100C42 94 28 78 28 60V34L60 20Z"
            fill="#0F0F10"
            stroke="#B9FF66"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Inner Badge */}
          <path
            d="M60 28L84 38V58C84 72 73 85 60 90C47 85 36 72 36 58V38L60 28Z"
            fill="#B9FF66"
            fillOpacity="0.15"
          />
          {/* Verification Checkmark */}
          <path
            d="M48 60L56 68L74 48"
            stroke="#B9FF66"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {/* 6. Pulsing Location Pin */}
      {variant === 'location-pin' && (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          {/* Radar Circles */}
          <circle
            cx="60"
            cy="85"
            r="22"
            stroke="#B9FF66"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="animate-spin"
          />
          <ellipse cx="60" cy="85" rx="14" ry="6" fill="#B9FF66" fillOpacity="0.3" />

          {/* Pin */}
          <path
            d="M60 30C46.7 30 36 40.7 36 54C36 70 60 88 60 88C60 88 84 70 84 54C84 40.7 73.3 30 60 30Z"
            fill="#0F0F10"
            stroke="#B9FF66"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="60" cy="52" r="8" fill="#B9FF66" />
        </svg>
      )}
    </div>
  );
}
