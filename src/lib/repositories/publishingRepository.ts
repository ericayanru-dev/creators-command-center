import { Publication, PublishingAttempt } from '@/types';
import { StorageAPI } from '@/lib/storage/storage';

export interface IPublishingRepository {
  getPublications(): Promise<Publication[]>;
  savePublications(items: Publication[]): Promise<void>;
  createPublication(pub: Publication): Promise<Publication>;
  updatePublication(id: string, updates: Partial<Publication>): Promise<Publication>;
  deletePublication(id: string): Promise<boolean>;

  getAttempts(): Promise<PublishingAttempt[]>;
  createAttempt(attempt: PublishingAttempt): Promise<PublishingAttempt>;
}

export class LocalPublishingRepository implements IPublishingRepository {
  async getPublications(): Promise<Publication[]> {
    return StorageAPI.getPublications();
  }

  async savePublications(items: Publication[]): Promise<void> {
    StorageAPI.setPublications(items);
  }

  async createPublication(pub: Publication): Promise<Publication> {
    const list = StorageAPI.getPublications();
    list.unshift(pub);
    StorageAPI.setPublications(list);
    return pub;
  }

  async updatePublication(id: string, updates: Partial<Publication>): Promise<Publication> {
    const list = StorageAPI.getPublications();
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Publication not found');
    const updated: Publication = { ...list[index], ...updates };
    list[index] = updated;
    StorageAPI.setPublications(list);
    return updated;
  }

  async deletePublication(id: string): Promise<boolean> {
    const list = StorageAPI.getPublications();
    const filtered = list.filter((p) => p.id !== id);
    StorageAPI.setPublications(filtered);
    return true;
  }

  async getAttempts(): Promise<PublishingAttempt[]> {
    return StorageAPI.getAttempts();
  }

  async createAttempt(attempt: PublishingAttempt): Promise<PublishingAttempt> {
    const list = StorageAPI.getAttempts();
    list.unshift(attempt);
    StorageAPI.setAttempts(list);
    return attempt;
  }
}

export const publishingRepository: IPublishingRepository = new LocalPublishingRepository();
