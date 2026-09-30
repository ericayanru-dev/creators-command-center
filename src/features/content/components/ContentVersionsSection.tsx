import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { Content, ContentVersion, Platform } from '@/types';
import { PLATFORM_DOMAIN_RULES, PLATFORM_UI_CONFIGS } from '@/lib/constants/platforms';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';

interface ContentVersionsSectionProps {
  content: Content;
  onEditVersion: (version: ContentVersion) => void;
  onAddVersion: (platform: Platform) => void;
  onDeleteVersion: (versionId: string) => void;
  onPreviewVersion?: (platform: Platform) => void;
}

export const ContentVersionsSection: React.FC<ContentVersionsSectionProps> = ({
  content,
  onEditVersion,
  onAddVersion,
  onDeleteVersion,
  onPreviewVersion,
}) => {
  const versions = content.versions || [];
  const platformsWithVersions = versions.map((v) => v.platform);
  const availablePlatforms: Platform[] = (['youtube', 'instagram', 'tiktok', 'linkedin', 'facebook'] as Platform[])
    .filter((p) => !platformsWithVersions.includes(p));

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Platform-Specific Versions
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Tailor titles, tags, and character counts per social channel (max 1 version per platform)
          </p>
        </div>

        {availablePlatforms.length > 0 && (
          <div className="flex items-center gap-1.5">
            {availablePlatforms.map((p) => (
              <Button
                key={p}
                variant="outline"
                size="sm"
                onClick={() => onAddVersion(p)}
                className="text-[11px] capitalize"
                leftIcon={<Plus className="w-3 h-3" />}
              >
                {p}
              </Button>
            ))}
          </div>
        )}
      </div>

      {versions.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-400 font-mono">
          No platform-specific adaptations created yet. Click a platform button above to tailor captions.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {versions.map((ver) => {
            const domainRule = PLATFORM_DOMAIN_RULES[ver.platform];
            const uiConfig = PLATFORM_UI_CONFIGS[ver.platform];
            const captionLength = (ver.caption || '').length;
            const isOverLimit = domainRule && captionLength > domainRule.maxCaptionLength;

            return (
              <div
                key={ver.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PlatformIcon platform={ver.platform} size="sm" showBackground />
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 capitalize">
                      {uiConfig.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {onPreviewVersion && (
                      <button
                        type="button"
                        onClick={() => onPreviewVersion(ver.platform)}
                        className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-sky-600 cursor-pointer"
                        title="Preview Platform View"
                        aria-label={`Preview ${uiConfig.name} adaptation`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onEditVersion(ver)}
                      className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
                      title="Edit Version"
                      aria-label={`Edit ${uiConfig.name} version`}
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteVersion(ver.id)}
                      className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-rose-600 cursor-pointer"
                      title="Delete Version"
                      aria-label={`Delete ${uiConfig.name} version`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {ver.title && (
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Title</span>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                      {ver.title}
                    </p>
                  </div>
                )}

                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">
                    Caption ({captionLength}/{domainRule?.maxCaptionLength || 2000})
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mt-0.5">
                    {ver.caption || 'No specific caption override set.'}
                  </p>
                  {isOverLimit && (
                    <span className="text-[10px] font-mono text-rose-500 font-bold block mt-1">
                      ⚠️ Exceeds platform limit of {domainRule.maxCaptionLength} characters!
                    </span>
                  )}
                </div>

                {ver.hashtags && ver.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {ver.hashtags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};
