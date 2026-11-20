import { useMemo, useState } from 'react';
import { MapPin, MapPinned, TrendingUp } from 'lucide-react';
import boundaries from './korea-boundaries.json';
import { formatRate, getResidence } from './reportData';
import type { Report } from './reportData';

type Metric = 'reactionRate' | 'share';

const columns = [...boundaries].sort((left, right) => left.y - right.y);

export default function EstimatedResidence({ report }: { report: Report }) {
  const [metric, setMetric] = useState<Metric>('reactionRate');
  const [selectedArea, setSelectedArea] = useState('');
  const [hoveredArea, setHoveredArea] = useState('');
  const label = metric === 'reactionRate' ? '반응률' : '수신자 비율';
  const residence = useMemo(() => getResidence(report.areas), [report.areas]);
  const { areas, values, leaders } = useMemo(() => {
    const areas = residence
      .filter((area) => area[metric] !== null)
      .sort((a, b) => (b[metric] ?? 0) - (a[metric] ?? 0) || a.area.localeCompare(b.area, 'ko'));
    const peak = areas[0]?.[metric] ?? 0;
    const leaders = new Set(peak > 0 ? areas.filter((area) => area[metric] === peak).map((area) => area.area) : []);
    return { areas, values: new Map(areas.map((area) => [area.area, area[metric]])), leaders };
  }, [metric, residence]);
  const activeArea = values.has(hoveredArea) ? hoveredArea : values.has(selectedArea) ? selectedArea : areas[0]?.area;
  const maxValue = Math.max(1, Math.ceil(areas[0]?.[metric] ?? 0));
  const leaderLabel = leaders.size > 1 ? '공동 최고' : '가장 높은 지역';

  return (
    <section className="tw-report-card tw-report-residence" aria-labelledby="tw-report-residence-title">
      <div className="tw-report-section-top">
        <div>
          <h2 id="tw-report-residence-title">지역 통계</h2>
          <p>수신자의 추정거주지를 기준으로 지역별 성과를 비교해 보세요.</p>
        </div>
        <div className="tw-report-switch" role="group" aria-label="지역 비교 지표">
          <button type="button" onClick={() => setMetric('reactionRate')} aria-pressed={metric === 'reactionRate'}>반응률</button>
          <button type="button" onClick={() => setMetric('share')} aria-pressed={metric === 'share'}>수신자 비율</button>
        </div>
      </div>
      {!areas.length ? (
        <div className="tw-report-empty"><MapPinned size={26} aria-hidden="true" /><p>선택한 지표로 표시할 지역 데이터가 아직 없어요.</p></div>
      ) : (
        <div className="tw-report-area-grid">
          <section className="tw-report-area-map" aria-labelledby="tw-report-map-title">
            <h3 id="tw-report-map-title">지역 분포 지도</h3>
            <div className="tw-report-area-selection" aria-live={hoveredArea ? 'off' : 'polite'}>
              <MapPin size={16} aria-hidden="true" /><span>{activeArea}</span>
              <strong>{formatRate(activeArea ? values.get(activeArea) ?? null : null)}</strong>
            </div>
            <svg className="tw-report-korea" viewBox="22 14 298 390" role="img" aria-label={'대한민국 시·도별 ' + label + ' 개략도'}>
              <defs>
                <linearGradient id="tw-report-region-fill" x2="64%" y2="100%">
                  <stop stopColor="#f8fbff" />
                  <stop offset="100%" stopColor="#e2ebfc" />
                </linearGradient>
                <linearGradient id="tw-report-region-active" x2="64%" y2="100%">
                  <stop stopColor="#f1edff" />
                  <stop offset="100%" stopColor="#c8c6fa" />
                </linearGradient>
                <linearGradient id="tw-report-column-fill">
                  <stop stopColor="#5988f2" />
                  <stop offset="47%" stopColor="#4271e9" />
                  <stop offset="100%" stopColor="#294db6" />
                </linearGradient>
                <linearGradient id="tw-report-column-active">
                  <stop stopColor="#9b73e9" />
                  <stop offset="47%" stopColor="#8057d2" />
                  <stop offset="100%" stopColor="#5538a6" />
                </linearGradient>
                <linearGradient id="tw-report-column-leader">
                  <stop stopColor="#ddc188" />
                  <stop offset="47%" stopColor="#bd9557" />
                  <stop offset="100%" stopColor="#8f693a" />
                </linearGradient>
                <radialGradient id="tw-report-column-shadow">
                  <stop stopColor="#5067ad" stopOpacity=".29" />
                  <stop offset="100%" stopColor="#5067ad" stopOpacity="0" />
                </radialGradient>
              </defs>
              <g className="tw-report-map-land">
                {boundaries.map(({ area, path }) => (
                  <path key={area} d={path} fillRule="evenodd" data-active={area === activeArea} data-top={leaders.has(area)} data-available={values.has(area)}
                    className="tw-report-map-province"
                    onClick={values.has(area) ? () => setSelectedArea(area) : undefined}
                    onMouseEnter={values.has(area) ? () => setHoveredArea(area) : undefined}
                    onMouseLeave={() => setHoveredArea('')} />
                ))}
              </g>
              {columns.map(({ area, x, y }) => {
                const value = values.get(area);
                if (value == null) return null;
                const height = value / maxValue * 57;
                const active = area === activeArea;
                return (
                  <g key={area} transform={'translate(' + x + ' ' + y + ')'} className="tw-report-map-column"
                    data-active={active} data-top={leaders.has(area)} onClick={() => setSelectedArea(area)}
                    onMouseEnter={() => setHoveredArea(area)} onMouseLeave={() => setHoveredArea('')}>
                    <title>{area + ' ' + label + ' ' + formatRate(value)}</title>
                    <ellipse cy={4} rx={12} ry={5} className="tw-report-map-shadow" />
                    {height > 0 && <path d={'M-8 ' + -height + 'V0A8 3.2 0 0 0 8 0V' + -height + 'Z'}
                      className="tw-report-map-column-side" />}
                    <ellipse cy={-height} rx={8} ry={3.2} className="tw-report-map-column-cap" />
                  </g>
                );
              })}
            </svg>
            <p className="tw-report-chart-note">시·도 위치를 간략히 표현한 지도예요. 막대 높이는 {label}에 비례하고, 값이 없는 지역은 회색으로 표시해요.</p>
          </section>
          <section className="tw-report-area-rank" aria-labelledby="tw-report-rank-title" onMouseLeave={() => setHoveredArea('')}>
            <h3 id="tw-report-rank-title">지역별 {label}</h3>
            <div className="tw-report-area-axis" aria-hidden="true"><span>0%</span><span>{maxValue}%</span></div>
            <ol className="tw-report-area-bars">
              {areas.map((area) => {
                const value = area[metric];
                const isLeader = leaders.has(area.area);
                return (
                  <li key={area.area}>
                    <button type="button" aria-pressed={area.area === activeArea} data-active={area.area === activeArea} data-top={isLeader}
                      onMouseEnter={() => setHoveredArea(area.area)} onFocus={() => setHoveredArea('')}
                      onClick={() => setSelectedArea(area.area)}>
                      {isLeader && (
                        <span className="tw-report-area-leader-label"><TrendingUp size={14} aria-hidden="true" />{leaderLabel}</span>
                      )}
                      <span className="tw-report-area-name">{area.area}</span>
                      <span className="tw-report-area-track" aria-hidden="true">
                        <i style={{ width: (value === null ? 0 : value / maxValue * 100) + '%' }} />
                      </span>
                      <strong>{formatRate(value)}</strong>
                    </button>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>
      )}
      <p className="tw-report-chart-note">반응률은 해당 지역의 발송 성공 건 중 본문 URL이나 버튼을 클릭한 비율이에요. 수신자 비율은 지역 통계에 포함된 발송 성공 건 기준이에요.</p>
    </section>
  );
}
