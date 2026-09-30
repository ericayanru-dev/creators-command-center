import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { ContentService } from "@/lib/services/content/contentService";
import { ContentStatus } from '@/types';

describe('ContentService Lifecycle and Creation', () => {
  test('createContent preserves IDEA status when specified', async () => {
    const item = await ContentService.createContent({
      title: 'Idea Test Item',
      status: 'IDEA',
    });
    assert.equal(item.status, 'IDEA');
    assert.equal(item.title, 'Idea Test Item');
    assert.ok(item.id.startsWith('cnt_'));
  });

  test('createContent preserves DRAFT status when specified', async () => {
    const item = await ContentService.createContent({
      title: 'Draft Test Item',
      status: 'DRAFT',
    });
    assert.equal(item.status, 'DRAFT');
  });

  test('createContent defaults to DRAFT if an invalid initial status like PUBLISHED is provided', async () => {
    const item = await ContentService.createContent({
      title: 'Invalid Status Test',
      status: 'PUBLISHED' as ContentStatus,
    });
    assert.equal(item.status, 'DRAFT');
  });

  test('updateStatus allows valid transition from DRAFT to READY', async () => {
    const created = await ContentService.createContent({
      title: 'Transition Test',
      status: 'DRAFT',
    });
    const updated = await ContentService.updateStatus(created.id, 'READY');
    assert.ok(updated);
    assert.equal(updated.status, 'READY');
  });

  test('updateStatus rejects invalid transition from IDEA directly to PUBLISHED', async () => {
    const created = await ContentService.createContent({
      title: 'Invalid Jump Test',
      status: 'IDEA',
    });
    await assert.rejects(
      async () => {
        await ContentService.updateStatus(created.id, 'PUBLISHED');
      },
      /Invalid status transition from IDEA to PUBLISHED/
    );
  });

  test('savePlatformVersion creates and links derivative platform version and updates targetPlatforms', async () => {
    const content = await ContentService.createContent({
      title: 'Master Creative Asset',
      status: 'DRAFT',
      targetPlatforms: ['youtube'],
    });

    const version = await ContentService.savePlatformVersion(content.id, {
      platform: 'instagram',
      title: 'Instagram Adaptation',
      caption: 'Visual hook tailored for IG reels #creator #build',
      postType: 'Reel',
    });

    assert.ok(version);
    assert.equal(version.platform, 'instagram');
    assert.equal(version.title, 'Instagram Adaptation');
    assert.equal(version.postType, 'Reel');

    const updatedContent = await ContentService.getContentById(content.id);
    assert.ok(updatedContent?.targetPlatforms.includes('instagram'));
    assert.ok(updatedContent?.versions?.some((v) => v.platform === 'instagram'));
  });
});
