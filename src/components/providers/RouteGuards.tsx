"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { useAuth } from "@/hooks/useAuth";

export function GuestOnly({ children }: { children: ReactNode }) {
  const { isReady, isAuthenticated, isOnboarded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isReady && isAuthenticated) {
      router.replace(isOnboarded ? "/dashboard" : "/onboarding");
    }
  }, [isAuthenticated, isOnboarded, isReady, router]);

  if (!isReady || isAuthenticated) return null;
  return children;
}

export function OnboardingGuard({ children }: { children: ReactNode }) {
  const { isReady, isAuthenticated, isOnboarded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isReady) return;
    if (!isAuthenticated) router.replace("/login");
    else if (isOnboarded) router.replace("/dashboard");
  }, [isAuthenticated, isOnboarded, isReady, router]);

  if (!isReady || !isAuthenticated || isOnboarded) return null;
  return children;
}

export function ProtectedWorkspace({ children }: { children: ReactNode }) {
  const { isReady, isAuthenticated, isOnboarded } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isReady) return;
    if (!isAuthenticated) {
      const currentUrl = `${pathname}${window.location.search}`;
      router.replace(`/login?next=${encodeURIComponent(currentUrl)}`);
    } else if (!isOnboarded) {
      router.replace("/onboarding");
    }
  }, [isAuthenticated, isOnboarded, isReady, pathname, router]);

  if (!isReady || !isAuthenticated || !isOnboarded) return null;
  return <AppShell>{children}</AppShell>;
}
