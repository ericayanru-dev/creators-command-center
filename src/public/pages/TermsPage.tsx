import React from "react";
import { PublicLayout } from "@/public/components/PublicLayout";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AlertCircle } from "lucide-react";

export const TermsPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="blue">Legal Terms</Badge>
            <span className="text-xs font-mono text-slate-400">Last updated: October 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Conditions governing access and evaluation of the Creator Command Center prototype.
          </p>
        </div>

        {/* Draft Notice */}
        <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-mono font-bold uppercase text-amber-900 dark:text-amber-200">
              [DRAFT DOCUMENT • SUBJECT TO FINAL LEGAL & COMMERCIAL REVIEW]
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              These terms govern current prototype usage. Final contractual terms of service,
              commercial SLA provisions, and jurisdiction-specific dispute arbitration clauses will
              be introduced upon production launch.
            </p>
          </div>
        </div>

        {/* Terms Body */}
        <Card className="p-6 sm:p-10 border-slate-200/90 dark:border-slate-800 space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              1. Acceptance of Evaluation Terms
            </h2>
            <p>
              By accessing, registering an account, or interacting with the Creator Command Center
              prototype (&quot;Service&quot;), you acknowledge that you have read, understood, and
              agreed to these evaluation terms. If you do not agree, you must discontinue using the
              application.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              2. Nature of the Prototype
            </h2>
            <p>
              Creator Command Center is currently offered as a non-commercial software prototype
              designed to demonstrate and validate creator operational workflows. Certain
              capabilities, including third-party OAuth social authorizations and publishing
              execution, are simulated within this prototype environment.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              3. Creator Content Rights
            </h2>
            <p>
              Creators retain exclusive title, ownership, and copyright over all content, scripts,
              video assets, titles, and media created within the application. Creator Command Center
              does not claim any ownership rights over your creative intellectual property.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              4. Permitted and Prohibited Conduct
            </h2>
            <p>
              You agree to use Creator Command Center solely for lawful purposes. You agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>
                Upload or organize content that infringes upon third-party intellectual property or
                privacy rights.
              </li>
              <li>
                Distribute malicious scripts, automated exploits, or security vulnerability probes
                against the service.
              </li>
              <li>
                Attempt to bypass prototype rate limits or simulate denial-of-service conditions.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              5. Disclaimer of Warranties
            </h2>
            <p>
              THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS
              WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR CONTINUOUS UPTIME. BECAUSE THIS
              IS A PROTOTYPE, DATA STORED IN LOCAL STORAGE MAY BE CLEARED BY YOUR BROWSER. CREATORS
              ARE ADVISED TO RETAIN CANONICAL BACKUPS OF PRODUCTION MEDIA ASSETS.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              6. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by applicable law, Creator Command Center and its
              developers shall not be liable for any indirect, incidental, special, consequential,
              or punitive damages arising out of your use or inability to use the prototype service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              7. Termination
            </h2>
            <p>
              You may terminate these terms at any time by deleting your account via Settings or
              discontinuing use of the application. Creator Command Center reserves the right to
              modify or discontinue the prototype evaluation environment at any time.
            </p>
          </section>
        </Card>
      </div>
    </PublicLayout>
  );
};
