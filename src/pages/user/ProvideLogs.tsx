import { useEffect } from 'react'
import { useUserStore } from '../../store/useUserStore'

export default function ProvideLogs() {
  const { provideLogs, setProvideLogs } = useUserStore()

  useEffect(() => {
    // 🔥 GET /api/user/provide-logs
    setProvideLogs([
      {
        clientName: 'OO쇼핑몰',
        providedAt: '2026-02-10',
        fields: ['이름', '전화번호'],
      },
    ])
  }, [])

  return (
    <div className="ts-p-6">
      <h1 className="ts-text-xl ts-font-bold ts-mb-4">제공 내역</h1>

      <table className="ts-w-full ts-border">
        <thead className="ts-bg-gray-100">
          <tr>
            <th className="ts-border ts-p-2">고객사</th>
            <th className="ts-border ts-p-2">제공일</th>
            <th className="ts-border ts-p-2">항목</th>
          </tr>
        </thead>
        <tbody>
          {provideLogs.map((log, idx) => (
            <tr key={idx}>
              <td className="ts-border ts-p-2">{log.clientName}</td>
              <td className="ts-border ts-p-2">{log.providedAt}</td>
              <td className="ts-border ts-p-2">
                {log.fields.join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}