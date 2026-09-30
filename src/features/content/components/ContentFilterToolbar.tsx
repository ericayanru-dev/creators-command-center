import React from 'react';
import { ContentStatus, ContentType, Platform } from '@/types';
import { Search, Grid, List as ListIcon, Plus, Archive, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { UI_CLASSES } from '@/lib/constants/theme';

interface ContentFilterToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedStage: ContentStatus | 'ALL';
  onStageChange: (stage: ContentStatus | 'ALL') => void;
  selectedType: ContentType | 'ALL';
  onTypeChange: (type: ContentType | 'ALL') => void;
  selectedPlatform: Platform | 'ALL';
  onPlatformChange: (platform: Platform | 'ALL') => void;
  showArchived: boolean;
  onToggleArchived: () => void;
  viewMode: 'grid' | 'list';
  onToggleViewMode: (mode: 'grid' | 'list') => void;
  onNewContent: () => void;
  onQuickIdea: () => void;
  onOpenProjects?: () => void;
  onOpenSavedViews?: () => void;
  totalCount: number;
}

const STAGES: { label: string; value: ContentStatus | 'ALL' }[] = [
  { label: 'All Content', value: 'ALL' },
  { label: '💡 Idea', value: 'IDEA' },
  { label: '📝 Draft', value: 'DRAFT' },
  { label: '🎬 Ready', value: 'READY' },
  { label: '⏰ Scheduled', value: 'SCHEDULED' },
  { label: '🚀 Published', value: 'PUBLISHED' },
];

export const ContentFilterToolbar: React.FC<ContentFilterToolbarProps> = ({
  searchQuery,
  onSearchChange,
  selectedStage,
  onStageChange,
  selectedType,
  onTypeChange,
  selectedPlatform,
  onPlatformChange,
  showArchived,
  onToggleArchived,
  viewMode,
  onToggleViewMode,
  onNewContent,
  onQuickIdea,
  onOpenProjects,
  onOpenSavedViews,
  totalCount,
}) => {
  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Content Library
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
            {totalCount} item{totalCount === 1 ? '' : 's'} in editorial pipeline
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onQuickIdea}>
            + Quick Idea
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onNewContent}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            New Content Item
          </Button>
        </div>
      </div>

      {/* Stage Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800">
        {STAGES.map((s) => {
          const isActive = selectedStage === s.value;
          return (
            <button
              key={s.value}
              type="button"
              onClick={() => onStageChange(s.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                isActive
                  ? `${UI_CLASSES.activePillTab} shadow-xs`
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {s.label}
            </button>
          );
        })}

        <div className="ml-auto flex items-center gap-1.5">
          {onOpenSavedViews && (
            <button
              type="button"
              onClick={onOpenSavedViews}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Saved Views (MVP2)"
              aria-label="Saved Views (Coming in MVP2)"
            >
              <Bookmark className="w-3 h-3 text-violet-500" />
              <span>Saved Views</span>
              <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                MVP2
              </span>
            </button>
          )}

          {onOpenProjects && (
            <button
              type="button"
              onClick={onOpenProjects}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Projects & Workspaces (MVP2)"
              aria-label="Projects (Coming in MVP2)"
            >
              <span>📁 Projects</span>
              <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                MVP2
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filter by title, tags, brief..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value as ContentType | 'ALL')}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono"
          >
            <option value="ALL">All Formats</option>
            <option value="video">Long Video</option>
            <option value="short_video">Short / Reel</option>
            <option value="image">Image</option>
            <option value="audio">Audio</option>
            <option value="text">Text Post</option>
          </select>

          <select
            value={selectedPlatform}
            onChange={(e) => onPlatformChange(e.target.value as Platform | 'ALL')}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono capitalize"
          >
            <option value="ALL">All Channels</option>
            <option value="youtube">YouTube</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="linkedin">LinkedIn</option>
            <option value="facebook">Facebook</option>
          </select>

          <button
            type="button"
            onClick={onToggleArchived}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors ${
              showArchived
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-800 dark:text-amber-300'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Archive className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Archived</span>
          </button>

          <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg p-0.5 bg-white dark:bg-slate-900">
            <button
              type="button"
              onClick={() => onToggleViewMode('grid')}
              className={`p-1.5 rounded cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onToggleViewMode('list')}
              className={`p-1.5 rounded cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Table View"
            >
              <ListIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
