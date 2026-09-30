import React, { useState } from 'react';
import { Link } from "@/lib/navigation";
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Task, TaskPriority } from '@/types';
import { CheckSquare, Check, Plus, Clock } from 'lucide-react';
import { formatDateOnly } from '@/lib/utils';

interface ContentTasksSectionProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (title: string, priority: TaskPriority) => void;
}

export const ContentTasksSection: React.FC<ContentTasksSectionProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
}) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAddTask(taskTitle.trim(), priority);
      setTaskTitle('');
    }
  };

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Action Items & Tasks
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Checklist of preparation, review, and editing duties for this content piece
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400">{tasks.length} tasks</span>
          <Link
            to="/tasks"
            className="text-[11px] font-mono text-sky-600 dark:text-sky-400 hover:underline"
          >
            View All →
          </Link>
        </div>
      </div>

      <form onSubmit={handleAdd} className="flex flex-col sm:flex-row items-center gap-2">
        <Input
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="New task (e.g. upload thumbnail, review hashtags)..."
          className="flex-1"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
          className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-2 text-xs font-mono"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <Button type="submit" variant="primary" size="md">
          Add Task
        </Button>
      </form>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {tasks.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-400 font-mono">
            No tasks linked to this content piece yet.
          </div>
        ) : (
          tasks.map((task) => {
            const isCompleted = task.status === 'COMPLETED';
            return (
              <div
                key={task.id}
                onClick={() => onToggleTask(task.id)}
                className="py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/40 rounded-lg px-2 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {isCompleted && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <span
                      className={`text-xs font-medium block ${
                        isCompleted ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {task.title}
                    </span>
                    {task.description && (
                      <span className="text-[11px] text-slate-400 line-clamp-1">
                        {task.description}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded font-bold ${
                      task.priority === 'HIGH'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
                        : task.priority === 'MEDIUM'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {task.priority}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {formatDateOnly(task.dueAt)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};
