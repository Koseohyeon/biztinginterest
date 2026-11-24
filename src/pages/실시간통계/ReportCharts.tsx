import { useId, useState } from 'react';
import {
  CartesianGrid, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { ChartNoAxesCombined, TrendingUp } from 'lucide-react';
import InfoTip from './InfoTip';
import {
  COLLECTING_LABEL, DAILY_SCHEDULE_NOTE, DAYS, IPHONE_RCS_READ_NOTE, formatCount, formatDay, formatRate, getDemographics, getTopDemographicReaction, ratio, shortDay,
} from './reportData';
import type { Report, ReportDays } from './reportData';

const READ = '#4268ee';
const REACTION = '#925cda';
const ageColors = ['#4268ee', '#79a4ff', '#a06be8', '#45b7ae', '#627ad4', '#ee9a62'];
const sexColors: Record<string, string> = { 남성: '#4268ee', 여성: '#a06be8', 미분류: '#a8b5cf' };

function DailyPerformanceChart({ report, days }: { report: Report; days: ReportDays }) {
  const [unit, setUnit] = useState<'rate' | 'count'>('rate');
  const useRate = unit === 'rate';
  const display = useRate ? formatRate : formatCount;
  const data = days.map(({ aggregationDate, date, dailyRead, dailyReaction }) => ({
    day: shortDay(aggregationDate),
    date: shortDay(date),
    read: useRate ? ratio(dailyRead, report.delivered) : dailyRead,
    reaction: useRate ? ratio(dailyReaction, report.delivered) : dailyReaction,
  }));
  const readLabel = useRate ? '읽음률' : '읽음수';
  const reactionLabel = useRate ? '반응률' : '반응수';
  const havePoints = data.some((day) => day.read !== null || day.reaction !== null);
  const gradientId = useId();
  const readGradient = gradientId + '-read';
  const reactionGradient = gradientId + '-reaction';

  return (
    <section className="tw-report-card tw-report-trend" aria-labelledby="tw-report-trend-title">
      <div className="tw-report-section-top">
        <div>
          <h2 id="tw-report-trend-title">일자별 성과</h2>
          <p>{DAILY_SCHEDULE_NOTE}</p>
        </div>
        <div className="tw-report-switch" role="group" aria-label="그래프 표시 단위">
          <button type="button" onClick={() => setUnit('rate')} aria-pressed={useRate}>비율</button>
          <button type="button" onClick={() => setUnit('count')} aria-pressed={!useRate}>건수</button>
        </div>
      </div>
      <div className="tw-report-series" aria-label="그래프 범례">
        <div>
          <i style={{ background: READ }} />{readLabel}
          {useRate && (
            <InfoTip label={readLabel} note={report.sendType.includes('통합') ? IPHONE_RCS_READ_NOTE : undefined}>
              발송 성공 건 중 메시지를 열어본 비율이에요.
            </InfoTip>
          )}
        </div>
        <div><i style={{ background: REACTION }} />{reactionLabel}</div>
      </div>
      {havePoints ? (
        <div className="tw-report-chart">
          <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 350, height: 230 }}>
            <BarChart data={data} margin={{ top: 12, right: 10, left: 0, bottom: 4 }}>
              <defs>
                <linearGradient id={readGradient} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#86a6ff" />
                  <stop offset="100%" stopColor={READ} />
                </linearGradient>
                <linearGradient id={reactionGradient} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c5a0f7" />
                  <stop offset="100%" stopColor={REACTION} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#eaf0fa" />
              <XAxis dataKey="day" interval={0} axisLine={false} tickLine={false} tick={{ fill: '#5a6d90', fontSize: 11 }} tickMargin={10} />
              <YAxis width={45} allowDecimals={useRate} axisLine={false} tickLine={false}
                tick={{ fill: '#5a6d90', fontSize: 11 }} tickFormatter={(value) => useRate ? value + '%' : formatCount(value)} />
              <Tooltip
                labelFormatter={(label, payload) => String(label) + (payload[0]?.payload.date ? ' · ' + payload[0].payload.date + ' 성과' : '')}
                formatter={(value) => typeof value === 'number' ? display(value) + (useRate ? '' : '건') : COLLECTING_LABEL}
                contentStyle={{ border: '1px solid #e3eaf6', borderRadius: 14, padding: '9px 12px', fontSize: 12, boxShadow: '0 8px 22px #2b46821a' }}
                cursor={{ fill: '#edf2ff' }}
              />
              <Bar dataKey="read" name={readLabel} fill={'url(#' + readGradient + ')'}
                radius={[9, 9, 3, 3]} maxBarSize={28} isAnimationActive={false} />
              <Bar dataKey="reaction" name={reactionLabel} fill={'url(#' + reactionGradient + ')'}
                radius={[9, 9, 3, 3]} maxBarSize={28} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="tw-report-empty">
          <ChartNoAxesCombined size={26} aria-hidden="true" />
          <p>{COLLECTING_LABEL}</p>
        </div>
      )}
      <p className="tw-report-chart-note">
        일간 비율은 날짜별 집계 수를 캠페인 전체 발송 성공 수로 나눈 값이에요.
      </p>
    </section>
  );
}

