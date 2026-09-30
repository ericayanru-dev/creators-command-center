import React from 'react';
import { DESIGN_TOKENS } from '@/lib/constants/theme';
import { ContentStatus, PlatformAccountStatus, PublicationStatus, TaskStatus } from '@/types';

export interface StatusBadgeProps {
  status: ContentStatus | PublicationStatus | PlatformAccountStatus | TaskStatus | 'OVERDUE' | 'PARTIAL_SUCCESS' | string;
  type?: 'content' | 'publication' | 'account' | 'task';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type = 'content',
  size = 'sm',
  className = '',
  showDot = false,
}) => {
  const s = status.toUpperCase();

  // 1. Content Lifecycle Stages
  if (s in DESIGN_TOKENS.statusBadges.content) {
    const config = DESIGN_TOKENS.statusBadges.content[s as keyof typeof DESIGN_TOKENS.statusBadges.content];
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold border ${config.bg} ${className}`}
      >
        {showDot && <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />}
        <span>{config.label.toUpperCase()}</span>
      </span>
    );
  }

  // 2. Publication Statuses
  if (s in DESIGN_TOKENS.statusBadges.publication) {
    const config = DESIGN_TOKENS.statusBadges.publication[s as keyof typeof DESIGN_TOKENS.statusBadges.publication];
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold border ${config.bg} ${className}`}
      >
        <span>{config.label.toUpperCase()}</span>
      </span>
    );
  }

  // 3. Account Statuses
  if (s in DESIGN_TOKENS.statusBadges.accountStatus) {
    const config = DESIGN_TOKENS.statusBadges.accountStatus[s as keyof typeof DESIGN_TOKENS.statusBadges.accountStatus];
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold border ${config.bg} ${className}`}
      >
        <span>{config.label.toUpperCase()}</span>
      </span>
    );
  }

  // Fallbacks for special cases
  if (s === 'OVERDUE') {
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold border bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200 dark:border-rose-900/40 ${className}`}
      >
        OVERDUE
      </span>
    );
  }

  if (s === 'PARTIAL_SUCCESS') {
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold border bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800 ${className}`}
      >
        PARTIAL SUCCESS
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold border bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700 ${className}`}
    >
      {status.toUpperCase()}
    </span>
  );
};
