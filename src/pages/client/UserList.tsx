import { useEffect } from 'react'
import { useClientStore } from './../../store/useClientStore'
import { useNavigate } from 'react-router-dom'

export default function UserList() {
  const { users, setUsers } = useClientStore()
  const navigate = useNavigate()

  useEffect(() => {
    // 🔥 GET /api/client/users
    setUsers([
      {
        id: 1,
        name: '홍길동',
        phone: '010****5678',
        consentedAt: '2026-02-01',
        consentVersion: 'v1.0',
      },
    ])
  }, [])

  return (
    <div className="ts-p-6">
      <h1 className="ts-text-2xl ts-font-bold ts-mb-4">동의 유저 목록</h1>

      <table className="ts-w-full ts-border">
        <thead className="ts-bg-gray-100">
          <tr>
            <th className="ts-border ts-p-2">이름</th>
            <th className="ts-border ts-p-2">전화번호</th>
            <th className="ts-border ts-p-2">동의일</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr
              key={u.id}
              className="ts-cursor-pointer hover:ts-bg-gray-50"
              onClick={() => navigate(`/client/users/${u.id}`)}
            >
              <td className="ts-border ts-p-2">{u.name}</td>
              <td className="ts-border ts-p-2">{u.phone}</td>
              <td className="ts-border ts-p-2">{u.consentedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}