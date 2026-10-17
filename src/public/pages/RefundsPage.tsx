import React from 'react';
import { Link } from '@/lib/navigation';
import { PublicLayout } from '@/public/components/PublicLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AlertCircle, RotateCcw } from 'lucide-react';

export const RefundsPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="blue">Billing Governance</Badge>
            <span className="text-xs font-mono text-slate-400">Last updated: October 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Refund & Cancellation Policy
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Subscription cancellation, evaluation access terms, and billing resolution guidelines.
          </p>
        </div>

        {/* Draft Notice */}
        <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-mono font-bold uppercase text-amber-900 dark:text-amber-200">
              [DRAFT DOCUMENT • SUBJECT TO FINAL COMMERCIAL REVIEW]
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              Creator Command Center is currently in a prototype evaluation phase with zero fees assessed. The terms outlined below represent the proposed policy framework for commercial subscriptions and remain subject to finalization prior to payment gateway activation.
            </p>
          </div>
        </div>

        {/* Policy Body */}
        <Card className="p-6 sm:p-10 border-slate-200/90 dark:border-slate-800 space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              1. Prototype Evaluation Access
            </h2>
            <p>
              Access to the current prototype preview of Creator Command Center is offered free of charge. No payment credentials, credit card details, or recurring billing authorizations are collected during this preview. Consequently, no charges or refunds apply to current prototype use.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              2. Subscription Cancellation (Proposed Commercial Framework)
            </h2>
            <p>
              Upon commercial release, subscribers will be able to cancel their recurring subscriptions at any time through the workspace Account Settings panel:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>
                <strong>Immediate Cancellation:</strong> Cancelling stops automatic recurring billing at the end of the active billing period.
              </li>
              <li>
                <strong>Access Retention:</strong> Creators will retain access to their workspace and content assets until the end of the current billing cycle.
              </li>
              <li>
                <strong>Data Portability:</strong> Content libraries and publishing logs can be exported via the Settings panel prior to subscription termination.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                3. Proposed Refund Eligibility & Exceptions
              </h2>
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200">
                Unresolved • Pending Review
              </span>
            </div>
            <p className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50/50 dark:bg-amber-950/20 p-2.5 rounded-lg border border-amber-200/60 dark:border-amber-900/40">
              Note: The specific timeframes, commercial terms, and credit mechanisms below represent draft proposals currently under internal business and legal evaluation. They are not final corporate policy.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>
                <strong>[UNRESOLVED PROPOSAL] Initial Annual Window:</strong> An exploratory 14-day evaluation refund window for first-time annual subscriptions if technical platform issues prevent standard usage (requires final executive sign-off).
              </li>
              <li>
                <strong>Monthly Plans:</strong> Monthly subscription cycles are proposed to be non-refundable once the monthly billing period commences, with cancellation taking effect at the end of the current term.
              </li>
              <li>
                <strong>[UNRESOLVED PROPOSAL] Service Outage Credits:</strong> A proposed mechanism where documented, unscheduled platform unavailability exceeding published SLA thresholds would be credited towards future billing periods (SLA thresholds and credit metrics are pending operational definition).
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              4. Questions and Assistance
            </h2>
            <p>
              If you have questions regarding this proposed policy or prototype evaluation terms, please submit an inquiry via our{' '}
              <Link to="/contact" className="text-sky-600 dark:text-sky-400 underline hover:no-underline font-medium">
                Prototype Support & Contact Page
              </Link>
              .
            </p>
          </section>
        </Card>
      </div>
    </PublicLayout>
  );
};
