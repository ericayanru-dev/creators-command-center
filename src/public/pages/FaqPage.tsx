import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "@/lib/navigation";
import { PublicLayout } from "@/public/components/PublicLayout";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ChevronDown, Search, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface FaqItem {
  id: string;
  category: "general" | "content" | "publishing" | "platforms" | "prototype";
  categoryLabel: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  // General & Overview
  {
    id: "what-is-ccc",
    category: "general",
    categoryLabel: "General & Overview",
    question: "What is Creator Command Center (CCC)?",
    answer:
      "Creator Command Center is a creator-first operating system designed to manage your entire content lifecycle from raw idea to multi-platform publishing. It unifies concept capture, production call sheets, channel adaptation, timezone-aware scheduling, and resilient multi-platform distribution under one canonical model.",
  },
  {
    id: "who-is-it-for",
    category: "general",
    categoryLabel: "General & Overview",
    question: "Who is Creator Command Center built for?",
    answer:
      "CCC is built primarily for solo creators, video podcasters, digital educators, and small content production teams who publish across multiple social platforms (YouTube, Instagram, TikTok, Facebook, and LinkedIn) and need disciplined operational structure without corporate enterprise bloat.",
  },
  {
    id: "how-workflow-operates",
    category: "general",
    categoryLabel: "General & Overview",
    question: "What is the 10-stage content workflow?",
    answer:
      "The CCC workflow consists of ten sequential stages: 01. IDEA (raw capture), 02. PLAN (call sheet and checklists), 03. CREATE (canonical master drafting), 04. ORGANIZE (catalog filters & tags), 05. ADAPT (channel-specific tailoring), 06. PREPARE (feed previews & constraints), 07. SCHEDULE (localized timing), 08. PUBLISH (isolated broadcast), 09. TRACK (audit ledger & selective retry), and 10. ANALYZE (normalized aggregate reach).",
  },

  // Content Workflow & Adaptations
  {
    id: "canonical-master-model",
    category: "content",
    categoryLabel: "Content & Adaptations",
    question: "What is the Canonical Master Asset model?",
    answer:
      "Instead of creating separate disjointed records in multiple places for every network, CCC creates one canonical master item with a core title, narrative description, and media asset. You then create platform adaptations derived from this master, retaining full creative connection while allowing tailored hooks, hashtags, and descriptions for each network.",
  },
  {
    id: "platform-adaptations",
    category: "content",
    categoryLabel: "Content & Adaptations",
    question: "How do platform-specific adaptations work?",
    answer:
      "Under each content item, you can generate specific derivative versions for YouTube, Instagram, TikTok, LinkedIn, or Facebook. Each version maintains its own custom title, description/caption, and platform preview, allowing you to respect channel-specific etiquette (like YouTube chapters vs. Instagram hashtags) without losing connection to the original project.",
  },
  {
    id: "production-planning",
    category: "content",
    categoryLabel: "Content & Adaptations",
    question: "Can I track shooting checklists and call sheets?",
    answer:
      "Yes. Every content item includes a dedicated Production Planning subcomponent. You can track call times, shoot locations, talent notes, scene breakdowns, and an interactive equipment/gear checklist. Items can also link to production tasks with Low, Medium, and High priority tags.",
  },

  // Scheduling & Publishing Mechanics
  {
    id: "how-scheduling-works",
    category: "publishing",
    categoryLabel: "Scheduling & Publishing",
    question: "How does release scheduling and timezone conversion work?",
    answer:
      "When scheduling content in CCC, you specify the local date and time in your configured regional timezone (e.g. Africa/Lagos, America/New_York, Europe/London). The system converts this local datetime into a canonical UTC ISO timestamp with exact Daylight Saving Time offsets. This ensures execution engines know the exact moment to release, independent of where you or your servers are located.",
  },
  {
    id: "partial-failure-resilience",
    category: "publishing",
    categoryLabel: "Scheduling & Publishing",
    question: "What happens if publishing fails on one channel but succeeds on others?",
    answer:
      'CCC treats each target platform as an independent broadcast job. If publishing to YouTube and Facebook succeeds, but Instagram fails due to a network or token issue, the overall job is marked as PARTIAL_SUCCESS. The Publishing Ledger isolates the failure and provides a "Selective Retry" action that re-executes only the failed channel without duplicating posts on already published networks.',
  },
  {
    id: "cancel-and-reschedule",
    category: "publishing",
    categoryLabel: "Scheduling & Publishing",
    question: "Can I cancel or reschedule a scheduled post?",
    answer:
      "Yes. Active SCHEDULED posts can be modified at any time before release. Rescheduling opens a validation modal requiring a valid future date and time. Cancelling a scheduled publication asks for confirmation; if no other scheduled releases remain for that item, its lifecycle status safely reverts to [READY] so you can edit or reschedule it later.",
  },
  {
    id: "published-terminal-state",
    category: "publishing",
    categoryLabel: "Scheduling & Publishing",
    question: "Can a PUBLISHED post be cancelled or rescheduled?",
    answer:
      "No. In accordance with CCC lifecycle rules, PUBLISHED is an immutable terminal state. Once content is delivered to a social network, it cannot be rescheduled or cancelled from within the publishing ledger, preserving data integrity and avoiding conflicting states.",
  },

  // Accounts & Platforms
  {
    id: "supported-platforms",
    category: "platforms",
    categoryLabel: "Platforms & Accounts",
    question: "Which social platforms are supported in Creator Command Center?",
    answer:
      "CCC currently supports the five major creator distribution networks: YouTube (videos and shorts), Instagram (reels, images, carousels), TikTok (short videos), LinkedIn (text and video articles), and Facebook (posts and videos). Each platform enforces real domain rules including character maximums and supported media MIME types.",
  },
  {
    id: "account-connection-prototype",
    category: "platforms",
    categoryLabel: "Platforms & Accounts",
    question: "How are platform accounts connected in the prototype?",
    answer:
      "In this prototype, account connections are handled through an authentic channel authorization simulator. You can connect and disconnect accounts, inspect token health, and trigger simulated reconnection or reauthorization flows. Official third-party OAuth token persistence will be wired in the separate production migration phase.",
  },

  // Prototype & Pricing Status
  {
    id: "is-prototype-free",
    category: "prototype",
    categoryLabel: "Prototype & Pricing",
    question: "Is Creator Command Center free to use right now?",
    answer:
      "Yes. The current prototype preview is completely free and requires no credit card, subscription commitment, or billing agreement. You can register an evaluation account, configure creator settings, draft items, and test all publishing flows immediately.",
  },
  {
    id: "when-will-pricing-be-announced",
    category: "prototype",
    categoryLabel: "Prototype & Pricing",
    question: "When will production pricing and subscription plans be announced?",
    answer:
      "Commercial pricing tiers and subscription options will be published transparently prior to our production cloud release. In accordance with our product guidelines, we do not advertise fictitious or unapproved pricing values while operating in prototype mode.",
  },
  {
    id: "what-is-mvp2-roadmap",
    category: "prototype",
    categoryLabel: "Prototype & Pricing",
    question: 'What are the MVP2 features shown as "Coming Soon"?',
    answer:
      "Creator Command Center includes preview representations for 14 approved MVP2 capabilities: Projects, Multi-brand management, Multiple accounts on the same platform, Social inbox/comments, Campaigns & launches, Collaborations, Sponsorship management, Revenue tracking, Advanced analytics, Saved views, External calendar sync, Recurring tasks, Advanced publishing recovery, and a Business operations dashboard. These capabilities are designated as Coming Soon and will be activated in the subsequent release.",
  },
];

