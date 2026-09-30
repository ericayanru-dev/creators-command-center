import React, { useState, useRef, useEffect } from 'react';
import { Content, MediaAsset } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MediaPreviewModal } from '@/features/content/components/MediaPreviewModal';
import { useToast } from '@/components/shared/Toast';
import {
  UploadCloud,
  Film,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Trash2,
  Eye,
  FileCheck,
  Sparkles,
  Loader2,
} from 'lucide-react';

interface ContentMediaSectionProps {
  content: Content;
  onUpdateMedia: (media: MediaAsset | undefined) => Promise<void>;
}

type UploadState = 'IDLE' | 'UPLOADING' | 'PROCESSING' | 'READY' | 'FAILED';

export const ContentMediaSection: React.FC<ContentMediaSectionProps> = ({
  content,
  onUpdateMedia,
}) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadState, setUploadState] = useState<UploadState>(
    content.mediaAsset?.status === 'READY'
      ? 'READY'
      : content.mediaAsset?.status === 'FAILED'
      ? 'FAILED'
      : 'IDLE'
  );
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingFileSizeMB, setUploadingFileSizeMB] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Track temporary browser preview object URLs to revoke them and prevent memory leaks
  const createdBlobUrlsRef = useRef<Set<string>>(new Set());

  const registerBlobUrl = (url: string) => {
    if (url && url.startsWith('blob:')) {
      createdBlobUrlsRef.current.add(url);
    }
  };

  const revokeBlobUrl = (url?: string) => {
    if (url && url.startsWith('blob:') && createdBlobUrlsRef.current.has(url)) {
      try {
        URL.revokeObjectURL(url);
        createdBlobUrlsRef.current.delete(url);
      } catch {
        // ignore
      }
    }
  };

  // Component unmount cleanup for any created object URLs
  useEffect(() => {
    return () => {
      createdBlobUrlsRef.current.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch {
          // ignore
        }
      });
      createdBlobUrlsRef.current.clear();
    };
  }, []);

  // Active or mock media asset
  const activeMedia = content.mediaAsset;

  const simulateUploadProcess = (file: { name: string; size: number; type: string; url: string; duration?: number }, shouldFail = false) => {
    const sizeInMB = file.size > 0 ? Number((file.size / (1024 * 1024)).toFixed(1)) : 0;
    setUploadingFileSizeMB(sizeInMB);
    setUploadState('UPLOADING');
    setUploadProgress(10);
    setErrorMessage('');

    let current = 10;
    const interval = setInterval(() => {
      current += 20;
      if (current >= 100) {
        clearInterval(interval);
        setUploadProgress(100);

        if (shouldFail) {
          setTimeout(() => {
            setUploadState('FAILED');
            setErrorMessage('Upload failed: Connection timed out while sending multi-part binary stream.');
            toast('Media upload failed. Please retry.', 'error');
          }, 600);
          return;
        }

        // Move to PROCESSING
        setUploadState('PROCESSING');
        setTimeout(async () => {
          const newMedia: MediaAsset = {
            id: `med_${Date.now()}`,
            userId: content.userId,
            contentId: content.id,
            fileName: file.name,
            fileSize: file.size,
            mimeType: file.type,
            status: 'READY',
            previewUrl: file.url,
            durationSeconds: file.duration,
            createdAt: new Date().toISOString(),
          };

          await onUpdateMedia(newMedia);
          setUploadState('READY');
          toast(`Media "${file.name}" uploaded & processed`, 'success');
        }, 1200);
      } else {
        setUploadProgress(current);
      }
    }, 200);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (activeMedia?.previewUrl) {
      revokeBlobUrl(activeMedia.previewUrl);
    }

    const objectUrl = URL.createObjectURL(file);
    registerBlobUrl(objectUrl);
    simulateUploadProcess({
      name: file.name,
      size: file.size,
      type: file.type || 'video/mp4',
      url: objectUrl,
      duration: file.type.startsWith('video') ? 148 : undefined,
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (activeMedia?.previewUrl) {
        revokeBlobUrl(activeMedia.previewUrl);
      }
      const objectUrl = URL.createObjectURL(file);
      registerBlobUrl(objectUrl);
      simulateUploadProcess({
        name: file.name,
        size: file.size,
        type: file.type || 'video/mp4',
        url: objectUrl,
        duration: file.type.startsWith('video') ? 148 : undefined,
      });
    }
  };

  const handleAttachPreset = (type: 'video' | 'image' | 'error') => {
    if (type === 'video') {
      simulateUploadProcess({
        name: `${content.title.toLowerCase().replace(/\s+/g, '_')}_master_1080p.mp4`,
        size: 28400000,
        type: 'video/mp4',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        duration: 180,
      });
    } else if (type === 'image') {
      simulateUploadProcess({
        name: 'cover_graphic_highres.png',
        size: 4200000,
        type: 'image/png',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      });
    } else {
      simulateUploadProcess(
        {
          name: 'corrupted_payload.mov',
          size: 19800000,
          type: 'video/quicktime',
          url: '',
        },
        true
      );
    }
  };

  const handleRemoveMedia = async () => {
    if (activeMedia?.previewUrl) {
      revokeBlobUrl(activeMedia.previewUrl);
    }
    await onUpdateMedia(undefined);
    setUploadState('IDLE');
    setUploadProgress(0);
    setUploadingFileSizeMB(0);
    toast('Media asset removed from content', 'info');
  };

  const handleRetry = () => {
    handleAttachPreset('video');
  };

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Media Management
          </h2>
        </div>
        {uploadState === 'READY' && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3" />
            Media Ready
          </span>
        )}
      </div>

      {/* STATE 1: IDLE / DROPZONE */}
      {uploadState === 'IDLE' && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            isDragOver
              ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/20'
              : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-slate-50/40 dark:bg-slate-800/30'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*,image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
          <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Drag & drop media here
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
            or browse files from your computer (MP4, MOV, PNG, JPG up to 500MB)
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              Select File
            </Button>
            <span className="text-xs text-slate-400">or prototype preset:</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAttachPreset('video')}
              className="text-xs"
            >
              + Attach Sample Video
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAttachPreset('image')}
              className="text-xs"
            >
              + Attach Image
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAttachPreset('error')}
              className="text-xs text-rose-500 hover:text-rose-600"
            >
              Simulate Failure
            </Button>
          </div>
        </div>
      )}

      {/* STATE 2: UPLOADING */}
      {uploadState === 'UPLOADING' && (
        <div className="p-6 rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/30 dark:bg-sky-950/20 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-sky-600 dark:text-sky-400" />
              Uploading media asset...
            </span>
            <span className="font-mono font-bold text-sky-600 dark:text-sky-400">{uploadProgress}%</span>
          </div>

          {/* Graphical Progress Bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-sky-600 dark:bg-sky-500 h-full transition-all duration-200 ease-out"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            <span>
              {uploadingFileSizeMB > 0
                ? `Uploading... ${((uploadProgress / 100) * uploadingFileSizeMB).toFixed(1)} MB of ${uploadingFileSizeMB.toFixed(1)} MB`
                : `Uploading... ${uploadProgress}%`}
            </span>
            <button
              type="button"
              onClick={() => setUploadState('IDLE')}
              className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* STATE 3: PROCESSING */}
      {uploadState === 'PROCESSING' && (
        <div className="p-6 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20 text-center space-y-2">
          <Loader2 className="w-8 h-8 animate-spin text-amber-600 mx-auto" />
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Processing media...
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Generating transcoded multi-platform formats, aspect ratio crops, and audio waveforms.
          </p>
        </div>
      )}

      {/* STATE 4: READY */}
      {uploadState === 'READY' && activeMedia && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-14 h-14 rounded-lg bg-black/90 flex items-center justify-center shrink-0 border border-slate-700 overflow-hidden relative group">
                {activeMedia.mimeType.startsWith('video') ? (
                  <Film className="w-6 h-6 text-sky-400" />
                ) : (
                  <img
                    src={activeMedia.previewUrl}
                    alt={activeMedia.fileName}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                  {activeMedia.fileName}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-500 font-mono">
                  <span>{(activeMedia.fileSize / (1024 * 1024)).toFixed(1)} MB</span>
                  <span>•</span>
                  <span>{activeMedia.mimeType}</span>
                  {activeMedia.durationSeconds && (
                    <>
                      <span>•</span>
                      <span>
                        {Math.floor(activeMedia.durationSeconds / 60)}:
                        {(activeMedia.durationSeconds % 60).toString().padStart(2, '0')}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreviewModal(true)}
                leftIcon={<Eye className="w-3.5 h-3.5" />}
              >
                Preview
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveMedia}
                className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                leftIcon={<Trash2 className="w-3.5 h-3.5" />}
              >
                Remove
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 bg-emerald-50/50 dark:bg-emerald-950/20 px-3 py-2 rounded-lg border border-emerald-100 dark:border-emerald-900/40">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Asset validated for multi-platform broadcasting. Ready to link with channel adaptations.</span>
          </div>
        </div>
      )}

      {/* STATE 5: FAILED */}
      {uploadState === 'FAILED' && (
        <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/30 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Upload failed</span>
          </div>
          <p className="text-xs text-rose-600 dark:text-rose-300">
            {errorMessage || 'A network transfer error occurred while uploading this asset.'}
          </p>
          <div className="flex items-center gap-2 pt-1">
            <Button
              variant="danger"
              size="sm"
              onClick={handleRetry}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Retry
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUploadState('IDLE')}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      <MediaPreviewModal
        media={activeMedia || null}
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
      />
    </Card>
  );
};
