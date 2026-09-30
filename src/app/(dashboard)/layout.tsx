import type { ReactNode } from "react";
import { ProtectedWorkspace } from "@/components/providers/RouteGuards";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <ProtectedWorkspace>{children}</ProtectedWorkspace>;
}
