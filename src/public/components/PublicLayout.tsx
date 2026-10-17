import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "@/lib/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/Button";
import { UI_CLASSES } from "@/lib/constants/theme";
import { cn } from "@/lib/utils";
import { Sun, Moon, Menu, X, ArrowRight, ShieldCheck, Sparkles, ExternalLink } from "lucide-react";

export interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Features", to: "/features" },
    { label: "Pricing", to: "/pricing" },
    { label: "About", to: "/about" },
    { label: "FAQ", to: "/faq" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F7F8] dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Shared Public Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo & Title */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-1"
          >
            <div
              className={`w-8 h-8 rounded-lg ${UI_CLASSES.brandIconBg} flex items-center justify-center font-bold text-sm shadow-xs tracking-tight group-hover:scale-105 transition-transform`}
            >
              CC
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base tracking-tight text-slate-900 dark:text-slate-100">
                Creator CC
              </span>
              <span className="text-[10px] font-mono text-slate-400 -mt-1 hidden sm:inline">
                Command Center
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 text-slate-600 dark:text-slate-400"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                    isActive
                      ? "text-sky-700 dark:text-sky-300 bg-sky-50/80 dark:bg-slate-800 font-semibold shadow-2xs"
                      : "hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-slate-800/60",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions: Theme Toggle & Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate("/dashboard")}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Enter Dashboard
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate("/signup")}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Right Controls: Theme Toggle & Hamburger */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex md:hidden bg-slate-900/60 backdrop-blur-xs select-none"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="w-4/5 max-w-xs h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between p-5 shadow-2xl animate-in slide-in-from-left duration-200">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <div
                    className={`w-7 h-7 rounded-lg ${UI_CLASSES.brandIconBg} flex items-center justify-center font-bold text-xs tracking-tight`}
                  >
                    CC
                  </div>
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Creator CC
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="flex flex-col gap-1 py-4">
                <NavLink
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive && location.pathname === "/"
                        ? "text-sky-700 dark:text-sky-300 bg-sky-50/80 dark:bg-slate-800 font-semibold"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
                    )
                  }
                >
                  Home
                </NavLink>
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "text-sky-700 dark:text-sky-300 bg-sky-50/80 dark:bg-slate-800 font-semibold"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              {/* Drawer Legal Sub-links */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 px-3 tracking-wider">
                  Policies & Legal
                </span>
                <div className="grid grid-cols-2 gap-1 px-1 pt-1 text-xs text-slate-500 dark:text-slate-400">
                  <Link
                    to="/privacy"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-2 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Privacy
                  </Link>
                  <Link
                    to="/terms"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-2 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Terms
                  </Link>
                  <Link
                    to="/refunds"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-2 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Refunds
                  </Link>
                  <Link
                    to="/cookies"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-2 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cookies
                  </Link>
                </div>
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between px-2 text-xs text-slate-500">
                <span>Theme</span>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="w-3.5 h-3.5" /> Light
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5" /> Dark
                    </>
                  )}
                </button>
              </div>

              {isAuthenticated ? (
                <Button
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/dashboard");
                  }}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Enter Dashboard
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="primary"
                    className="w-full justify-center"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/signup");
                    }}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Get Started Free
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-center"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/login");
                    }}
                  >
                    Sign In
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Dismiss overlay click */}
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main Page Content */}
      <main className="flex-1 flex flex-col">{children}</main>

      {/* Shared Public Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 text-slate-600 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Column 1: Brand & Identity */}
            <div className="space-y-4 md:col-span-1">
              <Link to="/" className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg ${UI_CLASSES.brandIconBg} flex items-center justify-center font-bold text-sm shadow-xs tracking-tight`}
                >
                  CC
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Creator CC
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 -mt-1">Command Center</span>
                </div>
              </Link>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                The creator-first operating system for managing your content lifecycle from initial
                idea to multi-platform publishing.
              </p>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-sky-200 dark:border-sky-800/80 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 text-[11px] font-mono font-medium">
                <Sparkles className="w-3 h-3 text-sky-500" />
                <span>MVP1 PROTOTYPE ACTIVE</span>
              </div>
            </div>

            {/* Column 2: Product & Workflow */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                Product & Features
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    to="/features"
                    className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                  >
                    Workflow Capabilities
                  </Link>
                </li>
                <li>
                  <Link
                    to="/features"
                    className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                  >
                    10-Stage Lifecycle
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                  >
                    Pricing & Tier Access
                  </Link>
                </li>
                <li>
                  <Link
                    to="/features"
                    className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                  >
                    Supported Platforms
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Company & Support */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                Company & Support
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                  >
                    About Creator Command Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                  >
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                  >
                    Contact & Prototype Feedback
                  </Link>
                </li>
                <li>
                  <Link
                    to={isAuthenticated ? "/dashboard" : "/login"}
                    className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors flex items-center gap-1"
                  >
                    {isAuthenticated ? "Open Dashboard" : "Account Sign In"}{" "}
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Legal & Policies */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                Policies & Legal
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/refunds"
                    className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                  >
                    Refund & Cancellation Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookies"
                    className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                  >
                    Cookies & Local Storage
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Sub-footer copyright and prototype disclaimer */}
          <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-400">
            <p>&copy; {new Date().getFullYear()} Creator Command Center. All rights reserved.</p>
            <p className="text-center sm:text-right text-[10px] text-slate-400 dark:text-slate-500">
              Interactive Prototype Evaluation Build &bull; Sandboxed Client Execution
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
