import React from 'react';
import { Link } from '@/lib/navigation';
import { PublicLayout } from '@/public/components/PublicLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AlertCircle, Cookie } from 'lucide-react';

export const CookiesPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="blue">Data Storage & Cookies</Badge>
            <span className="text-xs font-mono text-slate-400">Last updated: October 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <span>Cookie & Storage Policy</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Information regarding cookies, browser local storage, and session tokens utilized by Creator Command Center.
          </p>
        </div>

        {/* Draft Notice */}
        <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-mono font-bold uppercase text-amber-900 dark:text-amber-200">
              [DRAFT DOCUMENT • SUBJECT TO FINAL REGULATORY REVIEW]
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              This policy explains how the Creator Command Center web application stores data on your local device. The prototype does not deploy third-party advertising cookies or cross-site tracking scripts.
            </p>
          </div>
        </div>

        {/* Policy Body */}
        <Card className="p-6 sm:p-10 border-slate-200/90 dark:border-slate-800 space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              1. What Are Cookies and Local Storage?
            </h2>
            <p>
              Cookies and HTML5 Local Storage are browser mechanisms that allow web applications to remember information between visits, persist your login session, and store user preferences locally on your device without sending sensitive data to unauthorized third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              2. How Creator Command Center Uses Local Storage
            </h2>
            <p>
              In this prototype environment, Creator Command Center uses browser <code>localStorage</code> and session tokens strictly for functional and security purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li>
                <strong>Authentication & Session:</strong> Stores your active demo token and profile session information so you stay signed in across browser refreshes.
              </li>
              <li>
                <strong>Theme Preference:</strong> Stores whether you prefer dark mode or light mode (<code>ccc_theme</code>) to eliminate screen flickering upon reload.
              </li>
              <li>
                <strong>Prototype Content & Tasks:</strong> In the prototype evaluation environment, your created ideas, drafts, platform versions, and scheduled publications are held in local state for rapid testing.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              3. No Third-Party Tracking or Advertising Cookies
            </h2>
            <p>
              Creator Command Center does not employ behavioral marketing cookies, advertising networks, retargeting pixels, or third-party analytics trackers. Your workflow data remains private to your browser environment.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              4. Managing and Clearing Storage
            </h2>
            <p>
              You can clear locally stored prototype data at any time via your browser&apos;s site settings or by using the <strong>Reset / Clear Local Data</strong> options within the application Settings page. Note that clearing local storage will reset your prototype evaluation session.
            </p>
          </section>
        </Card>
      </div>
    </PublicLayout>
  );
};
