import { CreatorProfile, User } from '@/types';
import { StorageAPI, NotificationPreferences } from '@/lib/storage/storage';

export interface IUserRepository {
  getCurrentUser(): Promise<User | null>;
  getCurrentProfile(): Promise<CreatorProfile | null>;
  updateUser(updates: Partial<User>): Promise<User | null>;
  updateProfile(updates: Partial<CreatorProfile>): Promise<CreatorProfile | null>;
  getNotificationPreferences(): Promise<NotificationPreferences>;
  saveNotificationPreferences(prefs: NotificationPreferences): Promise<void>;
  resetAllData(): Promise<void>;
}

export class LocalUserRepository implements IUserRepository {
  async getCurrentUser(): Promise<User | null> {
    return StorageAPI.getUser();
  }

  async getCurrentProfile(): Promise<CreatorProfile | null> {
    return StorageAPI.getProfile();
  }

  async updateUser(updates: Partial<User>): Promise<User | null> {
    const current = StorageAPI.getUser();
    if (!current) return null;
    const updated = { ...current, ...updates };
    StorageAPI.setUser(updated);
    return updated;
  }

  async updateProfile(updates: Partial<CreatorProfile>): Promise<CreatorProfile | null> {
    const current = StorageAPI.getProfile();
    if (!current) return null;
    const updated = { ...current, ...updates };
    StorageAPI.setProfile(updated);
    return updated;
  }

  async getNotificationPreferences(): Promise<NotificationPreferences> {
    return StorageAPI.getNotificationPreferences();
  }

  async saveNotificationPreferences(prefs: NotificationPreferences): Promise<void> {
    StorageAPI.setNotificationPreferences(prefs);
  }

  async resetAllData(): Promise<void> {
    StorageAPI.resetAllData();
  }
}

export const userRepository: IUserRepository = new LocalUserRepository();
