import React from 'react';
import { Platform } from '@/types';
import { cn } from '@/lib/utils';

export interface PlatformIconProps {
  platform: Platform | string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBackground?: boolean;
}

export const PlatformIcon: React.FC<PlatformIconProps> = ({
  platform,
  size = 'md',
  className,
  showBackground = false,
}) => {
  const sizeMap = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  const containerSize = {
    xs: 'w-6 h-6',
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  };

  const p = platform.toLowerCase();

  const renderIcon = () => {
    switch (p) {
      case 'youtube':
        return (
          <svg className={cn(sizeMap[size])} viewBox="0 0 24 24" fill="none" aria-label="YouTube">
            <path
              d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
              fill="#FF0000"
            />
            <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FFFFFF" />
          </svg>
        );

      case 'instagram':
        return (
          <svg className={cn(sizeMap[size])} viewBox="0 0 24 24" fill="none" aria-label="Instagram">
            <defs>
              <radialGradient id="ig_grad" cx="20%" cy="100%" r="130%" fx="20%" fy="100%">
                <stop offset="0%" stopColor="#fdf497" />
                <stop offset="5%" stopColor="#fdf497" />
                <stop offset="45%" stopColor="#fd5949" />
                <stop offset="60%" stopColor="#d6249f" />
                <stop offset="90%" stopColor="#285AEB" />
              </radialGradient>
            </defs>
            <rect width="24" height="24" rx="6" fill="url(#ig_grad)" />
            <path
              d="M12 5.838c2.007 0 2.245.008 3.037.043.734.034 1.132.157 1.397.26.35.137.6.3.864.563.263.264.426.514.563.864.103.265.226.663.26 1.397.036.792.044 1.03.044 3.037s-.008 2.245-.044 3.037c-.034.734-.157 1.132-.26 1.397a2.33 2.33 0 0 1-.563.864 2.33 2.33 0 0 1-.864.563c-.265.103-.663.226-1.397.26-.792.036-1.03.044-3.037.044s-2.245-.008-3.037-.044c-.734-.034-1.132-.157-1.397-.26a2.33 2.33 0 0 1-.864-.563 2.33 2.33 0 0 1-.563-.864c-.103-.265-.226-.663-.26-1.397C5.846 14.245 5.838 14.007 5.838 12s.008-2.245.044-3.037c.034-.734.157-1.132.26-1.397.137-.35.3-.6.563-.864.264-.263.514-.426.864-.563.265-.103.663-.226 1.397-.26.792-.035 1.03-.043 3.037-.043zm0-1.442c-2.04 0-2.296.009-3.097.045-.8.037-1.346.164-1.824.35a3.772 3.772 0 0 0-1.365.89 3.772 3.772 0 0 0-.89 1.365c-.186.478-.313 1.025-.35 1.824C4.438 9.664 4.43 9.92 4.43 12c0 2.08.008 2.336.045 3.097.037.8.164 1.346.35 1.824.193.498.45.92.89 1.365.445.44.867.697 1.365.89.478.186 1.025.313 1.824.35.801.036 1.057.045 3.097.045 2.04 0 2.296-.009 3.097-.045.8-.037 1.346-.164 1.824-.35.498-.193.92-.45 1.365-.89.44-.445.697-.867.89-1.365.186-.478.313-1.025.35-1.824.036-.801.045-1.057.045-3.097 0-2.04-.009-2.296-.045-3.097-.037-.8-.164-1.346-.35-1.824a3.772 3.772 0 0 0-.89-1.365 3.772 3.772 0 0 0-1.365-.89c-.478-.186-1.025-.313-1.824-.35-.801-.036-1.057-.045-3.097-.045z"
              fill="#FFFFFF"
            />
            <path
              d="M12 8.162a3.838 3.838 0 1 0 0 7.676 3.838 3.838 0 0 0 0-7.676zm0 6.234a2.396 2.396 0 1 1 0-4.792 2.396 2.396 0 0 1 0 4.792zM16.988 7.91a.898.898 0 1 1-1.796 0 .898.898 0 0 1 1.796 0z"
              fill="#FFFFFF"
            />
          </svg>
        );

      case 'tiktok':
        return (
          <svg className={cn(sizeMap[size])} viewBox="0 0 24 24" fill="none" aria-label="TikTok">
            <rect width="24" height="24" rx="6" fill="#010101" />
            <path
              d="M16.6 8.2c-.8-.5-1.4-1.2-1.7-2.1-.2-.6-.3-1.2-.3-1.8h-2.4v10.6c0 1.3-1.1 2.4-2.4 2.4s-2.4-1.1-2.4-2.4 1.1-2.4 2.4-2.4c.3 0 .5 0 .8.1V10c-.3 0-.5-.1-.8-.1-2.7 0-4.8 2.2-4.8 4.8s2.2 4.8 4.8 4.8 4.8-2.2 4.8-4.8V9.6c1.1.8 2.5 1.2 3.8 1.2V8.4c-.6 0-1.2-.1-1.8-.2z"
              fill="#25F4EE"
            />
            <path
              d="M16.8 8c-.8-.5-1.4-1.2-1.7-2.1-.2-.6-.3-1.2-.3-1.8h-2.4v10.6c0 1.3-1.1 2.4-2.4 2.4s-2.4-1.1-2.4-2.4 1.1-2.4 2.4-2.4c.3 0 .5 0 .8.1V10c-.3 0-.5-.1-.8-.1-2.7 0-4.8 2.2-4.8 4.8s2.2 4.8 4.8 4.8 4.8-2.2 4.8-4.8V9.6c1.1.8 2.5 1.2 3.8 1.2V8.4c-.6 0-1.2-.1-1.8-.4z"
              fill="#FE2C55"
              style={{ mixBlendMode: 'screen' }}
            />
            <path
              d="M16.7 8.1c-.8-.5-1.4-1.2-1.7-2.1-.2-.6-.3-1.2-.3-1.8h-2.4v10.6c0 1.3-1.1 2.4-2.4 2.4s-2.4-1.1-2.4-2.4 1.1-2.4 2.4-2.4c.3 0 .5 0 .8.1V10c-.3 0-.5-.1-.8-.1-2.7 0-4.8 2.2-4.8 4.8s2.2 4.8 4.8 4.8 4.8-2.2 4.8-4.8V9.6c1.1.8 2.5 1.2 3.8 1.2V8.4c-.6 0-1.2-.1-1.8-.3z"
              fill="#FFFFFF"
            />
          </svg>
        );

      case 'linkedin':
        return (
          <svg className={cn(sizeMap[size])} viewBox="0 0 24 24" fill="none" aria-label="LinkedIn">
            <rect width="24" height="24" rx="4" fill="#0A66C2" />
            <path
              d="M7.4 18.5H4.8V9.8h2.6v8.7zM6.1 8.7C5.3 8.7 4.6 8 4.6 7.2c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5c0 .8-.7 1.5-1.5 1.5zM19.4 18.5h-2.6v-4.3c0-1-.02-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.2v4.4h-2.6V9.8h2.5v1.2h.04c.35-.7 1.2-1.4 2.5-1.4 2.7 0 3.2 1.8 3.2 4.1v4.8z"
              fill="#FFFFFF"
            />
          </svg>
        );

      case 'facebook':
        return (
          <svg className={cn(sizeMap[size])} viewBox="0 0 24 24" fill="none" aria-label="Facebook">
            <circle cx="12" cy="12" r="12" fill="#1877F2" />
            <path
              d="M15.4 12.3l.5-3.3h-3.2V6.8c0-.9.3-1.6 1.6-1.6h1.7V2.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.5H6.4v3.3h2.9V21c.6.1 1.2.1 1.8.1.6 0 1.2 0 1.8-.1v-8.7h2.5z"
              fill="#FFFFFF"
            />
          </svg>
        );

      default:
        return (
          <div className={cn(sizeMap[size], 'rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-800 dark:text-slate-200')}>
            {platform.substring(0, 2).toUpperCase()}
          </div>
        );
    }
  };

  if (showBackground) {
    return (
      <div className={cn('inline-flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0', containerSize[size], className)}>
        {renderIcon()}
      </div>
    );
  }

  return <span className={cn('inline-flex items-center justify-center shrink-0', className)}>{renderIcon()}</span>;
};
