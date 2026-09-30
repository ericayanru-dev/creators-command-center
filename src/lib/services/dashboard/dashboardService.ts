import { Platform, SocialAccount, Task, BasicAnalyticsMetric } from '@/types';
import { SEED_ANALYTICS } from '@/lib/constants/seedData';
import { contentRepository } from '@/lib/repositories/contentRepository';
import { taskRepository } from '@/lib/repositories/taskRepository';
import { publishingRepository } from '@/lib/repositories/publishingRepository';
import { platformRepository } from '@/lib/repositories/platformRepository';
import { notificationRepository } from '@/lib/repositories/notificationRepository';
import { userRepository } from '@/lib/repositories/userRepository';
import { simulateNetworkLatency } from '@/lib/api/client';

export interface CriticalFailureItem {
  id: string;
  type: 'PUBLICATION_FAILED' | 'REAUTH_REQUIRED' | 'MEDIA_ERROR';
  title: string;
  subtitle: string;
  platform: Platform;
  actionText: string;
  actionLink: string;
}

export interface UpcomingPublishingItem {
  id: string;
  contentId: string;
  contentTitle: string;
  platform: Platform;
  scheduledAt: string;
  displayTimezone: string;
}

export interface AttentionItem {
  contentId: string;
  title: string;
  reason: string;
  status: string;
  updatedAt: string;
}

export interface RecentActivityItem {
  id: string;
  timestamp: string;
  platform: Platform;
  type: 'PUBLISH' | 'SCHEDULE' | 'UPDATE';
  description: string;
  targetId?: string;
}

export interface DashboardSummary {
  greeting: string;
  criticalFailures: CriticalFailureItem[];
  tasksDueToday: Task[];
  upcomingPublishing: UpcomingPublishingItem[];
  contentRequiringAttention: AttentionItem[];
  recentActivity: RecentActivityItem[];
  stats: {
    totalPublished: number;
    totalScheduled: number;
    totalDrafts: number;
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    totalShares: number;
    followersGrowth: number;
    platformMetrics: BasicAnalyticsMetric[];
  };
  connectedAccounts: SocialAccount[];
  unreadNotificationsCount: number;
}

