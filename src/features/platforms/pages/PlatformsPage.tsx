"use client";

import React, { useEffect, useState } from 'react';
import { Platform, SocialAccount, PlatformAccountStatus } from '@/types';
import { PlatformService } from '@/lib/services/platforms/platformService';
import { PLATFORM_CONFIGS } from '@/lib/constants/platforms';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { LoadingState } from '@/components/shared/LoadingState';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { useToast } from '@/components/shared/Toast';
import { ComingSoonModal, ComingSoonFeatureType } from '@/components/shared/ComingSoonModal';
import { formatDateOnly, formatTimeOnly } from '@/lib/utils';
import {
  Share2,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Unlink,
  Link as LinkIcon,
  ShieldCheck,
  Info,
  Clock,
  ExternalLink,
  Plus,
  Inbox,
} from 'lucide-react';

const SUPPORTED_PLATFORMS: {
  id: Platform;
  name: string;
  description: string;
  defaultHandle: string;
}[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    description: 'Direct publishing to YouTube Studio for Long-form (16:9) and YouTube Shorts (9:16).',
    defaultHandle: '@code_creator',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Instagram Graph API for Reels, Feed Posts, and Carousel distribution.',
    defaultHandle: '@creator_daily',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    description: 'TikTok Content Posting API for vertical 9:16 short video distribution.',
    defaultHandle: '@creator_shorts',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'LinkedIn Community Management API for text posts, video native, and carousels.',
    defaultHandle: 'in/eric-dollar',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    description: 'Facebook Pages API for video cross-posting and creator status updates.',
    defaultHandle: 'fb.com/creatorcc',
  },
];

