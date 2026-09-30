import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { Platform } from '@/types';
import { Loader2, Bell, CheckCircle2 } from 'lucide-react';

interface PublishingExecutionProgressProps {
  isOpen: boolean;
  contentTitle: string;
  targetPlatforms: Platform[];
  onDismiss: () => void;
}

export const PublishingExecutionProgress: React.FC<PublishingExecutionProgressProps> = ({
  isOpen,
  contentTitle,
  targetPlatforms,
  onDismiss,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onDismiss} title="Publishing Distribution in Progress" size="md">
      <div className="space-y-5 text-center py-2">
        <div className="w-14 h-14 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto">
          <Loader2 className="w-7 h-7 animate-spin" />
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Broadcasting &quot;{contentTitle}&quot;
          </h3>
          <p className="text-xs text-slate-500 font-mono">
            Transmitting media stream across {targetPlatforms.length} target platform{targetPlatforms.length > 1 ? 's' : ''}...
          </p>
        </div>

        {/* Selected target icons */}
        <div className="flex items-center justify-center gap-3 py-2">
          {targetPlatforms.map((p) => (
            <div key={p} className="flex flex-col items-center gap-1">
              <PlatformIcon platform={p} size="sm" showBackground />
              <span className="text-[10px] font-mono capitalize text-slate-400">{p}</span>
            </div>
          ))}
        </div>

        {/* Approved exact UX background publishing message */}
        <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-left space-y-2">
          <div className="flex items-center gap-2 text-sky-800 dark:text-sky-300 font-bold text-xs">
            <Bell className="w-4 h-4 shrink-0 text-sky-600 dark:text-sky-400" />
            <span>You can leave. We’ll notify you when this finishes.</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
            Distribution processes asynchronously in the background. You do not need to keep this page open;
            you will receive an in-app notification and ledger update as soon as all channel release attempts complete.
          </p>
        </div>

        <div className="pt-2">
          <Button variant="outline" size="sm" onClick={onDismiss} className="w-full">
            Continue Working in Background
          </Button>
        </div>
      </div>
    </Modal>
  );
};
