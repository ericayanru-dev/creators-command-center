"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "@/lib/navigation";
import { Content, ContentStatus, ContentType, Platform } from '@/types';
import { ContentService } from '@/lib/services/content/contentService';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/shared/Toast';
import { ComingSoonModal, ComingSoonFeatureType } from '@/components/shared/ComingSoonModal';

// Subcomponents
import { ContentFilterToolbar } from '@/features/content/components/ContentFilterToolbar';
import { ContentGridView } from '@/features/content/components/ContentGridView';
import { ContentTableView } from '@/features/content/components/ContentTableView';

export const ContentListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();

  const [items, setItems] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [comingSoonFeature, setComingSoonFeature] = useState<ComingSoonFeatureType | null>(null);

  // Filters
  const selectedStage = (searchParams.get('stage') as ContentStatus | 'ALL') || 'ALL';
  const selectedType = (searchParams.get('type') as ContentType | 'ALL') || 'ALL';
  const selectedPlatform = (searchParams.get('platform') as Platform | 'ALL') || 'ALL';
  const searchQuery = searchParams.get('search') || '';
  const showArchived = searchParams.get('archived') === 'true';

  // Quick idea modal
  const [quickIdeaOpen, setQuickIdeaOpen] = useState(false);
  const [quickTitle, setQuickTitle] = useState('');
  const [quickDescription, setQuickDescription] = useState('');
  const [isSavingIdea, setIsSavingIdea] = useState(false);

  const loadContent = async () => {
    setIsLoading(true);
    try {
      const list = await ContentService.listContent({
        status: selectedStage,
        contentType: selectedType,
        platform: selectedPlatform,
        search: searchQuery,
        archived: showArchived,
      });
      setItems(list);
    } catch {
      toast('Failed to load content list', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, [selectedStage, selectedType, selectedPlatform, searchQuery, showArchived]);

  const updateParam = (key: string, val: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (!val || val === 'ALL') {
      next.delete(key);
    } else {
      next.set(key, val);
    }
    setSearchParams(next);
  };

  const handleCreateQuickIdea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;

    setIsSavingIdea(true);
    try {
      const created = await ContentService.createContent({
        title: quickTitle.trim(),
        description: quickDescription.trim(),
        status: 'IDEA',
      });
      toast(`Captured idea "${created.title}"`, 'success');
      setQuickIdeaOpen(false);
      setQuickTitle('');
      setQuickDescription('');
      loadContent();
    } catch {
      toast('Failed to save idea', 'error');
    } finally {
      setIsSavingIdea(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Filtering Toolbar */}
      <ContentFilterToolbar
        searchQuery={searchQuery}
        onSearchChange={(q) => updateParam('search', q || null)}
        selectedStage={selectedStage}
        onStageChange={(s) => updateParam('stage', s)}
        selectedType={selectedType}
        onTypeChange={(t) => updateParam('type', t)}
        selectedPlatform={selectedPlatform}
        onPlatformChange={(p) => updateParam('platform', p)}
        showArchived={showArchived}
        onToggleArchived={() => updateParam('archived', showArchived ? null : 'true')}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        onNewContent={() => navigate('/content/new')}
        onQuickIdea={() => setQuickIdeaOpen(true)}
        onOpenProjects={() => setComingSoonFeature('projects')}
        onOpenSavedViews={() => setComingSoonFeature('saved_views')}
        totalCount={items.length}
      />

      {/* Main Content Area */}
      {isLoading ? (
        <LoadingState message="Filtering content catalog..." />
      ) : items.length === 0 ? (
        <EmptyState
          title="No content found"
          description={
            searchQuery || selectedStage !== 'ALL' || selectedType !== 'ALL' || selectedPlatform !== 'ALL'
              ? 'Try relaxing your filters or search terms.'
              : 'Your editorial pipeline is empty. Start by capturing an idea or creating a new post.'
          }
          actionLabel="New Content Item"
          onAction={() => navigate('/content/new')}
        />
      ) : viewMode === 'grid' ? (
        <ContentGridView items={items} />
      ) : (
        <ContentTableView items={items} />
      )}

      {/* Quick Idea Modal */}
      {quickIdeaOpen && (
        <Modal
          isOpen={quickIdeaOpen}
          onClose={() => setQuickIdeaOpen(false)}
          title="Quick Idea Capture"
          size="sm"
        >
          <form onSubmit={handleCreateQuickIdea} className="space-y-4">
            <Input
              label="Concept / Title"
              value={quickTitle}
              onChange={(e) => setQuickTitle(e.target.value)}
              placeholder="e.g. 5 CSS Grid tricks for 2026..."
              required
              autoFocus
            />
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Rough Notes / Hook
              </label>
              <textarea
                value={quickDescription}
                onChange={(e) => setQuickDescription(e.target.value)}
                rows={3}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                placeholder="Key takeaways, potential angles, references..."
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setQuickIdeaOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" isLoading={isSavingIdea}>
                Save Idea
              </Button>
            </div>
          </form>
        </Modal>
      )}

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
