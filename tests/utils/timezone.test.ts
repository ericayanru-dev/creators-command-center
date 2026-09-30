import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  getUserTimezone,
  localDateTimeToUtcIso,
  utcIsoToLocalDateTime,
  getTimezoneLabel,
  DEMO_DEFAULT_TIMEZONE,
} from "@/lib/utils/timezone";
import { User } from '@/types';

describe('Timezone Utilities', () => {
  test('getUserTimezone returns user timezone if present', () => {
    const mockUser: Partial<User> = { timezone: 'America/New_York' };
    const tz = getUserTimezone(mockUser as User);
    assert.equal(tz, 'America/New_York');
  });

  test('getUserTimezone falls back to default demo timezone when user is null', () => {
    const tz = getUserTimezone(null);
    assert.ok(typeof tz === 'string');
    assert.ok(tz.length > 0);
  });

  test('localDateTimeToUtcIso accurately converts Africa/Lagos wall clock to UTC', () => {
    // Africa/Lagos is UTC+1 year-round (no DST)
    const dateStr = '2026-10-15';
    const timeStr = '14:30';
    const tz = 'Africa/Lagos';

    const utcIso = localDateTimeToUtcIso(dateStr, timeStr, tz);
    // 14:30 UTC+1 is 13:30 UTC
    assert.equal(utcIso, '2026-10-15T13:30:00.000Z');
  });

  test('utcIsoToLocalDateTime round-trips from UTC back to local timezone', () => {
    const utcIso = '2026-10-15T13:30:00.000Z';
    const tz = 'Africa/Lagos';

    const local = utcIsoToLocalDateTime(utcIso, tz);
    assert.equal(local.date, '2026-10-15');
    assert.equal(local.time, '14:30');
  });

  test('getTimezoneLabel returns formatted string with abbreviation and offset', () => {
    const label = getTimezoneLabel('Africa/Lagos');
    assert.ok(label.includes('Africa/Lagos'));
    assert.ok(label.includes('GMT') || label.includes('UTC') || label.includes('WAT'));
  });

  test('America/New_York accurately computes DST offset (Summer EDT UTC-4 vs Winter EST UTC-5)', () => {
    // Summer date: EDT is UTC-4
    const summerUtc = localDateTimeToUtcIso('2026-07-15', '14:00', 'America/New_York');
    assert.equal(summerUtc, '2026-07-15T18:00:00.000Z');

    // Winter date: EST is UTC-5
    const winterUtc = localDateTimeToUtcIso('2026-01-15', '14:00', 'America/New_York');
    assert.equal(winterUtc, '2026-01-15T19:00:00.000Z');

    // Round-trip verification
    const roundTripSummer = utcIsoToLocalDateTime(summerUtc, 'America/New_York');
    assert.equal(roundTripSummer.date, '2026-07-15');
    assert.equal(roundTripSummer.time, '14:00');
  });

  test('Europe/London accurately converts British Summer Time (BST) and GMT', () => {
    // Summer (BST, UTC+1)
    const summerUtc = localDateTimeToUtcIso('2026-07-15', '12:00', 'Europe/London');
    assert.equal(summerUtc, '2026-07-15T11:00:00.000Z');

    // Winter (GMT, UTC+0)
    const winterUtc = localDateTimeToUtcIso('2026-01-15', '12:00', 'Europe/London');
    assert.equal(winterUtc, '2026-01-15T12:00:00.000Z');
  });

  test('Asia/Tokyo accurately converts constant UTC+9 timezone', () => {
    const tokyoUtc = localDateTimeToUtcIso('2026-05-10', '09:00', 'Asia/Tokyo');
    assert.equal(tokyoUtc, '2026-05-10T00:00:00.000Z');

    const roundTrip = utcIsoToLocalDateTime(tokyoUtc, 'Asia/Tokyo');
    assert.equal(roundTrip.date, '2026-05-10');
    assert.equal(roundTrip.time, '09:00');
  });
});
