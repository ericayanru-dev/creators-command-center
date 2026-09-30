import { NotificationItem } from '@/types';
import { notificationRepository } from '@/lib/repositories/notificationRepository';

export const NotificationService = {
  async getNotifications(): Promise<NotificationItem[]> {
    return notificationRepository.getAll();
  },

  async markAsRead(id: string): Promise<void> {
    await notificationRepository.markAsRead(id);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('creatorcc:notifications_updated'));
    }
  },

  async markAllAsRead(): Promise<void> {
    await notificationRepository.markAllAsRead();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('creatorcc:notifications_updated'));
    }
  },

  async clearAll(): Promise<void> {
    await notificationRepository.saveAll([]);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('creatorcc:notifications_updated'));
    }
  },
};
