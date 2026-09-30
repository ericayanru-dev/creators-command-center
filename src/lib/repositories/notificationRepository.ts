import { NotificationItem } from '@/types';
import { StorageAPI } from '@/lib/storage/storage';

export interface INotificationRepository {
  getAll(): Promise<NotificationItem[]>;
  saveAll(notifications: NotificationItem[]): Promise<void>;
  markAsRead(id: string): Promise<void>;
  markAllAsRead(): Promise<void>;
}

export class LocalNotificationRepository implements INotificationRepository {
  async getAll(): Promise<NotificationItem[]> {
    return StorageAPI.getNotifications();
  }

  async saveAll(notifications: NotificationItem[]): Promise<void> {
    StorageAPI.setNotifications(notifications);
  }

  async markAsRead(id: string): Promise<void> {
    const list = StorageAPI.getNotifications();
    const updated = list.map((n) => (n.id === id ? { ...n, read: true } : n));
    StorageAPI.setNotifications(updated);
  }

  async markAllAsRead(): Promise<void> {
    const list = StorageAPI.getNotifications();
    const updated = list.map((n) => ({ ...n, read: true }));
    StorageAPI.setNotifications(updated);
  }
}

export const notificationRepository: INotificationRepository = new LocalNotificationRepository();
