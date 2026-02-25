import { create } from 'zustand'
import type { AuthUser, Role } from './../types/auth'

interface AuthState {
  user: AuthUser | null
  login: (user: AuthUser) => void
  logout: () => void
  hasRole: (roles: Role[]) => boolean
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,

  login: (user) => set({ user }),

  logout: () => set({ user: null }),

  hasRole: (roles) => {
    const current = get().user?.role
    return current ? roles.includes(current) : false
  },
}))