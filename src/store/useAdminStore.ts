import { create } from 'zustand'
import type { ManagedClient, SystemLog, ConsentPolicy } from './../types/admin'

interface AdminState {
  clients: ManagedClient[]
  logs: SystemLog[]
  policies: ConsentPolicy[]

  setClients: (c: ManagedClient[]) => void
  setLogs: (l: SystemLog[]) => void
  setPolicies: (p: ConsentPolicy[]) => void
}

export const useAdminStore = create<AdminState>((set) => ({
  clients: [],
  logs: [],
  policies: [],
  setClients: (c) => set({ clients: c }),
  setLogs: (l) => set({ logs: l }),
  setPolicies: (p) => set({ policies: p }),
}))