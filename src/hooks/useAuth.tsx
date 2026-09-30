"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CreatorProfile, User } from "@/types";
import { StorageAPI } from "@/lib/storage/storage";

interface AuthContextType {
  isReady: boolean;
  user: User | null;
  profile: CreatorProfile | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  loginAsDemo: () => Promise<boolean>;
  register: (name: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  updateProfile: (updates: Partial<CreatorProfile>) => void;
  completeOnboarding: (data: Partial<CreatorProfile>) => void;
  deleteAccount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Session is strictly separated from seed data:
  // If no session exists in storage, user & profile are null (unauthenticated).
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<CreatorProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setUser(StorageAPI.getUser());
    setProfile(StorageAPI.getProfile());
    setIsReady(true);
  }, []);

  const loginAsDemo = async (): Promise<boolean> => {
    const demoUser = StorageAPI.getSeedUser();
    const demoProfile = StorageAPI.getSeedProfile();

    setUser(demoUser);
    setProfile(demoProfile);
    StorageAPI.setUser(demoUser);
    StorageAPI.setProfile(demoProfile);
    return true;
  };

  const login = async (email: string, _password?: string): Promise<boolean> => {
    const normalized = email.trim().toLowerCase();

    // If logging in as the seed/demo creator
    if (normalized === "eric@creatorcc.com" || normalized === "eric") {
      return loginAsDemo();
    }

    // New or custom login session
    const existingUser = StorageAPI.getUser();
    const updatedUser: User = {
      id: existingUser?.id || `usr_${Date.now()}`,
      email: normalized,
      name: normalized.split("@")[0],
      avatarUrl: "",
      timezone: "Africa/Lagos",
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    };

    const updatedProfile: CreatorProfile = {
      userId: updatedUser.id,
      displayName: updatedUser.name,
      bio: "",
      creatorType: "YouTuber",
      primaryPlatforms: ["youtube"],
      onboardingCompleted: true,
    };

    setUser(updatedUser);
    setProfile(updatedProfile);
    StorageAPI.setUser(updatedUser);
    StorageAPI.setProfile(updatedProfile);
    return true;
  };

  const register = async (name: string, email: string, _password?: string): Promise<boolean> => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      email: email.trim().toLowerCase(),
      name: name.trim(),
      timezone: "Africa/Lagos",
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    };

    const newProfile: CreatorProfile = {
      userId: newUser.id,
      displayName: name.trim(),
      bio: "",
      creatorType: "YouTuber",
      primaryPlatforms: ["youtube"],
      onboardingCompleted: false, // Requires completing onboarding wizard!
    };

    setUser(newUser);
    setProfile(newProfile);
    StorageAPI.setUser(newUser);
    StorageAPI.setProfile(newProfile);
    return true;
  };

  const logout = () => {
    StorageAPI.clearSession();
    setUser(null);
    setProfile(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    StorageAPI.setUser(updated);
  };

  const updateProfile = (updates: Partial<CreatorProfile>) => {
    if (!profile) return;
    const updated = { ...profile, ...updates };
    setProfile(updated);
    StorageAPI.setProfile(updated);
  };

  const completeOnboarding = (data: Partial<CreatorProfile>) => {
    if (!profile) return;
    const updated = {
      ...profile,
      ...data,
      onboardingCompleted: true,
    };
    setProfile(updated);
    StorageAPI.setProfile(updated);
  };

  const deleteAccount = () => {
    StorageAPI.resetAllData();
    StorageAPI.clearSession();
    setUser(null);
    setProfile(null);
  };

  const isAuthenticated = !!user && user.status === "ACTIVE" && !!StorageAPI.getSession();
  const isOnboarded = !!profile?.onboardingCompleted;

  return (
    <AuthContext.Provider
      value={{
        isReady,
        user,
        profile,
        isAuthenticated,
        isOnboarded,
        login,
        loginAsDemo,
        register,
        logout,
        updateUser,
        updateProfile,
        completeOnboarding,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
