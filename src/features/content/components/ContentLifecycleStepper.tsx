import React from 'react';
import { ContentStatus } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Check, ChevronRight } from 'lucide-react';

interface ContentLifecycleStepperProps {
  currentStatus: ContentStatus;
  onTransition: (newStatus: ContentStatus) => void;
  isLoading: boolean;
}

const LIFECYCLE_STEPS: { status: ContentStatus; label: string; description: string }[] = [
  { status: 'IDEA', label: 'Idea', description: 'Raw concept & angle' },
  { status: 'DRAFT', label: 'Draft', description: 'Scripting & notes' },
  { status: 'READY', label: 'Ready', description: 'Media assets prepared' },
  { status: 'SCHEDULED', label: 'Scheduled', description: 'Release time locked' },
  { status: 'PUBLISHED', label: 'Published', description: 'Live on channels' },
];

export const ContentLifecycleStepper: React.FC<ContentLifecycleStepperProps> = ({
  currentStatus,
  onTransition,
  isLoading,
}) => {
  const currentIndex = LIFECYCLE_STEPS.findIndex((s) => s.status === currentStatus);

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <span className="text-xs font-mono font-bold uppercase text-slate-400">
          Production Lifecycle State Machine
        </span>
        <span className="text-xs font-mono text-slate-500">
          Step {currentIndex + 1} of {LIFECYCLE_STEPS.length}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {LIFECYCLE_STEPS.map((step, index) => {
          const isPassed = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div
              key={step.status}
              onClick={() => {
                if (index !== currentIndex) {
                  onTransition(step.status);
                }
              }}
              className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                isCurrent
                  ? 'border-sky-600 dark:border-sky-500 bg-sky-50/50 dark:bg-slate-800 shadow-xs'
                  : isPassed
                  ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20'
                  : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase text-slate-400">
                  0{index + 1}
                </span>
                {isPassed && <Check className="w-3 h-3 text-emerald-600" />}
              </div>
              <p
                className={`text-xs font-bold ${
                  isCurrent
                    ? 'text-sky-950 dark:text-sky-300'
                    : 'text-slate-800 dark:text-slate-200'
                }`}
              >
                {step.label}
              </p>
              <p className="text-[10px] text-slate-400 leading-tight mt-0.5 line-clamp-1">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
