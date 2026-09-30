/**
 * Creator Command Center (Creator CC) - Authoritative Domain Types
 * Derived strictly from MVP Definition & Scope, UX Specification, and Database Design Document.
 */

export type Platform = 'youtube' | 'instagram' | 'tiktok' | 'linkedin' | 'facebook';

export interface PlatformConfig {
  id: Platform;
  name: string;
  iconColor: string;
  badgeBg: string;
  maxCaptionLength: number;
  maxTitleLength?: number;
  supportsTitle: boolean;
  supportsHashtags: boolean;
  supportsCTA: boolean;
  supportedMediaTypes: ('video' | 'image' | 'carousel' | 'text')[];
  mediaAspectRatios: string[];
}

export type ContentType = 'video' | 'short_video' | 'image' | 'audio' | 'text' | 'other';

/**
 * Content Lifecycle State Machine:
 * IDEA → DRAFT → READY → SCHEDULED → PUBLISHED
 * Note: PUBLISHING, FAILED, and CANCELLED belong to Publication/PublishingAttempt, NOT Content!
 */
export type ContentStatus = 'IDEA' | 'DRAFT' | 'READY' | 'SCHEDULED' | 'PUBLISHED';

/**
 * Publication / Publishing Lifecycle:
 * SCHEDULED → PUBLISHING → PUBLISHED (with FAILED and CANCELLED as terminal/exception states)
 */
export type PublicationStatus = 'SCHEDULED' | 'PUBLISHING' | 'PUBLISHED' | 'FAILED' | 'CANCELLED';

export type PublishingAttemptStatus = 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';

export type PlatformAccountStatus = 'CONNECTED' | 'DISCONNECTED' | 'NEEDS_REAUTHORIZATION' | 'CONNECTION_ERROR';

export type TaskStatus = 'OPEN' | 'COMPLETED';

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  timezone: string; // IANA timezone e.g. "Africa/Lagos", "America/New_York", "UTC"
  status: 'ACTIVE' | 'SUSPENDED' | 'DELETED';
  createdAt: string;
}

export interface CreatorProfile {
  userId: string;
  displayName: string;
  bio: string;
  creatorType: 'YouTuber' | 'TikTok Creator' | 'Instagram Creator' | 'Educator' | 'Podcaster' | 'Blogger' | 'Personal Brand' | 'Other';
  primaryPlatforms: Platform[];
  publicUrl?: string;
  onboardingCompleted: boolean;
}

export interface MediaAsset {
  id: string;
  userId: string;
  contentId: string;
  contentVersionId?: string;
  fileName: string;
  fileSize: number; // in bytes
  mimeType: string;
  status: 'UPLOADING' | 'PROCESSING' | 'READY' | 'FAILED';
  previewUrl: string;
  thumbnailUrl?: string;
  durationSeconds?: number;
  createdAt: string;
}

export interface ContentVersion {
  id: string;
  contentId: string;
  platform: Platform;
  platformAccountId?: string;
  title?: string;
  caption?: string;
  description?: string;
  hashtags?: string[];
  callToAction?: string;
  mediaAssetId?: string;
  mediaAsset?: MediaAsset;
  status: 'Draft' | 'Ready' | 'Scheduled' | 'Publishing' | 'Published' | 'Failed';
  formatNote?: string;
  visibility?: 'Public' | 'Unlisted' | 'Private';
  category?: string;
  soundName?: string;
  postType?: 'Feed Post' | 'Reel' | 'Story' | 'Carousel' | 'Article';
  updatedAt: string;
}

export interface Content {
  id: string;
  userId: string;
  title: string;
  description: string;
  caption: string;
  notes?: string;
  contentType: ContentType;
  status: ContentStatus;
  targetPlatforms: Platform[];
  deadline?: string;
  tags: string[];
  mediaAssetId?: string;
  mediaAsset?: MediaAsset;
  versions?: ContentVersion[];
  createdAt: string;
  updatedAt: string;
  archived?: boolean;
}

export interface Publication {
  id: string;
  userId: string;
  contentId: string;
  contentTitle: string;
  contentVersionId: string;
  platform: Platform;
  platformAccountId: string;
  accountName: string;
  accountHandle: string;
  status: PublicationStatus;
  scheduledAt: string; // ISO 8601 UTC
  displayTimezone: string; // e.g. "Africa/Lagos", "America/New_York"
  publishedAt?: string;
  cancelledAt?: string;
  lastErrorReason?: string;
  attemptsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PublishingAttempt {
  id: string;
  publicationId: string;
  contentVersionId: string;
  platform: Platform;
  platformAccountId: string;
  status: PublishingAttemptStatus;
  attemptNumber: number;
  startedAt: string;
  finishedAt?: string;
  externalUrl?: string;
  externalId?: string;
  errorReason?: string;
  errorCode?: string;
  isRetry: boolean;
}

export interface PublishingOperationResult {
  publishingOperationId: string;
  contentId: string;
  contentTitle: string;
  overallStatus: 'PROCESSING' | 'SUCCESS' | 'PARTIAL_SUCCESS' | 'FAILED';
  totalPlatforms: number;
  successfulPlatforms: number;
  failedPlatforms: number;
  results: {
    platform: Platform;
    status: 'PUBLISHED' | 'FAILED' | 'PUBLISHING';
    url?: string;
    errorReason?: string;
    publicationId: string;
    attemptId: string;
  }[];
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueAt: string; // ISO date
  contentId?: string;
  contentTitle?: string;
  completedAt?: string;
  createdAt: string;
}

export interface SocialAccount {
  id: string;
  userId: string;
  platform: Platform;
  accountName: string;
  accountHandle: string;
  avatarUrl?: string;
  status: PlatformAccountStatus;
  lastSyncedAt: string;
  errorMessage?: string;
  connectedAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  type: 'PUBLISHING_SUCCESS' | 'PUBLISHING_FAILED' | 'PLATFORM_REAUTH_REQUIRED' | 'SCHEDULE_DUE' | 'TASK_OVERDUE' | 'TASK_DUE';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  linkTo?: string; // route e.g. /publishing/results or /content/:id
  actionLabel?: string;
  platform?: Platform;
}

export interface ProductionPlan {
  id: string;
  contentId: string;
  shootLocation: string;
  gearEquipment: string[];
  participants: string[];
  shootDate?: string;
  callTime?: string;
  readinessNotes?: string;
  updatedAt: string;
}

export interface ShootingChecklistItem {
  id: string;
  contentId: string;
  label: string;
  completed: boolean;
  order: number;
}

export interface BasicAnalyticsMetric {
  platform: Platform;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  subscribersOrFollowersDelta: number;
  updatedAt: string;
}
