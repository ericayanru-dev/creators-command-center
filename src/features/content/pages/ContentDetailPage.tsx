"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "@/lib/navigation";
import {
  Content,
  ContentStatus,
  ContentVersion,
  MediaAsset,
  Platform,
  ProductionPlan,
  ShootingChecklistItem,
  Task,
  TaskPriority,
} from '@/types';
import { ContentService } from '@/lib/services/content/contentService';
import { TaskService } from '@/lib/services/tasks/taskService';
import { LoadingState } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/components/shared/Toast';
import { DollarSign, Users } from 'lucide-react';
import { ComingSoonModal, ComingSoonFeatureType } from '@/components/shared/ComingSoonModal';

// Subcomponents
import { ContentDetailHeader } from '@/features/content/components/ContentDetailHeader';
import { ContentLifecycleStepper } from '@/features/content/components/ContentLifecycleStepper';
import { ContentMediaSection } from '@/features/content/components/ContentMediaSection';
import { ContentVersionsSection } from '@/features/content/components/ContentVersionsSection';
import { ContentFamilySection } from '@/features/content/components/ContentFamilySection';
import { ContentPublishingSummary } from '@/features/content/components/ContentPublishingSummary';
import { ContentProductionPlanSection } from '@/features/content/components/ContentProductionPlan';
import { ContentTasksSection } from '@/features/content/components/ContentTasksSection';
import { PlatformPreviewModal } from '@/features/content/components/PlatformPreviewModal';
import { CreateDerivativeModal } from '@/features/content/components/CreateDerivativeModal';

