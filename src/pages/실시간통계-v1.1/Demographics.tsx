import { TrendingUp } from 'lucide-react';
import { AUDIENCE_HOURS, COLLECTING_LABEL, formatRate, getDemographics, getTopDemographicReaction } from './reportData';
import type { Report } from './reportData';

const ageColors = ['#4268ee', '#79a4ff', '#a06be8', '#45b7ae', '#627ad4', '#ee9a62'];
const sexColors: Record<string, string> = { 남성: '#4268ee', 여성: '#a06be8', 미분류: '#a8b5cf' };

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

export default function Demographics({ segments, pending }: { segments: Report['segments']; pending: boolean }) {
  const { ageShares, sexShares } = getDemographics(segments);
  const top = getTopDemographicReaction(segments);
  const leadingGroups = top?.groups.slice(0, 2).join(' · ');
  const extraGroups = top ? top.groups.length - 2 : 0;
  return (
    <section className="tw-report-card tw-report-demographics" aria-labelledby="tw-report-demographics-title">
      <div className="tw-report-section-top">
        <div>
          <h2 id="tw-report-demographics-title">연령·성별 분석</h2>
          <p>발송 후 {AUDIENCE_HOURS}시간 동안 수집한 연령·성별 구성과 반응률이에요.</p>
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
      ) : (
        <div className="tw-report-empty">
          <p>{pending ? '발송 다음 날 오전 4시 30분부터 확인할 수 있어요.' : COLLECTING_LABEL}</p>
        </div>
      )}
    </section>
  );
}
