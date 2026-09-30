"use client";

import React from 'react';
import { Link, useNavigate } from "@/lib/navigation";
import { Button } from '@/components/ui/Button';
import { PlatformIcon } from '@/components/shared/PlatformIcon';
import { ArrowRight, CheckCircle2, Layers, Calendar, Send, Sparkles, ShieldCheck } from 'lucide-react';
import { SUPPORTED_PLATFORMS, PLATFORMS_CONFIG } from '@/lib/constants/platforms';
import { UI_CLASSES } from '@/lib/constants/theme';
import { useAuth } from '@/hooks/useAuth';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const workflowSteps = [
    { num: '01', title: 'IDEA', desc: 'Capture raw thoughts and notes instantly before they slip away.' },
    { num: '02', title: 'PLAN', desc: 'Structure scripts, gear checklists, and shoot dates.' },
    { num: '03', title: 'CREATE', desc: 'Draft your canonical content assets and core copy.' },
    { num: '04', title: 'ORGANIZE', desc: 'Categorize by format, tags, status, and deadlines.' },
    { num: '05', title: 'ADAPT', desc: 'Custom platform versions tailored for YouTube, IG, TikTok.' },
    { num: '06', title: 'PREPARE', desc: 'Preview authentic layouts, character counts, and aspect ratios.' },
    { num: '07', title: 'SCHEDULE', desc: 'Set explicit dates, times, and timezones with durable execution.' },
    { num: '08', title: 'PUBLISH', desc: 'Independent multi-platform delivery with partial failure recovery.' },
    { num: '09', title: 'TRACK', desc: 'Inspect immutable publish attempt history and per-platform logs.' },
    { num: '10', title: 'ANALYZE', desc: 'Surface normalized views, likes, comments, and engagement.' },
  ];

  return (
    <div className="min-h-screen bg-[#F3F7F8] dark:bg-[#030712] text-slate-900 dark:text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white">
      {/* Public Navigation */}
      <header className="w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg ${UI_CLASSES.brandIconBg} flex items-center justify-center font-bold text-sm tracking-tight shadow-xs`}>
              CC
            </div>
            <span className="font-bold text-base tracking-tight text-slate-900 dark:text-slate-100">
              Creator Command Center
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#workflow" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Lifecycle
            </a>
            <a href="#platforms" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Supported Platforms
            </a>
            <a href="#principles" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Architecture
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Button variant="primary" size="sm" onClick={() => navigate('/dashboard')}>
                Enter Dashboard
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center flex-1 flex flex-col items-center justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 text-xs font-mono font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          <span>MVP1 CORE CREATOR OPERATIONS</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.15] max-w-3xl mb-6">
          Control without complexity.
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          The creator-first operating system for managing your content lifecycle from initial idea to multi-platform publishing.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {isAuthenticated ? 'Open Command Center' : 'Start Free Prototype'}
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/login')}>
            Sign In Existing Account
          </Button>
        </div>

        {/* Feature Pill Matrix */}
        <div className="mt-14 pt-10 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left w-full">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-xs">
            <Layers className="w-5 h-5 text-sky-600 dark:text-sky-400 mb-2" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">Content Family</h4>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">One Master → Multi-Version</p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-xs">
            <Calendar className="w-5 h-5 text-sky-600 dark:text-sky-400 mb-2" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">Scheduling</h4>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">Timezone-Aware & Reschedulable</p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-xs">
            <Send className="w-5 h-5 text-sky-600 dark:text-sky-400 mb-2" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">Publishing</h4>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">Partial Success & Selective Retry</p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-sky-600 dark:text-sky-400 mb-2" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">Reliability</h4>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">Background Execution Safe</p>
          </div>
        </div>
      </section>

      {/* 10-Step Workflow Section */}
      <section id="workflow" className="py-16 bg-white dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
              The 10-Stage Content Lifecycle
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Never lose context between your video ideas, editing progress, platform versions, and delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {workflowSteps.map((step) => (
              <div
                key={step.num}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 block mb-1">
                    {step.num}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">{step.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Platforms Section */}
      <section id="platforms" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
            5 Major Supported Platforms
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Dedicated adapters, validation rules, character constraints, and publishing states for each network.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {SUPPORTED_PLATFORMS.map((pid) => {
            const config = PLATFORMS_CONFIG[pid];
            return (
              <div
                key={pid}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center flex flex-col items-center shadow-xs"
              >
                <div className="mb-3">
                  <PlatformIcon platform={pid} size="lg" showBackground />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">{config.name}</h3>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Max {config.maxCaptionLength} chars
                </span>
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex flex-wrap gap-1 justify-center">
                  {config.supportedMediaTypes.map((t) => (
                    <span key={t} className="capitalize">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Creator Command Center. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/login" className="hover:underline">
              Log In
            </Link>
            <Link to="/signup" className="hover:underline">
              Register
            </Link>
            <span className="font-mono text-[11px] text-slate-400">MVP1 Prototype</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
