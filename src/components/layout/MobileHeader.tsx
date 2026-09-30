import React, { useState, useEffect } from 'react';
import { Menu, Search, Bell, User as UserIcon, X, Check, ExternalLink, Video, CheckSquare } from 'lucide-react';
import { useNavigate } from "@/lib/navigation";
import { useAuth } from '@/hooks/useAuth';
import { notificationRepository } from '@/lib/repositories/notificationRepository';
import { contentRepository } from '@/lib/repositories/contentRepository';
import { taskRepository } from '@/lib/repositories/taskRepository';
import { platformRepository } from '@/lib/repositories/platformRepository';
import { getRelativeTimeString } from '@/lib/utils';
import { Content, NotificationItem, SocialAccount, Task } from '@/types';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { UI_CLASSES } from '@/lib/constants/theme';

export interface MobileHeaderProps {
  onOpenMenu: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onOpenMenu }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState<{ content: Content[]; tasks: Task[]; platforms: SocialAccount[] }>({
    content: [],
    tasks: [],
    platforms: [],
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const reloadNotifications = async () => {
    const list = await notificationRepository.getAll();
    setNotifications(list);
  };

  useEffect(() => {
    reloadNotifications();
    const handleUpdate = () => {
      reloadNotifications();
    };
    window.addEventListener('creatorcc:notifications_updated', handleUpdate);
    return () => window.removeEventListener('creatorcc:notifications_updated', handleUpdate);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Search indexing
  useEffect(() => {
    const q = searchVal.trim().toLowerCase();
    if (!q) {
      setSearchResults({ content: [], tasks: [], platforms: [] });
      return;
    }

    Promise.all([
      contentRepository.getAll(),
      taskRepository.getAll(),
      platformRepository.getAll(),
    ]).then(([allContent, allTasks, allPlatforms]) => {
      const matchedContent = allContent.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      ).slice(0, 3);

      const matchedTasks = allTasks.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description && t.description.toLowerCase().includes(q))
      ).slice(0, 3);

      const matchedPlatforms = allPlatforms.filter(
        (p) =>
          p.platform.toLowerCase().includes(q) ||
          p.accountName.toLowerCase().includes(q) ||
          p.accountHandle.toLowerCase().includes(q)
      ).slice(0, 2);

      setSearchResults({
        content: matchedContent,
        tasks: matchedTasks,
        platforms: matchedPlatforms,
      });
    });
  }, [searchVal]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      setShowSearch(false);
      navigate(`/content?search=${encodeURIComponent(searchVal)}`);
    }
  };

  const markAllRead = async () => {
    await notificationRepository.markAllAsRead();
    reloadNotifications();
  };

  const handleNotificationClick = async (item: NotificationItem) => {
    // Exactly matches desktop behavior: mark read -> navigate
    await notificationRepository.markAsRead(item.id);
    reloadNotifications();
    setShowNotifications(false);
    if (item.linkTo) {
      navigate(item.linkTo);
    }
  };

  return (
    <header className="lg:hidden h-14 px-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 z-40 select-none">
      {/* Left: Hamburger menu */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open navigation menu"
          className="p-2 -ml-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded ${UI_CLASSES.brandIconBg} flex items-center justify-center font-bold text-xs tracking-tight`}>
            CC
          </div>
          <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-slate-100">
            Creator CC
          </span>
        </div>
      </div>

      {/* Right: Search, Notifications, User */}
      <div className="flex items-center gap-1">
        {/* Rectangular Search control */}
        <button
          type="button"
          onClick={() => setShowSearch((prev) => !prev)}
          aria-label="Search"
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button
          type="button"
          onClick={() => {
            setShowNotifications((prev) => !prev);
            reloadNotifications();
          }}
          aria-label="Notifications"
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative cursor-pointer"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
          )}
        </button>

        {/* User Account */}
        <button
          type="button"
          onClick={() => navigate('/settings')}
          aria-label="Account profile and settings"
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          <div className={`w-6 h-6 rounded-full ${UI_CLASSES.brandIconBg} flex items-center justify-center font-bold text-[10px]`}>
            {user?.name ? user.name.substring(0, 2).toUpperCase() : <UserIcon className="w-3.5 h-3.5" />}
          </div>
        </button>
      </div>

      {/* Expandable search bar on mobile */}
      {showSearch && (
        <div className="absolute top-14 left-0 right-0 p-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search content, tasks, platforms..."
              className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowSearch(false)}
              aria-label="Close search"
              className="p-1.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </form>

          {/* Mobile search quick results */}
          {searchVal.trim().length > 0 && (
            <div className="mt-2 divide-y divide-slate-100 dark:divide-slate-800 max-h-56 overflow-y-auto text-xs">
              {searchResults.content.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setShowSearch(false);
                    navigate(`/content/${c.id}`);
                  }}
                  className="py-2 px-1 flex items-center justify-between cursor-pointer"
                >
                  <span className="font-medium text-slate-900 dark:text-slate-100">{c.title}</span>
                  <span className="text-[10px] font-mono uppercase text-slate-400">{c.status}</span>
                </div>
              ))}
              {searchResults.tasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    setShowSearch(false);
                    navigate('/tasks');
                  }}
                  className="py-2 px-1 flex items-center justify-between cursor-pointer"
                >
                  <span className="font-medium text-slate-900 dark:text-slate-100">{t.title}</span>
                  <span className="text-[10px] font-mono text-emerald-500">Task</span>
                </div>
              ))}
              {searchResults.platforms.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setShowSearch(false);
                    navigate('/platforms');
                  }}
                  className="py-2 px-1 flex items-center justify-between cursor-pointer"
                >
                  <span className="font-medium text-slate-900 dark:text-slate-100 capitalize">{p.platform}</span>
                  <span className="text-[10px] font-mono text-sky-500">Platform</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Notifications modal on mobile */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 p-4 flex items-center justify-center">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">Notifications</span>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="text-[11px] text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-3 h-3" /> Mark read
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  aria-label="Close notifications"
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-2 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">No notifications</div>
              ) : (
                notifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleNotificationClick(item)}
                    className={`p-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg cursor-pointer transition-colors ${
                      !item.read ? 'bg-sky-50/50 dark:bg-sky-950/20' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-slate-100 mb-0.5">
                      <span>{item.title}</span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {getRelativeTimeString(item.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{item.message}</p>
                    {item.actionLabel && (
                      <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-sky-600 dark:text-sky-400">
                        {item.actionLabel} <ExternalLink className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
            <div className="p-2.5 border-t border-slate-100 dark:border-slate-800 text-center bg-slate-50/50 dark:bg-slate-800/40 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setShowNotifications(false);
                  navigate('/notifications');
                }}
                className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
              >
                View all notifications →
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
