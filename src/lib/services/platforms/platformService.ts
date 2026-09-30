import { Platform, SocialAccount } from '@/types';
import { platformRepository } from '@/lib/repositories/platformRepository';
import { simulateNetworkLatency } from '@/lib/api/client';

export const PlatformService = {
  async getAccounts(): Promise<SocialAccount[]> {
    await simulateNetworkLatency(100);
    return platformRepository.getAll();
  },

  async getAccountByPlatform(platform: Platform): Promise<SocialAccount | null> {
    await simulateNetworkLatency(50);
    const accounts = await platformRepository.getAll();
    return accounts.find((a) => a.platform === platform) || null;
  },

  async connectAccount(platform: Platform, accountHandle = '@creator'): Promise<SocialAccount> {
    await simulateNetworkLatency(350); // Simulate OAuth roundtrip
    const accounts = await platformRepository.getAll();
    const existingIndex = accounts.findIndex((a) => a.platform === platform);

    const platformNameMap: Record<Platform, string> = {
      youtube: 'YouTube Channel',
      instagram: 'Instagram Profile',
      tiktok: 'TikTok Feed',
      linkedin: 'LinkedIn Professional',
      facebook: 'Facebook Creator Page',
    };

    const newAccount: SocialAccount = {
      id: `acc_${platform}_${Date.now()}`,
      userId: 'usr_01jd72948',
      platform,
      accountName: platformNameMap[platform],
      accountHandle: accountHandle.startsWith('@') ? accountHandle : `@${accountHandle}`,
      status: 'CONNECTED',
      lastSyncedAt: new Date().toISOString(),
      connectedAt: new Date().toISOString(),
    };

    if (existingIndex !== -1) {
      accounts[existingIndex] = newAccount;
    } else {
      accounts.push(newAccount);
    }

    await platformRepository.saveAll(accounts);
    return newAccount;
  },

  async reauthorizeAccount(platform: Platform): Promise<SocialAccount> {
    await simulateNetworkLatency(300);
    const accounts = await platformRepository.getAll();
    const account = accounts.find((a) => a.platform === platform);
    if (!account) throw new Error('Account not found');

    account.status = 'CONNECTED';
    account.errorMessage = undefined;
    account.lastSyncedAt = new Date().toISOString();

    await platformRepository.saveAll(accounts);
    return account;
  },

  async disconnectAccount(accountId: string): Promise<boolean> {
    await simulateNetworkLatency(200);
    const accounts = await platformRepository.getAll();
    const account = accounts.find((a) => a.id === accountId);
    if (!account) return false;

    account.status = 'DISCONNECTED';
    account.lastSyncedAt = new Date().toISOString();

    await platformRepository.saveAll(accounts);
    return true;
  },
};
