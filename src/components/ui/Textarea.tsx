import React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  charCount?: number;
  maxChars?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, charCount, maxChars, id, ...props }, ref) => {
    const textareaId = id || (label ? `textarea_${label.toLowerCase().replace(/\s+/g, '_')}` : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        <div className="flex items-center justify-between">
          {label && (
            <label htmlFor={textareaId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              {label}
              {props.required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
          )}
          {maxChars !== undefined && (
            <span className="text-[11px] font-mono text-slate-400">
              {charCount !== undefined ? charCount : (props.value as string)?.length || 0} / {maxChars}
            </span>
          )}
        </div>
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            'w-full rounded-lg border bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500',
            'disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:text-slate-400 disabled:cursor-not-allowed resize-y min-h-[96px]',
            error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500'
              : 'border-slate-300 dark:border-slate-700',
            className
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          {...props}
        />
        {error ? (
          <p id={`${textareaId}-error`} className="text-xs font-medium text-red-600 dark:text-red-400">
            {error}
          </p>
        ) : helperText ? (
          <p id={`${textareaId}-helper`} className="text-xs text-slate-500 dark:text-slate-400">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
