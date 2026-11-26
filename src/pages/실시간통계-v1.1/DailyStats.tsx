import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {
  COLLECTING_LABEL, formatCount, formatDateWithWeekday, formatRate, getDays, isFinal, ratio, readRate,
} from './reportData';
import type { Report, ReportDays } from './reportData';

const READ = '#4268ee';
const REACTION = '#925cda';

function Summary({ report, days }: { report: Report; days: ReportDays }) {
  const latest = days.filter((day) => day.hasDailyData).at(-1);
  const read = latest?.cumulativeRead ?? null;
  const reaction = latest?.cumulativeReaction ?? null;
  const title = isFinal(report) ? '최종 결과'
    : latest ? formatDateWithWeekday(latest.date, true) + '까지 결과' : '현재 결과';
  const items = [
    { label: '읽음수', value: formatCount(read) },
    { label: '읽음률', value: formatRate(readRate(report, read)) },
    { label: '반응수', value: formatCount(reaction) },
    { label: '반응률', value: formatRate(ratio(reaction, report.delivered)) },
  ];
  return (
    <section className="tw-report-card" aria-labelledby="tw-report-daily-summary-title">
      <div className="tw-report-section-top"><h2 id="tw-report-daily-summary-title">{title}</h2></div>
      <dl className="tw-report-daily-summary">
        {items.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
      </dl>
    </section>
  );
}

function DailyChart({ report, days }: { report: Report; days: ReportDays }) {
  const [unit, setUnit] = useState<'rate' | 'count'>('rate');
  const useRate = unit === 'rate';
  const display = useRate ? formatRate : formatCount;
  const readLabel = useRate ? '읽음률' : '읽음수';
  const reactionLabel = useRate ? '반응률' : '반응수';
  const data = days.map((day) => ({
    day: day.date.slice(5).replace('-', '/'),
    read: useRate ? readRate(report, day.cumulativeRead) : day.cumulativeRead,
    reaction: useRate ? ratio(day.cumulativeReaction, report.delivered) : day.cumulativeReaction,
  }));
  return (
    <section className="tw-report-card tw-report-trend" aria-labelledby="tw-report-trend-title">
      <div className="tw-report-section-top">
        <h2 id="tw-report-trend-title">일간 그래프</h2>
        <div className="tw-report-switch" role="group" aria-label="그래프 표시 단위">
          <button type="button" onClick={() => setUnit('rate')} aria-pressed={useRate}>비율</button>
          <button type="button" onClick={() => setUnit('count')} aria-pressed={!useRate}>건수</button>
        </div>
      </div>
      <div className="tw-report-series" aria-label="그래프 범례">
        <div><i style={{ background: READ }} />{readLabel}</div>
        <div><i style={{ background: REACTION }} />{reactionLabel}</div>
      </div>
      {data.some((day) => day.read !== null || day.reaction !== null) ? (
        <div className="tw-report-chart">
          <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 350, height: 230 }}>
            <BarChart data={data} margin={{ top: 12, right: 10, left: 0, bottom: 4 }}>
              <CartesianGrid vertical={false} stroke="#eaf0fa" />
              <XAxis dataKey="day" interval={0} axisLine={false} tickLine={false} tickMargin={8}
                tick={{ fill: '#5a6d90', fontSize: 10 }} />
              <YAxis width={45} allowDecimals={useRate} axisLine={false} tickLine={false}
                tick={{ fill: '#5a6d90', fontSize: 11 }} tickFormatter={(value) => useRate ? value + '%' : formatCount(value)} />
              <Tooltip
                formatter={(value) => typeof value === 'number' ? display(value) + (useRate ? '' : '건') : COLLECTING_LABEL}
                contentStyle={{ border: '1px solid #e3eaf6', borderRadius: 14, padding: '9px 12px', fontSize: 12 }}
                cursor={{ fill: '#edf2ff' }}
              />
              <Bar dataKey="read" name={readLabel} fill={READ} radius={[9, 9, 3, 3]} maxBarSize={28} isAnimationActive={false} />
              <Bar dataKey="reaction" name={reactionLabel} fill={REACTION} radius={[9, 9, 3, 3]} maxBarSize={28} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : <div className="tw-report-empty"><p>{COLLECTING_LABEL}</p></div>}
    </section>
  );
}

function DailyTable({ report, days }: { report: Report; days: ReportDays }) {
  return (
    <section className="tw-report-card" aria-labelledby="tw-report-daily-title">
      <div className="tw-report-section-top">
        <div>
          <h2 id="tw-report-daily-title">일간통계 표</h2>
          <p>매일 오전 4시 30분에 전날까지의 성과를 반영해요.</p>
        </div>
      </div>
      <div className="tw-report-table-wrap">
        <table className="tw-report-table tw-report-daily-table">
          <thead><tr><th scope="col">날짜</th><th scope="col">읽음수</th><th scope="col">읽음률</th><th scope="col">반응수</th><th scope="col">반응률</th></tr></thead>
          <tbody>{days.map((day) => (
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

export default function DailyStats({ report }: { report: Report }) {
  const days = getDays(report);
  return (
    <>
      <Summary report={report} days={days} />
      <DailyChart report={report} days={days} />
      <DailyTable report={report} days={days} />
    </>
  );
}
