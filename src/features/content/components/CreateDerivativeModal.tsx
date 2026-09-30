import React, { useState, useEffect } from "react";
import { Content, ContentVersion, Platform } from "@/types";
import { ContentService } from "@/lib/services/content/contentService";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PlatformIcon } from "@/components/shared/PlatformIcon";
import { useToast } from "@/components/shared/Toast";
import { PLATFORM_DOMAIN_RULES, PLATFORMS_CONFIG } from "@/lib/constants/platforms";
import { GitFork, CheckCircle2, AlertCircle } from "lucide-react";

interface CreateDerivativeModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: Content;
  onCreated: () => void;
}

const ALL_PLATFORMS: Platform[] = ["youtube", "instagram", "tiktok", "linkedin", "facebook"];

export const CreateDerivativeModal: React.FC<CreateDerivativeModalProps> = ({
  isOpen,
  onClose,
  content,
  onCreated,
}) => {
  const { toast } = useToast();
  const existingVersions = content.versions || [];
  const existingPlatforms = existingVersions.map((v) => v.platform);

  // Default to first platform without a version, or first in list
  const defaultPlatform =
    ALL_PLATFORMS.find((p) => !existingPlatforms.includes(p)) || ALL_PLATFORMS[0];
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(defaultPlatform);
  const [title, setTitle] = useState(content.title || "");
  const [caption, setCaption] = useState(content.caption || content.description || "");
  const [postType, setPostType] = useState<"Feed Post" | "Reel" | "Story" | "Carousel" | "Article">(
    "Feed Post",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const avail = ALL_PLATFORMS.find((p) => !existingPlatforms.includes(p)) || ALL_PLATFORMS[0];
      setSelectedPlatform(avail);
      setTitle(content.title || "");
      setCaption(content.caption || content.description || "");
      if (avail === "tiktok") setPostType("Reel");
      else if (avail === "youtube") setPostType("Feed Post");
      else setPostType("Feed Post");
    }
  }, [isOpen, content]);

  const domainRule = PLATFORM_DOMAIN_RULES[selectedPlatform];
  const platformConfig = PLATFORMS_CONFIG[selectedPlatform];
  const hasExistingVersion = existingPlatforms.includes(selectedPlatform);
  const captionLength = caption.length;
  const maxCaption = domainRule?.maxCaptionLength || 2200;
  const isCaptionOver = captionLength > maxCaption;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCaptionOver) {
      toast(`Caption exceeds ${selectedPlatform} limit of ${maxCaption} characters`, "error");
      return;
    }

    setIsSubmitting(true);
    try {
      await ContentService.savePlatformVersion(content.id, {
        platform: selectedPlatform,
        title: title.trim(),
        caption: caption.trim(),
        postType,
        hashtags: content.tags || [],
        status: "Ready",
      });
      toast(`Created derivative version for ${platformConfig.name}!`, "success");
      onCreated();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create derivative";
      toast(msg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-900/60 text-sky-600 dark:text-sky-400">
            <GitFork className="w-4 h-4 rotate-90" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Create Channel Derivative
            </h2>
            <p className="text-xs text-slate-500 font-mono">
              Branch master brief into an adapted platform version for release
            </p>
          </div>
        </div>

        {/* Platform Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Target Social Network
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {ALL_PLATFORMS.map((plat) => {
              const cfg = PLATFORMS_CONFIG[plat];
              const exists = existingPlatforms.includes(plat);
              const isSelected = selectedPlatform === plat;

              return (
                <button
                  key={plat}
                  type="button"
                  onClick={() => {
                    setSelectedPlatform(plat);
                    if (plat === "tiktok") setPostType("Reel");
                  }}
                  className={`p-2.5 rounded-xl border text-left flex flex-col justify-between gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? "border-sky-600 dark:border-sky-400 bg-sky-50/50 dark:bg-sky-950/30 ring-1 ring-sky-600"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <PlatformIcon platform={plat} size="sm" />
                    {exists && (
                      <span className="text-[9px] font-mono uppercase px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
                        exists
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                      {cfg.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {cfg.mediaAspectRatios[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          {hasExistingVersion && (
            <p className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1.5 mt-2 font-mono">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              Note: An adaptation for {platformConfig.name} already exists. Saving will update this
              version.
            </p>
          )}
        </div>

        {/* Aspect ratio and format info */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500">
          <span>Supported Aspect Ratios: {platformConfig.mediaAspectRatios.join(", ")}</span>
          <span>Max Caption: {maxCaption} chars</span>
        </div>

        {/* Platform title */}
        {platformConfig.supportsTitle && (
          <Input
            label={`${platformConfig.name} Title / Headline Override`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={`Optimized headline for ${platformConfig.name}...`}
          />
        )}

        {/* Post Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Format Type
          </label>
          <select
            value={postType}
            onChange={(e) => setPostType(e.target.value as NonNullable<ContentVersion["postType"]>)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-2 text-xs font-mono"
          >
            <option value="Feed Post">Feed Post</option>
            <option value="Reel">Reel / Short Video (9:16)</option>
            <option value="Story">Story</option>
            <option value="Carousel">Carousel</option>
            <option value="Article">Article / Long-Form</option>
          </select>
        </div>

        {/* Platform Caption */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Adapted Caption & Hashtags
            </label>
            <span
              className={`text-[11px] font-mono font-bold ${
                isCaptionOver ? "text-rose-600" : "text-slate-400"
              }`}
            >
              {captionLength} / {maxCaption}
            </span>
          </div>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={4}
            className={`w-full bg-slate-50 dark:bg-slate-800 border rounded-lg p-2.5 text-xs text-slate-900 dark:text-slate-100 ${
              isCaptionOver
                ? "border-rose-500 focus:outline-rose-500"
                : "border-slate-200 dark:border-slate-700 focus:outline-sky-500"
            }`}
            placeholder={`Write copy optimized for ${platformConfig.name}...`}
            required
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button variant="ghost" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="submit"
            isLoading={isSubmitting}
            disabled={isCaptionOver}
            leftIcon={<GitFork className="w-3.5 h-3.5 rotate-90" />}
          >
            {hasExistingVersion ? "Update Derivative" : "Create Derivative"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
