import { Task, TaskPriority, TaskStatus } from '@/types';
import { taskRepository } from '@/lib/repositories/taskRepository';
import { simulateNetworkLatency } from '@/lib/api/client';

export interface TaskFilterParams {
  filter?: 'ALL' | 'TODAY' | 'UPCOMING' | 'OVERDUE' | 'COMPLETED';
  contentId?: string;
}

export const TaskService = {
  async getTasks(params: TaskFilterParams = {}): Promise<Task[]> {
    await simulateNetworkLatency(80);
    let list = await taskRepository.getAll();

    if (params.contentId) {
      list = list.filter((t) => t.contentId === params.contentId);
    }

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const todayEnd = todayStart + 24 * 60 * 60 * 1000;

    if (params.filter === 'COMPLETED') {
      return list.filter((t) => t.status === 'COMPLETED');
    }

    if (params.filter === 'TODAY') {
      return list.filter((t) => {
        if (t.status === 'COMPLETED') return false;
        const dueTime = new Date(t.dueAt).getTime();
        return dueTime >= todayStart && dueTime <= todayEnd;
      });
    }

    if (params.filter === 'UPCOMING') {
      return list.filter((t) => {
        if (t.status === 'COMPLETED') return false;
        const dueTime = new Date(t.dueAt).getTime();
        return dueTime > todayEnd;
      });
    }

    if (params.filter === 'OVERDUE') {
      return list.filter((t) => {
        if (t.status === 'COMPLETED') return false;
        const dueTime = new Date(t.dueAt).getTime();
        return dueTime < todayStart;
      });
    }

    return list;
  },

  async createTask(data: {
    title: string;
    description?: string;
    priority?: TaskPriority;
    dueAt?: string;
    contentId?: string;
    contentTitle?: string;
  }): Promise<Task> {
    await simulateNetworkLatency(150);
    if (!data.title || !data.title.trim()) {
      throw new Error('Task title is required');
    }

    const newTask: Task = {
      id: `tsk_${Date.now()}`,
      userId: 'usr_01jd72948',
      title: data.title.trim(),
      description: data.description || '',
      status: 'OPEN',
      priority: data.priority || 'MEDIUM',
      dueAt: data.dueAt || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      contentId: data.contentId,
      contentTitle: data.contentTitle,
      createdAt: new Date().toISOString(),
    };

    return taskRepository.create(newTask);
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    await simulateNetworkLatency(120);
    return taskRepository.update(id, updates);
  },

  async toggleComplete(id: string): Promise<Task> {
    await simulateNetworkLatency(100);
    const task = await taskRepository.getById(id);
    if (!task) throw new Error('Task not found');

    const isCompleted = task.status === 'COMPLETED';
    const status: TaskStatus = isCompleted ? 'OPEN' : 'COMPLETED';
    const completedAt = isCompleted ? undefined : new Date().toISOString();

    return taskRepository.update(id, { status, completedAt });
  },

  async deleteTask(id: string): Promise<boolean> {
    await simulateNetworkLatency(100);
    return taskRepository.delete(id);
  },
};
