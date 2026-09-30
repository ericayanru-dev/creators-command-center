"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from "@/lib/navigation";
import { Content, ContentStatus, ContentType, Platform } from '@/types';
import { ContentService } from '@/lib/services/content/contentService';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { LoadingState } from '@/components/shared/LoadingState';
import { useToast } from '@/components/shared/Toast';
import { formatDateOnly } from '@/lib/utils';
import {
  Plus,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Layers,
  Search,
  Filter,
  Eye,
  CheckCircle2,
} from 'lucide-react';

interface ColumnDef {
  status: ContentStatus;
  title: string;
  badgeBg: string;
  badgeText: string;
  description: string;
}

const COLUMNS: ColumnDef[] = [
  {
    status: 'IDEA',
    title: '💡 Ideas',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/60',
    badgeText: 'text-amber-800 dark:text-amber-300',
    description: 'Concepts & topics backlog',
  },
  {
    status: 'DRAFT',
    title: '📝 Scripting & Draft',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/60',
    badgeText: 'text-blue-800 dark:text-blue-300',
    description: 'Active production & outline',
  },
  {
    status: 'READY',
    title: '🎬 Ready to Publish',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    description: 'Assets verified & ready',
  },
  {
    status: 'SCHEDULED',
    title: '⏰ Scheduled',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/60',
    badgeText: 'text-indigo-800 dark:text-indigo-300',
    description: 'Queued for automated release',
  },
  {
    status: 'PUBLISHED',
    title: '🚀 Published',
    badgeBg: 'bg-slate-100 dark:bg-slate-800',
    badgeText: 'text-slate-800 dark:text-slate-200',
    description: 'Live across social channels',
  },
];

export const PipelinePage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [items, setItems] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'ALL'>('ALL');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await ContentService.listContent();
      setItems(data);
    } catch {
      toast('Failed to load pipeline data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMoveStage = async (contentId: string, nextStatus: ContentStatus, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await ContentService.updateStatus(contentId, nextStatus);
      toast(`Moved to ${nextStatus}`, 'success');
      loadData();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Cannot move to this stage';
      toast(msg, 'error');
    }
  };

  const filteredItems = items.filter((item) => {
    if (selectedPlatform !== 'ALL' && !item.targetPlatforms.includes(selectedPlatform)) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Content Pipeline
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
            Visual kanban board mapped to the authoritative Creator CC state machine
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/content')}
            leftIcon={<Layers className="w-3.5 h-3.5" />}
          >
            Table View
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/content/new')}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            New Idea
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        <select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value as Platform | 'ALL')}
          className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300"
          aria-label="Filter by target platform"
        >
          <option value="ALL">All Platforms</option>
          <option value="youtube">YouTube</option>
          <option value="instagram">Instagram</option>
          <option value="tiktok">TikTok</option>
          <option value="linkedin">LinkedIn</option>
          <option value="facebook">Facebook</option>
        </select>
      </div>

      {/* Kanban Board Container */}
      {isLoading ? (
        <LoadingState message="Loading pipeline columns..." />
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-6 items-start min-h-[600px] select-none">
          {COLUMNS.map((col) => {
            const colItems = filteredItems.filter((i) => i.status === col.status);
            return (
              <div
                key={col.status}
                className="w-80 shrink-0 bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl flex flex-col max-h-[820px]"
              >
                {/* Column Header */}
                <div className="p-3.5 border-b border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {col.title}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${col.badgeBg} ${col.badgeText}`}
                      >
                        {colItems.length}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                      {col.description}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate('/content/new')}
                    className="p-1 rounded-md hover:bg-white dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition-colors"
                    title="Add item"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Cards Container */}
                <div className="p-2.5 overflow-y-auto space-y-3 flex-1">
                  {colItems.length === 0 ? (
                    <div className="py-12 text-center text-xs text-slate-400 font-mono">
                      No items in this stage
                    </div>
                  ) : (
                    colItems.map((item) => (
                      <Card
                        key={item.id}
                        className="p-3.5 hover:border-sky-400 dark:hover:border-sky-600 transition-all shadow-2xs hover:shadow-md cursor-pointer group space-y-2.5 bg-white dark:bg-slate-900"
                        onClick={() => navigate(`/content/${item.id}`)}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">
                            {item.contentType.replace('_', ' ')}
                          </span>
                          {item.deadline && (
                            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDateOnly(item.deadline)}
                            </span>
                          )}
                        </div>

                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h4>

                        {item.description && (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        )}

                        {/* Platform Icons & Controls */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {item.targetPlatforms.map((p) => (
                              <PlatformIcon key={p} platform={p} size="xs" />
                            ))}
                          </div>

                          {/* Quick Stage Mover Controls */}
                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            {col.status === 'IDEA' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => handleMoveStage(item.id, 'DRAFT', e)}
                                className="text-[10px] text-sky-600 px-1.5 py-0.5 h-6"
                                rightIcon={<ArrowRight className="w-3 h-3" />}
                              >
                                Draft
                              </Button>
                            )}
                            {col.status === 'DRAFT' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => handleMoveStage(item.id, 'READY', e)}
                                className="text-[10px] text-emerald-600 px-1.5 py-0.5 h-6"
                                rightIcon={<ArrowRight className="w-3 h-3" />}
                              >
                                Ready
                              </Button>
                            )}
                            {col.status === 'READY' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/publishing?contentId=${item.id}`);
                                }}
                                className="text-[10px] text-indigo-600 px-1.5 py-0.5 h-6"
                                rightIcon={<ArrowRight className="w-3 h-3" />}
                              >
                                Publish
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
