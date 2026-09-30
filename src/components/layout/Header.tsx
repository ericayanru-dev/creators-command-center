import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "@/lib/navigation";
import { Search, Bell, Check, ExternalLink, Video, CheckSquare, Globe, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { contentRepository } from '@/lib/repositories/contentRepository';
import { taskRepository } from '@/lib/repositories/taskRepository';
import { platformRepository } from '@/lib/repositories/platformRepository';
import { notificationRepository } from '@/lib/repositories/notificationRepository';
import { Content, NotificationItem, SocialAccount, Task } from '@/types';
import { getRelativeTimeString } from '@/lib/utils';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { UI_CLASSES } from '@/lib/constants/theme';
import { ComingSoonModal } from '@/components/shared/ComingSoonModal';

export interface HeaderProps {
  onSearch?: (query: string) => void;
}

interface SearchResults {
  content: Content[];
  tasks: Task[];
  platforms: SocialAccount[];
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults>({ content: [], tasks: [], platforms: [] });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMultiBrandModal, setShowMultiBrandModal] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load and sync notifications
  const reloadNotifications = async () => {
    const list = await notificationRepository.getAll();
    setNotifications(list);
  };

  useEffect(() => {
    reloadNotifications();
    const handleNotifUpdate = () => {
      reloadNotifications();
    };
    window.addEventListener('creatorcc:notifications_updated', handleNotifUpdate);
    return () => window.removeEventListener('creatorcc:notifications_updated', handleNotifUpdate);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Search indexing
  useEffect(() => {
    const q = searchVal.trim().toLowerCase();
    if (!q) {
      setSearchResults({ content: [], tasks: [], platforms: [] });
      setIsSearchOpen(false);
      return;
    }

    let isMounted = true;
    Promise.all([
      contentRepository.getAll(),
      taskRepository.getAll(),
      platformRepository.getAll(),
    ]).then(([allContent, allTasks, allPlatforms]) => {
      if (!isMounted) return;

      const matchedContent = allContent.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.caption.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      ).slice(0, 4);

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
      ).slice(0, 3);

      setSearchResults({
        content: matchedContent,
        tasks: matchedTasks,
        platforms: matchedPlatforms,
      });
      setIsSearchOpen(true);
    });

    return () => {
      isMounted = false;
    };
  }, [searchVal]);

  // Global Keyboard Shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setShowNotifications(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside to dismiss menus
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchVal.trim()) return;

    setIsSearchOpen(false);
    if (onSearch) {
      onSearch(searchVal);
      return;
    }

    // If exact single match found in search results, navigate directly
    if (searchResults.content.length === 1 && searchResults.tasks.length === 0 && searchResults.platforms.length === 0) {
      navigate(`/content/${searchResults.content[0].id}`);
    } else if (searchResults.tasks.length === 1 && searchResults.content.length === 0) {
      navigate('/tasks');
    } else if (searchResults.platforms.length === 1 && searchResults.content.length === 0) {
      navigate('/platforms');
    } else {
      navigate(`/content?search=${encodeURIComponent(searchVal)}`);
    }
  };

  const markAllRead = async () => {
    await notificationRepository.markAllAsRead();
    reloadNotifications();
  };

  const markItemRead = async (id: string) => {
    await notificationRepository.markAsRead(id);
    reloadNotifications();
  };

  const handleNotificationClick = async (item: NotificationItem) => {
    await markItemRead(item.id);
    setShowNotifications(false);
    if (item.linkTo) {
      navigate(item.linkTo);
    }
  };

  const totalResults =
    searchResults.content.length + searchResults.tasks.length + searchResults.platforms.length;

  return (
    <header className="h-16 px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 select-none relative z-30">
      {/* Global Search Bar with Type-Ahead Dropdown */}
      <div ref={searchContainerRef} className="max-w-md w-full relative">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onFocus={() => {
              if (searchVal.trim()) setIsSearchOpen(true);
            }}
            placeholder="Search content, tasks, platforms..."
            className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-lg pl-9 pr-12 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
            aria-label="Global Search"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:flex items-center gap-0.5">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-700/60 rounded border border-slate-200 dark:border-slate-600">
              ⌘K
            </kbd>
          </div>
        </form>

        {/* Global Search Results Dropdown */}
        {isSearchOpen && searchVal.trim().length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-50 text-xs">
            {totalResults === 0 ? (
              <div className="p-4 text-center text-slate-400 font-mono text-xs">
                No matching content, tasks, or platforms for &quot;{searchVal}&quot;
              </div>
            ) : (
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                {/* Content matches */}
                {searchResults.content.length > 0 && (
                  <div className="p-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400 px-2 py-1 block">
                      Content ({searchResults.content.length})
                    </span>
                    {searchResults.content.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchVal('');
                          navigate(`/content/${c.id}`);
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Video className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                          <span className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                            {c.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-500 shrink-0 ml-2">
                          {c.status}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Task matches */}
                {searchResults.tasks.length > 0 && (
                  <div className="p-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400 px-2 py-1 block">
                      Tasks ({searchResults.tasks.length})
                    </span>
                    {searchResults.tasks.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchVal('');
                          navigate('/tasks');
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <CheckSquare className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                            {t.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-2">
                          {t.status}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Platform matches */}
                {searchResults.platforms.length > 0 && (
                  <div className="p-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400 px-2 py-1 block">
                      Platforms ({searchResults.platforms.length})
                    </span>
                    {searchResults.platforms.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchVal('');
                          navigate('/platforms');
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <PlatformIcon platform={p.platform} size="xs" />
                          <span className="font-semibold text-slate-900 dark:text-slate-100 capitalize truncate">
                            {p.platform} ({p.accountHandle})
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-500 shrink-0 ml-2">
                          {p.status}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Controls: Brand Switcher, Notifications & User */}
      <div className="flex items-center gap-3">
        {/* Multi-Brand Switcher (MVP2 Roadmap) */}
        <button
          type="button"
          onClick={() => setShowMultiBrandModal(true)}
          className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title="Multi-Brand Workspace Switcher"
          aria-label="Multi-brand workspace switcher"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <span className="truncate max-w-[110px]">Solo Studio</span>
          <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
            MVP2
          </span>
        </button>

        {/* Notification Bell Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => {
              setShowNotifications((prev) => !prev);
              reloadNotifications();
            }}
            aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="text-[11px] text-sky-600 dark:text-sky-400 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" /> Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">No notifications yet</div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleNotificationClick(item)}
                      className={`p-3.5 text-left transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                        !item.read ? 'bg-sky-50/50 dark:bg-sky-950/20' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">
                          {getRelativeTimeString(item.createdAt)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {item.message}
                      </p>
                      {item.actionLabel && (
                        <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-sky-600 dark:text-sky-400">
                          <span>{item.actionLabel}</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Footer link to Notifications page */}
              <div className="p-2 border-t border-slate-100 dark:border-slate-800 text-center bg-slate-50/50 dark:bg-slate-800/40">
                <button
                  type="button"
                  onClick={() => {
                    setShowNotifications(false);
                    navigate('/notifications');
                  }}
                  className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
                >
                  View all activity & notifications →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar / Name */}
        <button
          type="button"
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2.5 pl-2 py-1 pr-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="User account settings"
        >
          <div className={`w-7 h-7 rounded-full ${UI_CLASSES.brandIconBg} flex items-center justify-center font-bold text-xs`}>
            {user?.name ? user.name.substring(0, 2).toUpperCase() : 'ED'}
          </div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 hidden md:inline">
            {user?.name || 'Eric Dollar'}
          </span>
        </button>
      </div>

      {showMultiBrandModal && (
        <ComingSoonModal
          isOpen={showMultiBrandModal}
          onClose={() => setShowMultiBrandModal(false)}
          feature="multi_brand"
        />
      )}
    </header>
  );
};
