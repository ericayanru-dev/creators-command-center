import { Content, ContentStatus, ContentType, ContentVersion, Platform, ProductionPlan, ShootingChecklistItem } from '@/types';
import { contentRepository } from '@/lib/repositories/contentRepository';
import { simulateNetworkLatency } from '@/lib/api/client';

export interface ContentFilterParams {
  search?: string;
  status?: ContentStatus | 'ALL';
  platform?: Platform | 'ALL';
  contentType?: ContentType | 'ALL';
  archived?: boolean;
}

const VALID_TRANSITIONS: Record<ContentStatus, ContentStatus[]> = {
  IDEA: ['DRAFT'],
  DRAFT: ['IDEA', 'READY'],
  READY: ['DRAFT', 'SCHEDULED', 'PUBLISHED'],
  SCHEDULED: ['READY', 'PUBLISHED'],
  PUBLISHED: [], // Terminal in normal content flow
};

export const ContentService = {
  async listContent(params: ContentFilterParams = {}): Promise<Content[]> {
    await simulateNetworkLatency(100);
    let list = await contentRepository.getAll();

    // Archive filter
    if (params.archived) {
      list = list.filter((c) => c.archived === true);
    } else {
      list = list.filter((c) => !c.archived);
    }

    // Status filter
    if (params.status && params.status !== 'ALL') {
      list = list.filter((c) => c.status === params.status);
    }

    // Content Type filter
    if (params.contentType && params.contentType !== 'ALL') {
      list = list.filter((c) => c.contentType === params.contentType);
    }

    // Platform filter
    if (params.platform && params.platform !== 'ALL') {
      list = list.filter((c) =>
        c.targetPlatforms.includes(params.platform as Platform) ||
        (c.versions && c.versions.some((v) => v.platform === params.platform))
      );
    }

    // Search query (title, description, tags)
    if (params.search && params.search.trim()) {
      const q = params.search.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.caption.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list;
  },

  async getContentById(id: string): Promise<Content | null> {
    await simulateNetworkLatency(80);
    return contentRepository.getById(id);
  },

  async createContent(data: Partial<Content>): Promise<Content> {
    await simulateNetworkLatency(150);
    const newId = `cnt_${Date.now()}`;
    // Preserve valid initial statuses (IDEA or DRAFT). Reject invalid initial states like PUBLISHED.
    const initialStatus: ContentStatus =
      data.status === 'IDEA' || data.status === 'DRAFT' ? data.status : 'DRAFT';

    const newContent: Content = {
      id: newId,
      userId: 'usr_01jd72948',
      title: data.title || 'Untitled Draft',
      description: data.description || '',
      caption: data.caption || '',
      notes: data.notes || '',
      contentType: data.contentType || 'video',
      status: initialStatus,
      targetPlatforms: data.targetPlatforms || [],
      deadline: data.deadline,
      tags: data.tags || [],
      versions: [],
      mediaAsset: data.mediaAsset,
      mediaAssetId: data.mediaAssetId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      archived: false,
    };

    return contentRepository.create(newContent);
  },

  async updateContent(id: string, updates: Partial<Content>): Promise<Content> {
    await simulateNetworkLatency(150);
    const existing = await contentRepository.getById(id);
    if (!existing) throw new Error('Content not found');

    // If an update attempts to change status, enforce valid state machine transitions
    if (updates.status && updates.status !== existing.status) {
      if (!VALID_TRANSITIONS[existing.status]?.includes(updates.status)) {
        throw new Error(
          `Invalid status transition from ${existing.status} to ${updates.status}. Allowed transitions: ${
            VALID_TRANSITIONS[existing.status]?.join(', ') || 'None'
          }`
        );
      }
    }

    return contentRepository.update(id, updates);
  },

  async updateMediaAsset(id: string, mediaAsset: Content['mediaAsset']): Promise<Content> {
    await simulateNetworkLatency(100);
    return contentRepository.update(id, {
      mediaAsset: mediaAsset || undefined,
      mediaAssetId: mediaAsset?.id || undefined,
      updatedAt: new Date().toISOString(),
    });
  },

  async updateStatus(id: string, newStatus: ContentStatus): Promise<Content> {
    await simulateNetworkLatency(120);
    const item = await contentRepository.getById(id);
    if (!item) throw new Error('Content not found');

    // State machine check
    const current = item.status;
    if (current !== newStatus && !VALID_TRANSITIONS[current]?.includes(newStatus)) {
      throw new Error(`Invalid status transition from ${current} to ${newStatus}. Allowed transitions: ${VALID_TRANSITIONS[current]?.join(', ') || 'None'}`);
    }

    return contentRepository.update(id, {
      status: newStatus,
      updatedAt: new Date().toISOString(),
    });
  },

  async deleteContent(id: string): Promise<boolean> {
    await simulateNetworkLatency(150);
    return contentRepository.delete(id);
  },

  async archiveContent(id: string, archived = true): Promise<Content> {
    await simulateNetworkLatency(120);
    return contentRepository.update(id, {
      archived,
      updatedAt: new Date().toISOString(),
    });
  },

  // Platform Versions (Max 1 version per platform per content item)
  async savePlatformVersion(contentId: string, versionData: Partial<ContentVersion>): Promise<ContentVersion> {
    await simulateNetworkLatency(150);
    const content = await contentRepository.getById(contentId);
    if (!content) throw new Error('Parent content not found');

    const versions = content.versions ? [...content.versions] : [];
    const existingIndex = versions.findIndex((v) => v.platform === versionData.platform);
    if (existingIndex !== -1 && !versionData.id) {
      throw new Error(`A version for ${versionData.platform} already exists. You can only create one version per platform.`);
    }

    let updatedVersion: ContentVersion;
    if (existingIndex !== -1) {
      updatedVersion = {
        ...versions[existingIndex],
        ...versionData,
        updatedAt: new Date().toISOString(),
      };
      versions[existingIndex] = updatedVersion;
    } else {
      updatedVersion = {
        id: `ver_${Date.now()}_${versionData.platform}`,
        contentId,
        platform: versionData.platform!,
        title: versionData.title || content.title,
        caption: versionData.caption || content.caption,
        description: versionData.description || content.description,
        hashtags: versionData.hashtags || content.tags,
        callToAction: versionData.callToAction,
        status: versionData.status || 'Draft',
        visibility: versionData.visibility || 'Public',
        category: versionData.category,
        soundName: versionData.soundName,
        postType: versionData.postType || 'Feed Post',
        updatedAt: new Date().toISOString(),
      };
      versions.push(updatedVersion);
    }

    const targetPlatforms = [...content.targetPlatforms];
    if (versionData.platform && !targetPlatforms.includes(versionData.platform)) {
      targetPlatforms.push(versionData.platform);
    }

    await contentRepository.update(contentId, { versions, targetPlatforms });
    return updatedVersion;
  },

  async deletePlatformVersion(contentId: string, versionId: string): Promise<boolean> {
    await simulateNetworkLatency(120);
    const content = await contentRepository.getById(contentId);
    if (!content || !content.versions) return false;
    const versions = content.versions.filter((v) => v.id !== versionId);
    await contentRepository.update(contentId, { versions });
    return true;
  },

  // Production planning & shooting checklist
  async getProductionPlan(contentId: string): Promise<ProductionPlan> {
    await simulateNetworkLatency(80);
    return contentRepository.getProductionPlan(contentId);
  },

  async saveProductionPlan(plan: ProductionPlan): Promise<ProductionPlan> {
    await simulateNetworkLatency(120);
    return contentRepository.saveProductionPlan(plan);
  },

  async getChecklist(contentId: string): Promise<ShootingChecklistItem[]> {
    await simulateNetworkLatency(80);
    return contentRepository.getChecklist(contentId);
  },

  async saveChecklist(contentId: string, items: ShootingChecklistItem[]): Promise<ShootingChecklistItem[]> {
    await simulateNetworkLatency(100);
    return contentRepository.saveChecklist(contentId, items);
  },
};
