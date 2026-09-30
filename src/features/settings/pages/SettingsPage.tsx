"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "@/lib/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { SettingsService } from "@/lib/services/settings/settingsService";
import { CreatorProfile } from "@/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { useToast } from "@/components/shared/Toast";
import { ComingSoonModal } from "@/components/shared/ComingSoonModal";
import { UI_CLASSES } from "@/lib/constants/theme";
import {
  User,
  Settings as SettingsIcon,
  Sun,
  Moon,
  Database,
  Bell,
  RotateCcw,
  Download,
  Save,
  AlertTriangle,
  Trash2,
  Briefcase,
} from "lucide-react";

const TIMEZONES = [
  "Africa/Lagos",
  "America/New_York",
  "America/Los_Angeles",
  "America/Chicago",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Asia/Dubai",
  "UTC",
];

const CREATOR_TYPES: CreatorProfile["creatorType"][] = [
  "YouTuber",
  "TikTok Creator",
  "Instagram Creator",
  "Educator",
  "Podcaster",
  "Blogger",
  "Personal Brand",
  "Other",
];

export const SettingsPage: React.FC = () => {
  const { user, profile, updateUser, updateProfile, deleteAccount } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(
    profile?.displayName || user?.name || "Eric Dollar",
  );
  const [bio, setBio] = useState(
    profile?.bio || "Building in public & sharing software architecture.",
  );
  const [creatorType, setCreatorType] = useState<CreatorProfile["creatorType"]>(
    profile?.creatorType || "YouTuber",
  );
  const [timezone, setTimezone] = useState(user?.timezone || "Africa/Lagos");

  // Notification toggles & persistence
  const [notifySuccess, setNotifySuccess] = useState(true);
  const [notifyFailure, setNotifyFailure] = useState(true);
  const [notifyDeadlines, setNotifyDeadlines] = useState(true);

  // Dialog controls
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showDeleteAccountConfirm, setShowDeleteAccountConfirm] = useState(false);
  const [showMultiBrandModal, setShowMultiBrandModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load saved notification preferences on mount
  useEffect(() => {
    let isMounted = true;
    SettingsService.getNotificationPreferences()
      .then((prefs) => {
        if (isMounted && prefs) {
          setNotifySuccess(prefs.notifySuccess);
          setNotifyFailure(prefs.notifyFailure);
          setNotifyDeadlines(prefs.notifyDeadlines);
        }
      })
      .catch((err) => {
        console.error("Failed to load notification preferences:", err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggleNotify = async (
    field: "notifySuccess" | "notifyFailure" | "notifyDeadlines",
    currentVal: boolean,
  ) => {
    const newVal = !currentVal;
    if (field === "notifySuccess") setNotifySuccess(newVal);
    if (field === "notifyFailure") setNotifyFailure(newVal);
    if (field === "notifyDeadlines") setNotifyDeadlines(newVal);

    const updated = {
      notifySuccess: field === "notifySuccess" ? newVal : notifySuccess,
      notifyFailure: field === "notifyFailure" ? newVal : notifyFailure,
      notifyDeadlines: field === "notifyDeadlines" ? newVal : notifyDeadlines,
    };
    try {
      await SettingsService.saveNotificationPreferences(updated);
      toast("Notification preferences saved", "info");
    } catch {
      toast("Failed to save notification preferences", "error");
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name: displayName, timezone });
    updateProfile({ displayName, bio, creatorType });
    await SettingsService.saveNotificationPreferences({
      notifySuccess,
      notifyFailure,
      notifyDeadlines,
    });
    toast("Profile and preferences updated successfully", "success");
  };

  const handleResetData = async () => {
    await SettingsService.resetAllData();
    setShowResetConfirm(false);
    toast("Mock database restored to factory demo state!", "success");
    window.location.reload();
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      deleteAccount();
      setShowDeleteAccountConfirm(false);
      toast("Your creator account and all local data have been permanently deleted", "info");
      navigate("/login");
    } catch {
      toast("Failed to delete account", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExportData = async () => {
    const data = await SettingsService.exportAllData();

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `creator-cc-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast("Exported prototype database JSON", "success");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Creator Settings & Preferences
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
          Manage your creator profile, distribution defaults, visual theme, and demo storage
        </p>
      </div>

      {/* 1. Creator Identity & Profile */}
      <Card className="space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <User className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">Creator Profile</h2>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-full ${UI_CLASSES.brandIconBg} flex items-center justify-center font-bold text-lg shadow-sm`}
            >
              {displayName.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {displayName}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {user?.email || "creator@example.com"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Display Name"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Creator Niche / Persona
              </label>
              <select
                value={creatorType}
                onChange={(e) => setCreatorType(e.target.value as CreatorProfile["creatorType"])}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
              >
                {CREATOR_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Textarea
            label="Creator Bio / Mission"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Describe your channel thesis..."
          />

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Operating Timezone (For accurate release scheduling)
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-100 font-mono"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              leftIcon={<Save className="w-3.5 h-3.5" />}
            >
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>

      {/* 2. Visual Theme & Display */}
      <Card className="space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <SettingsIcon className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Appearance & Theme
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
              Color Theme
            </span>
            <span className="text-xs text-slate-400">
              Switch between Light Mode and Dark Mode for high-contrast creator workflows.
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            leftIcon={
              theme === "light" ? (
                <Moon className="w-3.5 h-3.5" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              )
            }
          >
            {theme === "light" ? "Enable Dark Mode" : "Enable Light Mode"}
          </Button>
        </div>
      </Card>

      {/* 3. Notification Preferences */}
      <Card className="space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Bell className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Notification Preferences
          </h2>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                Publishing Confirmations
              </span>
              <span className="text-[11px] text-slate-400">
                Receive in-app alerts when automated broadcasts succeed.
              </span>
            </div>
            <input
              type="checkbox"
              aria-label="Publishing Confirmations"
              checked={notifySuccess}
              onChange={() => handleToggleNotify("notifySuccess", notifySuccess)}
              className="rounded text-sky-600 w-4 h-4 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                Publishing Failures & Token Warnings
              </span>
              <span className="text-[11px] text-slate-400">
                Immediate notification for API exceptions or expired credentials.
              </span>
            </div>
            <input
              type="checkbox"
              aria-label="Publishing Failures & Token Warnings"
              checked={notifyFailure}
              onChange={() => handleToggleNotify("notifyFailure", notifyFailure)}
              className="rounded text-sky-600 w-4 h-4 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                Task & Deadline Reminders
              </span>
              <span className="text-[11px] text-slate-400">
                Alerts when shooting or editing milestones are due.
              </span>
            </div>
            <input
              type="checkbox"
              aria-label="Task & Deadline Reminders"
              checked={notifyDeadlines}
              onChange={() => handleToggleNotify("notifyDeadlines", notifyDeadlines)}
              className="rounded text-sky-600 w-4 h-4 cursor-pointer"
            />
          </label>
        </div>
      </Card>

      {/* Multi-Brand Workspaces (MVP2 Roadmap) */}
      <Card className="space-y-4 border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Multi-Brand Management
            </h2>
          </div>
          <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
            MVP2 Roadmap
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
            Manage separate creator brands with dedicated content organization and brand-specific
            publishing defaults. Coming in Creator CC MVP2.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMultiBrandModal(true)}
            className="text-xs shrink-0"
          >
            Explore MVP2 Scope
          </Button>
        </div>
      </Card>

      {/* 4. Prototype Database & State Management */}
      <Card className="space-y-4 border-amber-200 dark:border-amber-900/60 bg-amber-50/20">
        <div className="flex items-center gap-2 pb-3 border-b border-amber-100 dark:border-slate-800">
          <Database className="w-4 h-4 text-amber-600" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Prototype Data Management
          </h2>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          The prototype persists all content, platform adaptations, scheduled publications, and
          tasks in your browser&apos;s local storage. You can restore the pristine seed
          demonstration dataset or export your work at any time.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportData}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export Database JSON
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => setShowResetConfirm(true)}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Restore Default Demo State
          </Button>
        </div>
      </Card>

      {/* 5. Danger Zone - Account Deletion */}
      <Card className="space-y-4 border-rose-200 dark:border-rose-900/60 bg-rose-50/20">
        <div className="flex items-center gap-2 pb-3 border-b border-rose-100 dark:border-slate-800">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <h2 className="text-sm font-bold text-rose-900 dark:text-rose-400">Danger Zone</h2>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
            Delete Creator Account
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Permanently delete your creator account, associated profile, linked platform
            authorizations, drafts, and scheduled posts. This action cannot be undone.
          </p>
        </div>

        <div className="pt-2">
          <Button
            variant="danger"
            size="sm"
            onClick={() => setShowDeleteAccountConfirm(true)}
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
          >
            Delete Account
          </Button>
        </div>
      </Card>

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        title="Reset Prototype Data?"
        message="This will reset all content, scheduled publications, and tasks back to the default demonstration dataset. Any custom items you created will be replaced."
        confirmLabel="Reset Everything"
        variant="danger"
        onConfirm={handleResetData}
        onCancel={() => setShowResetConfirm(false)}
      />

      {/* Account Deletion Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteAccountConfirm}
        title="Permanently Delete Creator Account?"
        message="This will erase your account and all associated content, drafts, calendar schedules, tasks, and settings. To confirm, type DELETE below."
        confirmLabel="Permanently Delete Account"
        cancelLabel="Keep My Account"
        variant="danger"
        isLoading={isDeleting}
        typedConfirmationText="DELETE"
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowDeleteAccountConfirm(false)}
      />

      {/* Multi-Brand Coming Soon Modal */}
      {showMultiBrandModal && (
        <ComingSoonModal
          isOpen={showMultiBrandModal}
          onClose={() => setShowMultiBrandModal(false)}
          feature="multi_brand"
        />
      )}
    </div>
  );
};
