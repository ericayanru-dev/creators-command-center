import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Publication } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import {
  getUserTimezone,
  getTimezoneLabel,
  localDateTimeToUtcIso,
  utcIsoToLocalDateTime,
} from '@/lib/utils/timezone';

interface CalendarRescheduleModalProps {
  publication: Publication | null;
  onClose: () => void;
  onConfirm: (pubId: string, newDateTimeIso: string) => void;
  isLoading: boolean;
  timezone?: string;
}

export const CalendarRescheduleModal: React.FC<CalendarRescheduleModalProps> = ({
  publication,
  onClose,
  onConfirm,
  isLoading,
  timezone,
}) => {
  const { user } = useAuth();
  const effectiveTimezone =
    timezone || publication?.displayTimezone || getUserTimezone(user);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('18:00');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    if (publication && publication.scheduledAt) {
      const local = utcIsoToLocalDateTime(publication.scheduledAt, effectiveTimezone);
      setDate(local.date);
      setTime(local.time);
    } else {
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const local = utcIsoToLocalDateTime(tomorrow.toISOString(), effectiveTimezone);
      setDate(local.date);
      setTime('18:00');
    }
  }, [publication, effectiveTimezone]);

  if (!publication) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) {
      setError('Date and time are required.');
      return;
    }
    const iso = localDateTimeToUtcIso(date, time, effectiveTimezone);
    if (new Date(iso).getTime() <= Date.now()) {
      setError('Cannot reschedule in the past. New time must be in the future.');
      return;
    }
    setError(null);
    onConfirm(publication.id, iso);
  };

  return (
    <Modal isOpen={!!publication} onClose={onClose} title="Reschedule Release Time" size="sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
            Target Content
          </span>
          <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
            {publication.contentTitle} ({publication.platform})
          </p>
        </div>

        {error && (
          <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs font-medium text-rose-700 dark:text-rose-300">
            {error}
          </div>
        )}

        <Input
          label="New Date"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setError(null);
          }}
          required
        />

        <Input
          label={`New Time (${getTimezoneLabel(effectiveTimezone)})`}
          type="time"
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
            setError(null);
          }}
          required
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={isLoading}>
            Update Schedule
          </Button>
        </div>
      </form>
    </Modal>
  );
};

