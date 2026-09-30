import { Platform, PlatformConfig } from '@/types';

/**
 * Domain-specific constraints and API publishing validation rules.
 * Strictly separated from UI presentation concerns.
 */
export interface PlatformDomainRule {
  id: Platform;
  maxCaptionLength: number;
  maxTitleLength?: number;
  supportsTitle: boolean;
  supportsHashtags: boolean;
  supportsCTA: boolean;
  supportedMediaTypes: ('video' | 'image' | 'carousel' | 'text')[];
  mediaAspectRatios: string[];
}

export const PLATFORM_DOMAIN_RULES: Record<Platform, PlatformDomainRule> = {
  youtube: {
    id: 'youtube',
    maxCaptionLength: 5000,
    maxTitleLength: 100,
    supportsTitle: true,
    supportsHashtags: true,
    supportsCTA: true,
    supportedMediaTypes: ['video'],
    mediaAspectRatios: ['16:9', '9:16 (Shorts)'],
  },
  instagram: {
    id: 'instagram',
    maxCaptionLength: 2200,
    supportsTitle: false,
    supportsHashtags: true,
    supportsCTA: true,
    supportedMediaTypes: ['video', 'image', 'carousel'],
    mediaAspectRatios: ['9:16 (Reel)', '1:1 (Feed)', '4:5 (Portrait)'],
  },
  tiktok: {
    id: 'tiktok',
    maxCaptionLength: 2200,
    supportsTitle: false,
    supportsHashtags: true,
    supportsCTA: false,
    supportedMediaTypes: ['video'],
    mediaAspectRatios: ['9:16 (Vertical)'],
  },
  linkedin: {
    id: 'linkedin',
    maxCaptionLength: 3000,
    maxTitleLength: 150,
    supportsTitle: true,
    supportsHashtags: true,
    supportsCTA: true,
    supportedMediaTypes: ['text', 'image', 'video'],
    mediaAspectRatios: ['16:9', '1:1', '4:5'],
  },
  facebook: {
    id: 'facebook',
    maxCaptionLength: 5000,
    supportsTitle: false,
    supportsHashtags: true,
    supportsCTA: true,
    supportedMediaTypes: ['video', 'image', 'carousel'],
    mediaAspectRatios: ['16:9', '1:1', '9:16'],
  },
};

/**
 * UI presentation configuration for platform badges, branding colors, and labels.
 */
export interface PlatformUIConfig {
  id: Platform;
  name: string;
  iconColor: string;
  badgeBg: string;
}

export const PLATFORM_UI_CONFIGS: Record<Platform, PlatformUIConfig> = {
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    iconColor: '#FF0000',
    badgeBg: 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 border-red-200 dark:border-red-900/50',
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    iconColor: '#E1306C',
    badgeBg: 'bg-pink-50 text-pink-700 dark:bg-pink-950/40 dark:text-pink-400 border-pink-200 dark:border-pink-900/50',
  },
  tiktok: {
    id: 'tiktok',
    name: 'TikTok',
    iconColor: '#00F2FE',
    badgeBg: 'bg-cyan-50 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300 border-cyan-200 dark:border-cyan-900/50',
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    iconColor: '#0A66C2',
    badgeBg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-900/50',
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    iconColor: '#1877F2',
    badgeBg: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900/50',
  },
};

/**
 * Combined configuration provided for complete backward compatibility.
 */
export const PLATFORMS_CONFIG: Record<Platform, PlatformConfig> = {
  youtube: { ...PLATFORM_DOMAIN_RULES.youtube, ...PLATFORM_UI_CONFIGS.youtube },
  instagram: { ...PLATFORM_DOMAIN_RULES.instagram, ...PLATFORM_UI_CONFIGS.instagram },
  tiktok: { ...PLATFORM_DOMAIN_RULES.tiktok, ...PLATFORM_UI_CONFIGS.tiktok },
  linkedin: { ...PLATFORM_DOMAIN_RULES.linkedin, ...PLATFORM_UI_CONFIGS.linkedin },
  facebook: { ...PLATFORM_DOMAIN_RULES.facebook, ...PLATFORM_UI_CONFIGS.facebook },
};

export const PLATFORM_CONFIGS = PLATFORMS_CONFIG;

export const SUPPORTED_PLATFORMS: Platform[] = ['youtube', 'instagram', 'tiktok', 'linkedin', 'facebook'];

export const COMMON_TIMEZONES = [
  { value: 'Africa/Lagos', label: 'Africa/Lagos (WAT, UTC+01:00)' },
  { value: 'America/New_York', label: 'America/New_York (EDT/EST, UTC-04:00)' },
  { value: 'America/Los_Angeles', label: 'America/Los_Angeles (PDT/PST, UTC-07:00)' },
  { value: 'America/Chicago', label: 'America/Chicago (CDT/CST, UTC-05:00)' },
  { value: 'Europe/London', label: 'Europe/London (BST/GMT, UTC+00:00)' },
  { value: 'Europe/Berlin', label: 'Europe/Berlin (CEST/CET, UTC+02:00)' },
  { value: 'Asia/Dubai', label: 'Asia/Dubai (GST, UTC+04:00)' },
  { value: 'Asia/Singapore', label: 'Asia/Singapore (SGT, UTC+08:00)' },
  { value: 'Asia/Tokyo', label: 'Asia/Tokyo (JST, UTC+09:00)' },
  { value: 'Australia/Sydney', label: 'Australia/Sydney (AEST, UTC+10:00)' },
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
];
