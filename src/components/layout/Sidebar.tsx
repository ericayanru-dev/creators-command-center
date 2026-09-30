import React, { useState } from 'react';
import { NavLink, useLocation } from "@/lib/navigation";
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
  ChevronDown,
  Layers,
  FolderKanban,
  Briefcase,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { UI_CLASSES } from '@/lib/constants/theme';
import { cn } from '@/lib/utils';
import { ComingSoonModal, ComingSoonFeatureType } from '@/components/shared/ComingSoonModal';

export const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Content sub-navigation expansion
  const isContentActive = location.pathname.startsWith('/content') || location.pathname.startsWith('/pipeline');
  const [contentExpanded, setContentExpanded] = useState(true);
  const [comingSoonFeature, setComingSoonFeature] = useState<ComingSoonFeatureType | null>(null);

  const navLinkBase =
    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer select-none';

  return (
    <aside className="w-64 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between shrink-0 select-none">
      {/* Brand Header */}
      <div className="flex flex-col gap-6 pt-5 pb-4 px-4">
        <div className="flex items-center gap-3 px-2">
          <div className={`w-8 h-8 rounded-lg ${UI_CLASSES.brandIconBg} flex items-center justify-center font-bold text-sm shadow-xs tracking-tight`}>
            CC
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-slate-100">
              Creator CC
            </span>
            <span className="text-[11px] font-mono text-slate-400">Command Center</span>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex flex-col gap-1 text-slate-600 dark:text-slate-400">
          {/* Dashboard */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              cn(
                navLinkBase,
                isActive
                  ? UI_CLASSES.activeNavTab
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
              )
            }
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>Dashboard</span>
          </NavLink>

          {/* Content (Parent with Sub-navigation: All Content, Pipeline) */}
          <div>
            <button
              type="button"
              onClick={() => setContentExpanded((prev) => !prev)}
              aria-expanded={contentExpanded}
              aria-label="Toggle Content subnavigation"
              className={cn(
                navLinkBase,
                'w-full justify-between',
                isContentActive
                  ? 'text-sky-900 dark:text-sky-400 font-semibold'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
              )}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 shrink-0" />
                <span>Content</span>
              </div>
              <ChevronDown
                className={cn('w-4 h-4 text-slate-400 transition-transform duration-200', contentExpanded && 'rotate-180')}
              />
            </button>

            {contentExpanded && (
              <div className="pl-9 pr-1 py-1 flex flex-col gap-1">
                <NavLink
                  to="/content"
                  end
                  className={({ isActive }) =>
                    cn(
                      'px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors block',
                      isActive
                        ? UI_CLASSES.activeNavTab
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    )
                  }
                >
                  All Content
                </NavLink>
                <NavLink
                  to="/pipeline"
                  className={({ isActive }) =>
                    cn(
                      'px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors block',
                      isActive
                        ? UI_CLASSES.activeNavTab
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    )
                  }
                >
                  Pipeline
                </NavLink>
              </div>
            )}
          </div>

          {/* Calendar */}
          <NavLink
            to="/calendar"
            className={({ isActive }) =>
              cn(
                navLinkBase,
                isActive
                  ? UI_CLASSES.activeNavTab
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
              )
            }
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span>Calendar</span>
          </NavLink>

          {/* Tasks */}
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              cn(
                navLinkBase,
                isActive
                  ? UI_CLASSES.activeNavTab
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
              )
            }
          >
            <CheckSquare className="w-4 h-4 shrink-0" />
            <span>Tasks</span>
          </NavLink>

          {/* Publishing */}
          <NavLink
            to="/publishing"
            className={({ isActive }) =>
              cn(
                navLinkBase,
                isActive
                  ? UI_CLASSES.activeNavTab
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
              )
            }
          >
            <Send className="w-4 h-4 shrink-0" />
            <span>Publishing</span>
          </NavLink>

          {/* Platforms */}
          <NavLink
            to="/platforms"
            className={({ isActive }) =>
              cn(
                navLinkBase,
                isActive
                  ? UI_CLASSES.activeNavTab
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
              )
            }
          >
            <Share2 className="w-4 h-4 shrink-0" />
            <span>Platforms</span>
          </NavLink>

          {/* Settings */}
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              cn(
                navLinkBase,
                isActive
                  ? UI_CLASSES.activeNavTab
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
              )
            }
          >
            <Settings className="w-4 h-4 shrink-0" />
            <span>Settings</span>
          </NavLink>

          {/* MVP2 Roadmap Section */}
          <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800/80">
            <span className="px-3 text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
              MVP2 Preview
            </span>
            <div className="mt-1 flex flex-col gap-0.5">
              <button
                type="button"
                onClick={() => setComingSoonFeature('projects')}
                className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer transition-colors w-full text-left"
              >
                <div className="flex items-center gap-2.5">
                  <FolderKanban className="w-3.5 h-3.5 text-slate-400" />
                  <span>Projects</span>
                </div>
                <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                  MVP2
                </span>
              </button>
              <button
                type="button"
                onClick={() => setComingSoonFeature('multi_brand')}
                className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer transition-colors w-full text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  <span>Multi-Brand</span>
                </div>
                <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                  MVP2
                </span>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Bottom Controls: Theme & Logout */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-1">
        <button
          type="button"
          onClick={toggleTheme}
          className={cn(navLinkBase, 'w-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800')}
          aria-label="Toggle theme"
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
          onClick={logout}
          className={cn(navLinkBase, 'w-full text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40')}
          aria-label="Log out"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Logout</span>
        </button>
      </div>

      {/* Coming Soon Modal */}
      {comingSoonFeature && (
        <ComingSoonModal
          isOpen={!!comingSoonFeature}
          onClose={() => setComingSoonFeature(null)}
          feature={comingSoonFeature}
        />
      )}
    </aside>
  );
};
