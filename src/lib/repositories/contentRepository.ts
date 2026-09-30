import { Content, ContentVersion, ProductionPlan, ShootingChecklistItem } from '@/types';
import { StorageAPI } from '@/lib/storage/storage';

export interface IContentRepository {
  getAll(): Promise<Content[]>;
  getById(id: string): Promise<Content | null>;
  saveAll(items: Content[]): Promise<void>;
  create(item: Content): Promise<Content>;
  update(id: string, updates: Partial<Content>): Promise<Content>;
  delete(id: string): Promise<boolean>;
  getProductionPlan(contentId: string): Promise<ProductionPlan>;
  saveProductionPlan(plan: ProductionPlan): Promise<ProductionPlan>;
  getChecklist(contentId: string): Promise<ShootingChecklistItem[]>;
  saveChecklist(contentId: string, items: ShootingChecklistItem[]): Promise<ShootingChecklistItem[]>;
}

export class LocalContentRepository implements IContentRepository {
  async getAll(): Promise<Content[]> {
    return StorageAPI.getContentList();
  }

  async getById(id: string): Promise<Content | null> {
    const list = StorageAPI.getContentList();
    return list.find((c) => c.id === id) || null;
  }

  async saveAll(items: Content[]): Promise<void> {
    StorageAPI.setContentList(items);
  }

  async create(item: Content): Promise<Content> {
    const list = StorageAPI.getContentList();
    list.unshift(item);
    StorageAPI.setContentList(list);
    return item;
  }

  async update(id: string, updates: Partial<Content>): Promise<Content> {
    const list = StorageAPI.getContentList();
    const index = list.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Content not found in repository');
    const updated: Content = {
      ...list[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    list[index] = updated;
    StorageAPI.setContentList(list);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const list = StorageAPI.getContentList();
    const filtered = list.filter((c) => c.id !== id);
    StorageAPI.setContentList(filtered);
    return true;
  }

  async getProductionPlan(contentId: string): Promise<ProductionPlan> {
    return StorageAPI.getProductionPlan(contentId);
  }

  async saveProductionPlan(plan: ProductionPlan): Promise<ProductionPlan> {
    StorageAPI.saveProductionPlan(plan);
    return plan;
  }

  async getChecklist(contentId: string): Promise<ShootingChecklistItem[]> {
    return StorageAPI.getChecklist(contentId);
  }

  async saveChecklist(contentId: string, items: ShootingChecklistItem[]): Promise<ShootingChecklistItem[]> {
    StorageAPI.saveChecklist(contentId, items);
    return items;
  }
}

export const contentRepository: IContentRepository = new LocalContentRepository();
