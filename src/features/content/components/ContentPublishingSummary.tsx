import React, { useEffect, useState } from 'react';
import { useNavigate } from "@/lib/navigation";
import { Content, Platform, Publication } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { PublishingService } from '@/lib/services/publishing/publishingService';
import { SEED_ANALYTICS } from '@/lib/constants/seedData';
import { formatDateOnly } from '@/lib/utils';
import {
  Send,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  Eye,
  Heart,
  MessageSquare,
  Share2,
} from 'lucide-react';

interface ContentPublishingSummaryProps {
  content: Content;
}

export const ContentPublishingSummary: React.FC<ContentPublishingSummaryProps> = ({ content }) => {
  const navigate = useNavigate();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPubs = async () => {
      try {
        const all = await PublishingService.getPublications();
        const related = all.filter((p) => p.contentId === content.id);
        setPublications(related);
      } catch {
        // silent fail for compact widget
      } finally {
        setIsLoading(false);
      }
    };
    loadPubs();
  }, [content.id]);

  const targetPlatforms = content.targetPlatforms || [];

  const getStatusBadge = (status: Publication['status'] | 'UNSCHEDULED') => {
    switch (status) {
      case 'PUBLISHED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3" /> Published
          </span>
        );
      case 'SCHEDULED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
            <Clock className="w-3 h-3" /> Scheduled
          </span>
        );
      case 'PUBLISHING':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
            <Send className="w-3 h-3 animate-pulse" /> Broadcasting
          </span>
        );
      case 'FAILED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-800">
            <AlertCircle className="w-3 h-3" /> Failed
          </span>
        );
      default:
        return (
          <span className="text-[11px] font-mono text-slate-400">
            Not Scheduled
          </span>
        );
    }
  };

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Send className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Publishing Status
          </h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/publishing')}
          rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
        >
          Open Publishing Hub
        </Button>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {targetPlatforms.map((platform) => {
          const pub = publications.find((p) => p.platform === platform);
          return (
            <div
              key={platform}
              className="py-2.5 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <PlatformIcon platform={platform} size="xs" />
                <span className="font-semibold capitalize text-slate-800 dark:text-slate-200">
                  {platform}
                </span>
                {pub?.accountHandle && (
                  <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                    {pub.accountHandle}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {pub?.scheduledAt && (
                  <span className="text-[11px] text-slate-500 font-mono hidden md:inline">
                    {formatDateOnly(pub.scheduledAt)}
                  </span>
                )}
                {getStatusBadge(pub?.status || 'UNSCHEDULED')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Basic Content Performance Metrics for Published Content */}
      {(content.status === 'PUBLISHED' || publications.some((p) => p.status === 'PUBLISHED')) && (
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              Content Performance
            </span>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
              Live Metrics
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {targetPlatforms
              .filter((plat) => {
                const pub = publications.find((p) => p.platform === plat);
                return pub?.status === 'PUBLISHED' || content.status === 'PUBLISHED';
              })
              .map((plat) => {
                const metric = SEED_ANALYTICS.find((m) => m.platform === plat);
                if (!metric) return null;
                return (
                  <div
                    key={plat}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-center gap-1.5 font-bold capitalize text-slate-800 dark:text-slate-200">
                      <PlatformIcon platform={plat} size="xs" />
                      <span>{plat}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-sky-500" /> {metric.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-rose-500" /> {metric.likes.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-indigo-500" /> {metric.comments.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="w-3 h-3 text-emerald-500" /> {metric.shares.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </Card>
  );
};
