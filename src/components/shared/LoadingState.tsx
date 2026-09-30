import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading your content...',
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      <Loader2 className="w-8 h-8 animate-spin text-sky-600 dark:text-sky-400 mb-3" />
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 font-mono tracking-tight">{message}</p>
    </div>
  );
};

export const CardSkeleton: React.FC<{ count?: number; className?: string }> = ({ count = 3, className }) => {
  return (
    <div className={cn('grid gap-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3 animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-16" />
          </div>
          <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-3/4" />
          <div className="flex items-center gap-3 pt-2">
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-20" />
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-24" />
          </div>
        </div>
      ))}
    </div>
  );
};
