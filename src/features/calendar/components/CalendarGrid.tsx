import React from 'react';
import { Publication, Content } from '@/types';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { UI_CLASSES } from '@/lib/constants/theme';
import { Clock } from 'lucide-react';

interface CalendarGridProps {
  currentDate: Date;
  publications: Publication[];
  contentList: Content[];
  onSelectDay: (dateStr: string, dayPubs: Publication[], dayDeadlines: Content[]) => void;
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  publications,
  contentList,
  onSelectDay,
}) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  // Build calendar matrix cells
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day);
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
      {/* Day of Week Headers */}
      <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 text-center py-2.5">
        {DAYS_OF_WEEK.map((d) => (
          <span key={d} className="text-[11px] font-mono font-bold text-slate-400 uppercase">
            {d}
          </span>
        ))}
      </div>

      {/* Grid of Days */}
      <div className="grid grid-cols-7 divide-x divide-y divide-slate-100 dark:divide-slate-800/60 border-b border-slate-200 dark:border-slate-800">
        {cells.map((day, idx) => {
          if (day === null) {
            return (
              <div
                key={`empty_${idx}`}
                className="min-h-24 sm:min-h-32 bg-slate-50/40 dark:bg-slate-950/20"
              />
            );
          }

          const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isToday = isCurrentMonth && today.getDate() === day;

          // Find publications for this day
          const dayPubs = publications.filter((p) => {
            const pubDate = p.scheduledAt || p.publishedAt;
            return pubDate && pubDate.startsWith(dayStr);
          });

          // Find deadlines for this day
          const dayDeadlines = contentList.filter((c) => {
            return c.deadline && c.deadline.startsWith(dayStr);
          });

          return (
            <div
              key={dayStr}
              onClick={() => onSelectDay(dayStr, dayPubs, dayDeadlines)}
              className={`min-h-24 sm:min-h-32 p-1.5 sm:p-2.5 flex flex-col justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${
                isToday ? 'bg-sky-50/40 dark:bg-sky-950/20 ring-1 ring-inset ring-sky-500/50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-mono font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                    isToday
                      ? UI_CLASSES.brandIconBg
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {day}
                </span>
                {(dayPubs.length > 0 || dayDeadlines.length > 0) && (
                  <span className="text-[10px] font-mono text-slate-400">
                    {dayPubs.length + dayDeadlines.length}
                  </span>
                )}
              </div>

              {/* Day Badges */}
              <div className="space-y-1 mt-1 overflow-hidden">
                {dayPubs.slice(0, 2).map((p) => (
                  <div
                    key={p.id}
                    className={`px-1.5 py-0.5 rounded text-[10px] truncate flex items-center gap-1 font-medium ${
                      p.status === 'PUBLISHED'
                        ? 'bg-emerald-100/70 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : p.status === 'FAILED'
                        ? 'bg-rose-100/70 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-sky-100/70 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                    }`}
                  >
                    <PlatformIcon platform={p.platform} size="xs" />
                    <span className="truncate">{p.contentTitle}</span>
                  </div>
                ))}

                {dayDeadlines.slice(0, 1).map((c) => (
                  <div
                    key={c.id}
                    className="px-1.5 py-0.5 rounded bg-amber-100/70 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-[10px] truncate flex items-center gap-1 font-medium font-mono"
                  >
                    <Clock className="w-2.5 h-2.5 shrink-0" />
                    <span className="truncate">{c.title}</span>
                  </div>
                ))}

                {dayPubs.length + dayDeadlines.length > 3 && (
                  <span className="text-[9px] font-mono text-slate-400 block text-right">
                    +{dayPubs.length + dayDeadlines.length - 3} more
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
