import React from 'react';
import { useNavigate } from "@/lib/navigation";
import { Task } from '@/types';
import { formatDateOnly } from '@/lib/utils';
import { Check, Trash2, Calendar, Layers, Edit2 } from 'lucide-react';

interface TaskItemRowProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit?: (task: Task) => void;
}

export const TaskItemRow: React.FC<TaskItemRowProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const isCompleted = task.status === 'COMPLETED';
  const isOverdue = !isCompleted && new Date(task.dueAt).getTime() < Date.now();

  return (
    <div
      className={`p-3.5 sm:p-4 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
        isCompleted
          ? 'bg-slate-50/50 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800'
          : isOverdue
          ? 'bg-rose-50/30 dark:bg-rose-950/20 border-rose-200/80 dark:border-rose-900/60'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
      }`}
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 cursor-pointer transition-colors ${
            isCompleted
              ? 'bg-emerald-600 border-emerald-600 text-white'
              : 'border-slate-300 dark:border-slate-600 hover:border-sky-500'
          }`}
          aria-label={isCompleted ? 'Mark task incomplete' : 'Mark task completed'}
        >
          {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-xs font-semibold block ${
                isCompleted
                  ? 'line-through text-slate-400'
                  : 'text-slate-900 dark:text-slate-100'
              }`}
            >
              {task.title}
            </span>
            <span
              className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded font-bold ${
                task.priority === 'HIGH'
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
                  : task.priority === 'MEDIUM'
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}
            >
              {task.priority}
            </span>
          </div>

          {task.description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 pt-0.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span className={isOverdue ? 'text-rose-600 font-bold' : ''}>
                {formatDateOnly(task.dueAt)}
              </span>
            </span>

            {task.contentId && (
              <span
                onClick={() => navigate(`/content/${task.contentId}`)}
                className="hover:text-sky-600 flex items-center gap-1 cursor-pointer truncate"
              >
                <Layers className="w-3 h-3" />
                <span className="truncate">{task.contentTitle || 'Linked Content'}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {onEdit && (
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="p-1.5 text-slate-400 hover:text-sky-600 rounded cursor-pointer transition-colors"
            title="Edit task"
            aria-label={`Edit task: ${task.title}`}
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="p-1.5 text-slate-400 hover:text-rose-600 rounded cursor-pointer transition-colors"
          title="Delete task"
          aria-label={`Delete task: ${task.title}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
