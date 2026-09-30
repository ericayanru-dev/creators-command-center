import { Platform, Publication, PublishingAttempt, PublishingOperationResult } from '@/types';
import { publishingRepository } from '@/lib/repositories/publishingRepository';
import { ContentService } from '@/lib/services/content/contentService';
import { simulateNetworkLatency } from '@/lib/api/client';
import { PlatformService } from '@/lib/services/platforms/platformService';
import { getUserTimezone } from '@/lib/utils/timezone';
import { PLATFORM_DOMAIN_RULES } from '@/lib/constants/platforms';

export interface PublishRequest {
  contentId: string;
  contentTitle: string;
  targetPlatforms: Platform[];
  versionIds: Partial<Record<Platform, string>>;
  displayTimezone?: string;
}

export interface ScheduleRequest {
  contentId: string;
  contentTitle: string;
  platform: Platform;
  contentVersionId: string;
  scheduledAt: string; // ISO 8601 UTC
  displayTimezone?: string;
}

export const PublishingService = {
  async getPublications(): Promise<Publication[]> {
    await simulateNetworkLatency(100);
    return publishingRepository.getPublications();
  },

  async getPublicationById(id: string): Promise<Publication | null> {
    await simulateNetworkLatency(60);
    const pubs = await publishingRepository.getPublications();
    return pubs.find((p) => p.id === id) || null;
  },

  async getAttempts(publicationId?: string): Promise<PublishingAttempt[]> {
    await simulateNetworkLatency(100);
    const attempts = await publishingRepository.getAttempts();
    if (publicationId) {
      return attempts.filter((a) => a.publicationId === publicationId);
    }
    return attempts;
  },

  /**
   * Execute immediate multi-platform publishing.
   * Treats each target platform as an independent publishing target.
   * Can result in All Success, Partial Success, or Failed.
   */
  async publishNow(req: PublishRequest): Promise<PublishingOperationResult> {
    await simulateNetworkLatency(300);

    // Lifecycle check: Content must be in READY or SCHEDULED status before publishing.
    const content = await ContentService.getContentById(req.contentId);
    if (!content) {
      throw new Error(`Content not found: ${req.contentId}`);
    }
    if (content.status === 'PUBLISHED') {
      throw new Error(`Cannot publish content "${content.title}" that is already PUBLISHED. Published status is terminal.`);
    }
    if (content.status !== 'READY' && content.status !== 'SCHEDULED') {
      throw new Error(
        `Cannot publish content "${content.title}" in "${content.status}" status. Content must be marked as READY before publishing.`
      );
    }

    const effectiveTz = req.displayTimezone || getUserTimezone();
    const operationId = `pub_op_${Date.now()}`;
    const accounts = await PlatformService.getAccounts();
    const publications = await publishingRepository.getPublications();
    const attempts = await publishingRepository.getAttempts();

    const results: PublishingOperationResult['results'] = [];
    let successfulCount = 0;
    let failedCount = 0;

    for (const platform of req.targetPlatforms) {
      const platName = platform.charAt(0).toUpperCase() + platform.slice(1);
      const providedVersionId = req.versionIds?.[platform];
      const version = content.versions?.find(
        (v) => v.platform === platform && v.contentId === req.contentId && (!providedVersionId || v.id === providedVersionId)
      );

      if (!version) {
        throw new Error(`Create the ${platName} version before publishing.`);
      }
      const versionId = version.id;

      // Validate required media
      const domainRule = PLATFORM_DOMAIN_RULES[platform];
      const attachedMedia = version.mediaAsset || content.mediaAsset;
      const requiresMedia = domainRule && !domainRule.supportedMediaTypes.includes('text');

      if (requiresMedia && !attachedMedia) {
        throw new Error(`Platform ${platName} requires media before publishing. Please upload a media asset.`);
      }

      if (attachedMedia && attachedMedia.status === 'FAILED') {
        throw new Error(`Cannot publish to ${platName}: Attached media asset "${attachedMedia.fileName}" failed processing.`);
      }

      if (attachedMedia && (platform === 'youtube' || platform === 'tiktok')) {
        if (attachedMedia.mimeType && !attachedMedia.mimeType.startsWith('video')) {
          throw new Error(`Platform ${platName} requires a video file, but found ${attachedMedia.mimeType}.`);
        }
      }

      const account = accounts.find((a) => a.platform === platform);
      const isConnected = account && account.status === 'CONNECTED';

      const pubId = `pub_${platform}_${req.contentId}_${Date.now()}`;
      const attemptId = `att_${platform}_${Date.now()}`;

      if (isConnected) {
        successfulCount++;
        const pub: Publication = {
          id: pubId,
          userId: 'usr_01jd72948',
          contentId: req.contentId,
          contentTitle: req.contentTitle,
          contentVersionId: versionId,
          platform,
          platformAccountId: account.id,
          accountName: account.accountName,
          accountHandle: account.accountHandle,
          status: 'PUBLISHED',
          scheduledAt: new Date().toISOString(),
          displayTimezone: effectiveTz,
          publishedAt: new Date().toISOString(),
          attemptsCount: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        publications.unshift(pub);

        const attempt: PublishingAttempt = {
          id: attemptId,
          publicationId: pubId,
          contentVersionId: versionId,
          platform,
          platformAccountId: account.id,
          status: 'SUCCESS',
          attemptNumber: 1,
          startedAt: new Date().toISOString(),
          finishedAt: new Date().toISOString(),
          externalUrl: `https://${platform}.com/watch?v=mock_${req.contentId}`,
          externalId: `mock_${req.contentId}_${Date.now()}`,
          isRetry: false,
        };
        attempts.unshift(attempt);

        results.push({
          platform,
          status: 'PUBLISHED',
          url: attempt.externalUrl,
          publicationId: pubId,
          attemptId,
        });
      } else {
        // Failed due to authorization or disconnection
        failedCount++;
        const errorReason = account?.status === 'NEEDS_REAUTHORIZATION'
          ? 'Reauthorization required: OAuth token revoked by platform.'
          : account?.status === 'CONNECTION_ERROR'
          ? 'Connection error: failed to communicate with platform API.'
          : 'Platform is not connected. Reconnection required before publishing.';

        const pub: Publication = {
          id: pubId,
          userId: 'usr_01jd72948',
          contentId: req.contentId,
          contentTitle: req.contentTitle,
          contentVersionId: versionId,
          platform,
          platformAccountId: account?.id || 'unconnected',
          accountName: account?.accountName || platform,
          accountHandle: account?.accountHandle || '@unknown',
          status: 'FAILED',
          scheduledAt: new Date().toISOString(),
          displayTimezone: effectiveTz,
          lastErrorReason: errorReason,
          attemptsCount: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        publications.unshift(pub);

        const attempt: PublishingAttempt = {
          id: attemptId,
          publicationId: pubId,
          contentVersionId: versionId,
          platform,
          platformAccountId: account?.id || 'unconnected',
          status: 'FAILED',
          attemptNumber: 1,
          startedAt: new Date().toISOString(),
          finishedAt: new Date().toISOString(),
          errorReason,
          errorCode: account?.status === 'NEEDS_REAUTHORIZATION' ? 'AUTH_REVOKED' : 'NOT_CONNECTED',
          isRetry: false,
        };
        attempts.unshift(attempt);

        results.push({
          platform,
          status: 'FAILED',
          errorReason,
          publicationId: pubId,
          attemptId,
        });
      }
    }

    await publishingRepository.savePublications(publications);

    // Update parent content status through validated ContentService lifecycle
    if (failedCount === 0) {
      await ContentService.updateStatus(req.contentId, 'PUBLISHED');
    }

    const overallStatus =
      failedCount === 0
        ? 'SUCCESS'
        : successfulCount > 0
        ? 'PARTIAL_SUCCESS'
        : 'FAILED';

    return {
      publishingOperationId: operationId,
      contentId: req.contentId,
      contentTitle: req.contentTitle,
      overallStatus,
      totalPlatforms: req.targetPlatforms.length,
      successfulPlatforms: successfulCount,
      failedPlatforms: failedCount,
      results,
    };
  },

  /**
   * Selective retry for failed platforms only.
   * Leaves successful platforms unchanged!
   */
  async retryFailedPlatforms(
    contentId: string,
    failedPlatforms: Platform[],
    timezone?: string
  ): Promise<PublishingOperationResult> {
    await simulateNetworkLatency(350);

    const operationId = `retry_op_${Date.now()}`;
    const effectiveTz = timezone || getUserTimezone();
    const accounts = await PlatformService.getAccounts();
    const publications = await publishingRepository.getPublications();
    const attempts = await publishingRepository.getAttempts();
    const content = await ContentService.getContentById(contentId);

    const results: PublishingOperationResult['results'] = [];
    let successfulCount = 0;
    let failedCount = 0;

    for (const platform of failedPlatforms) {
      let pub = publications.find((p) => p.contentId === contentId && p.platform === platform);
      const account = accounts.find((a) => a.platform === platform);
      const isConnected = account && account.status === 'CONNECTED';
      const attemptNumber = (pub?.attemptsCount || 1) + 1;
      const attemptId = `att_${platform}_retry_${Date.now()}`;

      if (!pub) {
        const platName = platform.charAt(0).toUpperCase() + platform.slice(1);
        const ver = content?.versions?.find((v) => v.platform === platform && v.contentId === contentId);
        if (!ver) {
          throw new Error(`Create the ${platName} version before retrying.`);
        }
        pub = {
          id: `pub_${platform}_${contentId}`,
          userId: 'usr_01jd72948',
          contentId,
          contentTitle: content?.title || 'Content',
          contentVersionId: ver.id,
          platform,
          platformAccountId: account?.id || 'acc_default',
          accountName: account?.accountName || platform,
          accountHandle: account?.accountHandle || '@creator',
          status: 'PUBLISHING',
          scheduledAt: new Date().toISOString(),
          displayTimezone: effectiveTz,
          attemptsCount: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        publications.unshift(pub);
      }

      if (isConnected) {
        successfulCount++;
        pub.status = 'PUBLISHED';
        pub.publishedAt = new Date().toISOString();
        pub.lastErrorReason = undefined;
        pub.attemptsCount = attemptNumber;
        pub.updatedAt = new Date().toISOString();

        const attempt: PublishingAttempt = {
          id: attemptId,
          publicationId: pub.id,
          contentVersionId: pub.contentVersionId,
          platform,
          platformAccountId: account.id,
          status: 'SUCCESS',
          attemptNumber,
          startedAt: new Date().toISOString(),
          finishedAt: new Date().toISOString(),
          externalUrl: `https://${platform}.com/watch?v=mock_retry_${contentId}`,
          externalId: `retry_${Date.now()}`,
          isRetry: true,
        };
        attempts.unshift(attempt);

        results.push({
          platform,
          status: 'PUBLISHED',
          url: attempt.externalUrl,
          publicationId: pub.id,
          attemptId,
        });
      } else {
        failedCount++;
        const errorReason = account?.status === 'NEEDS_REAUTHORIZATION'
          ? 'Reauthorization still required. Please reconnect account in Platforms settings.'
          : 'Platform connection error. Retrying failed.';

        pub.status = 'FAILED';
        pub.lastErrorReason = errorReason;
        pub.attemptsCount = attemptNumber;
        pub.updatedAt = new Date().toISOString();

        const attempt: PublishingAttempt = {
          id: attemptId,
          publicationId: pub.id,
          contentVersionId: pub.contentVersionId,
          platform,
          platformAccountId: account?.id || 'unconnected',
          status: 'FAILED',
          attemptNumber,
          startedAt: new Date().toISOString(),
          finishedAt: new Date().toISOString(),
          errorReason,
          errorCode: 'RETRY_FAILED',
          isRetry: true,
        };
        attempts.unshift(attempt);

        results.push({
          platform,
          status: 'FAILED',
          errorReason,
          publicationId: pub.id,
          attemptId,
        });
      }
    }

    await publishingRepository.savePublications(publications);

    // If all publications for this content are now PUBLISHED, update content status via ContentService
    const contentPubs = publications.filter((p) => p.contentId === contentId);
    const allPublished = contentPubs.length > 0 && contentPubs.every((p) => p.status === 'PUBLISHED');
    if (allPublished && content && content.status !== 'PUBLISHED') {
      await ContentService.updateStatus(contentId, 'PUBLISHED');
    }

    return {
      publishingOperationId: operationId,
      contentId,
      contentTitle: content?.title || 'Content',
      overallStatus: failedCount === 0 ? 'SUCCESS' : successfulCount > 0 ? 'PARTIAL_SUCCESS' : 'FAILED',
      totalPlatforms: failedPlatforms.length,
      successfulPlatforms: successfulCount,
      failedPlatforms: failedCount,
      results,
    };
  },

  /**
   * Schedule a publication for future execution.
   * Validates scheduling prerequisites in strict order BEFORE mutating content status:
   * 1. Validate content exists
   * 2. Validate lifecycle state
   * 3. Validate platform
   * 4. Validate connected account
   * 5. Validate platform version
   * 6. Validate required media
   * 7. Validate media/platform compatibility
   * 8. Validate date/time
   * 9. Convert timezone
   * 10. READY -> SCHEDULED (via ContentService.updateStatus)
   * 11. Create publication record
   */
  async schedulePublication(req: ScheduleRequest): Promise<Publication> {
    await simulateNetworkLatency(200);

    // 1. Validate content exists
    if (!req.contentId) {
      throw new Error('Content ID is required for scheduling.');
    }
    const content = await ContentService.getContentById(req.contentId);
    if (!content) {
      throw new Error(`Content not found: ${req.contentId}`);
    }

    // 2. Validate content lifecycle state
    if (content.status === 'PUBLISHED') {
      throw new Error(`Cannot schedule content "${content.title}" that is already PUBLISHED. Published status is terminal.`);
    }
    if (content.archived) {
      throw new Error(`Cannot schedule content "${content.title}" because it is archived.`);
    }
    if (content.status !== 'READY' && content.status !== 'SCHEDULED') {
      throw new Error(
        `Invalid status transition from ${content.status} to SCHEDULED. Content must be in READY status before scheduling.`
      );
    }

    // 3. Validate platform
    const SUPPORTED_PLATFORMS: Platform[] = ['youtube', 'instagram', 'tiktok', 'linkedin', 'facebook'];
    if (!req.platform || !SUPPORTED_PLATFORMS.includes(req.platform)) {
      throw new Error(`Unsupported or invalid platform: ${req.platform || 'undefined'}`);
    }

    // 4. Validate connected account
    const accounts = await PlatformService.getAccounts();
    const account = accounts.find((a) => a.platform === req.platform);
    if (!account || account.status !== 'CONNECTED') {
      const reason = account
        ? account.status === 'NEEDS_REAUTHORIZATION'
          ? 'account token expired or revoked (reauthorization required)'
          : `account status is ${account.status}`
        : 'no connected account configured';
      throw new Error(`Cannot schedule to ${req.platform}: ${reason}. Connect a valid account in Platforms settings.`);
    }

    // 5. Validate platform version
    const platName = req.platform.charAt(0).toUpperCase() + req.platform.slice(1);
    if (!req.contentVersionId) {
      throw new Error(`Create the ${platName} version before scheduling.`);
    }

    const platformVersion = content.versions?.find(
      (v) => v.id === req.contentVersionId && v.contentId === req.contentId && v.platform === req.platform
    );

    if (!platformVersion) {
      throw new Error(`Create the ${platName} version before scheduling.`);
    }

    // 6. Validate required media
    const domainRule = PLATFORM_DOMAIN_RULES[req.platform];
    const attachedMedia = platformVersion.mediaAsset || content.mediaAsset;
    const requiresMedia = domainRule && !domainRule.supportedMediaTypes.includes('text');

    if (requiresMedia && !attachedMedia) {
      throw new Error(`Platform ${platName} requires media before scheduling. Please upload a media asset.`);
    }

    if (attachedMedia && attachedMedia.status === 'FAILED') {
      throw new Error(`Cannot schedule to ${platName}: Attached media asset "${attachedMedia.fileName}" failed processing.`);
    }

    // 7. Validate media/platform compatibility where supported
    if (attachedMedia) {
      const isVideoPlatform = req.platform === 'youtube' || req.platform === 'tiktok';
      if (isVideoPlatform && attachedMedia.mimeType && !attachedMedia.mimeType.startsWith('video')) {
        throw new Error(`Platform ${platName} requires a video file, but found ${attachedMedia.mimeType}.`);
      }

      if (domainRule && attachedMedia.mimeType) {
        const isVideo = attachedMedia.mimeType.startsWith('video');
        const isImage = attachedMedia.mimeType.startsWith('image');
        if (isVideo && !domainRule.supportedMediaTypes.includes('video')) {
          throw new Error(`Platform ${platName} does not support video media.`);
        }
        if (isImage && !domainRule.supportedMediaTypes.includes('image')) {
          throw new Error(`Platform ${platName} does not support image media.`);
        }
      }
    }

    // 8. Validate date/time
    if (!req.scheduledAt) {
      throw new Error('Scheduled date and time are required.');
    }
    const scheduledDate = new Date(req.scheduledAt);
    if (isNaN(scheduledDate.getTime())) {
      throw new Error('Invalid scheduled date/time format.');
    }
    if (scheduledDate.getTime() <= Date.now()) {
      throw new Error('Cannot schedule in the past. Scheduled time must be in the future.');
    }

    // 9. Convert timezone / calculate display time
    const effectiveTz = req.displayTimezone || getUserTimezone();
    const scheduledUtcIso = scheduledDate.toISOString();

    // 10. READY -> SCHEDULED (All validations passed! Now transition content status via ContentService)
    if (content.status !== 'SCHEDULED') {
      await ContentService.updateStatus(req.contentId, 'SCHEDULED');
    }

    // 11. Create and save scheduled publication record
    const publications = await publishingRepository.getPublications();
    const newPublication: Publication = {
      id: `pub_sched_${Date.now()}`,
      userId: 'usr_01jd72948',
      contentId: req.contentId,
      contentTitle: req.contentTitle,
      contentVersionId: req.contentVersionId,
      platform: req.platform,
      platformAccountId: account.id,
      accountName: account.accountName,
      accountHandle: account.accountHandle,
      status: 'SCHEDULED',
      scheduledAt: scheduledUtcIso,
      displayTimezone: effectiveTz,
      attemptsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    publications.unshift(newPublication);
    await publishingRepository.savePublications(publications);

    return newPublication;
  },

  async reschedulePublication(publicationId: string, newScheduledAt: string, timezone?: string): Promise<Publication> {
    await simulateNetworkLatency(150);

    const publications = await publishingRepository.getPublications();
    const pub = publications.find((p) => p.id === publicationId);
    if (!pub) throw new Error('Publication not found');

    if (pub.status === 'PUBLISHED') {
      throw new Error(`Cannot reschedule publication "${pub.contentTitle}" that is already PUBLISHED. Published status is terminal.`);
    }
    if (pub.status === 'CANCELLED') {
      throw new Error(`Cannot reschedule publication "${pub.contentTitle}" that has been CANCELLED.`);
    }
    if (pub.status !== 'SCHEDULED') {
      throw new Error(`Cannot reschedule publication in "${pub.status}" status. Only SCHEDULED publications can be rescheduled.`);
    }

    const scheduledDate = new Date(newScheduledAt);
    if (isNaN(scheduledDate.getTime())) {
      throw new Error('Invalid rescheduled date/time format.');
    }
    if (scheduledDate.getTime() <= Date.now()) {
      throw new Error('New schedule date must be in the future.');
    }

    // Verify parent content and version validity
    const content = await ContentService.getContentById(pub.contentId);
    if (!content) {
      throw new Error('Parent content not found for publication.');
    }
    if (content.status === 'PUBLISHED') {
      throw new Error(`Cannot reschedule content "${content.title}" that is already PUBLISHED.`);
    }

    const version = content.versions?.find((v) => v.id === pub.contentVersionId && v.platform === pub.platform);
    if (!version) {
      const platName = pub.platform.charAt(0).toUpperCase() + pub.platform.slice(1);
      throw new Error(`Associated ${platName} platform version is missing or invalid.`);
    }

    pub.scheduledAt = newScheduledAt;
    if (timezone) {
      pub.displayTimezone = timezone;
    } else if (!pub.displayTimezone) {
      pub.displayTimezone = getUserTimezone();
    }
    pub.updatedAt = new Date().toISOString();

    await publishingRepository.savePublications(publications);
    return pub;
  },

  async cancelScheduledPublication(publicationId: string): Promise<Publication> {
    await simulateNetworkLatency(150);

    const publications = await publishingRepository.getPublications();
    const pub = publications.find((p) => p.id === publicationId);
    if (!pub) throw new Error('Publication not found');

    if (pub.status === 'PUBLISHED') {
      throw new Error(`Cannot cancel publication "${pub.contentTitle}" that is already PUBLISHED.`);
    }
    if (pub.status === 'CANCELLED') {
      throw new Error(`Publication "${pub.contentTitle}" has already been cancelled.`);
    }
    if (pub.status !== 'SCHEDULED') {
      throw new Error(`Cannot cancel publication in "${pub.status}" status. Only SCHEDULED publications can be cancelled.`);
    }

    pub.status = 'CANCELLED';
    pub.cancelledAt = new Date().toISOString();
    pub.updatedAt = new Date().toISOString();

    await publishingRepository.savePublications(publications);

    // Check if parent content has other active schedules
    const otherScheduled = publications.some((p) => p.contentId === pub.contentId && p.status === 'SCHEDULED' && p.id !== publicationId);
    if (!otherScheduled) {
      const content = await ContentService.getContentById(pub.contentId);
      if (content && content.status === 'SCHEDULED') {
        await ContentService.updateStatus(pub.contentId, 'READY');
      }
    }

    return pub;
  },
};
