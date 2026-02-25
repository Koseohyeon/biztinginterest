import { useState } from 'react'
import { provisionHistoryMock } from '../../mocks/provisionData'
import type{ ProvisionHistoryItem } from './../../types/provision'

export default function ProvisionHistory() {
  const [history] = useState<ProvisionHistoryItem[]>(provisionHistoryMock)

  return (
    <div className="tw-min-h-screen tw-bg-gray-50 tw-p-10">
      <h1 className="tw-text-2xl tw-font-bold tw-mb-6">
        개인정보 제공 내역 조회
      </h1>

      <div className="tw-bg-white tw-rounded-xl tw-shadow tw-overflow-hidden">
        <table className="tw-w-full tw-text-left">
          <thead className="tw-bg-gray-100">
            <tr>
              <th className="tw-p-4">제공 기업</th>
              <th className="tw-p-4">제공 일자</th>
              <th className="tw-p-4">제공 목적</th>
              <th className="tw-p-4">제공 항목</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr
                key={item.id}
                className="tw-border-t hover:tw-bg-gray-50"
              >
                <td className="tw-p-4">{item.companyName}</td>
                <td className="tw-p-4">{item.providedAt}</td>
                <td className="tw-p-4">{item.purpose}</td>
                <td className="tw-p-4">{item.dataType}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {history.length === 0 && (
          <div className="tw-p-6 tw-text-center tw-text-gray-500">
            제공 내역이 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}