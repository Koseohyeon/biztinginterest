import { memo, useId, useState } from 'react';
import {
  CartesianGrid, Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { ChartNoAxesCombined, Mail } from 'lucide-react';
import EstimatedResidence from './EstimatedResidence';
import InfoTip from './InfoTip';
import {
  CONTACT, DAILY_SCHEDULE_NOTE, DAYS, IPHONE_RCS_READ_NOTE, formatCount, formatDay, formatRate, getDemographics, ratio, shortDay,
} from './reportData';
import type { Report, ReportDays } from './reportData';

const READ = '#4268ee';
const REACTION = '#925cda';
const ageColors = ['#4268ee', '#79a4ff', '#a06be8', '#45b7ae', '#627ad4', '#ee9a62'];
const sexColors: Record<string, string> = { 남성: '#4268ee', 여성: '#a06be8', 미분류: '#a8b5cf' };

function TrendChart({ report, days, daily }: { report: Report; days: ReportDays; daily: boolean }) {
  const [unit, setUnit] = useState<'rate' | 'count'>('rate');
  const useRate = unit === 'rate';
  const display = useRate ? formatRate : formatCount;
  const data = days.map((day, index) => {
    const read = daily ? day.dailyRead : day.cumulativeRead;
    const reaction = daily ? day.dailyReaction : day.cumulativeReaction;
    return {
      day: daily ? shortDay(day.aggregationDate) : String(index + 1) + '일차',
      date: shortDay(day.date),
      read: useRate ? ratio(read, report.delivered) : read,
      reaction: useRate ? ratio(reaction, report.delivered) : reaction,
    };
  });
  const readLabel = useRate ? '읽음률' : '읽음수';
  const reactionLabel = useRate ? '반응률' : '반응수';
  const havePoints = data.some((day) => day.read !== null || day.reaction !== null);
  const Chart = daily ? BarChart : AreaChart;
  const gradientId = useId();
  const readGradient = gradientId + '-read';
  const reactionGradient = gradientId + '-reaction';

  return (
    <section className="tw-report-card tw-report-trend" aria-labelledby="tw-report-trend-title">
      <div className="tw-report-section-top">
        <div>
          <h2 id="tw-report-trend-title">{daily ? '일자별 성과' : '7일 누적 추이'}</h2>
          <p>{daily ? DAILY_SCHEDULE_NOTE : '발송 후 읽음·반응 추이를 확인하세요.'}</p>
        </div>
        <div className="tw-report-switch" role="group" aria-label="그래프 표시 단위">
          <button type="button" onClick={() => setUnit('rate')} aria-pressed={useRate}>비율</button>
          <button type="button" onClick={() => setUnit('count')} aria-pressed={!useRate}>건수</button>
        </div>
      </div>
      <div className="tw-report-series" aria-label="그래프 범례">
        <div>
          <i style={{ background: READ }} />{readLabel}
          {daily && useRate && (
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
            <Chart data={data} margin={{ top: 12, right: 10, left: 0, bottom: 4 }}>
              <defs>
                <linearGradient id={readGradient} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={daily ? '#86a6ff' : READ} stopOpacity={daily ? 1 : 0.34} />
                  <stop offset="100%" stopColor={READ} stopOpacity={daily ? 1 : 0.035} />
                </linearGradient>
                <linearGradient id={reactionGradient} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={daily ? '#c5a0f7' : REACTION} stopOpacity={daily ? 1 : 0.35} />
                  <stop offset="100%" stopColor={REACTION} stopOpacity={daily ? 1 : 0.075} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#eaf0fa" />
              <XAxis dataKey="day" interval={0} axisLine={false} tickLine={false} tick={{ fill: '#5a6d90', fontSize: 11 }} tickMargin={10} />
              <YAxis width={45} allowDecimals={useRate} axisLine={false} tickLine={false}
                tick={{ fill: '#5a6d90', fontSize: 11 }} tickFormatter={(value) => useRate ? value + '%' : formatCount(value)} />
              <Tooltip
                labelFormatter={(label, payload) => String(label) + (payload[0]?.payload.date ? ' · ' + payload[0].payload.date + (daily ? ' 성과' : '') : '')}
                formatter={(value) => display(typeof value === 'number' ? value : null) + (useRate ? '' : '건')}
                contentStyle={{ border: '1px solid #e3eaf6', borderRadius: 14, padding: '9px 12px', fontSize: 12, boxShadow: '0 8px 22px #2b46821a' }}
                cursor={daily ? { fill: '#edf2ff' } : { stroke: '#bfcdf4', strokeDasharray: '4 4' }}
              />
              {daily ? (
                <>
                  <Bar dataKey="read" name={readLabel} fill={'url(#' + readGradient + ')'}
                    radius={[9, 9, 3, 3]} maxBarSize={28} isAnimationActive={false} />
                  <Bar dataKey="reaction" name={reactionLabel} fill={'url(#' + reactionGradient + ')'}
                    radius={[9, 9, 3, 3]} maxBarSize={28} isAnimationActive={false} />
                </>
              ) : (
                <>
                  <Area type="monotone" dataKey="read" name={readLabel} stroke={READ} fill={'url(#' + readGradient + ')'}
                    fillOpacity={1} strokeWidth={3.3} strokeLinecap="round"
                    dot={{ fill: READ, stroke: '#fff', strokeWidth: 2, r: 4 }}
                    activeDot={{ fill: READ, stroke: '#e1e9ff', strokeWidth: 4, r: 6 }} isAnimationActive={false} />
                  <Area type="monotone" dataKey="reaction" name={reactionLabel} stroke={REACTION} fill={'url(#' + reactionGradient + ')'}
                    fillOpacity={1} strokeWidth={3} strokeLinecap="round"
                    dot={{ fill: REACTION, stroke: '#fff', strokeWidth: 2, r: 4 }}
                    activeDot={{ fill: REACTION, stroke: '#eee2fe', strokeWidth: 4, r: 6 }} isAnimationActive={false} />
                </>
              )}
            </Chart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="tw-report-empty">
          <ChartNoAxesCombined size={26} aria-hidden="true" />
          <p>{useRate && !report.delivered ? '발송 성공 데이터가 있어야 비율을 표시할 수 있어요.' : daily ? '아직 표시할 일간 집계가 없어요.' : '표시할 추이 데이터가 아직 없어요.'}</p>
        </div>
      )}
      <p className="tw-report-chart-note">
        {daily ? '일간 비율은 날짜별 집계 수를 캠페인 전체 발송 성공 수로 나눈 값이에요.' : '누적 비율은 전체 발송 성공 건을 기준으로 계산해요.'}
      </p>
      {!daily && havePoints && (
        <details className="tw-report-chart-data">
          <summary>누적 추이 표로 보기</summary>
          <div className="tw-report-table-wrap">
            <table className="tw-report-table">
              <thead><tr><th scope="col">집계 일차</th><th scope="col">{readLabel}</th><th scope="col">{reactionLabel}</th></tr></thead>
              <tbody>{data.map((day) => (
                <tr key={day.day}><th scope="row">{day.day} · {day.date}</th><td>{display(day.read)}</td><td>{display(day.reaction)}</td></tr>
              ))}</tbody>
            </table>
          </div>
        </details>
      )}
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
          <div><strong>{sectors.length > 0 ? '100%' : '—'}</strong></div>
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

function Demographics({ report }: { report: Report }) {
  const { ageShares, sexShares } = getDemographics(report.segments);
  return (
    <section className="tw-report-card tw-report-demographics" aria-labelledby="tw-report-demographics-title">
      <div className="tw-report-section-top">
        <div>
          <h2 id="tw-report-demographics-title">연령·성별 분석</h2>
          <p>발송 성공 수신자의 연령과 성별 구성을 확인해 보세요.</p>
        </div>
      </div>
      {ageShares.length ? (
        <>
          <div className="tw-report-donuts">
            <Donut title="연령별 수신자 비율" slices={ageShares.map((row, index) => ({ ...row, color: ageColors[index % ageColors.length] }))} />
            <Donut title="성별 수신자 비율" slices={sexShares.map((row) => ({ ...row, color: sexColors[row.label] }))} />
          </div>
          <p className="tw-report-chart-note">발송 성공 수를 확인할 수 있는 연령·성별 데이터를 기준으로 계산했어요.</p>
        </>
      ) : <div className="tw-report-empty"><p>표시할 연령·성별 데이터가 아직 없어요.</p></div>}
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
                <small>{day.state === 'upcoming' ? '집계 예정' : day.state === 'missing' ? '데이터 없음' : shortDay(day.date) + ' 성과'}</small>
              </th>
              <td>{formatRate(ratio(day.dailyRead, delivered))}</td>
              <td>{formatRate(ratio(day.dailyReaction, delivered))}</td>
              <td>{formatCount(day.dailyRead)}</td>
              <td>{formatCount(day.dailyReaction)}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <p className="tw-report-chart-note">‘—’는 산출 가능한 데이터가 없는 항목이에요.</p>
    </section>
  );
}

const benchmarks = [
  { label: '평균 미만', range: '1% 미만',
    text: '이번 캠페인의 반응률은 비즈팅 평균보다 낮아요. 캠페인 소재와 타겟팅 조건을 다시 살펴보세요. 개선 의견이 필요하면 문의해 주세요. 가입하신 이메일 주소로 추가 제안을 보내드릴 수 있어요.' },
  { label: '평균 수준', range: '1% 이상 ~ 3% 미만',
    text: '이번 캠페인의 반응률은 비즈팅 평균 수준이에요. 타겟팅 조건을 더 구체화하거나 메시지 문구와 소재를 조정하면 더 나은 반응을 기대할 수 있어요.' },
  { label: '평균 이상', range: '3% 이상',
    text: '이번 캠페인의 반응률은 비즈팅 평균보다 높아요. 타겟팅 조건과 메시지 문구가 고객의 반응을 잘 이끌어낸 것으로 보여요. 이번 성과를 다음 캠페인에도 활용해 보세요.' },
];

function Benchmark({ report }: { report: Report }) {
  const current = ratio(report.reactionCount, report.delivered);
  const band = current === null ? null : current < 1 ? 0 : current < 3 ? 1 : 2;

  return (
    <section className="tw-report-card tw-report-benchmark" aria-labelledby="tw-report-benchmark-title">
      <div className="tw-report-section-top">
        <div>
          <h2 id="tw-report-benchmark-title">비즈팅 평균과 비교</h2>
          <p>비즈팅 캠페인의 평균 반응률 구간은 1% 이상 ~ 3% 미만이에요.</p>
        </div>
        {band !== null && <span className="tw-report-benchmark-badge">{benchmarks[band].label} · {formatRate(current)}</span>}
      </div>
      <div className="tw-report-benchmark-scale" role="list" aria-label="비즈팅 반응률 비교 구간">
        {benchmarks.map((level, index) => (
          <div role="listitem" key={level.label} data-active={index === band}>
            <strong>{level.range}</strong><span>{level.label}{index === band ? ' · 이번 캠페인' : ''}</span>
          </div>
        ))}
      </div>
      <p className="tw-report-benchmark-feedback">{band === null ? '반응률이 집계되면 비즈팅 평균과 비교할 수 있어요.' : benchmarks[band].text}</p>
      <a className="tw-report-contact" href={'mailto:' + CONTACT}><Mail size={16} aria-hidden="true" /> 캠페인 성과 문의 <span>{CONTACT}</span></a>
    </section>
  );
}

export type ReportChartProps = {
  report: Report;
  days: ReportDays;
  view: 'live' | 'daily' | 'region';
};

export default memo(function ReportCharts({ report, days, view }: ReportChartProps) {
  if (view === 'region') return <EstimatedResidence report={report} />;
  if (view === 'live') return <TrendChart key="realtime" report={report} days={days} daily={false} />;

  return (
    <>
      <div className="tw-report-insights">
        <TrendChart key="daily" report={report} days={days} daily />
        <Benchmark report={report} />
      </div>
      <DailyTable days={days} delivered={report.delivered} />
      <Demographics report={report} />
    </>
  );
});
