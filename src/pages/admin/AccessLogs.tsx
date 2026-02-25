import { useEffect } from 'react'
import { useAdminStore } from '../../store/useAdminStore'

export default function AccessLogs() {
  const { logs, setLogs } = useAdminStore()

  useEffect(() => {
    // 🔥 GET /api/admin/access-logs
    setLogs([
      {
        id: 1,
        actor: 'OO쇼핑몰',
        action: 'download',
        target: '홍길동',
        createdAt: '2026-02-20',
      },
    ])
  }, [])

  return (
    <div className="ts-p-6">
      <h1 className="ts-text-xl ts-font-bold ts-mb-4">접근 로그</h1>

      <table className="ts-w-full ts-border">
        <thead className="ts-bg-gray-100">
          <tr>
            <th className="ts-border ts-p-2">행위자</th>
            <th className="ts-border ts-p-2">행동</th>
            <th className="ts-border ts-p-2">대상</th>
            <th className="ts-border ts-p-2">일시</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((l) => (
            <tr key={l.id}>
              <td className="ts-border ts-p-2">{l.actor}</td>
              <td className="ts-border ts-p-2">{l.action}</td>
              <td className="ts-border ts-p-2">{l.target}</td>
              <td className="ts-border ts-p-2">{l.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}