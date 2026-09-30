"use client";

import React, { useState } from "react";
import { Link, useNavigate } from "@/lib/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { userRepository } from "@/lib/repositories/userRepository";
import { UI_CLASSES } from "@/lib/constants/theme";
import { AlertCircle, Sparkles } from "lucide-react";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginAsDemo } = useAuth();
  const [email, setEmail] = useState("eric@creatorcc.com");
  const [password, setPassword] = useState("password123");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getReturnPath = () => {
    const nextPath = new URLSearchParams(window.location.search).get("next");
    return nextPath?.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/dashboard";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      setIsLoading(false);
      const profile = await userRepository.getCurrentProfile();
      if (profile?.onboardingCompleted) {
        navigate(getReturnPath());
      } else {
        navigate("/onboarding");
      }
    } catch {
      setIsLoading(false);
      setError("Invalid email or password");
    }
  };

  const handleDemoSignIn = async () => {
    setIsLoading(true);
    try {
      await loginAsDemo();
      setIsLoading(false);
      navigate(getReturnPath());
    } catch {
      setIsLoading(false);
      setError("Failed to initialize demo session");
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F7F8] dark:bg-[#030712] flex flex-col justify-center items-center p-4 selection:bg-sky-500 selection:text-white">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-8">
        {/* Brand Lockup */}
        <div className="text-center mb-8">
          <div
            className={`w-12 h-12 rounded-xl ${UI_CLASSES.brandIconBg} flex items-center justify-center font-bold text-lg mx-auto mb-3 shadow-xs`}
          >
            CC
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Sign in to Creator Command Center
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Access your multi-platform content workspace
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />

          <div>
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
            <div className="flex justify-end mt-1.5">
              <Link
                to="/forgot-password"
                className="text-xs text-sky-600 dark:text-sky-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-2"
            isLoading={isLoading}
          >
            Log in
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-[10px] font-mono uppercase">
              <span className="bg-white dark:bg-slate-900 px-2 text-slate-400">Prototype Demo</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="md"
            className="w-full border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-950/50"
            onClick={handleDemoSignIn}
            leftIcon={<Sparkles className="w-4 h-4 text-sky-500" />}
          >
            Quick Demo Login (Eric Dollar)
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-sky-600 dark:text-sky-400 hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
