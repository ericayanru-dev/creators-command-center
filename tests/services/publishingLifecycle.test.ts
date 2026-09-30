import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { PublishingService } from "@/lib/services/publishing/publishingService";
import { ContentService } from '@/lib/services/content/contentService';
import { publishingRepository } from '@/lib/repositories/publishingRepository';

describe('Publishing and Scheduling Service Lifecycle Enforcement', () => {
  test('schedulePublication succeeds when content is in READY status and updates content to SCHEDULED', async () => {
    // 1. Create content in DRAFT, transition to READY
    const draft = await ContentService.createContent({
      title: 'Ready for Scheduling Item',
      status: 'DRAFT',
    });
    // Create genuine platform version and attach valid video media for YouTube
    const ytVersion = await ContentService.savePlatformVersion(draft.id, {
      platform: 'youtube',
      title: 'YouTube Master Cut',
    });
    await ContentService.updateMediaAsset(draft.id, {
      id: 'med_yt_valid',
      userId: 'usr_01jd72948',
      contentId: draft.id,
      fileName: 'main_video.mp4',
      fileSize: 10485760,
      mimeType: 'video/mp4',
      status: 'READY',
      previewUrl: 'https://example.com/video.mp4',
      createdAt: new Date().toISOString(),
    });

    const readyContent = await ContentService.updateStatus(draft.id, 'READY');
    assert.equal(readyContent.status, 'READY');

    const futureDate = new Date(Date.now() + 86400000).toISOString();

    // 2. Schedule via PublishingService
    const pub = await PublishingService.schedulePublication({
      contentId: readyContent.id,
      contentTitle: readyContent.title,
      platform: 'youtube',
      contentVersionId: ytVersion.id,
      scheduledAt: futureDate,
      displayTimezone: 'America/New_York',
    });

    assert.ok(pub);
    assert.equal(pub.status, 'SCHEDULED');
    assert.equal(pub.displayTimezone, 'America/New_York');

    // 3. Verify content was transitioned to SCHEDULED
    const updatedContent = await ContentService.getContentById(readyContent.id);
    assert.equal(updatedContent?.status, 'SCHEDULED');

    // 4. Verify publication exists in repository
    const allPubs = await publishingRepository.getPublications();
    const found = allPubs.find((p) => p.id === pub.id);
    assert.ok(found);
  });

  test('schedulePublication fails when content is in IDEA status and creates NO publication', async () => {
    const initialPubsCount = (await publishingRepository.getPublications()).length;

    const idea = await ContentService.createContent({
      title: 'Raw Idea Content',
      status: 'IDEA',
    });
    assert.equal(idea.status, 'IDEA');

    const futureDate = new Date(Date.now() + 86400000).toISOString();

    // Scheduling an IDEA directly must be rejected by lifecycle state machine
    await assert.rejects(
      async () => {
        await PublishingService.schedulePublication({
          contentId: idea.id,
          contentTitle: idea.title,
          platform: 'instagram',
          contentVersionId: `ver_instagram_${idea.id}`,
          scheduledAt: futureDate,
        });
      },
      /Invalid status transition from IDEA to SCHEDULED/
    );

    // Verify content status was NOT changed
    const unchangedContent = await ContentService.getContentById(idea.id);
    assert.equal(unchangedContent?.status, 'IDEA');

    // Verify NO new publication was persisted in the repository
    const afterPubsCount = (await publishingRepository.getPublications()).length;
    assert.equal(afterPubsCount, initialPubsCount);
  });

  test('schedulePublication fails when content is in DRAFT status and creates NO publication', async () => {
    const initialPubsCount = (await publishingRepository.getPublications()).length;

    const draft = await ContentService.createContent({
      title: 'Unfinished Draft Content',
      status: 'DRAFT',
    });
    assert.equal(draft.status, 'DRAFT');

    const futureDate = new Date(Date.now() + 86400000).toISOString();

    // Scheduling a DRAFT directly must be rejected by lifecycle rules (must be READY first)
    await assert.rejects(
      async () => {
        await PublishingService.schedulePublication({
          contentId: draft.id,
          contentTitle: draft.title,
          platform: 'tiktok',
          contentVersionId: `ver_tiktok_${draft.id}`,
          scheduledAt: futureDate,
        });
      },
      /Invalid status transition from DRAFT to SCHEDULED/
    );

    // Verify content status was NOT changed
    const unchangedContent = await ContentService.getContentById(draft.id);
    assert.equal(unchangedContent?.status, 'DRAFT');

    // Verify NO publication created
    const afterPubsCount = (await publishingRepository.getPublications()).length;
    assert.equal(afterPubsCount, initialPubsCount);
  });

  test('publishNow rejects publishing when content is in IDEA or DRAFT status', async () => {
    const draft = await ContentService.createContent({
      title: 'Draft Content Not Ready for Immediate Publish',
      status: 'DRAFT',
    });

    await assert.rejects(
      async () => {
        await PublishingService.publishNow({
          contentId: draft.id,
          contentTitle: draft.title,
          targetPlatforms: ['youtube'],
          versionIds: {},
        });
      },
      /Cannot publish content .* in "DRAFT" status/
    );

    // Content status remains DRAFT
    const unchanged = await ContentService.getContentById(draft.id);
    assert.equal(unchanged?.status, 'DRAFT');
  });

  test('publishNow succeeds when content is in READY status and updates content to PUBLISHED', async () => {
    const draft = await ContentService.createContent({
      title: 'Ready for Immediate Broadcast',
      status: 'DRAFT',
    });
    const ytVer = await ContentService.savePlatformVersion(draft.id, {
      platform: 'youtube',
      title: 'YouTube Broadcast Version',
    });
    await ContentService.updateMediaAsset(draft.id, {
      id: 'med_yt_broadcast',
      userId: 'usr_01jd72948',
      contentId: draft.id,
      fileName: 'broadcast.mp4',
      fileSize: 8400000,
      mimeType: 'video/mp4',
      status: 'READY',
      previewUrl: 'https://example.com/broadcast.mp4',
      createdAt: new Date().toISOString(),
    });
    await ContentService.updateStatus(draft.id, 'READY');

    const result = await PublishingService.publishNow({
      contentId: draft.id,
      contentTitle: draft.title,
      targetPlatforms: ['youtube'],
      versionIds: { youtube: ytVer.id },
      displayTimezone: 'Europe/London',
    });

    assert.ok(result);
    // When successful, content is transitioned to PUBLISHED
    const publishedContent = await ContentService.getContentById(draft.id);
    assert.equal(publishedContent?.status, 'PUBLISHED');
  });

  test('publishNow rejects publishing when content is already in PUBLISHED status', async () => {
    const draft = await ContentService.createContent({
      title: 'Published Item Terminal Guard Test',
      status: 'DRAFT',
    });
    const ytVer = await ContentService.savePlatformVersion(draft.id, {
      platform: 'youtube',
    });
    await ContentService.updateMediaAsset(draft.id, {
      id: 'med_yt_terminal',
      userId: 'usr_01jd72948',
      contentId: draft.id,
      fileName: 'terminal.mp4',
      fileSize: 8400000,
      mimeType: 'video/mp4',
      status: 'READY',
      previewUrl: 'https://example.com/terminal.mp4',
      createdAt: new Date().toISOString(),
    });
    await ContentService.updateStatus(draft.id, 'READY');
    await PublishingService.publishNow({
      contentId: draft.id,
      contentTitle: draft.title,
      targetPlatforms: ['youtube'],
      versionIds: { youtube: ytVer.id },
    });

    // Content is now PUBLISHED. Re-publishing must be rejected.
    await assert.rejects(
      async () => {
        await PublishingService.publishNow({
          contentId: draft.id,
          contentTitle: draft.title,
          targetPlatforms: ['youtube'],
          versionIds: { youtube: ytVer.id },
        });
      },
      /Cannot publish content .* that is already PUBLISHED/
    );
  });

  test('schedulePublication rejects when content is already in PUBLISHED status', async () => {
    const draft = await ContentService.createContent({
      title: 'Published Item Cannot Be Scheduled',
      status: 'DRAFT',
    });
    const ytVer = await ContentService.savePlatformVersion(draft.id, {
      platform: 'youtube',
    });
    await ContentService.updateMediaAsset(draft.id, {
      id: 'med_yt_already_pub',
      userId: 'usr_01jd72948',
      contentId: draft.id,
      fileName: 'already.mp4',
      fileSize: 8400000,
      mimeType: 'video/mp4',
      status: 'READY',
      previewUrl: 'https://example.com/already.mp4',
      createdAt: new Date().toISOString(),
    });
    await ContentService.updateStatus(draft.id, 'READY');
    await PublishingService.publishNow({
      contentId: draft.id,
      contentTitle: draft.title,
      targetPlatforms: ['youtube'],
      versionIds: { youtube: ytVer.id },
    });

    const futureDate = new Date(Date.now() + 86400000).toISOString();

    await assert.rejects(
      async () => {
        await PublishingService.schedulePublication({
          contentId: draft.id,
          contentTitle: draft.title,
          platform: 'youtube',
          contentVersionId: ytVer.id,
          scheduledAt: futureDate,
        });
      },
      /Cannot schedule content .* that is already PUBLISHED/
    );
  });

  test('schedulePublication fails on disconnected account and does NOT mutate content status', async () => {
    const draft = await ContentService.createContent({
      title: 'Item For Disconnected Platform',
      status: 'DRAFT',
    });
    const readyContent = await ContentService.updateStatus(draft.id, 'READY');
    assert.equal(readyContent.status, 'READY');

    const futureDate = new Date(Date.now() + 86400000).toISOString();

    // Instagram account is NEEDS_REAUTHORIZATION in seed data
    await assert.rejects(
      async () => {
        await PublishingService.schedulePublication({
          contentId: readyContent.id,
          contentTitle: readyContent.title,
          platform: 'instagram',
          contentVersionId: `ver_instagram_${readyContent.id}`,
          scheduledAt: futureDate,
        });
      },
      /Cannot schedule to instagram: account token expired or revoked/
    );

    // CRITICAL: Content MUST remain in READY status (no mutation toward SCHEDULED occurred)
    const contentAfterFailure = await ContentService.getContentById(readyContent.id);
    assert.equal(contentAfterFailure?.status, 'READY');
  });

  test('schedulePublication fails when attached media is FAILED and preserves READY status', async () => {
    const draft = await ContentService.createContent({
      title: 'Item with Broken Media',
      status: 'DRAFT',
    });
    const ytVer = await ContentService.savePlatformVersion(draft.id, {
      platform: 'youtube',
    });
    const readyContent = await ContentService.updateStatus(draft.id, 'READY');
    assert.equal(readyContent.status, 'READY');

    // Attach failed media
    await ContentService.updateMediaAsset(readyContent.id, {
      id: 'med_corrupted',
      userId: 'usr_01jd72948',
      contentId: readyContent.id,
      fileName: 'corrupted_render.mov',
      fileSize: 1000000,
      mimeType: 'video/quicktime',
      status: 'FAILED',
      previewUrl: 'https://example.com/corrupted.mov',
      createdAt: new Date().toISOString(),
    });

    const futureDate = new Date(Date.now() + 86400000).toISOString();

    await assert.rejects(
      async () => {
        await PublishingService.schedulePublication({
          contentId: readyContent.id,
          contentTitle: readyContent.title,
          platform: 'youtube',
          contentVersionId: ytVer.id,
          scheduledAt: futureDate,
        });
      },
      /failed processing/
    );

    // CRITICAL: Content status remains in READY, not SCHEDULED
    const contentAfterFailure = await ContentService.getContentById(readyContent.id);
    assert.equal(contentAfterFailure?.status, 'READY');
  });

  test('schedulePublication rejects when platform version does not exist', async () => {
    const draft = await ContentService.createContent({
      title: 'Item Without Version',
      status: 'DRAFT',
    });
    const readyContent = await ContentService.updateStatus(draft.id, 'READY');
    const futureDate = new Date(Date.now() + 86400000).toISOString();

    await assert.rejects(
      async () => {
        await PublishingService.schedulePublication({
          contentId: readyContent.id,
          contentTitle: readyContent.title,
          platform: 'youtube',
          contentVersionId: 'ver_fake_nonexistent',
          scheduledAt: futureDate,
        });
      },
      /Create the Youtube version before scheduling/
    );

    // Content status must not be modified
    const unchanged = await ContentService.getContentById(readyContent.id);
    assert.equal(unchanged?.status, 'READY');
  });

  test('schedulePublication rejects when required platform media is missing', async () => {
    const draft = await ContentService.createContent({
      title: 'Item Without Media',
      status: 'DRAFT',
    });
    const ytVer = await ContentService.savePlatformVersion(draft.id, {
      platform: 'youtube',
    });
    const readyContent = await ContentService.updateStatus(draft.id, 'READY');
    const futureDate = new Date(Date.now() + 86400000).toISOString();

    await assert.rejects(
      async () => {
        await PublishingService.schedulePublication({
          contentId: readyContent.id,
          contentTitle: readyContent.title,
          platform: 'youtube',
          contentVersionId: ytVer.id,
          scheduledAt: futureDate,
        });
      },
      /requires media before scheduling/
    );

    const unchanged = await ContentService.getContentById(readyContent.id);
    assert.equal(unchanged?.status, 'READY');
  });

  test('publishNow rejects when platform version is missing', async () => {
    const draft = await ContentService.createContent({
      title: 'Item Without Version for Publish Now',
      status: 'DRAFT',
    });
    await ContentService.updateStatus(draft.id, 'READY');

    await assert.rejects(
      async () => {
        await PublishingService.publishNow({
          contentId: draft.id,
          contentTitle: draft.title,
          targetPlatforms: ['youtube'],
          versionIds: {},
        });
      },
      /Create the Youtube version before publishing/
    );
  });

  test('publishNow rejects when required media is missing', async () => {
    const draft = await ContentService.createContent({
      title: 'Item Without Media for Publish Now',
      status: 'DRAFT',
    });
    const ytVer = await ContentService.savePlatformVersion(draft.id, {
      platform: 'youtube',
    });
    await ContentService.updateStatus(draft.id, 'READY');

    await assert.rejects(
      async () => {
        await PublishingService.publishNow({
          contentId: draft.id,
          contentTitle: draft.title,
          targetPlatforms: ['youtube'],
          versionIds: { youtube: ytVer.id },
        });
      },
      /requires media before publishing/
    );
  });
});
