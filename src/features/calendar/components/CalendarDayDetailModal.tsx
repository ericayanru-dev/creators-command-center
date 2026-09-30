import React from 'react';
import { useNavigate } from "@/lib/navigation";
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { Publication, Content } from '@/types';
import { formatDateOnly, formatTimeOnly } from '@/lib/utils';
import { Clock, Send, Edit, ArrowRight } from 'lucide-react';

interface CalendarDayDetailModalProps {
  dateStr: string | null;
  pubs: Publication[];
  deadlines: Content[];
  onClose: () => void;
  onReschedule: (pub: Publication) => void;
  onCancel?: (pub: Publication) => void;
}

export const CalendarDayDetailModal: React.FC<CalendarDayDetailModalProps> = ({
  dateStr,
  pubs,
  deadlines,
  onClose,
  onReschedule,
  onCancel,
}) => {
  const navigate = useNavigate();

  if (!dateStr) return null;

  return (
    <Modal isOpen={!!dateStr} onClose={onClose} title={`Events for ${formatDateOnly(dateStr)}`} size="md">
      <div className="space-y-5">
        {/* Publications section */}
        <div>
          <h4 className="text-xs font-mono uppercase font-bold text-slate-400 mb-2">
            Scheduled & Released Publications ({pubs.length})
          </h4>
          {pubs.length === 0 ? (
            <p className="text-xs text-slate-400 font-mono py-2">No publications on this date.</p>
          ) : (
            <div className="space-y-2">
              {pubs.map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5">
                    <PlatformIcon platform={p.platform} size="sm" showBackground />
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                        {p.contentTitle}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {p.scheduledAt ? formatTimeOnly(p.scheduledAt) : 'Released'} • {p.accountHandle}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {p.status === 'SCHEDULED' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            onClose();
                            onReschedule(p);
                          }}
                        >
                          Reschedule
                        </Button>
                        {onCancel && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              onClose();
                              onCancel(p);
                            }}
                            className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          >
                            Cancel
                          </Button>
                        )}
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        onClose();
                        navigate(`/content/${p.contentId}`);
                      }}
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Deadlines section */}
        <div>
          <h4 className="text-xs font-mono uppercase font-bold text-slate-400 mb-2">
            Content Deadlines ({deadlines.length})
          </h4>
          {deadlines.length === 0 ? (
            <p className="text-xs text-slate-400 font-mono py-2">No deadlines on this date.</p>
          ) : (
            <div className="space-y-2">
              {deadlines.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    onClose();
                    navigate(`/content/${c.id}`);
                  }}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-amber-50/30 dark:bg-amber-950/20 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                        {c.title}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 uppercase">
                        Stage: {c.status}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
