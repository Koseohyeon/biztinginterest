import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import type { Role } from './../types/auth'
import type { ReactNode } from 'react'

interface Props {
  roles: Role[]
  children: ReactNode
}

export default function ProtectedRoute({ roles, children }: Props) {
  const { user, hasRole } = useAuthStore()

  if (!user) return <Navigate to="/" />
  if (!hasRole(roles)) return <Navigate to="/" />

  return children
}