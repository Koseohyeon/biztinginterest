import { useEffect } from 'react'
import { useAdminStore } from '../../store/useAdminStore'

export default function ClientManagement() {
  const { clients, setClients } = useAdminStore()

  useEffect(() => {
    // 🔥 GET /api/admin/clients
    setClients([
      { id: 1, name: 'OO쇼핑몰', role: 'manager', status: 'active' },
    ])
  }, [])

  return (
    <div className="ts-p-6">
      <h1 className="ts-text-2xl ts-font-bold ts-mb-4">고객사 관리</h1>

      <table className="ts-w-full ts-border">
        <thead className="ts-bg-gray-100">
          <tr>
            <th className="ts-border ts-p-2">이름</th>
            <th className="ts-border ts-p-2">권한</th>
            <th className="ts-border ts-p-2">상태</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.id}>
              <td className="ts-border ts-p-2">{c.name}</td>
              <td className="ts-border ts-p-2">{c.role}</td>
              <td className="ts-border ts-p-2">{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}