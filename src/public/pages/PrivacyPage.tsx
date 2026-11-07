import React from "react";
import { Link } from "@/lib/navigation";
import { PublicLayout } from "@/public/components/PublicLayout";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Shield, AlertCircle } from "lucide-react";

export const PrivacyPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="blue">Legal Policy</Badge>
            <span className="text-xs font-mono text-slate-400">Last updated: October 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            How Creator Command Center handles creator information, local storage, and evaluation
            data.
          </p>
        </div>

        {/* Draft Notice */}
        <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-mono font-bold uppercase text-amber-900 dark:text-amber-200">
              [DRAFT DOCUMENT • SUBJECT TO FINAL LEGAL & REGULATORY REVIEW]
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              This document reflects the data handling practices of the current Creator Command
              Center prototype. Formal legal agreements, regional GDPR/CCPA data controllers, and
              production third-party data processing contracts will be designated prior to
              commercial launch.
            </p>
          </div>
        </div>

        {/* Policy Body */}
        <Card className="p-6 sm:p-10 border-slate-200/90 dark:border-slate-800 space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              1. Information We Collect in the Prototype
            </h2>
            <p>
              Creator Command Center operates primarily as an interactive frontend evaluation
              environment. In this prototype, data collection is limited to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>
                <strong>Account Credentials:</strong> Name, email address, password hash, and
                creator profile attributes (such as creator type and regional timezone) stored
                locally within your browser session.
              </li>
              <li>
                <strong>Content Data:</strong> Master titles, descriptions, captions, tags,
                checklist items, platform version copy, and media asset metadata created during your
                workflow.
              </li>
              <li>
                <strong>Client Preferences:</strong> Dark/light mode theme preference, notification
                toggles, and UI display settings.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              2. How Your Data is Stored
            </h2>
            <p>
              In the current prototype architecture, content items and profile settings are
              persisted within your browser&apos;s local storage and in-memory application
              repositories. Your content items are not transmitted to or harvested by external
              machine learning pipelines or advertising networks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              3. Connected Social Accounts
            </h2>
            <p>
              The current prototype includes a simulated platform connection environment for
              YouTube, Instagram, TikTok, LinkedIn, and Facebook. No real-world third-party OAuth
              access tokens are stored or transmitted in the prototype preview. When production
              OAuth integration is introduced, tokens will be encrypted using enterprise standard
              protocols and will never be shared with unauthorized third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              4. Creator Intellectual Property
            </h2>
            <p>
              You retain 100% ownership, copyright, and intellectual property rights over all
              scripts, copy, media assets, titles, and video plans you draft or organize within
              Creator Command Center. Creator Command Center asserts no claim of ownership over
              creator content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              5. Data Deletion and Export
            </h2>
            <p>You maintain complete control over your evaluation data:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>
                You may export your complete data bundle (content library, tasks, platform states)
                as a formatted JSON document at any time via <strong>Settings → Export Data</strong>
                .
              </li>
              <li>
                You may permanently purge your creator account and all associated local state via{" "}
                <strong>Settings → Danger Zone → Permanently Delete Account</strong>.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              6. Contact for Privacy Inquiries
            </h2>
            <p>
              For questions regarding prototype data privacy or future production data governance,
              please reach out via our public{" "}
              <Link to="/contact" className="text-sky-600 dark:text-sky-400 hover:underline">
                Contact Page
              </Link>
              .
            </p>
          </section>
        </Card>
      </div>
    </PublicLayout>
  );
};
