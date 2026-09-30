import { useEffect, useState, useCallback } from 'react';

/**
 * Reusable hook for detecting and protecting unsaved form changes.
 * Integrates browser beforeunload and provides state for in-app exit confirmation dialogs.
 */
export function useUnsavedChanges(isDirty: boolean) {
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null);

  // Native browser unload protection (tab close, refresh, external navigation)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    if (isDirty) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  // In-app navigation guard
  const confirmNavigation = useCallback(
    (navigateAction: () => void) => {
      if (!isDirty) {
        navigateAction();
      } else {
        setPendingNavigation(() => navigateAction);
        setShowExitConfirm(true);
      }
    },
    [isDirty]
  );

  const handleConfirmExit = useCallback(() => {
    setShowExitConfirm(false);
    if (pendingNavigation) {
      pendingNavigation();
    }
  }, [pendingNavigation]);

  const handleCancelExit = useCallback(() => {
    setShowExitConfirm(false);
    setPendingNavigation(null);
  }, []);

  return {
    showExitConfirm,
    confirmNavigation,
    handleConfirmExit,
    handleCancelExit,
  };
}
