"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from "@/lib/navigation";
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { LoadingState } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';
import { DashboardService, DashboardSummary } from '@/lib/services/dashboard/dashboardService';
import { TaskService } from '@/lib/services/tasks/taskService';
import { useToast } from '@/components/shared/Toast';
import {
  AlertTriangle,
  Clock,
  Calendar,
  Plus,
  ArrowRight,
  CheckSquare,
  Share2,
  TrendingUp,
  Eye,
  Heart,
  MessageSquare,
  Users,
  CheckCircle2,
  CreditCard,
  BarChart3,
} from 'lucide-react';
import { formatTimeOnly, formatDateOnly, formatNumberCompact } from '@/lib/utils';
import { ComingSoonModal, ComingSoonFeatureType } from '@/components/shared/ComingSoonModal';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comingSoonFeature, setComingSoonFeature] = useState<ComingSoonFeatureType | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await DashboardService.getSummary();
      setSummary(data);
    } catch (error: unknown) {
      setError('Unable to load dashboard data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleTask = async (taskId: string) => {
    try {
      await TaskService.toggleComplete(taskId);
      toast('Task updated', 'success');
      loadData();
    } catch (error: unknown) {
      toast('Failed to update task', 'error');
    }
  };

  if (isLoading) {
    return <LoadingState message="Loading your dashboard..." />;
  }

  if (error || !summary) {
    return <ErrorState message={error || 'Failed to load dashboard'} onRetry={loadData} />;
  }

  // Check if completely empty
  const hasNoActivity =
    summary.criticalFailures.length === 0 &&
    summary.tasksDueToday.length === 0 &&
    summary.upcomingPublishing.length === 0 &&
    summary.stats.totalDrafts === 0 &&
    summary.stats.totalPublished === 0;

  if (hasNoActivity) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Dashboard</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">What do I need to do right now?</p>
        </div>
        <EmptyState
          title="Welcome to your command center"
          description="Start by creating your first piece of content or connecting your social accounts to establish your publishing pipeline."
          actionLabel="Create content"
          onAction={() => navigate('/content/new')}
          secondaryActionLabel="Connect accounts"
          onSecondaryAction={() => navigate('/platforms')}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header & Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            {summary.greeting}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
            What do I need to do right now?
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <button
            type="button"
            onClick={() => setComingSoonFeature('business_dashboard')}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
            aria-label="Business Dashboard (Coming in MVP2)"
          >
            <BarChart3 className="w-3.5 h-3.5 text-indigo-500" />
            <span>Business View</span>
            <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
              MVP2
            </span>
          </button>

          <button
            type="button"
            onClick={() => setComingSoonFeature('revenue_tracking')}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
            aria-label="Revenue Tracking (Coming in MVP2)"
          >
            <CreditCard className="w-3.5 h-3.5 text-emerald-500" />
            <span>Monetization</span>
            <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
              MVP2
            </span>
          </button>

          <Button variant="outline" size="sm" onClick={() => navigate('/platforms')} leftIcon={<Share2 className="w-3.5 h-3.5" />}>
            Manage Platforms
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/content/new')} leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Create Content
          </Button>
        </div>
      </div>

      {/* 1. CRITICAL FAILURES / NEEDS ATTENTION */}
      {summary.criticalFailures.length > 0 && (
        <section aria-label="Critical Failures" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              Needs Attention ({summary.criticalFailures.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {summary.criticalFailures.map((failure) => (
              <div
                key={failure.id}
                className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                      {failure.type === 'REAUTH_REQUIRED' ? 'Account Issue' : 'Publishing Failed'}
                    </span>
                    <PlatformIcon platform={failure.platform} size="xs" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">{failure.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {failure.subtitle}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-rose-100 dark:border-slate-800/80 flex items-center justify-end">
                  <Button variant="danger" size="sm" onClick={() => navigate(failure.actionLink)}>
                    {failure.actionText}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. CORE OPERATIONAL GRID: TASKS DUE TODAY & UPCOMING PUBLISHING */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <Card className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Today&apos;s Tasks</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">{summary.tasksDueToday.length} pending</span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/60 mt-2">
              {summary.tasksDueToday.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">No tasks due today</div>
              ) : (
                summary.tasksDueToday.map((task) => (
                  <div key={task.id} className="py-3 flex items-start justify-between gap-3 group">
                    <div className="flex items-start gap-3 min-w-0">
                      <button
                        type="button"
                        onClick={() => handleToggleTask(task.id)}
                        className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                          task.status === 'COMPLETED'
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-300 dark:border-slate-600 hover:border-sky-500'
                        }`}
                        aria-label={`Mark task ${task.title} as completed`}
                      >
                        {task.status === 'COMPLETED' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>
                      <div className="min-w-0">
                        <p
                          className={`text-xs font-medium text-slate-800 dark:text-slate-200 line-clamp-1 ${
                            task.status === 'COMPLETED' ? 'line-through text-slate-400' : ''
                          }`}
                        >
                          {task.title}
                        </p>
                        {task.contentTitle && (
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">
                            → {task.contentTitle}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimeOnly(task.dueAt)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <Button variant="ghost" size="sm" onClick={() => navigate('/tasks')} rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              View all tasks
            </Button>
          </div>
        </Card>

        {/* Upcoming Publishing */}
        <Card className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Upcoming Publishing</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {summary.upcomingPublishing.length} scheduled
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/60 mt-2">
              {summary.upcomingPublishing.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">No upcoming publications scheduled</div>
              ) : (
                summary.upcomingPublishing.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/content/${item.contentId}`)}
                    className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg px-2 -mx-2 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <PlatformIcon platform={item.platform} size="sm" showBackground />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {item.contentTitle}
                        </p>
                        <p className="text-[11px] font-mono text-slate-400 capitalize">
                          {item.platform} • {item.displayTimezone}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-medium text-sky-700 dark:text-sky-400 block">
                        {formatDateOnly(item.scheduledAt)}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {formatTimeOnly(item.scheduledAt, item.displayTimezone)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <Button variant="ghost" size="sm" onClick={() => navigate('/calendar')} rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Open Calendar
            </Button>
          </div>
        </Card>
      </div>

      {/* 3. CONTENT REQUIRING ATTENTION & RECENT ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Requiring Attention */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Content Requiring Attention</h3>
            <span className="text-xs font-mono text-slate-400">
              {summary.contentRequiringAttention.length} flagged
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800/60 mt-2">
            {summary.contentRequiringAttention.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">All content is healthy</div>
            ) : (
              summary.contentRequiringAttention.map((item) => (
                <div
                  key={item.contentId}
                  onClick={() => navigate(`/content/${item.contentId}`)}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg px-2 -mx-2 transition-colors cursor-pointer"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{item.title}</p>
                    <span className="inline-block text-[11px] text-amber-600 dark:text-amber-400 font-mono mt-0.5">
                      ⚠️ {item.reason}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Open
                  </Button>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* General Statistics & Basic Analytics */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Basic Analytics</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold">
                All Platforms
              </span>
              <button
                type="button"
                onClick={() => setComingSoonFeature('advanced_analytics')}
                className="text-[10px] font-mono uppercase font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                aria-label="Advanced Analytics (Coming in MVP2)"
              >
                <span>Deep Insights</span>
                <span className="px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">MVP2</span>
              </button>
            </div>
          </div>

          {/* Basic Metrics Grid */}
          <div className="space-y-3 font-mono">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1.5 mb-1">
                  <Eye className="w-3 h-3 text-sky-500" /> Views
                </span>
                <span className="text-lg font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                  {summary.stats.totalViews.toLocaleString()}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1.5 mb-1">
                  <Heart className="w-3 h-3 text-rose-500" /> Likes
                </span>
                <span className="text-lg font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                  {summary.stats.totalLikes.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1.5 mb-1">
                  <MessageSquare className="w-3 h-3 text-indigo-500" /> Comments
                </span>
                <span className="text-lg font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                  {summary.stats.totalComments.toLocaleString()}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1.5 mb-1">
                  <Share2 className="w-3 h-3 text-emerald-500" /> Shares
                </span>
                <span className="text-lg font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                  {summary.stats.totalShares.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Followers / Subscribers */}
            <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-emerald-800 dark:text-emerald-300 uppercase font-semibold flex items-center gap-1.5">
                  <Users className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Followers / Subscribers
                </span>
                <span className="text-xl font-bold text-emerald-700 dark:text-emerald-300 tabular-nums mt-0.5 block">
                  +{summary.stats.followersGrowth.toLocaleString()}
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                Net 30d
              </span>
            </div>
          </div>

          {/* Operational Pipeline Summary */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-2 font-bold">
              Content Pipeline
            </span>
            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block">Published</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{summary.stats.totalPublished}</span>
              </div>
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block">Scheduled</span>
                <span className="text-sm font-bold text-sky-600 dark:text-sky-400">{summary.stats.totalScheduled}</span>
              </div>
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block">Drafts</span>
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{summary.stats.totalDrafts}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Coming Soon Modal */}
      {comingSoonFeature && (
        <ComingSoonModal
          isOpen={!!comingSoonFeature}
          onClose={() => setComingSoonFeature(null)}
          feature={comingSoonFeature}
        />
      )}
    </div>
  );
};
