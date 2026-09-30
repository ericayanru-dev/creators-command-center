import React from 'react';
import { MediaAsset } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { FileVideo, Image as ImageIcon, CheckCircle2, Film } from 'lucide-react';

interface MediaPreviewModalProps {
  media: MediaAsset | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MediaPreviewModal: React.FC<MediaPreviewModalProps> = ({
  media,
  isOpen,
  onClose,
}) => {
  if (!media) return null;

  const isVideo = media.mimeType.startsWith('video') || media.fileName.endsWith('.mp4');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Media Preview: ${media.fileName}`}
      size="lg"
    >
      <div className="space-y-4">
        {/* Media Frame */}
        <div className="relative rounded-xl overflow-hidden bg-black/95 aspect-video flex items-center justify-center border border-slate-800 shadow-inner">
          {isVideo ? (
            <video
              src={media.previewUrl}
              controls
              className="max-h-full max-w-full rounded-lg"
              autoPlay
              muted
              playsInline
            />
          ) : (
            <img
              src={media.previewUrl}
              alt={media.fileName}
              className="max-h-full max-w-full object-contain"
            />
          )}
        </div>

        {/* Media Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Type</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
              {isVideo ? <Film className="w-3.5 h-3.5 text-sky-500" /> : <ImageIcon className="w-3.5 h-3.5 text-emerald-500" />}
              {media.mimeType}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block">File Size</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
              {(media.fileSize / (1024 * 1024)).toFixed(1)} MB
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Status</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {media.status}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Duration</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
              {media.durationSeconds ? `${Math.floor(media.durationSeconds / 60)}:${(media.durationSeconds % 60).toString().padStart(2, '0')}` : 'N/A'}
            </span>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Preview
          </Button>
        </div>
      </div>
    </Modal>
  );
};
