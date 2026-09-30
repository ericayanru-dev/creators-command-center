import { Task } from '@/types';
import { StorageAPI } from '@/lib/storage/storage';

export interface ITaskRepository {
  getAll(): Promise<Task[]>;
  getById(id: string): Promise<Task | null>;
  create(task: Task): Promise<Task>;
  update(id: string, updates: Partial<Task>): Promise<Task>;
  delete(id: string): Promise<boolean>;
  saveAll(tasks: Task[]): Promise<void>;
}

export class LocalTaskRepository implements ITaskRepository {
  async getAll(): Promise<Task[]> {
    return StorageAPI.getTasks();
  }

  async getById(id: string): Promise<Task | null> {
    const list = StorageAPI.getTasks();
    return list.find((t) => t.id === id) || null;
  }

  async create(task: Task): Promise<Task> {
    const list = StorageAPI.getTasks();
    list.unshift(task);
    StorageAPI.setTasks(list);
    return task;
  }

  async update(id: string, updates: Partial<Task>): Promise<Task> {
    const list = StorageAPI.getTasks();
    const index = list.findIndex((t) => t.id === id);
    if (index === -1) throw new Error('Task not found');
    const updated: Task = { ...list[index], ...updates };
    list[index] = updated;
    StorageAPI.setTasks(list);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const list = StorageAPI.getTasks();
    const filtered = list.filter((t) => t.id !== id);
    StorageAPI.setTasks(filtered);
    return true;
  }

  async saveAll(tasks: Task[]): Promise<void> {
    StorageAPI.setTasks(tasks);
  }
}

export const taskRepository: ITaskRepository = new LocalTaskRepository();
