import { User } from '@/types';
import { StorageAPI } from '@/lib/storage/storage';

/**
 * Creator Command Center - Timezone and Scheduling Utilities
 * Provides accurate local <-> UTC conversions without assuming UTC or incorrectly appending 'Z'.
 */

export const DEMO_DEFAULT_TIMEZONE = 'Africa/Lagos';

/**
 * Returns the effective timezone for the current user,
 * checking passed user, stored user profile, browser Intl timezone,
 * or falling back to the prototype default (Africa/Lagos).
 */
export function getUserTimezone(user?: User | null): string {
  if (user?.timezone && user.timezone.trim()) {
    return user.timezone.trim();
  }
  try {
    const storedUser = StorageAPI.getUser();
    if (storedUser?.timezone && storedUser.timezone.trim()) {
      return storedUser.timezone.trim();
    }
  } catch {
    // ignore in environments without storage
  }
  try {
    const resolved = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (resolved) return resolved;
  } catch {
    // ignore
  }
  return DEMO_DEFAULT_TIMEZONE;
}

/**
 * Converts a local wall-clock date string (YYYY-MM-DD) and time string (HH:mm)
 * in the specified IANA timezone into an exact UTC ISO 8601 string.
 */
export function localDateTimeToUtcIso(dateStr: string, timeStr: string, timeZone: string): string {
  if (!dateStr) throw new Error('Date string is required');
  const safeTime = timeStr && timeStr.trim() ? timeStr.trim() : '12:00';

  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = safeTime.split(':').map(Number);

  // Construct a naive UTC timestamp representing these exact date/time numbers
  const guessUtc = Date.UTC(year, month - 1, day, hours, minutes, 0, 0);

  // Use Intl.DateTimeFormat to determine what wall-clock time guessUtc produces in target timeZone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hourCycle: 'h23',
  });

  const parts = formatter.formatToParts(new Date(guessUtc));
  const partMap: Record<string, number> = {};
  for (const p of parts) {
    if (p.type !== 'literal') {
      partMap[p.type] = parseInt(p.value, 10);
    }
  }

  const tzWallClockAsUtc = Date.UTC(
    partMap.year,
    partMap.month - 1,
    partMap.day,
    partMap.hour,
    partMap.minute,
    partMap.second || 0
  );

  // Offset in milliseconds between the timezone's wall clock and UTC
  const offsetMs = tzWallClockAsUtc - guessUtc;
  const actualUtcMs = guessUtc - offsetMs;

  return new Date(actualUtcMs).toISOString();
}

/**
 * Converts a UTC ISO string into the wall-clock date (YYYY-MM-DD) and time (HH:mm)
 * in the specified IANA timezone.
 */
export function utcIsoToLocalDateTime(isoString: string, timeZone: string): { date: string; time: string } {
  const d = new Date(isoString);
  if (isNaN(d.getTime())) {
    return { date: '', time: '12:00' };
  }

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });

  const parts = formatter.formatToParts(d);
  const partMap: Record<string, string> = {};
  for (const p of parts) {
    if (p.type !== 'literal') {
      partMap[p.type] = p.value;
    }
  }

  return {
    date: `${partMap.year}-${partMap.month}-${partMap.day}`,
    time: `${partMap.hour}:${partMap.minute}`,
  };
}

/**
 * Returns a human-friendly timezone label with current UTC offset.
 * e.g. "Africa/Lagos (WAT, UTC+01:00)" or "America/New_York (EDT, UTC-04:00)"
 */
export function getTimezoneLabel(timeZone: string): string {
  try {
    const now = new Date();
    // Format offset using Intl
    const offsetFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'shortOffset',
    });
    const parts = offsetFormatter.formatToParts(now);
    const tzPart = parts.find((p) => p.type === 'timeZoneName')?.value || 'UTC';

    // Format abbreviation
    const abbrFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'short',
    });
    const abbrParts = abbrFormatter.formatToParts(now);
    const abbr = abbrParts.find((p) => p.type === 'timeZoneName')?.value;

    const shortName = abbr && abbr !== tzPart ? `${abbr}, ${tzPart}` : tzPart;
    return `${timeZone} (${shortName})`;
  } catch {
    return timeZone;
  }
}
