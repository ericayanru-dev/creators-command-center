"use client";

import React, { useState } from 'react';
import { Link } from "@/lib/navigation";
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { UI_CLASSES } from '@/lib/constants/theme';
import { CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F3F7F8] dark:bg-[#030712] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-8">
        <div className="text-center mb-6">
          <div className={`w-12 h-12 rounded-xl ${UI_CLASSES.brandIconBg} flex items-center justify-center font-bold text-lg mx-auto mb-3 shadow-xs`}>
            CC
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Reset your password
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Enter your email and we will send you a reset link.
          </p>
        </div>

        {isSubmitted ? (
          <div className="space-y-5 text-center">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs flex flex-col items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <p className="font-semibold">Check your email</p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                If an account exists for <span className="font-medium text-slate-900 dark:text-slate-200">{email}</span>, we sent a password reset link.
              </p>
            </div>
            <Link to="/login" className="block">
              <Button variant="outline" className="w-full">
                Back to login
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoFocus
            />

            <Button type="submit" variant="primary" size="lg" className="w-full mt-2" isLoading={isLoading}>
              Send reset link
            </Button>

            <div className="text-center pt-2">
              <Link to="/login" className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:underline">
                Back to login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
