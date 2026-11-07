import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";

export const metadata: Metadata = {
  title: "Creator Command Center",
  description:
    "Creator-first operating system for managing the lifecycle of content across social platforms.",
  openGraph: {
    title: "Creator Command Center",
    description:
      "Creator-first operating system for managing the lifecycle of content across social platforms.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-[#F3F7F8] text-slate-900 antialiased selection:bg-sky-500 selection:text-white dark:bg-[#030712] dark:text-slate-100">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
