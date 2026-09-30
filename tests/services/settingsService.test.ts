import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { SettingsService } from "@/lib/services/settings/settingsService";

describe('SettingsService and Notification Preferences', () => {
  test('getNotificationPreferences returns valid preference flags', async () => {
    const prefs = await SettingsService.getNotificationPreferences();
    assert.ok(typeof prefs.notifySuccess === 'boolean');
    assert.ok(typeof prefs.notifyFailure === 'boolean');
    assert.ok(typeof prefs.notifyDeadlines === 'boolean');
  });

  test('saveNotificationPreferences persists updated preferences', async () => {
    const updated = {
      notifySuccess: false,
      notifyFailure: true,
      notifyDeadlines: false,
    };
    await SettingsService.saveNotificationPreferences(updated);
    const retrieved = await SettingsService.getNotificationPreferences();
    assert.equal(retrieved.notifySuccess, false);
    assert.equal(retrieved.notifyFailure, true);
    assert.equal(retrieved.notifyDeadlines, false);
  });

  test('exportAllData returns complete data bundle with user and content', async () => {
    const bundle = await SettingsService.exportAllData();
    assert.ok(bundle);
    assert.ok(bundle.user !== undefined);
    assert.ok(bundle.profile !== undefined);
    assert.ok(Array.isArray(bundle.content));
    assert.ok(Array.isArray(bundle.accounts));
  });
});
