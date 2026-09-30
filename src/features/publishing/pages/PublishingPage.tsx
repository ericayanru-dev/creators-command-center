"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from "@/lib/navigation";
import {
  Content,
  Platform,
  Publication,
  PublishingOperationResult,
  SocialAccount,
} from '@/types';
import { PublishingService } from '@/lib/services/publishing/publishingService';
import { ContentService } from '@/lib/services/content/contentService';
import { PlatformService } from '@/lib/services/platforms/platformService';
import { LoadingState } from '@/components/shared/LoadingState';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/components/shared/Toast';
import { formatDateOnly } from '@/lib/utils';
import { UI_CLASSES } from '@/lib/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { getUserTimezone, getTimezoneLabel, localDateTimeToUtcIso } from '@/lib/utils/timezone';
import { PLATFORM_DOMAIN_RULES } from '@/lib/constants/platforms';
import { History, CheckCircle2, RotateCcw } from 'lucide-react';
import { ComingSoonModal, ComingSoonFeatureType } from '@/components/shared/ComingSoonModal';

// Subcomponents
import { PublishingWizard } from '@/features/publishing/components/PublishingWizard';
import { PublishingLedger } from '@/features/publishing/components/PublishingLedger';
import { PublishingResultsCard } from '@/features/publishing/components/PublishingResultsCard';
import { PublishingExecutionProgress } from '@/features/publishing/components/PublishingExecutionProgress';
import { SelectiveRetryModal } from '@/features/publishing/components/SelectiveRetryModal';
import { PublishConfirmationModal } from '@/features/publishing/components/PublishConfirmationModal';
import { ScheduleConfirmationModal } from '@/features/publishing/components/ScheduleConfirmationModal';
import { CancelPublicationModal } from '@/features/publishing/components/CancelPublicationModal';
import { CalendarRescheduleModal } from '@/features/calendar/components/CalendarRescheduleModal';

