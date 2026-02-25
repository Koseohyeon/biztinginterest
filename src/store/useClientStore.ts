import { create } from 'zustand'
import type { ClientUser, AccessLog } from './../types/client'

interface ClientState {
  users: ClientUser[]
  selectedUser: ClientUser | null
  logs: AccessLog[]
  setUsers: (users: ClientUser[]) => void
  setSelectedUser: (user: ClientUser | null) => void
  addLog: (log: AccessLog) => void
}

export const useClientStore = create<ClientState>((set) => ({
  users: [],
  selectedUser: null,
  logs: [],
  setUsers: (users) => set({ users }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  addLog: (log) =>
    set((state) => ({ logs: [...state.logs, log] })),
}))