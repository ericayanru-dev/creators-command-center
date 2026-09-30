import { StorageAPI } from '@/lib/storage/storage';

export interface ISystemRepository {
  resetAllData(): Promise<void>;
}

export class LocalSystemRepository implements ISystemRepository {
  async resetAllData(): Promise<void> {
    StorageAPI.resetAllData();
  }
}

export const systemRepository: ISystemRepository = new LocalSystemRepository();
