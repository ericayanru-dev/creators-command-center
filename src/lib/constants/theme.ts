/**
 * Creator Command Center — UI Design System Tokens
 * Source: Creator Command Center UI Design System Specification
 * 
 * Semantic tokenization layer for colors, status badges, surfaces, buttons, borders, and inputs.
 */

export const DESIGN_TOKENS = {
  colors: {
    brand: {
      primary: '#03055E', // Deep Navy
      secondary: '#0077B6', // Steel Blue
      accent: '#00B4D8', // Vivid Sky
      darkAccent: '#0284C7', // Sky-600
    },
    canvas: {
      light: '#F3F7F8',
      dark: '#030712',
    },
    surface: {
      light: '#FFFFFF',
      dark: '#0F172A',
      cardLight: '#FFFFFF',
      cardDark: '#0F172A',
      subtleLight: '#F8FAFC',
      subtleDark: '#1E293B',
    },
    border: {
      light: '#E2E8F0',
      dark: '#1E293B',
      subtleLight: '#F1F5F9',
      subtleDark: '#334155',
    },
    text: {
      primaryLight: '#0F172A',
      primaryDark: '#F8FAFC',
      secondaryLight: '#64748B',
      secondaryDark: '#94A3B8',
      mutedLight: '#94A3B8',
      mutedDark: '#64748B',
    },
    status: {
      success: {
        light: '#10B981',
        dark: '#34D399',
      },
      warning: {
        light: '#F59E0B',
        dark: '#FBBF24',
      },
      error: {
        light: '#EF4444',
        dark: '#F87171',
      },
      info: {
        light: '#0284C7',
        dark: '#38BDF8',
      },
    },
  },

  statusBadges: {
    // Content lifecycle stages
    content: {
      IDEA: {
        bg: 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-900/50',
        label: 'Idea',
        dot: 'bg-amber-400',
      },
      DRAFT: {
        bg: 'bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-900/50',
        label: 'Draft',
        dot: 'bg-blue-400',
      },
      READY: {
        bg: 'bg-indigo-50 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900/50',
        label: 'Ready',
        dot: 'bg-indigo-400',
      },
      SCHEDULED: {
        bg: 'bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300 border-sky-200 dark:border-sky-900/50',
        label: 'Scheduled',
        dot: 'bg-sky-400',
      },
      PUBLISHED: {
        bg: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50',
        label: 'Published',
        dot: 'bg-emerald-400',
      },
    },

    // Publications statuses
    publication: {
      SCHEDULED: {
        bg: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200 dark:border-sky-800',
        label: 'Scheduled',
      },
      PUBLISHING: {
        bg: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-700 animate-pulse',
        label: 'Publishing...',
      },
      PUBLISHED: {
        bg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        label: 'Published',
      },
      FAILED: {
        bg: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800',
        label: 'Failed',
      },
    },

    // Task Priorities
    taskPriority: {
      LOW: {
        bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
        label: 'Low',
      },
      MEDIUM: {
        bg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-900/40',
        label: 'Medium',
      },
      HIGH: {
        bg: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200 dark:border-rose-900/40',
        label: 'High',
      },
    },

    // Account Connection Statuses
    accountStatus: {
      CONNECTED: {
        bg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50',
        label: 'Connected',
      },
      DISCONNECTED: {
        bg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700',
        label: 'Disconnected',
      },
      NEEDS_REAUTHORIZATION: {
        bg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-900/50',
        label: 'Needs Reauth',
      },
    },
  },
} as const;

/**
 * Standard semantic UI class compositions for consistent theme-aware application surfaces.
 */
export const UI_CLASSES = {
  // Surfaces & Layout
  canvas: 'bg-[#F3F7F8] dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors',
  card: 'bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors text-slate-900 dark:text-slate-100',
  cardSubtle: 'bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100',
  cardElevated: 'bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl text-slate-900 dark:text-slate-100',
  modalSurface: 'bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden',

  // Typography
  textPrimary: 'text-slate-900 dark:text-slate-100',
  textSecondary: 'text-slate-600 dark:text-slate-400',
  textMuted: 'text-slate-400 dark:text-slate-500',

  // Borders
  border: 'border-slate-200 dark:border-slate-800',
  borderSubtle: 'border-slate-100 dark:border-slate-800/60',

  // Buttons & Controls
  buttonPrimary: 'bg-[#03055E] hover:bg-[#02033B] text-white shadow-xs dark:bg-sky-600 dark:hover:bg-sky-500 transition-colors',
  buttonBrand: 'bg-[#03055E] hover:bg-[#020340] text-white dark:bg-sky-600 dark:hover:bg-sky-500 transition-colors',
  buttonSecondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 transition-colors',
  buttonOutline: 'border border-slate-300 hover:bg-slate-50 text-slate-700 dark:border-slate-700 dark:hover:bg-slate-800 dark:text-slate-300 transition-colors',
  buttonGhost: 'hover:bg-slate-100 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-colors',

  // Brand Badges & Avatars
  brandIconBg: 'bg-[#03055E] dark:bg-sky-600 text-white',
  activeNavTab: 'bg-sky-50 text-[#03055E] dark:bg-slate-800 dark:text-sky-400 font-semibold shadow-xs',
  activePillTab: 'bg-[#03055E] dark:bg-sky-600 text-white',

  // Inputs & Focus
  input: 'w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors',
  inputSubtle: 'w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white dark:focus:bg-slate-900 transition-colors',
  focusRing: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2',

  // Status & Badges
  badge: 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border',
  link: 'text-sky-600 dark:text-sky-400 hover:underline',
};
