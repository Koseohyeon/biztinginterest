export type Role = 'user' | 'client' | 'admin'

export interface AuthUser {
  id: number
  name: string
  role: Role
  token: string
}