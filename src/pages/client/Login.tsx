import { useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  const handleLogin = () => {
    
    login({
      id: 1,
      name: 'OO쇼핑몰',
      role: 'client',
      token: 'mock-jwt-token',
    })

    navigate('/client/dashboard')
  }

  return (
    <div className="ts-min-h-screen ts-flex ts-items-center ts-justify-center ts-bg-gray-100">
      <div className="ts-bg-white ts-p-8 ts-rounded ts-shadow ts-w-96">
        <h1 className="ts-text-xl ts-font-bold ts-mb-4">고객사 로그인</h1>

        <input
          placeholder="아이디"
          className="ts-w-full ts-border ts-p-2 ts-mb-3"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <input
          type="password"
          placeholder="비밀번호"
          className="ts-w-full ts-border ts-p-2 ts-mb-4"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="ts-w-full ts-bg-blue-600 ts-text-white ts-py-2 ts-rounded"
        >
          로그인
        </button>
      </div>
    </div>
  )
}