import {
  User,
  CreatorProfile,
  Content,
  Publication,
  PublishingAttempt,
  Task,
  SocialAccount,
  NotificationItem,
  ProductionPlan,
  ShootingChecklistItem,
} from '@/types';
import {
  SEED_USER,
  SEED_PROFILE,
  SEED_ACCOUNTS,
  SEED_CONTENT,
  SEED_PUBLICATIONS,
  SEED_ATTEMPTS,
  SEED_TASKS,
  SEED_NOTIFICATIONS,
  SEED_PRODUCTION_PLAN,
  SEED_CHECKLIST,
} from '@/lib/constants/seedData';

export const STORAGE_KEYS = {
  SESSION: 'creatorcc_session',
  USER: 'creatorcc_user',
  PROFILE: 'creatorcc_profile',
  CONTENT: 'creatorcc_content',
  PUBLICATIONS: 'creatorcc_publications',
  ATTEMPTS: 'creatorcc_attempts',
  TASKS: 'creatorcc_tasks',
  ACCOUNTS: 'creatorcc_accounts',
  NOTIFICATIONS: 'creatorcc_notifications',
  PRODUCTION_PLANS: 'creatorcc_production_plans',
  CHECKLISTS: 'creatorcc_checklists',
  THEME: 'creatorcc_theme',
  NOTIFICATION_PREFERENCES: 'creatorcc_notification_preferences',
} as const;

export interface NotificationPreferences {
  notifySuccess: boolean;
  notifyFailure: boolean;
  notifyDeadlines: boolean;
}

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  notifySuccess: true,
  notifyFailure: true,
  notifyDeadlines: true,
};

export interface SessionData {
  userId: string;
  createdAt: string;
}

// In-memory store fallback for SSR and testing environments where localStorage is not available
const inMemoryFallbackStore = new Map<string, string>();

// Helper functions for reading and writing to localStorage
export function getStoredData<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    const memItem = inMemoryFallbackStore.get(key);
    return memItem ? JSON.parse(memItem) : fallback;
  }
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function setStoredData<T>(key: string, value: T): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    inMemoryFallbackStore.set(key, JSON.stringify(value));
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error: unknown) {
    console.error(`Failed to store data for key ${key}:`, error);
  }
}

/**
 * Storage API
 * Strictly separates Authentication Session from Application/Seed Demo Data.
 * 
 * - Unauthenticated (no session): getUser() returns null. No implicit fallback to SEED_USER.
 * - Authenticated (active session): getUser() returns the current session user.
 * - Logout: removes session. Refreshing afterwards remains unauthenticated.
 */
