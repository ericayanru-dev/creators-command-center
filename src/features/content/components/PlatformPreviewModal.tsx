import React, { useState } from 'react';
import { Content, ContentVersion, Platform } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { PLATFORMS_CONFIG } from '@/lib/constants/platforms';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  ThumbsUp,
  Repeat,
  Send,
  Music2,
  Volume2,
  Eye,
  Info,
  Film,
} from 'lucide-react';

interface PlatformPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: Content;
  initialPlatform?: Platform;
}

export const PlatformPreviewModal: React.FC<PlatformPreviewModalProps> = ({
  isOpen,
  onClose,
  content,
  initialPlatform,
}) => {
  const availablePlatforms: Platform[] = content.targetPlatforms?.length
    ? content.targetPlatforms
    : (['instagram', 'youtube', 'tiktok', 'linkedin', 'facebook'] as Platform[]);

  const [activePlatform, setActivePlatform] = useState<Platform>(
    initialPlatform && availablePlatforms.includes(initialPlatform)
      ? initialPlatform
      : availablePlatforms[0] || 'instagram'
  );

  if (!isOpen) return null;

  // Find adaptation version for this platform if one exists
  const version: ContentVersion | undefined = content.versions?.find(
    (v) => v.platform === activePlatform
  );

  const displayTitle = version?.title || content.title;
  const displayCaption = version?.caption || content.caption || content.description || 'No caption text provided.';
  const displayHashtags = version?.hashtags?.length
    ? version.hashtags
    : content.tags?.length
    ? content.tags
    : ['creator', 'content', 'production'];

  const mediaUrl =
    version?.mediaAsset?.previewUrl ||
    content.mediaAsset?.previewUrl ||
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';

  const isVideo =
    version?.mediaAsset?.mimeType?.startsWith('video') ||
    content.mediaAsset?.mimeType?.startsWith('video') ||
    content.contentType === 'video' ||
    content.contentType === 'short_video';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Platform Visual Preview"
      description="Approximate simulation of how your content will appear to audience feeds."
      size="lg"
    >
      <div className="space-y-5">
        {/* Platform Selector Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-x-auto">
          {availablePlatforms.map((p) => {
            const isSelected = activePlatform === p;
            const hasCustomVersion = content.versions?.some((v) => v.platform === p);
            return (
              <button
                key={p}
                type="button"
                onClick={() => setActivePlatform(p)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <PlatformIcon platform={p} size="xs" />
                <span>{PLATFORMS_CONFIG[p].name}</span>
                {hasCustomVersion && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title="Tailored adaptation configured" />
                )}
              </button>
            );
          })}
        </div>

        {/* Approximation Warning Banner */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sky-50/60 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40 text-[11px] text-sky-800 dark:text-sky-300">
          <Info className="w-3.5 h-3.5 shrink-0 text-sky-600 dark:text-sky-400" />
          <span>
            <strong>Approximate preview:</strong> Social networks dynamically format layouts based on client devices, viewer aspect ratios, and character truncation.
          </span>
        </div>

        {/* Platform Viewport Container */}
        <div className="flex justify-center p-4 bg-slate-100/60 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800">
          {/* INSTAGRAM PREVIEW */}
          {activePlatform === 'instagram' && (
            <div className="w-full max-w-sm bg-white dark:bg-black rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden text-slate-900 dark:text-slate-100">
              {/* Header */}
              <div className="flex items-center justify-between p-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-0.5">
                    <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center font-bold text-xs">
                      ED
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold block leading-none">creator_command</span>
                    <span className="text-[10px] text-slate-400">Original audio</span>
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-slate-400 cursor-pointer" />
              </div>

              {/* Media Body */}
              <div className="aspect-square bg-slate-900 relative flex items-center justify-center overflow-hidden">
                {isVideo ? (
                  <div className="w-full h-full relative flex items-center justify-center bg-black">
                    <img src={mediaUrl} alt="" className="w-full h-full object-cover opacity-80" />
                    <Film className="w-12 h-12 text-white/80 absolute" />
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                      0:45
                    </span>
                  </div>
                ) : (
                  <img src={mediaUrl} alt="Post media" className="w-full h-full object-cover" />
                )}
              </div>

              {/* Actions Rail */}
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 cursor-pointer hover:text-rose-500 transition-colors" />
                    <MessageCircle className="w-5 h-5 cursor-pointer hover:text-sky-500 transition-colors" />
                    <Share2 className="w-5 h-5 cursor-pointer hover:text-emerald-500 transition-colors" />
                  </div>
                  <Bookmark className="w-5 h-5 cursor-pointer hover:text-amber-500 transition-colors" />
                </div>

                <p className="text-xs font-bold">1,842 likes</p>

                {/* Caption */}
                <div className="text-xs space-y-1">
                  <p className="leading-snug">
                    <span className="font-bold mr-1.5">creator_command</span>
                    {displayCaption}
                  </p>
                  <p className="text-sky-600 dark:text-sky-400 font-medium">
                    {displayHashtags.map((t) => `#${t.replace(/^#/, '')}`).join(' ')}
                  </p>
                </div>

                <p className="text-[10px] font-mono text-slate-400 uppercase pt-1">
                  2 hours ago • Approximate Instagram feed
                </p>
              </div>
            </div>
          )}

          {/* TIKTOK PREVIEW */}
          {activePlatform === 'tiktok' && (
            <div className="w-[300px] h-[520px] bg-black text-white rounded-3xl border-4 border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between p-4">
              <img
                src={mediaUrl}
                alt="TikTok background"
                className="absolute inset-0 w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

              {/* Top controls */}
              <div className="relative z-10 flex items-center justify-center gap-4 text-xs font-bold pt-2">
                <span className="text-white/60">Following</span>
                <span className="border-b-2 border-white pb-0.5">For You</span>
              </div>

              {/* Right interaction rail */}
              <div className="relative z-10 self-end flex flex-col items-center gap-3 mb-10">
                <div className="w-9 h-9 rounded-full bg-slate-800 border-2 border-white flex items-center justify-center font-bold text-xs">
                  ED
                </div>
                <div className="flex flex-col items-center">
                  <Heart className="w-6 h-6 text-white" />
                  <span className="text-[10px] font-bold mt-0.5">34.2K</span>
                </div>
                <div className="flex flex-col items-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                  <span className="text-[10px] font-bold mt-0.5">418</span>
                </div>
                <div className="flex flex-col items-center">
                  <Bookmark className="w-6 h-6 text-white" />
                  <span className="text-[10px] font-bold mt-0.5">2.1K</span>
                </div>
                <div className="flex flex-col items-center">
                  <Share2 className="w-6 h-6 text-white" />
                  <span className="text-[10px] font-bold mt-0.5">920</span>
                </div>
              </div>

              {/* Bottom Caption & Sound */}
              <div className="relative z-10 space-y-1.5 pb-2">
                <p className="text-xs font-bold">@creator_command</p>
                <p className="text-xs text-white/90 line-clamp-2 leading-snug">
                  {displayCaption}
                </p>
                <p className="text-xs text-sky-300 font-semibold truncate">
                  {displayHashtags.map((t) => `#${t.replace(/^#/, '')}`).join(' ')}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-white/80 pt-1">
                  <Music2 className="w-3 h-3 animate-pulse" />
                  <span className="truncate">Original Sound - Creator Studio Live</span>
                </div>
              </div>
            </div>
          )}

          {/* YOUTUBE PREVIEW */}
          {activePlatform === 'youtube' && (
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden text-slate-900 dark:text-slate-100">
              <div className="aspect-video bg-black relative flex items-center justify-center">
                <img src={mediaUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded font-bold">
                  12:40
                </span>
              </div>

              <div className="p-3.5 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    CC
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold line-clamp-2 leading-snug">
                      {displayTitle}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Creator Command Center • 12K views • Scheduled release
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <p className="line-clamp-3 leading-relaxed">{displayCaption}</p>
                  <p className="text-sky-600 dark:text-sky-400 font-semibold">
                    {displayHashtags.map((t) => `#${t.replace(/^#/, '')}`).join(' ')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* LINKEDIN PREVIEW */}
          {activePlatform === 'linkedin' && (
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg p-4 space-y-3 text-slate-900 dark:text-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  ED
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight">Eric Dollar</h4>
                  <p className="text-[11px] text-slate-500">Founder & Digital Media Creator • 12k followers</p>
                  <span className="text-[10px] text-slate-400 font-mono">1h • Edited • 🌐</span>
                </div>
              </div>

              <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                {displayCaption}
              </p>

              <p className="text-xs text-sky-600 dark:text-sky-400 font-semibold">
                {displayHashtags.map((t) => `#${t.replace(/^#/, '')}`).join(' ')}
              </p>

              <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <img src={mediaUrl} alt="" className="w-full h-full object-cover" />
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-slate-500 text-xs font-semibold">
                <button type="button" className="flex items-center gap-1.5 hover:text-sky-600">
                  <ThumbsUp className="w-4 h-4" /> Like
                </button>
                <button type="button" className="flex items-center gap-1.5 hover:text-sky-600">
                  <MessageCircle className="w-4 h-4" /> Comment
                </button>
                <button type="button" className="flex items-center gap-1.5 hover:text-sky-600">
                  <Repeat className="w-4 h-4" /> Repost
                </button>
                <button type="button" className="flex items-center gap-1.5 hover:text-sky-600">
                  <Send className="w-4 h-4" /> Send
                </button>
              </div>
            </div>
          )}

          {/* FACEBOOK PREVIEW */}
          {activePlatform === 'facebook' && (
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg p-4 space-y-3 text-slate-900 dark:text-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  CC
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight">Creator Command Center</h4>
                  <span className="text-[10px] text-slate-400 font-mono">Just now • 🌐 Public</span>
                </div>
              </div>

              <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                {displayCaption}
              </p>

              <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <img src={mediaUrl} alt="" className="w-full h-full object-cover" />
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-around text-slate-500 text-xs font-semibold">
                <span className="hover:text-blue-600 cursor-pointer">Like</span>
                <span className="hover:text-blue-600 cursor-pointer">Comment</span>
                <span className="hover:text-blue-600 cursor-pointer">Share</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
