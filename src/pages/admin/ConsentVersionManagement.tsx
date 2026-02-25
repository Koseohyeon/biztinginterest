import { useEffect } from 'react'
import { useAdminStore } from '../../store/useAdminStore'

export default function ConsentVersionManagement() {
  const { policies, setPolicies } = useAdminStore()

  useEffect(() => {
    // 🔥 GET /api/admin/consent-versions
    setPolicies([
      { version: 'v1.0', createdAt: '2026-01-01', isActive: true },
    ])
  }, [])

  return (
    <div className="ts-p-6">
      <h1 className="ts-text-xl ts-font-bold ts-mb-4">동의 버전 관리</h1>

      <table className="ts-w-full ts-border">
        <thead className="ts-bg-gray-100">
          <tr>
            <th className="ts-border ts-p-2">버전</th>
            <th className="ts-border ts-p-2">생성일</th>
            <th className="ts-border ts-p-2">활성화</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((p) => (
            <tr key={p.version}>
              <td className="ts-border ts-p-2">{p.version}</td>
              <td className="ts-border ts-p-2">{p.createdAt}</td>
              <td className="ts-border ts-p-2">
                {p.isActive ? '활성' : '비활성'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}