export const StorageAPI = {
  // --- Session Management ---
  getSession: (): SessionData | null => {
    if (typeof window === 'undefined') return null;
    return getStoredData<SessionData | null>(STORAGE_KEYS.SESSION, null);
  },

  setSession: (session: SessionData | null) => {
    if (typeof window === 'undefined') return;
    if (!session) {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    } else {
      setStoredData(STORAGE_KEYS.SESSION, session);
    }
  },

  clearSession: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
  },

  // --- User & Profile (Protected by session presence) ---
  getUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const session = StorageAPI.getSession();
    if (!session) return null; // Unauthenticated! NEVER fall back to SEED_USER
    return getStoredData<User | null>(STORAGE_KEYS.USER, null);
  },

  setUser: (u: User | null) => {
    if (typeof window === 'undefined') return;
    if (!u) {
      localStorage.removeItem(STORAGE_KEYS.USER);
      StorageAPI.setSession(null);
    } else {
      setStoredData(STORAGE_KEYS.USER, u);
      StorageAPI.setSession({ userId: u.id, createdAt: new Date().toISOString() });
    }
  },

  getProfile: (): CreatorProfile | null => {
    if (typeof window === 'undefined') return null;
    const session = StorageAPI.getSession();
    if (!session) return null; // Unauthenticated!
    return getStoredData<CreatorProfile | null>(STORAGE_KEYS.PROFILE, null);
  },

  setProfile: (p: CreatorProfile | null) => {
    if (typeof window === 'undefined') return;
    if (!p) {
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
    } else {
      setStoredData(STORAGE_KEYS.PROFILE, p);
    }
  },

  // --- Seed / Demo Initialization (Only invoked explicitly when establishing demo workspace) ---
  getSeedUser: (): User => ({ ...SEED_USER }),
  getSeedProfile: (): CreatorProfile => ({ ...SEED_PROFILE }),

  // --- Application Demo Data (Independent from Session) ---
  getContentList: (): Content[] => getStoredData(STORAGE_KEYS.CONTENT, SEED_CONTENT),
  setContentList: (c: Content[]) => setStoredData(STORAGE_KEYS.CONTENT, c),

  getPublications: (): Publication[] => getStoredData(STORAGE_KEYS.PUBLICATIONS, SEED_PUBLICATIONS),
  setPublications: (p: Publication[]) => setStoredData(STORAGE_KEYS.PUBLICATIONS, p),

  getAttempts: (): PublishingAttempt[] => getStoredData(STORAGE_KEYS.ATTEMPTS, SEED_ATTEMPTS),
  setAttempts: (a: PublishingAttempt[]) => setStoredData(STORAGE_KEYS.ATTEMPTS, a),

  getTasks: (): Task[] => getStoredData(STORAGE_KEYS.TASKS, SEED_TASKS),
  setTasks: (t: Task[]) => setStoredData(STORAGE_KEYS.TASKS, t),

  getAccounts: (): SocialAccount[] => getStoredData(STORAGE_KEYS.ACCOUNTS, SEED_ACCOUNTS),
  setAccounts: (a: SocialAccount[]) => setStoredData(STORAGE_KEYS.ACCOUNTS, a),

  getNotifications: (): NotificationItem[] => getStoredData(STORAGE_KEYS.NOTIFICATIONS, SEED_NOTIFICATIONS),
  setNotifications: (n: NotificationItem[]) => {
    setStoredData(STORAGE_KEYS.NOTIFICATIONS, n);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('creatorcc:notifications_updated', { detail: n }));
    }
  },

  getProductionPlan: (contentId: string): ProductionPlan => {
    const plans: Record<string, ProductionPlan> = getStoredData(STORAGE_KEYS.PRODUCTION_PLANS, {
      cnt_autumn_workspace: SEED_PRODUCTION_PLAN,
    });
    return (
      plans[contentId] || {
        id: `prod_${contentId}`,
        contentId,
        shootLocation: '',
        gearEquipment: [],
        participants: [],
        readinessNotes: '',
        updatedAt: new Date().toISOString(),
      }
    );
  },
  saveProductionPlan: (plan: ProductionPlan) => {
    const plans: Record<string, ProductionPlan> = getStoredData(STORAGE_KEYS.PRODUCTION_PLANS, {
      cnt_autumn_workspace: SEED_PRODUCTION_PLAN,
    });
    plans[plan.contentId] = plan;
    setStoredData(STORAGE_KEYS.PRODUCTION_PLANS, plans);
  },

  getChecklist: (contentId: string): ShootingChecklistItem[] => {
    const checklists: Record<string, ShootingChecklistItem[]> = getStoredData(STORAGE_KEYS.CHECKLISTS, {
      cnt_autumn_workspace: SEED_CHECKLIST,
    });
    return checklists[contentId] || [];
  },
  saveChecklist: (contentId: string, items: ShootingChecklistItem[]) => {
    const checklists: Record<string, ShootingChecklistItem[]> = getStoredData(STORAGE_KEYS.CHECKLISTS, {
      cnt_autumn_workspace: SEED_CHECKLIST,
    });
    checklists[contentId] = items;
    setStoredData(STORAGE_KEYS.CHECKLISTS, checklists);
  },

  getNotificationPreferences: (): NotificationPreferences => {
    return getStoredData(STORAGE_KEYS.NOTIFICATION_PREFERENCES, DEFAULT_NOTIFICATION_PREFERENCES);
  },

  setNotificationPreferences: (prefs: NotificationPreferences) => {
    setStoredData(STORAGE_KEYS.NOTIFICATION_PREFERENCES, prefs);
  },

  resetAllData: () => {
    inMemoryFallbackStore.clear();
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.CONTENT);
    localStorage.removeItem(STORAGE_KEYS.PUBLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.ATTEMPTS);
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.ACCOUNTS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTION_PLANS);
    localStorage.removeItem(STORAGE_KEYS.CHECKLISTS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATION_PREFERENCES);
  },
};
