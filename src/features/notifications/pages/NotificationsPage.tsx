"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from "@/lib/navigation";
import { NotificationItem } from '@/types';
import { NotificationService } from '@/lib/services/notifications/notificationService';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { EmptyState } from '@/components/shared/EmptyState';
import { useToast } from '@/components/shared/Toast';
import { getRelativeTimeString } from '@/lib/utils';
import { UI_CLASSES } from '@/lib/constants/theme';
import {
  Bell,
  Check,
  ExternalLink,
  Trash2,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'UNREAD'>('ALL');

  const loadNotifications = async () => {
    const list = await NotificationService.getNotifications();
    setNotifications(list);
  };

  useEffect(() => {
    loadNotifications();
    const handleUpdate = () => {
      loadNotifications();
    };
    window.addEventListener('creatorcc:notifications_updated', handleUpdate);
    return () => window.removeEventListener('creatorcc:notifications_updated', handleUpdate);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = async () => {
    await NotificationService.markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast('All notifications marked as read', 'success');
  };

  const markItemRead = async (id: string) => {
    await NotificationService.markAsRead(id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAll = async () => {
    await NotificationService.clearAll();
    setNotifications([]);
    toast('Notifications cleared', 'success');
  };

  const filtered = notifications.filter((n) => (filter === 'UNREAD' ? !n.read : true));

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Activity & Notifications
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
            Audit logs of automated publishing events, platform status alerts, and deadlines
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllRead}
              leftIcon={<Check className="w-3.5 h-3.5" />}
            >
              Mark All Read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-slate-400 hover:text-rose-600"
              leftIcon={<Trash2 className="w-3.5 h-3.5" />}
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setFilter('ALL')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            filter === 'ALL'
              ? UI_CLASSES.activePillTab
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          All Activity ({notifications.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('UNREAD')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            filter === 'UNREAD'
              ? UI_CLASSES.activePillTab
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notification List */}
      {filtered.length === 0 ? (
        <EmptyState
          title={filter === 'UNREAD' ? 'No unread notifications' : 'No activity yet'}
          description="Alerts will appear here when scheduled publications run or social account tokens require attention."
        />
      ) : (
        <Card className="p-0 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.map((item) => {
            const isFailure = item.type === 'PUBLISHING_FAILED' || item.type === 'PLATFORM_REAUTH_REQUIRED';
            const isSuccess = item.type === 'PUBLISHING_SUCCESS';

            return (
              <div
                key={item.id}
                onClick={async () => {
                  await markItemRead(item.id);
                  if (item.linkTo) navigate(item.linkTo);
                }}
                className={`p-4 flex items-start justify-between gap-4 transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                  !item.read ? 'bg-sky-50/40 dark:bg-sky-950/20' : ''
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="mt-0.5">
                    {item.platform ? (
                      <PlatformIcon platform={item.platform} size="sm" showBackground />
                    ) : isFailure ? (
                      <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                    ) : isSuccess ? (
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center">
                        <Bell className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {item.title}
                      </h4>
                      {!item.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      )}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {item.message}
                    </p>

                    {item.actionLabel && (
                      <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:underline">
                        <span>{item.actionLabel}</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </div>

                <span className="text-[10px] font-mono text-slate-400 shrink-0">
                  {getRelativeTimeString(item.createdAt)}
                </span>
              </div>
            );
          })}
        </Card>
      )}
    </div>
  );
};
