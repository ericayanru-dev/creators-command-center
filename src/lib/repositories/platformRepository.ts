import { SocialAccount } from '@/types';
import { StorageAPI } from '@/lib/storage/storage';

export interface IPlatformRepository {
  getAll(): Promise<SocialAccount[]>;
  saveAll(accounts: SocialAccount[]): Promise<void>;
  update(id: string, updates: Partial<SocialAccount>): Promise<SocialAccount>;
}

export class LocalPlatformRepository implements IPlatformRepository {
  async getAll(): Promise<SocialAccount[]> {
    return StorageAPI.getAccounts();
  }

  async saveAll(accounts: SocialAccount[]): Promise<void> {
    StorageAPI.setAccounts(accounts);
  }

  async update(id: string, updates: Partial<SocialAccount>): Promise<SocialAccount> {
    const list = StorageAPI.getAccounts();
    const index = list.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Social account not found');
    const updated: SocialAccount = {
      ...list[index],
      ...updates,
      lastSyncedAt: new Date().toISOString(),
    };
    list[index] = updated;
    StorageAPI.setAccounts(list);
    return updated;
  }
}

export const platformRepository: IPlatformRepository = new LocalPlatformRepository();
