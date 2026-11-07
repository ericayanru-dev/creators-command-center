import React from 'react';
import { Link, useNavigate } from '@/lib/navigation';
import { PublicLayout } from '@/public/components/PublicLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Target,
  Layers,
  ShieldCheck,
  Compass,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <PublicLayout>
      {/* Hero Header */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 text-xs font-mono font-medium mb-6">
          <Target className="w-3.5 h-3.5 text-sky-500" />
          <span>OUR MISSION & WORKFLOW PHILOSOPHY</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white mb-6 leading-tight">
          Control Without Complexity
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-4">
          Creator Command Center (CCC) is the creator-first operating system designed to manage your entire content lifecycle from raw thought to multi-platform delivery.
        </p>
      </section>

      {/* The Problem We Solve */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="amber">The Problem</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-2 mb-3">
            The Modern Creator Workflow is Broken
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Independent creators and small digital media studios face severe operational friction as their distribution expands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-3 border-slate-200/90 dark:border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Tool Fragmentation & Context Loss
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Video ideas live in phone notes apps; shooting gear in to-do managers; release dates in spreadsheets; and descriptions in native platform uploaders.
              Context is stripped away at every handoff, leading to forgotten ideas and rushed releases.
            </p>
          </Card>

          <Card className="p-6 space-y-3 border-slate-200/90 dark:border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              One-Size-Fits-All Scheduling
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Existing social media scheduling platforms treat all networks identically, encouraging creators to blast the same generic caption and aspect ratio to YouTube, TikTok, and LinkedIn.
              Doing it right meant tedious manual rewriting in five separate browser tabs.
            </p>
          </Card>

          <Card className="p-6 space-y-3 border-slate-200/90 dark:border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Black-Box Delivery Failures
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              When multi-platform schedulers encounter a failed API upload, they often fail silently or mark the whole bundle as failed.
              Creators are left guessing which channels published and which failed, risking accidental duplicate posts or silent drop-offs.
            </p>
          </Card>
        </div>
      </section>

      {/* The Creator Command Center Approach */}
      <section className="py-16 bg-white dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="blue">Our Philosophy</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-2 mb-3">
              The Four Principles of Creator Command Center
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              How we approach software design to respect a creator&apos;s time, focus, and craft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  1. The Canonical Master Asset Model
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Every release starts with a single authoritative creative record: title, narrative description, core media asset, and production plan.
                Platform-specific versions (YouTube long-form, Instagram reels, TikTok hooks) are derived adaptations of this master record—ensuring creative unity without duplicate entry.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  2. Partial-Success Resilience & Selective Retry
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                If a broadcast to three channels succeeds on YouTube and LinkedIn but fails on Instagram due to an expired token, Creator Command Center isolates the failure.
                It reports exact error reasons and enables <strong>Selective Retry</strong> for only the failed destination without double-posting to successful ones.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  3. Rigid Timezone Localization
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Creators operate across international boundaries. All scheduled dates and times are converted to UTC ISO format for durable background execution, while displaying transparently in the creator&apos;s chosen regional timezone with exact Daylight Saving Time offsets.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  4. Authentic Platform Constraint Checking
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Rather than letting external APIs reject your content after scheduling, Creator Command Center enforces platform constraints before execution.
                Character maximums, media requirements, and layout previews ensure what you see is what your audience receives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scope and Architecture Status */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            About the Current Prototype Preview
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            This deployment of Creator Command Center represents our complete MVP1 prototype implementation built using React, TypeScript, and Vite.
            It is designed to validate human workflow ergonomics, data relationships, and scheduling mechanics before our subsequent cloud database and production API integration.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>• MVP1 Core: Complete</span>
            <span>• MVP2 Preview: Integrated</span>
            <span>• Client Architecture: React 19 + TypeScript</span>
            <span>• Design Language: Tailored Token System</span>
          </div>
        </div>

        {/* Action Link Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <Link
            to="/features"
            className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
          >
            Explore all 10 workflow stages in detail →
          </Link>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            {isAuthenticated ? 'Enter Dashboard' : 'Start Free Prototype'}
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
};