export const FaqPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "what-is-ccc": true,
    "canonical-master-model": true,
    "how-scheduling-works": true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "general", label: "General & Overview" },
    { id: "content", label: "Content & Adaptations" },
    { id: "publishing", label: "Scheduling & Publishing" },
    { id: "platforms", label: "Platforms & Accounts" },
    { id: "prototype", label: "Prototype & Pricing" },
  ];

  const filteredItems = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <PublicLayout>
      {/* Hero Header */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 text-xs font-mono font-medium mb-6">
          <HelpCircle className="w-3.5 h-3.5 text-sky-500" />
          <span>FREQUENTLY ASKED QUESTIONS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white mb-6 leading-tight">
          Answers & Technical Architecture
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
          Detailed, factual answers about Creator Command Center&apos;s workflow, supported social
          platforms, scheduling engine, and prototype status.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions by keyword, platform, or feature..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-xs"
            aria-label="Search frequently asked questions"
          />
        </div>
      </section>

      {/* Main FAQ Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        {/* Category Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#03055E] dark:bg-sky-600 text-white font-semibold shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              No questions found matching &quot;{searchQuery}&quot;.
            </p>
            <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")}>
              Clear Search Query
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map((item) => {
              const isOpen = !!openItems[item.id];
              return (
                <div
                  key={item.id}
                  className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    id={`faq-question-${item.id}`}
                  >
                    <div className="space-y-1 pr-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-sky-600 dark:text-sky-400">
                        {item.categoryLabel}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                        {item.question}
                      </h3>
                    </div>
                    <div
                      className={`p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-question-${item.id}`}
                      className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3"
                    >
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Still have questions? Callout */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Have a specific question not covered here?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Reach out to our team through our prototype contact channel.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate("/contact")}>
            Contact Support
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
};
