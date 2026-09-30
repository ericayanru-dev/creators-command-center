import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AlertTriangle } from 'lucide-react';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'primary';
  isLoading?: boolean;
  typedConfirmationText?: string; // If provided, user must type this exact string
  typedConfirmationPlaceholder?: string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onCancel,
  onConfirm,
  title,
  description,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  isLoading = false,
  typedConfirmationText,
  typedConfirmationPlaceholder,
}) => {
  const [typedValue, setTypedValue] = useState('');
  const desc = description || message || '';

  const isConfirmationValid = !typedConfirmationText || typedValue.trim() === typedConfirmationText;

  const handleConfirm = () => {
    if (isConfirmationValid) {
      onConfirm();
      setTypedValue('');
    }
  };

  const handleClose = () => {
    setTypedValue('');
    if (onCancel) onCancel();
    else if (onClose) onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="sm" showCloseButton={false}>
      <div className="space-y-4">
        <div className="flex items-start gap-3.5">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              variant === 'danger'
                ? 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400'
                : 'bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400'
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{desc}</p>
          </div>
        </div>

        {typedConfirmationText && (
          <div className="pt-2">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              To proceed, please type <span className="font-mono text-rose-600 font-bold">{typedConfirmationText}</span> below:
            </p>
            <Input
              value={typedValue}
              onChange={(e) => setTypedValue(e.target.value)}
              placeholder={typedConfirmationPlaceholder || `Type "${typedConfirmationText}"`}
              autoFocus
            />
          </div>
        )}

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button variant="outline" size="md" onClick={handleClose} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            size="md"
            onClick={handleConfirm}
            isLoading={isLoading}
            disabled={!isConfirmationValid || isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
