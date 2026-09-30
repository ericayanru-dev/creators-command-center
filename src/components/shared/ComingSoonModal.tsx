import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  Briefcase,
  Share2,
  Inbox,
  TrendingUp,
  DollarSign,
  Flag,
  Users,
  CreditCard,
  Bookmark,
  Calendar,
  Repeat,
  RotateCcw,
  BarChart3,
} from 'lucide-react';

export type ComingSoonFeatureType =
  | 'projects'
  | 'multi_brand'
  | 'multi_account'
  | 'social_inbox'
  | 'campaigns'
  | 'collaborations'
  | 'sponsorships'
  | 'revenue_tracking'
  | 'advanced_analytics'
  | 'saved_views'
  | 'calendar_sync'
  | 'recurring_tasks'
  | 'publishing_recovery'
  | 'business_dashboard';

interface FeatureMeta {
  title: string;
  badge: string;
  summary: string;
  icon: React.ReactNode;
  highlights: string[];
  timeline: string;
}

const FEATURE_METAS: Record<ComingSoonFeatureType, FeatureMeta> = {
  projects: {
    title: 'Projects',
    badge: 'MVP2 Roadmap',
    summary:
      'Organize multi-part video series, multi-week release arcs, and grouped production assets under dedicated project containers.',
    icon: <Layers className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
    highlights: [
      'Group related content items into project containers',
      'Unified asset and deliverable tracking per project',
      'Milestones and release target tracking',
      'Deliverable checklists and due dates',
    ],
    timeline: 'Scheduled for Creator CC MVP2 release',
  },
  multi_brand: {
    title: 'Multi-Brand Management',
    badge: 'MVP2 Roadmap',
    summary:
      'Manage multiple creator entities or client brands with dedicated brand organization, isolated content context, and brand-specific publishing configuration.',
    icon: <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    highlights: [
      'Switch between creator brands without signing out',
      'Brand-specific content organization and presets',
      'Brand-specific publishing configuration and defaults',
      'Dedicated content calendars and history per brand',
    ],
    timeline: 'Scheduled for Creator CC MVP2 release',
  },
  multi_account: {
    title: 'Multiple Accounts per Social Platform',
    badge: 'MVP2 Roadmap',
    summary:
      'Connect and manage more than one channel or handle on the same social network (e.g. main and secondary YouTube channels).',
    icon: <Share2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    highlights: [
      'Multiple channels per social network (e.g. Main + Clips)',
      'Account-level default targeting and hashtag sets',
      'Independent connection monitoring and reauthorization flows',
      'Target different channels during scheduling',
    ],
    timeline: 'Scheduled for Creator CC MVP2 release',
  },
  social_inbox: {
    title: 'Social Inbox & Comments',
    badge: 'MVP2 Roadmap',
    summary:
      'Aggregate post comments and audience responses across connected social channels into a single unified stream.',
    icon: <Inbox className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    highlights: [
      'Centralized comment feed across connected platforms',
      'Quick response templates and comment sorting',
      'Comment moderation filters and status tracking',
      'Audience question tracking for upcoming content planning',
    ],
    timeline: 'Scheduled for Creator CC MVP2 release',
  },
  campaigns: {
    title: 'Campaigns & Launches',
    badge: 'MVP2 Roadmap',
    summary:
      'Coordinate multi-channel content launches, thematic campaigns, and synchronized release milestones across platforms.',
    icon: <Flag className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    highlights: [
      'Cross-platform rollout timelines and milestone gating',
      'Campaign-level content grouping and tagging',
      'Coordinated media packs and cross-channel deliverables',
      'Consolidated campaign performance aggregation',
    ],
    timeline: 'Scheduled for Creator CC MVP2 release',
  },
  collaborations: {
    title: 'Collaborations & Guest Appearances',
    badge: 'MVP2 Roadmap',
    summary:
      'Coordinate creator guest appearances, co-productions, and cross-channel partnerships with clear deliverable tracking.',
    icon: <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    highlights: [
      'Partner and collaborator contact management',
      'Shared deliverable checklists and deadlines',
      'Cross-posting and credit tracking',
      'Collaboration history and release links',
    ],
    timeline: 'Scheduled for Creator CC MVP2 release',
  },
  sponsorships: {
    title: 'Sponsorship Management',
    badge: 'MVP2 Roadmap',
    summary:
      'Track brand sponsor commitments, dedicated ad reads, tracking links, and contracted deliverable deadlines.',
    icon: <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    highlights: [
      'Sponsor deal deliverables checklist linked to content items',
      'Promo code and affiliate URL link manager',
      'Dedicated integration timestamps and ad-read verification',
      'Deliverable fulfillment verification',
    ],
    timeline: 'Scheduled for Creator CC MVP2 release',
  },
  revenue_tracking: {
    title: 'Revenue Tracking',
    badge: 'MVP2 Roadmap',
    summary:
      'Track creator monetization streams, sponsorship earnings, affiliate payouts, and platform ad revenue.',
    icon: <CreditCard className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    highlights: [
      'Revenue logging by platform and sponsor',
      'Monthly and quarterly earnings breakdowns',
      'Payout status and payment milestone tracking',
      'Revenue-per-content performance summaries',
    ],
    timeline: 'Scheduled for Creator CC MVP2 release',
  },
  advanced_analytics: {
    title: 'Advanced Analytics & Retention',
    badge: 'MVP2 Roadmap',
    summary:
      'Deeper cross-platform audience insights, historical velocity comparisons, and platform growth metrics.',
    icon: <TrendingUp className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    highlights: [
      'Cross-platform reach velocity comparisons',
      'Historical performance benchmarks',
      'Audience growth trends across channels',
      'Content format effectiveness breakdowns',
    ],
    timeline: 'Scheduled for Creator CC MVP2 release',
  },
  saved_views: {
    title: 'Advanced Organization & Saved Views',
    badge: 'MVP2 Roadmap',
    summary:
      'Create and save custom filter configurations, custom sorting presets, and tailored content workspace views.',
    icon: <Bookmark className="w-5 h-5 text-violet-600 dark:text-violet-400" />,
    highlights: [
      'Save custom multi-filter search presets',
      'One-click switching between tailored workflows',
      'Custom column arrangements and sort orders',
      'Pinned views for immediate access',
    ],
    timeline: 'Scheduled for Creator CC MVP2 release',
  },
  calendar_sync: {
    title: 'External Calendar Sync',
    badge: 'MVP2 Roadmap',
    summary:
      'Synchronize scheduled releases and production deadlines with Google Calendar, Apple Calendar, or Outlook via iCal.',
    icon: <Calendar className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
    highlights: [
      'iCal subscription feed for external calendars',
      'Sync scheduled publishing slots and milestones',
      'Production task due date synchronization',
      'Automatic schedule updates on reschedule',
    ],
    timeline: 'Scheduled for Creator CC MVP2 release',
  },
  recurring_tasks: {
    title: 'Recurring Tasks',
    badge: 'MVP2 Roadmap',
    summary:
      'Automate repetitive creator production chores with daily, weekly, or monthly recurring task schedules.',
    icon: <Repeat className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    highlights: [
      'Custom cadence recurrence rules (daily, weekly, monthly)',
      'Automatic task generation on due date',
      'Recurring prep checklists for studio shoots',
      'Maintenance and backup reminders',
    ],
    timeline: 'Scheduled for Creator CC MVP2 release',
  },
  publishing_recovery: {
    title: 'Advanced Publishing Recovery',
    badge: 'MVP2 Roadmap',
    summary:
      'Intelligent automated retry policies, queue pause controls, and deep diagnostic insights for failed publishing attempts.',
    icon: <RotateCcw className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
    highlights: [
      'Configurable automated exponential retry policies',
      'Channel-specific publishing queue pause and resume',
      'Detailed API error diagnostics and payload inspection',
      'Failover account routing',
    ],
    timeline: 'Scheduled for Creator CC MVP2 release',
  },
  business_dashboard: {
    title: 'Business Dashboard',
    badge: 'MVP2 Roadmap',
    summary:
      'High-level executive overview consolidating creator pipeline throughput, revenue streams, and channel health.',
    icon: <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    highlights: [
      'Executive KPI summary for creator operations',
      'Pipeline throughput velocity and bottlenecks',
      'Sponsorship and monetization health metrics',
      'Cross-channel audience aggregate growth',
    ],
    timeline: 'Scheduled for Creator CC MVP2 release',
  },
};

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: ComingSoonFeatureType;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({ isOpen, onClose, feature }) => {
  const meta = FEATURE_METAS[feature] || FEATURE_METAS.projects;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="space-y-5">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
            {meta.icon}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300">
                {meta.badge}
              </span>
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Coming Soon
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{meta.title}</h3>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {meta.summary}
        </p>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
          <span className="text-[11px] font-mono uppercase font-bold text-slate-400 block">
            Approved MVP2 Capabilities
          </span>
          <div className="space-y-1.5">
            {meta.highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {meta.timeline}
          </span>
          <Button variant="primary" size="sm" onClick={onClose}>
            Got it
          </Button>
        </div>
      </div>
    </Modal>
  );
};
