export interface ManagedClient {
  id: number
  name: string
  role: 'viewer' | 'manager'
  status: 'active' | 'locked'
}

export interface SystemLog {
  id: number
  actor: string
  action: string
  target: string
  createdAt: string
}

export interface ConsentPolicy {
  version: string
  createdAt: string
  isActive: boolean
}