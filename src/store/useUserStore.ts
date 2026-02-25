import { create } from 'zustand'
import type { ConsentVersion, UserProfile } from './../types/user'

interface UserState {
  profile: UserProfile | null
  consentVersion: ConsentVersion | null
  provideLogs: any[]
  setProfile: (p: UserProfile) => void
  setConsentVersion: (v: ConsentVersion) => void
  setProvideLogs: (logs: any[]) => void
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  consentVersion: null,
  provideLogs: [],
  setProfile: (p) => set({ profile: p }),
  setConsentVersion: (v) => set({ consentVersion: v }),
  setProvideLogs: (logs) => set({ provideLogs: logs }),
}))