import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useClientStore } from './../../store/useClientStore'
import OTPModal from './../../components/OTPModal'

export default function UserDetail() {
  const { id } = useParams()
  const { selectedUser, setSelectedUser, addLog } = useClientStore()

  useEffect(() => {
    // 🔥 GET /api/client/users/:id
    const user = {
      id: Number(id),
      name: '홍길동',
      phone: '01012345678',
      consentedAt: '2026-02-01',
      consentVersion: 'v1.0',
    }

    setSelectedUser(user)

    // 접근 로그 기록
    addLog({
      userId: user.id,
      accessedAt: new Date().toISOString(),
      action: 'view',
    })
  }, [id])

  if (!selectedUser) return null

  return (
    <div className="ts-p-6">
      <h1 className="ts-text-xl ts-font-bold ts-mb-4">유저 상세</h1>

      <div className="ts-bg-white ts-p-6 ts-rounded ts-shadow ts-mb-4">
        <div>이름: {selectedUser.name}</div>
        <div>전화번호: {selectedUser.phone}</div>
        <div>동의버전: {selectedUser.consentVersion}</div>
      </div>

      <OTPModal userId={selectedUser.id} />
    </div>
  )
}