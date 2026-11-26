import { COLLECTING_LABEL, formatCount, formatDateWithWeekday, formatRate, getDays, ratio, readRate } from './reportData';
import type { Report } from './reportData';

export default function DailyStats({ report }: { report: Report }) {
  return (
    <section className="tw-report-card" aria-labelledby="tw-report-daily-title">
      <div className="tw-report-section-top">
        <div>
          <h2 id="tw-report-daily-title">일간통계</h2>
          <p>매일 오전 4시 30분에 전날까지의 성과를 반영해요.</p>
        </div>
      </div>
      <div className="tw-report-table-wrap">
        <table className="tw-report-table tw-report-daily-table">
          <thead><tr><th scope="col">날짜</th><th scope="col">읽음수</th><th scope="col">읽음률</th><th scope="col">반응수</th><th scope="col">반응률</th></tr></thead>
          <tbody>{getDays(report).map((day) => (
            <tr key={day.date}>
              <th scope="row"><time dateTime={day.date}>{formatDateWithWeekday(day.date, true)}</time></th>
              {day.hasDailyData ? (
                <>
                  <td>{formatCount(day.cumulativeRead)}</td>
                  <td>{formatRate(readRate(report, day.cumulativeRead))}</td>
                  <td>{formatCount(day.cumulativeReaction)}</td>
                  <td>{formatRate(ratio(day.cumulativeReaction, report.delivered))}</td>
                </>
              ) : (
                <td className="tw-report-daily-collecting" colSpan={4}>{COLLECTING_LABEL}</td>
              )}
            </tr>
          ))}</tbody>
        </table>
      </div>
    </section>
  );
}