export const PublishingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const userTimezone = getUserTimezone(user);

  const [activeView, setActiveView] = useState<'wizard' | 'history'>('wizard');

  const [contentList, setContentList] = useState<Content[]>([]);
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Wizard state
  const preselectedContentId = searchParams.get('contentId');
  const [selectedContentId, setSelectedContentId] = useState<string>(preselectedContentId || '');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['youtube']);
  const [publishMode, setPublishMode] = useState<'NOW' | 'SCHEDULE'>('NOW');
  const [scheduleDate, setScheduleDate] = useState<string>(
    new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [scheduleTime, setScheduleTime] = useState<string>('18:00');
  const [isExecutingPublish, setIsExecutingPublish] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showScheduleConfirmationModal, setShowScheduleConfirmationModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [pubToCancel, setPubToCancel] = useState<Publication | null>(null);
  const [pubToReschedule, setPubToReschedule] = useState<Publication | null>(null);

  // Result state after publishing
  const [operationResult, setOperationResult] = useState<PublishingOperationResult | null>(null);

  // Selective retry confirmation modal state
  const [retryModalState, setRetryModalState] = useState<{
    isOpen: boolean;
    failedPlatforms: Platform[];
    successfulPlatforms: Platform[];
  }>({
    isOpen: false,
    failedPlatforms: [],
    successfulPlatforms: [],
  });
  const [comingSoonFeature, setComingSoonFeature] = useState<ComingSoonFeatureType | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [allContent, allAccounts, allPubs] = await Promise.all([
        ContentService.listContent(),
        PlatformService.getAccounts(),
        PublishingService.getPublications(),
      ]);
      setContentList(allContent);
      setAccounts(allAccounts);
      setPublications(allPubs);

      // Pre-select first item if not set
      if (!selectedContentId && allContent.length > 0) {
        setSelectedContentId(allContent[0].id);
        if (allContent[0].targetPlatforms.length > 0) {
          setSelectedPlatforms(allContent[0].targetPlatforms);
        }
      }
    } catch {
      toast('Failed to load publishing data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const selectedContent = contentList.find((c) => c.id === selectedContentId);

  const handleSelectContent = (cId: string) => {
    setSelectedContentId(cId);
    setOperationResult(null);
    const item = contentList.find((c) => c.id === cId);
    if (item && item.targetPlatforms.length > 0) {
      setSelectedPlatforms(item.targetPlatforms);
    }
  };

  const togglePlatform = (p: Platform) => {
    setOperationResult(null);
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((item) => item !== p) : [...prev, p]
    );
  };

  // 1. Initial trigger: validates requirements & opens review / confirmation modal
  const handleRequestPublishNow = () => {
    if (!selectedContent) return;
    if (selectedPlatforms.length === 0) {
      toast('Select at least one platform', 'error');
      return;
    }

    // Validate that real platform versions and required media exist for all selected channels
    for (const p of selectedPlatforms) {
      const ver = selectedContent.versions?.find((v) => v.platform === p && v.contentId === selectedContent.id);
      const platName = p.charAt(0).toUpperCase() + p.slice(1);
      if (!ver) {
        toast(`Create the ${platName} version before publishing.`, 'error');
        return;
      }

      const domainRule = PLATFORM_DOMAIN_RULES[p];
      const attachedMedia = ver.mediaAsset || selectedContent.mediaAsset;
      const requiresMedia = domainRule && !domainRule.supportedMediaTypes.includes('text');

      if (requiresMedia && !attachedMedia) {
        toast(`Platform ${platName} requires media before publishing. Please upload a media asset.`, 'error');
        return;
      }

      if (attachedMedia && attachedMedia.status === 'FAILED') {
        toast(`Cannot publish to ${platName}: Attached media asset failed processing.`, 'error');
        return;
      }

      if (attachedMedia && (p === 'youtube' || p === 'tiktok')) {
        if (attachedMedia.mimeType && !attachedMedia.mimeType.startsWith('video')) {
          toast(`Platform ${platName} requires a video file, but found ${attachedMedia.mimeType}.`, 'error');
          return;
        }
      }
    }

    setShowConfirmationModal(true);
  };

  // 2. Confirmed trigger: executes publishing through existing PublishingService.publishNow
  const handleConfirmPublishNow = async () => {
    if (!selectedContent) return;
    if (selectedPlatforms.length === 0) {
      toast('Select at least one platform', 'error');
      return;
    }

    // Verify platform versions and required media exist and collect genuine IDs
    const versionIds: Partial<Record<Platform, string>> = {};
    for (const p of selectedPlatforms) {
      const ver = selectedContent.versions?.find((v) => v.platform === p && v.contentId === selectedContent.id);
      const platName = p.charAt(0).toUpperCase() + p.slice(1);
      if (!ver) {
        toast(`Create the ${platName} version before publishing.`, 'error');
        return;
      }

      const domainRule = PLATFORM_DOMAIN_RULES[p];
      const attachedMedia = ver.mediaAsset || selectedContent.mediaAsset;
      const requiresMedia = domainRule && !domainRule.supportedMediaTypes.includes('text');

      if (requiresMedia && !attachedMedia) {
        toast(`Platform ${platName} requires media before publishing. Please upload a media asset.`, 'error');
        return;
      }

      if (attachedMedia && attachedMedia.status === 'FAILED') {
        toast(`Cannot publish to ${platName}: Attached media asset failed processing.`, 'error');
        return;
      }

      if (attachedMedia && (p === 'youtube' || p === 'tiktok')) {
        if (attachedMedia.mimeType && !attachedMedia.mimeType.startsWith('video')) {
          toast(`Platform ${platName} requires a video file, but found ${attachedMedia.mimeType}.`, 'error');
          return;
        }
      }

      versionIds[p] = ver.id;
    }

    setShowConfirmationModal(false);
    setIsExecutingPublish(true);
    setShowProgressModal(true);

    try {
      const res = await PublishingService.publishNow({
        contentId: selectedContent.id,
        contentTitle: selectedContent.title,
        targetPlatforms: selectedPlatforms,
        versionIds,
      });

      setOperationResult(res);

      if (res.overallStatus === 'SUCCESS') {
        toast('Published to all channels successfully!', 'success');
      } else if (res.overallStatus === 'PARTIAL_SUCCESS') {
        toast('Published with partial errors. Review failed channels below.', 'error');
      } else {
        toast('Publishing failed. Review failure reasons below.', 'error');
      }

      const updatedPubs = await PublishingService.getPublications();
      setPublications(updatedPubs);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Publishing error';
      toast(msg, 'error');
    } finally {
      setIsExecutingPublish(false);
      setShowProgressModal(false);
    }
  };

  // Initial trigger for scheduling: validates prerequisites and opens review / confirmation modal
  const handleRequestSchedule = () => {
    if (!selectedContent) return;
    if (selectedPlatforms.length === 0) {
      toast('Select at least one platform to schedule', 'error');
      return;
    }

    if (!scheduleDate || !scheduleTime) {
      toast('Provide a release date and time to schedule', 'error');
      return;
    }

    const scheduledUtc = localDateTimeToUtcIso(scheduleDate, scheduleTime, userTimezone);
    if (new Date(scheduledUtc).getTime() <= Date.now()) {
      toast('Scheduled time must be in the future', 'error');
      return;
    }

    // Validate that real platform versions and required media exist for all selected channels
    for (const p of selectedPlatforms) {
      const ver = selectedContent.versions?.find((v) => v.platform === p && v.contentId === selectedContent.id);
      const platName = p.charAt(0).toUpperCase() + p.slice(1);
      if (!ver) {
        toast(`Create the ${platName} version before scheduling.`, 'error');
        return;
      }

      const domainRule = PLATFORM_DOMAIN_RULES[p];
      const attachedMedia = ver.mediaAsset || selectedContent.mediaAsset;
      const requiresMedia = domainRule && !domainRule.supportedMediaTypes.includes('text');

      if (requiresMedia && !attachedMedia) {
        toast(`Platform ${platName} requires media before scheduling. Please upload a media asset.`, 'error');
        return;
      }

      if (attachedMedia && attachedMedia.status === 'FAILED') {
        toast(`Cannot schedule to ${platName}: Attached media asset failed processing.`, 'error');
        return;
      }

      if (attachedMedia && (p === 'youtube' || p === 'tiktok')) {
        if (attachedMedia.mimeType && !attachedMedia.mimeType.startsWith('video')) {
          toast(`Platform ${platName} requires a video file, but found ${attachedMedia.mimeType}.`, 'error');
          return;
        }
      }
    }

    setShowScheduleConfirmationModal(true);
  };

  // Confirmed trigger for scheduling
  const handleConfirmSchedule = async () => {
    if (!selectedContent) return;
    setShowScheduleConfirmationModal(false);
    setIsExecutingPublish(true);
    try {
      const scheduledUtc = localDateTimeToUtcIso(scheduleDate, scheduleTime, userTimezone);

      for (const p of selectedPlatforms) {
        const ver = selectedContent.versions?.find((v) => v.platform === p && v.contentId === selectedContent.id);
        if (!ver) {
          const platName = p.charAt(0).toUpperCase() + p.slice(1);
          throw new Error(`Create the ${platName} version before scheduling.`);
        }

        await PublishingService.schedulePublication({
          contentId: selectedContent.id,
          contentTitle: selectedContent.title,
          platform: p,
          contentVersionId: ver.id,
          scheduledAt: scheduledUtc,
          displayTimezone: userTimezone,
        });
      }

      toast(
        `Scheduled for ${formatDateOnly(scheduledUtc)} across ${selectedPlatforms.length} channels`,
        'success'
      );
      setActiveView('history');
      const updatedPubs = await PublishingService.getPublications();
      setPublications(updatedPubs);
      const updatedContentList = await ContentService.listContent();
      setContentList(updatedContentList);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Scheduling failed';
      toast(msg, 'error');
    } finally {
      setIsExecutingPublish(false);
    }
  };

  const handleOpenRetryModal = (failed: Platform[], successful: Platform[]) => {
    setRetryModalState({
      isOpen: true,
      failedPlatforms: failed,
      successfulPlatforms: successful,
    });
  };

  const handleConfirmSelectiveRetry = async () => {
    if (!selectedContent) return;
    setIsExecutingPublish(true);
    try {
      const res = await PublishingService.retryFailedPlatforms(
        selectedContent.id,
        retryModalState.failedPlatforms,
        userTimezone
      );
      setOperationResult(res);
      toast(
        res.overallStatus === 'SUCCESS'
          ? 'Selective retry succeeded on all failed channels!'
          : 'Selective retry completed.',
        res.overallStatus === 'SUCCESS' ? 'success' : 'error'
      );
      const updatedPubs = await PublishingService.getPublications();
      setPublications(updatedPubs);
      setRetryModalState((prev) => ({ ...prev, isOpen: false }));
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Retry failed';
      toast(msg, 'error');
    } finally {
      setIsExecutingPublish(false);
    }
  };

  const handleConfirmCancel = async () => {
    if (!pubToCancel) return;
    setIsExecutingPublish(true);
    try {
      await PublishingService.cancelScheduledPublication(pubToCancel.id);
      toast(`Scheduled release cancelled for ${pubToCancel.platform}`, 'success');
      const updatedPubs = await PublishingService.getPublications();
      setPublications(updatedPubs);
      const updatedContentList = await ContentService.listContent();
      setContentList(updatedContentList);
      setPubToCancel(null);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to cancel publication';
      toast(msg, 'error');
    } finally {
      setIsExecutingPublish(false);
    }
  };

  const handleConfirmReschedule = async (pubId: string, newDateTimeIso: string) => {
    setIsExecutingPublish(true);
    try {
      await PublishingService.reschedulePublication(pubId, newDateTimeIso, userTimezone);
      toast('Publication release rescheduled', 'success');
      setPubToReschedule(null);
      const updatedPubs = await PublishingService.getPublications();
      setPublications(updatedPubs);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to reschedule';
      toast(msg, 'error');
    } finally {
      setIsExecutingPublish(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Publishing Command Hub
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
            Execute immediate multi-platform distribution or manage automated release queues
          </p>
        </div>

        {/* View Switcher & Recovery Actions */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <button
            type="button"
            onClick={() => setComingSoonFeature('publishing_recovery')}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer transition-colors"
            aria-label="Publishing Auto-Recovery Policies (Coming in MVP2)"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
            <span className="hidden sm:inline">Auto-Recovery</span>
            <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
              MVP2
            </span>
          </button>

          <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg p-0.5 bg-white dark:bg-slate-900">
            <button
              type="button"
              onClick={() => setActiveView('wizard')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                activeView === 'wizard'
                  ? UI_CLASSES.activePillTab
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Publish / Schedule Flow
            </button>
            <button
              type="button"
              onClick={() => setActiveView('history')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeView === 'history'
                  ? UI_CLASSES.activePillTab
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>History & Queue ({publications.length})</span>
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingState message="Loading publishing operations..." />
      ) : activeView === 'wizard' ? (
        /* PUBLISHING WIZARD VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <PublishingWizard
              contentList={contentList}
              selectedContentId={selectedContentId}
              onSelectContent={handleSelectContent}
              selectedContent={selectedContent}
              accounts={accounts}
              selectedPlatforms={selectedPlatforms}
              onTogglePlatform={togglePlatform}
              publishMode={publishMode}
              onChangePublishMode={setPublishMode}
              scheduleDate={scheduleDate}
              onChangeScheduleDate={setScheduleDate}
              scheduleTime={scheduleTime}
              onChangeScheduleTime={setScheduleTime}
              isExecutingPublish={isExecutingPublish}
              onExecutePublishNow={handleRequestPublishNow}
              onExecuteSchedule={handleRequestSchedule}
              timezone={userTimezone}
            />

            {/* Results Card */}
            {operationResult && (
              <PublishingResultsCard
                operationResult={operationResult}
                isExecutingPublish={isExecutingPublish}
                onRequestSelectiveRetry={handleOpenRetryModal}
              />
            )}
          </div>

          {/* Right Rail: Publishing Pre-flight Checklist & Best Times */}
          <div className="space-y-6">
            <Card className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-800">
                Pre-Flight Validation
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">Content title & narrative defined</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">Character limits compliant with APIs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">High-res media asset ready for upload</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Timezone localized ({getTimezoneLabel(userTimezone)})
                  </span>
                </div>
              </div>
            </Card>

            <Card className="space-y-3 bg-sky-50/50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-900/60">
              <h4 className="text-xs font-mono font-bold uppercase text-sky-800 dark:text-sky-300">
                Best Publishing Times
              </h4>
              <p className="text-xs text-sky-900 dark:text-sky-200 leading-relaxed">
                Based on historical audience velocity for your niche:
              </p>
              <ul className="text-xs font-mono space-y-1 text-slate-700 dark:text-slate-300">
                <li>• YouTube: Tuesday 17:00 - 19:00</li>
                <li>• Instagram: Weekdays 18:30</li>
                <li>• TikTok: Daily 20:00</li>
                <li>• LinkedIn: Tuesday / Thursday 09:00</li>
              </ul>
            </Card>
          </div>
        </div>
      ) : (
        /* PUBLISHING HISTORY & QUEUE VIEW */
        <PublishingLedger
          publications={publications}
          onSelectiveRetry={(failed) => {
            const successful = publications
              .filter((p) => p.status === 'PUBLISHED')
              .map((p) => p.platform);
            handleOpenRetryModal(failed, successful);
          }}
          onRequestCancelScheduled={(pub) => setPubToCancel(pub)}
          onRequestReschedule={(pub) => setPubToReschedule(pub)}
        />
      )}

      {/* Publish Now Pre-flight Confirmation Modal */}
      {selectedContent && (
        <PublishConfirmationModal
          isOpen={showConfirmationModal}
          onClose={() => setShowConfirmationModal(false)}
          onConfirm={handleConfirmPublishNow}
          isLoading={isExecutingPublish}
          content={selectedContent}
          selectedPlatforms={selectedPlatforms}
          accounts={accounts}
        />
      )}

      {/* Schedule Pre-flight Confirmation Modal */}
      {selectedContent && (
        <ScheduleConfirmationModal
          isOpen={showScheduleConfirmationModal}
          onClose={() => setShowScheduleConfirmationModal(false)}
          onConfirm={handleConfirmSchedule}
          isLoading={isExecutingPublish}
          content={selectedContent}
          selectedPlatforms={selectedPlatforms}
          accounts={accounts}
          scheduledUtcIso={localDateTimeToUtcIso(scheduleDate, scheduleTime, userTimezone)}
          displayTimezone={userTimezone}
        />
      )}

      {/* Cancellation Confirmation Modal */}
      <CancelPublicationModal
        isOpen={!!pubToCancel}
        onClose={() => setPubToCancel(null)}
        onConfirm={handleConfirmCancel}
        isLoading={isExecutingPublish}
        publication={pubToCancel}
      />

      {/* Reschedule Modal */}
      {pubToReschedule && (
        <CalendarRescheduleModal
          publication={pubToReschedule}
          onClose={() => setPubToReschedule(null)}
          onConfirm={handleConfirmReschedule}
          isLoading={isExecutingPublish}
          timezone={userTimezone}
        />
      )}

      {/* Background Publishing Progress Modal with Approved Exact Message */}
      <PublishingExecutionProgress
        isOpen={showProgressModal}
        contentTitle={selectedContent?.title || 'Selected Content'}
        targetPlatforms={selectedPlatforms}
        onDismiss={() => setShowProgressModal(false)}
      />

      {/* Selective Retry Confirmation Modal */}
      <SelectiveRetryModal
        isOpen={retryModalState.isOpen}
        contentTitle={selectedContent?.title || 'Selected Content'}
        failedPlatforms={retryModalState.failedPlatforms}
        successfulPlatforms={retryModalState.successfulPlatforms}
        isLoading={isExecutingPublish}
        onConfirm={handleConfirmSelectiveRetry}
        onClose={() => setRetryModalState((prev) => ({ ...prev, isOpen: false }))}
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
