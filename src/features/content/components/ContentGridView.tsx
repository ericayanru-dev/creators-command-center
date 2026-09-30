import React from 'react';
import { useNavigate } from "@/lib/navigation";
import { Content } from '@/types';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { formatDateOnly } from '@/lib/utils';
import { ArrowRight, Calendar } from 'lucide-react';

interface ContentGridViewProps {
  items: Content[];
}

export const ContentGridView: React.FC<ContentGridViewProps> = ({ items }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <Card
          key={item.id}
          onClick={() => navigate(`/content/${item.id}`)}
          className="p-4 cursor-pointer hover:border-sky-500/60 dark:hover:border-sky-500/60 transition-all space-y-3 flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <StatusBadge status={item.status} showDot />
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                {item.contentType}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                {item.caption || item.description || 'No caption or description provided'}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              {item.targetPlatforms.map((p) => (
                <PlatformIcon key={p} platform={p} size="xs" />
              ))}
            </div>

            <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
              {item.deadline ? (
                <>
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{formatDateOnly(item.deadline)}</span>
                </>
              ) : (
                <span>{formatDateOnly(item.updatedAt)}</span>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
