import { useEffect, useState } from 'react'
import { useUserStore } from '../../store/useUserStore'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()
  const { consentVersion, setConsentVersion } = useUserStore()

  const [agree, setAgree] = useState(false)

  useEffect(() => {
    // 🔥 백엔드: 최신 동의 버전 조회
    setConsentVersion({
      version: 'v1.0',
      createdAt: '2026-01-01',
      details: [
        {
          clientId: 1,
          clientName: 'OO쇼핑몰',
          purpose: '포인트 적립',
          fields: ['이름', '전화번호'],
          retentionDays: 365,
        },
      ],
    })
  }, [])

  const handleSignup = () => {
    // 🔥 POST /api/user/signup
    navigate('/user/mypage')
  }

  return (
    <div className="ts-min-h-screen ts-flex ts-items-center ts-justify-center ts-bg-gray-100">
      <div className="ts-bg-white ts-p-8 ts-rounded ts-shadow ts-w-[500px]">
        <h1 className="ts-text-xl ts-font-bold ts-mb-4">회원가입</h1>

        <div className="ts-border ts-p-4 ts-mb-4 ts-h-40 ts-overflow-y-auto ts-text-sm">
          {consentVersion?.details.map((d) => (
            <div key={d.clientId} className="ts-mb-3">
              <div className="ts-font-semibold">{d.clientName}</div>
              <div>목적: {d.purpose}</div>
              <div>항목: {d.fields.join(', ')}</div>
              <div>보유기간: {d.retentionDays}일</div>
            </div>
          ))}
        </div>

        <label className="ts-flex ts-items-center ts-mb-4">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
            className="ts-mr-2"
          />
          전체 동의합니다
        </label>

        <button
          disabled={!agree}
          onClick={handleSignup}
          className="ts-w-full ts-bg-blue-600 ts-text-white ts-py-2 ts-rounded disabled:ts-bg-gray-300"
        >
          가입하기
        </button>
      </div>
    </div>
  )
}