type Slice = { label: string; share: number | null; color: string };

function Donut({ title, slices }: { title: string; slices: Slice[] }) {
  const sectors: string[] = [];
  let start = 0;
  for (const { share, color } of slices) {
    if (share === null || share === 0) continue;
    const end = start + share;
    sectors.push(color + ' ' + start + '% ' + end + '%');
    start = end;
  }

  return (
    <div className="tw-report-donut-panel">
      <h3>{title}</h3>
      <div className="tw-report-donut-body">
        <div className="tw-report-donut" aria-hidden="true" style={sectors.length > 0
          ? { background: 'conic-gradient(' + sectors.join(', ') + ')' } : undefined}>
          <div><strong>{sectors.length > 0 ? '100%' : COLLECTING_LABEL}</strong></div>
        </div>
        <ul className="tw-report-legend" aria-label={title}>
          {slices.map(({ label, share, color }) => (
            <li key={label}><i style={{ background: color }} /><span>{label}</span><strong>{formatRate(share)}</strong></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Demographics({ segments }: { segments: Report['segments'] }) {
  const { ageShares, sexShares } = getDemographics(segments);
  const top = getTopDemographicReaction(segments);
  const leadingGroups = top?.groups.slice(0, 2).join(' · ');
  const extraGroups = top ? top.groups.length - 2 : 0;
  return (
    <section className="tw-report-card tw-report-demographics" aria-labelledby="tw-report-demographics-title">
      <div className="tw-report-section-top">
        <div>
          <h2 id="tw-report-demographics-title">연령·성별 분석</h2>
          <p>발송 성공 수신자의 연령·성별 구성과 반응률을 확인해 보세요.</p>
        </div>
      </div>
      {ageShares.length ? (
        <>
          <div className="tw-report-demographic-insight">
            <TrendingUp size={17} aria-hidden="true" />
            <p>
              {top === null ? '연령·성별 반응률은 집계 중이에요.' : top.rate === 0 ? '집계된 연령·성별 그룹에서 반응이 아직 없어요.' : (
                <>
                  <strong>{leadingGroups}{extraGroups > 0 && ` 외 ${extraGroups}개 그룹`}</strong>의 반응률이{' '}
                  <strong>{formatRate(top.rate)}</strong>로 {top.groups.length > 1 ? '공동 1위였어요.' : '가장 높았어요.'}
                </>
              )}
            </p>
          </div>
          <div className="tw-report-donuts">
            <Donut title="연령별 수신자 비율" slices={ageShares.map((row, index) => ({ ...row, color: ageColors[index % ageColors.length] }))} />
            <Donut title="성별 수신자 비율" slices={sexShares.map((row) => ({ ...row, color: sexColors[row.label] }))} />
          </div>
          <p className="tw-report-chart-note">발송 성공 수를 확인할 수 있는 연령·성별 데이터를 기준으로 계산했어요.</p>
        </>
      ) : <div className="tw-report-empty"><p>{COLLECTING_LABEL}</p></div>}
    </section>
  );
}

function DailyTable({ days, delivered }: { days: ReportDays; delivered: Report['delivered'] }) {
  return (
    <section className="tw-report-card" aria-labelledby="tw-report-daily-title">
      <div className="tw-report-section-top">
        <div>
          <h2 id="tw-report-daily-title">일자별 통계 표</h2>
          <p>첫 집계일부터 {DAYS}일간의 집계 결과를 확인할 수 있어요.</p>
        </div>
      </div>
      <div className="tw-report-table-wrap">
        <table className="tw-report-table tw-report-daily-table">
          <thead><tr><th scope="col">집계일</th><th scope="col">읽음률</th><th scope="col">반응률</th><th scope="col">읽음수</th><th scope="col">반응수</th></tr></thead>
          <tbody>{days.map((day) => (
            <tr key={day.date}>
              <th scope="row">
                <span>{formatDay(day.aggregationDate)}</span>
                <small>{shortDay(day.date)} 성과</small>
              </th>
              {day.hasDailyData ? (
                <>
                  <td>{formatRate(ratio(day.dailyRead, delivered))}</td>
                  <td>{formatRate(ratio(day.dailyReaction, delivered))}</td>
                  <td>{formatCount(day.dailyRead)}</td>
                  <td>{formatCount(day.dailyReaction)}</td>
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

type ReportChartProps = {
  report: Report;
  days: ReportDays;
  dailyStarted: boolean;
};

export default function ReportCharts({ report, days, dailyStarted }: ReportChartProps) {
  return (
    <>
      <DailyPerformanceChart report={report} days={days} />
      <DailyTable days={days} delivered={report.delivered} />
      <Demographics segments={dailyStarted ? report.segments : []} />
    </>
  );
}
