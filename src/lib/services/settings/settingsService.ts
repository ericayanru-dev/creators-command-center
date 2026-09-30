import { userRepository } from "@/lib/repositories/userRepository";
import { contentRepository } from "@/lib/repositories/contentRepository";
import { platformRepository } from "@/lib/repositories/platformRepository";
import { publishingRepository } from "@/lib/repositories/publishingRepository";
import { taskRepository } from "@/lib/repositories/taskRepository";
import { notificationRepository } from "@/lib/repositories/notificationRepository";
import { systemRepository } from "@/lib/repositories/systemRepository";
import { NotificationPreferences } from "@/lib/storage/storage";
import type {
  Content,
  CreatorProfile,
  NotificationItem,
  Publication,
  PublishingAttempt,
  SocialAccount,
  Task,
  User,
} from "@/types";

export interface ExportDataBundle {
  user: User | null;
  profile: CreatorProfile | null;
  content: Content[];
  accounts: SocialAccount[];
  publications: Publication[];
  attempts: PublishingAttempt[];
  tasks: Task[];
  notifications: NotificationItem[];
}

export const SettingsService = {
  async exportAllData(): Promise<ExportDataBundle> {
    const [user, profile, content, accounts, publications, attempts, tasks, notifications] =
      await Promise.all([
        userRepository.getCurrentUser(),
        userRepository.getCurrentProfile(),
        contentRepository.getAll(),
        platformRepository.getAll(),
        publishingRepository.getPublications(),
        publishingRepository.getAttempts(),
        taskRepository.getAll(),
        notificationRepository.getAll(),
      ]);

    return {
      user,
      profile,
      content,
      accounts,
      publications,
      attempts,
      tasks,
      notifications,
    };
  },

  async getNotificationPreferences(): Promise<NotificationPreferences> {
    return userRepository.getNotificationPreferences();
  },

  async saveNotificationPreferences(prefs: NotificationPreferences): Promise<void> {
    await userRepository.saveNotificationPreferences(prefs);
  },

  async resetAllData(): Promise<void> {
    await systemRepository.resetAllData();
  },
};
