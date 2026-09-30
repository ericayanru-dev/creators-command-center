"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { Task, Content, TaskPriority } from '@/types';
import { TaskService } from '@/lib/services/tasks/taskService';
import { ContentService } from '@/lib/services/content/contentService';
import { Button } from '@/components/ui/Button';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { useToast } from '@/components/shared/Toast';
import { Plus, Repeat } from 'lucide-react';
import { ComingSoonModal, ComingSoonFeatureType } from '@/components/shared/ComingSoonModal';

// Subcomponents
import { TaskFilterTabs, TaskTab } from '@/features/tasks/components/TaskFilterTabs';
import { TaskItemRow } from '@/features/tasks/components/TaskItemRow';
import { NewTaskModal } from '@/features/tasks/components/NewTaskModal';
import { EditTaskModal } from '@/features/tasks/components/EditTaskModal';

export const TasksPage: React.FC = () => {
  const { toast } = useToast();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [contentList, setContentList] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TaskTab>('ALL');
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState<ComingSoonFeatureType | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [allTasks, allContent] = await Promise.all([
        TaskService.getTasks(),
        ContentService.listContent(),
      ]);
      setTasks(allTasks);
      setContentList(allContent);
    } catch {
      toast('Failed to load tasks', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleTask = async (taskId: string) => {
    try {
      await TaskService.toggleComplete(taskId);
      toast('Task updated', 'success');
      loadData();
    } catch {
      toast('Failed to update task', 'error');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await TaskService.deleteTask(taskId);
      toast('Task deleted', 'success');
      loadData();
    } catch {
      toast('Failed to delete task', 'error');
    }
  };

  const handleCreateTask = async (taskData: {
    title: string;
    description: string;
    priority: TaskPriority;
    dueAt: string;
    contentId?: string;
    contentTitle?: string;
  }) => {
    setIsCreating(true);
    try {
      await TaskService.createTask(taskData);
      toast('Task created', 'success');
      setIsNewTaskOpen(false);
      loadData();
    } catch {
      toast('Failed to create task', 'error');
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateTask = async (taskId: string, updates: Partial<Task>) => {
    setIsUpdating(true);
    try {
      await TaskService.updateTask(taskId, updates);
      toast('Task updated successfully', 'success');
      setEditingTask(null);
      loadData();
    } catch {
      toast('Failed to update task', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  // Compute counts and filtered tasks
  const now = Date.now();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const counts: Record<TaskTab, number> = useMemo(() => {
    const todayCount = tasks.filter((t) => {
      if (t.status === 'COMPLETED') return false;
      const d = new Date(t.dueAt).getTime();
      return d >= todayStart.getTime() && d <= todayEnd.getTime();
    }).length;

    const upcomingCount = tasks.filter((t) => {
      if (t.status === 'COMPLETED') return false;
      const d = new Date(t.dueAt).getTime();
      return d > todayEnd.getTime();
    }).length;

    const overdueCount = tasks.filter((t) => {
      if (t.status === 'COMPLETED') return false;
      const d = new Date(t.dueAt).getTime();
      return d < todayStart.getTime();
    }).length;

    const completedCount = tasks.filter((t) => t.status === 'COMPLETED').length;

    return {
      ALL: tasks.length,
      TODAY: todayCount,
      UPCOMING: upcomingCount,
      OVERDUE: overdueCount,
      COMPLETED: completedCount,
    };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    if (activeTab === 'COMPLETED') {
      return tasks.filter((t) => t.status === 'COMPLETED');
    }
    if (activeTab === 'TODAY') {
      return tasks.filter((t) => {
        if (t.status === 'COMPLETED') return false;
        const d = new Date(t.dueAt).getTime();
        return d >= todayStart.getTime() && d <= todayEnd.getTime();
      });
    }
    if (activeTab === 'UPCOMING') {
      return tasks.filter((t) => {
        if (t.status === 'COMPLETED') return false;
        const d = new Date(t.dueAt).getTime();
        return d > todayEnd.getTime();
      });
    }
    if (activeTab === 'OVERDUE') {
      return tasks.filter((t) => {
        if (t.status === 'COMPLETED') return false;
        const d = new Date(t.dueAt).getTime();
        return d < todayStart.getTime();
      });
    }
    return tasks;
  }, [tasks, activeTab]);

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Production Tasks
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
            Checklist and duties for drafting, shooting, editing, and distribution
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setComingSoonFeature('recurring_tasks')}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer transition-colors"
            aria-label="Recurring Tasks (Coming in MVP2)"
          >
            <Repeat className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Recurring Tasks</span>
            <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
              MVP2
            </span>
          </button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsNewTaskOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Task
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <TaskFilterTabs
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        counts={counts}
      />

      {/* Task List */}
      {isLoading ? (
        <LoadingState message="Loading tasks..." />
      ) : filteredTasks.length === 0 ? (
        <EmptyState
          title="No tasks in this view"
          description={
            activeTab === 'OVERDUE'
              ? 'Great work! No overdue tasks.'
              : 'Add tasks to organize thumbnail creation, caption drafting, and video review.'
          }
          actionLabel="Create Task"
          onAction={() => setIsNewTaskOpen(true)}
        />
      ) : (
        <div className="space-y-2.5">
          {filteredTasks.map((task) => (
            <TaskItemRow
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onEdit={(t) => setEditingTask(t)}
            />
          ))}
        </div>
      )}

      {/* New Task Modal */}
      <NewTaskModal
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        contentList={contentList}
        onCreate={handleCreateTask}
        isLoading={isCreating}
      />

      {/* Edit Task Modal */}
      <EditTaskModal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        task={editingTask}
        contentList={contentList}
        onSave={handleUpdateTask}
        isLoading={isUpdating}
      />

      {/* Coming Soon Modal */}
      {comingSoonFeature && (
        <ComingSoonModal
          isOpen={!!comingSoonFeature}
          onClose={() => setComingSoonFeature(null)}
          feature={comingSoonFeature}
        />
      )}
    </div>
  );
};
