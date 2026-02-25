export type ClientRole = 'viewer' | 'manager'

export interface ClientUser {
  id: number
  name: string
  phone: string
  consentedAt: string
  consentVersion: string
}

export interface AccessLog {
  userId: number
  accessedAt: string
  action: 'view' | 'download'
}