import React from 'react';
import { useNavigate } from "@/lib/navigation";
import { Content } from '@/types';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { formatDateOnly } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface ContentTableViewProps {
  items: Content[];
}

export const ContentTableView: React.FC<ContentTableViewProps> = ({ items }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 text-slate-400 font-mono uppercase text-[10px]">
              <th className="py-3 px-4">Title & Format</th>
              <th className="py-3 px-4">Stage</th>
              <th className="py-3 px-4">Channels</th>
              <th className="py-3 px-4">Deadline</th>
              <th className="py-3 px-4">Last Updated</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.map((item) => (
              <tr
                key={item.id}
                onClick={() => navigate(`/content/${item.id}`)}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
              >
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">
                    {item.title}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 capitalize">
                    {item.contentType}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <StatusBadge status={item.status} showDot />
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5">
                    {item.targetPlatforms.map((p) => (
                      <PlatformIcon key={p} platform={p} size="xs" />
                    ))}
                  </div>
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-500">
                  {item.deadline ? formatDateOnly(item.deadline) : '—'}
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-400">
                  {formatDateOnly(item.updatedAt)}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <span className="text-sky-600 dark:text-sky-400 hover:underline font-mono inline-flex items-center gap-0.5">
                    View <ArrowRight className="w-3 h-3" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
