"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from "@/lib/navigation";
import { Publication, Content } from '@/types';
import { PublishingService } from '@/lib/services/publishing/publishingService';
import { ContentService } from '@/lib/services/content/contentService';
import { LoadingState } from '@/components/shared/LoadingState';
import { useToast } from '@/components/shared/Toast';
import { useAuth } from '@/hooks/useAuth';
import { getUserTimezone } from '@/lib/utils/timezone';

// Subcomponents
import { CalendarHeader } from '@/features/calendar/components/CalendarHeader';
import { CalendarGrid } from '@/features/calendar/components/CalendarGrid';
import { CalendarDayDetailModal } from '@/features/calendar/components/CalendarDayDetailModal';
import { CalendarRescheduleModal } from '@/features/calendar/components/CalendarRescheduleModal';
import { CancelPublicationModal } from '@/features/publishing/components/CancelPublicationModal';
import { ComingSoonModal, ComingSoonFeatureType } from '@/components/shared/ComingSoonModal';

export const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const userTimezone = getUserTimezone(user);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [publications, setPublications] = useState<Publication[]>([]);
  const [contentList, setContentList] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comingSoonFeature, setComingSoonFeature] = useState<ComingSoonFeatureType | null>(null);

  // Modals state
  const [selectedDayEvents, setSelectedDayEvents] = useState<{
    dateStr: string;
    pubs: Publication[];
    deadlines: Content[];
  } | null>(null);

  const [selectedPubToReschedule, setSelectedPubToReschedule] = useState<Publication | null>(null);
  const [selectedPubToCancel, setSelectedPubToCancel] = useState<Publication | null>(null);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [pubs, content] = await Promise.all([
        PublishingService.getPublications(),
        ContentService.listContent(),
      ]);
      setPublications(pubs);
      setContentList(content);
    } catch {
      toast('Failed to load calendar events', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleSelectDay = (dateStr: string, pubs: Publication[], deadlines: Content[]) => {
    setSelectedDayEvents({ dateStr, pubs, deadlines });
  };

  const handleConfirmReschedule = async (pubId: string, newDateTimeIso: string) => {
    setIsRescheduling(true);
    try {
      await PublishingService.reschedulePublication(pubId, newDateTimeIso, userTimezone);
      toast('Publication release rescheduled', 'success');
      setSelectedPubToReschedule(null);
      loadData();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to reschedule';
      toast(msg, 'error');
    } finally {
      setIsRescheduling(false);
    }
  };

  const handleConfirmCancel = async () => {
    if (!selectedPubToCancel) return;
    setIsCancelling(true);
    try {
      await PublishingService.cancelScheduledPublication(selectedPubToCancel.id);
      toast(`Scheduled release cancelled for ${selectedPubToCancel.platform}`, 'success');
      setSelectedPubToCancel(null);
      loadData();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to cancel publication';
      toast(msg, 'error');
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Calendar Header with Navigation & Quick Actions */}
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
        onNewPublish={() => navigate('/publishing')}
        timezone={userTimezone}
        onOpenCalendarSync={() => setComingSoonFeature('calendar_sync')}
        onOpenCampaigns={() => setComingSoonFeature('campaigns')}
      />

      {/* Main Calendar Month Grid */}
      {isLoading ? (
        <LoadingState message="Organizing timeline matrix..." />
      ) : (
        <CalendarGrid
          currentDate={currentDate}
          publications={publications}
          contentList={contentList}
          onSelectDay={handleSelectDay}
        />
      )}

      {/* Selected Day Event Drawer / Modal */}
      {selectedDayEvents && (
        <CalendarDayDetailModal
          dateStr={selectedDayEvents.dateStr}
          pubs={selectedDayEvents.pubs}
          deadlines={selectedDayEvents.deadlines}
          onClose={() => setSelectedDayEvents(null)}
          onReschedule={(pub) => setSelectedPubToReschedule(pub)}
          onCancel={(pub) => setSelectedPubToCancel(pub)}
        />
      )}

      {/* Reschedule Dialog Modal */}
      {selectedPubToReschedule && (
        <CalendarRescheduleModal
          publication={selectedPubToReschedule}
          onClose={() => setSelectedPubToReschedule(null)}
          onConfirm={handleConfirmReschedule}
          isLoading={isRescheduling}
          timezone={userTimezone}
        />
      )}

      {/* Cancellation Dialog Modal */}
      <CancelPublicationModal
        isOpen={!!selectedPubToCancel}
        onClose={() => setSelectedPubToCancel(null)}
        onConfirm={handleConfirmCancel}
        isLoading={isCancelling}
        publication={selectedPubToCancel}
      />

      {/* Coming Soon Modal */}
      {comingSoonFeature && (
        <ComingSoonModal
          isOpen={!!comingSoonFeature}
          onClose={() => setComingSoonFeature(null)}
          feature={comingSoonFeature}
        />
      )}
    </div>
  );
};
