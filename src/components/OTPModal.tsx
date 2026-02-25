import { useState } from 'react'
import { useClientStore } from '../store/useClientStore'

interface Props {
  userId: number
}

export default function OTPModal({ userId }: Props) {
  const { addLog } = useClientStore()
  const [open, setOpen] = useState(false)
  const [otp, setOtp] = useState('')

  const verify = () => {
    // 🔥 POST /api/client/verify-otp

    addLog({
      userId,
      accessedAt: new Date().toISOString(),
      action: 'download',
    })

    alert('다운로드 완료')
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="ts-bg-blue-600 ts-text-white ts-px-4 ts-py-2 ts-rounded"
      >
        데이터 다운로드
      </button>

      {open && (
        <div className="ts-fixed ts-inset-0 ts-bg-black/40 ts-flex ts-items-center ts-justify-center">
          <div className="ts-bg-white ts-p-6 ts-rounded ts-w-80">
            <h2 className="ts-font-bold ts-mb-3">OTP 인증</h2>

            <input
              className="ts-w-full ts-border ts-p-2 ts-mb-3"
              placeholder="OTP 입력"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={verify}
              className="ts-w-full ts-bg-green-600 ts-text-white ts-py-2 ts-rounded"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  )
}