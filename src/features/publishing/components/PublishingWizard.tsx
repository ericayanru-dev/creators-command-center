import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { Content, Platform, SocialAccount } from '@/types';
import { UI_CLASSES } from '@/lib/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { getUserTimezone, getTimezoneLabel } from '@/lib/utils/timezone';
import { Send, Calendar, Check } from 'lucide-react';

interface PublishingWizardProps {
  contentList: Content[];
  selectedContentId: string;
  onSelectContent: (id: string) => void;
  selectedContent?: Content;
  accounts: SocialAccount[];
  selectedPlatforms: Platform[];
  onTogglePlatform: (platform: Platform) => void;
  publishMode: 'NOW' | 'SCHEDULE';
  onChangePublishMode: (mode: 'NOW' | 'SCHEDULE') => void;
  scheduleDate: string;
  onChangeScheduleDate: (val: string) => void;
  scheduleTime: string;
  onChangeScheduleTime: (val: string) => void;
  isExecutingPublish: boolean;
  onExecutePublishNow: () => void;
  onExecuteSchedule: () => void;
  timezone?: string;
}

export const PublishingWizard: React.FC<PublishingWizardProps> = ({
  contentList,
  selectedContentId,
  onSelectContent,
  selectedContent,
  accounts,
  selectedPlatforms,
  onTogglePlatform,
  publishMode,
  onChangePublishMode,
  scheduleDate,
  onChangeScheduleDate,
  scheduleTime,
  onChangeScheduleTime,
  isExecutingPublish,
  onExecutePublishNow,
  onExecuteSchedule,
  timezone,
}) => {
  const { user } = useAuth();
  const effectiveTimezone = timezone || getUserTimezone(user);

  const isEligibleForAction =
    selectedContent &&
    (selectedContent.status === 'READY' || selectedContent.status === 'SCHEDULED');

  return (
    <div className="space-y-6">
      {/* Step 1: Select Content */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <span className="text-xs font-mono font-bold uppercase text-slate-400">
            Step 1 • Select Content
          </span>
          <span className="text-xs font-mono text-slate-400">
            {contentList.length} items available
          </span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Content Item
          </label>
          <select
            value={selectedContentId}
            onChange={(e) => onSelectContent(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-100 font-medium"
          >
            {contentList.map((c) => (
              <option key={c.id} value={c.id}>
                [{c.status}] {c.title} ({c.contentType})
              </option>
            ))}
          </select>
        </div>

        {selectedContent && (
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {selectedContent.title}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold">
                {selectedContent.status}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] line-clamp-2">
              {selectedContent.caption || selectedContent.description || 'No caption entered'}
            </p>
            {!isEligibleForAction && (
              <div className="mt-2 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-[11px] text-amber-800 dark:text-amber-300">
                {selectedContent.status === 'PUBLISHED'
                  ? '✓ Content is already [PUBLISHED]. Published is a terminal lifecycle state.'
                  : `⚠️ Content is currently [${selectedContent.status}]. It must be marked as READY before it can be scheduled or published.`}
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Step 2: Target Channels */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <span className="text-xs font-mono font-bold uppercase text-slate-400">
            Step 2 • Choose Target Platforms
          </span>
          <span className="text-xs font-mono text-slate-400">
            {selectedPlatforms.length} selected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(['youtube', 'instagram', 'tiktok', 'linkedin', 'facebook'] as Platform[]).map((p) => {
            const account = accounts.find((a) => a.platform === p);
            const isConnected = account && account.status === 'CONNECTED';
            const isSelected = selectedPlatforms.includes(p);
            const hasVersion = selectedContent?.versions?.some((v) => v.platform === p && v.contentId === selectedContent.id);

            return (
              <div
                key={p}
                onClick={() => onTogglePlatform(p)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/40'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <PlatformIcon platform={p} size="sm" showBackground />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 capitalize block">
                        {p}
                      </span>
                      {hasVersion ? (
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-semibold">
                          Version ready
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-semibold">
                          No version
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {isConnected ? account.accountHandle : '⚠️ Unconnected / Reauth'}
                    </span>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    isSelected
                      ? `${UI_CLASSES.buttonBrand} border-transparent`
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Step 3: Choose Mode & Execute */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <span className="text-xs font-mono font-bold uppercase text-slate-400">
            Step 3 • Delivery Mode
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onChangePublishMode('NOW')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              publishMode === 'NOW'
                ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-300 font-semibold'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Send className="w-5 h-5 mb-2 text-sky-600 dark:text-sky-400" />
            <span className="text-xs font-bold block">Publish Immediately</span>
            <span className="text-[11px] text-slate-400 leading-snug">
              Broadcast now across all selected social feeds.
            </span>
          </button>

          <button
            type="button"
            onClick={() => onChangePublishMode('SCHEDULE')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              publishMode === 'SCHEDULE'
                ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-300 font-semibold'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Calendar className="w-5 h-5 mb-2 text-sky-600" />
            <span className="text-xs font-bold block">Schedule for Later</span>
            <span className="text-[11px] text-slate-400 leading-snug">
              Queue for optimal release time.
            </span>
          </button>
        </div>

        {publishMode === 'SCHEDULE' && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="date"
              label="Release Date"
              value={scheduleDate}
              onChange={(e) => onChangeScheduleDate(e.target.value)}
            />
            <Input
              type="time"
              label={`Release Time (${getTimezoneLabel(effectiveTimezone)})`}
              value={scheduleTime}
              onChange={(e) => onChangeScheduleTime(e.target.value)}
            />
          </div>
        )}

        <div className="pt-2 flex justify-end">
          {publishMode === 'NOW' ? (
            <Button
              variant="primary"
              size="md"
              isLoading={isExecutingPublish}
              disabled={!isEligibleForAction || selectedPlatforms.length === 0}
              onClick={onExecutePublishNow}
              leftIcon={<Send className="w-4 h-4" />}
            >
              Execute Immediate Publish ({selectedPlatforms.length} Channels)
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              isLoading={isExecutingPublish}
              disabled={!isEligibleForAction || selectedPlatforms.length === 0}
              onClick={onExecuteSchedule}
              leftIcon={<Calendar className="w-4 h-4" />}
            >
              Lock Schedule into Calendar
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