export const DashboardService = {
  async getSummary(): Promise<DashboardSummary> {
    await simulateNetworkLatency(150);

    const [user, accounts, content, publications, tasks, notifications] = await Promise.all([
      userRepository.getCurrentUser(),
      platformRepository.getAll(),
      contentRepository.getAll(),
      publishingRepository.getPublications(),
      taskRepository.getAll(),
      notificationRepository.getAll(),
    ]);

    // 1. Critical Failures
    const criticalFailures: CriticalFailureItem[] = [];

    // Failed publications
    publications
      .filter((p) => p.status === 'FAILED')
      .forEach((p) => {
        criticalFailures.push({
          id: `fail_pub_${p.id}`,
          type: 'PUBLICATION_FAILED',
          title: `Publishing Failed: ${p.accountName || p.platform}`,
          subtitle: `${p.platform.toUpperCase()} failed for "${p.contentTitle}". ${p.lastErrorReason || 'Review issue.'}`,
          platform: p.platform,
          actionText: 'Retry',
          actionLink: `/content/${p.contentId}`,
        });
      });

    // Accounts needing reauthorization
    accounts
      .filter((a) => a.status === 'NEEDS_REAUTHORIZATION' || a.status === 'CONNECTION_ERROR')
      .forEach((a) => {
        criticalFailures.push({
          id: `fail_acc_${a.id}`,
          type: 'REAUTH_REQUIRED',
          title: 'Account Issue: Reauthorization Required',
          subtitle: `${a.platform.toUpperCase()} connection has expired or credential was revoked.`,
          platform: a.platform,
          actionText: 'Reauthorize',
          actionLink: '/platforms',
        });
      });

    // Overdue tasks can also surface in attention/critical
    const now = Date.now();
    const overdueTasks = tasks.filter((t) => t.status === 'OPEN' && new Date(t.dueAt).getTime() < now);
    if (overdueTasks.length > 0) {
      criticalFailures.push({
        id: `fail_task_${overdueTasks[0].id}`,
        type: 'PUBLICATION_FAILED',
        title: 'Overdue Task',
        subtitle: `"${overdueTasks[0].title}" was due ${new Date(overdueTasks[0].dueAt).toLocaleDateString()}`,
        platform: 'youtube', // neutral fallback
        actionText: 'View task',
        actionLink: '/tasks',
      });
    }

    // 2. Tasks Due Today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const tasksDueToday = tasks.filter((t) => {
      const d = new Date(t.dueAt).getTime();
      return d >= todayStart.getTime() && d <= todayEnd.getTime();
    });

    // 3. Upcoming Publishing
    const upcomingPublishing: UpcomingPublishingItem[] = publications
      .filter((p) => p.status === 'SCHEDULED')
      .map((p) => ({
        id: p.id,
        contentId: p.contentId,
        contentTitle: p.contentTitle,
        platform: p.platform,
        scheduledAt: p.scheduledAt,
        displayTimezone: p.displayTimezone,
      }));

    // 4. Content Requiring Attention
    const contentRequiringAttention: AttentionItem[] = [];
    content.forEach((c) => {
      if (c.status === 'DRAFT' && (!c.versions || c.versions.length === 0)) {
        contentRequiringAttention.push({
          contentId: c.id,
          title: c.title,
          reason: 'Missing platform version',
          status: c.status,
          updatedAt: c.updatedAt,
        });
      } else if (c.deadline && new Date(c.deadline).getTime() < now && c.status !== 'PUBLISHED') {
        contentRequiringAttention.push({
          contentId: c.id,
          title: c.title,
          reason: 'Past deadline',
          status: c.status,
          updatedAt: c.updatedAt,
        });
      }
    });

    // 5. Recent Activity
    const recentActivity: RecentActivityItem[] = [
      {
        id: 'act_1',
        timestamp: '2026-09-24T06:45:00Z',
        platform: 'youtube',
        type: 'UPDATE',
        description: 'Updated description on "Autumn Workspace Setup"',
        targetId: 'cnt_autumn_workspace',
      },
      {
        id: 'act_2',
        timestamp: '2026-08-30T14:32:00Z',
        platform: 'tiktok',
        type: 'PUBLISH',
        description: 'Published "5 TypeScript Mistakes" to TikTok',
        targetId: 'cnt_ts_mistakes',
      },
      {
        id: 'act_3',
        timestamp: '2026-08-30T14:30:00Z',
        platform: 'youtube',
        type: 'PUBLISH',
        description: 'Published "5 TypeScript Mistakes" to YouTube',
        targetId: 'cnt_ts_mistakes',
      },
    ];

    // 6. Stats & Basic Analytics Aggregation
    const totalPublished = publications.filter((p) => p.status === 'PUBLISHED').length;
    const totalScheduled = publications.filter((p) => p.status === 'SCHEDULED').length;
    const totalDrafts = content.filter((c) => c.status === 'DRAFT').length;
    const totalViews = SEED_ANALYTICS.reduce((sum, item) => sum + item.views, 0);
    const totalLikes = SEED_ANALYTICS.reduce((sum, item) => sum + item.likes, 0);
    const totalComments = SEED_ANALYTICS.reduce((sum, item) => sum + item.comments, 0);
    const totalShares = SEED_ANALYTICS.reduce((sum, item) => sum + item.shares, 0);
    const followersGrowth = SEED_ANALYTICS.reduce((sum, item) => sum + item.subscribersOrFollowersDelta, 0);

    const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

    return {
      greeting: `Good morning, ${user?.name ? user.name.split(' ')[0] : 'Creator'}`,
      criticalFailures,
      tasksDueToday,
      upcomingPublishing,
      contentRequiringAttention,
      recentActivity,
      stats: {
        totalPublished,
        totalScheduled,
        totalDrafts,
        totalViews,
        totalLikes,
        totalComments,
        totalShares,
        followersGrowth,
        platformMetrics: SEED_ANALYTICS,
      },
      connectedAccounts: accounts,
      unreadNotificationsCount,
    };
  },

  async getBasicAnalytics() {
    await simulateNetworkLatency(80);
    const totalViews = SEED_ANALYTICS.reduce((sum, item) => sum + item.views, 0);
    const totalLikes = SEED_ANALYTICS.reduce((sum, item) => sum + item.likes, 0);
    const totalComments = SEED_ANALYTICS.reduce((sum, item) => sum + item.comments, 0);
    const totalShares = SEED_ANALYTICS.reduce((sum, item) => sum + item.shares, 0);
    const followersGrowth = SEED_ANALYTICS.reduce((sum, item) => sum + item.subscribersOrFollowersDelta, 0);
    return {
      totalViews,
      totalLikes,
      totalComments,
      totalShares,
      followersGrowth,
      platformMetrics: SEED_ANALYTICS,
    };
  },
};
