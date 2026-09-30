import React from 'react';
import { useNavigate } from "@/lib/navigation";
import { Content } from '@/types';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ArrowLeft, Edit3, Send, Trash2, Archive, GitFork } from 'lucide-react';
import { formatDateOnly } from '@/lib/utils';

interface ContentDetailHeaderProps {
  content: Content;
  onArchive: () => void;
  onDelete: () => void;
  onCreateDerivative?: () => void;
}

export const ContentDetailHeader: React.FC<ContentDetailHeaderProps> = ({
  content,
  onArchive,
  onDelete,
  onCreateDerivative,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
      <div className="space-y-1">
        <button
          type="button"
          onClick={() => navigate('/content')}
          className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 flex items-center gap-1 cursor-pointer font-mono mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Content
        </button>
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            {content.title}
          </h1>
          <StatusBadge status={content.status} showDot />
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 capitalize">
            {content.contentType}
          </span>
          {content.archived && (
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              ARCHIVED
            </span>
          )}
        </div>
        <p className="text-xs font-mono text-slate-400">
          Created {formatDateOnly(content.createdAt)} • Updated {formatDateOnly(content.updatedAt)}
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {onCreateDerivative && (
          <Button
            variant="outline"
            size="sm"
            onClick={onCreateDerivative}
            leftIcon={<GitFork className="w-3.5 h-3.5 rotate-90 text-sky-600" />}
          >
            Create Derivative
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/content/${content.id}/edit`)}
          leftIcon={<Edit3 className="w-3.5 h-3.5" />}
        >
          Edit
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate(`/publishing?contentId=${content.id}`)}
          leftIcon={<Send className="w-3.5 h-3.5" />}
        >
          Publish / Schedule
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onArchive}
          className="text-slate-500 hover:text-amber-600"
          title={content.archived ? 'Unarchive' : 'Archive'}
        >
          <Archive className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-slate-500 hover:text-rose-600"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
