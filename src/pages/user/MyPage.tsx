import { useEffect } from 'react'
import { useUserStore } from '../../store/useUserStore'
import { useNavigate } from 'react-router-dom'

export default function MyPage() {
  const { profile, setProfile } = useUserStore()
  const navigate = useNavigate()

  useEffect(() => {
    setProfile({
      id: 1,
      name: '홍길동',
      email: 'test@test.com',
      phone: '01012345678',
      ci: 'encrypted-ci',
      consentVersion: 'v1.0',
      consentedAt: '2026-02-01',
    })
  }, [])

  const withdraw = () => {
  const confirmed = window.confirm('동의를 철회하시겠습니까?')

  if (confirmed) {
    alert('동의 철회 완료')
    navigate('/user/provision-history')
  }
}

  return (
    <div className="ts-p-6">
      <h1 className="ts-text-2xl ts-font-bold ts-mb-4">마이페이지</h1>

      <div className="ts-bg-white ts-p-6 ts-rounded ts-shadow ts-mb-6">
        <div>이름: {profile?.name}</div>
        <div>이메일: {profile?.email}</div>
        <div>동의버전: {profile?.consentVersion}</div>
        <div>동의일: {profile?.consentedAt}</div>
      </div>

      <button
  onClick={() => navigate('/user/provision-history')}
  className="tw-mt-4 tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg"
>
  제공내역 조회
</button>

      <button
        onClick={withdraw}
        className="ts-bg-red-600 ts-text-white ts-px-4 ts-py-2 ts-rounded"
      >
        동의 철회
      </button>
    </div>
  )
}