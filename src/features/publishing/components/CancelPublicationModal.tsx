import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { Publication } from '@/types';
import { formatDateOnly, formatTimeOnly } from '@/lib/utils';
import { AlertTriangle, XCircle, Clock } from 'lucide-react';

interface CancelPublicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  publication: Publication | null;
}

export const CancelPublicationModal: React.FC<CancelPublicationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  publication,
}) => {
  if (!publication) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cancel Scheduled Release"
      size="sm"
    >
      <div className="space-y-4">
        {/* Warning Banner */}
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 font-mono">
              Remove from Automation Queue
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              This publication will no longer automatically broadcast. If this is the only active schedule for this content item, its status will revert to <strong>[READY]</strong>.
            </p>
          </div>
        </div>

        {/* Publication Details */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2.5">
            <PlatformIcon platform={publication.platform} size="sm" showBackground />
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                {publication.contentTitle}
              </span>
              <span className="text-[11px] font-mono text-slate-400 capitalize">
                {publication.platform} • {publication.accountHandle}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/80 flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>
              Scheduled for {formatDateOnly(publication.scheduledAt)} at {formatTimeOnly(publication.scheduledAt)} ({publication.displayTimezone})
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={isLoading}
          >
            Keep Scheduled
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
            leftIcon={<XCircle className="w-4 h-4" />}
          >
            Cancel Publication
          </Button>
        </div>
      </div>
    </Modal>
  );
};
