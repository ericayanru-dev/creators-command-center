import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { Platform } from '@/types';
import { RotateCcw, CheckCircle2, AlertTriangle } from 'lucide-react';

interface SelectiveRetryModalProps {
  isOpen: boolean;
  contentTitle: string;
  failedPlatforms: Platform[];
  successfulPlatforms: Platform[];
  isLoading: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const SelectiveRetryModal: React.FC<SelectiveRetryModalProps> = ({
  isOpen,
  contentTitle,
  failedPlatforms,
  successfulPlatforms,
  isLoading,
  onConfirm,
  onClose,
}) => {
  // Format dynamic wording: "Retry Instagram and TikTok only. YouTube stays published."
  const formatPlatformList = (platforms: Platform[]): string => {
    const capitalized = platforms.map((p) => p.charAt(0).toUpperCase() + p.slice(1));
    if (capitalized.length === 0) return '';
    if (capitalized.length === 1) return capitalized[0];
    if (capitalized.length === 2) return `${capitalized[0]} and ${capitalized[1]}`;
    return `${capitalized.slice(0, -1).join(', ')}, and ${capitalized[capitalized.length - 1]}`;
  };

  const failedText = formatPlatformList(failedPlatforms);
  const successText = formatPlatformList(successfulPlatforms);

  const dynamicConfirmationWording =
    successfulPlatforms.length > 0
      ? `Retry ${failedText} only. ${successText} stay${successfulPlatforms.length === 1 ? 's' : ''} published.`
      : `Retry ${failedText} only.`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Selective Retry" size="md">
      <div className="space-y-4">
        {/* Callout with exact dynamic wording pattern */}
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 font-mono">
              Selective Channel Dispatch
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300 font-semibold leading-relaxed">
              &quot;{dynamicConfirmationWording}&quot;
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Selective retry only attempts failed channels for <strong>&quot;{contentTitle}&quot;</strong>.
          Channels that have already succeeded will <strong>not</strong> be re-posted, preventing duplicate posts on live audience feeds.
        </p>

        {/* Detailed breakdown list */}
        <div className="space-y-2 rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50 dark:bg-slate-900/60 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800">
            <span className="font-mono text-slate-400">Target Channels Being Retried:</span>
            <div className="flex items-center gap-1.5 font-bold text-rose-600 dark:text-rose-400">
              {failedPlatforms.map((p) => (
                <span key={p} className="inline-flex items-center gap-1 capitalize px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/80">
                  <PlatformIcon platform={p} size="xs" /> {p}
                </span>
              ))}
            </div>
          </div>

          {successfulPlatforms.length > 0 && (
            <div className="flex items-center justify-between pt-1">
              <span className="font-mono text-slate-400">Preserved (Unchanged):</span>
              <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                {successfulPlatforms.map((p) => (
                  <span key={p} className="inline-flex items-center gap-1 capitalize px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80">
                    <CheckCircle2 className="w-3 h-3" /> {p}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pt-2 flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Confirm Selective Retry
          </Button>
        </div>
      </div>
    </Modal>
  );
};
