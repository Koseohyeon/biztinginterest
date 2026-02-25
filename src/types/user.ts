export interface ConsentDetail {
  clientId: number
  clientName: string
  purpose: string
  fields: string[]
  retentionDays: number
}

export interface ConsentVersion {
  version: string
  createdAt: string
  details: ConsentDetail[]
}

export interface UserProfile {
  id: number
  name: string
  email: string
  phone: string
  ci: string
  consentVersion: string
  consentedAt: string
  withdrawnAt?: string
}