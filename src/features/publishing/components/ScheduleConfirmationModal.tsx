import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { Content, Platform, SocialAccount } from '@/types';
import { formatDateOnly, formatTimeOnly } from '@/lib/utils';
import { getTimezoneLabel } from '@/lib/utils/timezone';
import { Calendar, Clock, Check, ShieldCheck, Film, Image } from 'lucide-react';

interface ScheduleConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  content: Content;
  selectedPlatforms: Platform[];
  accounts: SocialAccount[];
  scheduledUtcIso: string;
  displayTimezone: string;
}

export const ScheduleConfirmationModal: React.FC<ScheduleConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  content,
  selectedPlatforms,
  accounts,
  scheduledUtcIso,
  displayTimezone,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Review & Confirm Schedule"
      size="md"
    >
      <div className="space-y-5">
        {/* Intro Banner */}
        <div className="p-3.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/60 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-sky-900 dark:text-sky-200 font-mono">
              Pre-Flight Schedule Verification
            </h4>
            <p className="text-xs text-sky-800 dark:text-sky-300 leading-relaxed">
              You are queueing this release across{' '}
              <strong>{selectedPlatforms.length} social channel{selectedPlatforms.length === 1 ? '' : 's'}</strong>.
              All channel validations and asset checks have passed.
            </p>
          </div>
        </div>

        {/* Release Time Card */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                Target Release Window
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100 block">
                {formatDateOnly(scheduledUtcIso)} at {formatTimeOnly(scheduledUtcIso)}
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3" />
                {getTimezoneLabel(displayTimezone)}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 shrink-0">
            Validated
          </span>
        </div>

        {/* Content Item Summary */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
            Content Payload
          </span>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {content.title}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
              {content.contentType} • {content.status}
            </span>
          </div>
          {content.caption && (
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 italic">
              &quot;{content.caption}&quot;
            </p>
          )}
        </div>

        {/* Target Channels List with Versions */}
        <div className="space-y-2.5">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
            Target Channels & Adapted Versions ({selectedPlatforms.length})
          </span>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
            {selectedPlatforms.map((platform) => {
              const account = accounts.find((a) => a.platform === platform);
              const isConnected = account && account.status === 'CONNECTED';
              const version = content.versions?.find((v) => v.platform === platform && v.contentId === content.id);
              const attachedMedia = version?.mediaAsset || content.mediaAsset;

              return (
                <div key={platform} className="p-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <PlatformIcon platform={platform} size="sm" showBackground />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold capitalize text-slate-900 dark:text-slate-100">
                          {platform}
                        </span>
                        {version && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                            Custom Adaptation
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 truncate block">
                        {isConnected
                          ? account.accountHandle || account.accountName
                          : '⚠️ Account unauthenticated'}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 space-y-0.5">
                    <span className="text-[11px] font-mono text-slate-600 dark:text-slate-300 block">
                      {version ? version.title || 'Platform adaptation' : `${platform} version`}
                    </span>
                    {attachedMedia && (
                      <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1 justify-end">
                        {attachedMedia.mimeType?.startsWith('video') ? (
                          <Film className="w-3 h-3 text-sky-500" />
                        ) : (
                          <Image className="w-3 h-3 text-emerald-500" />
                        )}
                        {attachedMedia.fileName}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Operational Note */}
        <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed font-mono">
          Note: Locking schedule will transition this item from [READY] to [SCHEDULED] and queue it into the calendar timeline.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
            leftIcon={<Calendar className="w-4 h-4" />}
          >
            Confirm & Lock Schedule
          </Button>
        </div>
      </div>
    </Modal>
  );
};