export const PlatformsPage: React.FC = () => {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comingSoonFeature, setComingSoonFeature] = useState<ComingSoonFeatureType | null>(null);

  // Connect Modal
  const [connectingPlatform, setConnectingPlatform] = useState<Platform | null>(null);
  const [handleInput, setHandleInput] = useState('');
  const [isSubmittingConnect, setIsSubmittingConnect] = useState(false);

  // Disconnect Dialog
  const [accountToDisconnect, setAccountToDisconnect] = useState<SocialAccount | null>(null);

  // Reauthorizing status tracking
  const [reauthorizingId, setReauthorizingId] = useState<string | null>(null);

  const loadAccounts = async () => {
    setIsLoading(true);
    try {
      const data = await PlatformService.getAccounts();
      setAccounts(data);
    } catch (error: unknown) {
      toast('Failed to load platform accounts', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleOpenConnect = (p: Platform, defHandle: string) => {
    setConnectingPlatform(p);
    setHandleInput(defHandle);
  };

  const handleConfirmConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connectingPlatform) return;
    setIsSubmittingConnect(true);
    try {
      await PlatformService.connectAccount(connectingPlatform, handleInput.trim());
      toast(`Successfully connected ${connectingPlatform}!`, 'success');
      setConnectingPlatform(null);
      loadAccounts();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to connect platform';
      toast(msg, 'error');
    } finally {
      setIsSubmittingConnect(false);
    }
  };

  const handleReauthorize = async (platform: Platform) => {
    setReauthorizingId(platform);
    try {
      await PlatformService.reauthorizeAccount(platform);
      toast(`Account reauthorized and token refreshed!`, 'success');
      loadAccounts();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Reauthorization failed';
      toast(msg, 'error');
    } finally {
      setReauthorizingId(null);
    }
  };

  const handleConfirmDisconnect = async () => {
    if (!accountToDisconnect) return;
    try {
      await PlatformService.disconnectAccount(accountToDisconnect.id);
      toast(`${accountToDisconnect.platform} disconnected`, 'success');
      setAccountToDisconnect(null);
      loadAccounts();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to disconnect account';
      toast(msg, 'error');
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Connected Social Platforms
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
            Manage channel authorizations, token health, and API capabilities
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setComingSoonFeature('social_inbox')}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer transition-colors"
            aria-label="Social Inbox (Coming in MVP2)"
          >
            <Inbox className="w-3.5 h-3.5 text-purple-500" />
            <span>Social Inbox</span>
            <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
              MVP2
            </span>
          </button>
          <button
            type="button"
            onClick={() => setComingSoonFeature('multi_account')}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer transition-colors"
            aria-label="Multiple Accounts per Platform (Coming in MVP2)"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Multiple Accounts</span>
            <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
              MVP2
            </span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <LoadingState message="Checking platform connections & token status..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SUPPORTED_PLATFORMS.map((plat) => {
            const account = accounts.find((a) => a.platform === plat.id);
            const isConnected = account && account.status === 'CONNECTED';
            const needsReauth = account && account.status === 'NEEDS_REAUTHORIZATION';
            const hasError = account && account.status === 'CONNECTION_ERROR';
            const isReauthorizing = reauthorizingId === plat.id;
            const config = PLATFORM_CONFIGS[plat.id];

            return (
              <Card
                key={plat.id}
                className={`flex flex-col justify-between transition-all ${
                  needsReauth
                    ? 'border-rose-300 dark:border-rose-900 bg-rose-50/20'
                    : isConnected
                    ? 'border-slate-200 dark:border-slate-800'
                    : 'border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40'
                }`}
              >
                <div>
                  {/* Platform Card Header */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <PlatformIcon platform={plat.id} size="md" showBackground />
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                          {plat.name}
                        </h3>
                        <span className="text-[11px] font-mono text-slate-400">
                          {isConnected || needsReauth ? account?.accountHandle : 'Not connected'}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div>
                      {isConnected ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          <CheckCircle2 className="w-3 h-3" /> Connected
                        </span>
                      ) : needsReauth ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 animate-pulse">
                          <AlertTriangle className="w-3 h-3" /> Reauth Required
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
                          Disconnected
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {plat.description}
                  </p>

                  {/* Warning banner for needsReauth */}
                  {needsReauth && (
                    <div className="p-3 mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-300 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>OAuth Token Expired / Revoked</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">
                        Publishing is temporarily paused for this channel until reauthorization is completed.
                      </p>
                    </div>
                  )}

                  {/* Platform Technical Limits Pill Matrix */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px] font-mono space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Max Caption:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {config?.maxCaptionLength.toLocaleString()} chars
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Supported Media:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 capitalize">
                        {config?.supportedMediaTypes.join(', ')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Aspect Ratios:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {config?.mediaAspectRatios.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="text-[10px] font-mono text-slate-400">
                    {account?.lastSyncedAt && (
                      <span>Synced: {formatDateOnly(account.lastSyncedAt)}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {needsReauth && (
                      <Button
                        variant="danger"
                        size="sm"
                        isLoading={isReauthorizing}
                        onClick={() => handleReauthorize(plat.id)}
                        leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                      >
                        Reauthorize Now
                      </Button>
                    )}

                    {isConnected && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setComingSoonFeature('multi_account')}
                          className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-xs"
                          leftIcon={<Plus className="w-3.5 h-3.5" />}
                        >
                          Add Channel (MVP2)
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setAccountToDisconnect(account)}
                          className="text-slate-500 hover:text-rose-600"
                          leftIcon={<Unlink className="w-3.5 h-3.5" />}
                        >
                          Disconnect
                        </Button>
                      </div>
                    )}

                    {!isConnected && !needsReauth && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleOpenConnect(plat.id, plat.defaultHandle)}
                        leftIcon={<LinkIcon className="w-3.5 h-3.5" />}
                      >
                        Connect Account
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Multiple Accounts MVP2 Roadmap Card */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              MVP2 Roadmap
            </span>
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Multiple Accounts per Social Platform
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Linking multiple channels per network (e.g. Main YouTube + Clips, secondary TikTok accounts) is scheduled for Creator CC MVP2.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setComingSoonFeature('multi_account')}
          className="text-xs shrink-0"
        >
          View MVP2 Details
        </Button>
      </div>

      {/* Connect Account Modal */}
      <Modal
        isOpen={!!connectingPlatform}
        onClose={() => setConnectingPlatform(null)}
        title={`Connect ${connectingPlatform ? connectingPlatform.toUpperCase() : ''} Account`}
        description="Authenticate your social channel to enable automated multi-platform publishing."
      >
        <form onSubmit={handleConfirmConnect} className="space-y-4">
          <Input
            label="Channel Handle / Page Name"
            required
            value={handleInput}
            onChange={(e) => setHandleInput(e.target.value)}
            placeholder="e.g. @yourcreatorhandle"
          />

          <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/60 text-xs text-sky-800 dark:text-sky-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span>Simulated Direct OAuth 2.0 Flow</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              In this prototype environment, authorizing grants publication scope, video upload permission, and analytics read access.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="ghost" size="sm" onClick={() => setConnectingPlatform(null)}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isSubmittingConnect}
            >
              Grant Permissions & Connect
            </Button>
          </div>
        </form>
      </Modal>

      {/* Disconnect Dialog */}
      <ConfirmDialog
        isOpen={!!accountToDisconnect}
        title="Disconnect Social Account"
        message={`Are you sure you want to disconnect ${accountToDisconnect?.platform} (${accountToDisconnect?.accountHandle})? Scheduled releases destined for this channel will pause until reconnected.`}
        confirmLabel="Disconnect Channel"
        variant="danger"
        onConfirm={handleConfirmDisconnect}
        onCancel={() => setAccountToDisconnect(null)}
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
