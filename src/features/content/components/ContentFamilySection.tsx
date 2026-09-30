import React from 'react';
import { Content, ContentVersion, Platform } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { PLATFORMS_CONFIG } from '@/lib/constants/platforms';
import {
  GitFork,
  Layers,
  ArrowRight,
  Eye,
  Edit3,
  Film,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface ContentFamilySectionProps {
  content: Content;
  onPreviewPlatform: (platform: Platform) => void;
  onEditVersion: (version: ContentVersion) => void;
  onAddVersion: (platform: Platform) => void;
  onCreateDerivative?: () => void;
}

export const ContentFamilySection: React.FC<ContentFamilySectionProps> = ({
  content,
  onPreviewPlatform,
  onEditVersion,
  onAddVersion,
  onCreateDerivative,
}) => {
  const versions = content.versions || [];
  const targetPlatforms = content.targetPlatforms || [];

  return (
    <Card className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <GitFork className="w-4 h-4 text-sky-600 dark:text-sky-400 rotate-90" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Content Family & Derivative Relationships
          </h2>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-center">
          <span className="text-[11px] font-mono text-slate-400">
            1 Master • {targetPlatforms.length} Channel Derivatives
          </span>
          {onCreateDerivative && (
            <Button
              variant="outline"
              size="sm"
              onClick={onCreateDerivative}
              className="text-xs"
              leftIcon={<GitFork className="w-3.5 h-3.5 rotate-90 text-sky-600" />}
            >
              + Create Derivative
            </Button>
          )}
        </div>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        CCC manages your multi-platform release as a unified Content Family. One master creative brief produces tailored derivative versions for each target network.
      </p>

      {/* Family Tree Visualization */}
      <div className="relative pl-6 sm:pl-8 space-y-4 pt-2">
        {/* Vertical Tree Trunk Line */}
        <div className="absolute left-2.5 sm:left-3.5 top-5 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-700" />

        {/* ROOT NODE: Master Content */}
        <div className="relative">
          {/* Node Bullet */}
          <div className="absolute -left-6 sm:-left-8 top-3 w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
            1
          </div>

          <div className="p-3.5 rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/40 dark:bg-sky-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300">
                  Original Master
                </span>
                <StatusBadge status={content.status} showDot />
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                &ldquo;{content.title}&rdquo;
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">
                Format: {content.contentType.toUpperCase()} • {content.mediaAsset ? 'Media attached' : 'No media yet'}
              </p>
            </div>
          </div>
        </div>

        {/* DERIVATIVE BRANCHES */}
        <div className="space-y-3 pt-1">
          {targetPlatforms.map((platform) => {
            const ver = versions.find((v) => v.platform === platform);
            const isTailored = !!ver;

            return (
              <div key={platform} className="relative group">
                {/* Horizontal branch line */}
                <div className="absolute -left-6 sm:-left-8 top-4 w-4 sm:w-6 h-0.5 bg-slate-200 dark:bg-slate-700" />

                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
                      <PlatformIcon platform={platform} size="sm" />
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold capitalize text-slate-900 dark:text-slate-100">
                          {PLATFORMS_CONFIG[platform].name} Version
                        </span>
                        {isTailored ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-100 dark:border-emerald-900/60">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            Tailored Adaptation
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-slate-400">
                            Inherits Master Narrative
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-400 truncate max-w-md">
                        {ver?.title || content.title}
                      </p>

                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                        <span>Relationship: Platform Derivative</span>
                        <span>•</span>
                        <span>{PLATFORMS_CONFIG[platform].mediaAspectRatios.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onPreviewPlatform(platform)}
                      leftIcon={<Eye className="w-3.5 h-3.5" />}
                    >
                      Preview Feed
                    </Button>

                    {isTailored ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditVersion(ver)}
                        leftIcon={<Edit3 className="w-3.5 h-3.5" />}
                      >
                        Edit
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onAddVersion(platform)}
                        className="text-sky-600 dark:text-sky-400"
                      >
                        + Customize
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
