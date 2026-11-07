import React from "react";
import { Link, useNavigate } from "@/lib/navigation";
import { PublicLayout } from "@/public/components/PublicLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <PublicLayout>
      {/* Hero Header */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 text-xs font-mono font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>PROTOTYPE EVALUATION • FULL ACCESS ACTIVE</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white mb-6 leading-tight">
          Transparent, Creator-First Pricing
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
          Creator Command Center is currently operating in an active prototype evaluation phase. All
          core workflow tools are accessible without billing requirements or credit card collection.
        </p>

        {/* Pricing Notice Callout */}
        <div className="max-w-3xl mx-auto p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-left flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-mono font-bold uppercase text-amber-900 dark:text-amber-200">
              Pricing Transparency Notice
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              Commercial subscription rates, payment frequencies, and production cloud tiers have
              not yet been finalized. Rather than advertising unapproved pricing or mock discount
              rates, the configurations below outline current prototype availability and planned
              production structure.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tiers Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Card 1: Active Prototype Free Access */}
          <Card className="p-6 sm:p-8 flex flex-col justify-between border-2 border-sky-500 dark:border-sky-500 shadow-md relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#03055E] dark:bg-sky-600 text-white text-[10px] font-mono font-bold tracking-wider uppercase">
              Current Active Access
            </div>

            <div className="space-y-5">
              <div>
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
                  Evaluation Tier
                </span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                  Prototype Preview
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Full evaluation access to test the complete 10-stage content lifecycle and
                  multi-platform publishing flow.
                </p>
              </div>

              <div className="py-3 border-y border-slate-100 dark:border-slate-800">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
                    $0
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    / prototype evaluation
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 mt-1 block">
                  ✓ No credit card or billing commitment required
                </span>
              </div>

              <div className="space-y-2.5">
                <span className="text-[11px] font-mono uppercase font-bold text-slate-400 block">
                  Included Prototype Capabilities
                </span>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>All 10 stages: Idea through Analyze</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>5 social adapters: YouTube, IG, TikTok, FB, LinkedIn</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Timezone-localized release scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Publishing simulator with partial-failure isolation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Production tasks and gear checklist call sheets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Selective retry on failed channel broadcasts</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center"
                onClick={() => navigate(isAuthenticated ? "/dashboard" : "/signup")}
              >
                {isAuthenticated ? "Open Command Center" : "Start Free Prototype"}
              </Button>
            </div>
          </Card>

          {/* Card 2: Production Creator Pro (Pending Configuration) */}
          <Card className="p-6 sm:p-8 flex flex-col justify-between border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                    Planned Tier
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                    Creator Pro
                  </h2>
                </div>
                <Badge variant="amber">Pending Terms</Badge>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Dedicated production tier for active solo creators publishing across multiple social
                channels.
              </p>

              <div className="py-3 border-y border-slate-100 dark:border-slate-800 font-mono">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-slate-500 dark:text-slate-400">
                    [TBD at Launch]
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Subscription terms under final commercial review
                </span>
              </div>

              <div className="space-y-2.5">
                <span className="text-[11px] font-mono uppercase font-bold text-slate-400 block">
                  Planned Production Scope
                </span>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>Durable cloud persistence (PostgreSQL / Prisma)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>Official 3P OAuth platform token authorizations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>Real-world social API publishing & background worker</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>Persistent cloud media storage (R2 / S3)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>Automated token health monitoring & renewal</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="outline"
                size="md"
                className="w-full justify-center cursor-not-allowed opacity-80"
                disabled
              >
                Available at Production Release
              </Button>
            </div>
          </Card>

          {/* Card 3: Studio / Multi-Brand (MVP2 Roadmap) */}
          <Card className="p-6 sm:p-8 flex flex-col justify-between border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                    MVP2 Scope
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                    Studio & Multi-Brand
                  </h2>
                </div>
                <Badge variant="neutral">MVP2 Roadmap</Badge>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                For creators operating multiple distinct brands, secondary channels, or managing
                client media accounts.
              </p>

              <div className="py-3 border-y border-slate-100 dark:border-slate-800 font-mono">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-slate-500 dark:text-slate-400">
                    [TBD at Launch]
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Feature definitions active in MVP2 preview
                </span>
              </div>

              <div className="space-y-2.5">
                <span className="text-[11px] font-mono uppercase font-bold text-slate-400 block">
                  Approved MVP2 Features
                </span>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>Multi-Brand workspace isolation & brand kits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>Multiple accounts on the same social network</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>Centralized social comment inbox stream</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>Campaign milestones & episodic project tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>Sponsorship deliverable & sponsor contract logging</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="outline"
                size="md"
                className="w-full justify-center cursor-not-allowed opacity-80"
                disabled
              >
                Roadmap Item
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Pricing FAQs Section */}
      <section className="py-16 bg-white dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Pricing & Prototype Questions
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Factual clarity on prototype access, billing terms, and production roadmaps.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-sky-500 shrink-0" />
                Is Creator Command Center completely free right now?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                Yes. The current application is a functional prototype designed to validate the
                10-stage creator workflow, platform adapters, and resilient scheduling. No credit
                card or billing details are ever requested during prototype usage.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-sky-500 shrink-0" />
                Why are future prices listed as TBD?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                Per product governance policy, Creator Command Center does not display placeholder
                or unverified pricing figures. As infrastructure agreements for background workers,
                social API throughput, and media hosting are finalized, production pricing will be
                clearly published before any subscription billing commences.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-sky-500 shrink-0" />
                How can I start testing?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                Click <strong>Get Started</strong> or navigate to the registration screen. You can
                configure your creator profile, connect simulated accounts, and begin scheduling
                posts right away.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              to="/faq"
              className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
            >
              View all general application FAQs →
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
