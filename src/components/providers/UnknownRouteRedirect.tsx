"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function UnknownRouteRedirect() {
  const { isReady, isAuthenticated, isOnboarded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isReady) return;
    router.replace(isAuthenticated ? (isOnboarded ? "/dashboard" : "/onboarding") : "/");
  }, [isAuthenticated, isOnboarded, isReady, router]);

  return null;
}
