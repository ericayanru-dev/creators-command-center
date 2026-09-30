"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from "@/lib/navigation";
import { Content, ContentStatus, ContentType, Platform } from '@/types';
import { ContentService } from '@/lib/services/content/contentService';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { LoadingState } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { useToast } from '@/components/shared/Toast';
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges';
import { ArrowLeft, Save, Trash2, X, Plus, Info } from 'lucide-react';

const PLATFORM_LIST: Platform[] = ['youtube', 'instagram', 'tiktok', 'linkedin', 'facebook'];

const DEFAULT_FORM_DATA: Partial<Content> = {
  title: '',
  description: '',
  caption: '',
  notes: '',
  contentType: 'video',
  status: 'IDEA',
  targetPlatforms: ['youtube'],
  tags: [],
  deadline: '',
};

export const ContentEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === 'new';
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Content>>(DEFAULT_FORM_DATA);
  const [initialData, setInitialData] = useState<Partial<Content>>(DEFAULT_FORM_DATA);

  const [tagInput, setTagInput] = useState('');

  // Unsaved changes detection
  const isDirty = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(initialData);
  }, [formData, initialData]);

  const { showExitConfirm, confirmNavigation, handleConfirmExit, handleCancelExit } =
    useUnsavedChanges(isDirty && !isSaving);

  useEffect(() => {
    if (!isNew && id) {
      const load = async () => {
        try {
          const item = await ContentService.getContentById(id);
          if (item) {
            const parsed = {
              ...item,
              deadline: item.deadline ? item.deadline.split('T')[0] : '',
            };
            setFormData(parsed);
            setInitialData(parsed);
          }
        } catch {
          toast('Failed to load content for editing', 'error');
        } finally {
          setIsLoading(false);
        }
      };
      load();
    }
  }, [id, isNew]);

  const handleTogglePlatform = (platform: Platform) => {
    const list = formData.targetPlatforms || [];
    const exists = list.includes(platform);
    setFormData({
      ...formData,
      targetPlatforms: exists ? list.filter((p) => p !== platform) : [...list, platform],
    });
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = tagInput.trim().replace(/^#/, '');
      if (val && !formData.tags?.includes(val)) {
        setFormData({
          ...formData,
          tags: [...(formData.tags || []), val],
        });
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((t) => t !== tag) || [],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      toast('Title is required', 'error');
      return;
    }

    setIsSaving(true);
    try {
      if (isNew) {
        const created = await ContentService.createContent({
          ...formData,
          deadline: formData.deadline ? new Date(formData.deadline).toISOString() : undefined,
        });
        toast('Content created successfully', 'success');
        navigate(`/content/${created.id}`);
      } else if (id) {
        // Exclude status property so general edits do not bypass workflow transition state machine
        const { status: _status, ...cleanUpdates } = formData;
        await ContentService.updateContent(id, {
          ...cleanUpdates,
          deadline: formData.deadline ? new Date(formData.deadline).toISOString() : undefined,
        });
        toast('Content updated successfully', 'success');
        navigate(`/content/${id}`);
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to save content';
      toast(msg, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <LoadingState message="Loading content editor..." />;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => confirmNavigation(() => navigate(isNew ? '/content' : `/content/${id}`))}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Cancel & Return</span>
        </button>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => confirmNavigation(() => navigate(isNew ? '/content' : `/content/${id}`))}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            isLoading={isSaving}
            leftIcon={<Save className="w-3.5 h-3.5" />}
          >
            {isNew ? 'Create Content' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          {isNew ? 'Create New Master Content' : 'Edit Master Content'}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
          Update primary metadata, narrative structure, target channels, and schedule constraints.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Title & Format Card */}
        <Card className="space-y-5">
          <Input
            label="Master Content Title"
            required
            placeholder="e.g. Complete System Architecture Deep Dive"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Format Type
              </label>
              <select
                value={formData.contentType || 'video'}
                onChange={(e) => setFormData({ ...formData, contentType: e.target.value as ContentType })}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
              >
                <option value="video">Long-Form Video (16:9)</option>
                <option value="short_video">Shorts / Reels / TikTok (9:16)</option>
                <option value="image">Carousel / Graphic Post</option>
                <option value="audio">Podcast / Audio Clip</option>
                <option value="text">Written Article / Thread</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Lifecycle Stage
              </label>
              {isNew ? (
                <select
                  value={formData.status || 'IDEA'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as ContentStatus })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                >
                  <option value="IDEA">💡 Idea (Backlog)</option>
                  <option value="DRAFT">📝 Draft / Scripting</option>
                </select>
              ) : (
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <StatusBadge status={formData.status || 'DRAFT'} showDot />
                  <span className="text-[10px] text-slate-400 font-mono">Managed via workflow</span>
                </div>
              )}
            </div>

            <div>
              <Input
                type="date"
                label="Target Deadline"
                value={formData.deadline || ''}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
            </div>
          </div>

          {/* Target Platforms */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Target Distribution Platforms
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {PLATFORM_LIST.map((p) => {
                const isSelected = formData.targetPlatforms?.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleTogglePlatform(p)}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-semibold capitalize transition-all cursor-pointer ${
                      isSelected
                        ? 'border-sky-600 bg-sky-50 text-sky-950 dark:bg-sky-950/60 dark:border-sky-400 dark:text-sky-300 shadow-2xs font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <PlatformIcon platform={p} size="xs" />
                    <span>{p}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Narrative & Copy Card */}
        <Card className="space-y-4">
          <Textarea
            label="Master Summary & Thesis"
            rows={3}
            placeholder="High-level premise, primary takeaways, and hook..."
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <Textarea
            label="Master Caption & Post Copy"
            rows={4}
            placeholder="Primary caption text to be adapted across platforms..."
            value={formData.caption || ''}
            onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
          />

          <Textarea
            label="Internal Production & Outline Notes"
            rows={4}
            placeholder="Timecodes, talking points, B-roll cues, graphic links..."
            value={formData.notes || ''}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Content Pillars & Tags
            </label>
            <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
              {formData.tags?.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-rose-500 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Type tag & press Enter..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="text-xs bg-transparent border-none focus:outline-none flex-1 min-w-[120px] text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
              />
            </div>
          </div>
        </Card>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            variant="ghost"
            size="md"
            onClick={() => confirmNavigation(() => navigate(isNew ? '/content' : `/content/${id}`))}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
          >
            {isNew ? 'Create Content Item' : 'Save Changes'}
          </Button>
        </div>
      </form>

      {/* Unsaved Changes Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showExitConfirm}
        title="You have unsaved changes"
        message="Your changes will be lost if you leave this page."
        confirmLabel="Leave without saving"
        cancelLabel="Stay"
        variant="danger"
        onConfirm={handleConfirmExit}
        onCancel={handleCancelExit}
      />
    </div>
  );
};