export const ContentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [content, setContent] = useState<Content | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [productionPlan, setProductionPlan] = useState<ProductionPlan | null>(null);
  const [checklist, setChecklist] = useState<ShootingChecklistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCreateDerivativeOpen, setIsCreateDerivativeOpen] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState<ComingSoonFeatureType | null>(null);

  // Edit version modal state
  const [editingVersion, setEditingVersion] = useState<Partial<ContentVersion> | null>(null);
  const [versionPlatform, setVersionPlatform] = useState<Platform>('youtube');
  const [versionCaption, setVersionCaption] = useState('');
  const [versionTitle, setVersionTitle] = useState('');
  const [isSavingVersion, setIsSavingVersion] = useState(false);

  // Platform preview modal state
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewPlatform, setPreviewPlatform] = useState<Platform>('instagram');

  const handlePreviewPlatform = (platform: Platform) => {
    setPreviewPlatform(platform);
    setShowPreviewModal(true);
  };

  const handleUpdateMedia = async (media: MediaAsset | undefined) => {
    if (!content) return;
    const updated = await ContentService.updateMediaAsset(content.id, media);
    setContent(updated);
  };

  const loadData = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const [item, taskList, plan, chk] = await Promise.all([
        ContentService.getContentById(id),
        TaskService.getTasks({ contentId: id }),
        ContentService.getProductionPlan(id),
        ContentService.getChecklist(id),
      ]);
      if (!item) {
        setContent(null);
      } else {
        setContent(item);
        setTasks(taskList);
        setProductionPlan(plan);
        setChecklist(chk);
      }
    } catch {
      toast('Failed to load content details', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleStageTransition = async (newStatus: ContentStatus) => {
    if (!content) return;
    setIsTransitioning(true);
    try {
      const updated = await ContentService.updateStatus(content.id, newStatus);
      setContent(updated);
      toast(`Moved to ${newStatus} stage`, 'success');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Stage transition failed';
      toast(msg, 'error');
    } finally {
      setIsTransitioning(false);
    }
  };

  const handleArchive = async () => {
    if (!content) return;
    try {
      const updated = await ContentService.archiveContent(content.id, !content.archived);
      setContent(updated);
      toast(updated.archived ? 'Content archived' : 'Content unarchived', 'success');
    } catch {
      toast('Failed to update archive status', 'error');
    }
  };

  const handleDelete = async () => {
    if (!content) return;
    if (window.confirm(`Are you sure you want to delete "${content.title}"?`)) {
      try {
        await ContentService.deleteContent(content.id);
        toast('Content deleted', 'success');
        navigate('/content');
      } catch {
        toast('Failed to delete content', 'error');
      }
    }
  };

  // Platform Versions handling
  const handleOpenAddVersion = (platform: Platform) => {
    setVersionPlatform(platform);
    setVersionTitle(content?.title || '');
    setVersionCaption(content?.caption || '');
    setEditingVersion({ platform });
  };

  const handleOpenEditVersion = (v: ContentVersion) => {
    setVersionPlatform(v.platform);
    setVersionTitle(v.title || '');
    setVersionCaption(v.caption || '');
    setEditingVersion(v);
  };

  const handleSaveVersion = async () => {
    if (!content || !editingVersion) return;
    setIsSavingVersion(true);
    try {
      await ContentService.savePlatformVersion(content.id, {
        ...editingVersion,
        platform: versionPlatform,
        title: versionTitle,
        caption: versionCaption,
      });
      toast(`Version for ${versionPlatform} saved`, 'success');
      setEditingVersion(null);
      loadData();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to save version';
      toast(msg, 'error');
    } finally {
      setIsSavingVersion(false);
    }
  };

  const handleDeleteVersion = async (versionId: string) => {
    if (!content) return;
    try {
      await ContentService.deletePlatformVersion(content.id, versionId);
      toast('Version deleted', 'success');
      loadData();
    } catch {
      toast('Failed to delete version', 'error');
    }
  };

  // Production plan handling
  const handleSavePlan = async (plan: ProductionPlan) => {
    try {
      await ContentService.saveProductionPlan(plan);
      setProductionPlan(plan);
      toast('Production plan updated', 'success');
    } catch {
      toast('Failed to save production plan', 'error');
    }
  };

  const handleToggleChecklist = async (itemId: string) => {
    if (!content) return;
    const updated = checklist.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    setChecklist(updated);
    await ContentService.saveChecklist(content.id, updated);
  };

  const handleAddChecklist = async (label: string) => {
    if (!content) return;
    const newItem: ShootingChecklistItem = {
      id: `chk_${Date.now()}`,
      contentId: content.id,
      label,
      completed: false,
      order: checklist.length + 1,
    };
    const updated = [...checklist, newItem];
    setChecklist(updated);
    await ContentService.saveChecklist(content.id, updated);
  };

  // Tasks handling
  const handleToggleTask = async (taskId: string) => {
    try {
      await TaskService.toggleComplete(taskId);
      const updatedTasks = await TaskService.getTasks({ contentId: id });
      setTasks(updatedTasks);
    } catch {
      toast('Failed to toggle task', 'error');
    }
  };

  const handleAddTask = async (title: string, priority: TaskPriority) => {
    if (!content) return;
    try {
      await TaskService.createTask({
        title,
        priority,
        contentId: content.id,
        contentTitle: content.title,
      });
      toast('Task added', 'success');
      const updatedTasks = await TaskService.getTasks({ contentId: id });
      setTasks(updatedTasks);
    } catch {
      toast('Failed to add task', 'error');
    }
  };

  if (isLoading) {
    return <LoadingState message="Loading content details..." />;
  }

  if (!content) {
    return (
      <ErrorState
        title="Content Not Found"
        message="The content draft or post you requested does not exist."
        actionLabel="Back to Content Hub"
        onAction={() => navigate('/content')}
      />
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <ContentDetailHeader
        content={content}
        onArchive={handleArchive}
        onDelete={handleDelete}
        onCreateDerivative={() => setIsCreateDerivativeOpen(true)}
      />

      {/* Production Lifecycle State Machine Stepper */}
      <ContentLifecycleStepper
        currentStatus={content.status}
        onTransition={handleStageTransition}
        isLoading={isTransitioning}
      />

      {/* Narrative & Scripting Description */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400">
              Creative Brief & Narrative
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {content.description || 'No creative brief or outline written yet.'}
            </p>
          </div>

          {/* Media Assets Subcomponent */}
          <ContentMediaSection
            content={content}
            onUpdateMedia={handleUpdateMedia}
          />

          {/* Platform-Specific Versions Subcomponent */}
          <ContentVersionsSection
            content={content}
            onEditVersion={handleOpenEditVersion}
            onAddVersion={handleOpenAddVersion}
            onDeleteVersion={handleDeleteVersion}
            onPreviewVersion={handlePreviewPlatform}
          />

          {/* Content Family / Relationships Subcomponent */}
          <ContentFamilySection
            content={content}
            onPreviewPlatform={handlePreviewPlatform}
            onEditVersion={handleOpenEditVersion}
            onAddVersion={handleOpenAddVersion}
            onCreateDerivative={() => setIsCreateDerivativeOpen(true)}
          />
        </div>

        {/* Right Rail: Publishing Summary & Tasks */}
        <div className="space-y-6">
          {/* Publishing Compact Status */}
          <ContentPublishingSummary content={content} />

          {/* Tasks Subcomponent */}
          <ContentTasksSection
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
          />

          {/* Deals & Collaborations Context */}
          <Card className="space-y-3 p-4 bg-slate-50/50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Commercial & Partnerships
              </span>
              <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                MVP2
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setComingSoonFeature('sponsorships')}
                className="w-full flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-left transition-colors cursor-pointer"
                aria-label="Sponsorship Management (Coming in MVP2)"
              >
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Sponsorship Deliverables
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Preview →</span>
              </button>

              <button
                type="button"
                onClick={() => setComingSoonFeature('collaborations')}
                className="w-full flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-left transition-colors cursor-pointer"
                aria-label="Collaborations & Guest Appearances (Coming in MVP2)"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500 shrink-0" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Collaborator Credits
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Preview →</span>
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Production Planning & Call Sheet Subcomponent */}
      {productionPlan && (
        <ContentProductionPlanSection
          plan={productionPlan}
          checklist={checklist}
          onSavePlan={handleSavePlan}
          onToggleChecklistItem={handleToggleChecklist}
          onAddChecklistItem={handleAddChecklist}
        />
      )}

      {/* Edit Version Modal */}
      {editingVersion && (
        <Modal
          isOpen={!!editingVersion}
          onClose={() => setEditingVersion(null)}
          title={`Tailor Adaptation for ${versionPlatform.toUpperCase()}`}
          size="md"
        >
          <div className="space-y-4">
            <Input
              label="Title / Headline Override"
              value={versionTitle}
              onChange={(e) => setVersionTitle(e.target.value)}
              placeholder="Custom title for this channel..."
            />
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Caption Override
              </label>
              <textarea
                value={versionCaption}
                onChange={(e) => setVersionCaption(e.target.value)}
                rows={4}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-xs text-slate-900 dark:text-slate-100"
                placeholder="Platform caption..."
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setEditingVersion(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                isLoading={isSavingVersion}
                onClick={handleSaveVersion}
              >
                Save Version
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Platform Approximation Preview Modal */}
      <PlatformPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        content={content}
        initialPlatform={previewPlatform}
      />

      {/* Create Derivative Modal */}
      <CreateDerivativeModal
        isOpen={isCreateDerivativeOpen}
        onClose={() => setIsCreateDerivativeOpen(false)}
        content={content}
        onCreated={loadData}
      />

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
