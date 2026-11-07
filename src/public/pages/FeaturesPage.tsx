import React from "react";
import { Link, useNavigate } from "@/lib/navigation";
import { PublicLayout } from "@/public/components/PublicLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PlatformIcon } from "@/components/shared/PlatformIcon";
import {
  Lightbulb,
  ClipboardList,
  FileEdit,
  FolderTree,
  SlidersHorizontal,
  Eye,
  Calendar,
  Send,
  History,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Globe,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { SUPPORTED_PLATFORMS, PLATFORMS_CONFIG } from "@/lib/constants/platforms";
import { useAuth } from "@/hooks/useAuth";

export const FeaturesPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const stages = [
    {
      stage: "01",
      title: "IDEA",
      heading: "Capture Thoughts Before They Fade",
      summary:
        "A distraction-free quick idea capture system allows creators to log video concepts, rough titles, and hooks the second inspiration strikes.",
      icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
      badge: "Capture",
      capabilities: [
        "Quick Idea modal with autofocus for rapid brainstorming",
        "Rough hook and narrative direction capture",
        "Automatic transition into DRAFT status when ready for production",
        "Idea catalog filtering to browse unprocessed concepts",
      ],
      prototypeCallout: 'Access via "+ Quick Idea" in the Content Library.',
    },
    {
      stage: "02",
      title: "PLAN",
      heading: "Production Planning & Call Sheets",
      summary:
        "Structure shooting sessions with dedicated call sheets, location requirements, scene breakdowns, and gear checklists.",
      icon: <ClipboardList className="w-5 h-5 text-sky-500" />,
      badge: "Pre-Production",
      capabilities: [
        "Interactive shooting checklist with custom gear & prop items",
        "Call time, shoot location, and talent assignment fields",
        "Production notes and scene-by-scene script cues",
        "Linked production tasks with Low, Medium, and High priority tags",
      ],
      prototypeCallout: "Built directly into each Content Item detail view.",
    },
    {
      stage: "03",
      title: "CREATE",
      heading: "Draft Canonical Master Content",
      summary:
        "Maintain one authoritative master asset for your narrative rather than copying and pasting across siloed spreadsheets.",
      icon: <FileEdit className="w-5 h-5 text-indigo-500" />,
      badge: "Drafting",
      capabilities: [
        "Canonical title, comprehensive editorial description, and core caption",
        "High-resolution master media asset attachment and status validation",
        "Content format categorization (Long Video, Short/Reel, Image, Audio, Text)",
        "Tagging system for topic discovery and cross-referencing",
      ],
      prototypeCallout: 'Create new content via the "+ New Content Item" flow.',
    },
    {
      stage: "04",
      title: "ORGANIZE",
      heading: "Filterable Catalog & Global Search",
      summary:
        "A comprehensive grid and table library with stage filters, format filters, archive flags, and instant keyboard search.",
      icon: <FolderTree className="w-5 h-5 text-emerald-500" />,
      badge: "Organization",
      capabilities: [
        "Global search bar (⌘K) indexing content, production tasks, and social handles",
        "View mode switching between responsive card grid and dense data table",
        "Filter by lifecycle stage: Idea, Draft, Ready, Scheduled, and Published",
        "Channel-specific filtering and archive status toggling",
      ],
      prototypeCallout: "Explore in the Content Library and Header search bar.",
    },
    {
      stage: "05",
      title: "ADAPT",
      heading: "Channel-Specific Content Adaptations",
      summary:
        "Never publish generic copy. Creator Command Center creates derivative versions tailored to the unique etiquette of every network.",
      icon: <SlidersHorizontal className="w-5 h-5 text-purple-500" />,
      badge: "Adaptation",
      capabilities: [
        "Independent title and caption overrides per destination platform",
        "YouTube-tailored descriptions, SEO chapters, and tags",
        "Instagram and TikTok hashtag strategies and hook adjustments",
        "Professional LinkedIn commentary and Facebook group formatting",
      ],
      prototypeCallout: 'Manage in Content Detail under "Platform Adaptations".',
    },
    {
      stage: "06",
      title: "PREPARE",
      heading: "Authentic Channel Previews",
      summary:
        "Inspect how your post will render inside native feeds before a single byte is sent over the wire.",
      icon: <Eye className="w-5 h-5 text-cyan-500" />,
      badge: "Pre-Flight",
      capabilities: [
        "Platform Approximation Preview modal matching real social UI layouts",
        "Real-time character count limits and constraint checking",
        "Format and aspect ratio compliance checks per platform domain rules",
        "Visual preview of attached media alongside channel handle and avatar",
      ],
      prototypeCallout: 'Click "Preview Feed Appearance" on any platform version.',
    },
    {
      stage: "07",
      title: "SCHEDULE",
      heading: "Timezone-Aware Release Scheduling",
      summary:
        "Queue releases for exact future moments with robust timezone localization and prerequisite verification.",
      icon: <Calendar className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
      badge: "Scheduling",
      capabilities: [
        "Timezone conversion engine supporting America, Europe, Asia, and Africa zones",
        "Pre-Flight verification modal displaying connected accounts and media assets",
        "Prevention of past-datetime scheduling and terminal state mutations",
        "Editorial calendar month grid with day-level event drawers",
      ],
      prototypeCallout: "Test in the Publishing Wizard and Editorial Calendar.",
    },
    {
      stage: "08",
      title: "PUBLISH",
      heading: "Independent Multi-Channel Delivery",
      summary:
        "Broadcast to YouTube, Instagram, TikTok, Facebook, and LinkedIn simultaneously with partial-failure isolation.",
      icon: <Send className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      badge: "Execution",
      capabilities: [
        "Publish Now with two-step review confirmation modal",
        "Independent channel execution: failure on one platform does not cancel others",
        "Explicit status outcomes: SUCCESS, PARTIAL_SUCCESS, or FAILED",
        "Background execution progress modal keeping creators informed",
      ],
      prototypeCallout: 'Execute via "Publish Now" on any READY content item.',
    },
    {
      stage: "09",
      title: "TRACK",
      heading: "Publishing Ledger & Selective Retry",
      summary:
        "An immutable record of every publication attempt, complete with retry counts, cancellation controls, and error diagnostics.",
      icon: <History className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      badge: "Reliability",
      capabilities: [
        "Audit ledger displaying timestamp, channel, handle, and attempt counts",
        "Selective Retry: re-run only failed channels without re-posting to succeeded ones",
        "Reschedule or Cancel active SCHEDULED posts prior to release",
        "Automatic content state reversion to READY when schedules are cancelled",
      ],
      prototypeCallout: 'View in Publishing Page under "History & Queue".',
    },
    {
      stage: "10",
      title: "ANALYZE",
      heading: "Normalized Performance Intelligence",
      summary:
        "Review aggregated audience response across all connected channels without logging into five separate creator studios.",
      icon: <TrendingUp className="w-5 h-5 text-teal-500" />,
      badge: "Analytics",
      capabilities: [
        "Aggregated view counts, likes, comments, and shares across all platforms",
        "30-day net audience and subscriber growth metrics",
        "Content pipeline velocity counters (Drafts, Scheduled, Published)",
        "Immediate notification feed for publish events and production milestones",
      ],
      prototypeCallout: "View live totals on the Creator Command Center Dashboard.",
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Header */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 text-xs font-mono font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-sky-500" />
          <span>ESTABLISHED MVP1 WORKFLOW CAPABILITIES</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white mb-6 leading-tight">
          Every Stage of Your Content Lifecycle, Unified.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
          Creator Command Center eliminates fragmented spreadsheets and disjointed tools. Follow
          your ideas through a canonical 10-stage operating system designed specifically for solo
          creators and digital studios.
        </p>

        {/* Workflow Summary Flow Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-4xl mx-auto p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          {[
            "IDEA",
            "PLAN",
            "CREATE",
            "ORGANIZE",
            "ADAPT",
            "PREPARE",
            "SCHEDULE",
            "PUBLISH",
            "TRACK",
            "ANALYZE",
          ].map((s, idx) => (
            <React.Fragment key={s}>
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                {idx + 1}. {s}
              </span>
              {idx < 9 && (
                <span className="text-slate-300 dark:text-slate-700 font-mono text-xs hidden sm:inline">
                  →
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* 10-Stage Grid Details */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stages.map((item) => (
            <Card
              key={item.stage}
              className="p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all border-slate-200/90 dark:border-slate-800"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 shadow-xs">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                        STAGE {item.stage}
                      </span>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        {item.title}
                      </h2>
                    </div>
                  </div>
                  <Badge variant="blue">{item.badge}</Badge>
                </div>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                  {item.heading}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.summary}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-mono uppercase font-bold text-slate-400 block">
                    Key Prototype Capabilities
                  </span>
                  <ul className="space-y-1.5">
                    {item.capabilities.map((c, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{item.prototypeCallout}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Supported Platforms Section */}
      <section className="py-16 bg-white dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
              Built for Today&apos;s 5 Essential Creator Platforms
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Each network implements domain-specific constraints, character maximums, and media
              requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SUPPORTED_PLATFORMS.map((pid) => {
              const config = PLATFORMS_CONFIG[pid];
              return (
                <div
                  key={pid}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900 flex flex-col items-center text-center shadow-xs"
                >
                  <PlatformIcon platform={pid} size="lg" showBackground />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-3 mb-1">
                    {config.name}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Max {config.maxCaptionLength.toLocaleString()} characters
                  </span>
                  <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex flex-wrap gap-1 justify-center text-[10px] font-mono uppercase text-slate-500">
                    {config.supportedMediaTypes.map((t) => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white dark:bg-slate-800/80 border border-slate-800 shadow-xl space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
            Ready to test the creator-first workflow?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Experience the complete 10-stage lifecycle inside the active Creator Command Center
            prototype. No payment or complex setup required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/signup")}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {isAuthenticated ? "Open Dashboard" : "Explore Free Prototype"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-white border-slate-700 hover:bg-slate-800"
              onClick={() => navigate("/pricing")}
            >
              View Pricing & Prototype Details
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
