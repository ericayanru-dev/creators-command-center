import React from 'react';
import { Task } from '@/types';
import { UI_CLASSES } from '@/lib/constants/theme';

export type TaskTab = 'ALL' | 'TODAY' | 'UPCOMING' | 'OVERDUE' | 'COMPLETED';

interface TaskFilterTabsProps {
  activeTab: TaskTab;
  onSelectTab: (tab: TaskTab) => void;
  counts: Record<TaskTab, number>;
}

export const TaskFilterTabs: React.FC<TaskFilterTabsProps> = ({
  activeTab,
  onSelectTab,
  counts,
}) => {
  const tabs: { key: TaskTab; label: string }[] = [
    { key: 'ALL', label: 'All Tasks' },
    { key: 'TODAY', label: 'Due Today' },
    { key: 'UPCOMING', label: 'Upcoming' },
    { key: 'OVERDUE', label: 'Overdue' },
    { key: 'COMPLETED', label: 'Completed' },
  ];

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const count = counts[tab.key];
        const isOverdue = tab.key === 'OVERDUE' && count > 0;

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onSelectTab(tab.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
              isActive
                ? `${UI_CLASSES.activePillTab} shadow-xs`
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                isActive
                  ? 'bg-white/20 text-white'
                  : isOverdue
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 font-bold'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
