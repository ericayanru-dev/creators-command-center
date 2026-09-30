import React from 'react';
import { NavLink } from "@/lib/navigation";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  CheckSquare,
  Send,
  Share2,
  Settings,
  Sun,
  Moon,
  LogOut,
  X,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { UI_CLASSES } from '@/lib/constants/theme';
import { cn } from '@/lib/utils';

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  if (!isOpen) return null;

  const navLinkBase =
    'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer select-none';

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden bg-slate-900/60 backdrop-blur-xs" role="dialog" aria-modal="true">
      <div className="w-4/5 max-w-xs h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between p-4 shadow-2xl animate-in slide-in-from-left duration-200">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className={`w-7 h-7 rounded-lg ${UI_CLASSES.brandIconBg} flex items-center justify-center font-bold text-xs tracking-tight`}>
                CC
              </div>
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100">Creator CC</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User badge */}
          <div className="py-3 px-1 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 mb-2">
            <div className={`w-8 h-8 rounded-full ${UI_CLASSES.brandIconBg} flex items-center justify-center font-bold text-xs`}>
              {user?.name ? user.name.substring(0, 2).toUpperCase() : 'ED'}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">{user?.name || 'Creator'}</span>
              <span className="text-[11px] font-mono text-slate-400 truncate">{user?.email || 'user@creatorcc.com'}</span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-1 text-slate-600 dark:text-slate-400">
            <NavLink
              to="/dashboard"
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  navLinkBase,
                  isActive
                    ? UI_CLASSES.activeNavTab
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                )
              }
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/content"
              end
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  navLinkBase,
                  isActive
                    ? UI_CLASSES.activeNavTab
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                )
              }
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>All Content</span>
            </NavLink>

            <NavLink
              to="/pipeline"
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  navLinkBase,
                  isActive
                    ? UI_CLASSES.activeNavTab
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 pl-8'
                )
              }
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1" />
              <span>Content Pipeline</span>
            </NavLink>

            <NavLink
              to="/calendar"
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  navLinkBase,
                  isActive
                    ? UI_CLASSES.activeNavTab
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                )
              }
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Calendar</span>
            </NavLink>

            <NavLink
              to="/tasks"
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  navLinkBase,
                  isActive
                    ? UI_CLASSES.activeNavTab
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                )
              }
            >
              <CheckSquare className="w-4 h-4 shrink-0" />
              <span>Tasks</span>
            </NavLink>

            <NavLink
              to="/publishing"
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  navLinkBase,
                  isActive
                    ? UI_CLASSES.activeNavTab
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                )
              }
            >
              <Send className="w-4 h-4 shrink-0" />
              <span>Publishing</span>
            </NavLink>

            <NavLink
              to="/platforms"
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  navLinkBase,
                  isActive
                    ? UI_CLASSES.activeNavTab
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                )
              }
            >
              <Share2 className="w-4 h-4 shrink-0" />
              <span>Platforms</span>
            </NavLink>

            <NavLink
              to="/settings"
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  navLinkBase,
                  isActive
                    ? UI_CLASSES.activeNavTab
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                )
              }
            >
              <Settings className="w-4 h-4 shrink-0" />
              <span>Settings</span>
            </NavLink>
          </nav>
        </div>

        {/* Bottom controls: Theme & Logout */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1">
          <button
            type="button"
            onClick={toggleTheme}
            className={cn(navLinkBase, 'w-full text-slate-600 dark:text-slate-400')}
          >
            {theme === 'light' ? (
              <>
                <Moon className="w-4 h-4 shrink-0" />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Light Mode</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              logout();
            }}
            className={cn(navLinkBase, 'w-full text-rose-600 dark:text-rose-400')}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
