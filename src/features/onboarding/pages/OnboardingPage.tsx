"use client";

import React, { useState } from 'react';
import { useNavigate } from "@/lib/navigation";
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { useAuth } from '@/hooks/useAuth';
import { Platform, CreatorProfile } from '@/types';
import { COMMON_TIMEZONES, SUPPORTED_PLATFORMS, PLATFORMS_CONFIG } from '@/lib/constants/platforms';
import { UI_CLASSES } from '@/lib/constants/theme';
import { Check, ArrowRight, Globe, User, Layers, CheckCircle2 } from 'lucide-react';
import { PlatformService } from '@/lib/services/platforms/platformService';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, completeOnboarding } = useAuth();

  const [step, setStep] = useState(1);
  const [displayName, setDisplayName] = useState(profile?.displayName || user?.name || '');
  const [creatorType, setCreatorType] = useState<CreatorProfile['creatorType']>(profile?.creatorType || 'YouTuber');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(profile?.primaryPlatforms || ['youtube', 'instagram']);
  const [timezone, setTimezone] = useState(user?.timezone || 'Africa/Lagos');
  const [isConnectingPlatform, setIsConnectingPlatform] = useState<string | null>(null);
  const [connectedPlatforms, setConnectedPlatforms] = useState<Record<string, boolean>>({ youtube: true });
  const [error, setError] = useState<string | null>(null);

  const creatorTypes: CreatorProfile['creatorType'][] = [
    'YouTuber',
    'TikTok Creator',
    'Instagram Creator',
    'Educator',
    'Podcaster',
    'Blogger',
    'Personal Brand',
    'Other',
  ];

  const togglePlatform = (p: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((item) => item !== p) : [...prev, p]
    );
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setError('Name is required');
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleStep2Submit = () => {
    if (selectedPlatforms.length === 0) {
      setError('Please select at least one platform');
      return;
    }
    setError(null);
    setStep(3);
  };

  const handleStep3Submit = () => {
    setError(null);
    setStep(4);
  };

  const handleConnectInOnboarding = async (p: Platform) => {
    setIsConnectingPlatform(p);
    try {
      await PlatformService.connectAccount(p, `@${displayName.toLowerCase().replace(/\s+/g, '')}`);
      setConnectedPlatforms((prev) => ({ ...prev, [p]: true }));
    } catch (error: unknown) {
      console.error('Failed to connect platform in onboarding:', error);
    } finally {
      setIsConnectingPlatform(null);
    }
  };

  const finishOnboarding = () => {
    completeOnboarding({
      displayName,
      creatorType,
      primaryPlatforms: selectedPlatforms,
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F3F7F8] dark:bg-[#030712] flex flex-col justify-center items-center p-4 selection:bg-sky-500 selection:text-white">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Progress Header */}
        <div className="px-8 pt-7 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-7 h-7 rounded-lg ${UI_CLASSES.brandIconBg} flex items-center justify-center font-bold text-xs`}>
              CC
            </div>
            <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-slate-100">
              Creator Command Center
            </span>
          </div>
          <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
            Step {step} of 4
          </span>
        </div>

        {/* Step Content */}
        <div className="p-8">
          {/* STEP 1: Name and Creator Type */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  What should we call you?
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Tell us about your creative persona and format focus.
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 text-xs">
                  {error}
                </div>
              )}

              <Input
                label="Display name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Eric"
                required
                autoFocus
              />

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  What kind of creator are you?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {creatorTypes.map((type) => {
                    const isSelected = creatorType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setCreatorType(type)}
                        className={`p-3 text-xs rounded-xl border text-center transition-all cursor-pointer font-medium ${
                          isSelected
                            ? 'bg-sky-50 dark:bg-slate-800 border-sky-600 dark:border-sky-500 text-sky-950 dark:text-sky-300 font-semibold shadow-xs'
                            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="submit" variant="primary" size="lg">
                  Continue
                </Button>
              </div>
            </form>
          )}

          {/* STEP 2: Platforms Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  Which platforms do you create for?
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Select all that apply. You can connect your live channels next or later from Platforms.
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 text-xs">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SUPPORTED_PLATFORMS.map((p) => {
                  const isSelected = selectedPlatforms.includes(p);
                  const config = PLATFORMS_CONFIG[p];
                  return (
                    <div
                      key={p}
                      onClick={() => togglePlatform(p)}
                      className={`p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-sky-600 dark:border-sky-500 bg-sky-50/50 dark:bg-slate-800/80'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <PlatformIcon platform={p} size="md" showBackground />
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{config.name}</p>
                          <p className="text-[11px] text-slate-500 font-mono">Max {config.maxCaptionLength} chars</p>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isSelected
                            ? `${UI_CLASSES.buttonBrand} border-transparent`
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button variant="ghost" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button variant="primary" size="lg" onClick={handleStep2Submit}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Timezone Selection */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  Your timezone
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Is this correct? Your timezone is used for exact scheduled publishing and calendar timelines.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/60">
                <span className="text-[10px] font-mono uppercase font-bold text-sky-700 dark:text-sky-300 tracking-wider block mb-1">
                  AUTO-DETECTED TIMEZONE
                </span>
                <p className="text-lg font-mono font-bold text-slate-900 dark:text-slate-100">{timezone}</p>
              </div>

              <div className="space-y-2">
                <Select
                  label="Or select a different timezone"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  options={COMMON_TIMEZONES}
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button variant="ghost" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button variant="primary" size="lg" onClick={handleStep3Submit}>
                  Yes, continue
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: All Set & Connect Platforms */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  You&apos;re all set!
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Your command center workspace is ready.
                </p>
              </div>

              {/* Profile Summary Card */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-4 space-y-2.5 text-xs font-mono">
                <div className="flex justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2">
                  <span className="text-slate-500">Display Name:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{displayName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2">
                  <span className="text-slate-500">Creator Type:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{creatorType}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2">
                  <span className="text-slate-500">Platforms:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100 capitalize">
                    {selectedPlatforms.join(', ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Timezone:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{timezone}</span>
                </div>
              </div>

              {/* Connect Accounts Now */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Connect Platforms (Optional)
                </h4>
                <div className="space-y-2">
                  {selectedPlatforms.map((p) => {
                    const isConnected = !!connectedPlatforms[p];
                    return (
                      <div
                        key={p}
                        className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                      >
                        <div className="flex items-center gap-3">
                          <PlatformIcon platform={p} size="sm" />
                          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 capitalize">
                            {p}
                          </span>
                        </div>
                        {isConnected ? (
                          <span className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Connected
                          </span>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            isLoading={isConnectingPlatform === p}
                            onClick={() => handleConnectInOnboarding(p)}
                          >
                            Connect
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-2.5">
                <Button variant="primary" size="lg" className="w-full" onClick={finishOnboarding}>
                  Go to Dashboard
                </Button>
                <button
                  type="button"
                  onClick={finishOnboarding}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 text-center py-1 cursor-pointer"
                >
                  Connect accounts later
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
