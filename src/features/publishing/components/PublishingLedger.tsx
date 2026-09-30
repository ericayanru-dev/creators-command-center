import React from 'react';
import { useNavigate } from "@/lib/navigation";
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { Platform, Publication } from '@/types';
import { formatDateOnly, formatTimeOnly } from '@/lib/utils';
import { RotateCcw, ArrowRight } from 'lucide-react';

interface PublishingLedgerProps {
  publications: Publication[];
  onSelectiveRetry: (failedPlatforms: Platform[]) => void;
  onRequestCancelScheduled: (pub: Publication) => void;
  onRequestReschedule?: (pub: Publication) => void;
}

export const PublishingLedger: React.FC<PublishingLedgerProps> = ({
  publications,
  onSelectiveRetry,
  onRequestCancelScheduled,
  onRequestReschedule,
}) => {
  const navigate = useNavigate();

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
          Complete Publishing Ledger
        </h3>
        <span className="text-xs font-mono text-slate-400">
          {publications.length} records
        </span>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {publications.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400 font-mono">
            No publication records logged yet.
          </div>
        ) : (
          publications.map((pub) => {
            const isPublished = pub.status === 'PUBLISHED';
            const isScheduled = pub.status === 'SCHEDULED';
            const isFailed = pub.status === 'FAILED';
            const isCancelled = pub.status === 'CANCELLED';

            return (
              <div
                key={pub.id}
                className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <PlatformIcon platform={pub.platform} size="md" showBackground />
                  <div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => navigate(`/content/${pub.contentId}`)}
                        className="text-xs font-bold text-slate-900 dark:text-slate-100 hover:text-sky-600 transition-colors cursor-pointer text-left focus:outline-hidden focus-visible:underline"
                      >
                        {pub.contentTitle}
                      </button>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                          isPublished
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : isScheduled
                            ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                            : isCancelled
                            ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                      >
                        {pub.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-slate-400">
                      <span className="capitalize">{pub.platform}</span>
                      <span>•</span>
                      <span>{pub.accountHandle}</span>
                      <span>•</span>
                      <span>Attempts: {pub.attemptsCount}</span>
                      {pub.publishedAt && (
                        <>
                          <span>•</span>
                          <span>Published: {formatDateOnly(pub.publishedAt)}</span>
                        </>
                      )}
                      {pub.cancelledAt && (
                        <>
                          <span>•</span>
                          <span>Cancelled: {formatDateOnly(pub.cancelledAt)}</span>
                        </>
                      )}
                      {isScheduled && (
                        <>
                          <span>•</span>
                          <span>
                            Scheduled: {formatDateOnly(pub.scheduledAt)} {formatTimeOnly(pub.scheduledAt)}
                          </span>
                        </>
                      )}
                    </div>

                    {isFailed && (
                      <div className="mt-2 p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-300">
                        <strong>Failure Cause:</strong> {pub.lastErrorReason || 'API connection failed'}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  {isFailed && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onSelectiveRetry([pub.platform])}
                      leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                    >
                      Retry Failed
                    </Button>
                  )}

                  {isScheduled && (
                    <div className="flex items-center gap-1.5">
                      {onRequestReschedule && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onRequestReschedule(pub)}
                          className="text-xs"
                        >
                          Reschedule
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRequestCancelScheduled(pub)}
                        className="text-slate-400 hover:text-rose-600 text-xs"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}

                  {(isPublished || isCancelled) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/content/${pub.contentId}`)}
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      View Content
                    </Button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};
