import React from 'react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { getUserTimezone, getTimezoneLabel } from '@/lib/utils/timezone';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Globe, Plus, Flag } from 'lucide-react';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onNewPublish: () => void;
  timezone?: string;
  onOpenCalendarSync?: () => void;
  onOpenCampaigns?: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
  onNewPublish,
  timezone,
  onOpenCalendarSync,
  onOpenCampaigns,
}) => {
  const { user } = useAuth();
  const effectiveTimezone = timezone || getUserTimezone(user);
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Editorial & Release Calendar
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-slate-500 font-mono">
            {monthName} {year}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-900/50 flex items-center gap-1">
            <Globe className="w-3 h-3" /> {getTimezoneLabel(effectiveTimezone)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
        {onOpenCampaigns && (
          <button
            type="button"
            onClick={onOpenCampaigns}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer transition-colors"
            aria-label="Campaigns (Coming in MVP2)"
          >
            <Flag className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden md:inline">Campaigns</span>
            <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
              MVP2
            </span>
          </button>
        )}

        {onOpenCalendarSync && (
          <button
            type="button"
            onClick={onOpenCalendarSync}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer transition-colors"
            aria-label="External Calendar Sync (Coming in MVP2)"
          >
            <CalendarIcon className="w-3.5 h-3.5 text-sky-500" />
            <span className="hidden md:inline">Sync</span>
            <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
              MVP2
            </span>
          </button>
        )}

        <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg p-0.5 bg-white dark:bg-slate-900">
          <button
            type="button"
            onClick={onPrevMonth}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer"
            title="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onToday}
            className="px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer font-mono"
          >
            Today
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer"
            title="Next Month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={onNewPublish}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Schedule Post
        </Button>
      </div>
    </div>
  );
};
