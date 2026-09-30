import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { Platform, PublishingOperationResult } from '@/types';
import { RotateCcw, ExternalLink } from 'lucide-react';

interface PublishingResultsCardProps {
  operationResult: PublishingOperationResult;
  isExecutingPublish: boolean;
  onRequestSelectiveRetry: (failedPlatforms: Platform[], successfulPlatforms: Platform[]) => void;
}

export const PublishingResultsCard: React.FC<PublishingResultsCardProps> = ({
  operationResult,
  isExecutingPublish,
  onRequestSelectiveRetry,
}) => {
  const failedPlatforms = operationResult.results
    .filter((r) => r.status === 'FAILED')
    .map((r) => r.platform);

  const successfulPlatforms = operationResult.results
    .filter((r) => r.status === 'PUBLISHED')
    .map((r) => r.platform);

  return (
    <Card className="border-sky-400 dark:border-sky-600 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
            Operation Results: {operationResult.contentTitle}
          </span>
          <span
            className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
              operationResult.overallStatus === 'SUCCESS'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                : operationResult.overallStatus === 'PARTIAL_SUCCESS'
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
            }`}
          >
            {operationResult.overallStatus}
          </span>
        </div>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {operationResult.results.map((res) => {
          const isSuccess = res.status === 'PUBLISHED';
          return (
            <div key={res.platform} className="py-3 flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <PlatformIcon platform={res.platform} size="xs" showBackground />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 capitalize">
                    {res.platform}
                  </span>
                  {isSuccess ? (
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-mono text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 mt-0.5"
                    >
                      View Live Post <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <p className="text-[11px] text-rose-600 dark:text-rose-400 leading-snug mt-0.5">
                      <strong>Error:</strong> {res.errorReason}
                    </p>
                  )}
                </div>
              </div>

              <span
                className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                  isSuccess
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}
              >
                {res.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* SELECTIVE RETRY ACTION TRIGGER */}
      {operationResult.failedPlatforms > 0 && (
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Selective retry will only run for the {operationResult.failedPlatforms} failed channel{operationResult.failedPlatforms > 1 ? 's' : ''}.
          </span>
          <Button
            variant="danger"
            size="sm"
            isLoading={isExecutingPublish}
            onClick={() => onRequestSelectiveRetry(failedPlatforms, successfulPlatforms)}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Selective Retry Failed Channels
          </Button>
        </div>
      )}
    </Card>
  );
};
